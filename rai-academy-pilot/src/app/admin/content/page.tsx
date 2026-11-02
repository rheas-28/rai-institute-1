import Link from "next/link";
import { Card } from "@/components/app-shell";
import { Notice, buttonClass, formatDate } from "@/components/form";
import { createClient } from "@/lib/supabase/server";

export default async function ContentPage({ searchParams }: { searchParams: Promise<{ notice?: string }> }) {
  const { notice } = await searchParams;
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("content_items")
    .select("id, type, layer, slug, title, format, version, updated_at")
    .order("type")
    .order("slug");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Content items</h1>
        <Link href="/admin/content/new" className={buttonClass}>New item</Link>
      </div>
      <Notice code={notice} />
      <p className="text-muted">
        RAI modules, scenarios, rubrics and the agent prompts. Prompts are never shown to participants.
      </p>
      <Card title={`${items?.length ?? 0} item(s)`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-muted">
              <tr>
                <th className="py-2 pr-3 font-medium">Title</th>
                <th className="py-2 pr-3 font-medium">Type</th>
                <th className="py-2 pr-3 font-medium">Layer</th>
                <th className="py-2 pr-3 font-medium">Format</th>
                <th className="py-2 pr-3 font-medium">Version</th>
                <th className="py-2 font-medium">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {items?.map((i) => (
                <tr key={i.id}>
                  <td className="py-2 pr-3">
                    <Link href={`/admin/content/${i.id}`} className="text-brand underline-offset-4 hover:underline">{i.title}</Link>
                    <div className="text-xs text-muted">{i.slug}</div>
                  </td>
                  <td className="py-2 pr-3">{i.type}</td>
                  <td className="py-2 pr-3">{i.layer ?? "all"}</td>
                  <td className="py-2 pr-3">{i.format}</td>
                  <td className="py-2 pr-3">{i.version}</td>
                  <td className="py-2">{formatDate(i.updated_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
