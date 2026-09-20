import { ForgotForm } from "@/components/layout/auth-forms";
export const metadata = { title: "Forgot password" };
export default function Page() {
  return (<div><h1 className="text-3xl font-bold text-brand-950">Reset your password</h1><p className="mt-1 text-slate-600">Enter your email and we will send a reset link.</p><div className="mt-8"><ForgotForm /></div></div>);
}
