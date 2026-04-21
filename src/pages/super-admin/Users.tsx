import { useMemo, useState } from "react";
import { SuperAdminShell } from "@/components/shell/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { FilterBar } from "@/components/shared/filter-bar";
import { DataTableShell } from "@/components/shared/data-table-shell";
import { StatusBadge } from "@/components/shared/status-badge";
import { StatCard } from "@/components/shared/stat-card";
import { UserActionsMenu } from "@/components/shared/user-actions-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Archive,
  Clock3,
  Download,
  ShieldCheck,
  UserPlus,
  Users,
  XCircle,
} from "lucide-react";
import { mockUsers } from "@/lib/mock-data";
import { toast } from "sonner";

export default function SuperAdminUsers() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const query = search.toLowerCase();

    return mockUsers.filter((u) => {
      const matchSearch = !search || u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query);
      const matchRole = role === "all" || u.role.toLowerCase() === role;
      const matchStatus = status === "all" || u.status === status;
      return matchSearch && matchRole && matchStatus;
    });
  }, [search, role, status]);

  const metrics = useMemo(
    () => ({
      pending: mockUsers.filter((u) => u.role === "Student" && u.status === "pending").length,
      admins: mockUsers.filter((u) => u.role === "Admin").length,
      approvedStudents: mockUsers.filter((u) => u.role === "Student" && u.status === "active").length,
      rejectedStudents: mockUsers.filter((u) => u.role === "Student" && u.status === "rejected").length,
    }),
    [],
  );

  const allChecked = filtered.length > 0 && filtered.every((u) => selected.includes(u.id));

  const toggleAll = () => {
    setSelected(
      allChecked
        ? selected.filter((id) => !filtered.some((u) => u.id === id))
        : Array.from(new Set([...selected, ...filtered.map((u) => u.id)])),
    );
  };

  const toggleOne = (id: string) => {
    setSelected(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]);
  };

  const clearFilters = () => {
    setSearch("");
    setRole("all");
    setStatus("all");
  };

  return (
    <SuperAdminShell userName="Dr. Reyes">
      <PageHeader
        title="User management"
        description="Invite admin accounts and review student registrations before they can access the platform."
        actions={
          <>
            <Button variant="outline">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="h-4 w-4" />
                  Invite admin
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite admin account</DialogTitle>
                  <DialogDescription>
                    Only one super admin exists. Student accounts are created through registration and reviewed here for approval.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" placeholder="Juan dela Cruz" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="user@dssc.edu.ph" />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Select defaultValue="admin" disabled>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => toast.success("Admin invitation sent")}>Send invitation</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Pending review"
          value={metrics.pending}
          icon={Clock3}
          accent="warning"
          hint="Awaiting approval"
        />
        <StatCard
          label="Admin accounts"
          value={metrics.admins}
          icon={ShieldCheck}
          accent="primary"
          hint="Invited by super admin"
        />
        <StatCard
          label="Approved students"
          value={metrics.approvedStudents}
          icon={Users}
          accent="success"
          hint="With active access"
        />
        <StatCard
          label="Rejected registrations"
          value={metrics.rejectedStudents}
          icon={XCircle}
          accent="accent"
          hint="Denied after review"
        />
      </div>

      {metrics.pending > 0 && (
        <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-warning/30 bg-warning/10 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-semibold text-warning">
              <Clock3 className="h-4 w-4" />
              Student registration queue
            </div>
            <p className="text-sm text-muted-foreground">
              {metrics.pending} student account{metrics.pending === 1 ? "" : "s"} need approval before exam access is enabled.
            </p>
          </div>
          <Button
            variant="outline"
            className="border-warning/30 bg-background/80 hover:bg-background"
            onClick={() => setStatus("pending")}
          >
            Review pending registrations
          </Button>
        </div>
      )}

      <FilterBar
        searchPlaceholder="Search by name or email..."
        searchValue={search}
        onSearchChange={setSearch}
      >
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="student">Student</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </FilterBar>

      {selected.length > 0 && (
        <div className="mb-3 flex items-center justify-between rounded-lg border border-primary/20 bg-primary-muted/60 px-4 py-2">
          <span className="text-sm font-medium">{selected.length} selected</span>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              <Archive className="h-4 w-4" />
              Archive
            </Button>
            <Button size="sm" variant="outline" onClick={() => setSelected([])}>
              Clear
            </Button>
          </div>
        </div>
      )}

      <DataTableShell>
        <div className="flex flex-col gap-3 border-b border-border/60 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-lg font-semibold tracking-tight">Accounts directory</h2>
              <Badge variant="outline" className="border-border/60 bg-secondary/50 text-foreground">
                {filtered.length} results
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Admin invitations and student registrations are managed from one review table.
            </p>
          </div>
          {(role !== "all" || status !== "all" || search) && (
            <Button
              variant="ghost"
              className="justify-start px-0 text-muted-foreground hover:bg-transparent hover:text-foreground"
              onClick={clearFilters}
            >
              Clear filters
            </Button>
          )}
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/40 hover:bg-secondary/40">
              <TableHead className="w-10">
                <Checkbox checked={allChecked} onCheckedChange={toggleAll} />
              </TableHead>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Last active</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((u) => {
              const initials = u.name.split(" ").map((n) => n[0]).slice(0, 2).join("");
              const needsReview = u.role === "Student" && u.status === "pending";

              return (
                <TableRow key={u.id}>
                  <TableCell>
                    <Checkbox checked={selected.includes(u.id)} onCheckedChange={() => toggleOne(u.id)} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <div className="truncate font-medium">{u.name}</div>
                          {needsReview && (
                            <Badge className="rounded-full bg-warning/12 px-2 py-0 text-[10px] font-semibold uppercase tracking-wide text-warning hover:bg-warning/12">
                              Needs review
                            </Badge>
                          )}
                        </div>
                        <div className="truncate text-xs text-muted-foreground">{u.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-primary/30 bg-primary-muted/40 text-primary">
                      {u.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={u.status} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{u.joined}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{u.lastActive}</TableCell>
                  <TableCell>
                    <UserActionsMenu
                      needsReview={needsReview}
                      onEdit={() => toast.success("Profile updated")}
                      onApprove={() => toast.success("Student registration approved")}
                      onDisapprove={() => toast.success("Student registration disapproved")}
                      onResetPassword={() => toast.success("Reset link sent")}
                      onArchive={() => toast.success("User archived")}
                      onDelete={() => toast.success("User deleted")}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </DataTableShell>
    </SuperAdminShell>
  );
}
