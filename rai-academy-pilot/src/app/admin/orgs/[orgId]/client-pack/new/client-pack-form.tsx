"use client";

import { useActionState, useEffect, useState } from "react";
import { extractPolicyAction, saveClientPackAction, type ExtractState } from "@/app/admin/actions";
import { Card } from "@/components/app-shell";
import { Field, buttonClass, inputClass, secondaryButtonClass } from "@/components/form";
import { IDLE } from "@/lib/action-state";
import { USE_CASE_FIELDS, type ApprovedTool, type SharedUseCase } from "@/lib/client-pack";

type Row = ApprovedTool & { key: number };

export function ClientPackForm({
  orgId,
  initialPolicy,
  initialTools,
  initialUseCase,
}: {
  orgId: string;
  initialPolicy: string;
  initialTools: ApprovedTool[];
  initialUseCase: SharedUseCase;
}) {
  const [extract, extractAction, extracting] = useActionState<ExtractState, FormData>(extractPolicyAction, IDLE);
  const [save, saveAction, saving] = useActionState(saveClientPackAction, IDLE);
  const [policy, setPolicy] = useState(initialPolicy);
  const [source, setSource] = useState(initialPolicy ? "the current version" : "");
  const [confirmed, setConfirmed] = useState(false);
  const [nextKey, setNextKey] = useState(initialTools.length + 1);
  const [rows, setRows] = useState<Row[]>(
    (initialTools.length ? initialTools : [{ name: "", vendor: "", approved_uses: "" }]).map((t, i) => ({ ...t, key: i }))
  );

  useEffect(() => {
    if (extract.status === "ok" && extract.text !== undefined) {
      setPolicy(extract.text);
      setSource(extract.fileName ?? "the uploaded file");
      setConfirmed(false);
    }
  }, [extract.nonce, extract.status, extract.text, extract.fileName]);

  const addRow = () => {
    setRows((r) => [...r, { name: "", vendor: "", approved_uses: "", key: nextKey }]);
    setNextKey((k) => k + 1);
  };

  return (
    <div className="flex flex-col gap-6">
      <Card title="1. Upload the policy">
        <form action={extractAction} className="flex flex-col gap-3">
          <Field label="Policy file" htmlFor="policy-file" hint="PDF, DOCX or Markdown, up to 10 MB. The text is extracted for you to check; the file itself is not stored.">
            <input id="policy-file" name="policy_file" type="file" required accept=".pdf,.docx,.md,.markdown,.txt" className={inputClass} />
          </Field>
          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" disabled={extracting} className={secondaryButtonClass}>
              {extracting ? "Extracting…" : "Extract text"}
            </button>
            {extract.message && (
              <p role="status" aria-live="polite" className={extract.status === "error" ? "text-sm text-danger" : "text-sm text-accent"}>
                {extract.message}
              </p>
            )}
          </div>
        </form>
      </Card>

      <form action={saveAction} className="flex flex-col gap-6">
        <input type="hidden" name="org_id" value={orgId} />
        <Card title="2. Check the policy text">
          <Field label="Policy text" htmlFor="policy-text" hint={source ? `From ${source}. Edit if the extraction missed or garbled anything.` : "Upload a file above, or paste the text here."}>
            <textarea id="policy-text" name="policy_text" required rows={16} value={policy}
              onChange={(e) => { setPolicy(e.target.value); setConfirmed(false); }}
              className={`${inputClass} font-mono text-sm`} />
          </Field>
          <p className="mt-1 text-xs text-muted">{policy.length.toLocaleString("en-GB")} characters</p>
          <label className="mt-3 flex items-start gap-2">
            <input type="checkbox" name="confirmed" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} required className="mt-1" />
            <span>I have checked that this text matches the client&apos;s policy.</span>
          </label>
        </Card>

        <Card title="3. Approved tools">
          <div className="flex flex-col gap-4">
            {rows.map((row, i) => (
              <fieldset key={row.key} className="grid gap-3 rounded border border-line p-3 sm:grid-cols-[1fr_1fr_2fr_auto] sm:items-end">
                <legend className="sr-only">Tool {i + 1}</legend>
                <Field label="Name" htmlFor={`tool-name-${row.key}`}>
                  <input id={`tool-name-${row.key}`} name="tool_name" defaultValue={row.name} maxLength={200} className={inputClass} />
                </Field>
                <Field label="Vendor" htmlFor={`tool-vendor-${row.key}`}>
                  <input id={`tool-vendor-${row.key}`} name="tool_vendor" defaultValue={row.vendor} maxLength={200} className={inputClass} />
                </Field>
                <Field label="Approved uses" htmlFor={`tool-uses-${row.key}`}>
                  <input id={`tool-uses-${row.key}`} name="tool_uses" defaultValue={row.approved_uses} maxLength={2000} className={inputClass} />
                </Field>
                <button type="button" onClick={() => setRows((r) => r.filter((x) => x.key !== row.key))}
                  className={secondaryButtonClass} aria-label={`Remove tool ${i + 1}`}>
                  Remove
                </button>
              </fieldset>
            ))}
            <div>
              <button type="button" onClick={addRow} className={secondaryButtonClass}>Add tool</button>
            </div>
          </div>
        </Card>

        <Card title="4. Shared use case">
          <div className="grid gap-3 sm:grid-cols-2">
            {USE_CASE_FIELDS.map((f) => (
              <div key={f.key} className={f.long ? "sm:col-span-2" : ""}>
                <Field label={f.label} htmlFor={`use-case-${f.key}`}>
                  {f.long ? (
                    <textarea id={`use-case-${f.key}`} name={`use_case_${f.key}`} defaultValue={initialUseCase[f.key]} rows={3} className={inputClass} />
                  ) : (
                    <input id={`use-case-${f.key}`} name={`use_case_${f.key}`} defaultValue={initialUseCase[f.key]} className={inputClass} />
                  )}
                </Field>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" disabled={saving} className={buttonClass}>
            {saving ? "Saving…" : "Save as new version"}
          </button>
          {save.message && (
            <p role="status" aria-live="polite" className="text-sm text-danger">{save.message}</p>
          )}
        </div>
      </form>
    </div>
  );
}
