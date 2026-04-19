import { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (v: string) => void;
  children?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function FilterBar({
  searchPlaceholder = "Search…",
  searchValue,
  onSearchChange,
  children,
  actions,
  className,
}: FilterBarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between rounded-lg border border-border/60 bg-card p-3 mb-4",
        className,
      )}
    >
      <div className="flex flex-col sm:flex-row gap-2 flex-1 min-w-0">
        <div className="relative flex-1 min-w-0 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchValue ?? ""}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="pl-9 bg-secondary/40 border-transparent"
          />
        </div>
        {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
