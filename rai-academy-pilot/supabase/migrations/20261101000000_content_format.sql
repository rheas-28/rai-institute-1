-- F1: content items are edited in place (version counts edits), are written
-- as Markdown or JSON, and are identified by a unique slug.
alter table public.content_items
  add column format text not null default 'markdown' check (format in ('markdown', 'json'));

update public.content_items set slug = 'item-' || id::text where slug is null;
alter table public.content_items alter column slug set not null;
alter table public.content_items drop constraint content_items_slug_version_key;
alter table public.content_items add constraint content_items_slug_key unique (slug);
alter table public.content_items
  add constraint content_items_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$');

-- JSON items must hold valid JSON.
create function public.check_content_json() returns trigger
language plpgsql set search_path = '' as $$
begin
  if new.format = 'json' then
    perform new.body::jsonb;
  end if;
  return new;
end;
$$;

create trigger content_items_json_valid
  before insert or update on public.content_items
  for each row execute function public.check_content_json();
