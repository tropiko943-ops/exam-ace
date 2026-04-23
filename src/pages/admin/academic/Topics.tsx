import { AcademicCrudPage } from "./AcademicCrudPage";
import { mockSubjects, mockTopics, type Topic } from "@/lib/academic-mock";
import { Badge } from "@/components/ui/badge";

export default function AdminTopics() {
  return (
    <AcademicCrudPage<Topic>
      title="Topics"
      description="Topics group related sub-topics under each subject."
      entityName="Topic"
      initialItems={mockTopics}
      searchKeys={["name", "subjectName"]}
      columns={[
        { key: "name", header: "Name", cell: (r) => <span className="font-medium">{r.name}</span> },
        { key: "subject", header: "Subject", cell: (r) => <Badge variant="outline">{r.subjectName}</Badge> },
        { key: "subtopics", header: "Sub-topics", cell: (r) => <span className="font-mono text-sm">{r.subtopics}</span> },
        { key: "questions", header: "Questions", cell: (r) => <span className="font-mono text-sm">{r.questions}</span> },
      ]}
      fields={[
        { name: "name", label: "Topic name", placeholder: "e.g. Learning Theories" },
        { name: "subjectName", label: "Subject", placeholder: "Professional Education" },
      ]}
      rowToFormValues={(r) => ({ name: r.name, subjectName: r.subjectName })}
      buildNew={(v) => {
        const subj = mockSubjects.find((s) => s.name === v.subjectName);
        return {
          id: `T-${Date.now()}`,
          name: v.name,
          subjectId: subj?.id ?? "S-?",
          subjectName: v.subjectName,
          subtopics: 0,
          questions: 0,
          status: "active",
        };
      }}
      applyEdit={(row, v) => ({ ...row, name: v.name, subjectName: v.subjectName })}
    />
  );
}
