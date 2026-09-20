import { EmptyState } from "@/components/ui/misc";
export const metadata = { title: "Verify your email" };
export default function Page() {
  return (<EmptyState title="Check your inbox" message="We'll email you a verification link once email sending is connected. Until then you can keep exploring." actionLabel="Go to login" href="/login" />);
}
