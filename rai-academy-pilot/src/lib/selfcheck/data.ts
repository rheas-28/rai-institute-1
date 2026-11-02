// Database access for the anonymous Self-Check. Uses the service-role client
// (respondents have no account), so every query is scoped explicitly to the
// cohort found by its access code.
import type { SupabaseClient } from "@supabase/supabase-js";
import type { ApprovedTool } from "./prompt";
import type { Round, SelfCheckContext, SelfCheckRun } from "./engine";

export const SELFCHECK_PROMPT_SLUG = "prompt-selfcheck";

export async function findSelfCheckCohort(db: SupabaseClient, accessCode: string): Promise<SelfCheckContext | null> {
  const { data: cohort, error } = await db
    .from("cohorts")
    .select("id, org_id, current_round, organizations(name)")
    .eq("access_code", accessCode)
    .maybeSingle();
  if (error) throw new Error("Could not look up the cohort");
  if (!cohort) return null;

  const [{ data: pack }, { data: prompt }] = await Promise.all([
    db.from("client_packs").select("approved_tools").eq("org_id", cohort.org_id)
      .order("version", { ascending: false }).limit(1).maybeSingle(),
    db.from("content_items").select("body").eq("slug", SELFCHECK_PROMPT_SLUG).eq("type", "prompt").maybeSingle(),
  ]);
  const org = cohort.organizations as unknown as { name: string } | null;
  return {
    cohortId: cohort.id,
    orgId: cohort.org_id,
    orgName: org?.name ?? "your organization",
    round: cohort.current_round as Round,
    approvedTools: Array.isArray(pack?.approved_tools) ? (pack.approved_tools as ApprovedTool[]) : [],
    promptTemplate: prompt?.body ?? null,
  };
}

export async function saveSelfCheckRun(db: SupabaseClient, run: SelfCheckRun): Promise<void> {
  const { error } = await db.from("selfcheck_runs").insert(run);
  if (error) throw new Error("Could not save the Self-Check run");
}
