"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { paymentSchema } from "@/lib/schemas";
import { PAYMENT_SETTINGS } from "@/lib/settings";
import { submitStub } from "@/lib/api-stub";
import { Field } from "@/components/ui/misc";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

type In = z.input<typeof paymentSchema>; type Out = z.output<typeof paymentSchema>;

export function PaymentSubmit() {
  const toast = useToast();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<In, unknown, Out>({ resolver: zodResolver(paymentSchema), defaultValues: { method: "bKash" } });
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card p-6">
        <h2 className="text-lg font-bold">Official payment instructions</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div><dt className="text-slate-500">bKash number</dt><dd className="font-mono text-base font-semibold">{PAYMENT_SETTINGS.bkashNumber}</dd></div>
          <div><dt className="text-slate-500">Nagad number</dt><dd className="font-mono text-base font-semibold">{PAYMENT_SETTINGS.nagadNumber}</dd></div>
          <div><dt className="text-slate-500">Account type</dt><dd className="font-semibold">{PAYMENT_SETTINGS.accountType}</dd></div>
          <div><dt className="text-slate-500">How to pay</dt><dd>{PAYMENT_SETTINGS.instructions}</dd></div>
        </dl>
        <p className="mt-4 rounded-xl bg-marigold-50 p-3 text-xs text-marigold-700">Placeholder numbers. The real numbers are set by an admin in Payment settings and loaded from the database.</p>
      </div>
      <form noValidate className="card space-y-4 p-6" onSubmit={handleSubmit(async (v) => { await submitStub("/api/payments", v); toast("Payment submitted. It stays pending until an admin verifies it."); reset(); })}>
        <h2 className="text-lg font-bold">Submit your payment</h2>
        <Field label="Payment method" required error={errors.method?.message}><select className="input-base" {...register("method")}><option>bKash</option><option>Nagad</option></select></Field>
        <Field label="Transaction ID" required error={errors.trx?.message}><input className="input-base font-mono" {...register("trx")} /></Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Amount sent (৳)" required error={errors.amount?.message}><input type="number" inputMode="numeric" className="input-base" {...register("amount")} /></Field>
          <Field label="Payment date" required error={errors.date?.message}><input type="date" className="input-base" {...register("date")} /></Field>
        </div>
        <Field label="Screenshot (optional)" hint="Upload is enabled once file storage is connected."><input type="file" accept="image/*" disabled className="input-base" /></Field>
        <Button type="submit" loading={isSubmitting} className="w-full">Submit payment for verification</Button>
        <p className="text-xs text-slate-500">Submitting does not confirm payment. An admin checks it against the platform account first.</p>
      </form>
    </div>
  );
}
