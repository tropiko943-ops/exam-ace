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
    wrapperClassName: "min-h-screen bg-background",
    contentClassName: "mx-auto flex w-full max-w-6xl flex-col gap-5",
  },
  admin: {
    wrapperClassName: "min-h-screen bg-background",
    contentClassName: "mx-auto flex w-full max-w-[88rem] flex-col gap-5",
  },
  "super-admin": {
    wrapperClassName: "min-h-screen bg-background",
    contentClassName: "mx-auto flex w-full max-w-[92rem] flex-col gap-5",
  },
};

function RoleShell({ children, role, userName, mobileNav, contentWrapperClassName, contentPaddingClassName }: RoleShellProps) {
  const config = shellConfig[role];

  return (
    <SidebarProvider className={config.wrapperClassName}>
      <AppSidebar role={role} />
      <SidebarInset className="min-w-0 bg-background">
        <Topbar role={role} userName={userName} />
        <div className={cn("flex-1 px-4 pb-8 pt-5 sm:px-6 md:px-8 md:pt-7", contentPaddingClassName)}>
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
      contentWrapperClassName="max-w-5xl gap-5"
      contentPaddingClassName="pb-24 sm:pb-8"
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
