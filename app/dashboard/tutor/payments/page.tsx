import { PageHeader } from "@/components/ui/misc";
import { PaymentsTable } from "@/components/dashboard/payments-table";
export default function Page() { return (<><PageHeader title="Payments" description="Your payment and earning records. Guardian payment details are not shown here." /><PaymentsTable role="tutor" /></>); }
