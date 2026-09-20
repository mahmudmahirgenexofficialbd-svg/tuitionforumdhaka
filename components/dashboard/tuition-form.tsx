"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { tuitionSchema } from "@/lib/schemas";
import { CLASS_LEVELS, DISTRICTS_BY_DIVISION, DIVISIONS, MEDIUMS } from "@/lib/constants";
import { submitStub } from "@/lib/api-stub";
import { Field } from "@/components/ui/misc";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

type In = z.input<typeof tuitionSchema>; type Out = z.output<typeof tuitionSchema>;

export function TuitionForm() {
  const toast = useToast(); const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<In, unknown, Out>({ resolver: zodResolver(tuitionSchema), defaultValues: { students: 1, daysPerWeek: 3, tutorGender: "Any" } });
  const division = watch("division") as string | undefined;
  const districts = division ? DISTRICTS_BY_DIVISION[division] ?? [] : [];
  const h = "mb-3 mt-2 text-sm font-bold text-brand-800";
  return (
    <form noValidate className="card space-y-4 p-6" onSubmit={handleSubmit(async (v) => { await submitStub("/api/tuition", v); toast("Submitted for review. It goes public once an admin approves it."); router.push("/dashboard/guardian/tuition"); })}>
      <h2 className={h}>Basic information</h2>
      <Field label="Tuition title" required error={errors.title?.message}><input className="input-base" placeholder="e.g. Class 9 Science tutor needed" {...register("title")} /></Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Class" required error={errors.classLevel?.message}><select className="input-base" defaultValue="" {...register("classLevel")}><option value="" disabled>Select</option>{CLASS_LEVELS.map((c) => <option key={c}>{c}</option>)}</select></Field>
        <Field label="Medium" required error={errors.medium?.message}><select className="input-base" defaultValue="" {...register("medium")}><option value="" disabled>Select</option>{MEDIUMS.map((c) => <option key={c}>{c}</option>)}</select></Field>
      </div>
      <Field label="Subjects" required error={errors.subjects?.message} hint="Separate with commas"><input className="input-base" {...register("subjects")} /></Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Student gender" required error={errors.studentGender?.message}><select className="input-base" defaultValue="" {...register("studentGender")}><option value="" disabled>Select</option><option>Male</option><option>Female</option></select></Field>
        <Field label="Number of students" required error={errors.students?.message}><input type="number" min={1} className="input-base" {...register("students")} /></Field>
      </div>
      <h2 className={h}>Location</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Division" required error={errors.division?.message}><select className="input-base" defaultValue="" {...register("division")}><option value="" disabled>Select</option>{DIVISIONS.map((d) => <option key={d}>{d}</option>)}</select></Field>
        <Field label="District" required error={errors.district?.message}><select className="input-base" defaultValue="" {...register("district")}><option value="" disabled>{division ? "Select" : "Choose a division first"}</option>{districts.map((d) => <option key={d}>{d}</option>)}</select></Field>
        <Field label="Upazila / Thana" required error={errors.thana?.message}><input className="input-base" {...register("thana")} /></Field>
        <Field label="Area" required error={errors.area?.message}><input className="input-base" {...register("area")} /></Field>
      </div>
      <p className="text-xs text-slate-500">Only the area is shown publicly. Your exact address and phone stay private.</p>
      <h2 className={h}>Schedule and salary</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Preferred days" required error={errors.days?.message}><input className="input-base" placeholder="Sat, Mon, Wed" {...register("days")} /></Field>
        <Field label="Days per week" required error={errors.daysPerWeek?.message}><input type="number" min={1} max={7} className="input-base" {...register("daysPerWeek")} /></Field>
        <Field label="Preferred time" required error={errors.time?.message}><input className="input-base" placeholder="5:00 PM - 6:30 PM" {...register("time")} /></Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Minimum salary (৳)" required error={errors.salaryMin?.message}><input type="number" inputMode="numeric" className="input-base" {...register("salaryMin")} /></Field>
        <Field label="Maximum salary (৳)" required error={errors.salaryMax?.message}><input type="number" inputMode="numeric" className="input-base" {...register("salaryMax")} /></Field>
        <Field label="Tutor gender" required><select className="input-base" {...register("tutorGender")}><option>Any</option><option>Male</option><option>Female</option></select></Field>
      </div>
      <Field label="Description" required error={errors.description?.message}><textarea rows={4} className="input-base" {...register("description")} /></Field>
      <div className="flex flex-wrap gap-3"><Button type="submit" loading={isSubmitting}>Submit for approval</Button><Button href="/dashboard/guardian/tuition" variant="outline">Cancel</Button></div>
    </form>
  );
}
