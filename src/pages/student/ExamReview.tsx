import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { StudentShell } from "@/components/shell/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { mockSessions } from "@/lib/student-mock";
import { generateMockExam } from "@/lib/student-mock";
import { CheckCircle2, Clock, Flag, Info, RotateCcw, Trophy, XCircle } from "lucide-react";
import { MotivationalBanner } from "@/components/student/motivational-banner";
import { cn } from "@/lib/utils";

interface LatestResult {
  id: string;
  score: number;
  total: number;
  answered: number;
  flagged: number;
  durationSec: number;
  answers: Record<number, "A" | "B" | "C" | "D">;
}

function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

export default function ExamReview() {
  const { examSession } = useParams();
  const [latest, setLatest] = useState<LatestResult | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("lastResult");
      if (raw) {
        const parsed: LatestResult = JSON.parse(raw);
        if (!examSession || parsed.id === examSession) setLatest(parsed);
      }
    } catch { /* ignore */ }
  }, [examSession]);

  const questions = useMemo(() => generateMockExam(150), []);

  const session = useMemo(() => {
    if (latest) {
      return {
        id: latest.id,
        date: new Date().toISOString().slice(0, 10),
        score: latest.score,
        total: latest.total,
        duration: formatDuration(latest.durationSec),
        difficulty: "Medium" as const,
        subjectBreakdown: mockSessions[0].subjectBreakdown,
      };
    }
    return mockSessions.find((entry) => entry.id === examSession) ?? mockSessions[0];
  }, [examSession, latest]);

  const percentage = Math.round((session.score / session.total) * 100);
  const passed = percentage >= 75;

  const items = useMemo(() => {
    return questions.map((q, i) => {
      const chosen = latest?.answers[i];
      const correct = q.answer;
      const status: "correct" | "wrong" | "skipped" = chosen ? (chosen === correct ? "correct" : "wrong") : "skipped";
      return { i, q, chosen, correct, status };
    });
  }, [latest, questions]);

  const counts = useMemo(() => ({
    correct: items.filter((i) => i.status === "correct").length,
    wrong: items.filter((i) => i.status === "wrong").length,
    skipped: items.filter((i) => i.status === "skipped").length,
  }), [items]);

  return (
    <StudentShell>
      <PageHeader
        title="Exam review"
        description={`${session.id} • ${session.date}`}
        actions={
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link to="/student/exams/history">All sessions</Link>
            </Button>
            <Button asChild className="w-full gap-2 sm:w-auto">
              <Link to="/student/exams"><RotateCcw className="h-4 w-4" /> Take another</Link>
            </Button>
          </div>
        }
      />

      {passed ? (
        <MotivationalBanner variant="success" message={`Outstanding. ${percentage}% accuracy puts you on the LET track.`} />
      ) : (
        <MotivationalBanner variant="info" message="Solid effort. Review the items below and try again." />
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="gradient-hero text-primary-foreground sm:col-span-2 xl:col-span-1">
          <CardContent className="space-y-2 p-5 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-white/12">
              <Trophy className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="mb-0.5 text-[11px] font-medium uppercase tracking-[0.14em] opacity-75">Final score</p>
              <p className="font-display text-4xl font-semibold tracking-tight">
                {session.score}<span className="text-xl opacity-70">/{session.total}</span>
              </p>
              <p className="mt-0.5 text-xs opacity-85">{percentage}% accuracy</p>
            </div>
          </CardContent>
        </Card>
        <StatCard label="Duration" value={session.duration} icon={Clock} accent="primary" />
        <StatCard label="Correct" value={counts.correct || session.score} icon={CheckCircle2} accent="success" />
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

      <Tabs defaultValue="all">
        <TabsList className="h-auto w-full justify-start overflow-x-auto rounded-xl">
          <TabsTrigger value="all">All ({items.length})</TabsTrigger>
          <TabsTrigger value="wrong">Wrong ({counts.wrong})</TabsTrigger>
          <TabsTrigger value="correct">Correct ({counts.correct})</TabsTrigger>
          <TabsTrigger value="skipped">Skipped ({counts.skipped})</TabsTrigger>
        </TabsList>

        {(["all", "wrong", "correct", "skipped"] as const).map((tab) => {
          const list = tab === "all" ? items : items.filter((i) => i.status === tab);
          return (
            <TabsContent key={tab} value={tab} className="mt-4">
              <Card className="border-border/50">
                <CardContent className="p-2 space-y-1">
                  {list.slice(0, 50).map((item) => (
                    <ReviewRow key={item.i} item={item} />
                  ))}
                  {list.length > 50 && (
                    <p className="p-3 text-center text-xs text-muted-foreground">Showing first 50 of {list.length} items.</p>
                  )}
                  {list.length === 0 && (
                    <p className="p-6 text-center text-sm text-muted-foreground">No items here.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </StudentShell>
  );
}

function ReviewRow({ item }: { item: ReturnType<() => any> }) {
  const { i, q, chosen, correct, status } = item;

  const statusCfg = {
    correct: { icon: CheckCircle2, cls: "bg-success/15 text-success" },
    wrong: { icon: XCircle, cls: "bg-destructive/15 text-destructive" },
    skipped: { icon: Info, cls: "bg-muted text-muted-foreground" },
  } as const;
  const cfg = statusCfg[status as keyof typeof statusCfg];
  const StatusIcon = cfg.icon;

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="flex w-full items-start gap-3 rounded-lg p-3 text-left transition-smooth hover:bg-secondary/50">
          <span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-bold", cfg.cls)}>
            <StatusIcon className="h-3.5 w-3.5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-xs font-mono text-muted-foreground">#{i + 1} · {q.subject}</span>
              <Badge variant="outline" className="text-[10px]">{q.difficulty}</Badge>
            </div>
            <p className="mt-1 line-clamp-2 text-sm font-medium">{q.text}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Your answer: <span className="font-semibold">{chosen ?? "—"}</span> · Correct: <span className="font-semibold">{correct}</span>
            </p>
          </div>
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-2xl">
          <DrawerHeader>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Question {i + 1}</Badge>
              <Badge variant="outline">{q.difficulty}</Badge>
              <span className="ml-auto text-xs text-muted-foreground">{q.subject} · {q.topic}</span>
            </div>
            <DrawerTitle className="text-left text-xl font-display">{q.text}</DrawerTitle>
            <DrawerDescription className="text-left">
              {status === "correct" ? "You answered this correctly." : status === "wrong" ? "You picked the wrong choice." : "You skipped this question."}
            </DrawerDescription>
          </DrawerHeader>
          <div className="space-y-2 px-4 pb-4">
            {q.choices.map((c: any) => {
              const isChosen = chosen === c.key;
              const isCorrect = c.key === correct;
              return (
                <div
                  key={c.key}
                  className={cn(
                    "rounded-lg border p-3 text-sm",
                    isCorrect && "border-success bg-success/10",
                    isChosen && !isCorrect && "border-destructive bg-destructive/10",
                    !isCorrect && !isChosen && "border-border/60",
                  )}
                >
                  <span className="font-display font-bold text-sm w-5 inline-block">{c.key}.</span> {c.text}
                  {isCorrect && <span className="ml-2 text-xs text-success">✓ correct</span>}
                  {isChosen && !isCorrect && <span className="ml-2 text-xs text-destructive">your pick</span>}
                </div>
              );
            })}
            <div className="rounded-lg border border-border/60 bg-secondary/40 p-3 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground mb-1">Explanation</p>
              <p>This item targets {q.subtopic.toLowerCase()} in {q.subject}. Review related concepts in your reviewer or revisit related topics on your mastery page.</p>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
