import "server-only";
import { fakeModel } from "./fake-model";
import { anthropicModel, type ChatModel } from "./model";

/** The configured AI model. AI_FAKE=1 uses a scripted model, outside production only. */
export function getChatModel(): ChatModel | null {
  if (process.env.AI_FAKE === "1" && process.env.NODE_ENV !== "production") return fakeModel;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;
  return anthropicModel({ apiKey, model: process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5" });
}
