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
  pending: { label: "Pending", cls: "bg-muted text-muted-foreground border-border" },
  processing: { label: "Processing", cls: "bg-primary-muted text-primary border-primary/20" },
  ready: { label: "Ready for review", cls: "bg-warning/15 text-warning border-warning/30" },
  approved: { label: "Approved", cls: "bg-success/15 text-success border-success/30" },
  rejected: { label: "Rejected", cls: "bg-destructive/15 text-destructive border-destructive/30" },
  archived: { label: "Archived", cls: "bg-muted text-muted-foreground border-border" },
  active: { label: "Active", cls: "bg-success/15 text-success border-success/30" },
  failed: { label: "Failed", cls: "bg-destructive/15 text-destructive border-destructive/30" },
  draft: { label: "Draft", cls: "bg-secondary text-secondary-foreground border-border" },
  queued: { label: "Queued", cls: "bg-accent/15 text-accent border-accent/30" },
  cancelled: { label: "Cancelled", cls: "bg-muted text-muted-foreground border-border" },
};

export function StatusBadge({ status, label, className }: { status: Status; label?: string; className?: string }) {
  const cfg = map[status];
  return (
    <Badge variant="outline" className={cn("font-medium border", cfg.cls, className)}>
      {label ?? cfg.label}
    </Badge>
  );
}
