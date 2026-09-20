"use client";
import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { APPLICATIONS, PAYMENTS, TUITIONS, TUTORS } from "@/lib/mock-data";
import { formatBDT, timeAgo } from "@/lib/utils";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Field } from "@/components/ui/misc";
import { useToast } from "@/components/ui/toast";

type Row = { id: string; status: string; [k: string]: string | number };
type Action = { label: string; to: string; variant?: "outline" | "ghost" | "danger" | "primary"; needsNote?: boolean; from?: string[]; log: string };
interface Config { columns: Column<Row>[]; rows: Row[]; actions?: Action[]; search: string[]; statuses?: string[]; empty: string }

const statusCol: Column<Row> = { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> };

const CONFIGS: Record<string, Config> = {
  users: {
    search: ["name", "role", "email"], statuses: ["ACTIVE", "SUSPENDED"], empty: "No users match.",
    columns: [{ key: "name", header: "Name" }, { key: "role", header: "Role", render: (r) => <Badge tone="brand">{r.role}</Badge> }, { key: "email", header: "Email" }, { key: "phone", header: "Mobile" }, statusCol],
    rows: [
      { id: "u1", name: "Demo Tutor One", role: "TUTOR", email: "d***@example.com", phone: "0170****000", status: "ACTIVE" },
      { id: "u2", name: "Demo Guardian", role: "GUARDIAN", email: "g***@example.com", phone: "0171****111", status: "ACTIVE" },
      { id: "u3", name: "Demo Guardian B", role: "GUARDIAN", email: "b***@example.com", phone: "0172****222", status: "SUSPENDED" },
    ],
    actions: [{ label: "Suspend", to: "SUSPENDED", variant: "danger", from: ["ACTIVE"], needsNote: true, log: "User suspended" }, { label: "Reactivate", to: "ACTIVE", variant: "outline", from: ["SUSPENDED"], log: "User reactivated" }],
  },
  tutors: {
    search: ["name", "university", "department"], statuses: ["UNVERIFIED", "PENDING", "VERIFIED", "REJECTED", "SUSPENDED"], empty: "No tutors match.",
    columns: [{ key: "name", header: "Tutor" }, { key: "university", header: "University" }, { key: "department", header: "Department" }, statusCol],
    rows: TUTORS.map((t) => ({ id: t.id, name: t.name, university: t.university, department: t.department, status: t.verification })).concat([{ id: "TFT-2005", name: "Demo Tutor Five", university: "Jahangirnagar University", department: "Economics", status: "PENDING" }]),
    actions: [{ label: "Verify", to: "VERIFIED", from: ["PENDING", "UNVERIFIED", "REJECTED"], variant: "primary", log: "Tutor verified" }, { label: "Reject", to: "REJECTED", from: ["PENDING"], variant: "outline", needsNote: true, log: "Tutor verification rejected" }, { label: "Suspend", to: "SUSPENDED", from: ["VERIFIED", "PENDING"], variant: "danger", needsNote: true, log: "Tutor suspended" }],
  },
  guardians: {
    search: ["name", "district"], statuses: ["ACTIVE", "SUSPENDED"], empty: "No guardians match.",
    columns: [{ key: "name", header: "Guardian" }, { key: "district", header: "District" }, { key: "posts", header: "Posts" }, statusCol],
    rows: [{ id: "g1", name: "Demo Guardian", district: "Dhaka", posts: 3, status: "ACTIVE" }, { id: "g2", name: "Demo Guardian B", district: "Chattogram", posts: 1, status: "SUSPENDED" }],
    actions: [{ label: "Suspend", to: "SUSPENDED", variant: "danger", from: ["ACTIVE"], needsNote: true, log: "Guardian suspended" }, { label: "Reactivate", to: "ACTIVE", variant: "outline", from: ["SUSPENDED"], log: "Guardian reactivated" }],
  },
  tuition: {
    search: ["id", "title", "district"], statuses: ["PENDING", "APPROVED", "REJECTED", "PAUSED", "FILLED", "EXPIRED", "ARCHIVED"], empty: "No tuition matches.",
    columns: [{ key: "id", header: "ID", render: (r) => <Link className="font-semibold text-brand-800 hover:underline" href={`/tuition/${r.id}`}>{r.id}</Link> }, { key: "title", header: "Title" }, { key: "district", header: "District" }, { key: "salary", header: "Salary" }, statusCol],
    rows: [{ id: "TFD-1009", title: "Class 5 English and Math", district: "Dhaka", salary: "৳4,000–5,000", status: "PENDING" }, { id: "TFD-1010", title: "SSC Physics crash course", district: "Gazipur", salary: "৳6,000–8,000", status: "PENDING" }, ...TUITIONS.slice(0, 5).map((t) => ({ id: t.id, title: t.title, district: t.district, salary: `${formatBDT(t.salaryMin)}–${formatBDT(t.salaryMax)}`, status: t.status }))],
    actions: [{ label: "Approve", to: "APPROVED", from: ["PENDING", "REJECTED"], variant: "primary", log: "Tuition approved" }, { label: "Reject", to: "REJECTED", from: ["PENDING"], variant: "outline", needsNote: true, log: "Tuition rejected" }, { label: "Suspend", to: "PAUSED", from: ["APPROVED"], variant: "danger", needsNote: true, log: "Tuition suspended" }, { label: "Archive", to: "ARCHIVED", from: ["APPROVED", "REJECTED", "PAUSED"], variant: "ghost", log: "Tuition archived" }],
  },
  applications: {
    search: ["tuition", "tutor"], statuses: ["PENDING", "SHORTLISTED", "ACCEPTED", "REJECTED", "WITHDRAWN", "COMPLETED"], empty: "No applications match.",
    columns: [{ key: "id", header: "ID" }, { key: "tuition", header: "Tuition" }, { key: "tutor", header: "Tutor" }, { key: "salary", header: "Expected" }, { key: "applied", header: "Applied" }, statusCol],
    rows: APPLICATIONS.map((a) => ({ id: a.id, tuition: a.tuition, tutor: a.tutor, salary: formatBDT(a.salary), applied: timeAgo(a.appliedAt), status: a.status })),
  },
  payments: {
    search: ["id", "tuition", "trx", "guardian"], statuses: ["PENDING", "VERIFIED", "REJECTED", "NEEDS_CORRECTION"], empty: "No payments match.",
    columns: [{ key: "id", header: "ID" }, { key: "guardian", header: "Guardian" }, { key: "tutor", header: "Tutor" }, { key: "amount", header: "Amount" }, { key: "method", header: "Method" }, { key: "trx", header: "Transaction ID", render: (r) => <span className="font-mono text-xs">{r.trx}</span> }, statusCol],
    rows: PAYMENTS.map((p) => ({ id: p.id, guardian: p.guardian, tutor: p.tutor, tuition: p.tuition, amount: formatBDT(p.amount), method: p.method, trx: p.trx, status: p.status })),
    actions: [{ label: "Verify", to: "VERIFIED", from: ["PENDING", "NEEDS_CORRECTION"], variant: "primary", needsNote: true, log: "Payment verified" }, { label: "Request correction", to: "NEEDS_CORRECTION", from: ["PENDING"], variant: "outline", needsNote: true, log: "Payment correction requested" }, { label: "Reject", to: "REJECTED", from: ["PENDING", "NEEDS_CORRECTION"], variant: "danger", needsNote: true, log: "Payment rejected" }],
  },
  reviews: {
    search: ["by", "for", "comment"], statuses: ["VISIBLE", "HIDDEN", "REMOVED"], empty: "No reviews match.",
    columns: [{ key: "by", header: "By" }, { key: "for", header: "For" }, { key: "rating", header: "Rating", render: (r) => `${r.rating} / 5` }, { key: "comment", header: "Comment", className: "max-w-xs truncate" }, { key: "status", header: "Status", render: (r) => <Badge tone={r.status === "VISIBLE" ? "success" : "neutral"}>{r.status}</Badge> }],
    rows: [{ id: "rv1", by: "Demo Guardian", for: "Demo Tutor One", rating: 5, comment: "Punctual and explains clearly. (Sample)", status: "VISIBLE" }, { id: "rv2", by: "Demo Guardian B", for: "Demo Tutor Three", rating: 1, comment: "Contains abusive language. (Sample)", status: "VISIBLE" }],
    actions: [{ label: "Hide", to: "HIDDEN", from: ["VISIBLE"], variant: "outline", log: "Review hidden" }, { label: "Show", to: "VISIBLE", from: ["HIDDEN"], variant: "outline", log: "Review restored" }, { label: "Remove", to: "REMOVED", from: ["VISIBLE", "HIDDEN"], variant: "danger", needsNote: true, log: "Review removed" }],
  },
  complaints: {
    search: ["type", "against", "tuition"], statuses: ["OPEN", "UNDER_REVIEW", "RESOLVED", "REJECTED", "CLOSED"], empty: "No complaints match.",
    columns: [{ key: "id", header: "ID" }, { key: "type", header: "Type" }, { key: "against", header: "Against" }, { key: "tuition", header: "Tuition" }, { key: "priority", header: "Priority", render: (r) => <Badge tone={r.priority === "HIGH" ? "danger" : "neutral"}>{r.priority}</Badge> }, statusCol],
    rows: [{ id: "C-101", type: "No-show", against: "Demo Tutor Three", tuition: "TFD-1004", priority: "HIGH", status: "OPEN" }, { id: "C-102", type: "Late payment", against: "Demo Guardian B", tuition: "TFD-1006", priority: "LOW", status: "UNDER_REVIEW" }],
    actions: [{ label: "Start review", to: "UNDER_REVIEW", from: ["OPEN"], variant: "outline", log: "Complaint under review" }, { label: "Resolve", to: "RESOLVED", from: ["OPEN", "UNDER_REVIEW"], variant: "primary", needsNote: true, log: "Complaint resolved" }, { label: "Reject", to: "REJECTED", from: ["OPEN", "UNDER_REVIEW"], variant: "ghost", needsNote: true, log: "Complaint rejected" }],
  },
  "admin-users": {
    search: ["name", "role"], statuses: ["ACTIVE", "SUSPENDED"], empty: "No admins.",
    columns: [{ key: "name", header: "Name" }, { key: "role", header: "Role", render: (r) => <Badge tone="brand">{r.role}</Badge> }, { key: "perms", header: "Permissions" }, statusCol],
    rows: [{ id: "a1", name: "Demo Admin", role: "SUPER_ADMIN", perms: "All", status: "ACTIVE" }, { id: "a2", name: "Demo Moderator", role: "MODERATOR", perms: "Tuition, Reviews, Complaints", status: "ACTIVE" }, { id: "a3", name: "Demo Support", role: "SUPPORT", perms: "Complaints", status: "ACTIVE" }],
    actions: [{ label: "Suspend", to: "SUSPENDED", from: ["ACTIVE"], variant: "danger", needsNote: true, log: "Admin suspended" }, { label: "Reactivate", to: "ACTIVE", from: ["SUSPENDED"], variant: "outline", log: "Admin reactivated" }],
  },
};

export function AdminResource({ resource, toolbar }: { resource: keyof typeof CONFIGS | string; toolbar?: ReactNode }) {
  const cfg = CONFIGS[resource];
  const toast = useToast();
  const [rows, setRows] = useState<Row[]>(cfg.rows);
  const [filter, setFilter] = useState("");
  const [active, setActive] = useState<{ row: Row; action: Action } | null>(null);
  const [note, setNote] = useState("");
  const shown = useMemo(() => (filter ? rows.filter((r) => r.status === filter) : rows), [rows, filter]);

  function apply() {
    if (!active) return;
    if (active.action.needsNote && !note.trim()) return;
    setRows((p) => p.map((r) => (r.id === active.row.id ? { ...r, status: active.action.to } : r)));
    toast(`${active.action.log}. Recorded in the activity log.`);
    setActive(null); setNote("");
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-3">
        {cfg.statuses && (
          <select aria-label="Filter by status" className="input-base w-auto" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All statuses</option>{cfg.statuses.map((s) => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
          </select>
        )}
        {toolbar}
      </div>
      <DataTable rows={shown} columns={cfg.columns} searchKeys={cfg.search as string[]} emptyTitle={cfg.empty}
        actions={cfg.actions ? (r) => cfg.actions!.filter((a) => !a.from || a.from.includes(r.status)).map((a) => (
          <Button key={a.label} size="sm" variant={a.variant ?? "outline"} onClick={() => { setActive({ row: r, action: a }); setNote(""); }}>{a.label}</Button>
        )) : undefined} />
      <Modal open={!!active} onClose={() => setActive(null)} title={active ? `${active.action.label}: ${active.row.id}` : ""}>
        <p className="text-sm text-slate-600">This action is written to the activity log with your admin name and timestamp.</p>
        {active?.action.needsNote && (
          <div className="mt-4"><Field label="Admin note" required error={note.trim() ? undefined : "A note is required for this action"}><textarea rows={3} className="input-base" value={note} onChange={(e) => setNote(e.target.value)} /></Field></div>
        )}
        <div className="mt-6 flex justify-end gap-3"><Button variant="outline" onClick={() => setActive(null)}>Cancel</Button><Button variant={active?.action.variant === "danger" ? "danger" : "primary"} onClick={apply} disabled={!!active?.action.needsNote && !note.trim()}>{active?.action.label}</Button></div>
      </Modal>
    </div>
  );
}
