"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import * as admin from "@/lib/admin/data";
import type { ActionState } from "@/lib/action-state";
import { requireRole } from "@/lib/auth";
import { readClientPackForm } from "@/lib/client-pack";
import type { CsvCheck } from "@/lib/participants-csv";
import { extractPolicyText, PolicyFileError } from "@/lib/policy-text";
import { createClient } from "@/lib/supabase/server";

const idSchema = z.guid();

async function adminDb() {
  await requireRole("admin");
  return createClient();
}

function str(form: FormData, key: string): string {
  const v = form.get(key);
  return typeof v === "string" ? v : "";
}

function id(form: FormData, key: string): string {
  const parsed = idSchema.safeParse(str(form, key));
  if (!parsed.success) throw new admin.AdminError("Invalid request.");
  return parsed.data;
}

const error = (message: string): ActionState => ({ status: "error", message });

/** Runs an admin operation, turning expected failures into a form message. */
async function guard<T>(fn: () => Promise<T>): Promise<T | ActionState> {
  try {
    return await fn();
  } catch (e) {
    if (e instanceof admin.AdminError) return error(e.message);
    throw e;
  }
}

const isState = (v: unknown): v is ActionState => typeof v === "object" && v !== null && "status" in v;

export async function createOrganizationAction(_prev: ActionState, form: FormData): Promise<ActionState> {
  const result = await guard(async () =>
    admin.createOrganization(await adminDb(), { name: str(form, "name"), sector: str(form, "sector") })
  );
  if (isState(result)) return result;
  if (!result.ok) return error(result.error);
  redirect(`/admin/orgs/${result.data.id}?notice=org-created`);
}

export async function addSponsorAction(_prev: ActionState, form: FormData): Promise<ActionState> {
  const result = await guard(async () => {
    const orgId = id(form, "org_id");
    const r = await admin.addSponsor(await adminDb(), orgId, str(form, "email"));
    revalidatePath(`/admin/orgs/${orgId}`);
    return r;
  });
  if (isState(result)) return result;
  return result.ok ? { status: "ok", message: "Sponsor added. They can sign in with a magic link." } : error(result.error);
}

export async function removeSponsorAction(_prev: ActionState, form: FormData): Promise<ActionState> {
  const result = await guard(async () => {
    const orgId = id(form, "org_id");
    const r = await admin.removeSponsor(await adminDb(), orgId, id(form, "app_user_id"));
    revalidatePath(`/admin/orgs/${orgId}`);
    return r;
  });
  if (isState(result)) return result;
  return result.ok ? { status: "ok", message: "Removed." } : error(result.error);
}

export async function createCohortAction(_prev: ActionState, form: FormData): Promise<ActionState> {
  const result = await guard(async () => {
    const orgId = id(form, "org_id");
    const r = await admin.createCohort(await adminDb(), orgId, {
      name: str(form, "name"),
      start_date: str(form, "start_date"),
    });
    revalidatePath(`/admin/orgs/${orgId}`);
    return r;
  });
  if (isState(result)) return result;
  return result.ok
    ? { status: "ok", message: `Cohort created. Access code: ${result.data.access_code}` }
    : error(result.error);
}

export async function setCohortRoundAction(_prev: ActionState, form: FormData): Promise<ActionState> {
  const result = await guard(async () => {
    const orgId = id(form, "org_id");
    const r = await admin.setCohortRound(await adminDb(), orgId, id(form, "cohort_id"), str(form, "round"));
    revalidatePath(`/admin/orgs/${orgId}`);
    return r;
  });
  if (isState(result)) return result;
  return result.ok ? { status: "ok", message: "Round updated." } : error(result.error);
}

export type ExtractState = ActionState & { text?: string; fileName?: string; nonce?: number };

export async function extractPolicyAction(_prev: ExtractState, form: FormData): Promise<ExtractState> {
  await requireRole("admin");
  const file = form.get("policy_file");
  if (!(file instanceof File) || file.size === 0) return error("Choose a file to upload.");
  try {
    const text = await extractPolicyText(file.name, new Uint8Array(await file.arrayBuffer()));
    return {
      status: "ok",
      message: `Text extracted from ${file.name}. Check it below before saving.`,
      text,
      fileName: file.name,
      nonce: Date.now(),
    };
  } catch (e) {
    if (e instanceof PolicyFileError) return error(e.message);
    console.error("policy extraction failed", { name: file.name, size: file.size });
    return error("Could not read this file.");
  }
}

export async function saveClientPackAction(_prev: ActionState, form: FormData): Promise<ActionState> {
  const result = await guard(async () => {
    const orgId = id(form, "org_id");
    if (form.get("confirmed") !== "on") return error("Confirm that you have checked the policy text.");
    const r = await admin.saveClientPack(await adminDb(), orgId, readClientPackForm(form));
    return { orgId, r };
  });
  if (isState(result)) return result;
  if (!result.r.ok) return error(result.r.error);
  redirect(`/admin/orgs/${result.orgId}/client-pack/${result.r.data.version}?notice=pack-saved`);
}

export type ImportState = ActionState & { check?: CsvCheck; csv?: string; cohortId?: string };

async function readCsv(form: FormData): Promise<string> {
  const file = form.get("csv_file");
  if (file instanceof File && file.size > 0) {
    if (file.size > 2 * 1024 * 1024) throw new admin.AdminError("The CSV is larger than 2 MB.");
    return file.text();
  }
  return str(form, "csv_text");
}

export async function checkImportAction(_prev: ImportState, form: FormData): Promise<ImportState> {
  const result = await guard(async () => {
    const orgId = id(form, "org_id");
    const cohortId = id(form, "cohort_id");
    const csv = await readCsv(form);
    if (!csv.trim()) return error("Upload a CSV file or paste its contents.");
    const r = await admin.checkParticipantImport(await adminDb(), orgId, cohortId, csv);
    return r.ok ? ({ status: "ok", check: r.data, csv, cohortId } as ImportState) : error(r.error);
  });
  return result as ImportState;
}

export async function importParticipantsAction(_prev: ActionState, form: FormData): Promise<ActionState> {
  const result = await guard(async () => {
    const orgId = id(form, "org_id");
    const r = await admin.importParticipants(await adminDb(), orgId, id(form, "cohort_id"), str(form, "csv"));
    return { orgId, r };
  });
  if (isState(result)) return result;
  if (!result.r.ok) return error(result.r.error);
  const { imported, skipped } = result.r.data;
  redirect(`/admin/orgs/${result.orgId}?notice=imported&n=${imported}&s=${skipped}`);
}

export async function saveContentAction(_prev: ActionState, form: FormData): Promise<ActionState> {
  const result = await guard(async () => {
    const existingId = str(form, "id") ? id(form, "id") : null;
    return admin.saveContentItem(await adminDb(), existingId, {
      type: str(form, "type"),
      layer: str(form, "layer"),
      slug: str(form, "slug"),
      title: str(form, "title"),
      format: str(form, "format"),
      body: str(form, "body"),
    });
  });
  if (isState(result)) return result;
  if (!result.ok) return error(result.error);
  revalidatePath("/admin/content");
  redirect("/admin/content?notice=content-saved");
}
