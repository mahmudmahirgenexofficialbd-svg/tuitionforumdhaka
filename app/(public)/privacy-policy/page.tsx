import { ProsePage, LegalDraftNotice } from "@/components/layout/prose-page";
export const metadata = { title: "Privacy policy" };
export default function Page() {
  return (
    <ProsePage title="Privacy policy">
      <LegalDraftNotice />
      <p>We collect the details you give us when registering and posting tuition. Guardian phone numbers and emails are never shown publicly. We do not sell personal data.</p><h2>Your choices</h2><p>You can ask us to correct or delete your account data by contacting support.</p>
    </ProsePage>
  );
}
