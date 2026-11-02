import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";
import { Card } from "@/components/app-shell";
import { formatDate } from "@/components/form";
import { createClient } from "@/lib/supabase/server";
import { ContentForm } from "../content-form";

export default async function EditContentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!z.guid().safeParse(id).success) notFound();
  const supabase = await createClient();
  const { data: item } = await supabase
    .from("content_items")
    .select("id, type, layer, slug, title, format, body, version, updated_at")
    .eq("id", id)
    .maybeSingle();
  if (!item) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/admin/content" className="text-sm text-brand underline-offset-4 hover:underline">← Content items</Link>
        <h1 className="mt-1 text-2xl font-bold">{item.title}</h1>
        <p className="text-muted">Version {item.version}, last updated {formatDate(item.updated_at)}. Saving increases the version.</p>
      </div>
      <Card title="Item">
        <ContentForm item={item} />
      </Card>
    </div>
  );
}
