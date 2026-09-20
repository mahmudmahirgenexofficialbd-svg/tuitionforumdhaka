import { Suspense } from "react";
import type { Metadata } from "next";
import { TuitionBrowser } from "@/components/tuition/tuition-browser";
import { PageHeader, Skeleton } from "@/components/ui/misc";
import { TUITIONS } from "@/lib/mock-data";
import { DIVISIONS } from "@/lib/constants";

const pretty = (s: string) => decodeURIComponent(s).replace(/\b\w/g, (c) => c.toUpperCase());

export function generateMetadata({ params }: { params: { district: string } }): Metadata {
  return { title: `Tuition in ${pretty(params.district)}`, description: `Approved tuition opportunities in ${pretty(params.district)}.` };
}

export default function DistrictPage({ params }: { params: { district: string } }) {
  const name = pretty(params.district);
  const isDivision = DIVISIONS.some((d) => d.toLowerCase() === name.toLowerCase());
  const items = TUITIONS.filter((t) => t.status === "APPROVED" && (isDivision ? t.division.toLowerCase() === name.toLowerCase() : t.district.toLowerCase() === name.toLowerCase()));
  return (
    <div className="container-page py-10">
      <PageHeader title={`Tuition in ${name}`} description="Approved tuition posts in this area." />
      <Suspense fallback={<Skeleton className="h-96" />}><TuitionBrowser items={items} /></Suspense>
    </div>
  );
}
