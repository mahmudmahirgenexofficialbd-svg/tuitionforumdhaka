import { ArrowRight, BadgeCheck, BookOpen, FileText, Star, Wallet } from "lucide-react";
import Link from "next/link";
import { StatsCard, PageHeader, DemoNotice } from "@/components/ui/misc";
import { TuitionCard } from "@/components/tuition/tuition-card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { TUITIONS } from "@/lib/mock-data";

export default function TutorHome() {
  const completion = 72;
  return (
    <div className="space-y-6">
      <PageHeader title="Welcome back, Demo" description="Here is what needs your attention today." />
      <DemoNotice />
      <div className="card flex flex-wrap items-center gap-6 p-5">
        <div className="min-w-[220px] flex-1">
          <div className="flex items-center justify-between text-sm"><span className="font-semibold">Profile completion</span><span className="font-bold text-brand-800">{completion}%</span></div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200" role="progressbar" aria-valuenow={completion} aria-valuemin={0} aria-valuemax={100} aria-label="Profile completion"><div className="h-full rounded-full bg-brand-600" style={{ width: `${completion}%` }} /></div>
        </div>
        <div className="flex items-center gap-2 text-sm"><BadgeCheck className="h-5 w-5 text-brand-600" aria-hidden="true" />Verification: <StatusBadge status="PENDING" /></div>
        <Button href="/dashboard/tutor/profile" size="sm">Complete profile</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Applications" value={3} hint="1 shortlisted" icon={<FileText className="h-5 w-5" />} />
        <StatsCard label="Active tuition" value={1} icon={<BookOpen className="h-5 w-5" />} />
        <StatsCard label="Rating" value="4.8" hint="14 reviews" icon={<Star className="h-5 w-5" />} />
        <StatsCard label="Verified payments" value={1} icon={<Wallet className="h-5 w-5" />} />
      </div>
      <section>
        <div className="mb-3 flex items-center justify-between"><h2 className="text-xl font-bold">Recommended for you</h2><Link href="/find-tuition" className="flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline">Find tuition<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
        <div className="grid gap-4 md:grid-cols-2">{TUITIONS.slice(0, 2).map((t) => <TuitionCard key={t.id} t={t} />)}</div>
      </section>
    </div>
  );
}
