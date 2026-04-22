import { Link } from "react-router-dom";
import { StudentShell } from "@/components/shell/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { ProfileReadinessCard } from "@/components/shared/profile-readiness-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowRight, BookOpen, Clock, Target, Trophy } from "lucide-react";
import { StreakTracker } from "@/components/student/streak-tracker";
import { RankWidget } from "@/components/student/rank-widget";
import { MotivationalBanner } from "@/components/student/motivational-banner";
import { mockSessions, mockLeaderboard, weeklyActivity } from "@/lib/student-mock";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { loadProfile } from "@/lib/profile-storage";

export default function StudentDashboard() {
  const profile = loadProfile();
  const last = mockSessions[0];
  const me = mockLeaderboard.find((entry) => entry.isMe);
  const accuracy = Math.round((last.score / last.total) * 100);
  const ready = profile.readinessPercent >= 100;

  return (
    <StudentShell userName={profile.fullName}>
      <PageHeader
        title={`Welcome back, ${profile.fullName.split(" ")[0]}`}
        description="Stay on track. Your next mock exam is one tap away."
        actions={
          <Button asChild={ready} size="lg" className="w-full gap-2 sm:w-auto" disabled={!ready}>
            {ready ? (
              <Link to="/student/exams">
                <BookOpen className="h-4 w-4" /> Start Mock Exam
              </Link>
            ) : (
              <span className="flex items-center gap-2"><BookOpen className="h-4 w-4" /> Start Mock Exam</span>
            )}
          </Button>
        }
      />

      <ProfileReadinessCard percent={profile.readinessPercent} missing={profile.missingFields} />

      {ready && (
        <MotivationalBanner
          variant="success"
          message="You're on a 7-day streak. Keep it up to unlock the Marathoner badge."
        />
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Last score" value={`${last.score}/${last.total}`} icon={Target} accent="primary" hint={`${accuracy}% accuracy`} />
        <StatCard label="Exams taken" value={me?.exams ?? 12} icon={BookOpen} accent="accent" trend={{ value: 12, label: "this month" }} />
        <StatCard label="Study time" value="14h" icon={Clock} accent="success" hint="this week" />
        <StatCard label="Leaderboard" value={`#${me?.rank ?? 4}`} icon={Trophy} accent="warning" hint="Top 25%" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.9fr)]">
        <div className="space-y-4">
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-display">Weekly activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
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

          <Card className="border-border/50">
            <CardHeader className="flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-display">Recent exams</CardTitle>
              <Button variant="ghost" size="sm" asChild className="gap-1">
                <Link to="/student/exams/history">View all <ArrowRight className="h-3 w-3" /></Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {mockSessions.slice(0, 4).map((session) => {
                const percentage = Math.round((session.score / session.total) * 100);
                return (
                  <Link
                    key={session.id}
                    to={`/student/exams/${session.id}/review`}
                    className="flex items-center justify-between gap-3 rounded-xl p-3 transition-smooth hover:bg-secondary/50"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{session.id} - {session.difficulty}</p>
                      <p className="text-xs text-muted-foreground">{session.date} • {session.duration}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-display font-bold">{session.score}/{session.total}</p>
                      <p className="text-xs text-muted-foreground">{percentage}%</p>
                    </div>
                  </Link>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <StreakTracker streak={me?.streak ?? 7} />
          <RankWidget rank={me?.rank ?? 4} total={mockLeaderboard.length * 30} />
          <Card className="border-border/50">
            <CardHeader className="flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-display">Top this week</CardTitle>
              <Button variant="ghost" size="sm" asChild className="gap-1">
                <Link to="/student/leaderboards">All <ArrowRight className="h-3 w-3" /></Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {mockLeaderboard.slice(0, 3).map((entry) => (
                <div key={entry.rank} className="flex items-center gap-3">
                  <span className="w-5 text-center font-display text-sm font-bold text-muted-foreground">{entry.rank}</span>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-xs text-primary-foreground">{entry.initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{entry.name}</p>
                  </div>
                  <span className="font-display text-sm font-bold">{entry.score}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </StudentShell>
  );
}
