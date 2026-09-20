import { Suspense } from "react";
import type { Metadata } from "next";
import { TuitionBrowser } from "@/components/tuition/tuition-browser";
import { PageHeader, Skeleton } from "@/components/ui/misc";
import { TUITIONS } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Find tuition", description: "Browse approved tuition opportunities across Bangladesh. Filter by district, class, subject and salary." };

export default function FindTuitionPage() {
  const approved = TUITIONS.filter((t) => t.status === "APPROVED");
  return (
    <div className="container-page py-10">
      <PageHeader title="Find tuition" description="Only tuition posts approved by our team are listed here." />
      <Suspense fallback={<Skeleton className="h-96" />}><TuitionBrowser items={approved} /></Suspense>
    </div>
  );
}
