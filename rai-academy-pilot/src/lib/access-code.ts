import { randomInt } from "node:crypto";

// No 0/O, 1/I/L, so codes can be read aloud and typed without confusion.
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

export const ACCESS_CODE_PATTERN = /^[ABCDEFGHJKMNPQRSTUVWXYZ2-9]{4}-[ABCDEFGHJKMNPQRSTUVWXYZ2-9]{4}$/;

export function generateAccessCode(): string {
  let code = "";
  for (let i = 0; i < 8; i++) code += ALPHABET[randomInt(ALPHABET.length)];
  return `${code.slice(0, 4)}-${code.slice(4)}`;
}
