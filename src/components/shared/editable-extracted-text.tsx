import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfidenceBar } from "@/components/shared/confidence-bar";
import { Save, Pencil, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BatchPage } from "@/lib/academic-mock";

interface EditableExtractedTextProps {
  page: BatchPage;
  onSave?: (id: string, text: string) => void;
  className?: string;
}

export function EditableExtractedText({ page, onSave, className }: EditableExtractedTextProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(page.text);

  const save = () => {
    onSave?.(page.id, draft);
    setEditing(false);
  };

  const reset = () => {
    setDraft(page.text);
    setEditing(false);
  };

  return (
    <Card className={cn("border-border/60", className)}>
      <CardContent className="space-y-3 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline">Page {page.index}</Badge>
            {page.edited && <Badge variant="outline" className="border-primary/30 bg-primary-muted text-primary">Edited</Badge>}
          </div>
          <div className="flex items-center gap-3">
            <ConfidenceBar value={page.confidence} className="min-w-[140px]" />
            {editing ? (
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={reset}>
                  <RotateCcw className="h-3.5 w-3.5" />Cancel
                </Button>
                <Button size="sm" onClick={save}>
                  <Save className="h-3.5 w-3.5" />Save
                </Button>
              </div>
            ) : (
              <Button size="sm" variant="outline" onClick={() => setEditing(true)}>
                <Pencil className="h-3.5 w-3.5" />Edit text
              </Button>
            )}
          </div>
        </div>
        {editing ? (
          <Textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={8} className="font-mono text-xs" />
        ) : (
          <pre className="whitespace-pre-wrap rounded-lg bg-secondary/40 p-3 font-mono text-xs leading-relaxed text-foreground">
            {draft}
          </pre>
        )}
      </CardContent>
    </Card>
  );
}
