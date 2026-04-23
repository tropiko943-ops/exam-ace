import { AcademicCrudPage } from "./AcademicCrudPage";
import { mockMajors, mockPrograms, type Major } from "@/lib/academic-mock";
import { Badge } from "@/components/ui/badge";

export default function AdminMajors() {
  return (
    <AcademicCrudPage<Major>
      title="Majors"
      description="Specializations under programs that require them."
      entityName="Major"
      initialItems={mockMajors}
      searchKeys={["name", "programCode"]}
      columns={[
        { key: "name", header: "Name", cell: (r) => <span className="font-medium">{r.name}</span> },
        { key: "program", header: "Program", cell: (r) => <Badge variant="outline">{r.programCode}</Badge> },
        { key: "students", header: "Students", cell: (r) => <span className="font-mono text-sm">{r.students}</span> },
      ]}
      fields={[
        { name: "name", label: "Major name", placeholder: "e.g. English" },
        { name: "programCode", label: "Program code", placeholder: "e.g. BSEd" },
      ]}
      rowToFormValues={(r) => ({ name: r.name, programCode: r.programCode })}
      buildNew={(v) => {
        const program = mockPrograms.find((p) => p.code === v.programCode);
        return {
          id: `M-${Date.now()}`,
          name: v.name,
          programId: program?.id ?? "P-?",
          programCode: v.programCode,
          students: 0,
          status: "active",
        };
      }}
      applyEdit={(row, v) => ({ ...row, name: v.name, programCode: v.programCode })}
    />
  );
}
