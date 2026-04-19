import { ArrowDown, ArrowRight, ArrowUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Difficulty } from "@/lib/student-mock";

interface DifficultyIndicatorProps {
  difficulty: Difficulty;
  trend?: "up" | "down" | "same";
  className?: string;
}

const colorMap: Record<Difficulty, string> = {
  Easy: "bg-success/10 text-success border-success/30",
  Medium: "bg-warning/10 text-warning border-warning/30",
  Hard: "bg-destructive/10 text-destructive border-destructive/30",
};

const trendIcon = {
  up: ArrowUp,
  down: ArrowDown,
  same: Minus,
};

export function DifficultyIndicator({ difficulty, trend, className }: DifficultyIndicatorProps) {
  const TrendIcon = trend ? trendIcon[trend] : ArrowRight;
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
        colorMap[difficulty],
        className,
      )}
    >
      <TrendIcon className="h-3 w-3" />
      <span>{difficulty}</span>
    </div>
  );
}
