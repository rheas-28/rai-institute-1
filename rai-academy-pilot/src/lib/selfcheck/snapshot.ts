// The Self-Check snapshot: what the model must return, and what is computed
// in code from it (heat and the summary counts the sponsor dashboard uses).
import { z } from "zod";

const score = z.int().min(1).max(3);
const line = (max: number) => z.string().trim().max(max);

export const inventoryItemSchema = z.object({
  tool: line(200).min(1),
  purpose: line(500).default(""),
  sanctioned: z.enum(["yes", "no", "unsure"]),
  data_types: z.array(line(100).min(1)).max(20),
  acts_on_its_own: z.enum(["yes", "no"]),
  approved_by: line(200).default(""),
  scores: z.object({
    data_sensitivity: score,
    autonomy: score,
    impact_on_people: score,
    oversight_gap: score,
  }),
});

export const modelSnapshotSchema = z.object({
  inventory: z.array(inventoryItemSchema).max(50),
  top_gaps: z.array(line(500).min(1)).length(3),
  next_actions: z.array(line(500).min(1)).length(3),
});

export type InventoryItem = z.infer<typeof inventoryItemSchema> & { heat: 1 | 2 | 3 };
export type Snapshot = {
  inventory: InventoryItem[];
  top_gaps: string[];
  next_actions: string[];
};
export type SnapshotSummary = {
  items: number;
  sanctioned: { yes: number; no: number; unsure: number };
  acts_on_its_own: number;
  no_named_approver: number;
  max_heat: number;
  heat: { "1": number; "2": number; "3": number };
};

/** The JSON shape the model is told to return. Kept in code so it always matches validation. */
export const SNAPSHOT_FORMAT = `{
  "inventory": [
    {
      "tool": "tool name",
      "purpose": "what the team uses it for",
      "sanctioned": "yes" | "no" | "unsure",
      "data_types": ["type of data that goes in"],
      "acts_on_its_own": "yes" | "no",
      "approved_by": "role or body that approved it, or empty string if no one",
      "scores": { "data_sensitivity": 1-3, "autonomy": 1-3, "impact_on_people": 1-3, "oversight_gap": 1-3 }
    }
  ],
  "top_gaps": ["gap", "gap", "gap"],
  "next_actions": ["action", "action", "action"]
}`;

export function heatOf(scores: InventoryItem["scores"]): 1 | 2 | 3 {
  return Math.max(
    scores.data_sensitivity,
    scores.autonomy,
    scores.impact_on_people,
    scores.oversight_gap,
  ) as 1 | 2 | 3;
}

const NO_APPROVER = /^(|none|no one|nobody|unknown|n\/a|na|not sure|unsure|nobody approved it)$/i;

export function hasNamedApprover(approvedBy: string): boolean {
  return !NO_APPROVER.test(approvedBy.trim().replace(/[.!]$/, ""));
}

/** Pulls a JSON object out of a model reply: bare, or inside a ``` fence. Null if the reply is prose. */
export function extractJson(reply: string): string | null {
  const text = reply.trim();
  const fenced = /^```(?:json)?\s*([\s\S]*?)\s*```$/i.exec(text);
  if (fenced) return fenced[1];
  return text.startsWith("{") ? text : null;
}

export type ParseResult = { ok: true; snapshot: Snapshot } | { ok: false; error: string };

export function parseSnapshot(reply: string): ParseResult {
  const json = extractJson(reply);
  if (json === null) return { ok: false, error: "The reply was not JSON." };
  let raw: unknown;
  try {
    raw = JSON.parse(json);
  } catch {
    return { ok: false, error: "The reply was not valid JSON." };
  }
  const parsed = modelSnapshotSchema.safeParse(raw);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { ok: false, error: `${issue.path.join(".") || "snapshot"}: ${issue.message}` };
  }
  return {
    ok: true,
    snapshot: {
      ...parsed.data,
      inventory: parsed.data.inventory.map((item) => ({ ...item, heat: heatOf(item.scores) })),
    },
  };
}

export function summarize(snapshot: Snapshot): SnapshotSummary {
  const s: SnapshotSummary = {
    items: snapshot.inventory.length,
    sanctioned: { yes: 0, no: 0, unsure: 0 },
    acts_on_its_own: 0,
    no_named_approver: 0,
    max_heat: 0,
    heat: { "1": 0, "2": 0, "3": 0 },
  };
  for (const item of snapshot.inventory) {
    s.sanctioned[item.sanctioned]++;
    if (item.acts_on_its_own === "yes") s.acts_on_its_own++;
    if (!hasNamedApprover(item.approved_by)) s.no_named_approver++;
    s.heat[String(item.heat) as "1" | "2" | "3"]++;
    s.max_heat = Math.max(s.max_heat, item.heat);
  }
  return s;
}

/** Re-validates a snapshot sent back by the browser (for the PDF) and recomputes heat. */
export const clientSnapshotSchema = modelSnapshotSchema.transform(
  (s): Snapshot => ({
    ...s,
    inventory: s.inventory.map((item) => ({ ...item, heat: heatOf(item.scores) })),
  }),
);
