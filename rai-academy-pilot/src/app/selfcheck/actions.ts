"use server";

import { getChatModel } from "@/lib/ai/select";
import { findSelfCheckCohort, saveSelfCheckRun } from "@/lib/selfcheck/data";
import { runTurn, type TurnResult } from "@/lib/selfcheck/engine";
import { createAdminClient } from "@/lib/supabase/admin";

// Public: respondents are anonymous. Nothing about the request (IP, user agent)
// is read or stored; only a finished, valid snapshot is saved.
export async function selfCheckTurnAction(input: unknown): Promise<TurnResult> {
  const model = getChatModel();
  if (!model) return { status: "error", message: "The Self-Check isn't available right now. Contact RAI." };
  const db = createAdminClient();
  return runTurn(
    {
      findCohort: (code) => findSelfCheckCohort(db, code),
      model,
      saveRun: (run) => saveSelfCheckRun(db, run),
    },
    input,
  );
}
