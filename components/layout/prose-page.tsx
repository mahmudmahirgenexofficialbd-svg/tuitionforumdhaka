import type { ReactNode } from "react";
export function ProsePage({ title, intro, children }: { title: string; intro?: string; children: ReactNode }) {
  return (
    <div className="container-page max-w-3xl py-12">
      <h1 className="text-3xl font-bold text-brand-950 sm:text-4xl">{title}</h1>
      {intro && <p className="mt-3 text-lg text-slate-600">{intro}</p>}
      <div className="mt-8 space-y-4 leading-relaxed text-slate-700 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-brand-900 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">{children}</div>
    </div>
  );
}
export function LegalDraftNotice() {
  return <p className="rounded-xl bg-marigold-50 p-4 text-sm text-marigold-700">Draft placeholder text. Have this reviewed by a qualified lawyer and updated before launch.</p>;
}
