import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, BookOpen, GraduationCap, ArrowRight } from "lucide-react";

const roles = [
  {
    id: "student",
    icon: GraduationCap,
    title: "I'm a Student",
    desc: "Take adaptive mock exams, track progress, and compete on the leaderboard.",
  },
  {
    id: "admin",
    icon: BookOpen,
    title: "I'm an Admin",
    desc: "Upload questions via OCR, manage the bank, run item analysis.",
  },
  {
    id: "super-admin",
    icon: Shield,
    title: "I'm a Super Admin",
    desc: "Manage user accounts, audit system activity, export reports.",
  },
];

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <AuthLayout
      title="How will you use DSSC Reviewer?"
      subtitle="Pick the role that best describes you."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <div className="space-y-2.5">
        {roles.map((r) => (
          <button
            key={r.id}
            onClick={() => navigate(r.id === "student" ? "/auth/onboarding" : `/auth/sign-up?role=${r.id}`)}
            className="group w-full text-left"
          >
            <Card className="transition-smooth hover:border-foreground/12 hover:shadow-card">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                  <r.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-semibold">{r.title}</div>
                  <p className="line-clamp-2 text-xs text-muted-foreground">{r.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-foreground" />
              </CardContent>
            </Card>
          </button>
        ))}
      </div>
    </AuthLayout>
  );
}
