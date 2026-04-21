import { useState } from "react";
import { AdminShell } from "@/components/shell/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { UploadZone } from "@/components/shared/upload-zone";
import { DataTableShell } from "@/components/shared/data-table-shell";
import { StatusBadge } from "@/components/shared/status-badge";
import { ConfidenceBar } from "@/components/shared/confidence-bar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { mockOcrFiles } from "@/lib/mock-data";
import { ArrowRight, FileText, Plus, ScanText, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function AdminOcr() {
  const [batch, setBatch] = useState([{ id: 1, text: "", a: "", b: "", c: "", d: "", answer: "A" }]);

  return (
    <AdminShell userName="Maria Santos">
      <PageHeader
        title="Question intake"
        description="Upload documents for OCR extraction or add questions manually in batch."
      />

      <Tabs defaultValue="ocr" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ocr"><ScanText className="h-4 w-4" />OCR upload</TabsTrigger>
          <TabsTrigger value="manual"><Plus className="h-4 w-4" />Manual batch entry</TabsTrigger>
        </TabsList>

        <TabsContent value="ocr" className="space-y-6">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="font-display text-lg">Upload documents</CardTitle>
              <CardDescription>
                Drag and drop PDFs or images. Tesseract OCR will extract questions for review.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UploadZone hint="PDF, PNG or JPG up to 10MB · Max 5 files per batch" />
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="font-display text-lg">Processing queue</CardTitle>
                <CardDescription>Live status of OCR jobs and confidence scores.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <DataTableShell className="border-0 shadow-none rounded-none">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary/40 hover:bg-secondary/40">
                      <TableHead>File</TableHead>
                      <TableHead>Uploaded</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[200px]">Progress / Confidence</TableHead>
                      <TableHead>Questions</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockOcrFiles.map((f) => (
                      <TableRow key={f.id}>
                        <TableCell>
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="h-9 w-9 rounded-lg bg-primary-muted flex items-center justify-center shrink-0">
                              <FileText className="h-4 w-4 text-primary" />
                            </div>
                            <div className="min-w-0">
                              <div className="font-medium truncate">{f.name}</div>
                              <div className="text-xs text-muted-foreground">{f.size} · {f.uploadedBy}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{f.uploadedAt}</TableCell>
                        <TableCell><StatusBadge status={f.status} /></TableCell>
                        <TableCell>
                          {f.status === "processing" ? (
                            <div className="space-y-1">
                              <Progress value={f.progress} className="h-1.5" />
                              <span className="text-xs text-muted-foreground">{f.progress}%</span>
                            </div>
                          ) : f.status === "ready" ? (
                            <ConfidenceBar value={f.confidence} />
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell className="font-mono text-sm">{f.questions || "—"}</TableCell>
                        <TableCell className="text-right">
                          {f.status === "ready" ? (
                            <Button asChild size="sm">
                              <Link to="/app/review">Review<ArrowRight className="h-3.5 w-3.5" /></Link>
                            </Button>
                          ) : f.status === "failed" ? (
                            <Button size="sm" variant="outline" onClick={() => toast.success("Re-queued")}>Retry</Button>
                          ) : (
                            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => toast.success("File removed")}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DataTableShell>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manual">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="font-display text-lg">Batch question entry</CardTitle>
              <CardDescription>Add multiple questions at once. They'll go through the same review flow.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {batch.map((q, idx) => (
                <div key={q.id} className="rounded-lg border border-border/60 p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-semibold">Question {idx + 1}</span>
                    {batch.length > 1 && (
                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setBatch(batch.filter((b) => b.id !== q.id))}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Question text</Label>
                    <Textarea placeholder="Type the question…" rows={2} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(["A", "B", "C", "D"] as const).map((k) => (
                      <div key={k} className="space-y-2">
                        <Label>Choice {k}</Label>
                        <Input placeholder={`Option ${k}`} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex flex-col sm:flex-row gap-2 justify-between">
                <Button variant="outline" onClick={() => setBatch([...batch, { id: Date.now(), text: "", a: "", b: "", c: "", d: "", answer: "A" }])}>
                  <Plus className="h-4 w-4" />Add another
                </Button>
                <Button onClick={() => toast.success(`${batch.length} question(s) submitted for review`)}>
                  Submit batch for review
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminShell>
  );
}
