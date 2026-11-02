-- F1: invite and enrol imported participants in one transaction, so a failed
-- import leaves no stray sign-in invites. Runs with the caller's rights (RLS applies).
create function public.import_participants(p_org_id uuid, p_cohort_id uuid, p_rows jsonb)
returns integer
language plpgsql security invoker set search_path = '' as $$
declare
  imported integer;
begin
  insert into public.app_users (email, role, org_id)
  select r->>'email', 'participant', p_org_id
  from jsonb_array_elements(p_rows) r
  on conflict (email) do nothing;

  insert into public.participants (org_id, cohort_id, email, name, layer, role_title)
  select p_org_id, p_cohort_id, r->>'email', r->>'name', r->>'layer', nullif(r->>'role_title', '')
  from jsonb_array_elements(p_rows) r;
  get diagnostics imported = row_count;
  return imported;
end;
$$;

revoke execute on function public.import_participants(uuid, uuid, jsonb) from public, anon;
grant execute on function public.import_participants(uuid, uuid, jsonb) to authenticated;
