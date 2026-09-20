"use client";
import { useMemo, useState, type ReactNode } from "react";
import { Search } from "lucide-react";
import { EmptyState } from "@/components/ui/misc";
import { cn } from "@/lib/utils";

export interface Column<T> { key: string; header: string; render?: (row: T) => ReactNode; className?: string }

export function DataTable<T extends { id: string }>({ rows, columns, searchKeys, actions, emptyTitle = "Nothing here yet", emptyMessage = "Records will appear here." }:
  { rows: T[]; columns: Column<T>[]; searchKeys?: (keyof T)[]; actions?: (row: T) => ReactNode; emptyTitle?: string; emptyMessage?: string }) {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(0);
  const per = 8;
  const filtered = useMemo(() => {
    const n = q.trim().toLowerCase();
    return n && searchKeys ? rows.filter((r) => searchKeys.some((k) => String(r[k]).toLowerCase().includes(n))) : rows;
  }, [rows, q, searchKeys]);
  const pages = Math.max(1, Math.ceil(filtered.length / per));
  const cur = Math.min(page, pages - 1);
  const visible = filtered.slice(cur * per, cur * per + per);

  return (
    <div>
      {searchKeys && (
        <div className="relative mb-3 max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input aria-label="Search table" className="input-base pl-9" placeholder="Search…" value={q} onChange={(e) => { setQ(e.target.value); setPage(0); }} />
        </div>
      )}
      {filtered.length === 0 ? <EmptyState title={emptyTitle} message={emptyMessage} /> : (
        <>
          <div className="card overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                <tr>{columns.map((c) => <th key={c.key} scope="col" className={cn("px-4 py-3", c.className)}>{c.header}</th>)}{actions && <th scope="col" className="px-4 py-3 text-right">Actions</th>}</tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visible.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    {columns.map((c) => <td key={c.key} className={cn("px-4 py-3 align-middle", c.className)}>{c.render ? c.render(r) : String((r as unknown as Record<string, unknown>)[c.key] ?? "")}</td>)}
                    {actions && <td className="px-4 py-3 text-right"><div className="flex flex-wrap justify-end gap-2">{actions(r)}</div></td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {pages > 1 && (
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-slate-600">Page {cur + 1} of {pages}</span>
              <div className="flex gap-2">
                <button className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-medium disabled:opacity-50" disabled={cur === 0} onClick={() => setPage(cur - 1)}>Previous</button>
                <button className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-medium disabled:opacity-50" disabled={cur >= pages - 1} onClick={() => setPage(cur + 1)}>Next</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
