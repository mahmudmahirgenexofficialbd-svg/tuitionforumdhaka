import { PageHeader } from "@/components/ui/misc";
import { AdminResource } from "@/components/admin/admin-resource";
import { AddAdminButton } from "@/components/admin/admin-user-toolbar";
export const metadata = { title: "Admin users" };
export default function Page() {
  return (<><PageHeader title="Admin users" description="Only a Super Admin can create or change admin accounts. Access is permission-based." /><AdminResource resource="admin-users" toolbar={<AddAdminButton />} /></>);
}
