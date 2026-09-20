import { ProsePage, LegalDraftNotice } from "@/components/layout/prose-page";
export const metadata = { title: "Terms and conditions" };
export default function Page() {
  return (
    <ProsePage title="Terms and conditions">
      <LegalDraftNotice />
      <p>By using Tuition Forum Dhaka you agree to provide accurate information and to use the platform only for genuine tuition arrangements.</p><h2>Fees</h2><p>There is no registration fee and no application fee. A payment is made only when a guardian confirms a tutor through the platform process.</p>
    </ProsePage>
  );
}
