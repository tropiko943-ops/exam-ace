import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LandingNav } from "@/components/landing/landing-nav";
import { Logo } from "@/components/brand/logo";
import {
  ScanText,
  Brain,
  BarChart3,
  Trophy,
  Shield,
  Users,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Target,
  Flame,
} from "lucide-react";

const features = [
  { icon: ScanText, title: "OCR question intake", desc: "Upload PDFs or images. Tesseract OCR extracts items at 80%+ verified accuracy." },
  { icon: Brain, title: "Adaptive difficulty", desc: "A rule-based engine adjusts each question to your real-time performance." },
  { icon: BarChart3, title: "CTT item analysis", desc: "Difficulty, discrimination, distractor and reliability indices for every exam." },
  { icon: Trophy, title: "Gamified review", desc: "Leaderboards, streaks and motivational feedback that keep students returning." },
  { icon: Shield, title: "Role-based access", desc: "Super Admin, Admin and Student modules with granular permissions and audit logs." },
  { icon: Users, title: "Question bank", desc: "Classify by subject, topic, sub-topic and difficulty. Archive or reactivate anytime." },
];

const modules = [
  { role: "Super Admin", icon: Shield, items: ["Manage admins and students", "Audit system logs", "Export usage statistics"] },
  { role: "Admin", icon: BookOpen, items: ["OCR and manual intake", "Review extracted questions", "CTT item analysis"] },
  { role: "Student", icon: Target, items: ["150-question mock exams", "Adaptive difficulty review", "Leaderboards and streaks"] },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-dot-grid opacity-60" />
        <div className="container relative pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Built for DSSC Education students
            </div>

            <h1 className="font-display text-[44px] font-semibold leading-[1.05] tracking-tight text-balance md:text-[60px]">
              Mock exam practice,<br />
              <span className="text-primary">measurably better.</span>
            </h1>

            <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
              A web-based reviewer with OCR question input, adaptive difficulty, item analysis, and gamification — designed for the Davao del Sur State College community.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
              <Button size="lg" asChild>
                <Link to="/auth/role">
                  Start practicing free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <a href="#features">Explore features</a>
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 text-[12.5px] text-muted-foreground">
              {["No credit card", "Free for DSSC students", "Web-based, no install"].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Floating preview */}
          <div className="relative mx-auto mt-16 max-w-4xl">
            <Card className="overflow-hidden shadow-elegant">
              <div className="grid divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
                {[
                  { icon: Flame, label: "Current streak", value: "12 days", tone: "text-warning" },
                  { icon: Target, label: "Avg. exam score", value: "84.5%", tone: "text-success" },
                  { icon: Trophy, label: "Leaderboard rank", value: "#7", tone: "text-accent" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-4 p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                      <s.icon className={`h-5 w-5 ${s.tone}`} />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">{s.label}</div>
                      <div className="font-display text-xl font-semibold tracking-tight">{s.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border py-20 lg:py-28">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl space-y-3 text-center">
            <p className="eyebrow">Features</p>
            <h2 className="font-display text-[32px] font-semibold tracking-tight text-balance md:text-[40px]">
              Everything you need to ace the mock exam
            </h2>
            <p className="text-[15px] text-muted-foreground">
              From question extraction to performance analytics — built specifically for educators and students.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title} className="group transition-smooth hover:border-foreground/12 hover:shadow-card">
                <CardContent className="space-y-3 p-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <f.icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-display text-[15px] font-semibold tracking-tight">{f.title}</h3>
                  <p className="text-[13px] leading-relaxed text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="border-t border-border bg-secondary/40 py-20 lg:py-28">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl space-y-3 text-center">
            <p className="eyebrow">Three roles</p>
            <h2 className="font-display text-[32px] font-semibold tracking-tight text-balance md:text-[40px]">
              Built for every role in your institution
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {modules.map((m) => (
              <Card key={m.role}>
                <CardContent className="space-y-5 p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/8 text-primary">
                      <m.icon className="h-4 w-4" />
                    </div>
                    <h3 className="font-display text-lg font-semibold tracking-tight">{m.role}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {m.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[13.5px]">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t border-border py-20 lg:py-28">
        <div className="container">
          <div className="mx-auto mb-14 max-w-2xl space-y-3 text-center">
            <p className="eyebrow">How it works</p>
            <h2 className="font-display text-[32px] font-semibold tracking-tight text-balance md:text-[40px]">
              From upload to mastery in three steps
            </h2>
          </div>

          <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-3">
            {[
              { step: "01", title: "Admin uploads materials", desc: "OCR extracts questions, classifies by subject, topic, and difficulty." },
              { step: "02", title: "Student takes adaptive exam", desc: "150 randomized questions adjust difficulty in real-time." },
              { step: "03", title: "Track progress and compete", desc: "View detailed analytics, climb the leaderboard, keep the streak." },
            ].map((s) => (
              <div key={s.step} className="space-y-3">
                <div className="font-display text-4xl font-semibold text-primary/30 tabular-nums">{s.step}</div>
                <h3 className="font-display text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="text-[13.5px] leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-20 lg:py-24">
        <div className="container">
          <Card className="overflow-hidden border-0 gradient-hero text-primary-foreground shadow-elevated">
            <CardContent className="space-y-5 p-10 text-center md:p-14">
              <h2 className="mx-auto max-w-xl font-display text-[28px] font-semibold tracking-tight text-balance md:text-[36px]">
                Ready to start your review journey?
              </h2>
              <p className="mx-auto max-w-lg text-[15px] text-primary-foreground/80">
                Join hundreds of DSSC Education students preparing for their semestral mock exam.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
                <Button size="lg" variant="accent" asChild>
                  <Link to="/auth/sign-up">
                    Create your account
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  asChild
                  className="text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
                >
                  <Link to="/login">I already have an account</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="container">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="space-y-2">
              <Logo size="sm" />
              <p className="max-w-sm text-[12.5px] text-muted-foreground">
                A web-based mock exam reviewer for Davao del Sur State College Education students.
              </p>
            </div>
            <div className="text-[12.5px] text-muted-foreground">
              © {new Date().getFullYear()} DSSC Reviewer. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
