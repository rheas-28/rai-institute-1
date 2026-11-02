// One Self-Check turn. The conversation lives only in the browser and is sent
// back each turn; nothing is stored until a valid snapshot exists, and the
// stored run carries no identity (no person, email, IP or user agent).
import { z } from "zod";
import { ACCESS_CODE_PATTERN } from "@/lib/access-code";
import { ModelError, type ChatMessage, type ChatModel } from "@/lib/ai/model";
import { buildSystemPrompt, type ApprovedTool } from "./prompt";
import { detectSensitive, SENSITIVE_MESSAGES } from "./sensitive";
import { parseSnapshot, summarize, type Snapshot, type SnapshotSummary } from "./snapshot";

import { MAX_ANSWER_CHARS, MAX_ANSWERS } from "./limits";

export { MAX_ANSWER_CHARS, MAX_ANSWERS };
const MAX_REPLY_CHARS = 12_000;

export const OPENING_MESSAGE = "Please begin the Self-Check.";
export const FINISH_MESSAGE = "Please finish now and return the snapshot.";

export type Round = "baseline" | "readout";

export type SelfCheckContext = {
  cohortId: string;
  orgId: string;
  orgName: string;
  round: Round;
  approvedTools: ApprovedTool[];
  promptTemplate: string | null;
};

export type SelfCheckRun = {
  org_id: string;
  cohort_id: string;
  round: Round;
  team_label: string;
  inventory: Snapshot["inventory"];
  scores: SnapshotSummary;
  snapshot: { top_gaps: string[]; next_actions: string[] };
};

export type SelfCheckDeps = {
  findCohort: (accessCode: string) => Promise<SelfCheckContext | null>;
  model: ChatModel;
  saveRun: (run: SelfCheckRun) => Promise<void>;
};

export type TurnResult =
  | { status: "reply"; text: string; orgName: string; round: Round }
  | { status: "warning"; warnings: string[] }
  | { status: "done"; snapshot: Snapshot; orgName: string; round: Round }
  | { status: "error"; message: string };

export const turnSchema = z
  .object({
    access_code: z.string().trim().toUpperCase().regex(ACCESS_CODE_PATTERN, "Enter the access code in the form ABCD-EFGH."),
    team_label: z.string().trim().min(1, "Enter a team label.").max(100, "Keep the team label under 100 characters."),
    messages: z
      .array(
        z.object({
          role: z.enum(["user", "assistant"]),
          content: z.string().trim().min(1, "Type an answer first."),
        }),
      )
      .max(MAX_ANSWERS * 2),
    confirm_sensitive: z.boolean().default(false),
    finish: z.boolean().default(false),
  })
  .superRefine((t, ctx) => {
    t.messages.forEach((m, i) => {
      const expected = i % 2 === 0 ? "assistant" : "user";
      if (m.role !== expected) ctx.addIssue({ code: "custom", message: "The conversation is out of order." });
      const max = m.role === "user" ? MAX_ANSWER_CHARS : MAX_REPLY_CHARS;
      if (m.content.length > max) {
        ctx.addIssue({ code: "custom", message: `Keep each answer under ${MAX_ANSWER_CHARS} characters.` });
      }
    });
    const awaitingAnswer = t.messages.length % 2 === 1;
    if (t.finish && t.messages.length > 0 && !awaitingAnswer) {
      ctx.addIssue({ code: "custom", message: "The conversation is out of order." });
    }
    if (!t.finish && t.messages.length > 0 && awaitingAnswer) {
      ctx.addIssue({ code: "custom", message: "Type an answer first." });
    }
  });

const GENERIC_ERROR = "Something went wrong with the Self-Check. Nothing was saved. Please try again.";
const SNAPSHOT_ERROR =
  "The snapshot couldn't be produced. Nothing was saved. Try “Finish” again, or start over.";

export async function runTurn(deps: SelfCheckDeps, input: unknown): Promise<TurnResult> {
  const parsed = turnSchema.safeParse(input);
  if (!parsed.success) return { status: "error", message: parsed.error.issues[0]?.message ?? GENERIC_ERROR };
  const turn = parsed.data;

  const ctx = await deps.findCohort(turn.access_code);
  if (!ctx) return { status: "error", message: "That access code isn't valid. Check it with your organization." };
  if (!ctx.promptTemplate) return { status: "error", message: "The Self-Check isn't set up yet. Contact RAI." };

  const last = turn.messages.at(-1);
  if (!turn.finish && last?.role === "user" && !turn.confirm_sensitive) {
    const flags = detectSensitive(last.content);
    if (flags.length) return { status: "warning", warnings: flags.map((f) => SENSITIVE_MESSAGES[f]) };
  }

  const answers = turn.messages.filter((m) => m.role === "user").length;
  const finishing = turn.finish || answers >= MAX_ANSWERS;
  const system = buildSystemPrompt(
    ctx.promptTemplate,
    { orgName: ctx.orgName, approvedTools: ctx.approvedTools },
    { finishNow: finishing },
  );
  const conversation: ChatMessage[] = [{ role: "user", content: OPENING_MESSAGE }, ...turn.messages];
  if (turn.finish) conversation.push({ role: "user", content: FINISH_MESSAGE });

  try {
    let reply = await deps.model(system, conversation);
    let result = parseSnapshot(reply);
    const looksLikeSnapshot = result.ok || reply.trim().startsWith("{") || reply.trim().startsWith("```");
    if (!finishing && !looksLikeSnapshot) {
      return { status: "reply", text: reply, orgName: ctx.orgName, round: ctx.round };
    }

    if (!result.ok) {
      reply = await deps.model(system, [
        ...conversation,
        { role: "assistant", content: reply },
        {
          role: "user",
          content: `That was not a valid snapshot (${result.error}). Reply with only the snapshot JSON in the required format.`,
        },
      ]);
      result = parseSnapshot(reply);
      if (!result.ok) {
        console.error("Self-Check snapshot invalid after retry", { cohort: ctx.cohortId });
        return { status: "error", message: SNAPSHOT_ERROR };
      }
    }

    const snapshot = result.snapshot;
    await deps.saveRun({
      org_id: ctx.orgId,
      cohort_id: ctx.cohortId,
      round: ctx.round,
      team_label: turn.team_label,
      inventory: snapshot.inventory,
      scores: summarize(snapshot),
      snapshot: { top_gaps: snapshot.top_gaps, next_actions: snapshot.next_actions },
    });
    return { status: "done", snapshot, orgName: ctx.orgName, round: ctx.round };
  } catch (e) {
    if (!(e instanceof ModelError)) console.error("Self-Check turn failed", { kind: e instanceof Error ? e.name : "unknown" });
    return { status: "error", message: GENERIC_ERROR };
  }
}
