"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LayoutGrid, List, SlidersHorizontal, Search, X } from "lucide-react";
import type { Tuition } from "@/lib/types";
import { CLASS_LEVELS, DISTRICTS_BY_DIVISION, DIVISIONS, MEDIUMS, SUBJECTS, THANAS_BY_DISTRICT } from "@/lib/constants";
import { TuitionCard } from "./tuition-card";
import { EmptyState } from "@/components/ui/misc";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Sort = "newest" | "oldest" | "salary-asc" | "salary-desc";

export function TuitionBrowser({ items, lockedDistrict, lockedSubject }: { items: Tuition[]; lockedDistrict?: string; lockedSubject?: string }) {
  const sp = useSearchParams();
  const [q, setQ] = useState(sp.get("q") ?? "");
  const [division, setDivision] = useState(sp.get("division") ?? "");
  const [district, setDistrict] = useState(lockedDistrict ?? sp.get("district") ?? "");
  const [thana, setThana] = useState("");
  const [area, setArea] = useState("");
  const [classLevel, setClassLevel] = useState(sp.get("classLevel") ?? "");
  const [subject, setSubject] = useState(lockedSubject ?? sp.get("subject") ?? "");
  const [medium, setMedium] = useState("");
  const [studentGender, setStudentGender] = useState("");
  const [tutorGender, setTutorGender] = useState("");
  const [days, setDays] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [postedWithin, setPostedWithin] = useState("");
  const [sort, setSort] = useState<Sort>("newest");
  const [view, setView] = useState<"card" | "list">("card");
  const [showFilters, setShowFilters] = useState(false);

  const districts = division ? DISTRICTS_BY_DIVISION[division] ?? [] : Object.values(DISTRICTS_BY_DIVISION).flat().sort();
  const thanas = district ? THANAS_BY_DISTRICT[district] ?? [] : [];

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = items.filter((t) => {
      if (needle && ![t.title, t.classLevel, t.district, t.thana, t.area, ...t.subjects].join(" ").toLowerCase().includes(needle)) return false;
      if (division && t.division !== division) return false;
      if (district && t.district.toLowerCase() !== district.toLowerCase()) return false;
      if (thana && t.thana !== thana) return false;
      if (area && !t.area.toLowerCase().includes(area.toLowerCase())) return false;
      if (classLevel && t.classLevel !== classLevel) return false;
      if (subject && !t.subjects.includes(subject)) return false;
      if (medium && t.medium !== medium) return false;
      if (studentGender && t.studentGender !== studentGender) return false;
      if (tutorGender && t.tutorGender !== tutorGender) return false;
      if (days && t.daysPerWeek !== Number(days)) return false;
      if (minSalary && t.salaryMax < Number(minSalary)) return false;
      if (maxSalary && t.salaryMin > Number(maxSalary)) return false;
      if (postedWithin && Date.now() - new Date(t.postedAt).getTime() > Number(postedWithin) * 86_400_000) return false;
      return true;
    });
    const by: Record<Sort, (a: Tuition, b: Tuition) => number> = {
      newest: (a, b) => +new Date(b.postedAt) - +new Date(a.postedAt),
      oldest: (a, b) => +new Date(a.postedAt) - +new Date(b.postedAt),
      "salary-asc": (a, b) => a.salaryMin - b.salaryMin,
      "salary-desc": (a, b) => b.salaryMax - a.salaryMax,
    };
    return [...list].sort(by[sort]);
  }, [items, q, division, district, thana, area, classLevel, subject, medium, studentGender, tutorGender, days, minSalary, maxSalary, postedWithin, sort]);

  function reset() {
    setQ(""); setDivision(""); if (!lockedDistrict) setDistrict(""); setThana(""); setArea(""); setClassLevel("");
    if (!lockedSubject) setSubject(""); setMedium(""); setStudentGender(""); setTutorGender(""); setDays("");
    setMinSalary(""); setMaxSalary(""); setPostedWithin("");
  }

  const sel = "input-base";
  const label = "mb-1 block text-xs font-semibold text-slate-600";

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      <div>
        <button className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-2.5 text-sm font-semibold lg:hidden" onClick={() => setShowFilters((v) => !v)} aria-expanded={showFilters}>
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />{showFilters ? "Hide filters" : "Show filters"}
        </button>
        <aside className={cn("card space-y-3 p-4 lg:sticky lg:top-20 lg:block", showFilters ? "block" : "hidden")} aria-label="Filters">
          <div className="flex items-center justify-between"><h2 className="font-bold">Filters</h2><button onClick={reset} className="flex items-center gap-1 text-xs font-semibold text-brand-700 hover:underline"><X className="h-3 w-3" aria-hidden="true" />Clear all</button></div>
          <div><label className={label} htmlFor="f-div">Division</label>
            <select id="f-div" className={sel} value={division} onChange={(e) => { setDivision(e.target.value); setDistrict(lockedDistrict ?? ""); setThana(""); }}><option value="">All divisions</option>{DIVISIONS.map((d) => <option key={d}>{d}</option>)}</select></div>
          <div><label className={label} htmlFor="f-dis">District</label>
            <select id="f-dis" className={sel} value={district} disabled={!!lockedDistrict} onChange={(e) => { setDistrict(e.target.value); setThana(""); }}><option value="">All districts</option>{districts.map((d) => <option key={d}>{d}</option>)}</select></div>
          <div><label className={label} htmlFor="f-th">Upazila / Thana</label>
            <select id="f-th" className={sel} value={thana} onChange={(e) => setThana(e.target.value)} disabled={!thanas.length}><option value="">{thanas.length ? "All thanas" : "Select a district first"}</option>{thanas.map((d) => <option key={d}>{d}</option>)}</select></div>
          <div><label className={label} htmlFor="f-area">Area</label><input id="f-area" className={sel} placeholder="e.g. Section 10" value={area} onChange={(e) => setArea(e.target.value)} /></div>
          <div><label className={label} htmlFor="f-cls">Class</label>
            <select id="f-cls" className={sel} value={classLevel} onChange={(e) => setClassLevel(e.target.value)}><option value="">All classes</option>{CLASS_LEVELS.map((c) => <option key={c}>{c}</option>)}</select></div>
          <div><label className={label} htmlFor="f-sub">Subject</label>
            <select id="f-sub" className={sel} value={subject} disabled={!!lockedSubject} onChange={(e) => setSubject(e.target.value)}><option value="">All subjects</option>{SUBJECTS.map((c) => <option key={c}>{c}</option>)}</select></div>
          <div><label className={label} htmlFor="f-med">Medium</label>
            <select id="f-med" className={sel} value={medium} onChange={(e) => setMedium(e.target.value)}><option value="">Any medium</option>{MEDIUMS.map((c) => <option key={c}>{c}</option>)}</select></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={label} htmlFor="f-sg">Student</label><select id="f-sg" className={sel} value={studentGender} onChange={(e) => setStudentGender(e.target.value)}><option value="">Any</option><option>Male</option><option>Female</option></select></div>
            <div><label className={label} htmlFor="f-tg">Tutor</label><select id="f-tg" className={sel} value={tutorGender} onChange={(e) => setTutorGender(e.target.value)}><option value="">Any</option><option>Male</option><option>Female</option></select></div>
          </div>
          <div><label className={label} htmlFor="f-days">Days per week</label>
            <select id="f-days" className={sel} value={days} onChange={(e) => setDays(e.target.value)}><option value="">Any</option>{[1, 2, 3, 4, 5, 6, 7].map((n) => <option key={n} value={n}>{n}</option>)}</select></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={label} htmlFor="f-min">Min salary (৳)</label><input id="f-min" type="number" inputMode="numeric" min={0} className={sel} value={minSalary} onChange={(e) => setMinSalary(e.target.value)} /></div>
            <div><label className={label} htmlFor="f-max">Max salary (৳)</label><input id="f-max" type="number" inputMode="numeric" min={0} className={sel} value={maxSalary} onChange={(e) => setMaxSalary(e.target.value)} /></div>
          </div>
          <div><label className={label} htmlFor="f-post">Date posted</label>
            <select id="f-post" className={sel} value={postedWithin} onChange={(e) => setPostedWithin(e.target.value)}><option value="">Any time</option><option value="1">Last 24 hours</option><option value="7">Last 7 days</option><option value="30">Last 30 days</option></select></div>
        </aside>
      </div>

      <section aria-label="Results">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="relative min-w-[200px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input aria-label="Search tuition" className="input-base pl-9" placeholder="Search by title, subject, area…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <select aria-label="Sort by" className="input-base w-auto" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            <option value="newest">Newest</option><option value="oldest">Oldest</option><option value="salary-asc">Salary: low to high</option><option value="salary-desc">Salary: high to low</option>
          </select>
          <div className="flex rounded-xl border border-slate-300 bg-white p-0.5" role="group" aria-label="View">
            {([["card", LayoutGrid, "Card view"], ["list", List, "List view"]] as const).map(([v, I, l]) => (
              <button key={v} onClick={() => setView(v)} aria-label={l} aria-pressed={view === v} className={cn("rounded-lg p-2", view === v ? "bg-brand-700 text-white" : "text-slate-600")}><I className="h-4 w-4" /></button>
            ))}
          </div>
        </div>
        <p className="mb-3 text-sm text-slate-600" aria-live="polite">{results.length} tuition{results.length === 1 ? "" : "s"} found</p>
        {results.length === 0 ? (
          <div><EmptyState title="No tuition matches these filters" message="Try removing a filter or searching a wider area." icon={<Search className="h-6 w-6" />} /><div className="mt-3 text-center"><Button variant="outline" onClick={reset}>Clear filters</Button></div></div>
        ) : (
          <div className={view === "card" ? "grid gap-5 md:grid-cols-2" : "space-y-4"}>{results.map((t) => <TuitionCard key={t.id} t={t} layout={view} />)}</div>
        )}
      </section>
    </div>
  );
}
