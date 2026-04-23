import { useMemo, useState } from "react";
import { AdminShell } from "@/components/shell/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { FilterBar } from "@/components/shared/filter-bar";
import { DataTableShell } from "@/components/shared/data-table-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tags, FolderTree, BookOpen } from "lucide-react";
import { mockExtracted, type ExtractedQuestion } from "@/lib/mock-data";
import { mockSubjects, mockTopics, mockSubtopics } from "@/lib/academic-mock";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const diffMap = {
  Easy: "bg-success/15 text-success border-success/30",
  Medium: "bg-warning/15 text-warning border-warning/30",
  Hard: "bg-destructive/15 text-destructive border-destructive/30",
};

export default function QuestionClassifications() {
  const [items, setItems] = useState<ExtractedQuestion[]>(mockExtracted);
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);
  const [bulkSubject, setBulkSubject] = useState<string>("");
  const [bulkTopic, setBulkTopic] = useState<string>("");
  const [bulkSubtopic, setBulkSubtopic] = useState<string>("");

  const filtered = useMemo(
    () =>
      items.filter((i) => {
        if (search && !i.text.toLowerCase().includes(search.toLowerCase())) return false;
        if (subjectFilter !== "all" && i.subject !== subjectFilter) return false;
        return true;
      }),
    [items, search, subjectFilter],
  );

  const allChecked = filtered.length > 0 && filtered.every((q) => selected.includes(q.id));
  const toggleAll = () =>
    setSelected(
      allChecked
        ? selected.filter((id) => !filtered.some((q) => q.id === id))
        : Array.from(new Set([...selected, ...filtered.map((q) => q.id)])),
    );

  const topicsForSubject = useMemo(
    () => mockTopics.filter((t) => !bulkSubject || t.subjectName === bulkSubject),
    [bulkSubject],
  );
  const subtopicsForTopic = useMemo(
    () => mockSubtopics.filter((s) => !bulkTopic || s.topicName === bulkTopic),
    [bulkTopic],
  );

  const applyBulk = () => {
    if (selected.length === 0) {
      toast.error("Select at least one question");
      return;
    }
    if (!bulkSubject && !bulkTopic && !bulkSubtopic) {
      toast.error("Pick a subject, topic or sub-topic to assign");
      return;
    }
    setItems(
      items.map((q) =>
        selected.includes(q.id)
          ? {
              ...q,
              subject: bulkSubject || q.subject,
              topic: bulkTopic || q.topic,
              subtopic: bulkSubtopic || q.subtopic,
            }
          : q,
      ),
    );
    toast.success(`Reclassified ${selected.length} question(s)`);
    setSelected([]);
  };

  return (
    <AdminShell userName="Maria Santos">
      <PageHeader
        title="Question classifications"
        description="Bulk assign verified questions to subject, topic, and sub-topic."
      />

      <Card className="border-border/60 mb-4">
        <CardHeader>
          <CardTitle className="font-display text-lg">Bulk assign</CardTitle>
          <CardDescription>Pick the destination, then select the questions below.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Select value={bulkSubject} onValueChange={(v) => { setBulkSubject(v); setBulkTopic(""); setBulkSubtopic(""); }}>
            <SelectTrigger><SelectValue placeholder="Subject" /></SelectTrigger>
            <SelectContent>
              {mockSubjects.map((s) => <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={bulkTopic} onValueChange={(v) => { setBulkTopic(v); setBulkSubtopic(""); }} disabled={!bulkSubject}>
            <SelectTrigger><SelectValue placeholder="Topic" /></SelectTrigger>
            <SelectContent>
              {topicsForSubject.map((t) => <SelectItem key={t.id} value={t.name}>{t.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={bulkSubtopic} onValueChange={setBulkSubtopic} disabled={!bulkTopic}>
            <SelectTrigger><SelectValue placeholder="Sub-topic" /></SelectTrigger>
            <SelectContent>
              {subtopicsForTopic.map((s) => <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button onClick={applyBulk} className="w-full">
            <Tags className="h-4 w-4" />Apply to {selected.length || 0} selected
          </Button>
        </CardContent>
      </Card>

      <FilterBar
        searchPlaceholder="Search question text…"
        searchValue={search}
        onSearchChange={setSearch}
      >
        <Select value={subjectFilter} onValueChange={setSubjectFilter}>
          <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All subjects</SelectItem>
            {mockSubjects.map((s) => <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </FilterBar>

      <DataTableShell>
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/40 hover:bg-secondary/40">
              <TableHead className="w-10"><Checkbox checked={allChecked} onCheckedChange={toggleAll} /></TableHead>
              <TableHead>Question</TableHead>
              <TableHead><span className="inline-flex items-center gap-1"><BookOpen className="h-3 w-3" />Subject</span></TableHead>
              <TableHead><span className="inline-flex items-center gap-1"><FolderTree className="h-3 w-3" />Topic</span></TableHead>
              <TableHead>Sub-topic</TableHead>
              <TableHead>Difficulty</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((q) => (
              <TableRow key={q.id}>
                <TableCell>
                  <Checkbox
                    checked={selected.includes(q.id)}
                    onCheckedChange={() =>
                      setSelected(selected.includes(q.id) ? selected.filter((s) => s !== q.id) : [...selected, q.id])
                    }
                  />
                </TableCell>
                <TableCell className="max-w-md">
                  <div className="font-medium line-clamp-1">{q.text}</div>
                  <div className="text-xs text-muted-foreground font-mono">{q.id}</div>
                </TableCell>
                <TableCell><Badge variant="outline">{q.subject}</Badge></TableCell>
                <TableCell className="text-sm">{q.topic}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{q.subtopic}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("border", diffMap[q.difficulty])}>{q.difficulty}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DataTableShell>
    </AdminShell>
  );
}
