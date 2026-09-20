import { ProsePage } from "@/components/layout/prose-page";
import { ContactForm } from "@/components/layout/contact-form";
import { siteConfig } from "@/config/site";
export const metadata = { title: "Contact us" };
export default function Contact() {
  return (
    <ProsePage title="Contact us" intro="Questions about a post, a payment or your account? Send us a message.">
      <p className="text-sm">Email: {siteConfig.contact.email} · Phone: {siteConfig.contact.phone} <span className="text-slate-500">(placeholders, editable from Admin › Website settings)</span></p>
      <ContactForm />
    </ProsePage>
  );
}
