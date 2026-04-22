import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Logo } from "@/components/brand/logo";
import { DifficultyIndicator } from "@/components/student/difficulty-indicator";
import { MotivationalBanner } from "@/components/student/motivational-banner";
import { generateMockExam, motivationalMessages, Difficulty } from "@/lib/student-mock";
import { ChevronLeft, ChevronRight, Clock, Flag, LayoutGrid, X } from "lucide-react";
import { cn } from "@/lib/utils";

const TOTAL = 150;
const DURATION_SEC = 3 * 60 * 60;
const ACTIVE_KEY = "dssc-active-exam";

type AnswerKey = "A" | "B" | "C" | "D";

type Persisted = {
  id: string;
  index: number;
  answers: Record<number, AnswerKey>;
  flagged: number[];
  startedAt: number;
};

function formatTime(s: number) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function loadPersisted(id: string): Persisted {
  try {
    const raw = sessionStorage.getItem(ACTIVE_KEY);
    if (raw) {
      const p = JSON.parse(raw);
      if (p.id === id) {
        return {
          id,
          index: p.index ?? 0,
          answers: p.answers ?? {},
          flagged: p.flagged ?? [],
          startedAt: p.startedAt ?? Date.now(),
        };
      }
    }
  } catch { /* ignore */ }
  const fresh: Persisted = { id, index: 0, answers: {}, flagged: [], startedAt: Date.now() };
  sessionStorage.setItem(ACTIVE_KEY, JSON.stringify(fresh));
  return fresh;
}

export default function ExamSession() {
  const navigate = useNavigate();
  const { examSession } = useParams();
  const sessionId = examSession ?? `S-${Date.now().toString().slice(-6)}`;
  const persisted = useMemo(() => loadPersisted(sessionId), [sessionId]);

  const questions = useMemo(() => generateMockExam(TOTAL), []);
  const [idx, setIdx] = useState(persisted.index);
  const [answers, setAnswers] = useState<Record<number, AnswerKey>>(persisted.answers);
  const [flagged, setFlagged] = useState<Set<number>>(new Set(persisted.flagged));
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  const [difficultyTrend, setDifficultyTrend] = useState<"up" | "down" | "same">("same");
  const elapsedAtMount = Math.floor((Date.now() - persisted.startedAt) / 1000);
  const [timeLeft, setTimeLeft] = useState(Math.max(0, DURATION_SEC - elapsedAtMount));
  const feedbackTimer = useRef<number | null>(null);

  const current = questions[idx];
  const answered = Object.keys(answers).length;

  // Persist on every meaningful change.
  useEffect(() => {
    sessionStorage.setItem(
      ACTIVE_KEY,
      JSON.stringify({
        id: sessionId,
        index: idx,
        answers,
        flagged: Array.from(flagged),
        startedAt: persisted.startedAt,
      }),
    );
  }, [sessionId, idx, answers, flagged, persisted.startedAt]);

  useEffect(() => {
    const t = window.setInterval(() => setTimeLeft((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    return () => {
      if (feedbackTimer.current) window.clearTimeout(feedbackTimer.current);
    };
  }, []);

  const select = (key: AnswerKey) => {
    if (answers[idx]) return;
    const correct = key === current.answer;
    const list = correct ? motivationalMessages.correct : motivationalMessages.incorrect;
    const msg = list[Math.floor(Math.random() * list.length)];
    setAnswers((a) => ({ ...a, [idx]: key }));
    setFeedback({ correct, message: msg });
    setDifficultyTrend(correct ? "up" : "down");

    if (feedbackTimer.current) window.clearTimeout(feedbackTimer.current);
    feedbackTimer.current = window.setTimeout(() => {
      setFeedback(null);
      if (idx < TOTAL - 1) setIdx((i) => i + 1);
    }, 1100);
  };

  const toggleFlag = () => {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const goTo = (i: number) => setIdx(Math.max(0, Math.min(TOTAL - 1, i)));

  const submit = () => {
    const correctCount = Object.entries(answers).filter(([i, a]) => questions[+i].answer === a).length;
    sessionStorage.setItem(
      "lastResult",
      JSON.stringify({
        id: sessionId,
        score: correctCount,
        total: TOTAL,
        answered,
        flagged: flagged.size,
        durationSec: DURATION_SEC - timeLeft,
        answers,
      }),
    );
    sessionStorage.removeItem(ACTIVE_KEY);
    navigate(`/student/exams/${sessionId}/review`);
  };

  const nextDifficulty: Difficulty = useMemo(() => {
    const last = answers[idx];
    if (!last) return current.difficulty;
    const wasCorrect = last === current.answer;
    if (wasCorrect) return current.difficulty === "Easy" ? "Medium" : "Hard";
    return current.difficulty === "Hard" ? "Medium" : "Easy";
  }, [answers, idx, current]);

  return (
    <div className="min-h-screen bg-secondary/20 flex flex-col">
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-lg border-b border-border">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-14 flex items-center gap-3">
          <Logo size="sm" variant="light" showText={false} />
          <span className="font-display font-semibold text-sm hidden sm:inline">Mock Exam · {sessionId}</span>
          <div className="ml-auto flex items-center gap-2 md:gap-3">
            <div className="flex items-center gap-1.5 text-sm font-mono tabular-nums bg-secondary px-2.5 py-1 rounded-md">
              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
              <span className={cn(timeLeft < 600 && "text-destructive font-semibold")}>{formatTime(timeLeft)}</span>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <LayoutGrid className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Navigator</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Question navigator</SheetTitle>
                </SheetHeader>
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-primary" /> Answered</div>
                    <div className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-warning" /> Flagged</div>
                    <div className="flex items-center gap-1.5"><span className="h-3 w-3 rounded border border-border" /> Empty</div>
                  </div>
                  <div className="grid grid-cols-8 gap-1.5 max-h-[60vh] overflow-y-auto pr-1">
                    {questions.map((_, i) => {
                      const isAnswered = !!answers[i];
                      const isFlagged = flagged.has(i);
                      const isCurrent = i === idx;
                      return (
                        <button
                          key={i}
                          onClick={() => goTo(i)}
                          className={cn(
                            "aspect-square rounded-md text-[11px] font-semibold transition-smooth border",
                            isCurrent && "ring-2 ring-ring ring-offset-1",
                            isAnswered && "bg-primary text-primary-foreground border-primary",
                            !isAnswered && isFlagged && "bg-warning/20 text-warning border-warning/40",
                            !isAnswered && !isFlagged && "border-border hover:bg-secondary",
                          )}
                        >
                          {i + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <X className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Exit exam?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Your progress for this session will be saved. You can resume later from the exam page.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Stay</AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Link to="/student">Save and exit</Link>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 md:px-6 pb-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
            <span>Question {idx + 1} of {TOTAL}</span>
            <span>{answered} answered · {flagged.size} flagged</span>
          </div>
          <Progress value={((idx + 1) / TOTAL) * 100} className="h-1.5" />
        </div>
      </header>

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 md:px-6 py-6 md:py-10 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <DifficultyIndicator difficulty={current.difficulty} trend={difficultyTrend} />
          <span className="text-xs text-muted-foreground">{current.subject} · {current.topic}</span>
          <Button
            variant={flagged.has(idx) ? "default" : "outline"}
            size="sm"
            onClick={toggleFlag}
            className="ml-auto gap-1.5"
          >
            <Flag className="h-3.5 w-3.5" />
            {flagged.has(idx) ? "Flagged" : "Flag"}
          </Button>
        </div>

        <Card className="border-border/50 shadow-sm">
          <CardContent className="p-5 md:p-7 space-y-5">
            <h2 className="font-display text-lg md:text-xl font-semibold leading-snug text-balance">{current.text}</h2>
            <RadioGroup
              value={answers[idx] ?? ""}
              onValueChange={(v) => select(v as AnswerKey)}
              className="space-y-2.5"
            >
              {current.choices.map((c) => {
                const selected = answers[idx] === c.key;
                const isCorrect = answers[idx] && c.key === current.answer;
                const isWrongPick = selected && c.key !== current.answer;
                return (
                  <Label
                    key={c.key}
                    htmlFor={`opt-${c.key}`}
                    className={cn(
                      "flex items-start gap-3 p-3.5 md:p-4 rounded-xl border cursor-pointer transition-smooth",
                      "hover:bg-secondary/50 hover:border-border",
                      selected && !answers[idx] && "border-primary bg-primary-muted/40",
                      isCorrect && "border-success bg-success/10",
                      isWrongPick && "border-destructive bg-destructive/10",
                      answers[idx] && !isCorrect && !isWrongPick && "opacity-60",
                    )}
                  >
                    <RadioGroupItem value={c.key} id={`opt-${c.key}`} className="mt-0.5" />
                    <div className="flex gap-2 min-w-0">
                      <span className="font-display font-bold text-sm w-5 shrink-0">{c.key}.</span>
                      <span className="text-sm leading-relaxed">{c.text}</span>
                    </div>
                  </Label>
                );
              })}
            </RadioGroup>

            {feedback && (
              <MotivationalBanner
                variant={feedback.correct ? "success" : "warning"}
                message={feedback.message}
              />
            )}
          </CardContent>
        </Card>

        {answers[idx] && (
          <p className="text-xs text-muted-foreground text-center">
            Next question difficulty: <span className="font-semibold">{nextDifficulty}</span>
          </p>
        )}
      </main>

      <footer className="sticky bottom-0 z-30 bg-background/95 backdrop-blur-lg border-t border-border">
        <div className="max-w-3xl mx-auto px-4 md:px-6 h-16 flex items-center gap-2">
          <Button variant="outline" onClick={() => goTo(idx - 1)} disabled={idx === 0} className="gap-1.5">
            <ChevronLeft className="h-4 w-4" /> <span className="hidden sm:inline">Previous</span>
          </Button>
          {idx < TOTAL - 1 ? (
            <Button onClick={() => goTo(idx + 1)} className="gap-1.5 ml-auto">
              <span className="hidden sm:inline">Next</span> <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="ml-auto bg-success hover:bg-success/90 text-success-foreground">Submit exam</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Submit your exam?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You answered {answered} of {TOTAL} questions. {flagged.size > 0 && `You have ${flagged.size} flagged item(s).`}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Review more</AlertDialogCancel>
                  <AlertDialogAction onClick={submit}>Submit</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          {idx < TOTAL - 1 && answered > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden md:inline-flex">Submit early</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Submit before finishing?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Unanswered items will be marked incorrect.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Continue exam</AlertDialogCancel>
                  <AlertDialogAction onClick={submit}>Submit now</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </footer>
    </div>
  );
}
