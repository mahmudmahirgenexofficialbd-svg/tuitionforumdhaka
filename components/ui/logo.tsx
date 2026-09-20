import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

// Temporary logo. Swap this one component when the final brand mark is ready.
export function Logo({ className, light = false, href = "/" }: { className?: string; light?: boolean; href?: string }) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-2.5", className)} aria-label={`${siteConfig.name} home`}>
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-brand-800 text-marigold-400">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 9l9-5 9 5-9 5-9-5z" />
          <path d="M7 11.5V16c0 1.2 2.2 2.5 5 2.5s5-1.3 5-2.5v-4.5" />
        </svg>
      </span>
      <span className={cn("font-display text-lg font-bold leading-none tracking-tight", light ? "text-white" : "text-brand-900")}>
        Tuition Forum <span className={light ? "text-marigold-400" : "text-brand-500"}>Dhaka</span>
      </span>
    </Link>
  );
}
