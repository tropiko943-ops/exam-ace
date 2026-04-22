import { useMemo, useState } from "react";
import { StudentShell } from "@/components/shell/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { MasteryHeatmap } from "@/components/student/mastery-heatmap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Flame, Target, TrendingUp } from "lucide-react";
import { mockMastery } from "@/lib/student-mastery-mock";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

export default function Mastery() {
  const [subject, setSubject] = useState<string>("all");

  const subjects = useMemo(() => Array.from(new Set(mockMastery.map((m) => m.subject))), []);

  const filtered = useMemo(
    () => (subject === "all" ? mockMastery : mockMastery.filter((m) => m.subject === subject)),
    [subject],
  );

  const weakest = useMemo(() => [...mockMastery].sort((a, b) => a.mastery - b.mastery).slice(0, 3), []);
  const strongest = useMemo(() => [...mockMastery].sort((a, b) => b.mastery - a.mastery).slice(0, 3), []);

  const avg = Math.round(mockMastery.reduce((sum, m) => sum + m.mastery, 0) / mockMastery.length);

  const trendData = [
    { week: "W-6", mastery: avg - 14 },
    { week: "W-5", mastery: avg - 10 },
    { week: "W-4", mastery: avg - 7 },
    { week: "W-3", mastery: avg - 5 },
    { week: "W-2", mastery: avg - 2 },
    { week: "Now", mastery: avg },
  ];

  return (
    <StudentShell>
      <PageHeader
        title="Mastery"
        description="See your weak areas, topic mastery, and growth trend over time."
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Average mastery" value={`${avg}%`} icon={Brain} accent="primary" trend={{ value: 6, label: "vs. last month" }} />
        <StatCard label="Topics tracked" value={mockMastery.length} icon={Target} accent="accent" />
        <StatCard label="Weak areas" value={mockMastery.filter((m) => m.mastery < 60).length} icon={Flame} accent="warning" hint="below 60%" />
        <StatCard label="Strong areas" value={mockMastery.filter((m) => m.mastery >= 80).length} icon={TrendingUp} accent="success" hint="80% and above" />
      </div>

      <Tabs defaultValue="all" onValueChange={(v) => setSubject(v === "all" ? "all" : v)}>
        <TabsList className="h-auto w-full justify-start overflow-x-auto rounded-xl">
          <TabsTrigger value="all">All subjects</TabsTrigger>
          {subjects.map((s) => (
            <TabsTrigger key={s} value={s}>{s.split(" ")[0]}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.9fr)]">
        <MasteryHeatmap rows={filtered} description="Stacked by topic, sorted by recency." />

        <div className="space-y-4">
          <Card className="border-border/50">
            <CardHeader className="pb-2"><CardTitle className="text-base font-display">Mastery trend</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: "var(--radius)", fontSize: "12px" }} />
                  <Line type="monotone" dataKey="mastery" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 3, fill: "hsl(var(--primary))" }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="pb-2"><CardTitle className="text-base font-display">Focus next</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {weakest.map((row) => (
                <div key={row.id} className="flex items-center justify-between gap-3 rounded-lg border border-border/60 p-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{row.topic}</p>
                    <p className="text-xs text-muted-foreground">{row.subject}</p>
                  </div>
                  <span className="font-display text-sm font-bold text-warning">{row.mastery}%</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="pb-2"><CardTitle className="text-base font-display">Strongest topics</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {strongest.map((row) => (
                <div key={row.id} className="flex items-center justify-between gap-3 rounded-lg border border-border/60 p-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{row.topic}</p>
                    <p className="text-xs text-muted-foreground">{row.subject}</p>
                  </div>
                  <span className="font-display text-sm font-bold text-success">{row.mastery}%</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </StudentShell>
  );
}
