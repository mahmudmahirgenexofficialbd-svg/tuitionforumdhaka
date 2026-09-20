"use client";
import { useState } from "react";
import { Bell } from "lucide-react";
import { NOTIFICATIONS } from "@/lib/mock-data";
import { timeAgo, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/misc";

export function NotificationList() {
  const [items, setItems] = useState(NOTIFICATIONS.map((n) => ({ ...n })));
  const unread = items.filter((i) => !i.read).length;
  if (!items.length) return <EmptyState title="No notifications yet" message="Updates about your tuition, applications and payments will appear here." icon={<Bell className="h-6 w-6" />} />;
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm text-slate-600">{unread} unread</p>
        <Button size="sm" variant="outline" disabled={!unread} onClick={() => setItems((p) => p.map((n) => ({ ...n, read: true })))}>Mark all as read</Button>
      </div>
      <ul className="card divide-y divide-slate-100">
        {items.map((n) => (
          <li key={n.id}>
            <button className={cn("flex w-full items-start gap-3 p-4 text-left hover:bg-slate-50", !n.read && "bg-brand-50/50")} onClick={() => setItems((p) => p.map((x) => (x.id === n.id ? { ...x, read: true } : x)))}>
              <span className={cn("mt-2 h-2 w-2 shrink-0 rounded-full", n.read ? "bg-transparent" : "bg-marigold-500")} aria-hidden="true" />
              <span className="min-w-0"><span className="block font-semibold">{n.title}{!n.read && <span className="sr-only"> (unread)</span>}</span><span className="block text-sm text-slate-600">{n.body}</span><span className="text-xs text-slate-500">{timeAgo(n.at)}</span></span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
