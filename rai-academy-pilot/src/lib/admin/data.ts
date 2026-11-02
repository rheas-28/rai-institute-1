// Admin operations. Each takes the signed-in user's Supabase client, so the
// database's row-level security decides what is allowed, and writes one
// audit-log entry per action.
import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import { generateAccessCode } from "@/lib/access-code";
import { clientPackSchema, type ClientPackInput } from "@/lib/client-pack";
import { checkParticipantsCsv, type CsvCheck } from "@/lib/participants-csv";
import { LAYERS } from "@/lib/roles";

type Db = SupabaseClient;

export class AdminError extends Error {}

export type Result<T = undefined> = { ok: true; data: T } | { ok: false; error: string };

const ok = <T>(data: T): Result<T> => ({ ok: true, data });
const fail = (error: string): Result<never> => ({ ok: false, error });

function firstIssue(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Invalid input";
}

async function actorId(db: Db): Promise<string> {
  const { data } = await db.auth.getUser();
  if (!data.user) throw new AdminError("Not signed in");
  return data.user.id;
}

export async function logAudit(
  db: Db,
  entry: { orgId: string | null; action: string; target: string }
): Promise<void> {
  const actor = await actorId(db);
  const { error } = await db
    .from("audit_log")
    .insert({ org_id: entry.orgId, actor, action: entry.action, target: entry.target });
  if (error) throw new AdminError(`Could not write the audit log: ${error.message}`);
}

const orgSchema = z.object({
  name: z.string().trim().min(1, "Enter an organization name").max(200),
  sector: z.string().trim().max(200).transform((v) => v || null),
});

export async function createOrganization(db: Db, input: unknown): Promise<Result<{ id: string }>> {
  const parsed = orgSchema.safeParse(input);
  if (!parsed.success) return fail(firstIssue(parsed.error));
  const { data, error } = await db.from("organizations").insert(parsed.data).select("id").single();
  if (error || !data) return fail("Could not create the organization.");
  await logAudit(db, { orgId: data.id, action: "organization.create", target: parsed.data.name });
  return ok({ id: data.id });
}

const emailSchema = z.string().trim().toLowerCase().pipe(z.email("Enter a valid email address"));

export async function addSponsor(db: Db, orgId: string, email: unknown): Promise<Result> {
  const parsed = emailSchema.safeParse(email);
  if (!parsed.success) return fail(firstIssue(parsed.error));
  const { error } = await db
    .from("app_users")
    .insert({ email: parsed.data, role: "sponsor", org_id: orgId });
  if (error?.code === "23505") return fail("That email is already registered.");
  if (error) return fail("Could not add the sponsor.");
  await logAudit(db, { orgId, action: "sponsor.invite", target: parsed.data });
  return ok(undefined);
}

export async function removeSponsor(db: Db, orgId: string, appUserId: string): Promise<Result> {
  const { data, error } = await db
    .from("app_users")
    .delete()
    .eq("id", appUserId)
    .eq("org_id", orgId)
    .eq("role", "sponsor")
    .select("email");
  if (error || !data?.length) return fail("Could not remove the sponsor.");
  await logAudit(db, { orgId, action: "sponsor.remove", target: data[0].email });
  return ok(undefined);
}

const cohortSchema = z.object({
  name: z.string().trim().min(1, "Enter a cohort name").max(200),
  start_date: z
    .string()
    .trim()
    .transform((v) => v || null)
    .pipe(z.iso.date("Enter a valid start date").nullable()),
});

export async function createCohort(
  db: Db,
  orgId: string,
  input: unknown
): Promise<Result<{ id: string; access_code: string }>> {
  const parsed = cohortSchema.safeParse(input);
  if (!parsed.success) return fail(firstIssue(parsed.error));
  for (let attempt = 0; attempt < 5; attempt++) {
    const access_code = generateAccessCode();
    const { data, error } = await db
      .from("cohorts")
      .insert({ ...parsed.data, org_id: orgId, access_code })
      .select("id, access_code")
      .single();
    if (error?.code === "23505") continue; // access code collision; try another
    if (error || !data) return fail("Could not create the cohort.");
    await logAudit(db, { orgId, action: "cohort.create", target: `${parsed.data.name} (${access_code})` });
    return ok(data);
  }
  return fail("Could not generate a unique access code. Try again.");
}

const roundSchema = z.enum(["baseline", "readout"]);

export async function setCohortRound(db: Db, orgId: string, cohortId: string, round: unknown): Promise<Result> {
  const parsed = roundSchema.safeParse(round);
  if (!parsed.success) return fail("Round must be baseline or readout.");
  const { data, error } = await db
    .from("cohorts")
    .update({ current_round: parsed.data })
    .eq("id", cohortId)
    .eq("org_id", orgId)
    .select("name");
  if (error || !data?.length) return fail("Could not change the round.");
  await logAudit(db, { orgId, action: "cohort.set_round", target: `${data[0].name}: ${parsed.data}` });
  return ok(undefined);
}

export async function saveClientPack(db: Db, orgId: string, input: unknown): Promise<Result<{ version: number }>> {
  const parsed = clientPackSchema.safeParse(input);
  if (!parsed.success) return fail(firstIssue(parsed.error));
  const pack: ClientPackInput = parsed.data;
  const created_by = await actorId(db);
  // The version is assigned by a database trigger; 0 is a placeholder.
  const { data, error } = await db
    .from("client_packs")
    .insert({ org_id: orgId, version: 0, created_by, ...pack })
    .select("version")
    .single();
  if (error || !data) return fail("Could not save the client pack.");
  await logAudit(db, { orgId, action: "client_pack.create", target: `version ${data.version}` });
  return ok({ version: data.version });
}

/** Validates the CSV and checks every row against people already registered. */
export async function checkParticipantImport(
  db: Db,
  orgId: string,
  cohortId: string,
  csv: string
): Promise<Result<CsvCheck>> {
  const { data: cohort } = await db
    .from("cohorts")
    .select("id")
    .eq("id", cohortId)
    .eq("org_id", orgId)
    .maybeSingle();
  if (!cohort) return fail("Choose a cohort in this organization.");

  const check = checkParticipantsCsv(csv);
  const emails = check.rows.flatMap((r) => (r.row ? [r.row.email] : []));
  if (check.fileErrors.length || !emails.length) return ok(check);

  const registered = new Map<string, { role: string; org_id: string | null }>();
  const inCohort = new Set<string>();
  for (let i = 0; i < emails.length; i += 200) {
    const chunk = emails.slice(i, i + 200);
    const [users, people] = await Promise.all([
      db.from("app_users").select("email, role, org_id").in("email", chunk),
      db.from("participants").select("email").eq("cohort_id", cohortId).in("email", chunk),
    ]);
    if (users.error || people.error) return fail("Could not check the file against existing people.");
    users.data.forEach((u) => registered.set(u.email.toLowerCase(), u));
    people.data.forEach((p) => inCohort.add(p.email.toLowerCase()));
  }

  for (const r of check.rows) {
    if (!r.row) continue;
    const existing = registered.get(r.row.email);
    if (inCohort.has(r.row.email)) r.errors.push("Already in this cohort");
    else if (existing && !(existing.role === "participant" && existing.org_id === orgId)) {
      r.errors.push("Email is already registered with another role or organization");
    }
    if (r.errors.length) r.row = undefined;
  }
  return ok(check);
}

export async function importParticipants(
  db: Db,
  orgId: string,
  cohortId: string,
  csv: string
): Promise<Result<{ imported: number; skipped: number }>> {
  const checked = await checkParticipantImport(db, orgId, cohortId, csv);
  if (!checked.ok) return checked;
  if (checked.data.fileErrors.length) return fail(checked.data.fileErrors[0]);
  const valid = checked.data.rows.flatMap((r) => (r.row ? [r.row] : []));
  const skipped = checked.data.rows.length - valid.length;
  if (!valid.length) return fail("No valid rows to import.");

  const { error } = await db.rpc("import_participants", {
    p_org_id: orgId,
    p_cohort_id: cohortId,
    p_rows: valid,
  });
  if (error) return fail("Could not import the participants. Nothing was added.");

  await logAudit(db, {
    orgId,
    action: "participants.import",
    target: `${valid.length} imported, ${skipped} skipped (cohort ${cohortId})`,
  });
  return ok({ imported: valid.length, skipped });
}

export const CONTENT_TYPES = ["module", "scenario", "rubric", "prompt"] as const;

const contentSchema = z
  .object({
    type: z.enum(CONTENT_TYPES, { error: "Choose a type" }),
    layer: z
      .string()
      .transform((v) => v || null)
      .pipe(z.enum(LAYERS).nullable()),
    slug: z
      .string()
      .trim()
      .toLowerCase()
      .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Slug can only use lowercase letters, numbers and single hyphens")
      .max(100),
    title: z.string().trim().min(1, "Enter a title").max(200),
    format: z.enum(["markdown", "json"]),
    body: z.string().max(200_000, "The body is too long"),
  })
  .superRefine((v, ctx) => {
    if (v.format !== "json") return;
    try {
      JSON.parse(v.body);
    } catch (e) {
      ctx.addIssue({ code: "custom", path: ["body"], message: `Body is not valid JSON: ${(e as Error).message}` });
    }
  });

export async function saveContentItem(
  db: Db,
  id: string | null,
  input: unknown
): Promise<Result<{ id: string }>> {
  const parsed = contentSchema.safeParse(input);
  if (!parsed.success) return fail(firstIssue(parsed.error));
  const item = parsed.data;

  if (!id) {
    const { data, error } = await db.from("content_items").insert(item).select("id").single();
    if (error?.code === "23505") return fail("That slug is already used.");
    if (error || !data) return fail("Could not save the content item.");
    await logAudit(db, { orgId: null, action: "content.create", target: `${item.type}:${item.slug}` });
    return ok({ id: data.id });
  }

  const { data: current } = await db.from("content_items").select("version").eq("id", id).maybeSingle();
  if (!current) return fail("Content item not found.");
  const { error } = await db
    .from("content_items")
    .update({ ...item, version: current.version + 1 })
    .eq("id", id);
  if (error?.code === "23505") return fail("That slug is already used.");
  if (error) return fail("Could not save the content item.");
  await logAudit(db, {
    orgId: null,
    action: "content.update",
    target: `${item.type}:${item.slug} v${current.version + 1}`,
  });
  return ok({ id });
}
