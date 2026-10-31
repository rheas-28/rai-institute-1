import { Card } from "@/components/app-shell";
import { requireRole } from "@/lib/auth";

export default async function SponsorHome() {
  const user = await requireRole("sponsor");
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">{user.orgName} dashboard</h1>
      <Card title="Shadow AI Self-Check results">
        <p className="text-muted">
          Aggregate, anonymous results appear here once the dashboard ships (F3). Breakdowns are
          only shown for groups of 5 or more runs.
        </p>
      </Card>
    </div>
  );
}
