import { Link } from "react-router-dom";
import { AppShell } from "@/components/shell/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowRight, BookOpen, Clock, Target, Trophy } from "lucide-react";
import { StreakTracker } from "@/components/student/streak-tracker";
import { RankWidget } from "@/components/student/rank-widget";
import { MotivationalBanner } from "@/components/student/motivational-banner";
import { mockSessions, mockLeaderboard, weeklyActivity } from "@/lib/student-mock";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

export default function StudentDashboard() {
  const last = mockSessions[0];
  const me = mockLeaderboard.find((e) => e.isMe);

  return (
    <AppShell role="student">
      <PageHeader
        title="Welcome back, Juan 👋"
        description="Stay on track — your next mock exam is one tap away."
        actions={
          <Button asChild size="lg" className="gap-2">
            <Link to="/app/exam/start">
              <BookOpen className="h-4 w-4" /> Take a mock exam
            </Link>
          </Button>
        }
      />

      <MotivationalBanner
        variant="success"
        message="You're on a 7-day streak — keep it up to unlock the Marathoner badge!"
        className="mb-6"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Last score" value={`${last.score}/${last.total}`} icon={Target} accent="primary" hint={`${Math.round((last.score / last.total) * 100)}% accuracy`} />
        <StatCard label="Exams taken" value={me?.exams ?? 12} icon={BookOpen} accent="accent" trend={{ value: 12, label: "this month" }} />
        <StatCard label="Study time" value="14h" icon={Clock} accent="success" hint="this week" />
        <StatCard label="Leaderboard" value={`#${me?.rank ?? 4}`} icon={Trophy} accent="warning" hint="Top 25%" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <StreakTracker streak={me?.streak ?? 7} className="lg:col-span-1" />
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display">Weekly activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="minutes" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-display">Recent exams</CardTitle>
            <Button variant="ghost" size="sm" asChild className="gap-1">
              <Link to="/app/history">View all <ArrowRight className="h-3 w-3" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {mockSessions.slice(0, 4).map((s) => {
              const pct = Math.round((s.score / s.total) * 100);
              return (
                <Link
                  key={s.id}
                  to={`/app/results/${s.id}`}
                  className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-smooth"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{s.id} — {s.difficulty}</p>
                    <p className="text-xs text-muted-foreground">{s.date} · {s.duration}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-display font-bold">{s.score}/{s.total}</p>
                    <p className="text-xs text-muted-foreground">{pct}%</p>
                  </div>
                </Link>
              );
            })}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <RankWidget rank={me?.rank ?? 4} total={mockLeaderboard.length * 30} />
          <Card className="border-border/50">
            <CardHeader className="flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-display">Top this week</CardTitle>
              <Button variant="ghost" size="sm" asChild className="gap-1">
                <Link to="/app/leaderboard">All <ArrowRight className="h-3 w-3" /></Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {mockLeaderboard.slice(0, 3).map((e) => (
                <div key={e.rank} className="flex items-center gap-3">
                  <span className="w-5 text-center font-display font-bold text-sm text-muted-foreground">{e.rank}</span>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">{e.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{e.name}</p>
                  </div>
                  <span className="font-display font-bold text-sm">{e.score}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
