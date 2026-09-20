import { PageHeader } from "@/components/ui/misc";
import { AdminResource } from "@/components/admin/admin-resource";
export const metadata = { title: "Guardians" };
export default function Page() {
  return (<><PageHeader title="Guardians" description="Manage guardian accounts." /><AdminResource resource="guardians" /></>);
}
