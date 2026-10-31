"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { publicEnv } from "@/lib/env";

export type LoginState = { status: "idle" | "sent" | "error"; message?: string };

const emailSchema = z.string().trim().toLowerCase().pipe(z.email());

const SENT_MESSAGE =
  "If that email is registered for RAI Academy Pilot, a sign-in link is on its way. Check your inbox.";

export async function requestMagicLink(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = emailSchema.safeParse(formData.get("email"));
  if (!parsed.success) return { status: "error", message: "Enter a valid email address." };
  const email = parsed.data;

  // Only invited emails get a link. The response is the same either way so
  // the form cannot be used to discover who is registered.
  const { data: invited } = await createAdminClient()
    .from("app_users")
    .select("id")
    .eq("email", email)
    .maybeSingle();
  if (!invited) return { status: "sent", message: SENT_MESSAGE };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${publicEnv.siteUrl()}/auth/confirm` },
  });
  if (error) {
    console.error("magic link request failed", { code: error.code, status: error.status });
    return { status: "error", message: "Could not send a sign-in link. Try again in a minute." };
  }
  return { status: "sent", message: SENT_MESSAGE };
}
