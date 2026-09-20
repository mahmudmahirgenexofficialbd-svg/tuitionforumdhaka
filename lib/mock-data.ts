// SAMPLE / DEMO DATA ONLY. Every record here is fictional and is replaced by database queries in the backend phase.
import type { Tuition, Tutor } from "./types";

const d = (daysAgo: number) => new Date(Date.now() - daysAgo * 86_400_000).toISOString();
const ahead = (days: number) => new Date(Date.now() + days * 86_400_000).toISOString();

export const TUITIONS: Tuition[] = [
  { id: "TFD-1001", title: "Class 9 Science tutor needed", classLevel: "Class 9", subjects: ["Physics", "Chemistry", "Biology"], studentGender: "Male", students: 1, medium: "Bangla", division: "Dhaka", district: "Dhaka", thana: "Dhanmondi", area: "Road 27", days: ["Sat", "Mon", "Wed"], daysPerWeek: 3, time: "5:00 PM - 6:30 PM", flexible: false, salaryMin: 5000, salaryMax: 6500, tutorGender: "Any", requirements: "Prefers BUET, DU or medical-college students.", description: "Student is regular but needs help with concept clarity in Physics and Chemistry before the half-yearly exam.", postedAt: d(1), deadline: ahead(12), applicants: 6, status: "APPROVED" },
  { id: "TFD-1002", title: "Higher Math for HSC 1st year", classLevel: "HSC 1st Year", subjects: ["Higher Math", "Mathematics"], studentGender: "Female", students: 1, medium: "Bangla", division: "Dhaka", district: "Dhaka", thana: "Mirpur", area: "Section 10", days: ["Sun", "Tue", "Thu"], daysPerWeek: 3, time: "4:00 PM - 5:30 PM", flexible: true, salaryMin: 6000, salaryMax: 8000, tutorGender: "Female", requirements: "Female tutor preferred. Prior HSC teaching experience.", description: "Needs structured weekly plan and regular class tests.", postedAt: d(2), deadline: ahead(10), applicants: 4, status: "APPROVED" },
  { id: "TFD-1003", title: "English Medium Class 6 all subjects", classLevel: "Class 6", subjects: ["All Subjects"], studentGender: "Female", students: 2, medium: "English Medium", division: "Dhaka", district: "Dhaka", thana: "Gulshan", area: "Gulshan 2", days: ["Sat", "Sun", "Mon", "Tue", "Wed"], daysPerWeek: 5, time: "6:00 PM - 8:00 PM", flexible: false, salaryMin: 10000, salaryMax: 14000, tutorGender: "Female", requirements: "Fluent English. Two students (siblings).", description: "Two siblings in the same class. Tutor should be comfortable with Cambridge-style assessment.", postedAt: d(3), deadline: ahead(9), applicants: 9, status: "APPROVED" },
  { id: "TFD-1004", title: "SSC candidate needs Math and English", classLevel: "Class 10", subjects: ["Mathematics", "English"], studentGender: "Male", students: 1, medium: "Bangla", division: "Chattogram", district: "Chattogram", thana: "Panchlaish", area: "2 No Gate", days: ["Sat", "Mon", "Wed", "Thu"], daysPerWeek: 4, time: "7:00 PM - 8:30 PM", flexible: true, salaryMin: 5500, salaryMax: 7000, tutorGender: "Male", requirements: "CUET or CU students preferred.", description: "SSC exam approaching. Focus on model tests and weak chapters.", postedAt: d(2), deadline: ahead(14), applicants: 3, status: "APPROVED" },
  { id: "TFD-1005", title: "Class 3 all subjects at home", classLevel: "Class 3", subjects: ["All Subjects"], studentGender: "Male", students: 1, medium: "English Version", division: "Sylhet", district: "Sylhet", thana: "Kotwali", area: "Zindabazar", days: ["Sun", "Tue", "Thu"], daysPerWeek: 3, time: "4:30 PM - 5:30 PM", flexible: true, salaryMin: 3000, salaryMax: 4000, tutorGender: "Any", requirements: "Patient with young children.", description: "Homework support and reading practice.", postedAt: d(5), deadline: ahead(7), applicants: 2, status: "APPROVED" },
  { id: "TFD-1006", title: "HSC Accounting, 2nd year", classLevel: "HSC 2nd Year", subjects: ["Accounting"], studentGender: "Male", students: 1, medium: "Bangla", division: "Rajshahi", district: "Rajshahi", thana: "Boalia", area: "Shaheb Bazar", days: ["Sat", "Tue"], daysPerWeek: 2, time: "6:00 PM - 7:30 PM", flexible: true, salaryMin: 4000, salaryMax: 5000, tutorGender: "Any", requirements: "Accounting or Finance department student.", description: "Focus on final-exam preparation.", postedAt: d(7), deadline: ahead(5), applicants: 1, status: "APPROVED" },
  { id: "TFD-1007", title: "A Level Physics tutor", classLevel: "A Level", subjects: ["Physics"], studentGender: "Female", students: 1, medium: "English Medium", division: "Dhaka", district: "Dhaka", thana: "Uttara", area: "Sector 7", days: ["Fri", "Sat"], daysPerWeek: 2, time: "10:00 AM - 12:00 PM", flexible: false, salaryMin: 8000, salaryMax: 12000, tutorGender: "Any", requirements: "Prior A Level teaching experience required.", description: "Weekend sessions with past-paper practice.", postedAt: d(4), deadline: ahead(11), applicants: 5, status: "APPROVED" },
  { id: "TFD-1008", title: "Class 8 Math and Science", classLevel: "Class 8", subjects: ["Mathematics", "General Science"], studentGender: "Male", students: 1, medium: "Bangla", division: "Khulna", district: "Khulna", thana: "Sonadanga", area: "Sonadanga R/A", days: ["Sun", "Mon", "Wed"], daysPerWeek: 3, time: "5:30 PM - 7:00 PM", flexible: true, salaryMin: 3500, salaryMax: 4500, tutorGender: "Any", requirements: "None.", description: "Student needs help building foundations.", postedAt: d(9), deadline: ahead(4), applicants: 2, status: "APPROVED" },
];

export const TUTORS: Tutor[] = [
  { id: "TFT-2001", name: "Demo Tutor One", gender: "Male", university: "Dhaka University", department: "Physics", year: "4th Year", subjects: ["Physics", "Mathematics", "Higher Math"], classes: ["Class 9", "Class 10", "HSC 1st Year"], districts: ["Dhaka"], areas: ["Mirpur", "Dhanmondi"], expectedSalary: 6000, rating: 4.8, reviewCount: 14, verification: "VERIFIED", experienceYears: 3, bio: "Concept-first teaching with weekly tests. Sample profile for demo purposes.", availableDays: ["Sat", "Mon", "Wed", "Thu"], joinedAt: d(220) },
  { id: "TFT-2002", name: "Demo Tutor Two", gender: "Female", university: "BUET", department: "CSE", year: "3rd Year", subjects: ["Mathematics", "ICT", "English"], classes: ["Class 6", "Class 7", "Class 8", "Class 9"], districts: ["Dhaka"], areas: ["Uttara", "Gulshan"], expectedSalary: 7000, rating: 4.9, reviewCount: 9, verification: "VERIFIED", experienceYears: 2, bio: "Patient, structured teaching for school students. Sample profile.", availableDays: ["Sun", "Tue", "Thu"], joinedAt: d(140) },
  { id: "TFT-2003", name: "Demo Tutor Three", gender: "Male", university: "Chittagong University", department: "Accounting", year: "Masters", subjects: ["Accounting", "Economics"], classes: ["HSC 1st Year", "HSC 2nd Year"], districts: ["Chattogram"], areas: ["Panchlaish", "Khulshi"], expectedSalary: 5000, rating: 4.5, reviewCount: 6, verification: "VERIFIED", experienceYears: 4, bio: "Commerce specialist with four years of HSC coaching. Sample profile.", availableDays: ["Sat", "Sun", "Tue"], joinedAt: d(310) },
  { id: "TFT-2004", name: "Demo Tutor Four", gender: "Female", university: "Rajshahi University", department: "Biology", year: "2nd Year", subjects: ["Biology", "Chemistry", "General Science"], classes: ["Class 8", "Class 9", "Class 10"], districts: ["Rajshahi"], areas: ["Boalia"], expectedSalary: 4000, rating: 0, reviewCount: 0, verification: "PENDING", experienceYears: 1, bio: "New on the platform. Sample profile awaiting verification.", availableDays: ["Mon", "Wed", "Fri"], joinedAt: d(6) },
];

export const APPLICATIONS = [
  { id: "APP-301", tuitionId: "TFD-1001", tuition: "Class 9 Science tutor needed", tutor: "Demo Tutor One", status: "SHORTLISTED", appliedAt: d(1), salary: 6000 },
  { id: "APP-302", tuitionId: "TFD-1007", tuition: "A Level Physics tutor", tutor: "Demo Tutor One", status: "PENDING", appliedAt: d(2), salary: 9000 },
  { id: "APP-303", tuitionId: "TFD-1004", tuition: "SSC candidate needs Math and English", tutor: "Demo Tutor Three", status: "REJECTED", appliedAt: d(5), salary: 6500 },
  { id: "APP-304", tuitionId: "TFD-1002", tuition: "Higher Math for HSC 1st year", tutor: "Demo Tutor Two", status: "ACCEPTED", appliedAt: d(8), salary: 7000 },
] as const;

export const PAYMENTS = [
  { id: "PAY-501", tuition: "Higher Math for HSC 1st year", guardian: "Demo Guardian", tutor: "Demo Tutor Two", amount: 7000, method: "bKash", trx: "DEMO8N2K4Q", status: "PENDING", submittedAt: d(1) },
  { id: "PAY-502", tuition: "Class 6 all subjects", guardian: "Demo Guardian B", tutor: "Demo Tutor Three", amount: 4500, method: "Nagad", trx: "DEMO5T7ZP1", status: "VERIFIED", submittedAt: d(9) },
  { id: "PAY-503", tuition: "HSC Accounting", guardian: "Demo Guardian C", tutor: "Demo Tutor Three", amount: 5000, method: "bKash", trx: "DEMO2A9LM8", status: "REJECTED", submittedAt: d(12) },
] as const;

export const NOTIFICATIONS = [
  { id: "n1", title: "New application received", body: "Demo Tutor One applied to your Class 9 Science tuition.", at: d(0), read: false },
  { id: "n2", title: "Tuition approved", body: "Your post TFD-1002 is now visible to tutors.", at: d(1), read: false },
  { id: "n3", title: "Payment verified", body: "Payment PAY-502 was verified by admin.", at: d(3), read: true },
  { id: "n4", title: "Profile tip", body: "Add your subjects to reach 100% profile completion.", at: d(6), read: true },
] as const;

export const FAQS = [
  { q: "Is there a registration or application fee?", a: "No. Creating an account and applying for tuition are free. A payment is made only when a guardian confirms a tutor's salary through the platform." },
  { q: "Why does my tuition post need approval?", a: "Every post is checked by our team before it goes public. This keeps fake and duplicate listings off the platform." },
  { q: "How do I pay?", a: "After you select a tutor, you will see the official bKash and Nagad payment instructions. Send the payment, then submit your transaction ID. Our team verifies it manually." },
  { q: "Is my phone number visible to tutors?", a: "No. Guardian contact details stay private until the correct stage of the process." },
  { q: "What does the Verified Tutor badge mean?", a: "An admin has reviewed the tutor's identity and education documents. The badge is never granted automatically." },
];
