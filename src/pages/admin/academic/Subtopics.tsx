import { AcademicCrudPage } from "./AcademicCrudPage";
import { mockSubtopics, mockTopics, type Subtopic } from "@/lib/academic-mock";
import { Badge } from "@/components/ui/badge";

export default function AdminSubtopics() {
  return (
    <AcademicCrudPage<Subtopic>
      title="Sub-topics"
      description="The most granular classification level for questions."
      entityName="Sub-topic"
      initialItems={mockSubtopics}
      searchKeys={["name", "topicName", "subjectName"]}
      columns={[
        { key: "name", header: "Name", cell: (r) => <span className="font-medium">{r.name}</span> },
        { key: "topic", header: "Topic", cell: (r) => <Badge variant="outline">{r.topicName}</Badge> },
        { key: "subject", header: "Subject", cell: (r) => <span className="text-sm text-muted-foreground">{r.subjectName}</span> },
        { key: "questions", header: "Questions", cell: (r) => <span className="font-mono text-sm">{r.questions}</span> },
      ]}
      fields={[
        { name: "name", label: "Sub-topic name", placeholder: "e.g. Behaviorism" },
        { name: "topicName", label: "Topic", placeholder: "Learning Theories" },
      ]}
      rowToFormValues={(r) => ({ name: r.name, topicName: r.topicName })}
      buildNew={(v) => {
        const topic = mockTopics.find((t) => t.name === v.topicName);
        return {
          id: `ST-${Date.now()}`,
          name: v.name,
          topicId: topic?.id ?? "T-?",
          topicName: v.topicName,
          subjectName: topic?.subjectName ?? "—",
          questions: 0,
          status: "active",
        };
      }}
      applyEdit={(row, v) => ({ ...row, name: v.name, topicName: v.topicName })}
    />
  );
}
