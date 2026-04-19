import { useMemo, useState } from "react";
import { AppShell } from "@/components/shell/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { FilterBar } from "@/components/shared/filter-bar";
import { ConfidenceBar } from "@/components/shared/confidence-bar";
import { EmptyState } from "@/components/shared/empty-state";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Check, ChevronLeft, ChevronRight, X, FileCheck2 } from "lucide-react";
import { mockExtracted, ExtractedQuestion } from "@/lib/mock-data";
import { toast } from "sonner";

export default function AdminReview() {
  const [items, setItems] = useState<ExtractedQuestion[]>(mockExtracted);
  const [search, setSearch] = useState("");
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  const filtered = useMemo(
    () => items.filter((i) => !search || i.text.toLowerCase().includes(search.toLowerCase())),
    [items, search],
  );

  const active = filtered.find((i) => i.id === activeId) ?? filtered[0];
  const update = (patch: Partial<ExtractedQuestion>) =>
    setItems(items.map((i) => (i.id === active?.id ? { ...i, ...patch } : i)));

  const updateChoice = (key: "A" | "B" | "C" | "D", text: string) => {
    if (!active) return;
    update({ choices: active.choices.map((c) => (c.key === key ? { ...c, text } : c)) });
  };

  const decide = (status: "approved" | "rejected") => {
    if (!active) return;
    update({ status });
    toast.success(status === "approved" ? "Question approved" : "Question rejected");
    const idx = filtered.findIndex((i) => i.id === active.id);
    const next = filtered[idx + 1];
    if (next) setActiveId(next.id);
  };

  const remaining = items.filter((i) => i.status === "ready").length;

  return (
    <AppShell role="admin" userName="Maria Santos">
      <PageHeader
        title="Review queue"
        description={`${remaining} question(s) awaiting review`}
      />

      <FilterBar
        searchPlaceholder="Search question text…"
        searchValue={search}
        onSearchChange={setSearch}
      />

      {filtered.length === 0 ? (
        <Card className="border-border/60">
          <CardContent className="p-0">
            <EmptyState
              icon={FileCheck2}
              title="Nothing to review"
              description="All extracted questions have been processed. Upload new files in OCR upload."
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4">
          <Card className="border-border/60 lg:max-h-[calc(100vh-260px)] overflow-y-auto">
            <CardHeader className="sticky top-0 bg-card z-10 border-b border-border/60">
              <CardTitle className="font-display text-base">Extracted ({filtered.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-2 space-y-1">
              {filtered.map((q) => (
                <button
                  key={q.id}
                  onClick={() => setActiveId(q.id)}
                  className={`w-full text-left rounded-md p-3 transition-smooth border ${
                    active?.id === q.id ? "bg-primary-muted/60 border-primary/30" : "border-transparent hover:bg-secondary"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono text-muted-foreground">{q.id}</span>
                    {q.status === "approved" ? (
                      <Badge variant="outline" className="bg-success/15 text-success border-success/30 text-[10px]">Approved</Badge>
                    ) : q.status === "rejected" ? (
                      <Badge variant="outline" className="bg-destructive/15 text-destructive border-destructive/30 text-[10px]">Rejected</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-warning/15 text-warning border-warning/30 text-[10px]">Pending</Badge>
                    )}
                  </div>
                  <p className="text-sm line-clamp-2 mb-2">{q.text}</p>
                  <ConfidenceBar value={q.confidence} />
                </button>
              ))}
            </CardContent>
          </Card>

          {active && (
            <Card className="border-border/60">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground">{active.id}</span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">From {active.fileId}</span>
                    </div>
                    <CardTitle className="font-display text-lg">Edit & approve</CardTitle>
                    <CardDescription>Verify text, choices, answer key, and classification before saving to the bank.</CardDescription>
                  </div>
                  <div className="text-right space-y-1 shrink-0">
                    <div className="text-xs text-muted-foreground">OCR confidence</div>
                    <ConfidenceBar value={active.confidence} className="min-w-[140px]" />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label>Question text</Label>
                  <Textarea value={active.text} onChange={(e) => update({ text: e.target.value })} rows={3} />
                </div>

                <div className="space-y-2">
                  <Label>Choices · select the correct answer</Label>
                  <RadioGroup value={active.answer} onValueChange={(v) => update({ answer: v as any })}>
                    <div className="space-y-2">
                      {active.choices.map((c) => (
                        <div key={c.key} className="flex items-center gap-3 rounded-md border border-border/60 p-2 bg-secondary/20">
                          <RadioGroupItem value={c.key} id={`a-${c.key}`} />
                          <Label htmlFor={`a-${c.key}`} className="font-mono text-xs w-5">{c.key}</Label>
                          <Input
                            value={c.text}
                            onChange={(e) => updateChoice(c.key, e.target.value)}
                            className="border-transparent bg-transparent focus-visible:bg-background"
                          />
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Select value={active.subject} onValueChange={(v) => update({ subject: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["Professional Education", "General Education", "Mathematics", "English", "Science", "Filipino"].map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Topic</Label>
                    <Input value={active.topic} onChange={(e) => update({ topic: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Sub-topic</Label>
                    <Input value={active.subtopic} onChange={(e) => update({ subtopic: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Difficulty</Label>
                    <Select value={active.difficulty} onValueChange={(v) => update({ difficulty: v as any })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-border/60">
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => {
                      const idx = filtered.findIndex((i) => i.id === active.id);
                      if (idx > 0) setActiveId(filtered[idx - 1].id);
                    }}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => {
                      const idx = filtered.findIndex((i) => i.id === active.id);
                      if (idx < filtered.length - 1) setActiveId(filtered[idx + 1].id);
                    }}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="text-destructive hover:text-destructive" onClick={() => decide("rejected")}>
                      <X className="h-4 w-4" />Reject
                    </Button>
                    <Button onClick={() => decide("approved")}>
                      <Check className="h-4 w-4" />Approve & save
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </AppShell>
  );
}
