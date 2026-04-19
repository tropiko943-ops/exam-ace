import { cn } from "@/lib/utils";

interface ConfidenceBarProps {
  value: number; // 0-100
  className?: string;
  showLabel?: boolean;
}

export function ConfidenceBar({ value, className, showLabel = true }: ConfidenceBarProps) {
  const tone =
    value >= 85 ? "bg-success" : value >= 70 ? "bg-warning" : "bg-destructive";
  const text =
    value >= 85 ? "text-success" : value >= 70 ? "text-warning" : "text-destructive";

  return (
    <div className={cn("flex items-center gap-2 min-w-[120px]", className)}>
      <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
        <div className={cn("h-full transition-all", tone)} style={{ width: `${value}%` }} />
      </div>
      {showLabel && <span className={cn("text-xs font-semibold tabular-nums", text)}>{value}%</span>}
    </div>
  );
}
