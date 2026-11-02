"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { buttonClass, inputClass, secondaryButtonClass } from "@/components/form";
import type { ChatMessage } from "@/lib/ai/model";
import type { Round, TurnResult } from "@/lib/selfcheck/engine";
import { MAX_ANSWER_CHARS } from "@/lib/selfcheck/limits";
import type { Snapshot } from "@/lib/selfcheck/snapshot";
import { selfCheckTurnAction } from "./actions";

const STATEMENT = "Self-reported; not an assessment.";
const HEAT_CLASS = { 1: "bg-green-100 text-green-900", 2: "bg-amber-100 text-amber-900", 3: "bg-red-100 text-red-900" };

type Session = { code: string; team: string; orgName: string; round: Round };

export function SelfCheck({ initialCode }: { initialCode: string }) {
  const [session, setSession] = useState<Session | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [warnings, setWarnings] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [pending, startTransition] = useTransition();
  const endRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
    if (!pending) answerRef.current?.focus();
  }, [messages, pending]);

  function send(
    payload: { access_code: string; team_label: string; messages: ChatMessage[]; confirm_sensitive?: boolean; finish?: boolean },
    onReply: (r: Extract<TurnResult, { status: "reply" }>) => void,
  ) {
    setError(null);
    startTransition(async () => {
      let result: TurnResult;
      try {
        result = await selfCheckTurnAction(payload);
      } catch {
        result = { status: "error", message: "The Self-Check couldn't be reached. Check your connection and try again." };
      }
      if (result.status === "reply") onReply(result);
      else if (result.status === "warning") setWarnings(result.warnings);
      else if (result.status === "done") {
        setSnapshot(result.snapshot);
        setSession((s) => (s ? { ...s, orgName: result.orgName, round: result.round } : s));
      } else setError(result.message);
    });
  }

  function start(form: FormData) {
    const code = String(form.get("code") ?? "").trim().toUpperCase();
    const team = String(form.get("team") ?? "").trim();
    send({ access_code: code, team_label: team, messages: [] }, (r) => {
      setSession({ code, team, orgName: r.orgName, round: r.round });
      setMessages([{ role: "assistant", content: r.text }]);
    });
  }

  function answer(confirm = false) {
    if (!session || !draft.trim()) return;
    const next: ChatMessage[] = [...messages, { role: "user", content: draft.trim() }];
    setWarnings([]);
    send(
      { access_code: session.code, team_label: session.team, messages: next, confirm_sensitive: confirm },
      (r) => {
        setMessages([...next, { role: "assistant", content: r.text }]);
        setDraft("");
      },
    );
  }

  function finish() {
    if (!session) return;
    setWarnings([]);
    send({ access_code: session.code, team_label: session.team, messages, finish: true }, (r) =>
      setMessages([...messages, { role: "assistant", content: r.text }]),
    );
  }

  if (session && snapshot) return <SnapshotView snapshot={snapshot} session={session} />;

  if (!session) {
    return (
      <form
        className="flex flex-col gap-4 rounded-lg border border-line bg-white p-5 shadow-sm"
        onSubmit={(e) => {
          e.preventDefault();
          start(new FormData(e.currentTarget));
        }}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="code" className="text-sm font-medium">Access code</label>
          <input id="code" name="code" required defaultValue={initialCode} autoComplete="off" spellCheck={false}
            placeholder="ABCD-EFGH" className={`${inputClass} uppercase tracking-widest`} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="team" className="text-sm font-medium">Team label</label>
          <input id="team" name="team" required maxLength={100} autoComplete="off" className={inputClass}
            aria-describedby="team-hint" />
          <p id="team-hint" className="text-xs text-muted">
            A name for your team, such as “Retail advice”. Don’t use people’s names.
          </p>
        </div>
        <ul className="list-disc pl-5 text-sm text-muted">
          <li>About 15 questions, one at a time. Takes around 10 minutes.</li>
          <li>Anonymous: we don’t record who you are. Don’t name people or clients, or paste content.</li>
          <li>Nothing is saved until you finish. If you leave midway, your answers are gone.</li>
        </ul>
        {error && <p role="alert" className="text-danger">{error}</p>}
        <button type="submit" disabled={pending} className={`${buttonClass} self-start`}>
          {pending ? "Starting…" : "Start the Self-Check"}
        </button>
      </form>
    );
  }

  const answers = messages.filter((m) => m.role === "user").length;
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted">
        {session.orgName} · Team: {session.team} · {answers} answered of about 15
      </p>
      <ol aria-live="polite" aria-label="Conversation" className="flex flex-col gap-3">
        {messages.map((m, i) => (
          <li key={i} className={`max-w-[85%] whitespace-pre-wrap rounded-lg px-4 py-3 ${m.role === "assistant"
            ? "self-start border border-line bg-white" : "self-end bg-brand text-brand-contrast"}`}>
            <span className="sr-only">{m.role === "assistant" ? "Self-Check: " : "You: "}</span>
            {m.content}
          </li>
        ))}
        {pending && <li className="self-start text-sm text-muted">Thinking…</li>}
      </ol>
      <div ref={endRef} />

      {warnings.length > 0 && (
        <div role="alert" className="rounded border border-danger bg-white p-4">
          <p className="font-medium">Check your answer before it’s sent</p>
          <ul className="mt-1 list-disc pl-5">{warnings.map((w) => <li key={w}>{w}</li>)}</ul>
          <p className="mt-2 text-sm text-muted">Please describe the type of data instead, for example “client account numbers”.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className={secondaryButtonClass} onClick={() => { setWarnings([]); answerRef.current?.focus(); }}>
              Edit my answer
            </button>
            <button type="button" className={secondaryButtonClass} disabled={pending} onClick={() => answer(true)}>
              Send anyway
            </button>
          </div>
        </div>
      )}
      {error && <p role="alert" className="text-danger">{error}</p>}

      <form className="flex flex-col gap-2" onSubmit={(e) => { e.preventDefault(); answer(); }}>
        <label htmlFor="answer" className="text-sm font-medium">Your answer</label>
        <textarea id="answer" ref={answerRef} rows={3} value={draft} maxLength={MAX_ANSWER_CHARS}
          onChange={(e) => { setDraft(e.target.value); setWarnings([]); }}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); answer(); } }}
          className={inputClass} disabled={pending} />
        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" disabled={pending || !draft.trim()} className={buttonClass}>Send</button>
          <button type="button" disabled={pending || answers === 0} onClick={finish} className={secondaryButtonClass}>
            Finish and see the snapshot
          </button>
          <span className="text-xs text-muted">Enter to send, Shift+Enter for a new line.</span>
        </div>
      </form>
    </div>
  );
}

function SnapshotView({ snapshot, session }: { snapshot: Snapshot; session: Session }) {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const items = [...snapshot.inventory].sort((a, b) => b.heat - a.heat);

  async function download() {
    setDownloading(true);
    setError(null);
    try {
      const res = await fetch("/selfcheck/pdf", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ snapshot, org_name: session.orgName, team_label: session.team, round: session.round }),
      });
      if (!res.ok) throw new Error();
      const url = URL.createObjectURL(await res.blob());
      const a = document.createElement("a");
      a.href = url;
      a.download = "shadow-ai-self-check.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("The PDF couldn't be created. Try again.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <section aria-labelledby="snapshot-title" className="flex flex-col gap-5 rounded-lg border border-line bg-white p-5 shadow-sm">
      <div>
        <h2 id="snapshot-title" className="text-xl font-bold text-brand">Your team’s snapshot</h2>
        <p className="text-sm text-muted">
          {session.orgName} · Team: {session.team} · {session.round === "baseline" ? "Baseline" : "Readout"}
        </p>
        <p className="mt-2 rounded border border-line bg-surface px-3 py-2 font-medium">{STATEMENT}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <caption className="mb-2 text-left font-medium">AI inventory</caption>
          <thead className="text-muted">
            <tr>
              <th className="py-2 pr-3 font-medium">Tool</th>
              <th className="py-2 pr-3 font-medium">Used for / data</th>
              <th className="py-2 pr-3 font-medium">Sanctioned</th>
              <th className="py-2 pr-3 font-medium">Acts on its own</th>
              <th className="py-2 pr-3 font-medium">Approved by</th>
              <th className="py-2 font-medium">Heat</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {items.length === 0 && (
              <tr><td colSpan={6} className="py-2 text-muted">No AI tools were reported.</td></tr>
            )}
            {items.map((item, i) => (
              <tr key={i}>
                <td className="py-2 pr-3 font-medium">{item.tool}</td>
                <td className="py-2 pr-3">{item.purpose}{item.data_types.length > 0 && <span className="block text-muted">{item.data_types.join(", ")}</span>}</td>
                <td className="py-2 pr-3">{item.sanctioned}</td>
                <td className="py-2 pr-3">{item.acts_on_its_own}</td>
                <td className="py-2 pr-3">{item.approved_by || <span className="text-muted">No one named</span>}</td>
                <td className="py-2"><span className={`rounded px-2 py-0.5 font-bold ${HEAT_CLASS[item.heat]}`}>{item.heat}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-xs text-muted">Heat is the highest of four 1–3 scores: data sensitivity, autonomy, impact on people and oversight gap.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <h3 className="mb-2 font-medium">Top gaps</h3>
          <ol className="list-decimal pl-5">{snapshot.top_gaps.map((g, i) => <li key={i}>{g}</li>)}</ol>
        </div>
        <div>
          <h3 className="mb-2 font-medium">Next actions</h3>
          <ol className="list-decimal pl-5">{snapshot.next_actions.map((a, i) => <li key={i}>{a}</li>)}</ol>
        </div>
      </div>
      {error && <p role="alert" className="text-danger">{error}</p>}
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={download} disabled={downloading} className={buttonClass}>
          {downloading ? "Preparing PDF…" : "Download PDF"}
        </button>
        <span className="text-sm text-muted">Saved anonymously. You can close this page.</span>
      </div>
    </section>
  );
}
