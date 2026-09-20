import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export function EmptyState({ title, message, actionLabel, href, icon }: { title: string; message: string; actionLabel?: string; href?: string; icon?: ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
      {icon && <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600">{icon}</div>}
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-slate-600">{message}</p>
      {actionLabel && href && <Button href={href} className="mt-5">{actionLabel}</Button>}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-slate-200/80", className)} aria-hidden="true" />;
}

export function StatsCard({ label, value, hint, icon }: { label: string; value: string | number; hint?: string; icon?: ReactNode }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600">{label}</p>
        {icon && <span className="text-brand-500">{icon}</span>}
      </div>
      <p className="mt-2 font-display text-3xl font-bold text-brand-900">{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

export function PageHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold text-brand-950 sm:text-3xl">{title}</h1>
        {description && <p className="mt-1 max-w-2xl text-sm text-slate-600">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Avatar({ name, className }: { name: string; className?: string }) {
  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  return <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-100 text-sm font-bold text-brand-800", className)} aria-hidden="true">{initials}</span>;
}

export function Field({ label, error, required, hint, children }: { label: string; error?: string; required?: boolean; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-slate-800">
        {label}{required && <span className="ml-0.5 text-red-600" aria-hidden="true">*</span>}
      </span>
      {children}
      {hint && !error && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
      {error && <span role="alert" className="mt-1 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  );
}

export function DemoNotice() {
  return (
    <p className="rounded-xl bg-marigold-50 px-4 py-2.5 text-xs text-marigold-700">
      Demo mode: this screen uses sample data. Changes are not saved until the backend is connected.
    </p>
  );
}
