import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
    searchPlaceholder: "Search exams, scores, or badges...",
    profilePath: "/student/profile",
    secondaryPath: "/student/exams/history",
    secondaryLabel: "Exam history",
    notifications: [
      { title: "New streak milestone is ready to claim", time: "5 minutes ago" },
      { title: "Your latest exam result has been posted", time: "18 minutes ago" },
      { title: "Leaderboard rankings updated", time: "1 hour ago" },
    ],
  },
  admin: {
    userRole: "Admin",
    searchPlaceholder: "Search uploads, reviews, or questions...",
    profilePath: "/admin/settings",
    secondaryPath: "/admin/question-review",
    secondaryLabel: "Review queue",
    notifications: [
      { title: "12 OCR uploads need review", time: "5 minutes ago" },
      { title: "Question bank approval queue increased", time: "18 minutes ago" },
      { title: "Item analysis refresh completed", time: "1 hour ago" },
    ],
  },
  "super-admin": {
    userRole: "Super Admin",
    searchPlaceholder: "Search users, logs, or system activity...",
    profilePath: "/super-admin/settings",
    secondaryPath: "/super-admin/logs",
    secondaryLabel: "System logs",
    notifications: [
      { title: "12 new users registered", time: "5 minutes ago" },
      { title: "Question bank review is pending", time: "18 minutes ago" },
      { title: "System logs exported successfully", time: "1 hour ago" },
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
    <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-border/70 bg-background/88 px-3 backdrop-blur-lg sm:px-4 md:gap-4 md:px-6">
      <SidebarTrigger />

      <div className="min-w-0 md:hidden">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">{config.userRole}</p>
        <p className="truncate font-display text-sm font-semibold">{userName}</p>
      </div>

      <div className="hidden max-w-md flex-1 md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder={config.searchPlaceholder} className="border-transparent bg-secondary/60 pl-9" />
        </div>
      </div>

      <div className="flex-1 md:hidden" />

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative rounded-full" aria-label="Open notifications">
              <Bell className="h-[1.2rem] w-[1.2rem]" />
              <Badge className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] text-accent-foreground">
                {config.notifications.length}
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {config.notifications.map((item) => (
              <DropdownMenuItem key={item.title} className="flex-col items-start gap-1 py-3">
                <span className="text-sm font-medium">{item.title}</span>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 rounded-full px-1.5 sm:px-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden flex-col items-start leading-tight md:flex">
                <span className="text-sm font-medium">{userName}</span>
                <span className="text-xs text-muted-foreground">{config.userRole}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{userName}</DropdownMenuLabel>
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
