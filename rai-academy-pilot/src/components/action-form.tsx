"use client";

import { startTransition, useActionState, useEffect, useRef } from "react";
import { IDLE, type FormAction } from "@/lib/action-state";
import { buttonClass, secondaryButtonClass } from "./form";

/**
 * Submit handler that runs a form action without React's automatic form reset,
 * so typed values survive a validation error.
 */
export function submitKeepingValues(dispatch: (form: FormData) => void, confirm?: string) {
  return (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirm && !window.confirm(confirm)) return;
    const form = new FormData(e.currentTarget, (e.nativeEvent as SubmitEvent).submitter);
    startTransition(() => dispatch(form));
  };
}

/** A form bound to a server action that shows the action's result message. */
export function ActionForm({
  action,
  submitLabel,
  pendingLabel = "Saving…",
  secondary = false,
  className = "flex flex-col gap-3",
  confirm,
  resetOnSuccess = true,
  children,
}: {
  action: FormAction;
  submitLabel: string;
  pendingLabel?: string;
  secondary?: boolean;
  className?: string;
  confirm?: string;
  resetOnSuccess?: boolean;
  children?: React.ReactNode;
}) {
  const [state, formAction, pending] = useActionState(action, IDLE);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (resetOnSuccess && state.status === "ok") formRef.current?.reset();
  }, [state, resetOnSuccess]);

  return (
    <form ref={formRef} action={formAction} className={className} onSubmit={submitKeepingValues(formAction, confirm)}>
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
