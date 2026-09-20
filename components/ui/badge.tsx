import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const tones = {
  neutral: "bg-slate-100 text-slate-700",
  brand: "bg-brand-100 text-brand-800",
  success: "bg-emerald-100 text-emerald-800",
  warning: "bg-amber-100 text-amber-800",
  danger: "bg-red-100 text-red-700",
  accent: "bg-marigold-100 text-marigold-700",
} as const;
export type Tone = keyof typeof tones;

export function Badge({ tone = "neutral", children, className }: { tone?: Tone; children: ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold", tones[tone], className)}>{children}</span>;
}

const STATUS_TONE: Record<string, Tone> = {
  APPROVED: "success", VERIFIED: "success", ACCEPTED: "success", ACTIVE: "success", RESOLVED: "success", OPEN: "warning",
  PENDING: "warning", UNDER_REVIEW: "warning", NEEDS_CORRECTION: "warning", SHORTLISTED: "brand", PAUSED: "neutral",
  REJECTED: "danger", SUSPENDED: "danger", CANCELLED: "danger", EXPIRED: "neutral", FILLED: "brand", ARCHIVED: "neutral",
  WITHDRAWN: "neutral", COMPLETED: "brand", DRAFT: "neutral", UNVERIFIED: "neutral", CLOSED: "neutral",
};

export function StatusBadge({ status }: { status: string }) {
  return <Badge tone={STATUS_TONE[status] ?? "neutral"}>{status.replace(/_/g, " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}</Badge>;
}
