// Scripted stand-in for the AI, for local development and browser tests
// without an API key. Enabled only with AI_FAKE=1 outside production.
import type { ChatModel } from "./model";

const QUESTIONS = [
  "What does your team do, and who does its work serve?",
  "Which AI tools does the team use, including personal accounts and browser add-ons?",
  "For each tool, what do you use it for and what types of data go into it?",
  "Is anything set up to act on its own, such as an automation that sends messages without a person approving each one?",
  "Who approved each of these tools or automations, if anyone?",
  "When the AI gets something wrong, what happens and who would notice?",
];

export const FAKE_SNAPSHOT = {
  inventory: [
    {
      tool: "ChatGPT (personal accounts)",
      purpose: "Drafting client emails",
      sanctioned: "no",
      data_types: ["client names", "portfolio summaries"],
      acts_on_its_own: "no",
      approved_by: "",
      scores: { data_sensitivity: 3, autonomy: 1, impact_on_people: 2, oversight_gap: 3 },
    },
    {
      tool: "Microsoft Copilot",
      purpose: "Summarising meetings",
      sanctioned: "yes",
      data_types: ["internal meeting notes"],
      acts_on_its_own: "no",
      approved_by: "IT",
      scores: { data_sensitivity: 2, autonomy: 1, impact_on_people: 1, oversight_gap: 1 },
    },
    {
      tool: "Zapier email automation",
      purpose: "Sending follow-up emails to clients",
      sanctioned: "unsure",
      data_types: ["client contact details"],
      acts_on_its_own: "yes",
      approved_by: "",
      scores: { data_sensitivity: 2, autonomy: 3, impact_on_people: 2, oversight_gap: 3 },
    },
  ],
  top_gaps: [
    "Client data goes into personal ChatGPT accounts.",
    "An automation emails clients with no named approver.",
    "No one checks AI-drafted emails before they are sent.",
  ],
  next_actions: [
    "Move drafting to an approved tool and stop using personal accounts for client work.",
    "Name an owner for the email automation and add a review step.",
    "Agree who checks AI-drafted client emails before sending.",
  ],
};

// An answer containing BADJSON makes every later snapshot attempt invalid,
// to exercise the retry-then-error path.
export const fakeModel: ChatModel = async (system, messages) => {
  const poisoned = messages.some((m) => m.role === "user" && m.content.includes("BADJSON"));
  const answers = messages.filter((m) => m.role === "user" && !m.content.startsWith("That was not a valid snapshot")).length - 1;
  if (system.includes("The interview is over") || answers >= QUESTIONS.length) {
    return poisoned ? '{"inventory": "not a list"}' : JSON.stringify(FAKE_SNAPSHOT);
  }
  return QUESTIONS[answers] ?? QUESTIONS[QUESTIONS.length - 1];
};
