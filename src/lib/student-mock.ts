// Mock data for the Student module (frontend only)

export type Difficulty = "Easy" | "Medium" | "Hard";

export type ExamQuestion = {
  id: string;
  text: string;
  choices: { key: "A" | "B" | "C" | "D"; text: string }[];
  answer: "A" | "B" | "C" | "D";
  subject: string;
  topic: string;
  subtopic: string;
  difficulty: Difficulty;
};

const subjects = [
  { subject: "Professional Education", topic: "Learning Theories", subtopic: "Constructivism" },
  { subject: "General Education", topic: "Philippine Educational System", subtopic: "Legal bases" },
  { subject: "Mathematics", topic: "Statistics", subtopic: "Central Tendency" },
  { subject: "English", topic: "Literature", subtopic: "Figures of Speech" },
  { subject: "Science", topic: "Biology", subtopic: "Cell Division" },
  { subject: "Filipino", topic: "Wika at Lipunan", subtopic: "Mga Batas" },
];

const difficulties: Difficulty[] = ["Easy", "Medium", "Hard"];

const sampleStems = [
  "Which best describes the principle of",
  "What is the most accurate definition of",
  "Which of the following is an example of",
  "According to current literature, what does",
  "Which scenario demonstrates",
  "Which Philippine policy directly relates to",
  "Which strategy is most effective for",
  "What is the primary purpose of",
];

const sampleChoices = [
  "A controlled, sequential approach",
  "A learner-centered, inquiry-based method",
  "A teacher-directed delivery model",
  "An assessment-only framework",
  "A behaviorist conditioning loop",
  "A constructivist scaffolding process",
  "A sociocultural mediation model",
  "A purely cognitive map",
];

function pick<T>(arr: T[], i: number) {
  return arr[i % arr.length];
}

export function generateMockExam(count = 150): ExamQuestion[] {
  const items: ExamQuestion[] = [];
  for (let i = 0; i < count; i++) {
    const s = pick(subjects, i);
    const stem = pick(sampleStems, i);
    const correct = (["A", "B", "C", "D"] as const)[i % 4];
    const choices = (["A", "B", "C", "D"] as const).map((k, idx) => ({
      key: k,
      text: pick(sampleChoices, i + idx),
    }));
    items.push({
      id: `EQ-${1000 + i}`,
      text: `${stem} ${s.subtopic.toLowerCase()} in the context of ${s.subject}?`,
      choices,
      answer: correct,
      subject: s.subject,
      topic: s.topic,
      subtopic: s.subtopic,
      difficulty: difficulties[i % 3],
    });
  }
  return items;
}

export type ExamSession = {
  id: string;
  date: string;
  score: number;
  total: number;
  duration: string;
  difficulty: Difficulty;
  subjectBreakdown: { subject: string; correct: number; total: number }[];
};

export const mockSessions: ExamSession[] = [
  {
    id: "S-2041",
    date: "2025-04-18",
    score: 122,
    total: 150,
    duration: "2h 14m",
    difficulty: "Medium",
    subjectBreakdown: [
      { subject: "Professional Education", correct: 38, total: 45 },
      { subject: "General Education", correct: 32, total: 40 },
      { subject: "Specialization", correct: 52, total: 65 },
    ],
  },
  {
    id: "S-2030",
    date: "2025-04-15",
    score: 108,
    total: 150,
    duration: "2h 30m",
    difficulty: "Medium",
    subjectBreakdown: [
      { subject: "Professional Education", correct: 33, total: 45 },
      { subject: "General Education", correct: 28, total: 40 },
      { subject: "Specialization", correct: 47, total: 65 },
    ],
  },
  {
    id: "S-2018",
    date: "2025-04-10",
    score: 95,
    total: 150,
    duration: "2h 42m",
    difficulty: "Easy",
    subjectBreakdown: [
      { subject: "Professional Education", correct: 30, total: 45 },
      { subject: "General Education", correct: 25, total: 40 },
      { subject: "Specialization", correct: 40, total: 65 },
    ],
  },
  {
    id: "S-2002",
    date: "2025-04-04",
    score: 88,
    total: 150,
    duration: "2h 51m",
    difficulty: "Easy",
    subjectBreakdown: [
      { subject: "Professional Education", correct: 28, total: 45 },
      { subject: "General Education", correct: 22, total: 40 },
      { subject: "Specialization", correct: 38, total: 65 },
    ],
  },
];

export type LeaderboardEntry = {
  rank: number;
  name: string;
  initials: string;
  score: number;
  exams: number;
  streak: number;
  isMe?: boolean;
};

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Patricia Lim", initials: "PL", score: 138, exams: 18, streak: 22 },
  { rank: 2, name: "Marco Villanueva", initials: "MV", score: 134, exams: 15, streak: 14 },
  { rank: 3, name: "Ana Reyes", initials: "AR", score: 131, exams: 17, streak: 9 },
  { rank: 4, name: "Juan dela Cruz", initials: "JC", score: 122, exams: 12, streak: 7, isMe: true },
  { rank: 5, name: "Liza Bautista", initials: "LB", score: 119, exams: 11, streak: 5 },
  { rank: 6, name: "Diego Tan", initials: "DT", score: 115, exams: 14, streak: 4 },
  { rank: 7, name: "Carlo Mendoza", initials: "CM", score: 112, exams: 9, streak: 3 },
  { rank: 8, name: "Maria Santos", initials: "MS", score: 109, exams: 10, streak: 2 },
];

export type Achievement = {
  id: string;
  title: string;
  description: string;
  progress: number; // 0-100
  unlocked: boolean;
  icon: "flame" | "trophy" | "target" | "zap" | "award" | "star";
};

export const mockAchievements: Achievement[] = [
  { id: "A1", title: "First Steps", description: "Complete your first mock exam", progress: 100, unlocked: true, icon: "star" },
  { id: "A2", title: "Week Warrior", description: "Maintain a 7-day study streak", progress: 100, unlocked: true, icon: "flame" },
  { id: "A3", title: "Sharpshooter", description: "Score above 80% in any exam", progress: 100, unlocked: true, icon: "target" },
  { id: "A4", title: "Marathoner", description: "Complete 20 mock exams", progress: 60, unlocked: false, icon: "zap" },
  { id: "A5", title: "Top 3 Finisher", description: "Reach the top 3 of the leaderboard", progress: 75, unlocked: false, icon: "trophy" },
  { id: "A6", title: "Perfect Subject", description: "100% on a subject section", progress: 40, unlocked: false, icon: "award" },
];

export const motivationalMessages = {
  correct: [
    "Excellent! Keep that momentum going.",
    "Nailed it — you're on fire 🔥",
    "Great recall — that's mastery in action.",
    "Spot on! Your prep is paying off.",
    "Sharp answer. Trust the process.",
  ],
  incorrect: [
    "Close one — let's slow down and review.",
    "Not quite. Every miss is a lesson learned.",
    "No worries, we'll adapt and try again.",
    "Stay calm — adjusting difficulty for you.",
    "Keep going. Real growth happens here.",
  ],
};

export const weeklyActivity = [
  { day: "Mon", minutes: 45, exams: 1 },
  { day: "Tue", minutes: 30, exams: 0 },
  { day: "Wed", minutes: 75, exams: 1 },
  { day: "Thu", minutes: 60, exams: 1 },
  { day: "Fri", minutes: 20, exams: 0 },
  { day: "Sat", minutes: 110, exams: 2 },
  { day: "Sun", minutes: 90, exams: 1 },
];
