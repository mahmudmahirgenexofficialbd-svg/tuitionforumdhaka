// Placeholder platform settings. In production these come from the PaymentSetting table
// and are edited in Admin > Payment settings. Never hardcode real payment numbers in the frontend.
export const PAYMENT_SETTINGS = {
  bkashNumber: "01XXXXXXXXX",
  nagadNumber: "01XXXXXXXXX",
  accountType: "Personal",
  instructions: "Use Send Money. Write your Tuition ID in the reference field, then submit the transaction ID below.",
  referenceFormat: "TFD-<tuition id>",
};
