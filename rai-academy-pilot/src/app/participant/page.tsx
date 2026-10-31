import { Card } from "@/components/app-shell";
import { requireRole } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export default async function ParticipantHome() {
  const user = await requireRole("participant");
  const supabase = await createClient();
  const { data: me } = await supabase
    .from("participants")
    .select("name, layer, role_title, cohorts(name)")
    .eq("user_id", user.userId)
    .maybeSingle();
  const cohort = me?.cohorts as unknown as { name: string } | null;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Welcome{me ? `, ${me.name}` : ""}</h1>
      <Card title="Your programme">
        {me ? (
          <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1">
            <dt className="text-muted">Layer</dt>
            <dd className="capitalize">{me.layer}</dd>
            <dt className="text-muted">Role</dt>
            <dd>{me.role_title}</dd>
            <dt className="text-muted">Cohort</dt>
            <dd>{cohort?.name}</dd>
          </dl>
        ) : (
          <p className="text-muted">You are not enrolled in a cohort yet.</p>
        )}
      </Card>
      <p className="text-sm text-muted">The Fluency Coach arrives in F4.</p>
    </div>
  );
}
