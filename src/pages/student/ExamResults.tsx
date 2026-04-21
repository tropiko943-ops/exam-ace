import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { StudentShell } from "@/components/shell/app-shell";
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

function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
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
        duration: formatDuration(latest.durationSec),
        difficulty: "Medium" as const,
        subjectBreakdown: mockSessions[0].subjectBreakdown,
      };
    }

    return mockSessions.find((entry) => entry.id === id) ?? mockSessions[0];
  }, [id, latest]);

  const percentage = Math.round((session.score / session.total) * 100);
  const passed = percentage >= 75;

  return (
    <StudentShell>
      <PageHeader
        title="Exam results"
        description={`${session.id} • ${session.date}`}
        actions={
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link to="/app/history">All sessions</Link>
            </Button>
            <Button asChild className="w-full gap-2 sm:w-auto">
              <Link to="/app/exam/start"><RotateCcw className="h-4 w-4" /> Take another</Link>
            </Button>
          </div>
        }
      />

      {passed ? (
        <MotivationalBanner variant="success" message={`Outstanding. ${percentage}% accuracy puts you on the LET track.`} />
      ) : (
        <MotivationalBanner variant="info" message="Solid effort. Review the weakest subjects and try again." />
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="border-border/50 gradient-hero text-primary-foreground sm:col-span-2 xl:col-span-1">
          <CardContent className="space-y-3 p-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/20 backdrop-blur">
              <Trophy className="h-7 w-7 text-accent" />
            </div>
            <div>
              <p className="mb-1 text-xs uppercase tracking-wide opacity-80">Final score</p>
              <p className="font-display text-5xl font-bold">
                {session.score}
                <span className="text-2xl opacity-70">/{session.total}</span>
              </p>
              <p className="mt-1 text-sm opacity-90">{percentage}% accuracy</p>
            </div>
          </CardContent>
        </Card>
        <StatCard label="Duration" value={session.duration} icon={Clock} accent="primary" />
        <StatCard label="Correct" value={session.score} icon={CheckCircle2} accent="success" />
        <StatCard label="Difficulty" value={session.difficulty} icon={Flag} accent="warning" />
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base font-display">Performance by subject</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {session.subjectBreakdown.map((subject) => {
            const subjectPercentage = Math.round((subject.correct / subject.total) * 100);
            return (
              <div key={subject.subject} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{subject.subject}</span>
                  <span className="text-muted-foreground">{subject.correct}/{subject.total} • {subjectPercentage}%</span>
                </div>
                <Progress value={subjectPercentage} className="h-2" />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </StudentShell>
  );
}
