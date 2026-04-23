import { ReactNode, useMemo, useState } from "react";
import { AdminShell } from "@/components/shell/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { FilterBar } from "@/components/shared/filter-bar";
import { DataTableShell } from "@/components/shared/data-table-shell";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Archive, ArchiveRestore, MoreHorizontal, Pencil, Plus } from "lucide-react";
import { toast } from "sonner";

export type AcademicColumn<T> = {
  key: string;
  header: string;
  cell: (row: T) => ReactNode;
  className?: string;
};

export type AcademicField = {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text";
};

interface AcademicCrudPageProps<T extends { id: string; status: "active" | "archived" }> {
  title: string;
  description: string;
  entityName: string;
  initialItems: T[];
  columns: AcademicColumn<T>[];
  searchKeys: (keyof T)[];
  fields: AcademicField[];
  buildNew: (values: Record<string, string>) => T;
  applyEdit: (row: T, values: Record<string, string>) => T;
  rowToFormValues: (row: T) => Record<string, string>;
}

export function AcademicCrudPage<T extends { id: string; status: "active" | "archived" }>(props: AcademicCrudPageProps<T>) {
  const {
    title, description, entityName, initialItems, columns, searchKeys, fields,
    buildNew, applyEdit, rowToFormValues,
  } = props;

  const [items, setItems] = useState<T[]>(initialItems);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<T | null>(null);
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((f) => [f.name, ""])),
  );

  const filtered = useMemo(
    () =>
      items.filter((row) => {
        if (!search) return true;
        const q = search.toLowerCase();
        return searchKeys.some((k) => String(row[k] ?? "").toLowerCase().includes(q));
      }),
    [items, search, searchKeys],
  );

  const openCreate = () => {
    setEditing(null);
    setValues(Object.fromEntries(fields.map((f) => [f.name, ""])));
    setDialogOpen(true);
  };

  const openEdit = (row: T) => {
    setEditing(row);
    setValues(rowToFormValues(row));
    setDialogOpen(true);
  };

  const submit = () => {
    if (fields.some((f) => !values[f.name]?.trim())) {
      toast.error("Please fill in all fields");
      return;
    }
    if (editing) {
      setItems(items.map((row) => (row.id === editing.id ? applyEdit(row, values) : row)));
      toast.success(`${entityName} updated`);
    } else {
      setItems([buildNew(values), ...items]);
      toast.success(`${entityName} created`);
    }
    setDialogOpen(false);
  };

  const archive = (row: T) => {
    setItems(items.map((r) => (r.id === row.id ? { ...r, status: "archived" } : r)));
    toast.success(`${entityName} archived`);
  };
  const reactivate = (row: T) => {
    setItems(items.map((r) => (r.id === row.id ? { ...r, status: "active" } : r)));
    toast.success(`${entityName} reactivated`);
  };

  return (
    <AdminShell userName="Maria Santos">
      <PageHeader
        title={title}
        description={description}
        actions={
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreate}>
                <Plus className="h-4 w-4" />New {entityName.toLowerCase()}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-display">
                  {editing ? `Edit ${entityName.toLowerCase()}` : `New ${entityName.toLowerCase()}`}
                </DialogTitle>
                <DialogDescription>
                  {editing ? "Update the details below." : `Add a new ${entityName.toLowerCase()} to the catalog.`}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                {fields.map((field) => (
                  <div key={field.name} className="space-y-2">
                    <Label htmlFor={field.name}>{field.label}</Label>
                    <Input
                      id={field.name}
                      placeholder={field.placeholder}
                      value={values[field.name] ?? ""}
                      onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
                    />
                  </div>
                ))}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={submit}>{editing ? "Save changes" : `Create ${entityName.toLowerCase()}`}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <FilterBar
        searchPlaceholder={`Search ${entityName.toLowerCase()}...`}
        searchValue={search}
        onSearchChange={setSearch}
      />

      <DataTableShell>
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/40 hover:bg-secondary/40">
              {columns.map((col) => (
                <TableHead key={col.key} className={col.className}>{col.header}</TableHead>
              ))}
              <TableHead>Status</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((row) => (
              <TableRow key={row.id}>
                {columns.map((col) => (
                  <TableCell key={col.key} className={col.className}>{col.cell(row)}</TableCell>
                ))}
                <TableCell><StatusBadge status={row.status} /></TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEdit(row)}>
                        <Pencil className="h-4 w-4" />Edit
                      </DropdownMenuItem>
                      {row.status === "active" ? (
                        <DropdownMenuItem onClick={() => archive(row)}>
                          <Archive className="h-4 w-4" />Archive
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => reactivate(row)}>
                          <ArchiveRestore className="h-4 w-4" />Reactivate
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DataTableShell>
    </AdminShell>
  );
}
