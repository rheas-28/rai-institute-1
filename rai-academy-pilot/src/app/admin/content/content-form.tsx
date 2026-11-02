import { saveContentAction } from "../actions";
import { ActionForm } from "@/components/action-form";
import { Field, inputClass } from "@/components/form";
import { CONTENT_TYPES } from "@/lib/admin/data";
import { LAYERS } from "@/lib/roles";

export type ContentItem = {
  id: string;
  type: string;
  layer: string | null;
  slug: string;
  title: string;
  format: string;
  body: string;
};

export function ContentForm({ item }: { item?: ContentItem }) {
  return (
    <ActionForm action={saveContentAction} submitLabel={item ? "Save changes" : "Create item"}>
      {item && <input type="hidden" name="id" value={item.id} />}
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Type" htmlFor="type">
          <select id="type" name="type" defaultValue={item?.type ?? "module"} className={inputClass}>
            {CONTENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Layer" htmlFor="layer" hint="Leave blank for items that apply to every layer.">
          <select id="layer" name="layer" defaultValue={item?.layer ?? ""} className={inputClass}>
            <option value="">All layers</option>
            {LAYERS.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </Field>
        <Field label="Title" htmlFor="title">
          <input id="title" name="title" required maxLength={200} defaultValue={item?.title} className={inputClass} />
        </Field>
        <Field label="Slug" htmlFor="slug" hint="Unique ID, e.g. risk-scenario-3. Agents find prompts by slug.">
          <input id="slug" name="slug" required maxLength={100} pattern="[a-z0-9]+(-[a-z0-9]+)*" defaultValue={item?.slug} className={inputClass} />
        </Field>
      </div>
      <fieldset className="flex flex-wrap gap-4">
        <legend className="mb-1 text-sm font-medium">Format</legend>
        {(["markdown", "json"] as const).map((f) => (
          <label key={f} className="flex items-center gap-2">
            <input type="radio" name="format" value={f} defaultChecked={(item?.format ?? "markdown") === f} />
            {f === "markdown" ? "Markdown" : "JSON"}
          </label>
        ))}
      </fieldset>
      <Field label="Body" htmlFor="body" hint="JSON bodies are checked before saving.">
        <textarea id="body" name="body" rows={18} defaultValue={item?.body} className={`${inputClass} font-mono text-sm`} />
      </Field>
    </ActionForm>
  );
}
