// Minimal Anthropic Messages API client (no tools, no browsing). Errors are
// logged without any user content.
export type ChatMessage = { role: "user" | "assistant"; content: string };
export type ChatModel = (system: string, messages: ChatMessage[]) => Promise<string>;

export class ModelError extends Error {}

const API_URL = "https://api.anthropic.com/v1/messages";

export function anthropicModel(opts: { apiKey: string; model: string; maxTokens?: number }): ChatModel {
  return async (system, messages) => {
    let res: Response;
    try {
      res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": opts.apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({ model: opts.model, max_tokens: opts.maxTokens ?? 3000, system, messages }),
        signal: AbortSignal.timeout(90_000),
      });
    } catch (e) {
      console.error("AI request failed", { kind: e instanceof Error ? e.name : "unknown" });
      throw new ModelError("The AI service could not be reached.");
    }
    if (!res.ok) {
      console.error("AI request failed", { status: res.status });
      throw new ModelError("The AI service returned an error.");
    }
    const body = (await res.json()) as { content?: { type: string; text?: string }[] };
    const text = (body.content ?? [])
      .filter((b) => b.type === "text")
      .map((b) => b.text ?? "")
      .join("")
      .trim();
    if (!text) throw new ModelError("The AI service returned an empty reply.");
    return text;
  };
}
