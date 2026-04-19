import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppShell } from "@/components/shell/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { mockSessions } from "@/lib/student-mock";
import { CheckCircle2, Clock, Flag, RotateCcw, Trophy } from "lucide-react";
import { MotivationalBanner } from "@/components/student/motivational-banner";

interface LatestResult {
  score: number;
  total: number;
  answered: number;
  flagged: number;
  durationSec: number;
}

function fmtDuration(s: number) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `${h}h ${m}m`;
}

export default function ExamResults() {
  const { id } = useParams();
  const [latest, setLatest] = useState<LatestResult | null>(null);

  useEffect(() => {
    if (id === "latest") {
      const raw = sessionStorage.getItem("lastResult");
      if (raw) setLatest(JSON.parse(raw));
    }
  }, [id]);

  const session = useMemo(() => {
    if (id === "latest" && latest) {
      return {
        id: "S-NEW",
        date: new Date().toISOString().slice(0, 10),
        score: latest.score,
        total: latest.total,
        duration: fmtDuration(latest.durationSec),
        difficulty: "Medium" as const,
        subjectBreakdown: mockSessions[0].subjectBreakdown,
      };
    }
    return mockSessions.find((s) => s.id === id) ?? mockSessions[0];
  }, [id, latest]);

  const pct = Math.round((session.score / session.total) * 100);
  const passed = pct >= 75;

  return (
    <AppShell role="student">
      <PageHeader
        title="Exam results"
        description={`${session.id} · ${session.date}`}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/app/history">All sessions</Link>
            </Button>
            <Button asChild className="gap-2">
              <Link to="/app/exam/start"><RotateCcw className="h-4 w-4" /> Take another</Link>
            </Button>
          </div>
        }
      />

      {passed ? (
        <MotivationalBanner variant="success" message={`Outstanding — ${pct}% accuracy puts you on the LET track!`} className="mb-6" />
      ) : (
        <MotivationalBanner variant="info" message="Solid effort. Review the weakest subjects and try again." className="mb-6" />
      )}

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <Card className="lg:col-span-1 border-border/50 bg-gradient-hero text-primary-foreground">
          <CardContent className="p-6 text-center space-y-3">
            <div className="h-14 w-14 mx-auto rounded-2xl bg-accent/20 backdrop-blur flex items-center justify-center">
              <Trophy className="h-7 w-7 text-accent" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide opacity-80 mb-1">Final score</p>
              <p className="font-display text-5xl font-bold">{session.score}<span className="text-2xl opacity-70">/{session.total}</span></p>
              <p className="text-sm opacity-90 mt-1">{pct}% accuracy</p>
            </div>
          </CardContent>
        </Card>
        <div className="lg:col-span-2 grid sm:grid-cols-3 gap-4">
          <StatCard label="Duration" value={session.duration} icon={Clock} accent="primary" />
          <StatCard label="Correct" value={session.score} icon={CheckCircle2} accent="success" />
          <StatCard label="Difficulty" value={session.difficulty} icon={Flag} accent="warning" />
        </div>
      </div>

      <Card className="border-border/50 mb-6">
        <CardHeader><CardTitle className="text-base font-display">Performance by subject</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {session.subjectBreakdown.map((s) => {
            const p = Math.round((s.correct / s.total) * 100);
            return (
              <div key={s.subject} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{s.subject}</span>
                  <span className="text-muted-foreground">{s.correct}/{s.total} · {p}%</span>
                </div>
                <Progress value={p} className="h-2" />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </AppShell>
  );
}
