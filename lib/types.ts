export type TuitionStatus =
  | "DRAFT" | "PENDING" | "APPROVED" | "REJECTED" | "PAUSED" | "FILLED" | "EXPIRED" | "CANCELLED" | "ARCHIVED";
export type VerificationStatus = "UNVERIFIED" | "PENDING" | "VERIFIED" | "REJECTED" | "SUSPENDED";
export type ApplicationStatus = "PENDING" | "SHORTLISTED" | "ACCEPTED" | "REJECTED" | "WITHDRAWN" | "COMPLETED";
export type PaymentStatus = "PENDING" | "VERIFIED" | "REJECTED" | "NEEDS_CORRECTION";
export type Gender = "Male" | "Female" | "Any";

export interface Tuition {
  id: string;
  title: string;
  classLevel: string;
  subjects: string[];
  studentGender: Gender;
  students: number;
  medium: string;
  division: string;
  district: string;
  thana: string;
  area: string;
  days: string[];
  daysPerWeek: number;
  time: string;
  flexible: boolean;
  salaryMin: number;
  salaryMax: number;
  tutorGender: Gender;
  requirements: string;
  description: string;
  postedAt: string;
  deadline: string;
  applicants: number;
  status: TuitionStatus;
}

export interface Tutor {
  id: string;
  name: string;
  gender: "Male" | "Female";
  university: string;
  department: string;
  year: string;
  subjects: string[];
  classes: string[];
  districts: string[];
  areas: string[];
  expectedSalary: number;
  rating: number;
  reviewCount: number;
  verification: VerificationStatus;
  experienceYears: number;
  bio: string;
  availableDays: string[];
  joinedAt: string;
}
