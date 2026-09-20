import { PageHeader, EmptyState } from "@/components/ui/misc";
import { TuitionCard } from "@/components/tuition/tuition-card";
import { TUITIONS } from "@/lib/mock-data";
import { BookOpen } from "lucide-react";
export default function Page() {
  const mine = TUITIONS.slice(1, 2);
  return (
    <>
      <PageHeader title="My tuition" description="Tuition where you have been selected." />
      {mine.length ? <div className="grid gap-4 md:grid-cols-2">{mine.map((t) => <TuitionCard key={t.id} t={t} />)}</div> : <EmptyState title="No active tuition yet" message="Once a guardian selects you and payment is verified, the tuition shows up here." actionLabel="Find tuition" href="/find-tuition" icon={<BookOpen className="h-6 w-6" />} />}
    </>
  );
}
