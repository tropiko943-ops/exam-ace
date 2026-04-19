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
  primary: "bg-primary-muted text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  accent: "bg-accent/10 text-accent",
};

export function StatCard({ label, value, icon: Icon, trend, hint, className, accent = "primary" }: StatCardProps) {
  const isUp = trend && trend.value >= 0;
  return (
    <Card className={cn("border-border/50 hover:shadow-md transition-smooth", className)}>
      <CardContent className="p-6 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          {Icon && (
            <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center", accentMap[accent])}>
              <Icon className="h-4.5 w-4.5" />
            </div>
          )}
        </div>
        <div className="font-display text-3xl font-bold tracking-tight">{value}</div>
        <div className="flex items-center gap-2 text-xs">
          {trend && (
            <span
              className={cn(
                "inline-flex items-center gap-1 font-medium",
                isUp ? "text-success" : "text-destructive",
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
      </CardContent>
    </Card>
  );
}
