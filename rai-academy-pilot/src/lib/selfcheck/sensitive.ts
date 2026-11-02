// Server-side check run before a Self-Check answer goes to the AI. It flags
// text that looks like identifying or pasted content so the respondent can
// describe the data type instead.

const EMAIL = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
// 8+ digits, optionally broken up by spaces or dashes (account, card, policy numbers).
const LONG_NUMBER = /\d(?:[ -]?\d){7,}/;
const IBAN = /\b[A-Z]{2}\d{2}(?: ?[A-Z0-9]){10,30}\b/;

export const LONG_TEXT_CHARS = 1200;
export const LONG_TEXT_LINES = 8;

export type SensitiveFlag = "email" | "account_number" | "long_text";

export const SENSITIVE_MESSAGES: Record<SensitiveFlag, string> = {
  email: "It looks like it contains an email address.",
  account_number: "It looks like it contains an account or reference number.",
  long_text: "It looks like pasted text from a document or system.",
};

export function detectSensitive(text: string): SensitiveFlag[] {
  const flags: SensitiveFlag[] = [];
  if (EMAIL.test(text)) flags.push("email");
  if (LONG_NUMBER.test(text) || IBAN.test(text)) flags.push("account_number");
  const lines = text.split(/\r?\n/).filter((l) => l.trim()).length;
  if (text.length > LONG_TEXT_CHARS || lines >= LONG_TEXT_LINES) flags.push("long_text");
  return flags;
}
