import { z } from "zod";

// Bangladesh mobile: 01XXXXXXXXX or +8801XXXXXXXXX (operators 3-9)
export const bdPhone = z.string().trim().regex(/^(?:\+?88)?01[3-9]\d{8}$/, "Enter a valid Bangladesh mobile number, e.g. 01712345678");
const password = z.string().min(8, "Use at least 8 characters").regex(/[A-Za-z]/, "Include a letter").regex(/\d/, "Include a number");

export const loginSchema = z.object({ email: z.string().email("Enter a valid email"), password: z.string().min(1, "Enter your password") });

const base = {
  fullName: z.string().trim().min(3, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: bdPhone,
  password,
  confirm: z.string(),
};
const match = (d: { password: string; confirm: string }) => d.password === d.confirm;
const matchMsg = { message: "Passwords do not match", path: ["confirm"] };

export const guardianSchema = z.object({ ...base, district: z.string().optional(), area: z.string().optional() }).refine(match, matchMsg);
export const tutorSchema = z.object({
  ...base,
  gender: z.enum(["Male", "Female"], { errorMap: () => ({ message: "Select your gender" }) }),
  university: z.string().min(2, "Enter your university"),
  department: z.string().min(2, "Enter your department"),
  year: z.string().min(1, "Enter your year or semester"),
  subjects: z.string().min(2, "List the subjects you teach"),
  classes: z.string().min(2, "List the classes you teach"),
  experience: z.string().min(1, "Describe your teaching experience"),
  locations: z.string().min(2, "Enter preferred locations"),
  salary: z.coerce.number().min(500, "Enter your expected monthly salary in BDT"),
  days: z.string().min(2, "Enter your available days"),
  bio: z.string().min(30, "Write at least 30 characters about yourself"),
}).refine(match, matchMsg);

export const forgotSchema = z.object({ email: z.string().email("Enter a valid email") });

export const tuitionSchema = z.object({
  title: z.string().min(8, "Give the tuition a short, clear title"),
  classLevel: z.string().min(1, "Select a class"),
  subjects: z.string().min(2, "Enter at least one subject"),
  studentGender: z.string().min(1, "Select student gender"),
  students: z.coerce.number().min(1).max(10),
  medium: z.string().min(1, "Select a medium"),
  division: z.string().min(1, "Select a division"),
  district: z.string().min(1, "Select a district"),
  thana: z.string().min(1, "Enter thana / upazila"),
  area: z.string().min(2, "Enter the area"),
  days: z.string().min(2, "Enter preferred days"),
  daysPerWeek: z.coerce.number().min(1).max(7),
  time: z.string().min(2, "Enter preferred time"),
  salaryMin: z.coerce.number().min(500, "Enter minimum salary"),
  salaryMax: z.coerce.number().min(500, "Enter maximum salary"),
  tutorGender: z.string().min(1),
  description: z.string().min(20, "Add a short description (20+ characters)"),
}).refine((d) => d.salaryMax >= d.salaryMin, { message: "Maximum must be at least the minimum", path: ["salaryMax"] });

export const applySchema = z.object({
  intro: z.string().min(20, "Write a short introduction (20+ characters)"),
  experience: z.string().min(5, "Describe relevant experience"),
  salary: z.coerce.number().min(500, "Enter your expected salary in BDT"),
  availability: z.string().min(3, "Tell the guardian when you are available"),
  message: z.string().optional(),
});

export const paymentSchema = z.object({
  method: z.enum(["bKash", "Nagad"]),
  trx: z.string().trim().min(6, "Enter the transaction ID from your bKash/Nagad receipt").max(20, "Transaction ID looks too long"),
  amount: z.coerce.number().min(1, "Enter the amount you sent"),
  date: z.string().min(1, "Select the payment date"),
});
