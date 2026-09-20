import { PageHeader } from "@/components/ui/misc";
import { SettingsForm } from "@/components/admin/settings-form";
import { PAYMENT_SETTINGS } from "@/lib/settings";
export const metadata = { title: "Payment settings" };
export default function Page() {
  return (
    <>
      <PageHeader title="Payment settings" description="Numbers and instructions guardians see when confirming a tutor. Only admins with payment permission can change these." />
      <SettingsForm endpoint="/api/admin/payment-settings" fields={[
        { name: "bkash", label: "bKash number", type: "tel", defaultValue: PAYMENT_SETTINGS.bkashNumber, required: true },
        { name: "nagad", label: "Nagad number", type: "tel", defaultValue: PAYMENT_SETTINGS.nagadNumber, required: true },
        { name: "accountType", label: "Account type", type: "select", options: ["Personal", "Agent", "Merchant"], defaultValue: PAYMENT_SETTINGS.accountType },
        { name: "reference", label: "Payment reference format", defaultValue: PAYMENT_SETTINGS.referenceFormat },
        { name: "instructions", label: "Instructions shown to guardians", type: "textarea", defaultValue: PAYMENT_SETTINGS.instructions },
        { name: "screenshot", label: "Require payment screenshot", type: "checkbox" },
      ]} />
    </>
  );
}
