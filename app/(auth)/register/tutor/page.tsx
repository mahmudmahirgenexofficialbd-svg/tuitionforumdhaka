import Link from "next/link";
import { TutorRegisterForm } from "@/components/layout/auth-forms";
export const metadata = { title: "Tutor registration" };
export default function Page() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-950">Tutor account</h1>
      <p className="mt-1 text-slate-600">Free to create. Verification is done by our team after registration.</p>
      <div className="mt-8"><TutorRegisterForm /></div>
      <p className="mt-6 text-center text-sm text-slate-600">Are you a guardian? <Link href="/register/guardian" className="font-semibold text-brand-700 hover:underline">Register as a guardian</Link></p>
    </div>
  );
}
