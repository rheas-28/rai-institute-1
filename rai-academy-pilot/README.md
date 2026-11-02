# RAI Academy Pilot

One web app that runs the RAI Academy pilot for many client organizations: the
Shadow AI Self-Check, the sponsor dashboard and the Fluency Coach. Built from
the *RAI Academy Pilot App: Devin Build Blueprint*.

Stack: Next.js (App Router, TypeScript), Supabase (Postgres with row-level
security, magic-link auth), Anthropic Messages API, Vercel.

## Status

| Step | Scope | State |
| --- | --- | --- |
| 1 | Scaffold: schema + RLS, magic-link auth and roles, seed, styling | done |
| 2 | F1 Admin and client-pack loader | in review |
| 3 | F2 Shadow AI Self-Check | in review |
| 4 | F3 Sponsor dashboard | |
| 5 | F4 Fluency Coach | |
| 6 | Pre-Day 1 hardening | |
| 7 | F5 Scenario check, F6 proof and certificates, F7 export | |

## Run locally

Requires Node 22 and Docker. This app lives in the `rai-academy-pilot/`
folder of the repo; run every command from there.

```bash
cd rai-academy-pilot
npm install
npm run db:start      # local Supabase in Docker
npm run env:local     # writes .env.local from the local stack
npm run seed          # two fictional orgs: Northwind and Fabrikam
npm run dev           # http://localhost:3000
```

Sign in with a seeded email (the seed prints them, e.g.
`admin@rai-academy.example`, `sponsor@northwind.example`,
`advisor@northwind.example`). Local magic-link emails land in Mailpit at
http://127.0.0.1:54324.

## Checks

```bash
npm run lint && npm run typecheck
npm test              # needs the local stack running and seeded
```

`tests/security.test.ts` covers the blueprint guardrails that exist so far:
organization separation (sponsor of A gets nothing about B), sponsors never
read individual Self-Check runs, Self-Check runs have no columns for email,
participant id, IP or user agent, no certificate without an accepted proof,
versioned immutable client packs, append-only audit log, invite-only sign-in,
and the anon key reads nothing.

## Roles and access

| Role | Sign-in | Can read |
| --- | --- | --- |
| admin | magic link | everything |
| sponsor | magic link | own organization and its cohorts; aggregates only (F3) |
| participant | magic link | own participant record, coach sessions, proofs, certificates; own org's client pack; course content (not prompts) |
| Self-Check respondent | cohort link + access code, no account | nothing directly; runs are written server-side |

Sign-in is invite-only: an `app_users` row must exist for the email (created by
an admin or by participant import). A database trigger rejects any other new
auth user. Self-Check runs are written by server code with the service role
after validating the cohort access code.

## Admin (F1)

Signed in as admin, `/admin` lets RAI:

- create organizations, invite sponsors, create cohorts (an access code such as
  `K7QM-3XPA` is generated) and switch a cohort between `baseline` and `readout`;
- load a client pack: upload the policy (PDF, DOCX or Markdown, max 10 MB), check
  and edit the extracted text, add approved tools and the shared use case. Each
  save is a new version; earlier versions stay readable and cannot be changed.
  Only the confirmed text is stored, not the uploaded file;
- import participants from CSV (`email,name,layer,role_title`): a preview lists
  errors per row, then valid rows are invited and enrolled in one transaction;
- create and edit content items (module, scenario, rubric, prompt) as Markdown
  or JSON. JSON is validated in the app and by the database;
- read the audit log. Every admin action above writes an entry.

All writes go through the signed-in admin's session, so RLS decides what is
allowed; inputs are validated server-side with Zod.

## Shadow AI Self-Check (F2)

Respondents open `/selfcheck?code=ACCESS-CODE` (the admin org page lists each
cohort's link), enter the access code and a team label, and chat with the
agent. No account, name, email, IP address, user agent or transcript is stored.

- The conversation is held only in the browser and sent back each turn, so a
  run abandoned midway saves nothing.
- The system prompt is the `prompt-selfcheck` content item, filled with the org
  name and the latest approved-tools list inside `<approved_tools>` data tags
  (escaped so they cannot close the tag). The snapshot JSON format is appended
  in code so it always matches validation.
- Before an answer goes to the AI, the server warns if it looks like an email
  address, an account number or pasted text; the respondent can edit or send
  anyway.
- The snapshot is validated with Zod; invalid output is retried once, then an
  error is shown and nothing is saved. Heat (highest of the four scores) and
  the summary counts in `scores` are computed in code. The run is tagged with
  the cohort's current round.
- `/selfcheck/pdf` renders the respondent's snapshot as a one-page PDF in Roboto
  ("Self-reported; not an assessment."). It reads and stores nothing.
- Admins can delete an organization's runs (one round or all) from the org
  page; deletions are audit-logged.

Set `ANTHROPIC_API_KEY` (and optionally `ANTHROPIC_MODEL`) to use Claude. For
local work without a key, `AI_FAKE=1 npm run dev` uses a scripted model (never
in production).

## Data model

See `supabase/migrations/`. Every table except `organizations` and
`content_items` (global RAI content) carries `org_id`; child tables use
composite foreign keys so a row's `org_id` always matches its cohort or
participant. Agent prompts are `content_items` of type `prompt`, so RAI can
edit them without a redeploy.

## Environment variables

See `.env.example`. `SUPABASE_SERVICE_ROLE_KEY` and `ANTHROPIC_API_KEY` are
server-only. Nothing secret is committed.

## Branding

Roboto is the only font. Brand colours are placeholders in
`src/app/globals.css` until RAI supplies the real values.
