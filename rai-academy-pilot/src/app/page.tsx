import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { homePathForRole } from "@/lib/roles";

export default async function Home() {
  const user = await getCurrentUser();
  if (user) redirect(homePathForRole(user.role));

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-6 px-4">
      <h1 className="text-3xl font-bold text-brand">RAI Academy Pilot</h1>
      <p className="text-muted">
        Sign in with the email address RAI invited. Taking the Shadow AI Self-Check? Use the
        cohort link and access code from your organization instead.
      </p>
      <Link
        href="/login"
        className="self-start rounded bg-brand px-5 py-2 font-medium text-brand-contrast hover:opacity-90"
      >
        Sign in
      </Link>
    </main>
  );
}
