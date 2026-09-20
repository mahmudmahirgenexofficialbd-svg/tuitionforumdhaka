export const DIVISIONS = ["Barishal", "Chattogram", "Dhaka", "Khulna", "Mymensingh", "Rajshahi", "Rangpur", "Sylhet"] as const;

// Frontend sample subset. The backend seed will load all 64 districts, upazilas/thanas and areas.
export const DISTRICTS_BY_DIVISION: Record<string, string[]> = {
  Barishal: ["Barishal", "Bhola", "Patuakhali"],
  Chattogram: ["Chattogram", "Cox's Bazar", "Cumilla", "Noakhali"],
  Dhaka: ["Dhaka", "Gazipur", "Narayanganj", "Tangail"],
  Khulna: ["Khulna", "Jashore", "Kushtia"],
  Mymensingh: ["Mymensingh", "Jamalpur"],
  Rajshahi: ["Rajshahi", "Bogura", "Pabna"],
  Rangpur: ["Rangpur", "Dinajpur"],
  Sylhet: ["Sylhet", "Moulvibazar"],
};

export const THANAS_BY_DISTRICT: Record<string, string[]> = {
  Dhaka: ["Dhanmondi", "Mirpur", "Uttara", "Mohammadpur", "Gulshan", "Badda"],
  Chattogram: ["Panchlaish", "Khulshi", "Kotwali", "Halishahar"],
  Sylhet: ["Kotwali", "Jalalabad"],
  Rajshahi: ["Boalia", "Rajpara"],
  Khulna: ["Sonadanga", "Khalishpur"],
};

export const CLASS_LEVELS = [
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8",
  "Class 9", "Class 10", "HSC 1st Year", "HSC 2nd Year", "O Level", "A Level", "Admission",
] as const;

export const SUBJECTS = [
  "Mathematics", "Physics", "Chemistry", "Biology", "English", "Bangla", "ICT",
  "Accounting", "Economics", "General Science", "Higher Math", "All Subjects",
] as const;

export const MEDIUMS = ["Bangla", "English Medium", "English Version", "Madrasa"] as const;
export const WEEKDAYS = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"] as const;
