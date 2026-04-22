import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Flame, Trophy, Sparkles, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AchievementEvent } from "@/lib/student-mastery-mock";

const typeMap: Record<AchievementEvent["type"], { icon: LucideIcon; cls: string }> = {
  badge: { icon: Award, cls: "bg-accent/15 text-accent" },
  streak: { icon: Flame, cls: "bg-warning/15 text-warning" },
  rank: { icon: Trophy, cls: "bg-primary-muted text-primary" },
  score: { icon: Sparkles, cls: "bg-success/10 text-success" },
};

export function AchievementEventList({ events, title = "Recent achievements" }: { events: AchievementEvent[]; title?: string }) {
  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle className="font-display text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {events.map((event) => {
          const cfg = typeMap[event.type];
          const Icon = cfg.icon;
          return (
            <div key={event.id} className="flex items-start gap-3 rounded-lg border border-border/60 p-3">
              <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", cfg.cls)}>
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-sm font-medium leading-tight">{event.title}</p>
                  <span className="shrink-0 text-[10px] uppercase tracking-wide text-muted-foreground">{event.at}</span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{event.detail}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
