import Link from "next/link";
import { GuardianRegisterForm } from "@/components/layout/auth-forms";
export const metadata = { title: "Guardian registration" };
export default function Page() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-950">Guardian account</h1>
      <p className="mt-1 text-slate-600">Free to create. Your phone number stays private.</p>
      <div className="mt-8"><GuardianRegisterForm /></div>
      <p className="mt-6 text-center text-sm text-slate-600">Are you a tutor? <Link href="/register/tutor" className="font-semibold text-brand-700 hover:underline">Register as a tutor</Link></p>
    </div>
  );
}
