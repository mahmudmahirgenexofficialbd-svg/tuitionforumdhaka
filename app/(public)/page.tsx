import Link from "next/link";
import { BadgeCheck, ShieldCheck, Wallet, ClipboardCheck, MapPinned, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSearch } from "@/components/tuition/search-form";
import { TuitionCard } from "@/components/tuition/tuition-card";
import { TutorCard } from "@/components/tuition/tutor-card";
import { FAQS, TUITIONS, TUTORS } from "@/lib/mock-data";
import { DIVISIONS } from "@/lib/constants";
import { formatBDT } from "@/lib/utils";

const guardianSteps = ["Create account", "Post tuition", "Review tutors", "Select tutor", "Confirm payment", "Start tuition"];
const tutorSteps = ["Create profile", "Find tuition", "Apply", "Get selected", "Start teaching", "Receive payment"];

const trust = [
  { icon: ClipboardCheck, title: "Every post is reviewed", text: "Guardian posts go public only after our team approves them." },
  { icon: BadgeCheck, title: "Verified tutor badge", text: "Given manually after we check identity and education documents." },
  { icon: Wallet, title: "Free to join", text: "No registration fee and no application fee for tutors or guardians." },
  { icon: ShieldCheck, title: "Private by default", text: "Phone numbers and emails stay hidden until the right stage." },
];

export default function HomePage() {
  const featured = TUITIONS.slice(0, 3);
  const heroCards = TUITIONS.slice(0, 3);
  return (
    <>
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "22px 22px" }} aria-hidden="true" />
        <div className="container-page relative grid items-center gap-12 py-16 lg:grid-cols-[1.15fr_1fr] lg:py-24">
          <div>
            <h1 className="hero-rise text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">Find the Right Tutor. Build the Right Future.</h1>
            <p className="hero-rise-2 mt-5 max-w-xl text-lg text-brand-100">
              Tuition Forum Dhaka connects guardians with tutors across Bangladesh. Post a tuition for free, review applicants, and pay only when you confirm your tutor.
            </p>
            <div className="hero-rise-3 mt-8 flex flex-wrap gap-3">
              <Button href="/tutors" variant="accent" size="lg">Find a tutor</Button>
              <Button href="/register/guardian" size="lg" className="border border-white/30 bg-transparent hover:bg-white/10">Post a tuition</Button>
            </div>
            <div className="hero-rise-3 mt-10"><HeroSearch /></div>
          </div>
          <div className="relative hidden h-[420px] lg:block" aria-hidden="true">
            {heroCards.map((t, i) => (
              <div key={t.id} className="absolute w-[340px] rounded-2xl bg-white p-5 text-ink shadow-lift" style={{ top: i * 96, left: i % 2 === 0 ? 0 : 70, transform: `rotate(${[-3, 2, -1.5][i]}deg)`, zIndex: i }}>
                <p className="text-xs font-semibold text-slate-500">{t.id} · {t.district}</p>
                <p className="mt-1 font-display text-lg font-bold text-brand-900">{t.title}</p>
                <p className="mt-2 text-sm text-slate-600">{t.daysPerWeek} days/week · {t.area}</p>
                <p className="mt-2 font-display text-lg font-bold text-brand-700">{formatBDT(t.salaryMin)} – {formatBDT(t.salaryMax)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="text-3xl font-bold text-brand-950">How Tuition Forum Dhaka works</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {[{ who: "For guardians", steps: guardianSteps, href: "/register/guardian", cta: "Post a tuition" }, { who: "For tutors", steps: tutorSteps, href: "/register/tutor", cta: "Create tutor profile" }].map((g) => (
            <div key={g.who} className="card p-6">
              <h3 className="text-xl font-bold text-brand-900">{g.who}</h3>
              <ol className="mt-4 space-y-3">
                {g.steps.map((s, i) => (
                  <li key={s} className="flex items-center gap-3">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-100 text-sm font-bold text-brand-800">{i + 1}</span>
                    <span className="font-medium">{s}</span>
                  </li>
                ))}
              </ol>
              <Button href={g.href} variant="outline" className="mt-6">{g.cta}</Button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-page">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl font-bold text-brand-950">Recently approved tuition</h2>
            <Link href="/find-tuition" className="text-sm font-semibold text-brand-700 hover:underline">See all tuition</Link>
          </div>
          <p className="mt-1 text-xs text-slate-500">Sample listings shown for demonstration.</p>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{featured.map((t) => <TuitionCard key={t.id} t={t} />)}</div>
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="text-3xl font-bold text-brand-950">Why guardians and tutors trust us</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map(({ icon: I, title, text }) => (
            <div key={title} className="card p-5">
              <I className="h-6 w-6 text-brand-600" aria-hidden="true" />
              <h3 className="mt-3 font-bold">{title}</h3>
              <p className="mt-1 text-sm text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-page">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl font-bold text-brand-950">Verified tutors</h2>
            <Link href="/tutors" className="text-sm font-semibold text-brand-700 hover:underline">Browse all tutors</Link>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TUTORS.filter((t) => t.verification === "VERIFIED").map((t) => <TutorCard key={t.id} t={t} />)}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="card flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <MapPinned className="mt-1 h-8 w-8 shrink-0 text-brand-600" aria-hidden="true" />
            <div>
              <h2 className="text-2xl font-bold text-brand-950">Tuition in all {DIVISIONS.length} divisions</h2>
              <p className="mt-1 text-slate-600">Live platform statistics will appear here once the database is connected.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">{DIVISIONS.map((d) => <Link key={d} href={`/district/${d.toLowerCase()}`} className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-medium hover:border-brand-500 hover:text-brand-700">{d}</Link>)}</div>
        </div>
      </section>

      <section className="container-page pb-4">
        <h2 className="text-3xl font-bold text-brand-950">Common questions</h2>
        <div className="mt-6 max-w-3xl space-y-3">
          {FAQS.slice(0, 4).map((f) => (
            <details key={f.q} className="card group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">{f.q}<Plus className="h-5 w-5 shrink-0 transition-transform group-open:rotate-45" aria-hidden="true" /></summary>
              <p className="mt-3 text-sm text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="container-page py-12">
        <div className="rounded-3xl bg-brand-800 p-8 text-white sm:p-12">
          <h2 className="max-w-xl text-3xl font-bold">Ready to start? It costs nothing to join.</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/register/tutor" variant="accent" size="lg">Become a tutor</Button>
            <Button href="/register/guardian" size="lg" className="border border-white/30 bg-transparent hover:bg-white/10">Post a tuition</Button>
          </div>
        </div>
      </section>
    </>
  );
}
