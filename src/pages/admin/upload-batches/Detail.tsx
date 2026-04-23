import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AdminShell } from "@/components/shell/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { ConfidenceBar } from "@/components/shared/confidence-bar";
import { BatchStatusTimeline } from "@/components/shared/batch-status-timeline";
import { EditableExtractedText } from "@/components/shared/editable-extracted-text";
import { EmptyState } from "@/components/shared/empty-state";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, FileText, ListChecks, RefreshCcw, XCircle, Send } from "lucide-react";
import { mockBatches, type BatchPage, type UploadBatch } from "@/lib/academic-mock";
import { toast } from "sonner";

export default function BatchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const original = useMemo(() => mockBatches.find((b) => b.id === id), [id]);
  const [batch, setBatch] = useState<UploadBatch | undefined>(original);

  if (!batch) {
    return (
      <AdminShell userName="Maria Santos">
        <PageHeader title="Batch not found" description="We couldn't locate this upload batch." />
        <Card className="border-border/60">
          <CardContent className="p-0">
            <EmptyState
              icon={FileText}
              title="No batch with this id"
              description="It may have been removed or the link is invalid."
              action={<Button asChild><Link to="/admin/question-upload-batches">Back to batches</Link></Button>}
            />
          </CardContent>
        </Card>
      </AdminShell>
    );
  }

  const updatePage = (pageId: string, text: string) => {
    setBatch({
      ...batch,
      pages: batch.pages.map((p) => (p.id === pageId ? { ...p, text, edited: true } : p)),
    });
    toast.success("Extracted text updated");
  };

  const retry = () => {
    setBatch({ ...batch, status: "processing", progress: 5 });
    toast.success("Batch re-queued for OCR");
  };

  const cancel = () => {
    setBatch({ ...batch, status: "cancelled" });
    toast.success("Batch cancelled");
  };

  const queueForReview = () => {
    setBatch({ ...batch, status: "queued" });
    toast.success("Sent to question review");
    navigate("/admin/question-review");
  };

  return (
    <AdminShell userName="Maria Santos">
      <Button asChild variant="ghost" size="sm" className="mb-2 -ml-2">
        <Link to="/admin/question-upload-batches">
          <ArrowLeft className="h-4 w-4" />Back to batches
        </Link>
      </Button>

      <PageHeader
        title={batch.name}
        description={`Batch ${batch.id} · uploaded by ${batch.uploadedBy} · ${batch.uploadedAt}`}
        actions={
          <div className="flex flex-wrap gap-2">
            {batch.status === "failed" && (
              <Button variant="outline" onClick={retry}><RefreshCcw className="h-4 w-4" />Retry</Button>
            )}
            {(batch.status === "processing" || batch.status === "pending") && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="text-destructive hover:text-destructive">
                    <XCircle className="h-4 w-4" />Cancel batch
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancel this batch?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Processing will stop and no questions will be extracted. This cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep running</AlertDialogCancel>
                    <AlertDialogAction onClick={cancel}>Cancel batch</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            {batch.status === "ready" && (
              <Button onClick={queueForReview}>
                <Send className="h-4 w-4" />Queue for review
              </Button>
            )}
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="border-border/60">
          <CardContent className="p-4 space-y-1">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Status</p>
            <StatusBadge status={batch.status} />
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardContent className="p-4 space-y-1">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Source</p>
            <Badge variant="outline" className="capitalize">{batch.source === "ocr" ? "OCR" : "Manual"}</Badge>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardContent className="p-4 space-y-1">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Confidence</p>
            <ConfidenceBar value={batch.confidence} />
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardContent className="p-4 space-y-1">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Extracted questions</p>
            <p className="font-display text-2xl font-semibold">{batch.extractedQuestions}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pages">Pages ({batch.pages.length})</TabsTrigger>
          <TabsTrigger value="questions">Extracted questions</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="font-display text-lg">Summary</CardTitle>
                <CardDescription>{batch.notes ?? "No additional notes provided."}</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">File type</p>
                  <p className="font-medium">{batch.fileType ?? "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Size</p>
                  <p className="font-medium">{batch.size ?? "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Uploaded by</p>
                  <p className="font-medium">{batch.uploadedBy}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Uploaded at</p>
                  <p className="font-medium">{batch.uploadedAt}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="font-display text-lg">Latest activity</CardTitle>
                <CardDescription>Most recent timeline events.</CardDescription>
              </CardHeader>
              <CardContent>
                <BatchStatusTimeline events={batch.timeline.slice(-4)} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pages">
          {batch.pages.length === 0 ? (
            <Card className="border-border/60">
              <CardContent className="p-0">
                <EmptyState
                  icon={FileText}
                  title="No pages yet"
                  description="Pages appear here once OCR processing completes."
                />
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {batch.pages.map((p: BatchPage) => (
                <EditableExtractedText key={p.id} page={p} onSave={updatePage} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="questions">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="font-display text-lg">Detected questions</CardTitle>
              <CardDescription>
                {batch.extractedQuestions > 0
                  ? `${batch.extractedQuestions} questions detected. Send the batch to review to start verifying them.`
                  : "No questions detected yet."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {batch.extractedQuestions === 0 ? (
                <EmptyState
                  icon={ListChecks}
                  title="Nothing extracted yet"
                  description="Once OCR finishes, detected questions will be listed here."
                />
              ) : (
                <Button asChild>
                  <Link to="/admin/question-review">
                    <ListChecks className="h-4 w-4" />Open question review
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="font-display text-lg">Full timeline</CardTitle>
              <CardDescription>Every system and reviewer event for this batch.</CardDescription>
            </CardHeader>
            <CardContent>
              <BatchStatusTimeline events={batch.timeline} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminShell>
  );
}
