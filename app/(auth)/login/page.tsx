import Link from "next/link";
import { LoginForm } from "@/components/layout/auth-forms";
export const metadata = { title: "Log in" };
export default function Login() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-950">Welcome back</h1>
      <p className="mt-1 text-slate-600">Log in to manage your tuition or applications.</p>
      <div className="mt-8"><LoginForm /></div>
      <p className="mt-6 text-center text-sm text-slate-600">New here? <Link href="/register" className="font-semibold text-brand-700 hover:underline">Create an account</Link></p>
      <div className="mt-8 rounded-2xl border border-dashed border-slate-300 p-4">
        <p className="text-sm font-semibold">Preview the dashboards (demo, no login)</p>
        <div className="mt-2 flex flex-wrap gap-2 text-sm">
          {[["/dashboard/tutor", "Tutor"], ["/dashboard/guardian", "Guardian"], ["/admin", "Admin"]].map(([h, l]) => <Link key={h} href={h} className="rounded-lg bg-brand-50 px-3 py-1.5 font-semibold text-brand-800 hover:bg-brand-100">{l} dashboard</Link>)}
        </div>
      </div>
    </div>
  );
}
