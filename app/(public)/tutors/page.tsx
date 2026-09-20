import type { Metadata } from "next";
import { TutorBrowser } from "@/components/tuition/tutor-browser";
import { PageHeader } from "@/components/ui/misc";
import { TUTORS } from "@/lib/mock-data";

export const metadata: Metadata = { title: "Find tutors", description: "Browse tutors by subject, university and location." };

export default function TutorsPage() {
  return (
    <div className="container-page py-10">
      <PageHeader title="Find tutors" description="Tutors with the Verified badge have had their identity and education checked by our team." />
      <TutorBrowser tutors={TUTORS.filter((t) => t.verification !== "SUSPENDED" && t.verification !== "REJECTED")} />
    </div>
  );
}
