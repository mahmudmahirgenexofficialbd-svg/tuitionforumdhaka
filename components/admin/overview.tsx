"use client";
import { useState } from "react";
import { BookOpen, CreditCard, Flag, GraduationCap, Star, Users, FileText, Clock } from "lucide-react";
import { StatsCard } from "@/components/ui/misc";
import { cn } from "@/lib/utils";

const RANGES = [["today", "Today"], ["7", "7 days"], ["30", "30 days"], ["90", "90 days"], ["custom", "Custom"]] as const;
// Deterministic demo series so the UI is stable. Replaced by aggregate queries in the backend phase.
const series = (n: number, base: number) => Array.from({ length: n }, (_, i) => Math.round(base + Math.sin(i * 1.3) * base * 0.35 + i * base * 0.03));

function Bars({ title, values, color }: { title: string; values: number[]; color: string }) {
  const max = Math.max(...values, 1);
  return (
    <div className="card p-5">
      <h3 className="font-bold">{title}</h3>
      <div className="mt-4 flex h-32 items-end gap-1" role="img" aria-label={`${title} bar chart, sample data`}>
        {values.map((v, i) => <div key={i} className={cn("flex-1 rounded-t", color)} style={{ height: `${(v / max) * 100}%` }} title={String(v)} />)}
      </div>
    </div>
  );
}

export function AdminOverview() {
  const [range, setRange] = useState<string>("30");
  const n = range === "today" ? 8 : range === "7" ? 7 : range === "90" ? 18 : range === "custom" ? 12 : 15;
  return (
    <div className="space-y-6">
      <p className="rounded-xl bg-marigold-50 px-4 py-2.5 text-xs text-marigold-700">Sample numbers for layout only. Live figures come from the database in the backend phase.</p>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Time range">
        {RANGES.map(([v, l]) => <button key={v} onClick={() => setRange(v)} aria-pressed={range === v} className={cn("rounded-full px-4 py-1.5 text-sm font-semibold", range === v ? "bg-brand-700 text-white" : "bg-white text-slate-700 ring-1 ring-slate-300")}>{l}</button>)}
        {range === "custom" && <span className="flex items-center gap-2 text-sm"><input type="date" aria-label="From" className="input-base w-auto" /><input type="date" aria-label="To" className="input-base w-auto" /></span>}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Total users" value={128} icon={<Users className="h-5 w-5" />} />
        <StatsCard label="Tutors" value={74} icon={<GraduationCap className="h-5 w-5" />} />
        <StatsCard label="Guardians" value={54} icon={<Users className="h-5 w-5" />} />
        <StatsCard label="Pending tutor verifications" value={9} icon={<Clock className="h-5 w-5" />} />
        <StatsCard label="Pending tuition posts" value={6} icon={<BookOpen className="h-5 w-5" />} />
        <StatsCard label="Applications" value={212} icon={<FileText className="h-5 w-5" />} />
        <StatsCard label="Pending payments" value={3} icon={<CreditCard className="h-5 w-5" />} />
        <StatsCard label="Open complaints" value={2} icon={<Flag className="h-5 w-5" />} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Bars title="User growth" values={series(n, 8)} color="bg-brand-500" />
        <Bars title="Tuition posts" values={series(n, 5)} color="bg-marigold-500" />
        <Bars title="Applications" values={series(n, 14)} color="bg-brand-300" />
        <Bars title="Payments" values={series(n, 3)} color="bg-emerald-500" />
      </div>
      <div className="card flex items-center gap-3 p-5"><Star className="h-5 w-5 text-marigold-500" aria-hidden="true" /><p className="text-sm">Reviews awaiting moderation: <strong>1</strong></p></div>
    </div>
  );
}
