import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import type { AppRole } from "@/components/shell/app-sidebar";

interface TopbarProps {
  role?: AppRole;
  userName?: string;
}

const topbarConfig: Record<
  AppRole,
  {
    userRole: string;
    searchPlaceholder: string;
    profilePath: string;
    secondaryPath: string;
    secondaryLabel: string;
    notifications: { title: string; time: string }[];
  }
> = {
  student: {
    userRole: "Student",
    searchPlaceholder: "Search exams, scores, or badges",
    profilePath: "/student/profile",
    secondaryPath: "/student/exams/history",
    secondaryLabel: "Exam history",
    notifications: [
      { title: "Streak milestone ready to claim", time: "5m ago" },
      { title: "New exam result posted", time: "18m ago" },
      { title: "Leaderboard updated", time: "1h ago" },
    ],
  },
  admin: {
    userRole: "Admin",
    searchPlaceholder: "Search batches, reviews, questions",
    profilePath: "/admin/settings",
    secondaryPath: "/admin/question-review",
    secondaryLabel: "Review queue",
    notifications: [
      { title: "12 OCR uploads need review", time: "5m ago" },
      { title: "Approval queue increased", time: "18m ago" },
      { title: "Item analysis refreshed", time: "1h ago" },
    ],
  },
  "super-admin": {
    userRole: "Super Admin",
    searchPlaceholder: "Search users, logs, activity",
    profilePath: "/super-admin/settings",
    secondaryPath: "/super-admin/logs",
    secondaryLabel: "System logs",
    notifications: [
      { title: "12 new users registered", time: "5m ago" },
      { title: "Question bank pending review", time: "18m ago" },
      { title: "Logs exported", time: "1h ago" },
    ],
  },
};

export function Topbar({ role = "student", userName = "Juan dela Cruz" }: TopbarProps) {
  const config = topbarConfig[role];
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur-md sm:px-6">
      <SidebarTrigger className="h-8 w-8" />

      <div className="hidden max-w-sm flex-1 md:block">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder={config.searchPlaceholder} className="h-8 pl-8 text-[13px]" />
        </div>
      </div>

      <div className="flex-1 md:hidden" />

      <div className="ml-auto flex items-center gap-1">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-8 w-8" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel className="text-xs font-semibold">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {config.notifications.map((item) => (
              <DropdownMenuItem key={item.title} className="flex-col items-start gap-0.5 py-2.5">
                <span className="text-[13px] font-medium leading-snug">{item.title}</span>
                <span className="text-[11px] text-muted-foreground">{item.time}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 gap-2 rounded-full px-1.5">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-primary text-[11px] font-semibold text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden flex-col items-start leading-tight md:flex">
                <span className="text-[13px] font-medium">{userName}</span>
                <span className="text-[10.5px] text-muted-foreground">{config.userRole}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="text-xs">{userName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={config.profilePath}>Profile settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={config.secondaryPath}>{config.secondaryLabel}</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/login">Sign out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
