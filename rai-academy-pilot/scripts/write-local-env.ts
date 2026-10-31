// Writes .env.local from the running local Supabase stack (`npx supabase start`).
import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const status = JSON.parse(execSync("npx supabase status -o json", { encoding: "utf8" }));
const values: Record<string, string> = {
  NEXT_PUBLIC_SUPABASE_URL: status.API_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: status.ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: status.SERVICE_ROLE_KEY,
  NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
  // Direct Postgres URL, used only by the test suite for schema checks.
  DATABASE_URL: status.DB_URL,
};

const existing = existsSync(".env.local") ? readFileSync(".env.local", "utf8") : "";
const kept = existing
  .split("\n")
  .filter((line) => line && !Object.keys(values).some((k) => line.startsWith(`${k}=`)));
const lines = [...Object.entries(values).map(([k, v]) => `${k}=${v}`), ...kept];
writeFileSync(".env.local", lines.join("\n") + "\n");
console.log("Wrote .env.local for local Supabase at", status.API_URL);
