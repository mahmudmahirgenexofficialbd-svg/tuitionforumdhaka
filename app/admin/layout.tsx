import { DashboardShell } from "@/components/layout/dashboard-shell";
export const metadata = { title: "Admin" };
export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardShell role="admin">{children}</DashboardShell>;
}
