// Guardrail tests from the build blueprint. They run against the local
// Supabase stack with the seeded organizations (Northwind = A, Fabrikam = B).
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  ALL_TABLES,
  ORG_TABLES,
  anonClient,
  serviceClient,
  signInAs,
  withPg,
} from "./helpers";
import {
  ADMIN_EMAIL,
  COHORT_FABRIKAM,
  COHORT_NORTHWIND,
  ORG_FABRIKAM as ORG_B,
  ORG_NORTHWIND as ORG_A,
} from "../scripts/seed-data";

const SPONSOR_A = "sponsor@northwind.example";
const PARTICIPANT_A = "advisor@northwind.example";
const OTHER_PARTICIPANT_A = "risk@northwind.example";
const PARTICIPANT_B = "advisor@fabrikam.example";
const FIXTURE_TAG = "vitest-fixture";

const service = serviceClient();
const ids: Record<string, string> = {};
let sponsorA: SupabaseClient;
let participantA: SupabaseClient;
let admin: SupabaseClient;

async function participantId(email: string): Promise<string> {
  const { data, error } = await service.from("participants").select("id").eq("email", email).single();
  if (error) throw error;
  return data.id;
}

async function insertOne(table: string, row: Record<string, unknown>): Promise<string> {
  const { data, error } = await service.from(table).insert(row).select("id").single();
  if (error) throw new Error(`${table}: ${error.message}`);
  return String(data.id);
}

async function cleanup() {
  await withPg(async (pg) => {
    await pg.query("delete from public.selfcheck_runs where team_label = $1", [FIXTURE_TAG]);
    await pg.query("delete from public.certificates where pdf_path = $1", [FIXTURE_TAG]);
    await pg.query("delete from public.proofs where content = $1", [FIXTURE_TAG]);
    await pg.query("delete from public.scenario_attempts where answers = $1::jsonb", [
      JSON.stringify({ tag: FIXTURE_TAG }),
    ]);
    await pg.query("delete from public.coach_sessions where messages = $1::jsonb", [
      JSON.stringify([{ tag: FIXTURE_TAG }]),
    ]);
    await pg.query("delete from public.audit_log where target = $1", [FIXTURE_TAG]);
  });
}

beforeAll(async () => {
  await cleanup();
  ids.pA = await participantId(PARTICIPANT_A);
  ids.pA2 = await participantId(OTHER_PARTICIPANT_A);
  ids.pB = await participantId(PARTICIPANT_B);

  for (const [org, cohort, key] of [
    [ORG_A, COHORT_NORTHWIND, "A"],
    [ORG_B, COHORT_FABRIKAM, "B"],
  ] as const) {
    ids[`run${key}`] = await insertOne("selfcheck_runs", {
      org_id: org,
      cohort_id: cohort,
      round: "baseline",
      team_label: FIXTURE_TAG,
    });
    await insertOne("audit_log", { org_id: org, action: "fixture", target: FIXTURE_TAG });
  }
  for (const [org, pid, key] of [
    [ORG_A, ids.pA, "A"],
    [ORG_A, ids.pA2, "A2"],
    [ORG_B, ids.pB, "B"],
  ] as const) {
    ids[`coach${key}`] = await insertOne("coach_sessions", {
      org_id: org,
      participant_id: pid,
      mode: "advisor",
      messages: [{ tag: FIXTURE_TAG }],
    });
    await insertOne("scenario_attempts", {
      org_id: org,
      participant_id: pid,
      answers: { tag: FIXTURE_TAG },
      score: 9,
      passed: true,
    });
    ids[`proof${key}`] = await insertOne("proofs", {
      org_id: org,
      participant_id: pid,
      layer: "advisor",
      content: FIXTURE_TAG,
    });
  }

  [sponsorA, participantA, admin] = await Promise.all([
    signInAs(SPONSOR_A),
    signInAs(PARTICIPANT_A),
    signInAs(ADMIN_EMAIL),
  ]);
});

afterAll(cleanup);

describe("separation between organizations", () => {
  it("a sponsor of A gets nothing back for any request about B", async () => {
    const { data: orgs } = await sponsorA.from("organizations").select("id").eq("id", ORG_B);
    expect(orgs).toEqual([]);
    for (const table of ORG_TABLES) {
      const { data, error } = await sponsorA.from(table).select("*").eq("org_id", ORG_B);
      expect(error, table).toBeNull();
      expect(data, table).toEqual([]);
    }
  });

  it("a sponsor of A only ever sees rows of A", async () => {
    const { data: orgs } = await sponsorA.from("organizations").select("id");
    expect(orgs).toEqual([{ id: ORG_A }]);
    for (const table of ORG_TABLES) {
      const { data } = await sponsorA.from(table).select("org_id");
      for (const row of data ?? []) expect(row.org_id, table).toBe(ORG_A);
    }
  });

  it("a sponsor cannot read individual Self-Check runs, people or coach sessions", async () => {
    for (const table of ["selfcheck_runs", "participants", "coach_sessions", "scenario_attempts", "proofs"]) {
      const { data } = await sponsorA.from(table).select("id");
      expect(data, table).toEqual([]);
    }
  });

  it("a sponsor cannot write client packs or cohorts", async () => {
    const pack = await sponsorA.from("client_packs").insert({ org_id: ORG_A, policy_text: "x" });
    expect(pack.error).not.toBeNull();
    const cohort = await sponsorA
      .from("cohorts")
      .insert({ org_id: ORG_A, name: "x", access_code: `X-${Date.now()}` });
    expect(cohort.error).not.toBeNull();
  });

  it("a participant of A sees only their own records", async () => {
    const { data: people } = await participantA.from("participants").select("id");
    expect(people).toEqual([{ id: ids.pA }]);

    const { data: sessions } = await participantA.from("coach_sessions").select("id");
    expect(sessions?.map((s) => s.id)).toEqual([ids.coachA]);

    const { data: packs } = await participantA.from("client_packs").select("org_id");
    expect(packs?.length).toBeGreaterThan(0);
    for (const p of packs ?? []) expect(p.org_id).toBe(ORG_A);

    const { data: runs } = await participantA.from("selfcheck_runs").select("id");
    expect(runs).toEqual([]);
  });

  it("a participant of A cannot write coach sessions or proofs for someone else", async () => {
    const forB = await participantA
      .from("coach_sessions")
      .insert({ org_id: ORG_B, participant_id: ids.pB, mode: "advisor" });
    expect(forB.error).not.toBeNull();
    const forColleague = await participantA
      .from("proofs")
      .insert({ org_id: ORG_A, participant_id: ids.pA2, layer: "risk", content: FIXTURE_TAG });
    expect(forColleague.error).not.toBeNull();
    const selfAccepted = await participantA
      .from("proofs")
      .insert({ org_id: ORG_A, participant_id: ids.pA, layer: "risk", status: "accepted" });
    expect(selfAccepted.error).not.toBeNull();
  });

  it("participants cannot read agent prompts", async () => {
    const { data } = await participantA.from("content_items").select("id").eq("type", "prompt");
    expect(data).toEqual([]);
  });

  it("the public anon key reads nothing", async () => {
    const anon = anonClient();
    for (const table of ALL_TABLES) {
      const { data } = await anon.from(table).select("*").limit(1);
      expect(data ?? [], table).toEqual([]);
    }
  });

  it("an admin sees every organization", async () => {
    const { data } = await admin.from("organizations").select("id").in("id", [ORG_A, ORG_B]);
    expect(data).toHaveLength(2);
    const { data: runs } = await admin.from("selfcheck_runs").select("id").eq("team_label", FIXTURE_TAG);
    expect(runs).toHaveLength(2);
  });
});

describe("Self-Check anonymity", () => {
  it("no Self-Check run row can hold an email, participant id, IP or user agent", async () => {
    const columns = await withPg(async (pg) => {
      const res = await pg.query<{ column_name: string }>(
        "select column_name from information_schema.columns where table_schema = 'public' and table_name = 'selfcheck_runs'",
      );
      return res.rows.map((r) => r.column_name);
    });
    expect(columns.length).toBeGreaterThan(0);
    for (const c of columns) {
      expect(c).not.toMatch(/email|participant|user|ip|agent|name/i);
    }
  });
});

describe("certificates", () => {
  it("cannot be issued without an accepted proof", async () => {
    const res = await admin
      .from("certificates")
      .insert({ org_id: ORG_A, participant_id: ids.pA, pdf_path: FIXTURE_TAG });
    expect(res.error?.message).toMatch(/accepted proof/);

    const viaService = await service
      .from("certificates")
      .insert({ org_id: ORG_A, participant_id: ids.pA, pdf_path: FIXTURE_TAG });
    expect(viaService.error?.message).toMatch(/accepted proof/);
  });

  it("can be issued once the proof is accepted", async () => {
    const accept = await admin.from("proofs").update({ status: "accepted" }).eq("id", ids.proofA);
    expect(accept.error).toBeNull();
    const res = await admin
      .from("certificates")
      .insert({ org_id: ORG_A, participant_id: ids.pA, pdf_path: FIXTURE_TAG });
    expect(res.error).toBeNull();
  });
});

describe("client packs", () => {
  it("are versioned per organization and earlier versions are never overwritten", async () => {
    const before = await admin.from("client_packs").select("version").eq("org_id", ORG_B);
    const maxBefore = Math.max(...(before.data ?? []).map((r) => r.version));
    const { data: created, error } = await admin
      .from("client_packs")
      .insert({ org_id: ORG_B, policy_text: "v-next", version: 1 })
      .select("id, version")
      .single();
    expect(error).toBeNull();
    expect(created?.version).toBe(maxBefore + 1);

    const { data: updated } = await admin
      .from("client_packs")
      .update({ policy_text: "tampered" })
      .eq("org_id", ORG_B)
      .select("id");
    expect(updated).toEqual([]);

    await withPg((pg) => pg.query("delete from public.client_packs where id = $1", [created!.id]));
  });
});

describe("audit log", () => {
  it("is append-only, even for the service role", async () => {
    const { data: actor } = await admin.auth.getUser();
    const insert = await admin
      .from("audit_log")
      .insert({ org_id: ORG_A, actor: actor.user!.id, action: "test", target: FIXTURE_TAG });
    expect(insert.error).toBeNull();

    const upd = await service.from("audit_log").update({ action: "edited" }).eq("target", FIXTURE_TAG);
    expect(upd.error).not.toBeNull();
    const del = await service.from("audit_log").delete().eq("target", FIXTURE_TAG);
    expect(del.error).not.toBeNull();
  });

  it("cannot be written by sponsors", async () => {
    const { data: actor } = await sponsorA.auth.getUser();
    const res = await sponsorA
      .from("audit_log")
      .insert({ org_id: ORG_A, actor: actor.user!.id, action: "test", target: FIXTURE_TAG });
    expect(res.error).not.toBeNull();
  });
});

describe("sign-in", () => {
  it("is invite-only", async () => {
    const { error } = await service.auth.admin.createUser({
      email: `stranger-${Date.now()}@example.com`,
      email_confirm: true,
    });
    expect(error).not.toBeNull();
  });
});
