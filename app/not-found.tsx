import { Button } from "@/components/ui/button";
export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="font-display text-7xl font-bold text-brand-700">404</p>
        <h1 className="mt-3 text-2xl font-bold">We can't find that page</h1>
        <p className="mt-2 text-slate-600">The link may be old, or the tuition may have been filled or removed.</p>
        <Button href="/find-tuition" className="mt-6">Browse tuition</Button>
      </div>
    </main>
  );
}
