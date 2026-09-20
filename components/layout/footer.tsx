import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { siteConfig } from "@/config/site";

const cols = [
  { title: "Platform", items: [["Find tuition", "/find-tuition"], ["Find tutors", "/tutors"], ["How it works", "/how-it-works"], ["FAQ", "/faq"]] },
  { title: "Company", items: [["About us", "/about"], ["Contact", "/contact"], ["Complaint policy", "/complaint-policy"]] },
  { title: "Legal", items: [["Privacy policy", "/privacy-policy"], ["Terms and conditions", "/terms-and-conditions"], ["Refund policy", "/refund-policy"]] },
];

export function Footer() {
  return (
    <footer className="mt-20 bg-brand-950 text-brand-100">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm text-brand-200">{siteConfig.description}</p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h3 className="text-sm font-semibold text-white">{c.title}</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {c.items.map(([label, href]) => (
                <li key={href}><Link href={href} className="text-brand-200 hover:text-white">{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-brand-300">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
