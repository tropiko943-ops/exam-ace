import { SuperAdminShell } from "@/components/shell/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { ChartCard } from "@/components/shared/chart-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Users, BookOpen, FileText, TrendingUp, FileBarChart, FileSpreadsheet } from "lucide-react";
import {
  Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, Cell,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const monthly = [
  { m: "Nov", users: 80, exams: 120 },
  { m: "Dec", users: 110, exams: 180 },
  { m: "Jan", users: 165, exams: 240 },
  { m: "Feb", users: 220, exams: 320 },
  { m: "Mar", users: 295, exams: 410 },
  { m: "Apr", users: 360, exams: 528 },
];

const roleDistro = [
  { name: "Students", value: 1180, fill: "hsl(var(--primary))" },
  { name: "Admins", value: 96, fill: "hsl(var(--accent))" },
  { name: "Super Admins", value: 8, fill: "hsl(var(--success))" },
];

export default function SuperAdminStats() {
  return (
    <SuperAdminShell userName="Dr. Reyes">
      <PageHeader
        title="Statistics & reports"
        description="Aggregated insights and exportable reports for documentation."
        actions={
          <>
            <Button variant="outline"><FileSpreadsheet className="h-4 w-4" />Excel</Button>
            <Button><Download className="h-4 w-4" />Export PDF</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total users" value="1,284" icon={Users} accent="primary" trend={{ value: 8.2 }} />
        <StatCard label="Questions" value="3,517" icon={BookOpen} accent="accent" trend={{ value: 4.1 }} />
        <StatCard label="Exams completed" value="2,184" icon={FileText} accent="success" trend={{ value: 12.5 }} />
        <StatCard label="Avg. score" value="76%" icon={TrendingUp} accent="warning" trend={{ value: 2.3 }} />
      </div>

      <Tabs defaultValue="growth" className="space-y-4">
        <TabsList>
          <TabsTrigger value="growth">Growth</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="reports">Saved reports</TabsTrigger>
        </TabsList>

        <TabsContent value="growth" className="space-y-4">
          <ChartCard
            title="User signups vs. exams taken"
            description="Last 6 months"
            action={<Button size="sm" variant="outline"><Download className="h-4 w-4" />CSV</Button>}
          >
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={monthly} margin={{ top: 8, right: 16, left: -16, bottom: 0 }}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                <XAxis dataKey="m" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="exams" stroke="hsl(var(--accent))" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ChartCard title="User roles" description="Composition of all accounts">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={roleDistro} dataKey="value" innerRadius={60} outerRadius={100} paddingAngle={3}>
                    {roleDistro.map((d) => <Cell key={d.name} fill={d.fill} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title="Activity by month" description="Submissions over the period">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={monthly} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                  <XAxis dataKey="m" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="exams" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Monthly usage report", desc: "Exams taken, signups, average scores." },
              { title: "User audit summary", desc: "Account changes and login records." },
              { title: "Question bank report", desc: "Counts by subject, topic, and difficulty." },
              { title: "Item analysis batch", desc: "CTT indices for all active items." },
              { title: "OCR processing log", desc: "Files processed and confidence summary." },
              { title: "Top performers", desc: "Leaderboard data and trends." },
            ].map((r) => (
              <Card key={r.title} className="border-border/60 hover:shadow-md transition-smooth">
                <CardHeader>
                  <div className="h-10 w-10 rounded-lg bg-primary-muted flex items-center justify-center mb-2">
                    <FileBarChart className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="font-display text-base">{r.title}</CardTitle>
                  <CardDescription>{r.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full"><Download className="h-4 w-4" />Generate</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </SuperAdminShell>
  );
}
