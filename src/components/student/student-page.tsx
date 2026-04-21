import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StudentHeroProps {
  title: string;
  description?: string;
  eyebrow?: string;
  badge?: string;
  actions?: ReactNode;
  aside?: ReactNode;
  className?: string;
}

export function StudentHero({
  title,
  description,
  eyebrow,
  badge,
  actions,
  aside,
  className,
}: StudentHeroProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden border-border/60 bg-gradient-to-br from-primary via-primary to-primary-glow text-primary-foreground shadow-lg shadow-primary/10",
        className,
      )}
    >
      <CardContent className="p-4 sm:p-5 lg:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              {eyebrow && (
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-foreground/70">
                  {eyebrow}
                </span>
              )}
              {badge && (
                <Badge className="rounded-full border-0 bg-white/12 px-2.5 py-1 text-[11px] font-medium text-primary-foreground hover:bg-white/12">
                  {badge}
                </Badge>
              )}
            </div>
            <div className="space-y-2">
              <h1 className="max-w-2xl text-balance font-display text-2xl font-bold tracking-tight sm:text-3xl">
                {title}
              </h1>
              {description && (
                <p className="max-w-2xl text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
                  {description}
                </p>
              )}
            </div>
            {actions && <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">{actions}</div>}
          </div>
          {aside && <div className="shrink-0">{aside}</div>}
        </div>
      </CardContent>
    </Card>
  );
}

interface StudentSectionHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function StudentSectionHeader({ title, description, action, className }: StudentSectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="min-w-0 space-y-1">
        <h2 className="font-display text-lg font-semibold tracking-tight sm:text-xl">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
