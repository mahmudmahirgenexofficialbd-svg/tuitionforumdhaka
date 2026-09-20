"use client";
import { useState } from "react";
import Link from "next/link";
import { FileText } from "lucide-react";
import { APPLICATIONS } from "@/lib/mock-data";
import { formatBDT, timeAgo } from "@/lib/utils";
import { DataTable } from "./data-table";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/modal";
import { useToast } from "@/components/ui/toast";
import { EmptyState } from "@/components/ui/misc";

type Row = { id: string; tuitionId: string; tuition: string; tutor: string; status: string; appliedAt: string; salary: number };
type Pending = { row: Row; action: "withdraw" | "SHORTLISTED" | "ACCEPTED" | "REJECTED" } | null;

export function ApplicationsTable({ role }: { role: "tutor" | "guardian" }) {
  const toast = useToast();
  const [rows, setRows] = useState<Row[]>(APPLICATIONS.map((a) => ({ ...a })));
  const [pending, setPending] = useState<Pending>(null);
  const setStatus = (id: string, status: string) => setRows((p) => p.map((r) => (r.id === id ? { ...r, status } : r)));
  const hasSelected = (tuitionId: string) => rows.some((r) => r.tuitionId === tuitionId && r.status === "ACCEPTED");

  if (!rows.length) return <EmptyState title="No applications yet" message="Your applications will appear here once you apply for a tuition." actionLabel="Find tuition" href="/find-tuition" icon={<FileText className="h-6 w-6" />} />;

  const copy = pending?.action === "withdraw" ? { t: "Withdraw application?", m: "The guardian will no longer see this application.", l: "Withdraw" }
    : pending?.action === "ACCEPTED" ? { t: "Select this tutor?", m: "Other applicants for this tuition will be closed and you'll be asked to confirm payment.", l: "Select tutor" }
    : pending?.action === "REJECTED" ? { t: "Reject this applicant?", m: "The tutor will be notified.", l: "Reject" } : { t: "Shortlist this applicant?", m: "You can select one tutor after shortlisting.", l: "Shortlist" };

  function confirm() {
    if (!pending) return;
    const { row, action } = pending;
    if (action === "withdraw") { setStatus(row.id, "WITHDRAWN"); toast("Application withdrawn"); }
    else {
      setStatus(row.id, action);
      if (action === "ACCEPTED") setRows((p) => p.map((r) => (r.tuitionId === row.tuitionId && r.id !== row.id && r.status !== "ACCEPTED" ? { ...r, status: "REJECTED" } : r)));
      toast(action === "ACCEPTED" ? "Tutor selected. Next: confirm payment." : action === "SHORTLISTED" ? "Applicant shortlisted" : "Applicant rejected");
    }
  }

  return (
    <>
      <DataTable rows={rows} searchKeys={["tuition", "tutor"]}
        columns={[
          { key: "tuition", header: "Tuition", render: (r) => <Link href={`/tuition/${r.tuitionId}`} className="font-semibold text-brand-800 hover:underline">{r.tuition}</Link> },
          ...(role === "guardian" ? [{ key: "tutor", header: "Tutor", render: (r: Row) => <span>{r.tutor}</span> }] : []),
          { key: "salary", header: "Expected salary", render: (r) => formatBDT(r.salary) },
          { key: "appliedAt", header: "Applied", render: (r) => timeAgo(r.appliedAt) },
          { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
        ]}
        actions={(r) => {
          if (role === "tutor") return ["PENDING", "SHORTLISTED"].includes(r.status) ? <Button size="sm" variant="outline" onClick={() => setPending({ row: r, action: "withdraw" })}>Withdraw</Button> : null;
          if (r.status === "PENDING") return (<><Button size="sm" variant="outline" onClick={() => setPending({ row: r, action: "SHORTLISTED" })}>Shortlist</Button><Button size="sm" variant="ghost" onClick={() => setPending({ row: r, action: "REJECTED" })}>Reject</Button></>);
          if (r.status === "SHORTLISTED") return (<><Button size="sm" disabled={hasSelected(r.tuitionId)} onClick={() => setPending({ row: r, action: "ACCEPTED" })}>Select tutor</Button><Button size="sm" variant="ghost" onClick={() => setPending({ row: r, action: "REJECTED" })}>Reject</Button></>);
          if (r.status === "ACCEPTED") return <Button size="sm" variant="accent" href="/dashboard/guardian/payments">Confirm payment</Button>;
          return null;
        }} />
      <ConfirmDialog open={!!pending} onClose={() => setPending(null)} onConfirm={confirm} title={copy.t} message={copy.m} confirmLabel={copy.l} danger={pending?.action === "REJECTED" || pending?.action === "withdraw"} />
    </>
  );
}
