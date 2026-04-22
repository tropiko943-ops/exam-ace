import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockPrograms, mockMajors } from "@/lib/academic-mock";
import { saveProfile } from "@/lib/profile-storage";

const steps = ["Account", "Academic", "Review"];

type FormState = {
  fullName: string;
  email: string;
  password: string;
  programCode: string;
  yearLevel: string;
  studentNumber: string;
  major: string;
};

const blank: FormState = {
  fullName: "",
  email: "",
  password: "",
  programCode: "",
  yearLevel: "",
  studentNumber: "",
  major: "",
};

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [data, setData] = useState<FormState>(blank);

  const program = mockPrograms.find((p) => p.code === data.programCode);
  const requiresMajor = !!program?.requiresMajor;
  const programMajors = useMemo(() => mockMajors.filter((m) => m.programCode === data.programCode), [data.programCode]);

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (step === 0) {
      if (!data.fullName.trim()) next.fullName = "Full name is required";
      if (!data.email.trim()) next.email = "Email is required";
      else if (!/^\S+@\S+\.\S+$/.test(data.email)) next.email = "Enter a valid email";
      if (!data.password) next.password = "Password is required";
      else if (data.password.length < 6) next.password = "At least 6 characters";
    }
    if (step === 1) {
      if (!data.programCode) next.programCode = "Pick your program";
      if (!data.yearLevel) next.yearLevel = "Pick a year level";
      if (!data.studentNumber.trim()) next.studentNumber = "Student number is required";
      if (requiresMajor && !data.major) next.major = "Required for this program";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const next = () => {
    if (!validate()) return;
    if (step < steps.length - 1) {
      setStep(step + 1);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      saveProfile({
        fullName: data.fullName,
        email: data.email,
        studentNumber: data.studentNumber,
        programCode: data.programCode,
        programName: program?.name ?? data.programCode,
        yearLevel: data.yearLevel,
        major: requiresMajor ? data.major : undefined,
        hasOnboarded: true,
      });
      setLoading(false);
      toast.success("Account created", { description: "Welcome aboard. Let's review your profile." });
      navigate("/student/profile");
    }, 700);
  };

  return (
    <AuthLayout
      title="Create your student account"
      subtitle={`Step ${step + 1} of ${steps.length} — ${steps[step]}`}
    >
      <div className="space-y-7">
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-smooth",
                i <= step ? "bg-primary" : "bg-muted",
              )}
            />
          ))}
        </div>

        {step === 0 && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input id="fullName" placeholder="Juan dela Cruz" value={data.fullName}
                onChange={(e) => setData({ ...data, fullName: e.target.value })}
                className={errors.fullName ? "border-destructive" : ""} />
              {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@dssc.edu.ph" value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className={errors.email ? "border-destructive" : ""} />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="At least 6 characters" value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className={errors.password ? "border-destructive" : ""} />
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-2">
              <Label>Program</Label>
              <Select value={data.programCode} onValueChange={(v) => setData({ ...data, programCode: v, major: "" })}>
                <SelectTrigger className={errors.programCode ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select your program" />
                </SelectTrigger>
                <SelectContent>
                  {mockPrograms.map((p) => (
                    <SelectItem key={p.code} value={p.code}>{p.code} — {p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.programCode && <p className="text-xs text-destructive">{errors.programCode}</p>}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Year level</Label>
                <Select value={data.yearLevel} onValueChange={(v) => setData({ ...data, yearLevel: v })}>
                  <SelectTrigger className={errors.yearLevel ? "border-destructive" : ""}>
                    <SelectValue placeholder="Year level" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4].map((y) => (
                      <SelectItem key={y} value={String(y)}>{y}{y === 1 ? "st" : y === 2 ? "nd" : y === 3 ? "rd" : "th"} year</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.yearLevel && <p className="text-xs text-destructive">{errors.yearLevel}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentNumber">Student number</Label>
                <Input id="studentNumber" placeholder="2024-00123" value={data.studentNumber}
                  onChange={(e) => setData({ ...data, studentNumber: e.target.value })}
                  className={errors.studentNumber ? "border-destructive" : ""} />
                {errors.studentNumber && <p className="text-xs text-destructive">{errors.studentNumber}</p>}
              </div>
            </div>
            {requiresMajor && (
              <div className="space-y-2">
                <Label>Major</Label>
                <Select value={data.major} onValueChange={(v) => setData({ ...data, major: v })}>
                  <SelectTrigger className={errors.major ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select your major" />
                  </SelectTrigger>
                  <SelectContent>
                    {programMajors.map((m) => (
                      <SelectItem key={m.id} value={m.name}>{m.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.major && <p className="text-xs text-destructive">{errors.major}</p>}
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div className="rounded-xl border border-border bg-secondary/40 p-5 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Account</p>
              <div className="grid gap-1 text-sm">
                <Row label="Name" value={data.fullName} />
                <Row label="Email" value={data.email} />
              </div>
              <div className="border-t border-border pt-3" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Academic</p>
              <div className="grid gap-1 text-sm">
                <Row label="Program" value={`${data.programCode} — ${program?.name ?? ""}`} />
                <Row label="Year level" value={data.yearLevel ? `${data.yearLevel} year` : "—"} />
                <Row label="Student #" value={data.studentNumber} />
                {requiresMajor && <Row label="Major" value={data.major} />}
              </div>
            </div>
            <div className="rounded-lg border border-border bg-secondary/40 p-4 flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
              <div className="text-sm">
                <div className="font-medium">Almost there</div>
                <p className="text-muted-foreground">
                  We'll sign you in and take you to your profile so you can confirm everything.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          {step > 0 && (
            <Button variant="outline" size="lg" onClick={() => setStep(step - 1)} className="flex-1" disabled={loading}>
              Back
            </Button>
          )}
          <Button size="lg" onClick={next} disabled={loading} className="flex-1">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : step === steps.length - 1 ? "Create account" : "Continue"}
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right truncate">{value || "—"}</span>
    </div>
  );
}
