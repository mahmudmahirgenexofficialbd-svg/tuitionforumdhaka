import { Logo } from "@/components/ui/logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1.1fr]">
      <aside className="relative hidden bg-brand-900 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <Logo light />
        <div>
          <p className="font-display text-4xl font-bold leading-tight">Free to join. Verified by people. Built for Bangladesh.</p>
          <p className="mt-4 max-w-md text-brand-100">No registration fee and no application fee. Payments are confirmed by our team, never automatically.</p>
        </div>
        <p className="text-xs text-brand-300">Tuition Forum Dhaka</p>
      </aside>
      <main className="flex flex-col px-5 py-8 sm:px-10">
        <div className="mb-8 lg:hidden"><Logo /></div>
        <div className="mx-auto w-full max-w-lg flex-1 lg:flex lg:flex-col lg:justify-center">{children}</div>
      </main>
    </div>
  );
}
