import { Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface RankWidgetProps {
  rank: number;
  total: number;
  className?: string;
}

export function RankWidget({ rank, total, className }: RankWidgetProps) {
  const percentile = Math.max(1, Math.round(((total - rank) / total) * 100));
  return (
    <Card className={cn("border-border/50 bg-gradient-hero text-primary-foreground overflow-hidden relative", className)}>
      <CardContent className="p-5 space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-accent/20 backdrop-blur flex items-center justify-center">
            <Trophy className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide opacity-80">Your rank</p>
            <p className="font-display text-2xl font-bold">#{rank}<span className="text-sm font-normal opacity-70"> / {total}</span></p>
          </div>
        </div>
        <p className="text-xs opacity-80">Top {percentile}% of all students this week.</p>
      </CardContent>
    </Card>
  );
}
