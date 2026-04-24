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
    sm: { icon: "h-7 w-7", text: "text-[15px]" },
    md: { icon: "h-8 w-8", text: "text-base" },
    lg: { icon: "h-10 w-10", text: "text-lg" },
  };
  const s = sizes[size];

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-lg",
          s.icon,
          variant === "light"
            ? "bg-white/15 text-white backdrop-blur-sm"
            : "bg-primary text-primary-foreground",
        )}
      >
        <GraduationCap className="h-1/2 w-1/2" />
      </div>
      {showText && (
        <span className={cn("font-display font-semibold tracking-tight", s.text)}>DSSC Reviewer</span>
      )}
    </div>
  );
}
