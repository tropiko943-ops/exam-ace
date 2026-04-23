import { AdminShell } from "@/components/shell/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { ChartCard } from "@/components/shared/chart-card";
import { WorkflowShortcutCard } from "@/components/shared/workflow-shortcut-card";
import { Button } from "@/components/ui/button";
import {
  ScanText, ListChecks, BookOpen, BarChart3, Upload, FolderTree, Tags, FileStack,
} from "lucide-react";
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
    <AdminShell userName="Maria Santos">
      <PageHeader
        title="Admin overview"
        description="Track OCR intake, review queue, and question bank health."
        actions={
          <Button asChild>
            <Link to="/admin/question-upload-batches/create">
              <Upload className="h-4 w-4" />Upload questions
            </Link>
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Files in OCR queue" value="6" icon={ScanText} accent="primary" hint="2 processing" />
        <StatCard label="Awaiting review" value="38" icon={ListChecks} accent="warning" trend={{ value: 12 }} />
        <StatCard label="Approved this week" value="116" icon={BookOpen} accent="success" trend={{ value: 8.4 }} />
        <StatCard label="Bank size" value="3,517" icon={BarChart3} accent="accent" trend={{ value: 4.1 }} />
      </div>

      <div className="mb-6">
        <h2 className="font-display text-lg font-semibold tracking-tight mb-3">Workflows</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <WorkflowShortcutCard
            to="/admin/question-upload-batches/create"
            icon={Upload}
            title="Upload questions"
            description="OCR a document or paste questions to start a new batch."
            meta="Step 1 · Intake"
            accent="primary"
          />
          <WorkflowShortcutCard
            to="/admin/question-upload-batches"
            icon={FileStack}
            title="Batch monitoring"
            description="Track OCR processing, confidence, and extracted artifacts."
            meta="Step 2 · Process"
            accent="accent"
          />
          <WorkflowShortcutCard
            to="/admin/question-review"
            icon={ListChecks}
            title="Question review"
            description="Edit stems, fix choices, validate or archive each item."
            meta="Step 3 · Verify"
            accent="warning"
          />
          <WorkflowShortcutCard
            to="/admin/questions"
            icon={BookOpen}
            title="Question bank"
            description="Browse, search and manage the full library of items."
            meta="Step 4 · Manage"
            accent="success"
          />
          <WorkflowShortcutCard
            to="/admin/question-classifications"
            icon={Tags}
            title="Question classification"
            description="Bulk assign verified questions to subject, topic, subtopic."
            meta="Step 5 · Classify"
            accent="primary"
          />
          <WorkflowShortcutCard
            to="/admin/topics"
            icon={FolderTree}
            title="Topic & subtopic management"
            description="Maintain academic structure used across the bank."
            meta="Foundations"
            accent="accent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard
          className="lg:col-span-3"
          title="Intake activity"
          description="Uploaded files vs. approved questions, this week"
        >
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
      </div>
    </AdminShell>
  );
}
