import { PageHeader } from "@/components/ui/misc";
import { PaymentSubmit } from "@/components/dashboard/payment-submit";
import { PaymentsTable } from "@/components/dashboard/payments-table";
export default function Page() {
  return (<div className="space-y-8"><PageHeader title="Payments" description="Confirm your selected tutor by paying through bKash or Nagad, then submit the transaction ID." /><PaymentSubmit /><section><h2 className="mb-3 text-xl font-bold">Payment history</h2><PaymentsTable role="guardian" /></section></div>);
}
