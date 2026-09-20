import { PageHeader } from "@/components/ui/misc";
import { AdminResource } from "@/components/admin/admin-resource";
export const metadata = { title: "Reviews" };
export default function Page() {
  return (<><PageHeader title="Reviews" description="Hide or remove reviews that break the rules." /><AdminResource resource="reviews" /></>);
}
