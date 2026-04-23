import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import SignIn from "./pages/auth/SignIn.tsx";
import SignUp from "./pages/auth/SignUp.tsx";
import ForgotPassword from "./pages/auth/ForgotPassword.tsx";
import ResetPassword from "./pages/auth/ResetPassword.tsx";
import RoleSelection from "./pages/auth/RoleSelection.tsx";
import Onboarding from "./pages/auth/Onboarding.tsx";

import SuperAdminDashboard from "./pages/super-admin/Dashboard.tsx";
import SuperAdminUsers from "./pages/super-admin/Users.tsx";
import SuperAdminLogs from "./pages/super-admin/Logs.tsx";
import SuperAdminStats from "./pages/super-admin/Stats.tsx";

import AdminDashboard from "./pages/admin/Dashboard.tsx";
import AdminQuestions from "./pages/admin/Questions.tsx";
import AdminAnalysis from "./pages/admin/Analysis.tsx";
import AdminReview from "./pages/admin/Review.tsx";
import QuestionClassifications from "./pages/admin/QuestionClassifications.tsx";

import UploadBatchesIndex from "./pages/admin/upload-batches/Index.tsx";
import UploadBatchCreate from "./pages/admin/upload-batches/Create.tsx";
import UploadBatchManual from "./pages/admin/upload-batches/Manual.tsx";
import UploadBatchDetail from "./pages/admin/upload-batches/Detail.tsx";

import AdminPrograms from "./pages/admin/academic/Programs.tsx";
import AdminMajors from "./pages/admin/academic/Majors.tsx";
import AdminSubjects from "./pages/admin/academic/Subjects.tsx";
import AdminTopics from "./pages/admin/academic/Topics.tsx";
import AdminSubtopics from "./pages/admin/academic/Subtopics.tsx";

import StudentDashboard from "./pages/student/Dashboard.tsx";
import StudentSettings from "./pages/student/Settings.tsx";
import StudentProfile from "./pages/student/Profile.tsx";
import ExamsLanding from "./pages/student/ExamsLanding.tsx";
import ExamSession from "./pages/student/ExamSession.tsx";
import ExamResults from "./pages/student/ExamResults.tsx";
import ExamReview from "./pages/student/ExamReview.tsx";
import ExamHistory from "./pages/student/History.tsx";
import Leaderboards from "./pages/student/Leaderboards.tsx";
import Achievements from "./pages/student/Achievements.tsx";
import Mastery from "./pages/student/Mastery.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="dssc-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />

            {/* Auth */}
            <Route path="/login" element={<SignIn />} />
            <Route path="/auth/sign-in" element={<SignIn />} />
            <Route path="/auth/sign-up" element={<SignUp />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
            <Route path="/auth/role" element={<RoleSelection />} />
            <Route path="/auth/onboarding" element={<Onboarding />} />

            {/* Super Admin */}
            <Route path="/super-admin" element={<SuperAdminDashboard />} />
            <Route path="/super-admin/users" element={<SuperAdminUsers />} />
            <Route path="/super-admin/logs" element={<SuperAdminLogs />} />
            <Route path="/super-admin/stats" element={<SuperAdminStats />} />

            {/* Admin */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/question-upload-batches" element={<UploadBatchesIndex />} />
            <Route path="/admin/question-upload-batches/create" element={<UploadBatchCreate />} />
            <Route path="/admin/question-upload-batches/manual" element={<UploadBatchManual />} />
            <Route path="/admin/question-upload-batches/:id" element={<UploadBatchDetail />} />
            <Route path="/admin/question-review" element={<AdminReview />} />
            <Route path="/admin/question-classifications" element={<QuestionClassifications />} />
            <Route path="/admin/questions" element={<AdminQuestions />} />
            <Route path="/admin/item-analysis" element={<AdminAnalysis />} />
            <Route path="/admin/programs" element={<AdminPrograms />} />
            <Route path="/admin/majors" element={<AdminMajors />} />
            <Route path="/admin/subjects" element={<AdminSubjects />} />
            <Route path="/admin/topics" element={<AdminTopics />} />
            <Route path="/admin/subtopics" element={<AdminSubtopics />} />

            {/* Admin legacy redirects */}
            <Route path="/admin/ocr" element={<Navigate to="/admin/question-upload-batches/create" replace />} />
            <Route path="/admin/review" element={<Navigate to="/admin/question-review" replace />} />
            <Route path="/admin/analysis" element={<Navigate to="/admin/item-analysis" replace />} />

            {/* Student */}
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/student/settings" element={<StudentSettings />} />
            <Route path="/student/exams" element={<ExamsLanding />} />
            <Route path="/student/exams/history" element={<ExamHistory />} />
            <Route path="/student/exams/:examSession" element={<ExamSession />} />
            <Route path="/student/exams/:examSession/results" element={<ExamResults />} />
            <Route path="/student/exams/:examSession/review" element={<ExamReview />} />
            <Route path="/student/mastery" element={<Mastery />} />
            <Route path="/student/leaderboards" element={<Leaderboards />} />
            <Route path="/student/achievements" element={<Achievements />} />

            {/* Student legacy redirects (/app/* → /student/*) */}
            <Route path="/app" element={<Navigate to="/student" replace />} />
            <Route path="/app/settings" element={<Navigate to="/student/settings" replace />} />
            <Route path="/app/exam/start" element={<Navigate to="/student/exams" replace />} />
            <Route path="/app/exam/session" element={<Navigate to="/student/exams" replace />} />
            <Route path="/app/results/:id" element={<Navigate to="/student/exams" replace />} />
            <Route path="/app/history" element={<Navigate to="/student/exams/history" replace />} />
            <Route path="/app/leaderboard" element={<Navigate to="/student/leaderboards" replace />} />
            <Route path="/app/achievements" element={<Navigate to="/student/achievements" replace />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
