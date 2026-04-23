import { AcademicCrudPage } from "./AcademicCrudPage";
import { mockSubjects, type Subject } from "@/lib/academic-mock";
import { Badge } from "@/components/ui/badge";

export default function AdminSubjects() {
  return (
    <AcademicCrudPage<Subject>
      title="Subjects"
      description="Top-level categories used to classify questions in the bank."
      entityName="Subject"
      initialItems={mockSubjects}
      searchKeys={["code", "name", "area"]}
      columns={[
        { key: "code", header: "Code", cell: (r) => <span className="font-mono text-sm">{r.code}</span> },
        { key: "name", header: "Name", cell: (r) => <span className="font-medium">{r.name}</span> },
        { key: "area", header: "Area", cell: (r) => <Badge variant="outline">{r.area}</Badge> },
        { key: "topics", header: "Topics", cell: (r) => <span className="font-mono text-sm">{r.topics}</span> },
        { key: "questions", header: "Questions", cell: (r) => <span className="font-mono text-sm">{r.questions}</span> },
      ]}
      fields={[
        { name: "code", label: "Subject code", placeholder: "e.g. PROF-ED" },
        { name: "name", label: "Subject name", placeholder: "e.g. Professional Education" },
        { name: "area", label: "Area", placeholder: "Professional Education / General Education / Specialization" },
      ]}
      rowToFormValues={(r) => ({ code: r.code, name: r.name, area: r.area })}
      buildNew={(v) => ({
        id: `S-${Date.now()}`,
        code: v.code,
        name: v.name,
        area: (v.area as Subject["area"]) || "Specialization",
        topics: 0,
        questions: 0,
        status: "active",
      })}
      applyEdit={(row, v) => ({ ...row, code: v.code, name: v.name, area: (v.area as Subject["area"]) || row.area })}
    />
  );
}
