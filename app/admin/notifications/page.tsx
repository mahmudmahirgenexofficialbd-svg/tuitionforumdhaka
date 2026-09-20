import { PageHeader } from "@/components/ui/misc";
import { SettingsForm } from "@/components/admin/settings-form";
export const metadata = { title: "Notifications" };
export default function Page() {
  return (
    <>
      <PageHeader title="Notifications" description="Send a system announcement to a group of users." />
      <SettingsForm endpoint="/api/admin/announcements" submitLabel="Send announcement" successMessage="Announcement sent" fields={[
        { name: "audience", label: "Audience", type: "select", options: ["All users", "Tutors", "Guardians"] },
        { name: "title", label: "Title", required: true },
        { name: "message", label: "Message", type: "textarea", required: true },
      ]} />
    </>
  );
}
