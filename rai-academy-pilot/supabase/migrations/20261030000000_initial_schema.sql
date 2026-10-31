-- RAI Academy Pilot: initial schema.
-- Every table has row-level security. Admins see everything; sponsors and
-- participants are limited to their own organization. Self-Check runs are
-- anonymous and never readable by sponsors or participants directly.

create extension if not exists citext with schema extensions;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sector text,
  created_at timestamptz not null default now()
);

-- Invite list and role for every person who can sign in. Magic-link sign-in
-- is only allowed for emails listed here; user_id is linked on first sign-in.
create table public.app_users (
  id uuid primary key default gen_random_uuid(),
  email extensions.citext not null unique,
  role text not null check (role in ('admin', 'sponsor', 'participant')),
  org_id uuid references public.organizations (id) on delete cascade,
  user_id uuid unique references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  constraint app_users_org_scope check (
    (role = 'admin' and org_id is null) or (role <> 'admin' and org_id is not null)
  )
);

create table public.client_packs (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations (id) on delete cascade,
  version integer not null,
  policy_text text not null default '',
  approved_tools jsonb not null default '[]'::jsonb,
  shared_use_case jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  unique (org_id, version)
);

-- RAI course content and agent prompts; global, not per client.
create table public.content_items (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('module', 'scenario', 'rubric', 'prompt')),
  layer text check (layer in ('board', 'leader', 'risk', 'builder', 'advisor')),
  slug text,
  title text not null,
  body text not null default '',
  version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (slug, version)
);

create table public.cohorts (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations (id) on delete cascade,
  name text not null,
  access_code text not null unique,
  start_date date,
  current_round text not null default 'baseline' check (current_round in ('baseline', 'readout')),
  pass_mark integer not null default 8 check (pass_mark between 0 and 10),
  created_at timestamptz not null default now(),
  unique (id, org_id)
);

create table public.participants (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null,
  cohort_id uuid not null,
  email extensions.citext not null,
  name text not null,
  layer text not null check (layer in ('board', 'leader', 'risk', 'builder', 'advisor')),
  role_title text,
  user_id uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  unique (cohort_id, email),
  unique (id, org_id),
  foreign key (cohort_id, org_id) references public.cohorts (id, org_id) on delete cascade
);

-- Anonymous by design: no participant id, email, IP address or user agent.
create table public.selfcheck_runs (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null,
  cohort_id uuid not null,
  round text not null check (round in ('baseline', 'readout')),
  team_label text not null,
  inventory jsonb not null default '[]'::jsonb,
  scores jsonb not null default '{}'::jsonb,
  snapshot jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  foreign key (cohort_id, org_id) references public.cohorts (id, org_id) on delete cascade
);

create table public.coach_sessions (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null,
  participant_id uuid not null,
  mode text not null check (mode in ('board', 'leader', 'risk', 'builder', 'advisor')),
  messages jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (participant_id, org_id) references public.participants (id, org_id) on delete cascade
);

create table public.scenario_attempts (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null,
  participant_id uuid not null,
  scenario_ids uuid[] not null default '{}',
  answers jsonb not null default '{}'::jsonb,
  score integer,
  passed boolean,
  created_at timestamptz not null default now(),
  foreign key (participant_id, org_id) references public.participants (id, org_id) on delete cascade
);

create table public.proofs (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null,
  participant_id uuid not null,
  layer text not null check (layer in ('board', 'leader', 'risk', 'builder', 'advisor')),
  content text,
  file_path text,
  status text not null default 'submitted' check (status in ('submitted', 'accepted', 'returned')),
  reviewer_note text,
  reviewed_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (participant_id, layer),
  foreign key (participant_id, org_id) references public.participants (id, org_id) on delete cascade
);

create table public.certificates (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null,
  participant_id uuid not null,
  issued_at timestamptz not null default now(),
  issued_by uuid references auth.users (id) on delete set null,
  pdf_path text,
  foreign key (participant_id, org_id) references public.participants (id, org_id) on delete cascade
);

create table public.audit_log (
  id bigint generated always as identity primary key,
  org_id uuid references public.organizations (id) on delete set null,
  actor uuid references auth.users (id) on delete set null,
  action text not null,
  target text,
  created_at timestamptz not null default now()
);

create index on public.client_packs (org_id, version desc);
create index on public.cohorts (org_id);
create index on public.participants (org_id);
create index on public.participants (user_id);
create index on public.selfcheck_runs (org_id, round);
create index on public.coach_sessions (participant_id);
create index on public.scenario_attempts (participant_id);
create index on public.proofs (org_id, status);
create index on public.certificates (participant_id);
create index on public.audit_log (org_id, created_at desc);
create index on public.app_users (org_id);

-- ---------------------------------------------------------------------------
-- Role helpers (security definer so policies don't recurse through RLS)
-- ---------------------------------------------------------------------------

create function public.current_app_role() returns text
language sql stable security definer set search_path = '' as $$
  select role from public.app_users where user_id = auth.uid()
$$;

create function public.is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.app_users where user_id = auth.uid() and role = 'admin')
$$;

create function public.current_org_id() returns uuid
language sql stable security definer set search_path = '' as $$
  select org_id from public.app_users where user_id = auth.uid() and role in ('sponsor', 'participant')
$$;

create function public.is_participant_self(p_participant_id uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.participants
    where id = p_participant_id and user_id = auth.uid()
  )
$$;

revoke all on function public.current_app_role(), public.is_admin(), public.current_org_id(),
  public.is_participant_self(uuid) from public, anon;
grant execute on function public.current_app_role(), public.is_admin(), public.current_org_id(),
  public.is_participant_self(uuid) to authenticated, service_role;

-- ---------------------------------------------------------------------------
-- Triggers
-- ---------------------------------------------------------------------------

-- Invite-only sign-in: a new auth user must match an app_users email.
create function public.handle_new_auth_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  update public.app_users set user_id = new.id where email = new.email;
  if not found then
    raise exception 'Email is not invited to RAI Academy Pilot';
  end if;
  update public.participants set user_id = new.id where email = new.email;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();

-- Participants imported after the person has already signed in get linked.
create function public.link_participant_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if new.user_id is null then
    select user_id into new.user_id from public.app_users where email = new.email;
  end if;
  return new;
end;
$$;

create trigger participants_link_user
  before insert on public.participants
  for each row execute function public.link_participant_user();

-- Client packs are versioned per organization and immutable once saved.
create function public.set_client_pack_version() returns trigger
language plpgsql set search_path = '' as $$
begin
  perform pg_advisory_xact_lock(hashtext(new.org_id::text));
  select coalesce(max(version), 0) + 1 into new.version
  from public.client_packs where org_id = new.org_id;
  return new;
end;
$$;

create trigger client_packs_version
  before insert on public.client_packs
  for each row execute function public.set_client_pack_version();

-- No certificate without an accepted proof.
create function public.require_accepted_proof() returns trigger
language plpgsql set search_path = '' as $$
begin
  if not exists (
    select 1 from public.proofs
    where participant_id = new.participant_id and status = 'accepted'
  ) then
    raise exception 'Cannot issue a certificate without an accepted proof'
      using errcode = 'check_violation';
  end if;
  return new;
end;
$$;

create trigger certificates_require_accepted_proof
  before insert on public.certificates
  for each row execute function public.require_accepted_proof();

create function public.touch_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger content_items_touch before update on public.content_items
  for each row execute function public.touch_updated_at();
create trigger coach_sessions_touch before update on public.coach_sessions
  for each row execute function public.touch_updated_at();
create trigger proofs_touch before update on public.proofs
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Row-level security
-- ---------------------------------------------------------------------------

alter table public.organizations enable row level security;
alter table public.app_users enable row level security;
alter table public.client_packs enable row level security;
alter table public.content_items enable row level security;
alter table public.cohorts enable row level security;
alter table public.participants enable row level security;
alter table public.selfcheck_runs enable row level security;
alter table public.coach_sessions enable row level security;
alter table public.scenario_attempts enable row level security;
alter table public.proofs enable row level security;
alter table public.certificates enable row level security;
alter table public.audit_log enable row level security;

-- The anon role (public API key) gets nothing. Anonymous Self-Check traffic
-- goes through server routes that validate the cohort access code.
revoke all on all tables in schema public from anon;
revoke all on all sequences in schema public from anon;
revoke all on all functions in schema public from anon;
alter default privileges in schema public revoke all on tables from anon;
alter default privileges in schema public revoke all on sequences from anon;
alter default privileges in schema public revoke all on functions from anon;

-- Audit log is append-only for everyone except the database owner.
revoke update, delete, truncate on public.audit_log from authenticated, service_role;

-- organizations
create policy "admins manage organizations" on public.organizations
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "members read own organization" on public.organizations
  for select to authenticated using (id = public.current_org_id());

-- app_users
create policy "admins manage app users" on public.app_users
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "users read own app user" on public.app_users
  for select to authenticated using (user_id = auth.uid());

-- client_packs (insert-only for admins: saving creates a new version)
create policy "admins read client packs" on public.client_packs
  for select to authenticated using (public.is_admin());
create policy "admins insert client packs" on public.client_packs
  for insert to authenticated with check (public.is_admin());
create policy "admins delete client packs" on public.client_packs
  for delete to authenticated using (public.is_admin());
create policy "participants read own org client packs" on public.client_packs
  for select to authenticated
  using (org_id = public.current_org_id() and public.current_app_role() = 'participant');

-- content_items (global; prompts readable by admins only)
create policy "admins manage content" on public.content_items
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "participants read course content" on public.content_items
  for select to authenticated
  using (type <> 'prompt' and public.current_app_role() = 'participant');

-- cohorts
create policy "admins manage cohorts" on public.cohorts
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "members read own org cohorts" on public.cohorts
  for select to authenticated using (org_id = public.current_org_id());

-- participants
create policy "admins manage participants" on public.participants
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "participants read self" on public.participants
  for select to authenticated using (user_id = auth.uid());

-- selfcheck_runs: admins only. Sponsors get aggregates via server code that
-- enforces the 5-run minimum; no individual run is ever returned to them.
create policy "admins manage selfcheck runs" on public.selfcheck_runs
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- coach_sessions
create policy "admins manage coach sessions" on public.coach_sessions
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "participants manage own coach sessions" on public.coach_sessions
  for all to authenticated
  using (public.is_participant_self(participant_id))
  with check (public.is_participant_self(participant_id) and org_id = public.current_org_id());

-- scenario_attempts
create policy "admins manage scenario attempts" on public.scenario_attempts
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "participants read own scenario attempts" on public.scenario_attempts
  for select to authenticated using (public.is_participant_self(participant_id));

-- proofs
create policy "admins manage proofs" on public.proofs
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "participants read own proofs" on public.proofs
  for select to authenticated using (public.is_participant_self(participant_id));
create policy "participants submit own proofs" on public.proofs
  for insert to authenticated
  with check (
    public.is_participant_self(participant_id)
    and org_id = public.current_org_id()
    and status = 'submitted'
    and reviewer_note is null
    and reviewed_by is null
  );

-- certificates
create policy "admins manage certificates" on public.certificates
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "participants read own certificates" on public.certificates
  for select to authenticated using (public.is_participant_self(participant_id));

-- audit_log
create policy "admins read audit log" on public.audit_log
  for select to authenticated using (public.is_admin());
create policy "admins append audit log" on public.audit_log
  for insert to authenticated with check (public.is_admin() and actor = auth.uid());
