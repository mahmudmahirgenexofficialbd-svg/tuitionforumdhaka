import Link from "next/link";
import { GraduationCap, Users } from "lucide-react";
export const metadata = { title: "Create an account" };
export default function Register() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-950">Create your free account</h1>
      <p className="mt-1 text-slate-600">Choose how you will use Tuition Forum Dhaka.</p>
      <div className="mt-8 grid gap-4">
        {[{ href: "/register/guardian", icon: Users, title: "I'm a guardian", text: "Post a tuition and choose from tutors who apply." }, { href: "/register/tutor", icon: GraduationCap, title: "I'm a tutor", text: "Build a profile and apply for tuition near you." }].map(({ href, icon: I, title, text }) => (
          <Link key={href} href={href} className="card flex items-center gap-4 p-5 transition-shadow hover:shadow-lift">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700"><I className="h-6 w-6" aria-hidden="true" /></span>
            <span><span className="block font-bold">{title}</span><span className="text-sm text-slate-600">{text}</span></span>
          </Link>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-slate-600">Already registered? <Link href="/login" className="font-semibold text-brand-700 hover:underline">Log in</Link></p>
    </div>
  );
}
