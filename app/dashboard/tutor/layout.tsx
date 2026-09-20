import { DashboardShell } from "@/components/layout/dashboard-shell";
export const metadata = { title: "tutor dashboard" };
export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardShell role="tutor">{children}</DashboardShell>;
}
