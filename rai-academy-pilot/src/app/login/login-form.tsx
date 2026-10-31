"use client";

import { useActionState } from "react";
import { requestMagicLink, type LoginState } from "./actions";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(requestMagicLink, {
    status: "idle",
  });

  return (
    <form action={action} className="flex flex-col gap-3">
      <label htmlFor="email" className="font-medium">
        Work email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        autoComplete="email"
        className="rounded border border-line px-3 py-2"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded bg-brand px-5 py-2 font-medium text-brand-contrast hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Sending…" : "Email me a sign-in link"}
      </button>
      <p
        role="status"
        aria-live="polite"
        className={state.status === "error" ? "text-danger" : "text-muted"}
      >
        {state.message}
      </p>
    </form>
  );
}
