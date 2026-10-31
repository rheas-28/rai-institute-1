import { AppShell } from "@/components/app-shell";
import { requireRole } from "@/lib/auth";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await requireRole("sponsor");
  return <AppShell user={user}>{children}</AppShell>;
}
