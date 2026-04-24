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
  Tags,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export type AppRole = "student" | "admin" | "super-admin";

type NavItem = { title: string; url: string; icon: LucideIcon };
type NavGroup = { label: string; items: NavItem[] };

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
        { title: "Classifications", url: "/admin/question-classifications", icon: Tags },
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
  ],
};

const sidebarConfig: Record<
  AppRole,
  { homeUrl: string; title: string; subtitle: string; icon: LucideIcon }
> = {
  student: {
    homeUrl: "/student",
    title: "DSSC Reviewer",
    subtitle: "Student",
    icon: GraduationCap,
  },
  admin: {
    homeUrl: "/admin",
    title: "DSSC Reviewer",
    subtitle: "Admin",
    icon: LibraryBig,
  },
  "super-admin": {
    homeUrl: "/super-admin",
    title: "DSSC Reviewer",
    subtitle: "Super Admin",
    icon: ShieldCheck,
  },
};

export function AppSidebar({ role = "student" }: { role?: AppRole }) {
  const { state, isMobile } = useSidebar();
  const collapsed = !isMobile && state === "collapsed";
  const groups = navByRole[role];
  const config = sidebarConfig[role];
  const BrandIcon = config.icon;

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader
        className={cn(
          "h-14 border-b border-sidebar-border px-3 transition-[padding] duration-200 ease-out",
          collapsed && "px-2",
        )}
      >
        <Link
          to={config.homeUrl}
          className={cn(
            "flex h-full items-center gap-2.5 rounded-md px-2 transition-colors hover:bg-sidebar-accent",
            collapsed && "justify-center px-0",
          )}
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <BrandIcon className="h-3.5 w-3.5" />
          </div>
          {!collapsed && (
            <div className="min-w-0 leading-tight">
              <p className="truncate font-display text-[14px] font-semibold tracking-tight text-sidebar-foreground">
                {config.title}
              </p>
              <p className="truncate text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {config.subtitle}
              </p>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className={cn("gap-5 px-2.5 py-4", collapsed && "px-2 py-3")}>
        {groups.map((group) => (
          <SidebarGroup key={group.label} className="p-0">
            <SidebarGroupLabel
              className={cn(
                "mb-1 h-auto px-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/80 transition-[opacity,max-height] duration-150",
                collapsed && "max-h-0 overflow-hidden opacity-0",
              )}
            >
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className={cn(
                        "h-8 rounded-md px-2 text-[13px] font-medium text-sidebar-foreground/80 transition-colors",
                        "hover:bg-sidebar-accent hover:text-sidebar-foreground",
                        collapsed && "justify-center px-0",
                      )}
                    >
                      <NavLink
                        to={item.url}
                        end={["/student", "/admin", "/super-admin"].includes(item.url)}
                        className={cn("flex w-full items-center gap-2.5", collapsed && "justify-center gap-0")}
                        activeClassName="bg-sidebar-accent text-sidebar-foreground font-semibold [&>svg]:text-primary"
                      >
                        <item.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                        {!collapsed && <span className="truncate">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className={cn("border-t border-sidebar-border px-2.5 py-2.5", collapsed && "px-2")}>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className={cn(
            "h-8 justify-start gap-2.5 rounded-md px-2 text-[13px] font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
            collapsed && "w-full justify-center px-0",
          )}
        >
          <Link to="/login">
            <LogOut className="h-4 w-4 text-muted-foreground" />
            {!collapsed && <span>Sign out</span>}
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
