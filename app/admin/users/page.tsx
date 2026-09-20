import { PageHeader } from "@/components/ui/misc";
import { AdminResource } from "@/components/admin/admin-resource";
export const metadata = { title: "Users" };
export default function Page() {
  return (<><PageHeader title="Users" description="All accounts. Contact details are masked." /><AdminResource resource="users" /></>);
}
