import { NextResponse } from "next/server";
import { z } from "zod";
import { renderSnapshotPdf } from "@/lib/selfcheck/pdf";
import { clientSnapshotSchema } from "@/lib/selfcheck/snapshot";

const MAX_BODY = 200_000;

const bodySchema = z.object({
  snapshot: clientSnapshotSchema,
  org_name: z.string().trim().min(1).max(200),
  team_label: z.string().trim().min(1).max(100),
  round: z.enum(["baseline", "readout"]),
});

// Renders the respondent's own snapshot (held in their browser) as a PDF.
// Reads nothing from the database and stores nothing.
export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY) return NextResponse.json({ error: "Too large" }, { status: 413 });
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid snapshot" }, { status: 400 });
  }
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "Invalid snapshot" }, { status: 400 });

  const { snapshot, org_name, team_label, round } = parsed.data;
  const pdf = await renderSnapshotPdf(snapshot, { orgName: org_name, teamLabel: team_label, round, date: new Date() });
  return new NextResponse(Buffer.from(pdf), {
    headers: {
      "content-type": "application/pdf",
      "content-disposition": 'attachment; filename="shadow-ai-self-check.pdf"',
      "cache-control": "no-store",
    },
  });
}
