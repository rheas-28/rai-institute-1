import "server-only";
import { createClient } from "@supabase/supabase-js";
import { publicEnv } from "@/lib/env";

/** Service-role client. Bypasses RLS: server-only, never expose to the browser. */
export function createAdminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("Missing environment variable SUPABASE_SERVICE_ROLE_KEY");
  return createClient(publicEnv.supabaseUrl(), key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
