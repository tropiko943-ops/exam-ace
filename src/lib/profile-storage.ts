// Profile readiness persisted in localStorage. Pure presentation logic, no backend.
import { mockStudentProfile, type StudentProfile } from "@/lib/academic-mock";

const KEY = "dssc-profile";

const REQUIRED: (keyof StudentProfile)[] = [
  "fullName",
  "email",
  "studentNumber",
  "programCode",
  "yearLevel",
];

export type StoredProfile = Partial<StudentProfile> & { hasOnboarded?: boolean };

function compute(profile: StoredProfile, requiresMajor: boolean) {
  const missing: string[] = [];
  for (const field of REQUIRED) {
    if (!profile[field]) missing.push(prettify(field));
  }
  if (requiresMajor && !profile.major) missing.push("Major");
  const totalRequired = REQUIRED.length + (requiresMajor ? 1 : 0);
  const filled = totalRequired - missing.length;
  const percent = Math.round((filled / totalRequired) * 100);
  return { missing, percent };
}

function prettify(field: string) {
  switch (field) {
    case "fullName": return "Full name";
    case "studentNumber": return "Student number";
    case "programCode": return "Program";
    case "yearLevel": return "Year level";
    default: return field;
  }
}

export function loadProfile(): StudentProfile & { readinessPercent: number; missingFields: string[] } {
  if (typeof window === "undefined") return mockStudentProfile;
  try {
    const raw = window.localStorage.getItem(KEY);
    const stored: StoredProfile = raw ? JSON.parse(raw) : {};
    const merged: StudentProfile = { ...mockStudentProfile, ...stored, missingFields: [], readinessPercent: 0 };
    const requiresMajor = merged.programCode === "BSEd" || merged.programCode === "BTLEd";
    const { missing, percent } = compute(merged, requiresMajor);
    merged.missingFields = missing;
    merged.readinessPercent = percent;
    merged.initials = (merged.fullName || "")
      .split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "JC";
    return merged;
  } catch {
    return mockStudentProfile;
  }
}

export function saveProfile(patch: StoredProfile) {
  if (typeof window === "undefined") return;
  const raw = window.localStorage.getItem(KEY);
  const current: StoredProfile = raw ? JSON.parse(raw) : {};
  window.localStorage.setItem(KEY, JSON.stringify({ ...current, ...patch }));
}

export function clearProfile() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}
