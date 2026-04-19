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
    color: "from-accent to-warning",
  },
  {
    id: "admin",
    icon: BookOpen,
    title: "I'm an Admin",
    desc: "Upload questions via OCR, manage the question bank, and run item analysis.",
    color: "from-primary-glow to-accent",
  },
  {
    id: "super-admin",
    icon: Shield,
    title: "I'm a Super Admin",
    desc: "Manage user accounts, audit system activity, and export reports.",
    color: "from-primary to-primary-glow",
  },
];

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <AuthLayout
      title="How will you use DSSC Reviewer?"
      subtitle="Pick the role that best describes you to get started."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/auth/sign-in" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <div className="space-y-3">
        {roles.map((r) => (
          <button
            key={r.id}
            onClick={() => navigate(`/auth/sign-up?role=${r.id}`)}
            className="w-full text-left group"
          >
            <Card className="overflow-hidden border-border/60 hover:border-primary/40 hover:shadow-elegant transition-smooth">
              <div className={`h-1 bg-gradient-to-r ${r.color}`} />
              <CardContent className="p-5 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary-muted flex items-center justify-center shrink-0 group-hover:scale-110 transition-smooth">
                  <r.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-semibold">{r.title}</div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{r.desc}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-smooth shrink-0" />
              </CardContent>
            </Card>
          </button>
        ))}
      </div>
    </AuthLayout>
  );
}
