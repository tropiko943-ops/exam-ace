import { AppShell } from "@/components/shell/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockLeaderboard } from "@/lib/student-mock";
import { Crown, Flame, Medal, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const podiumIcons = [Crown, Medal, Medal];
const podiumStyles = [
  "bg-gradient-accent text-accent-foreground",
  "bg-muted text-foreground",
  "bg-warning/20 text-warning",
];

export default function Leaderboard() {
  const top3 = mockLeaderboard.slice(0, 3);
  const rest = mockLeaderboard.slice(3);

  return (
    <AppShell role="student">
      <PageHeader title="Leaderboard" description="See how you stack up against your classmates." />

      <Tabs defaultValue="weekly" className="mb-6">
        <TabsList>
          <TabsTrigger value="weekly">This week</TabsTrigger>
          <TabsTrigger value="monthly">This month</TabsTrigger>
          <TabsTrigger value="alltime">All time</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Podium */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
        {[top3[1], top3[0], top3[2]].filter(Boolean).map((entry, i) => {
          const place = entry.rank;
          const Icon = podiumIcons[place - 1];
          return (
            <Card
              key={entry.rank}
              className={cn(
                "border-border/50 overflow-hidden",
                place === 1 && "md:-translate-y-3",
              )}
            >
              <CardContent className={cn("p-4 md:p-6 text-center space-y-2", place === 1 && "py-7")}>
                <div className={cn("h-9 w-9 mx-auto rounded-xl flex items-center justify-center", podiumStyles[place - 1])}>
                  <Icon className="h-5 w-5" />
                </div>
                <Avatar className={cn("mx-auto", place === 1 ? "h-16 w-16" : "h-12 w-12")}>
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold">{entry.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm truncate">{entry.name.split(" ")[0]}</p>
                  <p className="font-display text-xl md:text-2xl font-bold">{entry.score}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">#{place}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-border/50">
        <CardContent className="p-2 md:p-3">
          {rest.map((e) => (
            <div
              key={e.rank}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg",
                e.isMe && "bg-primary-muted/60 ring-1 ring-primary/20",
              )}
            >
              <span className="w-6 text-center font-display font-bold text-sm text-muted-foreground">{e.rank}</span>
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">{e.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">{e.name}</p>
                  {e.isMe && <Badge variant="outline" className="text-[10px] h-4">You</Badge>}
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <span className="inline-flex items-center gap-1"><Flame className="h-3 w-3 text-accent" />{e.streak}</span>
                  <span>· {e.exams} exams</span>
                </p>
              </div>
              <div className="text-right">
                <p className="font-display font-bold">{e.score}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">score</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <p className="mt-4 text-xs text-muted-foreground text-center flex items-center justify-center gap-1.5">
        <Trophy className="h-3 w-3" /> Rankings update after each completed mock exam.
      </p>
    </AppShell>
  );
}
