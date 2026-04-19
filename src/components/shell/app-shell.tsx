import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar, AppRole } from "@/components/shell/app-sidebar";
import { Topbar } from "@/components/shell/topbar";

interface AppShellProps {
  children: ReactNode;
  role?: AppRole;
  userName?: string;
}

export function AppShell({ children, role = "student", userName }: AppShellProps) {
  const roleLabel: Record<AppRole, string> = {
    student: "Student",
    admin: "Admin",
    "super-admin": "Super Admin",
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-secondary/20">
        <AppSidebar role={role} />
        <div className="flex-1 flex flex-col min-w-0">
          <Topbar userName={userName} userRole={roleLabel[role]} />
          <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
