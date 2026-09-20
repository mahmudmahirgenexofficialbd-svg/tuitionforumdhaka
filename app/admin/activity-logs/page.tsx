import { PageHeader } from "@/components/ui/misc";
import { formatDate } from "@/lib/utils";

const LOGS = [
  { id: "l1", admin: "Demo Admin", action: "Tuition approved", target: "TFD-1002", at: new Date(Date.now() - 3_600_000).toISOString() },
  { id: "l2", admin: "Demo Moderator", action: "Review hidden", target: "rv2", at: new Date(Date.now() - 86_400_000).toISOString() },
  { id: "l3", admin: "Demo Admin", action: "Payment verified", target: "PAY-502", at: new Date(Date.now() - 3 * 86_400_000).toISOString() },
  { id: "l4", admin: "Demo Admin", action: "Payment settings changed", target: "bKash number", at: new Date(Date.now() - 5 * 86_400_000).toISOString() },
];

export const metadata = { title: "Activity logs" };
export default function Page() {
  return (
    <>
      <PageHeader title="Activity logs" description="Every important admin action is recorded with who did it, what changed and when." />
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600"><tr><th scope="col" className="px-4 py-3">Admin</th><th scope="col" className="px-4 py-3">Action</th><th scope="col" className="px-4 py-3">Target</th><th scope="col" className="px-4 py-3">Date</th></tr></thead>
          <tbody className="divide-y divide-slate-100">{LOGS.map((l) => <tr key={l.id}><td className="px-4 py-3">{l.admin}</td><td className="px-4 py-3 font-medium">{l.action}</td><td className="px-4 py-3">{l.target}</td><td className="px-4 py-3">{formatDate(l.at)}</td></tr>)}</tbody>
        </table>
      </div>
    </>
  );
}
