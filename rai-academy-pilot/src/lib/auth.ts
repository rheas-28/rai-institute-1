import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { homePathForRole, isRole, type Role } from "@/lib/roles";

export type CurrentUser = {
  userId: string;
  email: string;
  role: Role;
  orgId: string | null;
  orgName: string | null;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: appUser } = await supabase
    .from("app_users")
    .select("email, role, org_id, organizations(name)")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!appUser || !isRole(appUser.role)) return null;

  const org = appUser.organizations as unknown as { name: string } | null;
  return {
    userId: user.id,
    email: appUser.email,
    role: appUser.role,
    orgId: appUser.org_id,
    orgName: org?.name ?? null,
  };
}

/** Use at the top of a protected layout or page. Redirects if the role does not match. */
export async function requireRole(role: Role): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role !== role) redirect(homePathForRole(user.role));
  return user;
}
