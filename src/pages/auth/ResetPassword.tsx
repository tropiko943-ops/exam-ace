import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const checks = [
    { label: "8+ characters", ok: form.password.length >= 8 },
    { label: "One uppercase", ok: /[A-Z]/.test(form.password) },
    { label: "One number", ok: /[0-9]/.test(form.password) },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!checks.every((c) => c.ok)) next.password = "Doesn't meet requirements";
    if (form.password !== form.confirm) next.confirm = "Passwords don't match";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Password updated", { description: "You can now sign in." });
      navigate("/auth/sign-in");
    }, 900);
  };

  return (
    <AuthLayout
      title="Set a new password"
      subtitle="Choose a strong password you haven't used before."
      footer={
        <Link to="/auth/sign-in" className="text-primary hover:underline">
          Back to sign in
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="password">New password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPwd ? "text" : "password"}
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <ul className="grid grid-cols-3 gap-2 pt-1">
            {checks.map((c) => (
              <li
                key={c.label}
                className={cn("flex items-center gap-1 text-xs", c.ok ? "text-success" : "text-muted-foreground")}
              >
                <Check className={cn("h-3 w-3", c.ok ? "opacity-100" : "opacity-40")} />
                {c.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm">Confirm password</Label>
          <Input
            id="confirm"
            type={showPwd ? "text" : "password"}
            placeholder="••••••••"
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            aria-invalid={!!errors.confirm}
            className={errors.confirm ? "border-destructive" : ""}
          />
          {errors.confirm && <p className="text-xs text-destructive">{errors.confirm}</p>}
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update password"}
        </Button>
      </form>
    </AuthLayout>
  );
}
