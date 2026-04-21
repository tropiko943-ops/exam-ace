import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Archive,
  CheckCircle2,
  PencilLine,
  KeyRound,
  MoreHorizontal,
  Trash2,
  XCircle,
} from "lucide-react";

interface UserActionsMenuProps {
  needsReview?: boolean;
  onEdit: () => void;
  onApprove?: () => void;
  onDisapprove?: () => void;
  onResetPassword?: () => void;
  onArchive?: () => void;
  onDelete: () => void;
}

export function UserActionsMenu({
  needsReview = false,
  onEdit,
  onApprove,
  onDisapprove,
  onResetPassword,
  onArchive,
  onDelete,
}: UserActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52 rounded-xl border-border/60 p-1.5 shadow-lg">
        <DropdownMenuLabel className="px-2 pb-2 pt-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Account actions
        </DropdownMenuLabel>

        <DropdownMenuItem
          className="gap-2.5 rounded-lg px-2 py-2 font-medium text-sky-700 hover:bg-sky-100 hover:text-sky-900 focus:bg-sky-100 focus:text-sky-900 dark:text-sky-300 dark:hover:bg-sky-500/20 dark:focus:bg-sky-500/20 dark:focus:text-sky-100"
          onClick={onEdit}
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-100/80 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">
            <PencilLine className="h-4 w-4" />
          </span>
          Edit details
        </DropdownMenuItem>

        {needsReview ? (
          <>
            <DropdownMenuSeparator className="mx-0 my-2" />
            <DropdownMenuItem
              className="gap-2.5 rounded-lg px-2 py-2 font-medium text-success hover:bg-success/20 hover:text-success focus:bg-success/20 focus:text-success"
              onClick={onApprove}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-success/10 text-success">
                <CheckCircle2 className="h-4 w-4" />
              </span>
              Approve registration
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2.5 rounded-lg px-2 py-2 font-medium text-warning hover:bg-warning/20 hover:text-warning focus:bg-warning/20 focus:text-warning"
              onClick={onDisapprove}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-warning/10 text-warning">
                <XCircle className="h-4 w-4" />
              </span>
              Disapprove registration
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem
              className="gap-2.5 rounded-lg px-2 py-2 font-medium hover:bg-accent focus:bg-accent"
              onClick={onResetPassword}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground/80">
                <KeyRound className="h-4 w-4" />
              </span>
              Reset password
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2.5 rounded-lg px-2 py-2 font-medium hover:bg-accent focus:bg-accent"
              onClick={onArchive}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground/80">
                <Archive className="h-4 w-4" />
              </span>
              Archive
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator className="mx-0 my-2" />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="gap-2.5 rounded-lg px-2 py-2 font-medium text-destructive hover:bg-destructive/15 hover:text-destructive focus:bg-destructive/15 focus:text-destructive"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                <Trash2 className="h-4 w-4" />
              </span>
              Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this user?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. The user&apos;s data will be permanently removed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={onDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
