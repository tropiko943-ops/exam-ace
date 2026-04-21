import { useMemo, useState } from "react";
import { SuperAdminShell } from "@/components/shell/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { FilterBar } from "@/components/shared/filter-bar";
import { DataTableShell } from "@/components/shared/data-table-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Download, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { mockLogs } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const levelMap = {
  info: { icon: Info, cls: "text-primary bg-primary-muted border-primary/20" },
  warning: { icon: AlertTriangle, cls: "text-warning bg-warning/10 border-warning/30" },
  error: { icon: AlertCircle, cls: "text-destructive bg-destructive/10 border-destructive/30" },
};

export default function SuperAdminLogs() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("all");

  const filtered = useMemo(
    () =>
      mockLogs.filter((l) => {
        const matchSearch = !search || JSON.stringify(l).toLowerCase().includes(search.toLowerCase());
        const matchLevel = level === "all" || l.level === level;
        return matchSearch && matchLevel;
      }),
    [search, level],
  );

  return (
    <SuperAdminShell userName="Dr. Reyes">
      <PageHeader
        title="System logs & audit"
        description="Track user actions, security events, and system activity."
        actions={
          <Button variant="outline"><Download className="h-4 w-4" />Export logs</Button>
        }
      />

      <FilterBar
        searchPlaceholder="Search actions, actors, entities…"
        searchValue={search}
        onSearchChange={setSearch}
      >
        <Select value={level} onValueChange={setLevel}>
          <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All levels</SelectItem>
            <SelectItem value="info">Info</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="7d">
          <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </FilterBar>

      <DataTableShell>
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/40 hover:bg-secondary/40">
              <TableHead>Timestamp</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Actor</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Entity</TableHead>
              <TableHead>IP address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((l) => {
              const cfg = levelMap[l.level];
              const Icon = cfg.icon;
              return (
                <TableRow key={l.id}>
                  <TableCell className="font-mono text-xs whitespace-nowrap">{l.timestamp}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("gap-1 border", cfg.cls)}>
                      <Icon className="h-3 w-3" />
                      {l.level}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{l.actor}</TableCell>
                  <TableCell className="text-sm font-medium">{l.action}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{l.entity}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{l.ip}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </DataTableShell>
    </SuperAdminShell>
  );
}
