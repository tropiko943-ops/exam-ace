import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { StudentShell } from "@/components/shell/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { ProfileReadinessCard } from "@/components/shared/profile-readiness-card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, ListChecks, Sparkles, Target, Zap, Play } from "lucide-react";
import { MotivationalBanner } from "@/components/student/motivational-banner";
import { loadProfile } from "@/lib/profile-storage";

const features = [
  { icon: ListChecks, title: "150 questions", desc: "Mixed across subjects, topics, and sub-topics." },
  { icon: Clock, title: "3-hour session", desc: "Pause-friendly with auto-save." },
  { icon: Zap, title: "Adaptive difficulty", desc: "Harder after correct, easier after wrong." },
  { icon: Sparkles, title: "Motivational feedback", desc: "Encouragement after every answer." },
];

const ACTIVE_KEY = "dssc-active-exam";

export default function ExamsLanding() {
  const navigate = useNavigate();
  const profile = loadProfile();
  const ready = profile.readinessPercent >= 100;
  const [active, setActive] = useState<{ id: string; index: number } | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(ACTIVE_KEY);
      if (raw) setActive(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  const startNew = () => {
    const id = `S-${Date.now().toString().slice(-6)}`;
    sessionStorage.setItem(ACTIVE_KEY, JSON.stringify({ id, index: 0 }));
    navigate(`/student/exams/${id}`);
  };

  return (
    <StudentShell userName={profile.fullName}>
      <PageHeader title="Mock exam" description="A randomized 150-question session calibrated to your skill." />

      <ProfileReadinessCard percent={profile.readinessPercent} missing={profile.missingFields} />

      {active && (
        <Card className="border-primary/40 bg-primary-muted/40">
          <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-sm font-semibold">Resume in-progress exam</p>
              <p className="text-xs text-muted-foreground">Session {active.id} · question {active.index + 1} of 150</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => { sessionStorage.removeItem(ACTIVE_KEY); setActive(null); }}>
                Discard
              </Button>
              <Button asChild className="gap-2">
                <Link to={`/student/exams/${active.id}`}><Play className="h-4 w-4" />Resume</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="overflow-hidden border-border/50 lg:col-span-2">
          <div className="gradient-hero p-5 text-primary-foreground md:p-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-xs font-medium backdrop-blur">
              <Target className="h-3 w-3" /> Adaptive · Mock LET Format
            </div>
            <h2 className="mb-2 font-display text-2xl font-bold md:text-3xl">Ready when you are.</h2>
            <p className="max-w-md text-sm opacity-90 md:text-base">
              You'll get 150 multiple-choice questions across all major subjects. Difficulty changes as you go.
            </p>
          </div>
          <CardContent className="space-y-5 p-5 md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-muted text-primary">
                    <feature.icon className="h-4 w-4" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold">{feature.title}</p>
                    <p className="text-xs text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <MotivationalBanner variant="info" message="Tip: flag tricky items and revisit them before submitting." />

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="flex-1 gap-2" onClick={startNew} disabled={!ready}>
                <BookOpen className="h-4 w-4" /> Generate and Start Exam
              </Button>
              <Button asChild variant="outline" size="lg" className="flex-1">
                <Link to="/student">Back to dashboard</Link>
              </Button>
            </div>
            {!ready && (
              <p className="text-xs text-warning">Complete your profile first to unlock exam generation.</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="space-y-4 p-5">
            <h3 className="font-display font-semibold">Before you start</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary">•</span> Find a quiet, distraction-free spot.</li>
              <li className="flex gap-2"><span className="text-primary">•</span> Have scratch paper handy.</li>
              <li className="flex gap-2"><span className="text-primary">•</span> Take your time. Accuracy matters more than speed.</li>
              <li className="flex gap-2"><span className="text-primary">•</span> Your progress is saved automatically.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </StudentShell>
  );
}
