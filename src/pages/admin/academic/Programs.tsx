import { AcademicCrudPage } from "./AcademicCrudPage";
import { mockPrograms, type Program } from "@/lib/academic-mock";
import { Badge } from "@/components/ui/badge";

export default function AdminPrograms() {
  return (
    <AcademicCrudPage<Program>
      title="Programs"
      description="Bachelor programs offered by the College of Education."
      entityName="Program"
      initialItems={mockPrograms}
      searchKeys={["code", "name"]}
      columns={[
        { key: "code", header: "Code", cell: (r) => <span className="font-mono text-sm">{r.code}</span> },
        { key: "name", header: "Name", cell: (r) => <span className="font-medium">{r.name}</span> },
        {
          key: "majors",
          header: "Majors",
          cell: (r) => (r.requiresMajor ? <Badge variant="outline">{r.majors}</Badge> : <span className="text-xs text-muted-foreground">N/A</span>),
        },
        { key: "students", header: "Students", cell: (r) => <span className="font-mono text-sm">{r.students}</span> },
        { key: "updated", header: "Updated", cell: (r) => <span className="text-sm text-muted-foreground">{r.updated}</span> },
      ]}
      fields={[
        { name: "code", label: "Program code", placeholder: "e.g. BSEd" },
        { name: "name", label: "Program name", placeholder: "Bachelor of …" },
      ]}
      rowToFormValues={(r) => ({ code: r.code, name: r.name })}
      buildNew={(v) => ({
        id: `P-${Date.now()}`,
        code: v.code,
        name: v.name,
        requiresMajor: false,
        majors: 0,
        students: 0,
        status: "active",
        updated: new Date().toISOString().slice(0, 10),
      })}
      applyEdit={(row, v) => ({ ...row, code: v.code, name: v.name, updated: new Date().toISOString().slice(0, 10) })}
    />
  );
}
