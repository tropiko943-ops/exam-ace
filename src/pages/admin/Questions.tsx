import { useMemo, useState } from "react";
import { AdminShell } from "@/components/shell/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { FilterBar } from "@/components/shared/filter-bar";
import { DataTableShell } from "@/components/shared/data-table-shell";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter,
} from "@/components/ui/sheet";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Archive, ArchiveRestore, Eye, MoreHorizontal, Plus } from "lucide-react";
import { mockBank, BankQuestion } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const diffMap = {
  Easy: "bg-success/15 text-success border-success/30",
  Medium: "bg-warning/15 text-warning border-warning/30",
  Hard: "bg-destructive/15 text-destructive border-destructive/30",
};

export default function AdminQuestions() {
  const [items, setItems] = useState<BankQuestion[]>(mockBank);
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [status, setStatus] = useState("active");
  const [selected, setSelected] = useState<string[]>([]);
  const [preview, setPreview] = useState<BankQuestion | null>(null);

  const subjects = useMemo(() => Array.from(new Set(items.map((i) => i.subject))), [items]);

  const filtered = useMemo(
    () =>
      items.filter((i) => {
        if (search && !i.text.toLowerCase().includes(search.toLowerCase())) return false;
        if (subject !== "all" && i.subject !== subject) return false;
        if (difficulty !== "all" && i.difficulty !== difficulty) return false;
        if (status !== "all" && i.status !== status) return false;
        return true;
      }),
    [items, search, subject, difficulty, status],
  );

  const allChecked = filtered.length > 0 && filtered.every((u) => selected.includes(u.id));
  const toggleAll = () =>
    setSelected(allChecked ? selected.filter((id) => !filtered.some((u) => u.id === id)) : Array.from(new Set([...selected, ...filtered.map((u) => u.id)])));

  const archive = (id: string) => {
    setItems(items.map((i) => (i.id === id ? { ...i, status: "archived" } : i)));
    toast.success("Question archived");
  };
  const reactivate = (id: string) => {
    setItems(items.map((i) => (i.id === id ? { ...i, status: "active" } : i)));
    toast.success("Question reactivated");
  };

  return (
    <AdminShell userName="Maria Santos">
      <PageHeader
        title="Question bank"
        description="Browse, classify, archive and reactivate questions across subjects."
        actions={<Button asChild><Link to="/app/ocr"><Plus className="h-4 w-4" />Add questions</Link></Button>}
      />

      <FilterBar
        searchPlaceholder="Search question text or ID…"
        searchValue={search}
        onSearchChange={setSearch}
      >
        <Select value={subject} onValueChange={setSubject}>
          <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All subjects</SelectItem>
            {subjects.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={difficulty} onValueChange={setDifficulty}>
          <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All levels</SelectItem>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </FilterBar>

      {selected.length > 0 && (
        <div className="flex items-center justify-between rounded-lg bg-primary-muted/60 border border-primary/20 px-4 py-2 mb-3">
          <span className="text-sm font-medium">{selected.length} selected</span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline"><Archive className="h-4 w-4" />Archive selected</Button>
            <Button size="sm" variant="outline" onClick={() => setSelected([])}>Clear</Button>
          </div>
        </div>
      )}

      <DataTableShell>
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/40 hover:bg-secondary/40">
              <TableHead className="w-10"><Checkbox checked={allChecked} onCheckedChange={toggleAll} /></TableHead>
              <TableHead>Question</TableHead>
              <TableHead>Subject / Topic</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Uses</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((q) => (
              <TableRow key={q.id} className="cursor-pointer" onClick={() => setPreview(q)}>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selected.includes(q.id)}
                    onCheckedChange={() => setSelected(selected.includes(q.id) ? selected.filter((s) => s !== q.id) : [...selected, q.id])}
                  />
                </TableCell>
                <TableCell className="max-w-md">
                  <div className="font-medium line-clamp-1">{q.text}</div>
                  <div className="text-xs text-muted-foreground font-mono">{q.id}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{q.subject}</div>
                  <div className="text-xs text-muted-foreground">{q.topic} · {q.subtopic}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("border", diffMap[q.difficulty])}>{q.difficulty}</Badge>
                </TableCell>
                <TableCell><StatusBadge status={q.status} /></TableCell>
                <TableCell className="font-mono text-sm">{q.uses}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{q.updated}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setPreview(q)}><Eye className="h-4 w-4" />Preview</DropdownMenuItem>
                      {q.status === "active" ? (
                        <DropdownMenuItem onClick={() => archive(q.id)}><Archive className="h-4 w-4" />Archive</DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => reactivate(q.id)}><ArchiveRestore className="h-4 w-4" />Reactivate</DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DataTableShell>

      <Sheet open={!!preview} onOpenChange={(o) => !o && setPreview(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {preview && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className={cn("border", diffMap[preview.difficulty])}>{preview.difficulty}</Badge>
                  <StatusBadge status={preview.status} />
                  <span className="text-xs font-mono text-muted-foreground ml-auto">{preview.id}</span>
                </div>
                <SheetTitle className="font-display text-left text-xl">{preview.text}</SheetTitle>
                <SheetDescription className="text-left">
                  {preview.subject} · {preview.topic} · {preview.subtopic}
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-3 my-6">
                <div className="text-sm font-semibold">Sample choices</div>
                {["A", "B", "C", "D"].map((k, i) => (
                  <div key={k} className={cn("rounded-md border p-3 text-sm", i === 1 ? "border-success/40 bg-success/10" : "border-border/60")}>
                    <span className="font-mono text-xs mr-2 text-muted-foreground">{k}</span>
                    Mock choice text for option {k}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/60">
                <div><div className="text-xs text-muted-foreground">Times used</div><div className="font-display font-semibold">{preview.uses}</div></div>
                <div><div className="text-xs text-muted-foreground">Last updated</div><div className="font-display font-semibold">{preview.updated}</div></div>
              </div>
              <SheetFooter className="mt-6">
                {preview.status === "active" ? (
                  <Button variant="outline" onClick={() => { archive(preview.id); setPreview(null); }}>
                    <Archive className="h-4 w-4" />Archive
                  </Button>
                ) : (
                  <Button onClick={() => { reactivate(preview.id); setPreview(null); }}>
                    <ArchiveRestore className="h-4 w-4" />Reactivate
                  </Button>
                )}
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </AdminShell>
  );
}
