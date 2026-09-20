import { ProsePage, LegalDraftNotice } from "@/components/layout/prose-page";
export const metadata = { title: "Refund policy" };
export default function Page() {
  return (
    <ProsePage title="Refund policy">
      <LegalDraftNotice />
      <p>Describe when a verified payment may be refunded, how to request a refund, and how long it takes. This policy must be written by the business owner.</p>
    </ProsePage>
  );
}
