import { AppShell } from "@/components/shell/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { ChartCard } from "@/components/shared/chart-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScanText, ListChecks, BookOpen, BarChart3, ArrowRight, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

const weekly = [
  { d: "Mon", uploaded: 4, approved: 18 },
  { d: "Tue", uploaded: 6, approved: 22 },
  { d: "Wed", uploaded: 3, approved: 15 },
  { d: "Thu", uploaded: 8, approved: 28 },
  { d: "Fri", uploaded: 5, approved: 20 },
  { d: "Sat", uploaded: 2, approved: 9 },
  { d: "Sun", uploaded: 1, approved: 4 },
];

export default function AdminDashboard() {
  return (
    <AppShell role="admin" userName="Maria Santos">
      <PageHeader
        title="Admin overview"
        description="Track OCR intake, review queue, and question bank health."
        actions={
          <Button asChild><Link to="/app/ocr"><Upload className="h-4 w-4" />Upload questions</Link></Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Files in OCR queue" value="6" icon={ScanText} accent="primary" hint="2 processing" />
        <StatCard label="Awaiting review" value="38" icon={ListChecks} accent="warning" trend={{ value: 12 }} />
        <StatCard label="Approved this week" value="116" icon={BookOpen} accent="success" trend={{ value: 8.4 }} />
        <StatCard label="Bank size" value="3,517" icon={BarChart3} accent="accent" trend={{ value: 4.1 }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard className="lg:col-span-2" title="Intake activity" description="Uploaded files vs. approved questions, this week">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={weekly} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
              <XAxis dataKey="d" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="uploaded" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="approved" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="font-display text-lg">Quick actions</CardTitle>
            <CardDescription>Jump into the most common workflows.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { to: "/app/ocr", label: "Upload OCR document", icon: ScanText },
              { to: "/app/review", label: "Review extracted questions", icon: ListChecks },
              { to: "/app/questions", label: "Manage question bank", icon: BookOpen },
              { to: "/app/analysis", label: "View item analysis", icon: BarChart3 },
            ].map((a) => (
              <Button key={a.to} asChild variant="outline" className="w-full justify-between">
                <Link to={a.to}>
                  <span className="flex items-center gap-2"><a.icon className="h-4 w-4" />{a.label}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
