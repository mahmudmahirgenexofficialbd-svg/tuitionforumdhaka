"use client";
import { useState } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { TUITIONS } from "@/lib/mock-data";
import type { Tuition, TuitionStatus } from "@/lib/types";
import { formatBDT, timeAgo } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/misc";
import { ConfirmDialog } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";

const HINT: Partial<Record<TuitionStatus, string>> = {
  PENDING: "Waiting for admin review. It is not public yet.",
  APPROVED: "Live. Tutors can apply.",
  REJECTED: "Not approved. Edit and resubmit.",
  PAUSED: "Hidden from tutors until you resume.",
  FILLED: "A tutor has been selected.",
};

// Sample posts owned by the demo guardian (one still pending approval)
const MINE: Tuition[] = [
  { ...TUITIONS[0] },
  { ...TUITIONS[1] },
  { ...TUITIONS[2], id: "TFD-1009", title: "Class 5 English and Math", status: "PENDING", applicants: 0 },
];

export function MyTuitionList() {
  const toast = useToast();
  const [items, setItems] = useState(MINE);
  const [target, setTarget] = useState<Tuition | null>(null);
  const set = (id: string, status: TuitionStatus) => setItems((p) => p.map((t) => (t.id === id ? { ...t, status } : t)));

  if (!items.length) return <EmptyState title="You have not posted any tuition" message="Post your first tuition. Our team reviews it before tutors can see it." actionLabel="Post a tuition" href="/dashboard/guardian/tuition/new" icon={<BookOpen className="h-6 w-6" />} />;
  return (
    <>
      <ul className="space-y-4">
        {items.map((t) => (
          <li key={t.id} className="card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-slate-500">{t.id} · {timeAgo(t.postedAt)}</p>
                <h2 className="mt-1 text-lg font-bold">{t.title}</h2>
                <p className="text-sm text-slate-600">{t.classLevel} · {t.area}, {t.district} · {formatBDT(t.salaryMin)}–{formatBDT(t.salaryMax)}</p>
              </div>
              <StatusBadge status={t.status} />
            </div>
            <p className="mt-2 text-sm text-slate-600">{HINT[t.status]}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {t.status === "APPROVED" && <><Button size="sm" href="/dashboard/guardian/applications">View {t.applicants} applicant{t.applicants === 1 ? "" : "s"}</Button><Button size="sm" variant="outline" href={"/tuition/" + t.id}>View public page</Button><Button size="sm" variant="outline" onClick={() => { set(t.id, "PAUSED"); toast("Tuition paused"); }}>Pause</Button></>}
              {t.status === "PAUSED" && <Button size="sm" variant="outline" onClick={() => { set(t.id, "PENDING"); toast("Sent for re-approval"); }}>Resume</Button>}
              {["PENDING", "APPROVED", "PAUSED"].includes(t.status) && <Button size="sm" variant="ghost" onClick={() => setTarget(t)}>Cancel tuition</Button>}
            </div>
          </li>
        ))}
      </ul>
      <ConfirmDialog open={!!target} onClose={() => setTarget(null)} title="Cancel this tuition?" message="Tutors will no longer be able to apply. This cannot be undone." confirmLabel="Cancel tuition" danger onConfirm={() => { if (target) { set(target.id, "CANCELLED"); toast("Tuition cancelled"); } }} />
    </>
  );
}
