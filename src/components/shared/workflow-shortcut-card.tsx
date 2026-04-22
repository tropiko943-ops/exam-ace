import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, type LucideIcon } from "lucide-react";
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
  primary: "bg-primary-muted text-primary",
  accent: "bg-accent/15 text-accent",
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
      <Card className="h-full border-border/60 transition-smooth hover:border-primary/40 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring">
        <CardContent className="flex h-full flex-col gap-4 p-5">
          <div className="flex items-start justify-between gap-3">
            <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", accentMap[accent])}>
              <Icon className="h-5 w-5" />
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </div>
          <div className="space-y-1">
            <h3 className="font-display font-semibold tracking-tight">{title}</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
          </div>
          {meta && (
            <p className="mt-auto pt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {meta}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
