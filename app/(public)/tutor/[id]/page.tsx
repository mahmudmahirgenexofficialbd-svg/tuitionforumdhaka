import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BadgeCheck, Star } from "lucide-react";
import { TUTORS } from "@/lib/mock-data";
import { Avatar } from "@/components/ui/misc";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatBDT, formatDate } from "@/lib/utils";

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const t = TUTORS.find((x) => x.id === params.id);
  // Public metadata deliberately excludes contact details.
  return t ? { title: `${t.name} · ${t.department} tutor`, description: `${t.department} student at ${t.university}. Teaches ${t.subjects.join(", ")}.` } : {};
}

export default function TutorProfile({ params }: { params: { id: string } }) {
  const t = TUTORS.find((x) => x.id === params.id);
  if (!t) notFound();
  return (
    <div className="container-page max-w-4xl py-10">
      <div className="card p-6 sm:p-8">
        <div className="flex flex-wrap items-start gap-4">
          <Avatar name={t.name} className="h-16 w-16 text-xl" />
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold">{t.name}</h1>
            <p className="text-slate-600">{t.department}, {t.university} · {t.year}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {t.verification === "VERIFIED" ? <Badge tone="success"><BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />Verified Tutor</Badge> : <StatusBadge status={t.verification} />}
              {t.reviewCount > 0 && <span className="flex items-center gap-1 text-sm font-semibold"><Star className="h-4 w-4 fill-marigold-500 text-marigold-500" aria-hidden="true" />{t.rating.toFixed(1)} ({t.reviewCount} reviews)</span>}
            </div>
          </div>
          <Button href="/login">Log in to contact</Button>
        </div>
        <p className="mt-6 text-slate-700">{t.bio}</p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          {[["Subjects", t.subjects.join(", ")], ["Classes", t.classes.join(", ")], ["Preferred locations", [...t.areas, ...t.districts].join(", ")], ["Available days", t.availableDays.join(", ")], ["Experience", `${t.experienceYears} year${t.experienceYears === 1 ? "" : "s"}`], ["Expected salary", `${formatBDT(t.expectedSalary)} / month`], ["Member since", formatDate(t.joinedAt)], ["Tutor ID", t.id]].map(([k, v]) => (
            <div key={k} className="rounded-xl bg-paper p-4"><dt className="text-xs font-semibold text-slate-500">{k}</dt><dd className="mt-1 font-medium">{v}</dd></div>
          ))}
        </dl>
        <p className="mt-6 text-xs text-slate-500">Phone number and email are private and shared only at the correct stage of the process.</p>
      </div>
    </div>
  );
}
