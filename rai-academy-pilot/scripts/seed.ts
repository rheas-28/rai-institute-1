// Seeds two fictional organizations for local development and tests.
// Usage: npm run seed  (reads .env.local). Idempotent.
import { config } from "dotenv";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import * as data from "./seed-data";

config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) throw new Error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
const isLocal = /^https?:\/\/(127\.0\.0\.1|localhost)(:|\/|$)/.test(url);
if (!isLocal && process.env.SEED_ALLOW_REMOTE !== "1") {
  throw new Error(`Refusing to seed non-local Supabase at ${url}. Set SEED_ALLOW_REMOTE=1 to override.`);
}

const db = createClient(url, serviceKey, { auth: { persistSession: false } });

function check<T>(label: string, res: { data: T; error: { message: string } | null }): T {
  if (res.error) throw new Error(`${label}: ${res.error.message}`);
  return res.data;
}

async function ensureAuthUser(client: SupabaseClient, email: string) {
  const { error } = await client.auth.admin.createUser({ email, email_confirm: true });
  if (error && !/already been registered|already exists/i.test(error.message)) {
    throw new Error(`createUser ${email}: ${error.message}`);
  }
}

async function main() {
  check("organizations", await db.from("organizations").upsert(data.organizations));
  check("cohorts", await db.from("cohorts").upsert(data.cohorts));

  const appUsers = [
    { email: data.ADMIN_EMAIL, role: "admin", org_id: null },
    ...data.sponsors.map((s) => ({ email: s.email, role: "sponsor", org_id: s.org_id })),
    ...data.participants.map((p) => ({ email: p.email, role: "participant", org_id: p.org_id })),
  ];
  check("app_users", await db.from("app_users").upsert(appUsers, { onConflict: "email", ignoreDuplicates: true }));
  check(
    "participants",
    await db.from("participants").upsert(data.participants, { onConflict: "cohort_id,email", ignoreDuplicates: true }),
  );

  for (const u of appUsers) await ensureAuthUser(db, u.email);

  for (const pack of data.clientPacks) {
    const existing = check(
      "client_packs select",
      await db.from("client_packs").select("id").eq("org_id", pack.org_id).limit(1),
    );
    if (!existing?.length) check("client_packs insert", await db.from("client_packs").insert(pack));
  }

  check("content_items", await db.from("content_items").upsert(data.contentItems, { onConflict: "slug" }));

  console.log(`Seeded ${data.organizations.length} organizations and ${appUsers.length} users.`);
  console.log("Sign in locally with any of:");
  for (const u of appUsers) console.log(`  ${u.role.padEnd(11)} ${u.email}`);
  console.log("Magic-link emails arrive in Mailpit: http://127.0.0.1:54324");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
