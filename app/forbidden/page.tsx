import { Button } from "@/components/ui/button";
export const metadata = { title: "Access denied" };
export default function Forbidden() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="font-display text-7xl font-bold text-brand-700">403</p>
        <h1 className="mt-3 text-2xl font-bold">You don't have access to this page</h1>
        <p className="mt-2 text-slate-600">Log in with the right account, or go back to the homepage.</p>
        <Button href="/" className="mt-6">Go to homepage</Button>
      </div>
    </main>
  );
}
