import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { Client as PgClient } from "pg";

function env(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is not set. Run: npm run db:start && npm run env:local && npm run seed`);
  return v;
}

export const url = () => env("NEXT_PUBLIC_SUPABASE_URL");

export function serviceClient(): SupabaseClient {
  return createClient(url(), env("SUPABASE_SERVICE_ROLE_KEY"), { auth: { persistSession: false } });
}

export function anonClient(): SupabaseClient {
  return createClient(url(), env("NEXT_PUBLIC_SUPABASE_ANON_KEY"), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Signs in as an invited user via a server-generated magic link (no inbox needed). */
export async function signInAs(email: string): Promise<SupabaseClient> {
  const { data, error } = await serviceClient().auth.admin.generateLink({ type: "magiclink", email });
  if (error) throw new Error(`generateLink ${email}: ${error.message}`);
  const client = anonClient();
  const { error: verifyError } = await client.auth.verifyOtp({
    type: "magiclink",
    token_hash: data.properties.hashed_token,
  });
  if (verifyError) throw new Error(`verifyOtp ${email}: ${verifyError.message}`);
  return client;
}

export async function withPg<T>(fn: (pg: PgClient) => Promise<T>): Promise<T> {
  const pg = new PgClient({ connectionString: env("DATABASE_URL") });
  await pg.connect();
  try {
    return await fn(pg);
  } finally {
    await pg.end();
  }
}

export const ORG_TABLES = [
  "app_users",
  "client_packs",
  "cohorts",
  "participants",
  "selfcheck_runs",
  "coach_sessions",
  "scenario_attempts",
  "proofs",
  "certificates",
  "audit_log",
] as const;

export const ALL_TABLES = ["organizations", "content_items", ...ORG_TABLES] as const;
