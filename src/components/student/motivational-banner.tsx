import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface MotivationalBannerProps {
  message: string;
  variant?: "success" | "info" | "warning";
  className?: string;
}

const variants = {
  success: "bg-success/10 text-success border-success/30",
  info: "bg-primary-muted text-primary border-primary/20",
  warning: "bg-warning/10 text-warning border-warning/30",
};

export function MotivationalBanner({ message, variant = "info", className }: MotivationalBannerProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium animate-in fade-in slide-in-from-bottom-2 duration-300",
        variants[variant],
        className,
      )}
    >
      <Sparkles className="h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
