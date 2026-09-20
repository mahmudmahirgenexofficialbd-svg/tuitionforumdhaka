import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { TUITIONS } from "@/lib/mock-data";
import { formatBDT, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ApplyButton } from "@/components/tuition/apply-modal";
import { siteConfig } from "@/config/site";

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const t = TUITIONS.find((x) => x.id === params.id && x.status === "APPROVED");
  if (!t) return {};
  return { title: t.title, description: `${t.classLevel} ${t.subjects.join(", ")} tuition in ${t.area}, ${t.district}. ${formatBDT(t.salaryMin)}–${formatBDT(t.salaryMax)} per month.`, alternates: { canonical: `/tuition/${t.id}` } };
}

export default function TuitionDetail({ params }: { params: { id: string } }) {
  const t = TUITIONS.find((x) => x.id === params.id && x.status === "APPROVED"); // only approved posts are public
  if (!t) notFound();
  const rows: [string, string][] = [
    ["Class", t.classLevel], ["Subjects", t.subjects.join(", ")], ["Medium", t.medium],
    ["Location", `${t.area}, ${t.thana}, ${t.district}, ${t.division}`],
    ["Schedule", `${t.days.join(", ")} · ${t.daysPerWeek} days/week`], ["Time", `${t.time}${t.flexible ? " (flexible)" : ""}`],
    ["Students", `${t.students} (${t.studentGender})`], ["Tutor preference", t.tutorGender === "Any" ? "No gender preference" : `${t.tutorGender} tutor`],
  ];
  const jsonLd = { "@context": "https://schema.org", "@type": "JobPosting", title: t.title, datePosted: t.postedAt, validThrough: t.deadline, employmentType: "PART_TIME", hiringOrganization: { "@type": "Organization", name: siteConfig.name }, jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: t.district, addressCountry: "BD" } }, baseSalary: { "@type": "MonetaryAmount", currency: "BDT", value: { "@type": "QuantitativeValue", minValue: t.salaryMin, maxValue: t.salaryMax, unitText: "MONTH" } } };
  return (
    <div className="container-page py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-slate-600"><Link href="/find-tuition" className="hover:underline">Find tuition</Link> / <span>{t.id}</span></nav>
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <article className="card p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2"><Badge tone="brand">{t.id}</Badge><Badge tone="success">Approved</Badge></div>
          <h1 className="mt-3 text-2xl font-bold sm:text-3xl">{t.title}</h1>
          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            {rows.map(([k, v]) => <div key={k} className="rounded-xl bg-paper p-4"><dt className="text-xs font-semibold text-slate-500">{k}</dt><dd className="mt-1 font-medium">{v}</dd></div>)}
          </dl>
          <h2 className="mt-8 text-lg font-bold">About this tuition</h2>
          <p className="mt-2 text-slate-700">{t.description}</p>
          <h2 className="mt-6 text-lg font-bold">Requirements</h2>
          <p className="mt-2 text-slate-700">{t.requirements}</p>
        </article>
        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <div className="card p-6">
            <p className="text-sm text-slate-500">Monthly salary</p>
            <p className="font-display text-3xl font-bold text-brand-800">{formatBDT(t.salaryMin)} – {formatBDT(t.salaryMax)}</p>
            <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
              <li>Posted {formatDate(t.postedAt)}</li><li>Apply by {formatDate(t.deadline)}</li><li>{t.applicants} applicant{t.applicants === 1 ? "" : "s"} so far</li>
            </ul>
            <div className="mt-5"><ApplyButton tuitionId={t.id} /></div>
            <p className="mt-3 text-xs text-slate-500">Free to apply. Guardian contact details are private until a tutor is selected.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
