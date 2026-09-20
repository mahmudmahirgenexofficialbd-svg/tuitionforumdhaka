"use client";
import { useForm } from "react-hook-form";
import { Field } from "@/components/ui/misc";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { submitStub } from "@/lib/api-stub";

type Fields = { name: string; email: string; phone: string; extra1: string; extra2: string; bio?: string };

export function ProfileForm({ role }: { role: "tutor" | "guardian" }) {
  const toast = useToast();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Fields>({
    defaultValues: { name: role === "tutor" ? "Demo Tutor One" : "Demo Guardian", email: "demo@example.com", phone: "01700000000", extra1: role === "tutor" ? "Dhaka University" : "Dhaka", extra2: role === "tutor" ? "Physics" : "Mirpur" },
  });
  const l = role === "tutor" ? ["University", "Department"] : ["District", "Area"];
  return (
    <form noValidate className="card grid gap-4 p-6 sm:grid-cols-2" onSubmit={handleSubmit(async (v) => { await submitStub(`/api/${role}/profile`, v); toast("Profile saved"); })}>
      <Field label="Full name" required error={errors.name?.message}><input className="input-base" {...register("name", { required: "Enter your name" })} /></Field>
      <Field label="Email" required error={errors.email?.message}><input type="email" className="input-base" {...register("email", { required: "Enter your email" })} /></Field>
      <Field label="Mobile number" required error={errors.phone?.message} hint="Private. Never shown publicly."><input className="input-base" {...register("phone", { required: "Mobile number is required", pattern: { value: /^(?:\+?88)?01[3-9]\d{8}$/, message: "Enter a valid Bangladesh mobile number" } })} /></Field>
      <Field label={l[0]}><input className="input-base" {...register("extra1")} /></Field>
      <Field label={l[1]}><input className="input-base" {...register("extra2")} /></Field>
      {role === "tutor" && <div className="sm:col-span-2"><Field label="Bio"><textarea rows={4} className="input-base" {...register("bio")} /></Field></div>}
      <div className="sm:col-span-2"><Button type="submit" loading={isSubmitting}>Save changes</Button></div>
    </form>
  );
}
