import Link from "next/link";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import type { Tuition } from "@/lib/types";
import { formatBDT, timeAgo } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function TuitionCard({ t, layout = "card" }: { t: Tuition; layout?: "card" | "list" }) {
  return (
    <Link href={`/tuition/${t.id}`} className={`card group block p-5 transition-shadow hover:shadow-lift ${layout === "list" ? "sm:flex sm:items-center sm:justify-between sm:gap-6" : ""}`}>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-slate-500">{t.id}</span>
          <span className="text-xs text-slate-500">{timeAgo(t.postedAt)}</span>
        </div>
        <h3 className="mt-2 text-lg font-bold leading-snug text-brand-950 group-hover:text-brand-700">{t.title}</h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <Badge tone="brand">{t.classLevel}</Badge>
          {t.subjects.slice(0, 3).map((s) => <Badge key={s}>{s}</Badge>)}
        </div>
        <ul className="mt-4 grid gap-1.5 text-sm text-slate-600 sm:grid-cols-2">
          <li className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />{t.area}, {t.thana}, {t.district}</li>
          <li className="flex items-center gap-2"><CalendarDays className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />{t.daysPerWeek} days/week</li>
          <li className="flex items-center gap-2"><Clock className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />{t.time}</li>
          <li className="flex items-center gap-2"><Users className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />{t.students} student{t.students > 1 ? "s" : ""} ({t.studentGender})</li>
        </ul>
      </div>
      <div className={`mt-4 flex items-baseline justify-between border-t border-slate-100 pt-4 ${layout === "list" ? "sm:mt-0 sm:flex-col sm:items-end sm:border-0 sm:pt-0" : ""}`}>
        <p className="font-display text-xl font-bold text-brand-800">{formatBDT(t.salaryMin)}<span className="text-slate-400"> – </span>{formatBDT(t.salaryMax)}</p>
        <p className="text-xs text-slate-500">per month</p>
      </div>
    </Link>
  );
}
