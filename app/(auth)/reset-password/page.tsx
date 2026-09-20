import { EmptyState } from "@/components/ui/misc";
export const metadata = { title: "Set a new password" };
export default function Page() {
  return (<EmptyState title="Reset link needed" message="Password reset needs a valid link from your email. Request one and we'll send it." actionLabel="Request a reset link" href="/forgot-password" />);
}
