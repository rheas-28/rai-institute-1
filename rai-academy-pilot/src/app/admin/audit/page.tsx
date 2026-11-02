import { Card } from "@/components/app-shell";
import { formatDate } from "@/components/form";
import { createClient } from "@/lib/supabase/server";

export default async function AuditPage() {
  const supabase = await createClient();
  const [{ data: entries }, { data: users }] = await Promise.all([
    supabase
      .from("audit_log")
      .select("id, action, target, actor, created_at, organizations(name)")
      .order("created_at", { ascending: false })
      .limit(200),
    supabase.from("app_users").select("user_id, email").not("user_id", "is", null),
  ]);
  const emails = new Map((users ?? []).map((u) => [u.user_id, u.email]));

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Audit log</h1>
      <Card title="Latest 200 entries">
        {!entries?.length ? (
          <p className="text-muted">No entries yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-muted">
                <tr>
                  <th className="py-2 pr-3 font-medium">When</th>
                  <th className="py-2 pr-3 font-medium">Who</th>
                  <th className="py-2 pr-3 font-medium">Organization</th>
                  <th className="py-2 pr-3 font-medium">Action</th>
                  <th className="py-2 font-medium">Target</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {entries.map((e) => (
                  <tr key={e.id}>
                    <td className="whitespace-nowrap py-2 pr-3">{formatDate(e.created_at)}</td>
                    <td className="py-2 pr-3">{(e.actor && emails.get(e.actor)) ?? "system"}</td>
                    <td className="py-2 pr-3">{(e.organizations as unknown as { name: string } | null)?.name ?? "—"}</td>
                    <td className="py-2 pr-3"><code>{e.action}</code></td>
                    <td className="py-2">{e.target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
