import { ProsePage } from "@/components/layout/prose-page";
import { FAQS } from "@/lib/mock-data";
import { Plus } from "lucide-react";
export const metadata = { title: "Frequently asked questions" };
export default function Faq() {
  return (
    <ProsePage title="Frequently asked questions">
      <div className="space-y-3">
        {FAQS.map((f) => (
          <details key={f.q} className="card group p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">{f.q}<Plus className="h-5 w-5 shrink-0 transition-transform group-open:rotate-45" aria-hidden="true" /></summary>
            <p className="mt-3 text-sm">{f.a}</p>
          </details>
        ))}
      </div>
    </ProsePage>
  );
}
