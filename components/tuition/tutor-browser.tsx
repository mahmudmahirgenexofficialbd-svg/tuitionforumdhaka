"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Tutor } from "@/lib/types";
import { TutorCard } from "./tutor-card";
import { EmptyState } from "@/components/ui/misc";
import { SUBJECTS } from "@/lib/constants";

export function TutorBrowser({ tutors }: { tutors: Tutor[] }) {
  const [q, setQ] = useState("");
  const [subject, setSubject] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const results = useMemo(() => {
    const n = q.trim().toLowerCase();
    return tutors.filter((t) =>
      (!n || [t.name, t.university, t.department, ...t.districts, ...t.areas].join(" ").toLowerCase().includes(n)) &&
      (!subject || t.subjects.includes(subject)) && (!verifiedOnly || t.verification === "VERIFIED"));
  }, [tutors, q, subject, verifiedOnly]);
  return (
    <>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input aria-label="Search tutors" className="input-base pl-9" placeholder="Name, university, department, area…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <select aria-label="Subject" className="input-base w-auto" value={subject} onChange={(e) => setSubject(e.target.value)}>
          <option value="">All subjects</option>{SUBJECTS.map((s) => <option key={s}>{s}</option>)}
        </select>
        <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" className="h-4 w-4 rounded" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} />Verified only</label>
      </div>
      {results.length === 0 ? <EmptyState title="No tutors found" message="Try a different subject or search term." icon={<Search className="h-6 w-6" />} />
        : <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{results.map((t) => <TutorCard key={t.id} t={t} />)}</div>}
    </>
  );
}
