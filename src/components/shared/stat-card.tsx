import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: { value: number; label?: string };
  hint?: string;
  className?: string;
  accent?: "primary" | "success" | "warning" | "accent";
}

const accentMap = {
  primary: "bg-primary/8 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  accent: "bg-accent/12 text-accent",
};

export function StatCard({ label, value, icon: Icon, trend, hint, className, accent = "primary" }: StatCardProps) {
  const isUp = trend && trend.value >= 0;
  return (
    <Card className={cn("transition-smooth hover:border-border", className)}>
      <CardContent className="flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[13px] font-medium text-muted-foreground">{label}</span>
          {Icon && (
            <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", accentMap[accent])}>
              <Icon className="h-4 w-4" />
            </div>
          )}
        </div>
        <div className="font-display text-[28px] font-semibold leading-none tracking-tight">{value}</div>
        {(trend || hint) && (
          <div className="flex items-center gap-1.5 text-xs">
            {trend && (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-medium",
                  isUp ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
                )}
              >
                {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(trend.value)}%
              </span>
            )}
            {(trend?.label || hint) && (
              <span className="text-muted-foreground">{trend?.label || hint}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
