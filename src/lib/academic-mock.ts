// Academic structure + upload batches + student profile + mastery mock data

export type Program = {
  id: string;
  code: string;
  name: string;
  requiresMajor: boolean;
  majors: number;
  students: number;
  status: "active" | "archived";
  updated: string;
};

export const mockPrograms: Program[] = [
  { id: "P-1", code: "BSEd", name: "Bachelor of Secondary Education", requiresMajor: true, majors: 6, students: 312, status: "active", updated: "2025-04-12" },
  { id: "P-2", code: "BEEd", name: "Bachelor of Elementary Education", requiresMajor: false, majors: 0, students: 188, status: "active", updated: "2025-03-30" },
  { id: "P-3", code: "BPEd", name: "Bachelor of Physical Education", requiresMajor: false, majors: 0, students: 64, status: "active", updated: "2025-02-22" },
  { id: "P-4", code: "BTLEd", name: "Bachelor of Tech-Livelihood Education", requiresMajor: true, majors: 4, students: 91, status: "active", updated: "2025-01-15" },
];

export type Major = {
  id: string;
  name: string;
  programId: string;
  programCode: string;
  students: number;
  status: "active" | "archived";
};

export const mockMajors: Major[] = [
  { id: "M-1", name: "English", programId: "P-1", programCode: "BSEd", students: 78, status: "active" },
  { id: "M-2", name: "Mathematics", programId: "P-1", programCode: "BSEd", students: 64, status: "active" },
  { id: "M-3", name: "Sciences", programId: "P-1", programCode: "BSEd", students: 51, status: "active" },
  { id: "M-4", name: "Filipino", programId: "P-1", programCode: "BSEd", students: 39, status: "active" },
  { id: "M-5", name: "Social Studies", programId: "P-1", programCode: "BSEd", students: 47, status: "active" },
  { id: "M-6", name: "Values Education", programId: "P-1", programCode: "BSEd", students: 33, status: "active" },
  { id: "M-7", name: "Home Economics", programId: "P-4", programCode: "BTLEd", students: 28, status: "active" },
  { id: "M-8", name: "Industrial Arts", programId: "P-4", programCode: "BTLEd", students: 24, status: "active" },
];

export type Subject = {
  id: string;
  code: string;
  name: string;
  area: "Professional Education" | "General Education" | "Specialization";
  topics: number;
  questions: number;
  status: "active" | "archived";
};

export const mockSubjects: Subject[] = [
  { id: "S-1", code: "PROF-ED", name: "Professional Education", area: "Professional Education", topics: 8, questions: 612, status: "active" },
  { id: "S-2", code: "GEN-ED", name: "General Education", area: "General Education", topics: 6, questions: 488, status: "active" },
  { id: "S-3", code: "MATH", name: "Mathematics", area: "Specialization", topics: 7, questions: 421, status: "active" },
  { id: "S-4", code: "ENG", name: "English", area: "Specialization", topics: 5, questions: 376, status: "active" },
  { id: "S-5", code: "SCI", name: "Science", area: "Specialization", topics: 6, questions: 353, status: "active" },
  { id: "S-6", code: "FIL", name: "Filipino", area: "Specialization", topics: 4, questions: 211, status: "active" },
];

export type Topic = {
  id: string;
  name: string;
  subjectId: string;
  subjectName: string;
  subtopics: number;
  questions: number;
  status: "active" | "archived";
};

export const mockTopics: Topic[] = [
  { id: "T-1", name: "Learning Theories", subjectId: "S-1", subjectName: "Professional Education", subtopics: 4, questions: 142, status: "active" },
  { id: "T-2", name: "Assessment", subjectId: "S-1", subjectName: "Professional Education", subtopics: 3, questions: 98, status: "active" },
  { id: "T-3", name: "Foundations of Education", subjectId: "S-1", subjectName: "Professional Education", subtopics: 4, questions: 87, status: "active" },
  { id: "T-4", name: "Philippine Educational System", subjectId: "S-2", subjectName: "General Education", subtopics: 3, questions: 76, status: "active" },
  { id: "T-5", name: "Statistics", subjectId: "S-3", subjectName: "Mathematics", subtopics: 4, questions: 102, status: "active" },
  { id: "T-6", name: "Calculus", subjectId: "S-3", subjectName: "Mathematics", subtopics: 5, questions: 88, status: "active" },
  { id: "T-7", name: "Literature", subjectId: "S-4", subjectName: "English", subtopics: 4, questions: 112, status: "active" },
  { id: "T-8", name: "Biology", subjectId: "S-5", subjectName: "Science", subtopics: 5, questions: 96, status: "active" },
  { id: "T-9", name: "Wika at Lipunan", subjectId: "S-6", subjectName: "Filipino", subtopics: 3, questions: 64, status: "active" },
];

export type Subtopic = {
  id: string;
  name: string;
  topicId: string;
  topicName: string;
  subjectName: string;
  questions: number;
  status: "active" | "archived";
};

export const mockSubtopics: Subtopic[] = [
  { id: "ST-1", name: "Behaviorism", topicId: "T-1", topicName: "Learning Theories", subjectName: "Professional Education", questions: 38, status: "active" },
  { id: "ST-2", name: "Constructivism", topicId: "T-1", topicName: "Learning Theories", subjectName: "Professional Education", questions: 41, status: "active" },
  { id: "ST-3", name: "Cognitivism", topicId: "T-1", topicName: "Learning Theories", subjectName: "Professional Education", questions: 35, status: "active" },
  { id: "ST-4", name: "Sociocultural", topicId: "T-1", topicName: "Learning Theories", subjectName: "Professional Education", questions: 28, status: "active" },
  { id: "ST-5", name: "Cognitive domain", topicId: "T-2", topicName: "Assessment", subjectName: "Professional Education", questions: 33, status: "active" },
  { id: "ST-6", name: "Affective domain", topicId: "T-2", topicName: "Assessment", subjectName: "Professional Education", questions: 22, status: "active" },
  { id: "ST-7", name: "Legal bases", topicId: "T-4", topicName: "Philippine Educational System", subjectName: "General Education", questions: 29, status: "active" },
  { id: "ST-8", name: "Central Tendency", topicId: "T-5", topicName: "Statistics", subjectName: "Mathematics", questions: 34, status: "active" },
  { id: "ST-9", name: "Integration", topicId: "T-6", topicName: "Calculus", subjectName: "Mathematics", questions: 22, status: "active" },
  { id: "ST-10", name: "Figures of Speech", topicId: "T-7", topicName: "Literature", subjectName: "English", questions: 31, status: "active" },
  { id: "ST-11", name: "Cell Division", topicId: "T-8", topicName: "Biology", subjectName: "Science", questions: 26, status: "active" },
  { id: "ST-12", name: "Mga Batas", topicId: "T-9", topicName: "Wika at Lipunan", subjectName: "Filipino", questions: 18, status: "active" },
];

// ===== Question upload batches =====

export type BatchStatus =
  | "pending"
  | "processing"
  | "ready"
  | "queued"
  | "failed"
  | "cancelled";

export type BatchSource = "ocr" | "manual";

export type BatchPage = {
  id: string;
  index: number;
  text: string;
  confidence: number;
  edited?: boolean;
};

export type BatchTimelineEvent = {
  id: string;
  label: string;
  detail?: string;
  at: string;
  level: "info" | "success" | "warning" | "error";
};

export type UploadBatch = {
  id: string;
  name: string;
  source: BatchSource;
  fileType?: string;
  size?: string;
  uploadedAt: string;
  uploadedBy: string;
  status: BatchStatus;
  progress: number;
  confidence: number;
  pages: BatchPage[];
  extractedQuestions: number;
  timeline: BatchTimelineEvent[];
  notes?: string;
};

export const mockBatches: UploadBatch[] = [
  {
    id: "B-2041",
    name: "Prof-Ed-Reviewer-Set-A.pdf",
    source: "ocr",
    fileType: "PDF",
    size: "2.4 MB",
    uploadedAt: "Today, 09:38",
    uploadedBy: "Maria Santos",
    status: "ready",
    progress: 100,
    confidence: 92,
    extractedQuestions: 48,
    pages: [
      { id: "PG-1", index: 1, confidence: 96, text: "1. Which of the following best describes Vygotsky's Zone of Proximal Development?\nA. Tasks a learner can do without help\nB. Tasks a learner can do with guidance\nC. Tasks beyond learner ability\nD. Tasks unrelated to instruction\nAnswer: B" },
      { id: "PG-2", index: 2, confidence: 91, text: "2. Bloom's taxonomy classifies cognitive learning into how many levels?\nA. Four\nB. Five\nC. Six\nD. Seven\nAnswer: C" },
      { id: "PG-3", index: 3, confidence: 89, text: "3. The constructivist approach emphasizes that learners…\n(continued on next page)" },
    ],
    timeline: [
      { id: "E-1", label: "Uploaded", detail: "2.4 MB · Maria Santos", at: "09:38", level: "info" },
      { id: "E-2", label: "OCR processing started", at: "09:38", level: "info" },
      { id: "E-3", label: "Pages extracted", detail: "12 pages", at: "09:40", level: "info" },
      { id: "E-4", label: "Confidence check passed", detail: "92% average", at: "09:41", level: "success" },
      { id: "E-5", label: "Ready for review", detail: "48 questions detected", at: "09:41", level: "success" },
    ],
  },
  {
    id: "B-2040",
    name: "Gen-Ed-Practice.pdf",
    source: "ocr",
    fileType: "PDF",
    size: "1.1 MB",
    uploadedAt: "Today, 08:30",
    uploadedBy: "Maria Santos",
    status: "ready",
    progress: 100,
    confidence: 71,
    extractedQuestions: 32,
    pages: [
      { id: "PG-4", index: 1, confidence: 74, text: "1. Which Philippine law institutionalized the K-12 program?\nA. RA 9155\nB. RA 10533\nC. RA 7836\nD. RA 4670\nAnswer: B" },
      { id: "PG-5", index: 2, confidence: 68, text: "2. What does 'pedagogy' literally mean?\nA. Art of leading children\nB. Science of learning\nC. Theory of teaching adults\nD. Method of testing\nAnswer: A" },
    ],
    timeline: [
      { id: "E-6", label: "Uploaded", at: "08:30", level: "info" },
      { id: "E-7", label: "OCR processing started", at: "08:30", level: "info" },
      { id: "E-8", label: "Low confidence on page 2", detail: "68%", at: "08:33", level: "warning" },
      { id: "E-9", label: "Ready for review", detail: "32 questions detected", at: "08:34", level: "success" },
    ],
  },
  {
    id: "B-2039",
    name: "Filipino-Major-Exam.png",
    source: "ocr",
    fileType: "PNG",
    size: "640 KB",
    uploadedAt: "Today, 08:12",
    uploadedBy: "Carlo Mendoza",
    status: "processing",
    progress: 64,
    confidence: 0,
    extractedQuestions: 0,
    pages: [],
    timeline: [
      { id: "E-10", label: "Uploaded", at: "08:12", level: "info" },
      { id: "E-11", label: "OCR processing", detail: "64% complete", at: "08:14", level: "info" },
    ],
  },
  {
    id: "B-2038",
    name: "Math-Specialization.pdf",
    source: "ocr",
    fileType: "PDF",
    size: "3.0 MB",
    uploadedAt: "Today, 07:55",
    uploadedBy: "Carlo Mendoza",
    status: "processing",
    progress: 22,
    confidence: 0,
    extractedQuestions: 0,
    pages: [],
    timeline: [
      { id: "E-12", label: "Uploaded", at: "07:55", level: "info" },
      { id: "E-13", label: "OCR processing", detail: "22% complete", at: "07:57", level: "info" },
    ],
  },
  {
    id: "B-2037",
    name: "English-Drill-2024.pdf",
    source: "ocr",
    fileType: "PDF",
    size: "1.8 MB",
    uploadedAt: "Yesterday",
    uploadedBy: "Maria Santos",
    status: "failed",
    progress: 0,
    confidence: 0,
    extractedQuestions: 0,
    pages: [],
    timeline: [
      { id: "E-14", label: "Uploaded", at: "Yesterday 16:21", level: "info" },
      { id: "E-15", label: "OCR failed", detail: "Unsupported file encoding", at: "Yesterday 16:23", level: "error" },
    ],
  },
  {
    id: "B-2036",
    name: "Manual entry · 12 questions",
    source: "manual",
    uploadedAt: "Yesterday",
    uploadedBy: "Diego Tan",
    status: "queued",
    progress: 100,
    confidence: 100,
    extractedQuestions: 12,
    pages: [],
    timeline: [
      { id: "E-16", label: "Submitted manually", at: "Yesterday 14:02", level: "info" },
      { id: "E-17", label: "Queued for review", at: "Yesterday 14:02", level: "success" },
    ],
    notes: "12 manually authored Prof-Ed items.",
  },
];

// ===== Student profile (single mock student) =====

export type StudentProfile = {
  fullName: string;
  email: string;
  studentNumber: string;
  programCode: string;
  programName: string;
  yearLevel: string;
  major?: string;
  targetLet?: string;
  initials: string;
  readinessPercent: number;
  missingFields: string[];
};

export const mockStudentProfile: StudentProfile = {
  fullName: "Juan dela Cruz",
  email: "jdelacruz@dssc.edu.ph",
  studentNumber: "2022-00154",
  programCode: "BSEd",
  programName: "Bachelor of Secondary Education",
  yearLevel: "4",
  major: "English",
  targetLet: "2025-09-28",
  initials: "JC",
  readinessPercent: 100,
  missingFields: [],
};
