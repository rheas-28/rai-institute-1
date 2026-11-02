export type ActionState = { status: "idle" | "ok" | "error"; message?: string };

export const IDLE: ActionState = { status: "idle" };

export type FormAction = (prev: ActionState, form: FormData) => Promise<ActionState>;

// Short codes passed in ?notice= after a redirect, so the URL can't inject arbitrary text.
export const NOTICES = {
  "org-created": "Organization created.",
  "pack-saved": "Client pack saved as a new version.",
  imported: "Participants imported. They can now sign in with a magic link.",
  "content-saved": "Content item saved.",
} as const;

export type NoticeCode = keyof typeof NOTICES;
