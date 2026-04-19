import { Link } from "react-router-dom";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  footer?: ReactNode;
}

export function AuthLayout({ children, title, subtitle, footer }: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Visual side */}
      <div className="relative hidden lg:flex flex-col justify-between gradient-hero p-12 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent/30 blur-3xl" />
        </div>
        <div className="relative z-10">
          <Link to="/">
            <Logo variant="light" />
          </Link>
        </div>
        <div className="relative z-10 space-y-6 max-w-md">
          <h2 className="font-display text-4xl font-bold leading-tight text-balance">
            Prepare smarter for your semestral mock exam.
          </h2>
          <p className="text-primary-foreground/80 text-lg leading-relaxed">
            Adaptive reviewers, OCR-powered question banks, and gamified learning—built for Davao del Sur State College Education students.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { value: "150", label: "Questions / exam" },
              { value: "80%+", label: "OCR accuracy" },
              { value: "24/7", label: "Practice access" },
            ].map((s) => (
              <div key={s.label} className="rounded-lg bg-white/10 backdrop-blur p-4">
                <div className="font-display text-2xl font-bold">{s.value}</div>
                <div className="text-xs text-primary-foreground/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 text-sm text-primary-foreground/60">
          © {new Date().getFullYear()} Davao del Sur State College
        </div>
      </div>

      {/* Form side */}
      <div className="flex flex-col min-h-screen">
        <div className="flex items-center justify-between p-6">
          <div className="lg:hidden">
            <Link to="/">
              <Logo size="sm" />
            </Link>
          </div>
          <div className="hidden lg:block" />
          <ThemeToggle />
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md space-y-8 animate-fade-in-up">
            <div className="space-y-2">
              <h1 className="font-display text-3xl font-bold tracking-tight">{title}</h1>
              {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
            </div>
            {children}
          </div>
        </div>

        {footer && <div className="p-6 text-center text-sm text-muted-foreground">{footer}</div>}
      </div>
    </div>
  );
}
