"use client";
import { Button } from "@/components/ui/button";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="font-display text-7xl font-bold text-brand-700">500</p>
        <h1 className="mt-3 text-2xl font-bold">Something went wrong on our side</h1>
        <p className="mt-2 text-slate-600">Try again. If it keeps happening, contact support.</p>
        <Button onClick={reset} className="mt-6">Try again</Button>
      </div>
    </main>
  );
}
