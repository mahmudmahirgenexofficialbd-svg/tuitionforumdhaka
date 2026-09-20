"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/find-tuition", label: "Find tuition" },
  { href: "/tutors", label: "Find tutors" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-brand-800">{l.label}</Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Button href="/login" variant="ghost" size="sm">Log in</Button>
          <Button href="/register/guardian" variant="outline" size="sm">Post a tuition</Button>
          <Button href="/register/tutor" size="sm">Become a tutor</Button>
        </div>
        <button className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}>
          <Menu className="h-6 w-6" />
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-brand-950/50" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-80 max-w-[85vw] flex-col bg-white p-5 shadow-lift">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-display font-bold text-brand-900">Menu</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="rounded-lg p-2 hover:bg-slate-100"><X className="h-5 w-5" /></button>
            </div>
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 font-medium hover:bg-slate-100">{l.label}</Link>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-2 pt-6">
              <Button href="/register/tutor">Become a tutor</Button>
              <Button href="/register/guardian" variant="outline">Post a tuition</Button>
              <Button href="/login" variant="ghost">Log in</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
