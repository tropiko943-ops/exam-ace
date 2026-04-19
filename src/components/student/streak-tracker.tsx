import { Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StreakTrackerProps {
  streak: number;
  weekDays?: boolean[]; // 7 booleans, Mon-Sun
  className?: string;
}

const labels = ["M", "T", "W", "T", "F", "S", "S"];

export function StreakTracker({ streak, weekDays = [true, true, true, true, false, true, true], className }: StreakTrackerProps) {
  return (
    <Card className={cn("border-border/50 overflow-hidden", className)}>
      <CardContent className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Current streak</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-display text-3xl font-bold tracking-tight">{streak}</span>
              <span className="text-sm text-muted-foreground">days</span>
            </div>
          </div>
          <div className="h-12 w-12 rounded-xl bg-gradient-accent flex items-center justify-center shadow-sm">
            <Flame className="h-6 w-6 text-accent-foreground" />
          </div>
        </div>
        <div className="flex items-center justify-between gap-1">
          {weekDays.map((active, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
              <div
                className={cn(
                  "h-8 w-full max-w-[34px] rounded-md flex items-center justify-center text-[10px] font-semibold transition-smooth",
                  active
                    ? "bg-gradient-accent text-accent-foreground shadow-sm"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {active && <Flame className="h-3.5 w-3.5" />}
              </div>
              <span className="text-[10px] text-muted-foreground font-medium">{labels[i]}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
