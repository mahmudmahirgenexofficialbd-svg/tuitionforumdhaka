import { PageHeader } from "@/components/ui/misc";
import { AdminResource } from "@/components/admin/admin-resource";
export const metadata = { title: "Applications" };
export default function Page() {
  return (<><PageHeader title="Applications" description="All tutor applications across the platform." /><AdminResource resource="applications" /></>);
}
