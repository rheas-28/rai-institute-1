import Link from "next/link";
import type { CurrentUser } from "@/lib/auth";

const ROLE_LABEL = { admin: "RAI admin", sponsor: "Sponsor", participant: "Participant" } as const;

export function AppShell({ user, children }: { user: CurrentUser; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:p-2 focus:bg-white">
        Skip to content
      </a>
      <header className="bg-brand text-brand-contrast">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link href="/" className="text-lg font-medium">
            RAI Academy Pilot
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span>
              {ROLE_LABEL[user.role]}
              {user.orgName ? ` · ${user.orgName}` : ""}
            </span>
            <span className="opacity-90">{user.email}</span>
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="rounded border border-white/60 px-3 py-1 hover:bg-white/10"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main id="main" className="mx-auto max-w-5xl px-4 py-8">
        {children}
      </main>
    </div>
  );
}

export function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <h2 className="mb-3 text-lg font-medium">{title}</h2>
      {children}
    </section>
  );
}
