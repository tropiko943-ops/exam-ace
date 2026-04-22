import { StudentShell } from "@/components/shell/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockLeaderboard } from "@/lib/student-mock";
import { mockAchievements } from "@/lib/student-mock";
import { mockAchievementEvents } from "@/lib/student-mastery-mock";
import { AchievementEventList } from "@/components/student/achievement-event-list";
import { Crown, Flame, Medal, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const podiumIcons = [Crown, Medal, Medal];
const podiumStyles = [
  "gradient-accent text-accent-foreground",
  "bg-muted text-foreground",
  "bg-warning/20 text-warning",
];

export default function Leaderboards() {
  const top3 = mockLeaderboard.slice(0, 3);
  const rest = mockLeaderboard.slice(3);
  const me = mockLeaderboard.find((e) => e.isMe);
  const unlockedBadges = mockAchievements.filter((a) => a.unlocked);

  return (
    <StudentShell>
      <PageHeader title="Leaderboards" description="Rankings, points, badges, and recent achievement events." />

      <Tabs defaultValue="weekly">
        <TabsList className="h-auto w-full justify-start overflow-x-auto rounded-xl">
          <TabsTrigger value="weekly">This week</TabsTrigger>
          <TabsTrigger value="monthly">This month</TabsTrigger>
          <TabsTrigger value="alltime">All time</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:gap-4">
        {[top3[1], top3[0], top3[2]].filter(Boolean).map((entry) => {
          const place = entry.rank;
          const Icon = podiumIcons[place - 1];
          return (
            <Card key={entry.rank} className={cn("overflow-hidden border-border/50", place === 1 && "sm:-translate-y-2")}>
              <CardContent className={cn("space-y-2 p-4 text-center md:p-6", place === 1 && "py-7")}>
                <div className={cn("mx-auto flex h-9 w-9 items-center justify-center rounded-xl", podiumStyles[place - 1])}>
                  <Icon className="h-5 w-5" />
                </div>
                <Avatar className={cn("mx-auto", place === 1 ? "h-16 w-16" : "h-12 w-12")}>
                  <AvatarFallback className="bg-primary font-semibold text-primary-foreground">{entry.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="truncate text-sm font-semibold">{entry.name.split(" ")[0]}</p>
                  <p className="font-display text-xl font-bold md:text-2xl">{entry.score}</p>
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">#{place}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.9fr)]">
        <Card className="border-border/50">
          <CardContent className="p-2 md:p-3">
            {rest.map((entry) => (
              <div
                key={entry.rank}
                className={cn(
                  "flex items-center gap-3 rounded-lg p-3",
                  entry.isMe && "bg-primary-muted/60 ring-1 ring-primary/20",
                )}
              >
                <span className="w-6 text-center font-display text-sm font-bold text-muted-foreground">{entry.rank}</span>
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary text-xs text-primary-foreground">{entry.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium">{entry.name}</p>
                    {entry.isMe && <Badge variant="outline" className="h-4 text-[10px]">You</Badge>}
                  </div>
                  <p className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Flame className="h-3 w-3 text-accent" />{entry.streak}</span>
                    <span>• {entry.exams} exams</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-display font-bold">{entry.score}</p>
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">score</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-border/50">
            <CardContent className="space-y-3 p-5">
              <div className="flex items-center justify-between">
                <p className="font-display text-sm font-semibold">Your badges</p>
                <span className="text-xs text-muted-foreground">{unlockedBadges.length} of {mockAchievements.length}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {mockAchievements.map((a) => (
                  <span
                    key={a.id}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
                      a.unlocked
                        ? "border-accent/40 bg-accent/15 text-accent"
                        : "border-border bg-secondary/60 text-muted-foreground",
                    )}
                  >
                    <Trophy className="h-3 w-3" />
                    {a.title}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <AchievementEventList events={mockAchievementEvents} />
        </div>
      </div>

      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
        <Trophy className="h-3 w-3" /> Rankings update after each completed mock exam.
      </p>
    </StudentShell>
  );
}
