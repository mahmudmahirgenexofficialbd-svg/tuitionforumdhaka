"use client";
import { useForm } from "react-hook-form";
import { Field } from "@/components/ui/misc";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { submitStub } from "@/lib/api-stub";

export interface SettingField { name: string; label: string; type?: "text" | "textarea" | "checkbox" | "select" | "email" | "tel"; defaultValue?: string | boolean; hint?: string; options?: string[]; required?: boolean }

export function SettingsForm({ endpoint, fields, submitLabel = "Save settings", successMessage = "Settings saved" }: { endpoint: string; fields: SettingField[]; submitLabel?: string; successMessage?: string }) {
  const toast = useToast();
  const defaults = Object.fromEntries(fields.map((f) => [f.name, f.defaultValue ?? (f.type === "checkbox" ? false : "")]));
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Record<string, string | boolean>>({ defaultValues: defaults });
  return (
    <form noValidate className="card grid gap-4 p-6 sm:grid-cols-2" onSubmit={handleSubmit(async (v) => { await submitStub(endpoint, v); toast(`${successMessage}. Change logged.`); })}>
      {fields.map((f) => {
        const err = errors[f.name]?.message as string | undefined;
        const full = f.type === "textarea" || f.type === "checkbox";
        return (
          <div key={f.name} className={full ? "sm:col-span-2" : ""}>
            {f.type === "checkbox" ? (
              <label className="flex items-start gap-3"><input type="checkbox" className="mt-1 h-4 w-4 rounded" {...register(f.name)} /><span><span className="block text-sm font-semibold">{f.label}</span>{f.hint && <span className="text-xs text-slate-500">{f.hint}</span>}</span></label>
            ) : (
              <Field label={f.label} required={f.required} hint={f.hint} error={err}>
                {f.type === "textarea" ? <textarea rows={3} className="input-base" {...register(f.name, { required: f.required ? `${f.label} is required` : false })} />
                  : f.type === "select" ? <select className="input-base" {...register(f.name)}>{f.options?.map((o) => <option key={o}>{o}</option>)}</select>
                  : <input type={f.type ?? "text"} className="input-base" {...register(f.name, { required: f.required ? `${f.label} is required` : false })} />}
              </Field>
            )}
          </div>
        );
      })}
      <div className="sm:col-span-2"><Button type="submit" loading={isSubmitting}>{submitLabel}</Button></div>
    </form>
  );
}
