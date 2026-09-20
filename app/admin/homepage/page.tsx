import { PageHeader } from "@/components/ui/misc";
import { SettingsForm } from "@/components/admin/settings-form";
export const metadata = { title: "Homepage settings" };
export default function Page() {
  return (
    <>
      <PageHeader title="Homepage settings" description="Edit homepage text without changing code." />
      <SettingsForm endpoint="/api/admin/homepage" fields={[
        { name: "heroTitle", label: "Hero heading", defaultValue: "Find the Right Tutor. Build the Right Future.", required: true },
        { name: "heroSubtitle", label: "Hero subtitle", type: "textarea", defaultValue: "Tuition Forum Dhaka connects guardians with tutors across Bangladesh." },
        { name: "cta1", label: "Primary button label", defaultValue: "Find a tutor" },
        { name: "cta2", label: "Secondary button label", defaultValue: "Post a tuition" },
        { name: "featured", label: "Featured tuition IDs", hint: "Comma separated, e.g. TFD-1001, TFD-1002" },
        { name: "featuredTutors", label: "Featured tutor IDs", hint: "Only verified tutors are shown." },
        { name: "footer", label: "Footer text", type: "textarea" },
      ]} />
    </>
  );
}
