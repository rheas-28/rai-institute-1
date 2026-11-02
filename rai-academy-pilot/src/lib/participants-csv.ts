import Papa from "papaparse";
import { z } from "zod";
import { LAYERS, type Layer } from "./roles";

export const MAX_CSV_ROWS = 2000;
export const CSV_COLUMNS = ["email", "name", "layer", "role_title"] as const;

export type ParticipantRow = { email: string; name: string; layer: Layer; role_title: string | null };

export type RowResult = {
  line: number;
  values: Record<(typeof CSV_COLUMNS)[number], string>;
  row?: ParticipantRow;
  errors: string[];
};

export type CsvCheck = { fileErrors: string[]; rows: RowResult[] };

const rowSchema = z.object({
  email: z.string().trim().toLowerCase().min(1, "Email is missing").pipe(z.email("Email is not valid")),
  name: z.string().trim().min(1, "Name is missing").max(200, "Name is too long"),
  layer: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Layer is missing")
    .pipe(z.enum(LAYERS, { error: `Layer must be one of: ${LAYERS.join(", ")}` })),
  role_title: z
    .string()
    .trim()
    .max(200, "Role title is too long")
    .transform((v) => v || null),
});

const normalizeHeader = (h: string) => h.replace(/^\uFEFF/, "").trim().toLowerCase().replace(/[\s-]+/g, "_");

/** Parses and validates a participant CSV. Pure: database checks are added by the caller. */
export function checkParticipantsCsv(text: string): CsvCheck {
  const parsed = Papa.parse<string[]>(text.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n"), { skipEmptyLines: false, newline: "\n" });
  const [header, ...body] = parsed.data;
  if (!header) return { fileErrors: ["The file is empty."], rows: [] };

  const headers = header.map(normalizeHeader);
  const missing = CSV_COLUMNS.filter((c) => !headers.includes(c));
  if (missing.length) {
    return {
      fileErrors: [`Missing column${missing.length > 1 ? "s" : ""}: ${missing.join(", ")}. Expected: ${CSV_COLUMNS.join(", ")}.`],
      rows: [],
    };
  }
  const index = Object.fromEntries(CSV_COLUMNS.map((c) => [c, headers.indexOf(c)])) as Record<
    (typeof CSV_COLUMNS)[number],
    number
  >;

  const rows: RowResult[] = [];
  const seen = new Map<string, number>();
  body.forEach((cells, i) => {
    if (cells.every((c) => !c.trim())) return;
    const values = Object.fromEntries(
      CSV_COLUMNS.map((c) => [c, (cells[index[c]] ?? "").trim()])
    ) as RowResult["values"];
    const line = i + 2;
    const result = rowSchema.safeParse(values);
    const errors = result.success ? [] : result.error.issues.map((issue) => issue.message);
    if (result.success) {
      const first = seen.get(result.data.email);
      if (first) errors.push(`Duplicate of line ${first}`);
      else seen.set(result.data.email, line);
    }
    rows.push({ line, values, row: result.success && !errors.length ? result.data : undefined, errors });
  });

  const fileErrors: string[] = [];
  if (!rows.length) fileErrors.push("The file has no participant rows.");
  if (rows.length > MAX_CSV_ROWS) fileErrors.push(`The file has more than ${MAX_CSV_ROWS} rows.`);
  return { fileErrors, rows };
}
