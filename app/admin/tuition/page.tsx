import { PageHeader } from "@/components/ui/misc";
import { AdminResource } from "@/components/admin/admin-resource";
export const metadata = { title: "Tuition" };
export default function Page() {
  return (<><PageHeader title="Tuition" description="Approve, reject or suspend tuition posts. Only approved posts are public." /><AdminResource resource="tuition" /></>);
}
