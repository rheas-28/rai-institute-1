import { z } from "zod";

export const MAX_POLICY_CHARS = 200_000;

const text = (max: number) => z.string().trim().max(max);

export const approvedToolSchema = z.object({
  name: text(200).min(1, "Every tool needs a name"),
  vendor: text(200),
  approved_uses: text(2000),
});

export const sharedUseCaseSchema = z.object({
  name: text(200),
  description: text(4000),
  data_touched: text(2000),
  tools_callable: text(2000),
  users: text(2000),
});

export const clientPackSchema = z.object({
  policy_text: text(MAX_POLICY_CHARS).min(1, "The policy text is empty"),
  approved_tools: z.array(approvedToolSchema).max(200, "At most 200 tools"),
  shared_use_case: sharedUseCaseSchema,
});

export type ApprovedTool = z.infer<typeof approvedToolSchema>;
export type SharedUseCase = z.infer<typeof sharedUseCaseSchema>;
export type ClientPackInput = z.infer<typeof clientPackSchema>;

export const USE_CASE_FIELDS: { key: keyof SharedUseCase; label: string; long?: boolean }[] = [
  { key: "name", label: "Name" },
  { key: "description", label: "Description", long: true },
  { key: "data_touched", label: "Data it touches", long: true },
  { key: "tools_callable", label: "Tools it can call", long: true },
  { key: "users", label: "Users" },
];

export const EMPTY_USE_CASE: SharedUseCase = {
  name: "",
  description: "",
  data_touched: "",
  tools_callable: "",
  users: "",
};

/** Reads the client-pack form. Tool rows are parallel `tool_*` fields; blank rows are dropped. */
export function readClientPackForm(form: FormData): unknown {
  const str = (v: FormDataEntryValue | null) => (typeof v === "string" ? v : "");
  const names = form.getAll("tool_name").map(str);
  const vendors = form.getAll("tool_vendor").map(str);
  const uses = form.getAll("tool_uses").map(str);
  const approved_tools = names
    .map((name, i) => ({ name, vendor: vendors[i] ?? "", approved_uses: uses[i] ?? "" }))
    .filter((t) => t.name.trim() || t.vendor.trim() || t.approved_uses.trim());

  const shared_use_case = Object.fromEntries(
    USE_CASE_FIELDS.map(({ key }) => [key, str(form.get(`use_case_${key}`))])
  );
  return { policy_text: str(form.get("policy_text")), approved_tools, shared_use_case };
}

/** Normalises stored JSON (which may predate the schema) into form defaults. */
export function toFormDefaults(pack: {
  approved_tools: unknown;
  shared_use_case: unknown;
} | null): { tools: ApprovedTool[]; useCase: SharedUseCase } {
  const tools = z.array(approvedToolSchema.partial()).catch([]).parse(pack?.approved_tools ?? []);
  const useCase = sharedUseCaseSchema.partial().catch({}).parse(pack?.shared_use_case ?? {});
  return {
    tools: tools.map((t) => ({ name: t.name ?? "", vendor: t.vendor ?? "", approved_uses: t.approved_uses ?? "" })),
    useCase: { ...EMPTY_USE_CASE, ...useCase },
  };
}
