import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: "default" | "light";
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, showText = true, variant = "default", size = "md" }: LogoProps) {
  const sizes = {
    sm: { icon: "h-7 w-7", text: "text-base", sub: "text-[10px]" },
    md: { icon: "h-9 w-9", text: "text-lg", sub: "text-xs" },
    lg: { icon: "h-12 w-12", text: "text-2xl", sub: "text-sm" },
  };
  const s = sizes[size];

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-lg shadow-sm",
          s.icon,
          variant === "light" ? "bg-white/10 text-white backdrop-blur" : "gradient-hero text-primary-foreground",
        )}
      >
        <GraduationCap className="h-1/2 w-1/2" />
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={cn("font-display font-bold tracking-tight", s.text)}>DSSC Reviewer</span>
          <span className={cn("font-medium uppercase tracking-wider text-muted-foreground", s.sub)}>
            Mock Exam Platform
          </span>
        </div>
      )}
    </div>
  );
}
