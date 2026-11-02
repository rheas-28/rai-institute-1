import Link from "next/link";
import { Card } from "@/components/app-shell";
import { ContentForm } from "../content-form";

export default function NewContentPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/admin/content" className="text-sm text-brand underline-offset-4 hover:underline">← Content items</Link>
        <h1 className="mt-1 text-2xl font-bold">New content item</h1>
      </div>
      <Card title="Item">
        <ContentForm />
      </Card>
    </div>
  );
}
