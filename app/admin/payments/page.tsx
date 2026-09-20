import { PageHeader } from "@/components/ui/misc";
import { AdminResource } from "@/components/admin/admin-resource";
export const metadata = { title: "Payments" };
export default function Page() {
  return (<><PageHeader title="Payments" description="Payments stay pending until you verify them against the platform account. A transaction ID alone never marks a payment as successful." /><AdminResource resource="payments" /></>);
}
