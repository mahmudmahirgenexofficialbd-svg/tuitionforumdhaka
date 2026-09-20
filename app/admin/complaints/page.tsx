import { PageHeader } from "@/components/ui/misc";
import { AdminResource } from "@/components/admin/admin-resource";
export const metadata = { title: "Complaints" };
export default function Page() {
  return (<><PageHeader title="Complaints" description="Complaints from tutors and guardians." /><AdminResource resource="complaints" /></>);
}
