import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function DataTableShell({ children, className }: { children: ReactNode; className?: string }) {
  return <Card className={cn("overflow-hidden border-border/60", className)}>{children}</Card>;
}
