import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = ["Profile", "Academic", "Preferences"];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    studentId: "",
    yearLevel: "",
    program: "",
    subjects: "",
    goal: "",
  });

  const next = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Profile complete!", { description: "Welcome aboard." });
      navigate("/");
    }, 900);
  };

  return (
    <AuthLayout
      title="Set up your profile"
      subtitle={`Step ${step + 1} of ${steps.length} — ${steps[step]}`}
    >
      <div className="space-y-8">
        {/* Progress */}
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
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                placeholder="2024-00123"
                value={data.studentId}
                onChange={(e) => setData({ ...data, studentId: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="program">Program</Label>
              <Select value={data.program} onValueChange={(v) => setData({ ...data, program: v })}>
                <SelectTrigger id="program">
                  <SelectValue placeholder="Select your program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bsed-eng">BSEd English</SelectItem>
                  <SelectItem value="bsed-math">BSEd Mathematics</SelectItem>
                  <SelectItem value="bsed-sci">BSEd Sciences</SelectItem>
                  <SelectItem value="bsed-fil">BSEd Filipino</SelectItem>
                  <SelectItem value="beed">BEEd</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-2">
              <Label htmlFor="year">Year level</Label>
              <Select value={data.yearLevel} onValueChange={(v) => setData({ ...data, yearLevel: v })}>
                <SelectTrigger id="year">
                  <SelectValue placeholder="Select year level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1st year</SelectItem>
                  <SelectItem value="2">2nd year</SelectItem>
                  <SelectItem value="3">3rd year</SelectItem>
                  <SelectItem value="4">4th year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subjects">Focus subjects</Label>
              <Input
                id="subjects"
                placeholder="e.g. Gen Ed, Professional Ed"
                value={data.subjects}
                onChange={(e) => setData({ ...data, subjects: e.target.value })}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-2">
              <Label htmlFor="goal">Weekly review goal</Label>
              <Select value={data.goal} onValueChange={(v) => setData({ ...data, goal: v })}>
                <SelectTrigger id="goal">
                  <SelectValue placeholder="Pick a target" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 mock exam / week</SelectItem>
                  <SelectItem value="3">3 mock exams / week</SelectItem>
                  <SelectItem value="5">5 mock exams / week</SelectItem>
                  <SelectItem value="daily">Daily practice</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="rounded-lg border border-border bg-secondary/40 p-4 flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
              <div className="text-sm">
                <div className="font-medium">You're all set!</div>
                <p className="text-muted-foreground">
                  We'll personalize your dashboard and recommend reviewers based on your goal.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          {step > 0 && (
            <Button variant="outline" size="lg" onClick={() => setStep(step - 1)} className="flex-1">
              Back
            </Button>
          )}
          <Button size="lg" onClick={next} disabled={loading} className="flex-1">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : step === steps.length - 1 ? (
              "Finish"
            ) : (
              "Continue"
            )}
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:underline">
            Skip for now
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
