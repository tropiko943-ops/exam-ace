import { LucideIcon, Inbox, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  variant?: "default" | "error";
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
  variant = "default",
}: EmptyStateProps) {
  const isError = variant === "error";
  const FinalIcon = isError ? AlertTriangle : Icon;

  return (
    <div className={cn("flex flex-col items-center justify-center text-center py-12 px-6", className)}>
      <div
        className={cn(
          "h-16 w-16 rounded-full flex items-center justify-center mb-4",
          isError ? "bg-destructive/10 text-destructive" : "bg-primary-muted text-primary",
        )}
      >
        <FinalIcon className="h-7 w-7" />
      </div>
      <h3 className="font-display text-lg font-semibold mb-1">{title}</h3>
      {description && <p className="text-sm text-muted-foreground max-w-sm mb-5">{description}</p>}
      {action}
    </div>
  );
}

export function ErrorState(props: Omit<EmptyStateProps, "variant">) {
  return <EmptyState {...props} variant="error" />;
}

export function RetryAction({ onRetry }: { onRetry: () => void }) {
  return (
    <Button variant="outline" onClick={onRetry}>
      Try again
    </Button>
  );
}
