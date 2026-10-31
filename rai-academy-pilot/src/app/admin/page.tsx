import { Card } from "@/components/app-shell";
import { createClient } from "@/lib/supabase/server";

export default async function AdminHome() {
  const supabase = await createClient();
  const { data: orgs } = await supabase
    .from("organizations")
    .select("id, name, sector, cohorts(id, name, access_code, current_round)")
    .order("name");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Admin</h1>
      <Card title="Organizations">
        {!orgs?.length ? (
          <p className="text-muted">No organizations yet.</p>
        ) : (
          <ul className="divide-y divide-line">
            {orgs.map((org) => (
              <li key={org.id} className="py-3">
                <p className="font-medium">{org.name}</p>
                <p className="text-sm text-muted">{org.sector}</p>
                <ul className="mt-1 text-sm">
                  {org.cohorts.map((c) => (
                    <li key={c.id}>
                      {c.name} · access code <code>{c.access_code}</code> · round {c.current_round}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </Card>
      <p className="text-sm text-muted">Client-pack loader, cohorts and participant import arrive in F1.</p>
    </div>
  );
}
