import { ProsePage, LegalDraftNotice } from "@/components/layout/prose-page";
export const metadata = { title: "Complaint policy" };
export default function Page() {
  return (
    <ProsePage title="Complaint policy">
      <LegalDraftNotice />
      <p>Tutors and guardians can report problems from their dashboard. Our team reviews every complaint and may contact both sides before deciding.</p>
    </ProsePage>
  );
}
