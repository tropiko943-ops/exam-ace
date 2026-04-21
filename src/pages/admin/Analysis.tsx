import { useState } from "react";
import { AdminShell } from "@/components/shell/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { FilterBar } from "@/components/shared/filter-bar";
import { StatCard } from "@/components/shared/stat-card";
import { ChartCard } from "@/components/shared/chart-card";
import { DataTableShell } from "@/components/shared/data-table-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, BookOpen, Target, BarChart3, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";
import { mockItemAnalysis, ItemAnalysisRow } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function diffLabel(p: number) {
  if (p >= 0.85) return { label: "Very easy", cls: "bg-success/15 text-success border-success/30" };
  if (p >= 0.6) return { label: "Easy", cls: "bg-success/10 text-success border-success/20" };
  if (p >= 0.4) return { label: "Moderate", cls: "bg-warning/15 text-warning border-warning/30" };
  if (p >= 0.2) return { label: "Difficult", cls: "bg-destructive/10 text-destructive border-destructive/20" };
  return { label: "Very difficult", cls: "bg-destructive/15 text-destructive border-destructive/30" };
}
function discLabel(d: number) {
  if (d >= 0.4) return { label: "Excellent", cls: "bg-success/15 text-success border-success/30" };
  if (d >= 0.3) return { label: "Good", cls: "bg-success/10 text-success border-success/20" };
  if (d >= 0.2) return { label: "Acceptable", cls: "bg-warning/15 text-warning border-warning/30" };
  return { label: "Poor", cls: "bg-destructive/15 text-destructive border-destructive/30" };
}

export default function AdminAnalysis() {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("all");
  const [preview, setPreview] = useState<ItemAnalysisRow | null>(null);

  const filtered = mockItemAnalysis.filter((i) => {
    if (search && !i.text.toLowerCase().includes(search.toLowerCase()) && !i.id.toLowerCase().includes(search.toLowerCase())) return false;
    if (subject !== "all" && i.subject !== subject) return false;
    return true;
  });

  return (
    <AdminShell userName="Maria Santos">
      <PageHeader
        title="Item analysis"
        description="CTT-based difficulty, discrimination, distractors, and reliability."
        actions={<Button variant="outline"><Download className="h-4 w-4" />Export report</Button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Items analyzed" value="312" icon={BookOpen} accent="primary" />
        <StatCard label="Avg. difficulty (p)" value="0.58" icon={Target} accent="warning" />
        <StatCard label="Avg. discrimination (D)" value="0.36" icon={BarChart3} accent="success" />
        <StatCard label="Reliability (KR-20)" value="0.82" icon={TrendingUp} accent="accent" />
      </div>

      <Tabs defaultValue="items" className="space-y-4">
        <TabsList>
          <TabsTrigger value="items">Item statistics</TabsTrigger>
          <TabsTrigger value="distractors">Distractor analysis</TabsTrigger>
          <TabsTrigger value="reliability">Reliability</TabsTrigger>
        </TabsList>

        <TabsContent value="items" className="space-y-4">
          <FilterBar searchValue={search} onSearchChange={setSearch} searchPlaceholder="Search items…">
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All subjects</SelectItem>
                <SelectItem value="Prof Ed">Prof Ed</SelectItem>
                <SelectItem value="Math">Math</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
              </SelectContent>
            </Select>
          </FilterBar>

          <DataTableShell>
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/40 hover:bg-secondary/40">
                  <TableHead>Item</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Difficulty (p)</TableHead>
                  <TableHead>Discrimination (D)</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => {
                  const d = diffLabel(r.difficulty);
                  const k = discLabel(r.discrimination);
                  return (
                    <TableRow key={r.id}>
                      <TableCell className="max-w-sm">
                        <div className="font-medium line-clamp-1">{r.text}</div>
                        <div className="text-xs text-muted-foreground font-mono">{r.id}</div>
                      </TableCell>
                      <TableCell className="text-sm">{r.subject}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm tabular-nums">{r.difficulty.toFixed(2)}</span>
                          <Badge variant="outline" className={cn("border", d.cls)}>{d.label}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm tabular-nums">{r.discrimination.toFixed(2)}</span>
                          <Badge variant="outline" className={cn("border", k.cls)}>{k.label}</Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline" onClick={() => setPreview(r)}>
                          <Eye className="h-4 w-4" />View
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </DataTableShell>
        </TabsContent>

        <TabsContent value="distractors" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {mockItemAnalysis.slice(0, 4).map((r) => {
              const data = (["A", "B", "C", "D"] as const).map((k) => ({
                key: k, value: r.distractors[k], correct: r.correct === k,
              }));
              return (
                <ChartCard key={r.id} title={r.id} description={r.text}>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                      <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                      <XAxis dataKey="key" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                        {data.map((d) => (
                          <Cell key={d.key} fill={d.correct ? "hsl(var(--success))" : "hsl(var(--muted-foreground) / 0.4)"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartCard>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="reliability">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="border-border/60 lg:col-span-2">
              <CardHeader>
                <CardTitle className="font-display text-lg">Form reliability summary</CardTitle>
                <CardDescription>Internal consistency of recent exam forms.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary/40 hover:bg-secondary/40">
                      <TableHead>Form</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>KR-20</TableHead>
                      <TableHead>Cronbach α</TableHead>
                      <TableHead>SEM</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { f: "Form A — Apr 2025", n: 150, kr: 0.84, a: 0.85, sem: 3.21 },
                      { f: "Form B — Mar 2025", n: 150, kr: 0.81, a: 0.83, sem: 3.45 },
                      { f: "Form C — Feb 2025", n: 150, kr: 0.78, a: 0.80, sem: 3.62 },
                    ].map((row) => (
                      <TableRow key={row.f}>
                        <TableCell className="font-medium">{row.f}</TableCell>
                        <TableCell className="font-mono text-sm">{row.n}</TableCell>
                        <TableCell className="font-mono text-sm">{row.kr}</TableCell>
                        <TableCell className="font-mono text-sm">{row.a}</TableCell>
                        <TableCell className="font-mono text-sm">{row.sem}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="font-display text-lg">Interpretation</CardTitle>
                <CardDescription>Classical Test Theory thresholds.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p><strong className="font-display">≥ 0.90</strong> — Excellent reliability</p>
                <p><strong className="font-display">0.80–0.89</strong> — Good</p>
                <p><strong className="font-display">0.70–0.79</strong> — Acceptable</p>
                <p className="text-muted-foreground"><strong className="font-display text-foreground">&lt; 0.70</strong> — Needs improvement; review distractors and item alignment.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Sheet open={!!preview} onOpenChange={(o) => !o && setPreview(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {preview && (
            <>
              <SheetHeader>
                <span className="text-xs font-mono text-muted-foreground">{preview.id}</span>
                <SheetTitle className="font-display text-left text-xl">{preview.text}</SheetTitle>
                <SheetDescription className="text-left">{preview.subject}</SheetDescription>
              </SheetHeader>
              <div className="grid grid-cols-2 gap-3 my-6">
                <Card className="border-border/60"><CardContent className="p-4"><div className="text-xs text-muted-foreground">Difficulty (p)</div><div className="font-display text-2xl font-bold">{preview.difficulty.toFixed(2)}</div></CardContent></Card>
                <Card className="border-border/60"><CardContent className="p-4"><div className="text-xs text-muted-foreground">Discrimination</div><div className="font-display text-2xl font-bold">{preview.discrimination.toFixed(2)}</div></CardContent></Card>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-semibold">Distractor pattern</div>
                {(["A", "B", "C", "D"] as const).map((k) => {
                  const v = preview.distractors[k];
                  const correct = preview.correct === k;
                  return (
                    <div key={k} className={cn("rounded-md border p-3", correct ? "border-success/40 bg-success/10" : "border-border/60")}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-sm">{k}{correct && <span className="ml-2 text-xs text-success">✓ correct</span>}</span>
                        <span className="font-mono text-sm tabular-nums">{v}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div className={cn("h-full", correct ? "bg-success" : "bg-muted-foreground/40")} style={{ width: `${v}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </AdminShell>
  );
}
