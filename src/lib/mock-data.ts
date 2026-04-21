// Mock data for Super Admin & Admin frontend pages
export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Student";
  status: "pending" | "active" | "rejected" | "archived";
  joined: string;
  lastActive: string;
};

export const mockUsers: AdminUser[] = [
  { id: "U-1001", name: "Maria Santos", email: "msantos@dssc.edu.ph", role: "Admin", status: "active", joined: "2024-08-12", lastActive: "2 hours ago" },
  { id: "U-1002", name: "Juan dela Cruz", email: "jdelacruz@dssc.edu.ph", role: "Student", status: "active", joined: "2024-09-01", lastActive: "10 min ago" },
  { id: "U-1003", name: "Ana Reyes", email: "areyes@dssc.edu.ph", role: "Student", status: "pending", joined: "2024-09-04", lastActive: "Awaiting approval" },
  { id: "U-1004", name: "Carlo Mendoza", email: "cmendoza@dssc.edu.ph", role: "Admin", status: "active", joined: "2024-07-22", lastActive: "5 hours ago" },
  { id: "U-1005", name: "Liza Bautista", email: "lbautista@dssc.edu.ph", role: "Student", status: "rejected", joined: "2024-06-18", lastActive: "Registration denied" },
  { id: "U-1006", name: "Marco Villanueva", email: "mvillanueva@dssc.edu.ph", role: "Student", status: "active", joined: "2024-10-11", lastActive: "30 min ago" },
  { id: "U-1007", name: "Patricia Lim", email: "plim@dssc.edu.ph", role: "Student", status: "active", joined: "2024-09-29", lastActive: "Just now" },
  { id: "U-1008", name: "Diego Tan", email: "dtan@dssc.edu.ph", role: "Admin", status: "active", joined: "2024-05-30", lastActive: "Yesterday" },
];

export type SystemLog = {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  entity: string;
  level: "info" | "warning" | "error";
  ip: string;
};

export const mockLogs: SystemLog[] = [
  { id: "L-9001", timestamp: "2025-04-19 09:42:11", actor: "msantos@dssc.edu.ph", action: "Approved question", entity: "Q-2381", level: "info", ip: "10.0.1.21" },
  { id: "L-9002", timestamp: "2025-04-19 09:38:44", actor: "system", action: "OCR processing finished", entity: "F-118", level: "info", ip: "—" },
  { id: "L-9003", timestamp: "2025-04-19 09:30:02", actor: "areyes@dssc.edu.ph", action: "Submitted exam", entity: "E-552", level: "info", ip: "192.168.1.45" },
  { id: "L-9004", timestamp: "2025-04-19 08:55:17", actor: "cmendoza@dssc.edu.ph", action: "Failed login attempt", entity: "—", level: "warning", ip: "192.168.1.7" },
  { id: "L-9005", timestamp: "2025-04-19 08:30:00", actor: "system", action: "OCR confidence below threshold", entity: "F-117", level: "warning", ip: "—" },
  { id: "L-9006", timestamp: "2025-04-19 07:14:09", actor: "system", action: "Database backup", entity: "BK-2025-04-19", level: "info", ip: "—" },
  { id: "L-9007", timestamp: "2025-04-18 22:01:55", actor: "unknown", action: "Brute force detected", entity: "auth", level: "error", ip: "203.0.113.7" },
];

export type OcrFile = {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  uploadedBy: string;
  status: "pending" | "processing" | "ready" | "failed";
  progress: number;
  confidence: number;
  questions: number;
};

export const mockOcrFiles: OcrFile[] = [
  { id: "F-118", name: "Prof-Ed-Reviewer-Set-A.pdf", size: "2.4 MB", uploadedAt: "Today, 09:38", uploadedBy: "Maria Santos", status: "ready", progress: 100, confidence: 92, questions: 48 },
  { id: "F-117", name: "Gen-Ed-Practice.pdf", size: "1.1 MB", uploadedAt: "Today, 08:30", uploadedBy: "Maria Santos", status: "ready", progress: 100, confidence: 71, questions: 32 },
  { id: "F-116", name: "Filipino-Major-Exam.png", size: "640 KB", uploadedAt: "Today, 08:12", uploadedBy: "Carlo Mendoza", status: "processing", progress: 64, confidence: 0, questions: 0 },
  { id: "F-115", name: "Math-Specialization.pdf", size: "3.0 MB", uploadedAt: "Today, 07:55", uploadedBy: "Carlo Mendoza", status: "processing", progress: 22, confidence: 0, questions: 0 },
  { id: "F-114", name: "English-Drill-2024.pdf", size: "1.8 MB", uploadedAt: "Yesterday", uploadedBy: "Maria Santos", status: "failed", progress: 0, confidence: 0, questions: 0 },
  { id: "F-113", name: "Science-Mock.pdf", size: "2.2 MB", uploadedAt: "Yesterday", uploadedBy: "Diego Tan", status: "pending", progress: 0, confidence: 0, questions: 0 },
];

export type ExtractedQuestion = {
  id: string;
  fileId: string;
  text: string;
  choices: { key: "A" | "B" | "C" | "D"; text: string }[];
  answer: "A" | "B" | "C" | "D";
  confidence: number;
  subject: string;
  topic: string;
  subtopic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  status: "ready" | "approved" | "rejected";
};

export const mockExtracted: ExtractedQuestion[] = [
  {
    id: "Q-2381", fileId: "F-118",
    text: "Which of the following best describes Vygotsky's Zone of Proximal Development?",
    choices: [
      { key: "A", text: "Tasks a learner can do without help" },
      { key: "B", text: "Tasks a learner can do with guidance" },
      { key: "C", text: "Tasks beyond learner ability" },
      { key: "D", text: "Tasks unrelated to instruction" },
    ],
    answer: "B", confidence: 94, subject: "Professional Education", topic: "Learning Theories", subtopic: "Constructivism", difficulty: "Medium", status: "ready",
  },
  {
    id: "Q-2382", fileId: "F-118",
    text: "Bloom's taxonomy classifies cognitive learning into how many levels?",
    choices: [
      { key: "A", text: "Four" }, { key: "B", text: "Five" }, { key: "C", text: "Six" }, { key: "D", text: "Seven" },
    ],
    answer: "C", confidence: 88, subject: "Professional Education", topic: "Assessment", subtopic: "Cognitive domain", difficulty: "Easy", status: "ready",
  },
  {
    id: "Q-2383", fileId: "F-117",
    text: "Which Philippine law institutionalized the K-12 program?",
    choices: [
      { key: "A", text: "RA 9155" }, { key: "B", text: "RA 10533" }, { key: "C", text: "RA 7836" }, { key: "D", text: "RA 4670" },
    ],
    answer: "B", confidence: 76, subject: "General Education", topic: "Philippine Educational System", subtopic: "Legal bases", difficulty: "Medium", status: "ready",
  },
  {
    id: "Q-2384", fileId: "F-117",
    text: "What does 'pedagogy' literally mean?",
    choices: [
      { key: "A", text: "Art of leading children" },
      { key: "B", text: "Science of learning" },
      { key: "C", text: "Theory of teaching adults" },
      { key: "D", text: "Method of testing" },
    ],
    answer: "A", confidence: 68, subject: "Professional Education", topic: "Foundations of Education", subtopic: "Etymology", difficulty: "Easy", status: "ready",
  },
];

export type BankQuestion = {
  id: string;
  text: string;
  subject: string;
  topic: string;
  subtopic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  status: "active" | "archived";
  uses: number;
  updated: string;
};

export const mockBank: BankQuestion[] = [
  { id: "Q-1001", text: "Define classical conditioning according to Pavlov.", subject: "Professional Education", topic: "Learning Theories", subtopic: "Behaviorism", difficulty: "Easy", status: "active", uses: 142, updated: "2025-03-21" },
  { id: "Q-1002", text: "Explain the role of scaffolding in instruction.", subject: "Professional Education", topic: "Learning Theories", subtopic: "Constructivism", difficulty: "Medium", status: "active", uses: 98, updated: "2025-03-18" },
  { id: "Q-1003", text: "Compute the mean of: 4, 8, 15, 16, 23, 42.", subject: "Mathematics", topic: "Statistics", subtopic: "Central Tendency", difficulty: "Easy", status: "active", uses: 211, updated: "2025-04-02" },
  { id: "Q-1004", text: "Identify the figure of speech: 'The wind whispered.'", subject: "English", topic: "Literature", subtopic: "Figures of Speech", difficulty: "Easy", status: "active", uses: 176, updated: "2025-02-11" },
  { id: "Q-1005", text: "Differentiate mitosis from meiosis.", subject: "Science", topic: "Biology", subtopic: "Cell Division", difficulty: "Hard", status: "active", uses: 67, updated: "2025-01-28" },
  { id: "Q-1006", text: "Anong taong itinatag ang Komisyon sa Wikang Filipino?", subject: "Filipino", topic: "Wika at Lipunan", subtopic: "Mga Batas", difficulty: "Medium", status: "archived", uses: 34, updated: "2024-11-15" },
  { id: "Q-1007", text: "What is the capital of the Philippines?", subject: "General Education", topic: "Social Studies", subtopic: "Geography", difficulty: "Easy", status: "active", uses: 320, updated: "2025-04-10" },
  { id: "Q-1008", text: "Solve: ∫(2x+1) dx", subject: "Mathematics", topic: "Calculus", subtopic: "Integration", difficulty: "Hard", status: "active", uses: 41, updated: "2025-03-30" },
];

export type ItemAnalysisRow = {
  id: string;
  text: string;
  subject: string;
  difficulty: number; // p-value 0-1
  discrimination: number; // -1 to 1
  distractors: { A: number; B: number; C: number; D: number };
  correct: "A" | "B" | "C" | "D";
};

export const mockItemAnalysis: ItemAnalysisRow[] = [
  { id: "Q-1001", text: "Define classical conditioning…", subject: "Prof Ed", difficulty: 0.78, discrimination: 0.42, distractors: { A: 12, B: 78, C: 6, D: 4 }, correct: "B" },
  { id: "Q-1002", text: "Explain scaffolding…", subject: "Prof Ed", difficulty: 0.55, discrimination: 0.38, distractors: { A: 22, B: 55, C: 15, D: 8 }, correct: "B" },
  { id: "Q-1003", text: "Compute the mean…", subject: "Math", difficulty: 0.91, discrimination: 0.18, distractors: { A: 3, B: 91, C: 4, D: 2 }, correct: "B" },
  { id: "Q-1004", text: "Identify figure of speech…", subject: "English", difficulty: 0.62, discrimination: 0.51, distractors: { A: 62, B: 18, C: 12, D: 8 }, correct: "A" },
  { id: "Q-1005", text: "Differentiate mitosis…", subject: "Science", difficulty: 0.34, discrimination: 0.46, distractors: { A: 22, B: 34, C: 30, D: 14 }, correct: "B" },
  { id: "Q-1008", text: "Solve integral…", subject: "Math", difficulty: 0.28, discrimination: 0.22, distractors: { A: 28, B: 18, C: 32, D: 22 }, correct: "A" },
];
