import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { ImportForm } from "./import-form";

export default async function ImportPage({ params }: { params: Promise<{ orgId: string }> }) {
  const { orgId } = await params;
  if (!z.guid().safeParse(orgId).success) notFound();
  const supabase = await createClient();
  const [{ data: org }, { data: cohorts }] = await Promise.all([
    supabase.from("organizations").select("name").eq("id", orgId).maybeSingle(),
    supabase.from("cohorts").select("id, name").eq("org_id", orgId).order("created_at"),
  ]);
  if (!org) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href={`/admin/orgs/${orgId}`} className="text-sm text-brand underline-offset-4 hover:underline">
          ← {org.name}
        </Link>
        <h1 className="mt-1 text-2xl font-bold">Import participants</h1>
        <p className="text-muted">
          CSV with a header row: <code>email,name,layer,role_title</code>. Layer is one of board, leader, risk,
          builder, advisor. Each row is checked before anything is imported.
        </p>
      </div>
      {cohorts?.length ? (
        <ImportForm orgId={orgId} cohorts={cohorts} />
      ) : (
        <p className="text-muted">Create a cohort first.</p>
      )}
    </div>
  );
}
