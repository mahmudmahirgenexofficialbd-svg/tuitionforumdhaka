import { Suspense } from "react";
import type { Metadata } from "next";
import { TuitionBrowser } from "@/components/tuition/tuition-browser";
import { PageHeader, Skeleton } from "@/components/ui/misc";
import { TUITIONS } from "@/lib/mock-data";
import { SUBJECTS } from "@/lib/constants";

function resolve(slug: string) {
  const s = decodeURIComponent(slug).replace(/-/g, " ").toLowerCase();
  return SUBJECTS.find((x) => x.toLowerCase() === s) ?? decodeURIComponent(slug);
}

export function generateMetadata({ params }: { params: { subject: string } }): Metadata {
  return { title: `${resolve(params.subject)} tuition`, description: `Find ${resolve(params.subject)} tuition jobs across Bangladesh.` };
}

export default function SubjectPage({ params }: { params: { subject: string } }) {
  const subject = resolve(params.subject);
  const items = TUITIONS.filter((t) => t.status === "APPROVED" && t.subjects.includes(subject));
  return (
    <div className="container-page py-10">
      <PageHeader title={`${subject} tuition`} description="Approved tuition posts for this subject." />
      <Suspense fallback={<Skeleton className="h-96" />}><TuitionBrowser items={items} lockedSubject={SUBJECTS.some((s) => s === subject) ? subject : undefined} /></Suspense>
    </div>
  );
}
