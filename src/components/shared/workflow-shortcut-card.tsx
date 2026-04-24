import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkflowShortcutCardProps {
  to: string;
  icon: LucideIcon;
  title: string;
  description: string;
  meta?: string;
  accent?: "primary" | "accent" | "success" | "warning";
  className?: string;
}

const accentMap = {
  primary: "bg-primary/8 text-primary",
  accent: "bg-accent/12 text-accent",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
};

export function WorkflowShortcutCard({
  to,
  icon: Icon,
  title,
  description,
  meta,
  accent = "primary",
  className,
}: WorkflowShortcutCardProps) {
  return (
    <Link to={to} className={cn("group block focus-visible:outline-none", className)}>
      <Card className="h-full transition-smooth hover:border-foreground/12 hover:shadow-card focus-visible:ring-2 focus-visible:ring-ring">
        <CardContent className="flex h-full flex-col gap-4 p-5">
          <div className="flex items-start justify-between gap-3">
            <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", accentMap[accent])}>
              <Icon className="h-4 w-4" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground/60 transition-all group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-display text-[15px] font-semibold tracking-tight">{title}</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
          </div>
          {meta && <p className="mt-auto pt-2 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/80">{meta}</p>}
        </CardContent>
      </Card>
    </Link>
  );
}
