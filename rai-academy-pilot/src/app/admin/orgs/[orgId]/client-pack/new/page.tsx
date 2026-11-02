import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";
import { toFormDefaults } from "@/lib/client-pack";
import { createClient } from "@/lib/supabase/server";
import { ClientPackForm } from "./client-pack-form";

export default async function NewClientPackPage({ params }: { params: Promise<{ orgId: string }> }) {
  const { orgId } = await params;
  if (!z.guid().safeParse(orgId).success) notFound();
  const supabase = await createClient();
  const [{ data: org }, { data: latest }] = await Promise.all([
    supabase.from("organizations").select("name").eq("id", orgId).maybeSingle(),
    supabase
      .from("client_packs")
      .select("version, policy_text, approved_tools, shared_use_case")
      .eq("org_id", orgId)
      .order("version", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);
  if (!org) notFound();
  const defaults = toFormDefaults(latest);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href={`/admin/orgs/${orgId}`} className="text-sm text-brand underline-offset-4 hover:underline">
          ← {org.name}
        </Link>
        <h1 className="mt-1 text-2xl font-bold">
          {latest ? `New client pack version (current is v${latest.version})` : "Load client pack"}
        </h1>
        <p className="text-muted">
          Saving creates a new version. Earlier versions stay readable and cannot be changed.
          {latest ? " The form starts from the current version." : ""}
        </p>
      </div>
      <ClientPackForm
        orgId={orgId}
        initialPolicy={latest?.policy_text ?? ""}
        initialTools={defaults.tools}
        initialUseCase={defaults.useCase}
      />
    </div>
  );
}
