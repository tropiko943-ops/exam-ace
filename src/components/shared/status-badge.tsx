import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Status =
  | "pending"
  | "processing"
  | "ready"
  | "approved"
  | "rejected"
  | "archived"
  | "active"
  | "failed"
  | "draft"
  | "queued"
  | "cancelled";

const map: Record<Status, { label: string; cls: string }> = {
  pending:    { label: "Pending",    cls: "bg-muted text-muted-foreground border-border" },
  processing: { label: "Processing", cls: "bg-primary/8 text-primary border-primary/20" },
  ready:      { label: "Ready",      cls: "bg-warning/12 text-warning border-warning/25" },
  approved:   { label: "Approved",   cls: "bg-success/10 text-success border-success/25" },
  rejected:   { label: "Rejected",   cls: "bg-destructive/10 text-destructive border-destructive/25" },
  archived:   { label: "Archived",   cls: "bg-muted text-muted-foreground border-border" },
  active:     { label: "Active",     cls: "bg-success/10 text-success border-success/25" },
  failed:     { label: "Failed",     cls: "bg-destructive/10 text-destructive border-destructive/25" },
  draft:      { label: "Draft",      cls: "bg-secondary text-secondary-foreground border-border" },
  queued:     { label: "Queued",     cls: "bg-accent/12 text-accent border-accent/25" },
  cancelled:  { label: "Cancelled",  cls: "bg-muted text-muted-foreground border-border" },
};

export function StatusBadge({ status, label, className }: { status: Status; label?: string; className?: string }) {
  const cfg = map[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-medium",
        cfg.cls,
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {label ?? cfg.label}
    </span>
  );
}
