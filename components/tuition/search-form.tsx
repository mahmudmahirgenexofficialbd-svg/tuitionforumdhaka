import { CLASS_LEVELS, DISTRICTS_BY_DIVISION, SUBJECTS } from "@/lib/constants";
import { Search } from "lucide-react";

const districts = Object.values(DISTRICTS_BY_DIVISION).flat().sort();

export function HeroSearch() {
  return (
    <form action="/find-tuition" method="get" className="card grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]" role="search" aria-label="Search tuition">
      <select name="district" aria-label="District" className="input-base" defaultValue="">
        <option value="">Any district</option>{districts.map((d) => <option key={d}>{d}</option>)}
      </select>
      <select name="classLevel" aria-label="Class" className="input-base" defaultValue="">
        <option value="">Any class</option>{CLASS_LEVELS.map((c) => <option key={c}>{c}</option>)}
      </select>
      <select name="subject" aria-label="Subject" className="input-base" defaultValue="">
        <option value="">Any subject</option>{SUBJECTS.map((s) => <option key={s}>{s}</option>)}
      </select>
      <button type="submit" className="inline-flex h-[42px] items-center justify-center gap-2 rounded-xl bg-marigold-500 px-6 text-sm font-semibold text-brand-950 hover:bg-marigold-400 sm:col-span-2 lg:col-span-1">
        <Search className="h-4 w-4" aria-hidden="true" />Search
      </button>
    </form>
  );
}
