import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AdminShell } from "@/components/shell/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { FilterBar } from "@/components/shared/filter-bar";
import { DataTableShell } from "@/components/shared/data-table-shell";
import { StatusBadge } from "@/components/shared/status-badge";
import { ConfidenceBar } from "@/components/shared/confidence-bar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { ArrowRight, FileText, Plus, Upload, Pencil } from "lucide-react";
import { mockBatches } from "@/lib/academic-mock";

export default function QuestionUploadBatches() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");

  const filtered = useMemo(
    () =>
      mockBatches.filter((b) => {
        if (search && !b.name.toLowerCase().includes(search.toLowerCase()) && !b.id.toLowerCase().includes(search.toLowerCase())) return false;
        if (statusFilter !== "all" && b.status !== statusFilter) return false;
        if (sourceFilter !== "all" && b.source !== sourceFilter) return false;
        return true;
      }),
    [search, statusFilter, sourceFilter],
  );

  return (
    <AdminShell userName="Maria Santos">
      <PageHeader
        title="Question upload batches"
        description="Monitor every OCR or manual intake from upload to question review."
        actions={
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link to="/admin/question-upload-batches/manual">
                <Pencil className="h-4 w-4" />Manual entry
              </Link>
            </Button>
            <Button asChild>
              <Link to="/admin/question-upload-batches/create">
                <Upload className="h-4 w-4" />New OCR upload
              </Link>
            </Button>
          </div>
        }
      />

      <FilterBar
        searchPlaceholder="Search by file name or batch ID…"
        searchValue={search}
        onSearchChange={setSearch}
      >
        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All sources</SelectItem>
            <SelectItem value="ocr">OCR upload</SelectItem>
            <SelectItem value="manual">Manual entry</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="ready">Ready</SelectItem>
            <SelectItem value="queued">Queued</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </FilterBar>

      <DataTableShell>
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/40 hover:bg-secondary/40">
              <TableHead>Batch</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[200px]">Progress / Confidence</TableHead>
              <TableHead>Questions</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((b) => (
              <TableRow key={b.id}>
                <TableCell>
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-lg bg-primary-muted flex items-center justify-center shrink-0">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium truncate">{b.name}</div>
                      <div className="text-xs text-muted-foreground">
                        <span className="font-mono">{b.id}</span>
                        {b.size ? ` · ${b.size}` : ""}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">{b.source === "ocr" ? "OCR" : "Manual"}</Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                  <div>{b.uploadedAt}</div>
                  <div className="text-xs">{b.uploadedBy}</div>
                </TableCell>
                <TableCell><StatusBadge status={b.status} /></TableCell>
                <TableCell>
                  {b.status === "processing" ? (
                    <div className="space-y-1">
                      <Progress value={b.progress} className="h-1.5" />
                      <span className="text-xs text-muted-foreground">{b.progress}%</span>
                    </div>
                  ) : b.status === "ready" || b.status === "queued" ? (
                    <ConfidenceBar value={b.confidence} />
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell className="font-mono text-sm">{b.extractedQuestions || "—"}</TableCell>
                <TableCell className="text-right">
                  <Button asChild size="sm" variant={b.status === "ready" ? "default" : "outline"}>
                    <Link to={`/admin/question-upload-batches/${b.id}`}>
                      Open<ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DataTableShell>
    </AdminShell>
  );
}
