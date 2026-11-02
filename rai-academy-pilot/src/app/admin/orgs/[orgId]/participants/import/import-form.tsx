"use client";

import { useActionState } from "react";
import { checkImportAction, importParticipantsAction, type ImportState } from "@/app/admin/actions";
import { ActionForm, submitKeepingValues } from "@/components/action-form";
import { Card } from "@/components/app-shell";
import { Field, inputClass, secondaryButtonClass } from "@/components/form";
import { IDLE } from "@/lib/action-state";

export function ImportForm({ orgId, cohorts }: { orgId: string; cohorts: { id: string; name: string }[] }) {
  const [state, action, pending] = useActionState<ImportState, FormData>(checkImportAction, IDLE);
  const check = state.check;
  const valid = check?.rows.filter((r) => r.row).length ?? 0;
  const invalid = (check?.rows.length ?? 0) - valid;

  return (
    <div className="flex flex-col gap-6">
      <Card title="1. Choose the file">
        <form action={action} onSubmit={submitKeepingValues(action)} className="flex flex-col gap-3">
          <input type="hidden" name="org_id" value={orgId} />
          <Field label="Cohort" htmlFor="cohort">
            <select id="cohort" name="cohort_id" defaultValue={state.cohortId ?? cohorts[0].id} className={inputClass}>
              {cohorts.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </Field>
          <Field label="CSV file" htmlFor="csv-file">
            <input id="csv-file" name="csv_file" type="file" accept=".csv,text/csv" className={inputClass} />
          </Field>
          <Field label="Or paste the CSV" htmlFor="csv-text">
            <textarea id="csv-text" name="csv_text" rows={5} placeholder="email,name,layer,role_title" className={`${inputClass} font-mono text-sm`} />
          </Field>
          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" disabled={pending} className={secondaryButtonClass}>
              {pending ? "Checking…" : "Check file"}
            </button>
            {state.status === "error" && (
              <p role="alert" className="text-sm text-danger">{state.message}</p>
            )}
          </div>
        </form>
      </Card>

      {check && (
        <Card title="2. Review">
          {check.fileErrors.length > 0 ? (
            <ul role="alert" className="list-disc pl-5 text-danger">
              {check.fileErrors.map((e) => <li key={e}>{e}</li>)}
            </ul>
          ) : (
            <>
              <p role="status" className="mb-3">
                <strong>{valid}</strong> row(s) ready to import
                {invalid > 0 && <>, <strong className="text-danger">{invalid}</strong> row(s) with errors will be skipped</>}.
              </p>
              <div className="mb-4 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-muted">
                    <tr>
                      <th className="py-2 pr-3 font-medium">Line</th>
                      <th className="py-2 pr-3 font-medium">Email</th>
                      <th className="py-2 pr-3 font-medium">Name</th>
                      <th className="py-2 pr-3 font-medium">Layer</th>
                      <th className="py-2 pr-3 font-medium">Role title</th>
                      <th className="py-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {check.rows.map((r) => (
                      <tr key={r.line} className={r.errors.length ? "bg-red-50" : ""}>
                        <td className="py-2 pr-3">{r.line}</td>
                        <td className="py-2 pr-3">{r.values.email}</td>
                        <td className="py-2 pr-3">{r.values.name}</td>
                        <td className="py-2 pr-3">{r.values.layer}</td>
                        <td className="py-2 pr-3">{r.values.role_title}</td>
                        <td className="py-2">
                          {r.errors.length ? <span className="text-danger">{r.errors.join("; ")}</span> : <span className="text-accent">OK</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {valid > 0 && (
                <ActionForm action={importParticipantsAction} submitLabel={`Import ${valid} participant(s)`} pendingLabel="Importing…">
                  <input type="hidden" name="org_id" value={orgId} />
                  <input type="hidden" name="cohort_id" value={state.cohortId} />
                  <input type="hidden" name="csv" value={state.csv} />
                </ActionForm>
              )}
            </>
          )}
        </Card>
      )}
    </div>
  );
}
