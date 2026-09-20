import { PageHeader } from "@/components/ui/misc";
import { AdminResource } from "@/components/admin/admin-resource";
export const metadata = { title: "Tutors" };
export default function Page() {
  return (<><PageHeader title="Tutors" description="Verify tutors after checking identity and education documents. The badge is never automatic." /><AdminResource resource="tutors" /></>);
}
