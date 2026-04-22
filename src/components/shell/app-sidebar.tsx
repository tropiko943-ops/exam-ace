import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  History,
  Settings,
  Users,
  ScanText,
  ListChecks,
  BarChart3,
  Activity,
  Award,
  LogOut,
  GraduationCap,
  ShieldCheck,
  LibraryBig,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export type AppRole = "student" | "admin" | "super-admin";

type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

type NavGroup = {
  label: string;
  items: NavItem[];
};

const navByRole: Record<AppRole, NavGroup[]> = {
  student: [
    {
      label: "Review",
      items: [
        { title: "Dashboard", url: "/student", icon: LayoutDashboard },
        { title: "Mock exam", url: "/student/exams", icon: BookOpen },
        { title: "History", url: "/student/exams/history", icon: History },
        { title: "Mastery", url: "/student/mastery", icon: Award },
        { title: "Leaderboards", url: "/student/leaderboards", icon: Trophy },
      ],
    },
    {
      label: "Account",
      items: [
        { title: "Profile", url: "/student/profile", icon: Users },
        { title: "Settings", url: "/student/settings", icon: Settings },
      ],
    },
  ],
  admin: [
    {
      label: "Workflows",
      items: [
        { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
        { title: "Upload batches", url: "/admin/question-upload-batches", icon: ScanText },
        { title: "Question review", url: "/admin/question-review", icon: ListChecks },
        { title: "Classifications", url: "/admin/question-classifications", icon: Activity },
      ],
    },
    {
      label: "Question bank",
      items: [
        { title: "All questions", url: "/admin/questions", icon: BookOpen },
        { title: "Item analysis", url: "/admin/item-analysis", icon: BarChart3 },
      ],
    },
    {
      label: "Academic structure",
      items: [
        { title: "Programs", url: "/admin/programs", icon: LibraryBig },
        { title: "Majors", url: "/admin/majors", icon: GraduationCap },
        { title: "Subjects", url: "/admin/subjects", icon: BookOpen },
        { title: "Topics", url: "/admin/topics", icon: ListChecks },
        { title: "Subtopics", url: "/admin/subtopics", icon: ListChecks },
      ],
    },
    {
      label: "Account",
      items: [{ title: "Settings", url: "/admin/settings", icon: Settings }],
    },
  ],
  "super-admin": [
    {
      label: "Administration",
      items: [
        { title: "Dashboard", url: "/super-admin", icon: LayoutDashboard },
        { title: "Users", url: "/super-admin/users", icon: Users },
        { title: "System logs", url: "/super-admin/logs", icon: Activity },
        { title: "Statistics", url: "/super-admin/stats", icon: BarChart3 },
      ],
    },
    {
      label: "Account",
      items: [{ title: "Settings", url: "/super-admin/settings", icon: Settings }],
    },
  ],
};

const sidebarConfig: Record<
  AppRole,
  {
    homeUrl: string;
    title: string;
    subtitle: string;
    icon: LucideIcon;
    surfaceClassName: string;
    iconClassName: string;
  }
> = {
  student: {
    homeUrl: "/student",
    title: "Student Review",
    subtitle: "Mock Exam Workspace",
    icon: GraduationCap,
    surfaceClassName: "bg-sidebar",
    iconClassName: "bg-white/10 text-white",
  },
  admin: {
    homeUrl: "/admin",
    title: "Admin Console",
    subtitle: "Question Bank Control",
    icon: LibraryBig,
    surfaceClassName: "bg-[linear-gradient(180deg,hsl(var(--sidebar-background)),hsl(222_58%_16%))]",
    iconClassName: "bg-accent/18 text-accent",
  },
  "super-admin": {
    homeUrl: "/super-admin",
    title: "System Control",
    subtitle: "Platform Oversight",
    icon: ShieldCheck,
    surfaceClassName: "bg-[linear-gradient(180deg,hsl(var(--sidebar-background)),hsl(222_52%_14%))]",
    iconClassName: "bg-warning/18 text-warning",
  },
};

export function AppSidebar({ role = "student" }: { role?: AppRole }) {
  const { state, isMobile } = useSidebar();
  const collapsed = !isMobile && state === "collapsed";
  const groups = navByRole[role];
  const config = sidebarConfig[role];
  const BrandIcon = config.icon;

  return (
    <Sidebar
      collapsible="icon"
      className={cn(
        "border-r border-sidebar-border/70 shadow-[inset_-1px_0_0_hsl(var(--sidebar-border)/0.22)]",
        config.surfaceClassName,
      )}
    >
      <SidebarHeader
        className={cn(
          "border-b border-sidebar-border/80 px-4 py-4 transition-[padding] duration-200 ease-out",
          collapsed && "px-2.5 py-2.5",
        )}
      >
        <Link
          to={config.homeUrl}
          className={cn(
            "group relative flex items-center overflow-hidden rounded-2xl border border-white/6 bg-white/[0.03] px-3 py-3 transition-all duration-200 ease-out hover:bg-white/[0.045]",
            collapsed && "mx-auto h-11 w-11 justify-center rounded-xl border-white/10 bg-white/[0.02] p-0",
          )}
        >
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 w-1 rounded-full bg-sidebar-primary/90 transition-opacity duration-150",
              collapsed && "opacity-0",
            )}
          />
          <div className={cn("flex min-w-0 items-center gap-3", collapsed && "gap-0")}>
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm backdrop-blur transition-all duration-200 ease-out",
                config.iconClassName,
                collapsed && "h-11 w-11 rounded-xl bg-transparent shadow-none",
              )}
            >
              <BrandIcon className="h-5 w-5" />
            </div>
            <div
              className={cn(
                "min-w-0 overflow-hidden transition-[max-width,opacity,transform] duration-200 ease-out",
                collapsed ? "max-w-0 -translate-x-2 opacity-0" : "max-w-[11rem] translate-x-0 opacity-100",
              )}
            >
              <p className="truncate font-display text-base font-bold tracking-tight text-white">{config.title}</p>
              <p className="truncate text-[0.65rem] font-medium uppercase tracking-[0.22em] text-sidebar-foreground/60">
                {config.subtitle}
              </p>
            </div>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className={cn("gap-4 px-3 py-4 transition-[padding] duration-200 ease-out", collapsed && "px-2.5 py-4")}>
        {groups.map((group) => (
          <SidebarGroup key={group.label} className={cn("p-0", collapsed && "first:pt-3")}>
            <SidebarGroupLabel
              className={cn(
                "mb-2 h-auto overflow-hidden px-3 text-[0.69rem] font-semibold uppercase tracking-[0.18em] text-sidebar-foreground/55 transition-[max-height,opacity,margin,padding] duration-150 ease-out",
                collapsed && "mb-0 mt-0 max-h-0 px-0 opacity-0",
              )}
            >
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent className="space-y-1">
              <SidebarMenu className="gap-1.5">
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className={cn(
                        "h-11 rounded-xl px-3 text-[15px] font-medium text-sidebar-foreground/88 transition-all duration-150",
                        "hover:bg-white/[0.06] hover:text-white hover:shadow-[inset_0_0_0_1px_hsl(var(--sidebar-border)/0.18)]",
                        collapsed && "mx-auto !h-11 !w-11 !p-0 justify-center rounded-xl",
                      )}
                    >
                      <NavLink
                        to={item.url}
                        end={["/student", "/admin", "/super-admin"].includes(item.url)}
                        className={cn("flex w-full items-center", collapsed ? "h-full w-full justify-center" : "gap-3")}
                        activeClassName={cn(
                          "text-sidebar-primary",
                          collapsed
                            ? "rounded-xl bg-white/[0.08] shadow-[inset_0_0_0_1px_hsl(var(--sidebar-border)/0.24)]"
                            : "bg-white/[0.08] shadow-[inset_0_0_0_1px_hsl(var(--sidebar-border)/0.24)] [&>span:first-child]:bg-sidebar-primary/12 [&>span:first-child]:text-sidebar-primary",
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-transparent bg-white/[0.02] text-sidebar-foreground/70 transition-colors duration-150",
                            collapsed && "h-8 w-8 rounded-md bg-transparent text-sidebar-primary",
                          )}
                        >
                          <item.icon className="h-[18px] w-[18px] shrink-0" />
                        </span>
                        {!collapsed && (
                          <span className="max-w-[10rem] truncate leading-none transition-[max-width,opacity,transform] duration-150 ease-out">
                            {item.title}
                          </span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className={cn("border-t border-sidebar-border/80 px-4 py-3 transition-[padding] duration-200 ease-out", collapsed && "px-2.5 py-2.5")}>
        <Button
          variant="ghost"
          size={collapsed ? "icon" : "default"}
          asChild
          className={cn(
            "h-11 rounded-xl border border-transparent text-sidebar-foreground/88 transition-all duration-150 hover:bg-white/[0.06] hover:text-white hover:shadow-[inset_0_0_0_1px_hsl(var(--sidebar-border)/0.18)]",
            collapsed ? "w-11 px-0" : "w-full justify-start gap-3 px-3",
          )}
        >
          <Link to="/login" className={cn("flex w-full items-center", collapsed ? "justify-center" : "gap-3")}>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.02] text-sidebar-foreground/70">
              <LogOut className="h-4 w-4" />
            </span>
            <span
              className={cn(
                "truncate font-medium leading-none transition-[max-width,opacity,transform] duration-150 ease-out",
                collapsed ? "max-w-0 -translate-x-2 opacity-0" : "max-w-[8rem] translate-x-0 opacity-100",
              )}
            >
              Sign out
            </span>
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
