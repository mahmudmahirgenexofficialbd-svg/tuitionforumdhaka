"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { forgotSchema, guardianSchema, loginSchema, tutorSchema } from "@/lib/schemas";
import { submitStub } from "@/lib/api-stub";
import { Field } from "@/components/ui/misc";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { DISTRICTS_BY_DIVISION } from "@/lib/constants";

const districts = Object.values(DISTRICTS_BY_DIVISION).flat().sort();

export function LoginForm() {
  const toast = useToast();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema) });
  return (
    <form noValidate className="space-y-4" onSubmit={handleSubmit(async (v) => { await submitStub("/api/auth/login", v); toast("Real login is added in the authentication phase. Use the demo links below to explore.", "info"); })}>
      <Field label="Email" required error={errors.email?.message}><input type="email" autoComplete="email" className="input-base" {...register("email")} /></Field>
      <Field label="Password" required error={errors.password?.message}><input type="password" autoComplete="current-password" className="input-base" {...register("password")} /></Field>
      <div className="text-right"><Link href="/forgot-password" className="text-sm font-semibold text-brand-700 hover:underline">Forgot password?</Link></div>
      <Button type="submit" loading={isSubmitting} className="w-full">Log in</Button>
    </form>
  );
}

export function ForgotForm() {
  const toast = useToast();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof forgotSchema>>({ resolver: zodResolver(forgotSchema) });
  return (
    <form noValidate className="space-y-4" onSubmit={handleSubmit(async (v) => { await submitStub("/api/auth/forgot", v); toast("If that email is registered, a reset link is on its way."); })}>
      <Field label="Email" required error={errors.email?.message}><input type="email" className="input-base" {...register("email")} /></Field>
      <Button type="submit" loading={isSubmitting} className="w-full">Send reset link</Button>
    </form>
  );
}

type GInput = z.input<typeof guardianSchema>; type GOut = z.output<typeof guardianSchema>;
export function GuardianRegisterForm() {
  const toast = useToast(); const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<GInput, unknown, GOut>({ resolver: zodResolver(guardianSchema) });
  return (
    <form noValidate className="space-y-4" onSubmit={handleSubmit(async (v) => { await submitStub("/api/auth/register/guardian", v); toast("Account created (demo). Check your email to verify."); router.push("/verify-email"); })}>
      <Field label="Full name" required error={errors.fullName?.message}><input autoComplete="name" className="input-base" {...register("fullName")} /></Field>
      <Field label="Email" required error={errors.email?.message}><input type="email" autoComplete="email" className="input-base" {...register("email")} /></Field>
      <Field label="Mobile number" required error={errors.phone?.message} hint="Kept private. Example: 01712345678"><input type="tel" inputMode="tel" autoComplete="tel" className="input-base" {...register("phone")} /></Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Password" required error={errors.password?.message} hint="8+ characters with a letter and a number"><input type="password" autoComplete="new-password" className="input-base" {...register("password")} /></Field>
        <Field label="Confirm password" required error={errors.confirm?.message}><input type="password" autoComplete="new-password" className="input-base" {...register("confirm")} /></Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="District"><select className="input-base" {...register("district")}><option value="">Select (optional)</option>{districts.map((d) => <option key={d}>{d}</option>)}</select></Field>
        <Field label="Area"><input className="input-base" {...register("area")} /></Field>
      </div>
      <Button type="submit" loading={isSubmitting} className="w-full">Create guardian account</Button>
    </form>
  );
}

type TInput = z.input<typeof tutorSchema>; type TOut = z.output<typeof tutorSchema>;
export function TutorRegisterForm() {
  const toast = useToast(); const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TInput, unknown, TOut>({ resolver: zodResolver(tutorSchema) });
  const sec = "mb-3 mt-2 text-sm font-bold text-brand-800";
  return (
    <form noValidate className="space-y-4" onSubmit={handleSubmit(async (v) => { await submitStub("/api/auth/register/tutor", v); toast("Tutor account created (demo). Verification starts after you upload documents."); router.push("/verify-email"); })}>
      <h2 className={sec}>Account</h2>
      <Field label="Full name" required error={errors.fullName?.message}><input autoComplete="name" className="input-base" {...register("fullName")} /></Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email" required error={errors.email?.message}><input type="email" autoComplete="email" className="input-base" {...register("email")} /></Field>
        <Field label="Mobile number" required error={errors.phone?.message} hint="Example: 01712345678"><input type="tel" inputMode="tel" className="input-base" {...register("phone")} /></Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Password" required error={errors.password?.message}><input type="password" autoComplete="new-password" className="input-base" {...register("password")} /></Field>
        <Field label="Confirm password" required error={errors.confirm?.message}><input type="password" autoComplete="new-password" className="input-base" {...register("confirm")} /></Field>
      </div>
      <Field label="Gender" required error={errors.gender?.message}><select className="input-base" defaultValue="" {...register("gender")}><option value="" disabled>Select</option><option>Male</option><option>Female</option></select></Field>
      <Field label="Profile photo" hint="Upload is enabled once file storage is connected."><input type="file" accept="image/jpeg,image/png,image/webp" disabled className="input-base" /></Field>
      <h2 className={sec}>Education</h2>
      <Field label="University" required error={errors.university?.message}><input className="input-base" {...register("university")} /></Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Department" required error={errors.department?.message}><input className="input-base" {...register("department")} /></Field>
        <Field label="Year / semester" required error={errors.year?.message}><input className="input-base" placeholder="e.g. 3rd year" {...register("year")} /></Field>
      </div>
      <h2 className={sec}>Teaching</h2>
      <Field label="Subjects you teach" required error={errors.subjects?.message} hint="Separate with commas"><input className="input-base" {...register("subjects")} /></Field>
      <Field label="Classes you teach" required error={errors.classes?.message} hint="e.g. Class 6-10, HSC"><input className="input-base" {...register("classes")} /></Field>
      <Field label="Teaching experience" required error={errors.experience?.message}><input className="input-base" placeholder="e.g. 2 years" {...register("experience")} /></Field>
      <Field label="Preferred locations" required error={errors.locations?.message}><input className="input-base" placeholder="e.g. Mirpur, Dhanmondi" {...register("locations")} /></Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Expected salary (৳/month)" required error={errors.salary?.message}><input type="number" inputMode="numeric" className="input-base" {...register("salary")} /></Field>
        <Field label="Available days" required error={errors.days?.message}><input className="input-base" placeholder="e.g. Sat, Mon, Wed" {...register("days")} /></Field>
      </div>
      <Field label="Short bio" required error={errors.bio?.message}><textarea rows={4} className="input-base" {...register("bio")} /></Field>
      <Button type="submit" loading={isSubmitting} className="w-full">Create tutor account</Button>
    </form>
  );
}
