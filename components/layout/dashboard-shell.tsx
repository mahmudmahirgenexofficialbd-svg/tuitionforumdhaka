"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  Bell, BookOpen, CreditCard, FileText, Flag, Home, LayoutDashboard, Menu, Search, Settings, ShieldCheck,
  Star, User, Users, X, GraduationCap, Megaphone, ScrollText, Palette, Wallet, UserCog, LogOut,
} from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Avatar } from "@/components/ui/misc";
import { cn } from "@/lib/utils";

type Role = "tutor" | "guardian" | "admin";
interface NavItem { href: string; label: string; icon: ReactNode; mobile?: boolean }
const ic = "h-5 w-5";

const NAV: Record<Role, NavItem[]> = {
  tutor: [
    { href: "/dashboard/tutor", label: "Overview", icon: <Home className={ic} />, mobile: true },
    { href: "/find-tuition", label: "Find tuition", icon: <Search className={ic} />, mobile: true },
    { href: "/dashboard/tutor/applications", label: "Applications", icon: <FileText className={ic} />, mobile: true },
    { href: "/dashboard/tutor/tuition", label: "My tuition", icon: <BookOpen className={ic} /> },
    { href: "/dashboard/tutor/payments", label: "Payments", icon: <Wallet className={ic} /> },
    { href: "/dashboard/tutor/reviews", label: "Reviews", icon: <Star className={ic} /> },
    { href: "/dashboard/tutor/notifications", label: "Notifications", icon: <Bell className={ic} />, mobile: true },
    { href: "/dashboard/tutor/profile", label: "Profile", icon: <User className={ic} />, mobile: true },
  ],
  guardian: [
    { href: "/dashboard/guardian", label: "Overview", icon: <Home className={ic} />, mobile: true },
    { href: "/dashboard/guardian/tuition", label: "My tuition", icon: <BookOpen className={ic} />, mobile: true },
    { href: "/dashboard/guardian/applications", label: "Applicants", icon: <Users className={ic} />, mobile: true },
    { href: "/dashboard/guardian/payments", label: "Payments", icon: <CreditCard className={ic} /> },
    { href: "/dashboard/guardian/reviews", label: "Reviews", icon: <Star className={ic} /> },
    { href: "/dashboard/guardian/notifications", label: "Notifications", icon: <Bell className={ic} />, mobile: true },
    { href: "/dashboard/guardian/profile", label: "Profile", icon: <User className={ic} />, mobile: true },
  ],
  admin: [
    { href: "/admin", label: "Dashboard", icon: <LayoutDashboard className={ic} /> },
    { href: "/admin/users", label: "Users", icon: <Users className={ic} /> },
    { href: "/admin/tutors", label: "Tutors", icon: <GraduationCap className={ic} /> },
    { href: "/admin/guardians", label: "Guardians", icon: <User className={ic} /> },
    { href: "/admin/tuition", label: "Tuition", icon: <BookOpen className={ic} /> },
    { href: "/admin/applications", label: "Applications", icon: <FileText className={ic} /> },
    { href: "/admin/payments", label: "Payments", icon: <CreditCard className={ic} /> },
    { href: "/admin/reviews", label: "Reviews", icon: <Star className={ic} /> },
    { href: "/admin/complaints", label: "Complaints", icon: <Flag className={ic} /> },
    { href: "/admin/notifications", label: "Notifications", icon: <Megaphone className={ic} /> },
    { href: "/admin/homepage", label: "Homepage", icon: <Palette className={ic} /> },
    { href: "/admin/settings", label: "Website settings", icon: <Settings className={ic} /> },
    { href: "/admin/payment-settings", label: "Payment settings", icon: <Wallet className={ic} /> },
    { href: "/admin/admin-users", label: "Admin users", icon: <UserCog className={ic} /> },
    { href: "/admin/activity-logs", label: "Activity logs", icon: <ScrollText className={ic} /> },
  ],
};

const ROLE_LABEL: Record<Role, string> = { tutor: "Tutor", guardian: "Guardian", admin: "Admin" };
const DEMO_NAME: Record<Role, string> = { tutor: "Demo Tutor One", guardian: "Demo Guardian", admin: "Demo Admin" };

export function DashboardShell({ role, children }: { role: Role; children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const items = NAV[role];
  const root = items[0].href;
  const isActive = (href: string) => (href === root ? pathname === href : pathname.startsWith(href));
  const notifHref = role === "admin" ? "/admin/notifications" : `/dashboard/${role}/notifications`;

  const list = (
    <nav className="flex flex-col gap-0.5" aria-label={`${ROLE_LABEL[role]} navigation`}>
      {items.map((it) => (
        <Link key={it.href} href={it.href} onClick={() => setOpen(false)} aria-current={isActive(it.href) ? "page" : undefined}
          className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
            isActive(it.href) ? "bg-brand-700 text-white" : "text-slate-700 hover:bg-slate-100")}>
          {it.icon}{it.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-slate-200 bg-white p-4 lg:flex">
        <Logo className="mb-6 px-1" />
        <div className="flex-1 overflow-y-auto">{list}</div>
        <Link href="/login" className="mt-3 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"><LogOut className={ic} />Log out</Link>
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation">
          <div className="absolute inset-0 bg-brand-950/50" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 flex h-full w-72 max-w-[85vw] flex-col bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
              <Logo />
              <button onClick={() => setOpen(false)} aria-label="Close navigation" className="rounded-lg p-2 hover:bg-slate-100"><X className="h-5 w-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto">{list}</div>
          </div>
        </div>
      )}

      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <button className="rounded-lg p-2 hover:bg-slate-100 lg:hidden" onClick={() => setOpen(true)} aria-label="Open navigation"><Menu className="h-6 w-6" /></button>
            <span className="hidden items-center gap-1.5 text-sm font-semibold text-brand-800 sm:flex">
              {role === "admin" && <ShieldCheck className="h-4 w-4" aria-hidden="true" />}{ROLE_LABEL[role]} area
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href={notifHref} className="relative rounded-lg p-2 hover:bg-slate-100" aria-label="Notifications">
              <Bell className="h-5 w-5" /><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-marigold-500" />
            </Link>
            <div className="flex items-center gap-2"><Avatar name={DEMO_NAME[role]} className="h-9 w-9" /><span className="hidden text-sm font-semibold sm:block">{DEMO_NAME[role]}</span></div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl p-4 pb-28 sm:p-6 lg:pb-10">{children}</main>
      </div>

      {role !== "admin" && (
        <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] lg:hidden" aria-label="Quick navigation">
          {items.filter((i) => i.mobile).slice(0, 5).map((it) => (
            <Link key={it.href} href={it.href} aria-current={isActive(it.href) ? "page" : undefined}
              className={cn("flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium", isActive(it.href) ? "text-brand-700" : "text-slate-500")}>
              {it.icon}{it.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
