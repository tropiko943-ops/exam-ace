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
  searchPlaceholder = "Search...",
  searchValue,
  onSearchChange,
  children,
  actions,
  className,
}: FilterBarProps) {
  return (
    <div
      className={cn(
        "mb-4 flex flex-col gap-3 rounded-xl border border-border/60 bg-card p-3",
        "xl:flex-row xl:items-center",
        actions ? "xl:justify-between" : "xl:justify-start",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative min-w-0 flex-1 lg:max-w-xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchValue ?? ""}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="h-11 rounded-xl border-transparent bg-secondary/40 pl-9"
          />
        </div>

        {children && (
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:ml-auto lg:flex-nowrap lg:items-center lg:justify-end">
            {children}
          </div>
        )}
      </div>

      {actions && <div className="flex flex-wrap items-center gap-2 xl:justify-end">{actions}</div>}
    </div>
  );
}
