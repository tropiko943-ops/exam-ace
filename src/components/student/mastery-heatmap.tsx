import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MasteryRow } from "@/lib/student-mastery-mock";

const trendIcon = {
  up: TrendingUp,
  down: TrendingDown,
  flat: Minus,
};

const trendCls = {
  up: "text-success",
  down: "text-destructive",
  flat: "text-muted-foreground",
};

function masteryTone(value: number) {
  if (value >= 80) return "bg-success";
  if (value >= 60) return "bg-primary";
  if (value >= 40) return "bg-warning";
  return "bg-destructive";
}

export function MasteryHeatmap({ rows, title = "Topic mastery", description }: { rows: MasteryRow[]; title?: string; description?: string }) {
  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle className="font-display text-lg">{title}</CardTitle>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent className="space-y-3">
        {rows.map((row) => {
          const Icon = trendIcon[row.trend];
          return (
            <div key={row.id} className="space-y-1.5">
              <div className="flex items-center justify-between gap-3 text-sm">
                <div className="min-w-0">
                  <p className="truncate font-medium">{row.topic}</p>
                  <p className="text-xs text-muted-foreground">{row.subject} · {row.attempts} attempts · {row.lastSeen}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={cn("inline-flex items-center gap-1 text-xs font-medium", trendCls[row.trend])}>
                    <Icon className="h-3 w-3" />
                  </span>
                  <span className="font-display text-sm font-bold tabular-nums">{row.mastery}%</span>
                </div>
              </div>
              <div className="relative h-2 overflow-hidden rounded-full bg-secondary">
                <div className={cn("h-full rounded-full transition-all", masteryTone(row.mastery))} style={{ width: `${row.mastery}%` }} />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
