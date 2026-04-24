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
    <div className="grid min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      {/* Visual side */}
      <div className="relative hidden flex-col justify-between gradient-hero p-12 text-primary-foreground lg:flex">
        <div className="absolute inset-0 bg-dot-grid opacity-15" />
        <div className="relative z-10">
          <Link to="/">
            <Logo variant="light" />
          </Link>
        </div>
        <div className="relative z-10 max-w-md space-y-6">
          <h2 className="font-display text-[34px] font-semibold leading-[1.15] tracking-tight text-balance">
            Prepare smarter for your semestral mock exam.
          </h2>
          <p className="text-[15px] leading-relaxed text-primary-foreground/75">
            Adaptive reviewers, OCR question banks, and gamified learning — built for Davao del Sur State College Education students.
          </p>
          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              { value: "150", label: "Questions per exam" },
              { value: "80%+", label: "OCR accuracy" },
              { value: "24/7", label: "Practice access" },
            ].map((s) => (
              <div key={s.label} className="rounded-lg bg-white/8 p-3 backdrop-blur-sm">
                <div className="font-display text-xl font-semibold tracking-tight">{s.value}</div>
                <div className="text-[11px] text-primary-foreground/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 text-[12px] text-primary-foreground/55">
          © {new Date().getFullYear()} Davao del Sur State College
        </div>
      </div>

      {/* Form side */}
      <div className="flex min-h-screen flex-col">
        <div className="flex items-center justify-between p-5">
          <div className="lg:hidden">
            <Link to="/">
              <Logo size="sm" />
            </Link>
          </div>
          <div className="hidden lg:block" />
          <ThemeToggle />
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <div className="w-full max-w-sm space-y-7">
            <div className="space-y-1.5">
              <h1 className="font-display text-[26px] font-semibold tracking-tight">{title}</h1>
              {subtitle && <p className="text-[13.5px] text-muted-foreground">{subtitle}</p>}
            </div>
            {children}
          </div>
        </div>

        {footer && <div className="p-6 text-center text-[13px] text-muted-foreground">{footer}</div>}
      </div>
    </div>
  );
}
