import { PageHeader } from "@/components/ui/misc";
import { SettingsForm } from "@/components/admin/settings-form";
import { siteConfig } from "@/config/site";
export const metadata = { title: "Website settings" };
export default function Page() {
  return (
    <>
      <PageHeader title="Website settings" description="Basic site details and switches. Saved to the database in the backend phase." />
      <SettingsForm endpoint="/api/admin/settings" fields={[
        { name: "siteName", label: "Website name", defaultValue: siteConfig.name, required: true },
        { name: "email", label: "Contact email", type: "email", defaultValue: siteConfig.contact.email },
        { name: "phone", label: "Contact phone", type: "tel", defaultValue: siteConfig.contact.phone },
        { name: "address", label: "Address", defaultValue: siteConfig.contact.address },
        { name: "facebook", label: "Facebook page URL" },
        { name: "logo", label: "Logo URL", hint: "File upload arrives with storage setup." },
        { name: "maintenance", label: "Maintenance mode", type: "checkbox", hint: "Visitors see a maintenance message. Admins can still log in." },
        { name: "registration", label: "Allow new registrations", type: "checkbox", defaultValue: true },
        { name: "autoApprove", label: "Auto-approve tuition posts", type: "checkbox", hint: "Off by default. When off, an admin must approve every post." },
      ]} />
    </>
  );
}
