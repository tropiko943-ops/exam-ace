import { Link } from "react-router-dom";
import { AppShell } from "@/components/shell/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, ListChecks, Sparkles, Target, Zap } from "lucide-react";
import { MotivationalBanner } from "@/components/student/motivational-banner";

const features = [
  { icon: ListChecks, title: "150 questions", desc: "Mixed across subjects, topics & sub-topics." },
  { icon: Clock, title: "3-hour session", desc: "Pause-friendly with auto-save." },
  { icon: Zap, title: "Adaptive difficulty", desc: "Harder after correct, easier after wrong." },
  { icon: Sparkles, title: "Motivational feedback", desc: "Encouragement after every answer." },
];

export default function ExamStart() {
  return (
    <AppShell role="student">
      <PageHeader title="Start a mock exam" description="A randomized 150-question session calibrated to your skill." />

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border/50 overflow-hidden">
          <div className="gradient-hero text-primary-foreground p-6 md:p-8">
            <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur px-3 py-1 rounded-full text-xs font-medium mb-4">
              <Target className="h-3 w-3" /> Adaptive · Mock LET Format
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">Ready when you are.</h2>
            <p className="opacity-90 text-sm md:text-base max-w-md">
              You'll get 150 multiple-choice questions across all major subjects. Difficulty changes as you go.
            </p>
          </div>
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((f) => (
                <div key={f.title} className="flex gap-3">
                  <div className="h-9 w-9 rounded-lg bg-primary-muted text-primary flex items-center justify-center shrink-0">
                    <f.icon className="h-4 w-4" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-semibold text-sm">{f.title}</p>
                    <p className="text-xs text-muted-foreground">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <MotivationalBanner
              variant="info"
              message="Tip: flag tricky items and revisit them before submitting."
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="gap-2 flex-1">
                <Link to="/app/exam/session">
                  <BookOpen className="h-4 w-4" /> Begin exam
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="flex-1">
                <Link to="/app">Back to dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-display font-semibold">Before you start</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary">•</span> Find a quiet, distraction-free spot.</li>
              <li className="flex gap-2"><span className="text-primary">•</span> Have scratch paper handy.</li>
              <li className="flex gap-2"><span className="text-primary">•</span> Take your time — accuracy matters more than speed.</li>
              <li className="flex gap-2"><span className="text-primary">•</span> Your progress is saved automatically.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
