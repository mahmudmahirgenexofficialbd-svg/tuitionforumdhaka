import { DashboardShell } from "@/components/layout/dashboard-shell";
export const metadata = { title: "guardian dashboard" };
export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardShell role="guardian">{children}</DashboardShell>;
}
