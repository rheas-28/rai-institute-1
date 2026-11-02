import type { Metadata } from "next";
import { SelfCheck } from "./selfcheck-client";

export const metadata: Metadata = { title: "Shadow AI Self-Check · RAI Academy Pilot" };

export default async function SelfCheckPage({ searchParams }: { searchParams: Promise<{ code?: string }> }) {
  const { code } = await searchParams;
  return (
    <main id="main" className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-4 py-10">
      <div>
        <h1 className="text-2xl font-bold text-brand">Shadow AI Self-Check</h1>
        <p className="mt-1 text-muted">
          A short, anonymous interview that maps the AI tools and automations your team uses. Self-reported; not an
          assessment.
        </p>
      </div>
      <SelfCheck initialCode={typeof code === "string" ? code.slice(0, 20) : ""} />
    </main>
  );
}
