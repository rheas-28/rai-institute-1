// F1 admin operations against the local Supabase stack, through each role's own session.
import type { SupabaseClient } from "@supabase/supabase-js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { ACCESS_CODE_PATTERN } from "@/lib/access-code";
import * as admin from "@/lib/admin/data";
import { ADMIN_EMAIL, COHORT_NORTHWIND, ORG_NORTHWIND } from "../scripts/seed-data";
import { serviceClient, signInAs, withPg } from "./helpers";

const ORG_NAME = "Vitest F1 Org";
const SLUG = "vitest-f1";
const PACK = {
  policy_text: "Fictional policy v1",
  approved_tools: [{ name: "Copilot", vendor: "Microsoft", approved_uses: "Drafting" }],
  shared_use_case: { name: "Letters", description: "", data_touched: "", tools_callable: "", users: "" },
};

let adminDb: SupabaseClient;
let adminId: string;
let sponsor: SupabaseClient;
let participant: SupabaseClient;

async function cleanup() {
  await withPg(async (pg) => {
    const orgs = await pg.query("select id from public.organizations where name = $1", [ORG_NAME]);
    const ids = orgs.rows.map((r) => r.id);
    if (ids.length) {
      await pg.query("delete from public.audit_log where org_id = any($1)", [ids]);
      await pg.query("delete from auth.users where email like '%@vitest-f1.example'");
      await pg.query("delete from public.app_users where org_id = any($1)", [ids]);
      await pg.query("delete from public.organizations where id = any($1)", [ids]);
    }
    await pg.query("delete from public.audit_log where target like $1", [`%${SLUG}%`]);
    await pg.query("delete from public.content_items where slug like $1", [`${SLUG}%`]);
  });
}

beforeAll(async () => {
  await cleanup();
  [adminDb, sponsor, participant] = await Promise.all([
    signInAs(ADMIN_EMAIL),
    signInAs("sponsor@northwind.example"),
    signInAs("advisor@northwind.example"),
  ]);
  adminId = (await adminDb.auth.getUser()).data.user!.id;
});

afterAll(cleanup);

async function auditActions(orgId: string): Promise<string[]> {
  const { data } = await serviceClient()
    .from("audit_log")
    .select("action, actor")
    .eq("org_id", orgId)
    .order("id");
  data?.forEach((row) => expect(row.actor).toBe(adminId));
  return (data ?? []).map((r) => r.action);
}

describe("F1 admin operations: non-admins", () => {
  it("sponsors and participants cannot run any admin operation", async () => {
    for (const db of [sponsor, participant]) {
      expect((await admin.createOrganization(db, { name: ORG_NAME, sector: "" })).ok).toBe(false);
      expect((await admin.addSponsor(db, ORG_NORTHWIND, "x@vitest-f1.example")).ok).toBe(false);
      expect((await admin.createCohort(db, ORG_NORTHWIND, { name: "x", start_date: "" })).ok).toBe(false);
      expect((await admin.setCohortRound(db, ORG_NORTHWIND, COHORT_NORTHWIND, "readout")).ok).toBe(false);
      expect((await admin.saveClientPack(db, ORG_NORTHWIND, PACK)).ok).toBe(false);
      expect(
        (await admin.importParticipants(db, ORG_NORTHWIND, COHORT_NORTHWIND,
          "email,name,layer,role_title\nnew@vitest-f1.example,New,risk,")).ok
      ).toBe(false);
      expect(
        (await admin.saveContentItem(db, null, {
          type: "module", layer: "", slug: `${SLUG}-x`, title: "x", format: "markdown", body: "",
        })).ok
      ).toBe(false);
    }
    const service = serviceClient();
    const { data: invited } = await service.from("app_users").select("id").like("email", "%@vitest-f1.example");
    expect(invited).toEqual([]);
    const { data: cohort } = await service.from("cohorts").select("current_round").eq("id", COHORT_NORTHWIND).single();
    expect(cohort?.current_round).toBe("baseline");
  });
});

describe("F1 admin operations: admin", () => {
  let orgId: string;
  let cohortId: string;

  it("creates an organization, a cohort with an access code, a sponsor, and sets the round", async () => {
    const org = await admin.createOrganization(adminDb, { name: ORG_NAME, sector: "Testing" });
    expect(org.ok).toBe(true);
    orgId = org.ok ? org.data.id : "";

    const cohort = await admin.createCohort(adminDb, orgId, { name: "Cohort 1", start_date: "2026-11-09" });
    expect(cohort.ok && cohort.data.access_code).toMatch(ACCESS_CODE_PATTERN);
    cohortId = cohort.ok ? cohort.data.id : "";

    expect((await admin.createCohort(adminDb, orgId, { name: "", start_date: "" })).ok).toBe(false);
    expect((await admin.addSponsor(adminDb, orgId, "Sponsor@vitest-f1.example")).ok).toBe(true);
    expect(await admin.addSponsor(adminDb, orgId, "sponsor@vitest-f1.example")).toEqual({
      ok: false,
      error: "That email is already registered.",
    });
    expect((await admin.setCohortRound(adminDb, orgId, cohortId, "readout")).ok).toBe(true);
    expect((await admin.setCohortRound(adminDb, orgId, cohortId, "final")).ok).toBe(false);
  });

  it("saves client packs as new versions and keeps earlier versions readable", async () => {
    const v1 = await admin.saveClientPack(adminDb, orgId, PACK);
    const v2 = await admin.saveClientPack(adminDb, orgId, { ...PACK, policy_text: "Fictional policy v2" });
    expect(v1).toEqual({ ok: true, data: { version: 1 } });
    expect(v2).toEqual({ ok: true, data: { version: 2 } });
    expect((await admin.saveClientPack(adminDb, orgId, { ...PACK, policy_text: "  " })).ok).toBe(false);

    const { data } = await adminDb.from("client_packs").select("version, policy_text, approved_tools, created_by")
      .eq("org_id", orgId).order("version");
    expect(data?.map((p) => [p.version, p.policy_text])).toEqual([[1, "Fictional policy v1"], [2, "Fictional policy v2"]]);
    expect(data?.[0].approved_tools).toEqual(PACK.approved_tools);
    expect(data?.[0].created_by).toBe(adminId);
  });

  it("imports valid CSV rows, reports invalid ones, and lets imported people sign in", async () => {
    const csv = [
      "email,name,layer,role_title",
      "ana@vitest-f1.example,Ana,risk,Risk lead",
      "bo@vitest-f1.example,Bo,ceo,",
      "sponsor@northwind.example,Taken,board,",
      "cy@vitest-f1.example,Cy,builder,",
    ].join("\n");
    const check = await admin.checkParticipantImport(adminDb, orgId, cohortId, csv);
    expect(check.ok).toBe(true);
    const errors = check.ok ? Object.fromEntries(check.data.rows.map((r) => [r.line, r.errors])) : {};
    expect(errors[2]).toEqual([]);
    expect(errors[3][0]).toMatch(/Layer must be one of/);
    expect(errors[4]).toEqual(["Email is already registered with another role or organization"]);
    expect(errors[5]).toEqual([]);

    expect(await admin.importParticipants(adminDb, orgId, cohortId, csv)).toEqual({
      ok: true,
      data: { imported: 2, skipped: 2 },
    });
    const again = await admin.checkParticipantImport(adminDb, orgId, cohortId, csv);
    expect(again.ok && again.data.rows[0].errors).toEqual(["Already in this cohort"]);
    expect((await admin.importParticipants(adminDb, orgId, COHORT_NORTHWIND, csv)).ok).toBe(false);

    // First sign-in creates the auth user; the invite trigger accepts it and links the participant.
    const created = await serviceClient().auth.admin.createUser({ email: "ana@vitest-f1.example", email_confirm: true });
    expect(created.error).toBeNull();
    const ana = await signInAs("ana@vitest-f1.example");
    const { data: self } = await ana.from("participants").select("name, layer, org_id");
    expect(self).toEqual([{ name: "Ana", layer: "risk", org_id: orgId }]);
  });

  it("imports all-or-nothing: a failing row leaves no stray invites", async () => {
    const { error } = await adminDb.rpc("import_participants", {
      p_org_id: orgId,
      p_cohort_id: cohortId,
      p_rows: [
        { email: "dee@vitest-f1.example", name: "Dee", layer: "risk", role_title: "" },
        { email: "eve@vitest-f1.example", name: "Eve", layer: "ceo", role_title: "" },
      ],
    });
    expect(error).not.toBeNull();
    const { data } = await serviceClient().from("app_users").select("email").in("email", ["dee@vitest-f1.example", "eve@vitest-f1.example"]);
    expect(data).toEqual([]);
  });

  it("writes an audit-log entry for every admin action", async () => {
    expect(await auditActions(orgId)).toEqual([
      "organization.create",
      "cohort.create",
      "sponsor.invite",
      "cohort.set_round",
      "client_pack.create",
      "client_pack.create",
      "participants.import",
    ]);
  });

  it("removes a sponsor", async () => {
    const { data: sp } = await adminDb.from("app_users").select("id").eq("org_id", orgId).eq("role", "sponsor").single();
    expect((await admin.removeSponsor(adminDb, orgId, sp!.id)).ok).toBe(true);
    expect((await admin.removeSponsor(adminDb, ORG_NORTHWIND, sp!.id)).ok).toBe(false);
  });
});

describe("F1 content items", () => {
  it("are created and edited as Markdown or JSON, with JSON checked and slugs unique", async () => {
    const base = { type: "scenario", layer: "risk", slug: `${SLUG}-json`, title: "Scenario", format: "json" };
    expect(await admin.saveContentItem(adminDb, null, { ...base, body: "{not json" })).toMatchObject({
      ok: false,
      error: expect.stringMatching(/not valid JSON/),
    });
    const created = await admin.saveContentItem(adminDb, null, { ...base, body: '{"question":"Q1"}' });
    expect(created.ok).toBe(true);
    const id = created.ok ? created.data.id : "";

    expect((await admin.saveContentItem(adminDb, null, { ...base, body: "{}" })).ok).toBe(false);
    expect((await admin.saveContentItem(adminDb, null, { ...base, slug: "Bad Slug!", body: "{}" })).ok).toBe(false);

    const edited = await admin.saveContentItem(adminDb, id, { ...base, format: "markdown", body: "# Now markdown" });
    expect(edited.ok).toBe(true);
    const { data } = await adminDb.from("content_items").select("format, body, version").eq("id", id).single();
    expect(data).toEqual({ format: "markdown", body: "# Now markdown", version: 2 });

    // The database also refuses invalid JSON, whatever the client sends.
    const { error } = await adminDb.from("content_items").update({ format: "json", body: "nope" }).eq("id", id);
    expect(error).not.toBeNull();
  });
});

describe("F1 admin page queries", () => {
  it("resolve every embedded relationship the admin pages use", async () => {
    const queries = [
      adminDb.from("organizations").select("id, name, sector, cohorts(id, participants(id)), client_packs(version)"),
      adminDb.from("cohorts").select("id, name, access_code, start_date, current_round, participants(id)"),
      adminDb.from("participants").select("id, name, email, layer, role_title, user_id, cohorts(name)"),
    ];
    for (const { error, data } of await Promise.all(queries)) {
      expect(error).toBeNull();
      expect(data?.length).toBeGreaterThan(0);
    }
  });
});
