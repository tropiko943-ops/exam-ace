import { NavLink } from "@/components/NavLink";
import { BookOpen, History, LayoutDashboard, Settings, Trophy } from "lucide-react";

const items = [
  { title: "Home", url: "/app", icon: LayoutDashboard, end: true },
  { title: "Exam", url: "/app/exam/start", icon: BookOpen },
  { title: "History", url: "/app/history", icon: History },
  { title: "Ranks", url: "/app/leaderboard", icon: Trophy },
  { title: "Settings", url: "/app/settings", icon: Settings },
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
