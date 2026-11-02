import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";
import { Card } from "@/components/app-shell";
import { Notice, formatDate } from "@/components/form";
import { USE_CASE_FIELDS, toFormDefaults } from "@/lib/client-pack";
import { createClient } from "@/lib/supabase/server";

type Props = {
  params: Promise<{ orgId: string; version: string }>;
  searchParams: Promise<{ notice?: string }>;
};

export default async function ClientPackVersionPage({ params, searchParams }: Props) {
  const { orgId, version } = await params;
  const { notice } = await searchParams;
  const v = Number(version);
  if (!z.guid().safeParse(orgId).success || !Number.isInteger(v) || v < 1) notFound();

  const supabase = await createClient();
  const [{ data: org }, { data: pack }, { data: newest }] = await Promise.all([
    supabase.from("organizations").select("name").eq("id", orgId).maybeSingle(),
    supabase.from("client_packs").select("*").eq("org_id", orgId).eq("version", v).maybeSingle(),
    supabase.from("client_packs").select("version").eq("org_id", orgId).order("version", { ascending: false }).limit(1).maybeSingle(),
  ]);
  if (!org || !pack) notFound();
  const { tools, useCase } = toFormDefaults(pack);
  const isLatest = newest?.version === pack.version;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href={`/admin/orgs/${orgId}`} className="text-sm text-brand underline-offset-4 hover:underline">
          ← {org.name}
        </Link>
        <h1 className="mt-1 text-2xl font-bold">Client pack version {pack.version}</h1>
        <p className="text-muted">
          Saved {formatDate(pack.created_at)}. {isLatest ? "This is the current version." : `Read-only; the current version is v${newest?.version}.`}
        </p>
      </div>
      <Notice code={notice} />

      <Card title="Policy text">
        <pre className="max-h-[32rem] overflow-auto whitespace-pre-wrap rounded bg-surface p-3 text-sm">{pack.policy_text}</pre>
      </Card>

      <Card title="Approved tools">
        {!tools.length ? (
          <p className="text-muted">None listed.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-muted">
                <tr>
                  <th className="py-2 pr-4 font-medium">Name</th>
                  <th className="py-2 pr-4 font-medium">Vendor</th>
                  <th className="py-2 font-medium">Approved uses</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {tools.map((t, i) => (
                  <tr key={i}>
                    <td className="py-2 pr-4">{t.name}</td>
                    <td className="py-2 pr-4">{t.vendor || "—"}</td>
                    <td className="py-2">{t.approved_uses || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card title="Shared use case">
        <dl className="grid gap-3 sm:grid-cols-[12rem_1fr]">
          {USE_CASE_FIELDS.map((f) => (
            <div key={f.key} className="contents">
              <dt className="font-medium">{f.label}</dt>
              <dd className="whitespace-pre-wrap text-ink">{useCase[f.key] || "—"}</dd>
            </div>
          ))}
        </dl>
      </Card>
    </div>
  );
}
