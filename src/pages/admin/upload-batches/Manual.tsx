import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminShell } from "@/components/shell/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

type Draft = { id: number; text: string; a: string; b: string; c: string; d: string; answer: "A" | "B" | "C" | "D" };

export default function ManualBatch() {
  const navigate = useNavigate();
  const [batchName, setBatchName] = useState("");
  const [items, setItems] = useState<Draft[]>([
    { id: 1, text: "", a: "", b: "", c: "", d: "", answer: "A" },
  ]);

  const submit = () => {
    if (!batchName.trim()) {
      toast.error("Please name this batch");
      return;
    }
    toast.success(`${items.length} question(s) queued for review`);
    navigate("/admin/question-upload-batches");
  };

  return (
    <AdminShell userName="Maria Santos">
      <PageHeader
        title="Manual batch entry"
        description="Type or paste questions directly. They go through the same review pipeline."
      />

      <Card className="border-border/60 mb-4">
        <CardHeader>
          <CardTitle className="font-display text-lg">Batch info</CardTitle>
          <CardDescription>Identifies this set in the upload batches list.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="bname">Batch name</Label>
            <Input id="bname" value={batchName} onChange={(e) => setBatchName(e.target.value)} placeholder="e.g. Prof-Ed manual set #4" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bnotes">Notes</Label>
            <Input id="bnotes" placeholder="Optional context for reviewers" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="font-display text-lg">Questions ({items.length})</CardTitle>
          <CardDescription>Add as many items as you need before submitting.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {items.map((q, idx) => (
            <div key={q.id} className="rounded-lg border border-border/60 p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-semibold">Question {idx + 1}</span>
                {items.length > 1 && (
                  <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setItems(items.filter((b) => b.id !== q.id))}>
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
            <Button variant="outline" onClick={() => setItems([...items, { id: Date.now(), text: "", a: "", b: "", c: "", d: "", answer: "A" }])}>
              <Plus className="h-4 w-4" />Add another
            </Button>
            <Button onClick={submit}>Submit batch for review</Button>
          </div>
        </CardContent>
      </Card>
    </AdminShell>
  );
}
