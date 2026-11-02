import { NOTICES } from "@/lib/action-state";

export const inputClass =
  "w-full rounded border border-line bg-white px-3 py-2 disabled:bg-surface";
export const buttonClass =
  "inline-block rounded bg-brand px-4 py-2 font-medium text-brand-contrast hover:opacity-90 disabled:opacity-60";
export const secondaryButtonClass =
  "inline-block rounded border border-line bg-white px-3 py-1.5 text-sm font-medium hover:bg-surface disabled:opacity-60";

export function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function Notice({ code, detail }: { code?: string; detail?: string }) {
  if (!code || !(code in NOTICES)) return null;
  return (
    <p role="status" className="rounded border border-accent bg-white px-4 py-3 text-accent">
      {NOTICES[code as keyof typeof NOTICES]}
      {detail ? ` ${detail}` : ""}
    </p>
  );
}

export function formatDate(value: string | null | undefined): string {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" }) + " UTC";
}
