import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Sparkles,
  BookOpen,
  Target,
  Flame,
} from "lucide-react";

const features = [
  {
    icon: ScanText,
    title: "OCR Question Input",
    desc: "Upload PDFs or images and let Tesseract OCR extract questions with 80%+ verified accuracy.",
  },
  {
    icon: Brain,
    title: "Adaptive Difficulty",
    desc: "Rule-based engine adjusts question difficulty in real-time based on student performance.",
  },
  {
    icon: BarChart3,
    title: "CTT Item Analysis",
    desc: "Difficulty index, discrimination index, distractor and reliability analysis for every exam.",
  },
  {
    icon: Trophy,
    title: "Gamified Learning",
    desc: "Leaderboards, streaks, and motivational feedback to keep students engaged daily.",
  },
  {
    icon: Shield,
    title: "Role-Based Access",
    desc: "Super Admin, Admin, and Student modules with granular permissions and audit logs.",
  },
  {
    icon: Users,
    title: "Question Bank Management",
    desc: "Classify by subject, topic, sub-topic, and difficulty. Archive and reactivate anytime.",
  },
];

const modules = [
  {
    role: "Super Admin",
    color: "from-primary to-primary-glow",
    icon: Shield,
    items: ["Manage Admin & Student accounts", "View system logs & audit records", "Export usage statistics"],
  },
  {
    role: "Admin",
    color: "from-primary-glow to-accent",
    icon: BookOpen,
    items: ["OCR & manual question entry", "Review extracted questions", "CTT-based item analysis"],
  },
  {
    role: "Student",
    color: "from-accent to-warning",
    icon: Target,
    items: ["150-question randomized mock exams", "Adaptive difficulty review", "Leaderboards & streaks"],
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-subtle" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl" />

        <div className="container relative pt-20 pb-24 lg:pt-32 lg:pb-40">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
            <Badge variant="secondary" className="gap-1.5 px-4 py-1.5 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Built for DSSC Education students
            </Badge>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.05]">
              Master your{" "}
              <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
                semestral mock exam
              </span>{" "}
              with confidence.
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
              A web-based reviewer with OCR-assisted question input, adaptive difficulty, item analysis,
              and gamification—designed for the Davao del Sur State College community.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button size="xl" variant="hero" asChild>
                <Link to="/auth/role">
                  Start practicing free
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <a href="#features">Explore features</a>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 pt-8 text-sm text-muted-foreground">
              {["No credit card required", "Free for DSSC students", "Web-based, no install"].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Floating preview card */}
          <div className="relative mt-20 max-w-5xl mx-auto animate-fade-in">
            <div className="absolute inset-0 gradient-hero blur-3xl opacity-20 rounded-3xl" />
            <Card className="relative shadow-elegant border-border/50 overflow-hidden">
              <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
                {[
                  { icon: Flame, label: "Current streak", value: "12 days", color: "text-warning" },
                  { icon: Target, label: "Avg. exam score", value: "84.5%", color: "text-success" },
                  { icon: Trophy, label: "Leaderboard rank", value: "#7", color: "text-accent" },
                ].map((s) => (
                  <div key={s.label} className="p-6 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center">
                      <s.icon className={`h-6 w-6 ${s.color}`} />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{s.label}</div>
                      <div className="font-display text-2xl font-bold">{s.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 lg:py-32">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
            <Badge variant="outline" className="px-3 py-1">Features</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-balance">
              Everything you need to ace the mock exam
            </h2>
            <p className="text-lg text-muted-foreground text-balance">
              From question extraction to performance analytics—built specifically for educators and students.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <Card
                key={f.title}
                className="group hover:shadow-elegant transition-smooth border-border/50 hover:border-primary/30"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-xl bg-primary-muted flex items-center justify-center group-hover:scale-110 transition-smooth">
                    <f.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="py-24 lg:py-32 bg-secondary/30">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
            <Badge variant="outline" className="px-3 py-1">Three modules</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-balance">
              Built for every role in your institution
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {modules.map((m) => (
              <Card key={m.role} className="overflow-hidden border-border/50 hover:shadow-elegant transition-smooth">
                <div className={`h-2 bg-gradient-to-r ${m.color}`} />
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-primary-muted flex items-center justify-center">
                      <m.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-display text-2xl font-bold">{m.role}</h3>
                  </div>
                  <ul className="space-y-3">
                    {m.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
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
      <section id="how-it-works" className="py-24 lg:py-32">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
            <Badge variant="outline" className="px-3 py-1">How it works</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-balance">
              From upload to mastery in three steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Admin uploads materials", desc: "OCR extracts questions, classifies by subject, topic, and difficulty." },
              { step: "02", title: "Student takes adaptive exam", desc: "150 randomized questions adjust difficulty based on real-time performance." },
              { step: "03", title: "Track progress & compete", desc: "View detailed analytics, climb the leaderboard, and maintain study streaks." },
            ].map((s) => (
              <div key={s.step} className="relative space-y-4">
                <div className="font-display text-6xl font-bold text-primary/20">{s.step}</div>
                <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <Card className="relative overflow-hidden border-0 gradient-hero text-primary-foreground shadow-elegant">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-accent/40 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
            </div>
            <CardContent className="relative p-12 md:p-16 text-center space-y-6">
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-balance">
                Ready to start your review journey?
              </h2>
              <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto text-balance">
                Join hundreds of DSSC Education students preparing for their semestral mock exam.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Button size="xl" variant="accent" asChild>
                  <Link to="/auth/sign-up">
                    Create your account
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  asChild
                  className="bg-white/10 border-white/30 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground"
                >
                  <Link to="/auth/sign-in">I already have an account</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-3">
              <Logo size="sm" />
              <p className="text-sm text-muted-foreground max-w-sm">
                A web-based mock exam reviewer for Davao del Sur State College Education students.
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} DSSC Mock Exam Reviewer. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
