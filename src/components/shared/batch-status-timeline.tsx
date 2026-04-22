import { CheckCircle2, AlertTriangle, XCircle, Circle } from "lucide-react";
import type { BatchTimelineEvent } from "@/lib/academic-mock";
import { cn } from "@/lib/utils";

const levelMap = {
  info: { icon: Circle, cls: "bg-primary-muted text-primary" },
  success: { icon: CheckCircle2, cls: "bg-success/15 text-success" },
  warning: { icon: AlertTriangle, cls: "bg-warning/15 text-warning" },
  error: { icon: XCircle, cls: "bg-destructive/15 text-destructive" },
};

export function BatchStatusTimeline({ events }: { events: BatchTimelineEvent[] }) {
  return (
    <ol className="relative space-y-4 pl-2">
      {events.map((event, idx) => {
        const cfg = levelMap[event.level];
        const Icon = cfg.icon;
        const isLast = idx === events.length - 1;
        return (
          <li key={event.id} className="relative flex gap-3 pb-1">
            <div className="flex flex-col items-center">
              <span className={cn("flex h-7 w-7 items-center justify-center rounded-full", cfg.cls)}>
                <Icon className="h-3.5 w-3.5" />
              </span>
              {!isLast && <span className="mt-1 w-px flex-1 bg-border" />}
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm font-medium leading-tight">{event.label}</p>
                <span className="shrink-0 text-xs text-muted-foreground">{event.at}</span>
              </div>
              {event.detail && <p className="mt-0.5 text-xs text-muted-foreground">{event.detail}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
