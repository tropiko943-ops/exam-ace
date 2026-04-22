import { Link } from "react-router-dom";
import { StudentShell } from "@/components/shell/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockSessions } from "@/lib/student-mock";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { ArrowRight } from "lucide-react";

export default function ExamHistory() {
  const trend = [...mockSessions].reverse().map((s, i) => ({
    name: `#${i + 1}`,
    score: s.score,
  }));

  return (
    <StudentShell>
      <PageHeader title="Exam history" description="Track your progress over time." />

      <Card className="border-border/50 mb-6">
        <CardHeader><CardTitle className="text-base font-display">Score trend</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} domain={[0, 150]} />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  fontSize: "12px",
                }}
              />
              <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader><CardTitle className="text-base font-display">All sessions</CardTitle></CardHeader>
        <CardContent className="px-0">
          <div className="space-y-2 px-4 md:hidden">
            {mockSessions.map((s) => {
              const p = Math.round((s.score / s.total) * 100);
              return (
                <Link key={s.id} to={`/student/exams/${s.id}/review`} className="block rounded-lg border border-border p-3 hover:bg-secondary/40">
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-semibold">{s.id}</span>
                    <Badge variant="outline">{s.difficulty}</Badge>
                  </div>
                  <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                    <span>{s.date}</span>
                    <span>{s.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold">{s.score}/{s.total}</span>
                    <span className="text-sm font-medium">{p}%</span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Session</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSessions.map((s) => {
                  const p = Math.round((s.score / s.total) * 100);
                  return (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.id}</TableCell>
                      <TableCell className="text-muted-foreground">{s.date}</TableCell>
                      <TableCell><Badge variant="outline">{s.difficulty}</Badge></TableCell>
                      <TableCell className="text-muted-foreground">{s.duration}</TableCell>
                      <TableCell className="text-right font-display font-bold">{s.score}/{s.total} <span className="font-sans text-xs font-normal text-muted-foreground">({p}%)</span></TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild className="gap-1">
                          <Link to={`/student/exams/${s.id}/review`}>Review <ArrowRight className="h-3 w-3" /></Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </StudentShell>
  );
}
