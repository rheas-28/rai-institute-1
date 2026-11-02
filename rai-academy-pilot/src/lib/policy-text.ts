import { MAX_POLICY_CHARS } from "./client-pack";

export const MAX_POLICY_BYTES = 10 * 1024 * 1024;

export type PolicyKind = "pdf" | "docx" | "markdown";

export class PolicyFileError extends Error {}

export function detectPolicyKind(fileName: string, bytes: Uint8Array): PolicyKind | null {
  const ext = fileName.toLowerCase().split(".").pop() ?? "";
  const startsWith = (sig: number[]) => sig.every((b, i) => bytes[i] === b);
  if (ext === "pdf") return startsWith([0x25, 0x50, 0x44, 0x46]) ? "pdf" : null; // %PDF
  if (ext === "docx") return startsWith([0x50, 0x4b, 0x03, 0x04]) ? "docx" : null; // zip
  if (["md", "markdown", "txt"].includes(ext)) return "markdown";
  return null;
}

export function normalizeText(text: string): string {
  return text
    .replace(/\u0000/g, "")
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Extracts plain text from an uploaded policy. Throws PolicyFileError with a user-facing message. */
export async function extractPolicyText(fileName: string, bytes: Uint8Array): Promise<string> {
  if (bytes.byteLength === 0) throw new PolicyFileError("The file is empty.");
  if (bytes.byteLength > MAX_POLICY_BYTES) throw new PolicyFileError("The file is larger than 10 MB.");
  const kind = detectPolicyKind(fileName, bytes);
  if (!kind) throw new PolicyFileError("Upload a PDF, DOCX or Markdown (.md) file.");

  let text: string;
  try {
    if (kind === "pdf") {
      const { extractText, getDocumentProxy } = await import("unpdf");
      const pdf = await getDocumentProxy(new Uint8Array(bytes));
      text = (await extractText(pdf, { mergePages: true })).text;
    } else if (kind === "docx") {
      const mammoth = await import("mammoth");
      text = (await mammoth.extractRawText({ buffer: Buffer.from(bytes) })).value;
    } else {
      text = new TextDecoder("utf-8").decode(bytes);
    }
  } catch {
    throw new PolicyFileError(`Could not read text from this ${kind.toUpperCase()} file.`);
  }

  text = normalizeText(text);
  if (!text) {
    throw new PolicyFileError(
      kind === "pdf"
        ? "No text found. The PDF may be a scan; upload a text-based PDF, DOCX or Markdown file."
        : "No text found in the file."
    );
  }
  if (text.length > MAX_POLICY_CHARS) {
    throw new PolicyFileError(`The policy text is longer than ${MAX_POLICY_CHARS.toLocaleString("en-GB")} characters.`);
  }
  return text;
}
