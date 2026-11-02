"use client";

import { useActionState } from "react";
import { IDLE, type FormAction } from "@/lib/action-state";
import { buttonClass, secondaryButtonClass } from "./form";

/** A form bound to a server action that shows the action's result message. */
export function ActionForm({
  action,
  submitLabel,
  pendingLabel = "Saving…",
  secondary = false,
  className = "flex flex-col gap-3",
  confirm,
  children,
}: {
  action: FormAction;
  submitLabel: string;
  pendingLabel?: string;
  secondary?: boolean;
  className?: string;
  confirm?: string;
  children?: React.ReactNode;
}) {
  const [state, formAction, pending] = useActionState(action, IDLE);
  return (
    <form
      action={formAction}
      className={className}
      onSubmit={(e) => {
        if (confirm && !window.confirm(confirm)) e.preventDefault();
      }}
    >
      {children}
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={pending} className={secondary ? secondaryButtonClass : buttonClass}>
          {pending ? pendingLabel : submitLabel}
        </button>
        {state.message && (
          <p role="status" aria-live="polite" className={state.status === "error" ? "text-sm text-danger" : "text-sm text-accent"}>
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
