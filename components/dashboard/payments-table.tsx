import { PAYMENTS } from "@/lib/mock-data";
import { formatBDT, timeAgo } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/misc";
import { Wallet } from "lucide-react";

export function PaymentsTable({ role }: { role: "tutor" | "guardian" }) {
  const rows = PAYMENTS;
  if (!rows.length) return <EmptyState title="No payment records yet" message="Records appear here after a tutor is selected and payment is submitted." icon={<Wallet className="h-6 w-6" />} />;
  return (
    <div className="card overflow-x-auto">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600"><tr>
          <th scope="col" className="px-4 py-3">Tuition</th><th scope="col" className="px-4 py-3">Amount</th><th scope="col" className="px-4 py-3">Method</th>
          {role === "guardian" && <th scope="col" className="px-4 py-3">Transaction ID</th>}<th scope="col" className="px-4 py-3">Date</th><th scope="col" className="px-4 py-3">Status</th></tr></thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((p) => (
            <tr key={p.id}><td className="px-4 py-3 font-medium">{p.tuition}</td><td className="px-4 py-3">{formatBDT(p.amount)}</td><td className="px-4 py-3">{p.method}</td>
              {role === "guardian" && <td className="px-4 py-3 font-mono text-xs">{p.trx}</td>}<td className="px-4 py-3">{timeAgo(p.submittedAt)}</td><td className="px-4 py-3"><StatusBadge status={p.status} /></td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
