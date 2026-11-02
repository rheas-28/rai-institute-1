import Link from "next/link";
import { ActionForm } from "@/components/action-form";
import { Card } from "@/components/app-shell";
import { Field, inputClass } from "@/components/form";
import { createClient } from "@/lib/supabase/server";
import { createOrganizationAction } from "./actions";

export default async function AdminHome() {
  const supabase = await createClient();
  const { data: orgs } = await supabase
    .from("organizations")
    .select("id, name, sector, cohorts(id), participants(id), client_packs(version)")
    .order("name");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Organizations</h1>
      <Card title="All organizations">
        {!orgs?.length ? (
          <p className="text-muted">No organizations yet.</p>
        ) : (
          <ul className="divide-y divide-line">
            {orgs.map((org) => {
              const latest = Math.max(0, ...org.client_packs.map((p: { version: number }) => p.version));
              return (
                <li key={org.id} className="py-3">
                  <Link href={`/admin/orgs/${org.id}`} className="font-medium text-brand underline-offset-4 hover:underline">
                    {org.name}
                  </Link>
                  <p className="text-sm text-muted">
                    {[org.sector, `${org.cohorts.length} cohort(s)`, `${org.participants.length} participant(s)`,
                      latest ? `client pack v${latest}` : "no client pack"]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
      <Card title="New organization">
        <ActionForm action={createOrganizationAction} submitLabel="Create organization">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Name" htmlFor="org-name">
              <input id="org-name" name="name" required maxLength={200} className={inputClass} />
            </Field>
            <Field label="Sector" htmlFor="org-sector">
              <input id="org-sector" name="sector" maxLength={200} className={inputClass} />
            </Field>
          </div>
        </ActionForm>
      </Card>
    </div>
  );
}
