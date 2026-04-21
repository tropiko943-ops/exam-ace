import { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar, AppRole } from "@/components/shell/app-sidebar";
import { Topbar } from "@/components/shell/topbar";
import { StudentMobileNav } from "@/components/student/student-mobile-nav";
import { cn } from "@/lib/utils";

interface RoleShellProps {
  children: ReactNode;
  role: AppRole;
  userName?: string;
  mobileNav?: ReactNode;
  contentWrapperClassName?: string;
  contentPaddingClassName?: string;
}

interface NamedShellProps {
  children: ReactNode;
  userName?: string;
}

const shellConfig: Record<AppRole, { wrapperClassName: string; contentClassName: string }> = {
  student: {
    wrapperClassName:
      "min-h-screen bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.06),transparent_28%),linear-gradient(180deg,hsl(var(--background)),hsl(var(--secondary)/0.35))]",
    contentClassName: "mx-auto flex w-full max-w-7xl flex-col gap-4 sm:gap-5 md:gap-6",
  },
  admin: {
    wrapperClassName:
      "min-h-screen bg-[radial-gradient(circle_at_top_left,hsl(var(--accent)/0.08),transparent_24%),linear-gradient(180deg,hsl(var(--background)),hsl(var(--secondary)/0.5))]",
    contentClassName: "mx-auto flex w-full max-w-[96rem] flex-col gap-4 sm:gap-5 md:gap-6",
  },
  "super-admin": {
    wrapperClassName:
      "min-h-screen bg-[radial-gradient(circle_at_top_right,hsl(var(--warning)/0.10),transparent_22%),linear-gradient(180deg,hsl(var(--background)),hsl(var(--secondary)/0.6))]",
    contentClassName: "mx-auto flex w-full max-w-[100rem] flex-col gap-4 sm:gap-5 md:gap-6",
  },
};

function RoleShell({ children, role, userName, mobileNav, contentWrapperClassName, contentPaddingClassName }: RoleShellProps) {
  const config = shellConfig[role];

  return (
    <SidebarProvider className={config.wrapperClassName}>
      <AppSidebar role={role} />
      <SidebarInset className="min-w-0">
        <Topbar role={role} userName={userName} />
        <div
          className={cn(
            "flex-1 px-3 pb-5 pt-3 sm:px-4 sm:pb-6 sm:pt-4 md:px-6 md:pb-8 md:pt-5 lg:px-8",
            contentPaddingClassName,
          )}
        >
          <div className={cn(config.contentClassName, contentWrapperClassName)}>{children}</div>
        </div>
        {mobileNav}
      </SidebarInset>
    </SidebarProvider>
  );
}

export function StudentShell({ children, userName }: NamedShellProps) {
  return (
    <RoleShell
      role="student"
      userName={userName}
      mobileNav={<StudentMobileNav />}
      contentWrapperClassName="max-w-5xl gap-3 sm:gap-4 md:gap-5"
      contentPaddingClassName="pb-24 sm:pb-6 md:pb-8"
    >
      {children}
    </RoleShell>
  );
}

export function AdminShell({ children, userName }: NamedShellProps) {
  return <RoleShell role="admin" userName={userName} children={children} />;
}

export function SuperAdminShell({ children, userName }: NamedShellProps) {
  return <RoleShell role="super-admin" userName={userName} children={children} />;
}

export function AppShell({ children, role = "student", userName }: { children: ReactNode; role?: AppRole; userName?: string }) {
  return (
    <RoleShell role={role} userName={userName}>
      {children}
    </RoleShell>
  );
}
