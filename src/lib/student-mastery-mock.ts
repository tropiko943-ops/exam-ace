// Mastery + achievement events feed (extends student-mock without modifying it)

export type MasteryRow = {
  id: string;
  subject: string;
  topic: string;
  mastery: number; // 0-100
  attempts: number;
  trend: "up" | "down" | "flat";
  lastSeen: string;
};

export const mockMastery: MasteryRow[] = [
  { id: "MS-1", subject: "Professional Education", topic: "Learning Theories", mastery: 84, attempts: 42, trend: "up", lastSeen: "2 days ago" },
  { id: "MS-2", subject: "Professional Education", topic: "Assessment", mastery: 71, attempts: 28, trend: "up", lastSeen: "3 days ago" },
  { id: "MS-3", subject: "Professional Education", topic: "Foundations of Education", mastery: 58, attempts: 19, trend: "flat", lastSeen: "1 week ago" },
  { id: "MS-4", subject: "General Education", topic: "Philippine Educational System", mastery: 79, attempts: 31, trend: "up", lastSeen: "2 days ago" },
  { id: "MS-5", subject: "General Education", topic: "Social Studies", mastery: 62, attempts: 24, trend: "down", lastSeen: "5 days ago" },
  { id: "MS-6", subject: "Mathematics", topic: "Statistics", mastery: 88, attempts: 36, trend: "up", lastSeen: "Today" },
  { id: "MS-7", subject: "Mathematics", topic: "Calculus", mastery: 41, attempts: 17, trend: "down", lastSeen: "1 week ago" },
  { id: "MS-8", subject: "English", topic: "Literature", mastery: 73, attempts: 27, trend: "flat", lastSeen: "4 days ago" },
  { id: "MS-9", subject: "Science", topic: "Biology", mastery: 49, attempts: 21, trend: "down", lastSeen: "1 week ago" },
  { id: "MS-10", subject: "Filipino", topic: "Wika at Lipunan", mastery: 67, attempts: 14, trend: "up", lastSeen: "3 days ago" },
];

export type AchievementEvent = {
  id: string;
  title: string;
  detail: string;
  at: string;
  type: "badge" | "streak" | "rank" | "score";
};

export const mockAchievementEvents: AchievementEvent[] = [
  { id: "AE-1", title: "Sharpshooter unlocked", detail: "Scored 81% on S-2041", at: "Today", type: "badge" },
  { id: "AE-2", title: "Climbed to rank #4", detail: "+2 from previous week", at: "2 days ago", type: "rank" },
  { id: "AE-3", title: "7-day streak reached", detail: "Keep it up to unlock Marathoner", at: "3 days ago", type: "streak" },
  { id: "AE-4", title: "Personal best", detail: "122/150 on a Medium session", at: "5 days ago", type: "score" },
  { id: "AE-5", title: "Week Warrior badge", detail: "Maintained a 7-day study streak", at: "1 week ago", type: "badge" },
];
