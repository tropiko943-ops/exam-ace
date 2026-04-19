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
import { Logo } from "@/components/brand/logo";
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
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export type AppRole = "student" | "admin" | "super-admin";

const navByRole: Record<AppRole, { label: string; items: { title: string; url: string; icon: any }[] }[]> = {
  student: [
    {
      label: "Review",
      items: [
        { title: "Dashboard", url: "/app", icon: LayoutDashboard },
        { title: "Take exam", url: "/app/exam", icon: BookOpen },
        { title: "History", url: "/app/history", icon: History },
        { title: "Leaderboard", url: "/app/leaderboard", icon: Trophy },
      ],
    },
    {
      label: "Account",
      items: [{ title: "Settings", url: "/app/settings", icon: Settings }],
    },
  ],
  admin: [
    {
      label: "Question bank",
      items: [
        { title: "Dashboard", url: "/app", icon: LayoutDashboard },
        { title: "OCR upload", url: "/app/ocr", icon: ScanText },
        { title: "Review queue", url: "/app/review", icon: ListChecks },
        { title: "Questions", url: "/app/questions", icon: BookOpen },
        { title: "Item analysis", url: "/app/analysis", icon: BarChart3 },
      ],
    },
    {
      label: "Account",
      items: [{ title: "Settings", url: "/app/settings", icon: Settings }],
    },
  ],
  "super-admin": [
    {
      label: "Administration",
      items: [
        { title: "Dashboard", url: "/app", icon: LayoutDashboard },
        { title: "Users", url: "/app/users", icon: Users },
        { title: "System logs", url: "/app/logs", icon: Activity },
        { title: "Statistics", url: "/app/stats", icon: BarChart3 },
      ],
    },
    {
      label: "Account",
      items: [{ title: "Settings", url: "/app/settings", icon: Settings }],
    },
  ],
};

export function AppSidebar({ role = "student" }: { role?: AppRole }) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const groups = navByRole[role];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <Link to="/app" className="flex items-center">
          {collapsed ? <Logo showText={false} size="sm" variant="light" /> : <Logo size="sm" variant="light" />}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end={item.url === "/app"}
                        className="hover:bg-sidebar-accent"
                        activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <Button
          variant="ghost"
          size={collapsed ? "icon" : "default"}
          asChild
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary"
        >
          <Link to="/auth/sign-in">
            <LogOut className="h-4 w-4" />
            {!collapsed && <span>Sign out</span>}
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
