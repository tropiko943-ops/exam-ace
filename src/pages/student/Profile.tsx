import { useState } from "react";
import { Link } from "react-router-dom";
import { StudentShell } from "@/components/shell/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { ProfileReadinessCard } from "@/components/shared/profile-readiness-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockPrograms, mockMajors } from "@/lib/academic-mock";
import { loadProfile, saveProfile } from "@/lib/profile-storage";
import { toast } from "sonner";
import { BookOpen, Mail, IdCard, GraduationCap } from "lucide-react";

export default function StudentProfile() {
  const initial = loadProfile();
  const [data, setData] = useState({
    fullName: initial.fullName,
    email: initial.email,
    studentNumber: initial.studentNumber,
    programCode: initial.programCode,
    yearLevel: initial.yearLevel,
    major: initial.major ?? "",
    targetLet: initial.targetLet ?? "",
  });

  const program = mockPrograms.find((p) => p.code === data.programCode);
  const requiresMajor = !!program?.requiresMajor;
  const majors = mockMajors.filter((m) => m.programCode === data.programCode);

  const save = () => {
    saveProfile({
      fullName: data.fullName,
      email: data.email,
      studentNumber: data.studentNumber,
      programCode: data.programCode,
      programName: program?.name ?? data.programCode,
      yearLevel: data.yearLevel,
      major: requiresMajor ? data.major : undefined,
      targetLet: data.targetLet,
      hasOnboarded: true,
    });
    toast.success("Profile updated", { description: "Your changes have been saved." });
  };

  const refreshed = loadProfile();

  return (
    <StudentShell userName={data.fullName}>
      <PageHeader
        title="Student profile"
        description="Make sure your academic info is up to date before starting an exam."
        actions={
          <Button asChild variant="outline">
            <Link to="/student"><BookOpen className="h-4 w-4" />Back to dashboard</Link>
          </Button>
        }
      />

      <ProfileReadinessCard percent={refreshed.readinessPercent} missing={refreshed.missingFields} profilePath="/student/profile" />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="font-display text-lg">Personal info</CardTitle>
            <CardDescription>Used for sign-in, certificates, and notifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full name</Label>
                <Input id="fullName" value={data.fullName} onChange={(e) => setData({ ...data, fullName: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentNumber">Student number</Label>
                <Input id="studentNumber" value={data.studentNumber} onChange={(e) => setData({ ...data, studentNumber: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetLet">Target LET date</Label>
                <Input id="targetLet" type="date" value={data.targetLet} onChange={(e) => setData({ ...data, targetLet: e.target.value })} />
              </div>
            </div>

            <div className="border-t border-border pt-5 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Program</Label>
                  <Select value={data.programCode} onValueChange={(v) => setData({ ...data, programCode: v, major: "" })}>
                    <SelectTrigger><SelectValue placeholder="Select program" /></SelectTrigger>
                    <SelectContent>
                      {mockPrograms.map((p) => (
                        <SelectItem key={p.code} value={p.code}>{p.code} — {p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Year level</Label>
                  <Select value={data.yearLevel} onValueChange={(v) => setData({ ...data, yearLevel: v })}>
                    <SelectTrigger><SelectValue placeholder="Year level" /></SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4].map((y) => (
                        <SelectItem key={y} value={String(y)}>{y}{y === 1 ? "st" : y === 2 ? "nd" : y === 3 ? "rd" : "th"} year</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {requiresMajor && (
                  <div className="space-y-2 md:col-span-2">
                    <Label>Major</Label>
                    <Select value={data.major} onValueChange={(v) => setData({ ...data, major: v })}>
                      <SelectTrigger><SelectValue placeholder="Select major" /></SelectTrigger>
                      <SelectContent>
                        {majors.map((m) => (
                          <SelectItem key={m.id} value={m.name}>{m.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button variant="outline" asChild>
                <Link to="/student">Cancel</Link>
              </Button>
              <Button onClick={save}>Save changes</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="font-display text-base">At a glance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary text-primary-foreground">{refreshed.initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate font-display font-semibold">{data.fullName || "—"}</p>
                <p className="truncate text-xs text-muted-foreground">{data.email || "—"}</p>
              </div>
            </div>
            <Detail icon={IdCard} label="Student #" value={data.studentNumber || "—"} />
            <Detail icon={GraduationCap} label="Program" value={data.programCode ? `${data.programCode}${requiresMajor && data.major ? ` · ${data.major}` : ""}` : "—"} />
            <Detail icon={Mail} label="Year level" value={data.yearLevel ? `${data.yearLevel} year` : "—"} />
          </CardContent>
        </Card>
      </div>
    </StudentShell>
  );
}

function Detail({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-muted text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate font-medium">{value}</p>
      </div>
    </div>
  );
}
