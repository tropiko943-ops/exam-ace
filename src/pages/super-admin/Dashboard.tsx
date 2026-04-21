import { SuperAdminShell } from "@/components/shell/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { ChartCard } from "@/components/shared/chart-card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, FileText, Activity, Download } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const usage = [
  { month: "Nov", exams: 120 },
  { month: "Dec", exams: 180 },
  { month: "Jan", exams: 240 },
  { month: "Feb", exams: 320 },
  { month: "Mar", exams: 410 },
  { month: "Apr", exams: 528 },
];

const subjects = [
  { name: "Prof Ed", count: 412 },
  { name: "Gen Ed", count: 380 },
  { name: "Math", count: 220 },
  { name: "English", count: 195 },
  { name: "Science", count: 168 },
  { name: "Filipino", count: 142 },
];

export default function SuperAdminDashboard() {
  return (
    <SuperAdminShell userName="Dr. Reyes">
      <PageHeader
        title="System overview"
        description="Real-time summary of users, content, and activity across DSSC Reviewer."
        actions={
          <Button variant="outline">
            <Download className="h-4 w-4" />
            Export report
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total users" value="1,284" icon={Users} accent="primary" trend={{ value: 8.2, label: "vs last month" }} />
        <StatCard label="Question bank" value="3,517" icon={BookOpen} accent="accent" trend={{ value: 4.1, label: "new this week" }} />
        <StatCard label="Exams taken" value="528" icon={FileText} accent="success" trend={{ value: 12.5, label: "this month" }} />
        <StatCard label="Active sessions" value="42" icon={Activity} accent="warning" hint="Live now" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard
          className="lg:col-span-2"
          title="Exams taken over time"
          description="Monthly mock exam submissions"
          action={<Button size="sm" variant="outline"><Download className="h-4 w-4" />CSV</Button>}
        >
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={usage} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="gExams" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Area type="monotone" dataKey="exams" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#gExams)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Questions by subject" description="Distribution across the bank">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={subjects} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="count" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </SuperAdminShell>
  );
}
