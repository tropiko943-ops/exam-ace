import { useNavigate } from "react-router-dom";
import { AdminShell } from "@/components/shell/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { UploadZone } from "@/components/shared/upload-zone";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { toast } from "sonner";

export default function CreateBatch() {
  const navigate = useNavigate();

  const submit = () => {
    toast.success("Batch queued for OCR processing");
    navigate("/admin/question-upload-batches");
  };

  return (
    <AdminShell userName="Maria Santos">
      <PageHeader
        title="New OCR upload"
        description="Upload a PDF or image. The OCR engine will extract questions for review."
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="font-display text-lg">Drop your document</CardTitle>
            <CardDescription>PDF, PNG or JPG up to 10MB · max 5 files per batch.</CardDescription>
          </CardHeader>
          <CardContent>
            <UploadZone hint="Drag and drop or browse to select files" />
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="font-display text-lg">Batch details</CardTitle>
            <CardDescription>Used to identify this intake later in the queue.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="batch-name">Batch name</Label>
              <Input id="batch-name" placeholder="e.g. Prof-Ed Reviewer Set A" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea id="notes" rows={4} placeholder="Anything reviewers should know about this material…" />
            </div>
            <Button onClick={submit} className="w-full">
              <Upload className="h-4 w-4" />Submit for OCR
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
