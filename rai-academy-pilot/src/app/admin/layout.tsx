import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { requireRole } from "@/lib/auth";

const NAV = [
  { href: "/admin", label: "Organizations" },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/audit", label: "Audit log" },
];

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await requireRole("admin");
  return (
    <AppShell user={user}>
      <nav aria-label="Admin" className="mb-6 flex flex-wrap gap-4 border-b border-line pb-3 text-sm font-medium">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className="text-brand underline-offset-4 hover:underline">
            {item.label}
          </Link>
        ))}
      </nav>
      {children}
    </AppShell>
  );
}
