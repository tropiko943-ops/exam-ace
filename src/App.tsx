import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import AdminOcr from "./pages/admin/OcrUpload.tsx";
import AdminReview from "./pages/admin/Review.tsx";
import AdminQuestions from "./pages/admin/Questions.tsx";
import AdminAnalysis from "./pages/admin/Analysis.tsx";

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
            <Route path="/admin/ocr" element={<AdminOcr />} />
            <Route path="/admin/review" element={<AdminReview />} />
            <Route path="/admin/questions" element={<AdminQuestions />} />
            <Route path="/admin/analysis" element={<AdminAnalysis />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
