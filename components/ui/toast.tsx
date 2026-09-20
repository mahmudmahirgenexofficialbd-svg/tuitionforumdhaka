"use client";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { CheckCircle2, Info, XCircle } from "lucide-react";

type Kind = "success" | "error" | "info";
interface ToastItem { id: number; kind: Kind; message: string }
const ToastContext = createContext<(message: string, kind?: Kind) => void>(() => {});

export function useToast() { return useContext(ToastContext); }

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const push = useCallback((message: string, kind: Kind = "success") => {
    const id = Date.now() + Math.random();
    setItems((prev) => [...prev, { id, kind, message }]);
    setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);
  const Icon = { success: CheckCircle2, error: XCircle, info: Info };
  const color = { success: "text-emerald-600", error: "text-red-600", info: "text-brand-600" };
  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-20 z-[60] flex flex-col items-center gap-2 px-4 sm:bottom-6 sm:items-end sm:pr-6" aria-live="polite">
        {items.map((t) => {
          const I = Icon[t.kind];
          return (
            <div key={t.id} role="status" className="pointer-events-auto flex max-w-sm items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-lift">
              <I className={`mt-0.5 h-5 w-5 shrink-0 ${color[t.kind]}`} aria-hidden="true" />
              <p>{t.message}</p>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
