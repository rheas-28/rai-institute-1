import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";
import { ActionForm } from "@/components/action-form";
import { Card } from "@/components/app-shell";
import { Field, Notice, buttonClass, formatDate, inputClass, secondaryButtonClass } from "@/components/form";
import { createClient } from "@/lib/supabase/server";
import {
  addSponsorAction,
  createCohortAction,
  removeSponsorAction,
  setCohortRoundAction,
} from "../../actions";

type Props = {
  params: Promise<{ orgId: string }>;
  searchParams: Promise<{ notice?: string; n?: string; s?: string }>;
};

export default async function OrgPage({ params, searchParams }: Props) {
  const { orgId } = await params;
  const { notice, n, s } = await searchParams;
  if (!z.guid().safeParse(orgId).success) notFound();

  const supabase = await createClient();
  const [{ data: org }, { data: packs }, { data: cohorts }, { data: sponsors }, { data: people }] = await Promise.all([
    supabase.from("organizations").select("id, name, sector").eq("id", orgId).maybeSingle(),
    supabase.from("client_packs").select("version, created_at, approved_tools").eq("org_id", orgId).order("version", { ascending: false }),
    supabase.from("cohorts").select("id, name, access_code, start_date, current_round, participants(id)").eq("org_id", orgId).order("created_at"),
    supabase.from("app_users").select("id, email, user_id").eq("org_id", orgId).eq("role", "sponsor").order("email"),
    supabase.from("participants").select("id, name, email, layer, role_title, user_id, cohorts(name)").eq("org_id", orgId).order("name"),
  ]);
  if (!org) notFound();

  const importDetail =
    notice === "imported" && n ? `${Number(n) || 0} imported, ${Number(s) || 0} skipped.` : undefined;
  const latest = packs?.[0];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{org.name}</h1>
        {org.sector && <p className="text-muted">{org.sector}</p>}
      </div>
      <Notice code={notice} detail={importDetail} />

      <Card title="Client pack">
        {latest ? (
          <p className="mb-3">
            Current: <strong>version {latest.version}</strong>, saved {formatDate(latest.created_at)},{" "}
            {Array.isArray(latest.approved_tools) ? latest.approved_tools.length : 0} approved tool(s).
          </p>
        ) : (
          <p className="mb-3 text-muted">No client pack loaded yet.</p>
        )}
        <div className="flex flex-wrap items-center gap-3">
          <Link href={`/admin/orgs/${orgId}/client-pack/new`} className={buttonClass}>
            {latest ? "Save a new version" : "Load client pack"}
          </Link>
        </div>
        {!!packs?.length && (
          <ul className="mt-4 flex flex-wrap gap-2 text-sm" aria-label="Client pack versions">
            {packs.map((p) => (
              <li key={p.version}>
                <Link href={`/admin/orgs/${orgId}/client-pack/${p.version}`} className={secondaryButtonClass}>
                  v{p.version}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card title="Cohorts">
        {!cohorts?.length ? (
          <p className="mb-4 text-muted">No cohorts yet.</p>
        ) : (
          <div className="mb-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-muted">
                <tr>
                  <th className="py-2 pr-4 font-medium">Name</th>
                  <th className="py-2 pr-4 font-medium">Access code</th>
                  <th className="py-2 pr-4 font-medium">Start</th>
                  <th className="py-2 pr-4 font-medium">People</th>
                  <th className="py-2 font-medium">Current round</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {cohorts.map((c) => (
                  <tr key={c.id}>
                    <td className="py-2 pr-4">{c.name}</td>
                    <td className="py-2 pr-4"><code className="text-base">{c.access_code}</code></td>
                    <td className="py-2 pr-4">{c.start_date ?? "—"}</td>
                    <td className="py-2 pr-4">{c.participants.length}</td>
                    <td className="py-2">
                      <ActionForm action={setCohortRoundAction} submitLabel="Set" secondary resetOnSuccess={false} className="flex flex-wrap items-center gap-2">
                        <input type="hidden" name="org_id" value={orgId} />
                        <input type="hidden" name="cohort_id" value={c.id} />
                        <label className="sr-only" htmlFor={`round-${c.id}`}>Round for {c.name}</label>
                        <select id={`round-${c.id}`} name="round" defaultValue={c.current_round} className="rounded border border-line bg-white px-2 py-1">
                          <option value="baseline">Baseline</option>
                          <option value="readout">Readout</option>
                        </select>
                      </ActionForm>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <h3 className="mb-2 font-medium">New cohort</h3>
        <ActionForm action={createCohortAction} submitLabel="Create cohort">
          <input type="hidden" name="org_id" value={orgId} />
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Name" htmlFor="cohort-name">
              <input id="cohort-name" name="name" required maxLength={200} className={inputClass} />
            </Field>
            <Field label="Start date (optional)" htmlFor="cohort-start">
              <input id="cohort-start" name="start_date" type="date" className={inputClass} />
            </Field>
          </div>
          <p className="text-sm text-muted">An access code is generated automatically.</p>
        </ActionForm>
      </Card>

      <Card title="Sponsors">
        {!sponsors?.length ? (
          <p className="mb-4 text-muted">No sponsors yet.</p>
        ) : (
          <ul className="mb-4 divide-y divide-line">
            {sponsors.map((sp) => (
              <li key={sp.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
                <span>
                  {sp.email} <span className="text-sm text-muted">{sp.user_id ? "· has signed in" : "· not signed in yet"}</span>
                </span>
                <ActionForm action={removeSponsorAction} submitLabel="Remove" pendingLabel="Removing…" secondary
                  className="flex items-center gap-2" confirm={`Remove sponsor ${sp.email}? They will no longer be able to sign in.`}>
                  <input type="hidden" name="org_id" value={orgId} />
                  <input type="hidden" name="app_user_id" value={sp.id} />
                </ActionForm>
              </li>
            ))}
          </ul>
        )}
        <ActionForm action={addSponsorAction} submitLabel="Add sponsor">
          <input type="hidden" name="org_id" value={orgId} />
          <Field label="Sponsor email" htmlFor="sponsor-email">
            <input id="sponsor-email" name="email" type="email" required className={inputClass} />
          </Field>
        </ActionForm>
      </Card>

      <Card title="Participants">
        <div className="mb-4">
          {cohorts?.length ? (
            <Link href={`/admin/orgs/${orgId}/participants/import`} className={buttonClass}>
              Import participants (CSV)
            </Link>
          ) : (
            <p className="text-muted">Create a cohort before importing participants.</p>
          )}
        </div>
        {!people?.length ? (
          <p className="text-muted">No participants yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-muted">
                <tr>
                  <th className="py-2 pr-4 font-medium">Name</th>
                  <th className="py-2 pr-4 font-medium">Email</th>
                  <th className="py-2 pr-4 font-medium">Layer</th>
                  <th className="py-2 pr-4 font-medium">Role title</th>
                  <th className="py-2 pr-4 font-medium">Cohort</th>
                  <th className="py-2 font-medium">Signed in</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {people.map((p) => (
                  <tr key={p.id}>
                    <td className="py-2 pr-4">{p.name}</td>
                    <td className="py-2 pr-4">{p.email}</td>
                    <td className="py-2 pr-4 capitalize">{p.layer}</td>
                    <td className="py-2 pr-4">{p.role_title ?? "—"}</td>
                    <td className="py-2 pr-4">{(p.cohorts as unknown as { name: string } | null)?.name}</td>
                    <td className="py-2">{p.user_id ? "Yes" : "No"}</td>
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
