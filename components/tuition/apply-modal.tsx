"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { applySchema } from "@/lib/schemas";
import { submitStub } from "@/lib/api-stub";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/misc";
import { useToast } from "@/components/ui/toast";

type Input = z.input<typeof applySchema>;
type Output = z.output<typeof applySchema>;

export function ApplyButton({ tuitionId }: { tuitionId: string }) {
  const [open, setOpen] = useState(false);
  const toast = useToast();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Input, unknown, Output>({ resolver: zodResolver(applySchema) });

  async function onSubmit(values: Output) {
    await submitStub(`/api/tuition/${tuitionId}/apply`, values);
    toast("Application submitted. You can track it under My applications.");
    reset(); setOpen(false);
  }

  return (
    <>
      <Button size="lg" className="w-full" onClick={() => setOpen(true)}>Apply for tuition</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Apply for this tuition">
        <p className="mb-4 text-xs text-slate-500">Applying is free. You must be logged in as a tutor to submit.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Field label="Short introduction" required error={errors.intro?.message}><textarea rows={3} className="input-base" {...register("intro")} /></Field>
          <Field label="Relevant experience" required error={errors.experience?.message}><input className="input-base" {...register("experience")} /></Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Expected salary (৳/month)" required error={errors.salary?.message}><input type="number" inputMode="numeric" className="input-base" {...register("salary")} /></Field>
            <Field label="Availability" required error={errors.availability?.message}><input className="input-base" placeholder="e.g. Sat, Mon, Wed evenings" {...register("availability")} /></Field>
          </div>
          <Field label="Additional message" error={errors.message?.message}><textarea rows={2} className="input-base" {...register("message")} /></Field>
          <Button type="submit" loading={isSubmitting} className="w-full">Submit application</Button>
        </form>
      </Modal>
    </>
  );
}
