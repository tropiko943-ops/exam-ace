import { NavLink } from "@/components/NavLink";
import { BookOpen, Brain, History, LayoutDashboard, Trophy } from "lucide-react";

const items = [
  { title: "Home", url: "/student", icon: LayoutDashboard, end: true },
  { title: "Exam", url: "/student/exams", icon: BookOpen },
  { title: "History", url: "/student/exams/history", icon: History },
  { title: "Mastery", url: "/student/mastery", icon: Brain },
  { title: "Ranks", url: "/student/leaderboards", icon: Trophy },
];

export function StudentMobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-background/96 px-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 backdrop-blur xl:hidden">
      <div className="mx-auto grid max-w-2xl grid-cols-5 gap-1">
        {items.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.end}
            className="flex min-h-[3.75rem] flex-col items-center justify-center gap-1 rounded-2xl px-1 text-[11px] font-medium text-muted-foreground transition-smooth"
            activeClassName="bg-primary-muted text-primary"
          >
            <item.icon className="h-[18px] w-[18px]" />
            <span className="truncate">{item.title}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
