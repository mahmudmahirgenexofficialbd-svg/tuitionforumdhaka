import Link from "next/link";
import { BadgeCheck, GraduationCap, MapPin, Star } from "lucide-react";
import type { Tutor } from "@/lib/types";
import { formatBDT } from "@/lib/utils";
import { Avatar } from "@/components/ui/misc";
import { Badge } from "@/components/ui/badge";

export function TutorCard({ t }: { t: Tutor }) {
  return (
    <Link href={`/tutor/${t.id}`} className="card block p-5 transition-shadow hover:shadow-lift">
      <div className="flex items-start gap-3">
        <Avatar name={t.name} className="h-12 w-12 text-base" />
        <div className="min-w-0">
          <h3 className="truncate font-bold text-brand-950">{t.name}</h3>
          <p className="flex items-center gap-1 text-sm text-slate-600"><GraduationCap className="h-4 w-4" aria-hidden="true" />{t.university}</p>
        </div>
        {t.verification === "VERIFIED" && <Badge tone="success" className="ml-auto shrink-0"><BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />Verified</Badge>}
      </div>
      <p className="mt-3 text-sm text-slate-600">{t.department} · {t.year}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">{t.subjects.slice(0, 3).map((s) => <Badge key={s} tone="brand">{s}</Badge>)}</div>
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-sm">
        <span className="flex items-center gap-1 text-slate-600"><MapPin className="h-4 w-4" aria-hidden="true" />{t.districts[0]}</span>
        {t.reviewCount > 0 ? <span className="flex items-center gap-1 font-semibold"><Star className="h-4 w-4 fill-marigold-500 text-marigold-500" aria-hidden="true" />{t.rating.toFixed(1)} <span className="font-normal text-slate-500">({t.reviewCount})</span></span> : <span className="text-slate-500">No reviews yet</span>}
        <span className="font-semibold text-brand-800">{formatBDT(t.expectedSalary)}+</span>
      </div>
    </Link>
  );
}
