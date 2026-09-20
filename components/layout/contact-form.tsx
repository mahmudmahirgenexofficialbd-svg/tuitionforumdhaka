"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field } from "@/components/ui/misc";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { submitStub } from "@/lib/api-stub";

const schema = z.object({ name: z.string().min(2, "Enter your name"), email: z.string().email("Enter a valid email"), message: z.string().min(10, "Write at least 10 characters") });
type V = z.infer<typeof schema>;

export function ContactForm() {
  const toast = useToast();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<V>({ resolver: zodResolver(schema) });
  return (
    <form className="card space-y-4 p-6" noValidate onSubmit={handleSubmit(async (v) => { await submitStub("/api/contact", v); toast("Message sent. We will reply by email."); reset(); })}>
      <Field label="Your name" required error={errors.name?.message}><input className="input-base" {...register("name")} /></Field>
      <Field label="Email" required error={errors.email?.message}><input type="email" className="input-base" {...register("email")} /></Field>
      <Field label="Message" required error={errors.message?.message}><textarea rows={5} className="input-base" {...register("message")} /></Field>
      <Button type="submit" loading={isSubmitting}>Send message</Button>
    </form>
  );
}
