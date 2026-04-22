

## Goal

Realign the existing UI with the formal Student and Admin journeys you described. Keep the navy design system, shared components, and mock data. Restructure routes, reorganize navigation, and add the missing screens so both flows can be walked end-to-end.

## Student Journey — what changes

**Routes (renamed + new):**
- `/student` — Dashboard (replaces `/app`) with profile-readiness banner that gates "Start Mock Exam".
- `/student/profile` — Profile view + edit (new).
- `/student/exams` — Generate / resume exam landing (replaces `/app/exam/start`), shows active session if any.
- `/student/exams/:examSession` — In-session question runner (replaces `/app/exam/session`), persists progress per question.
- `/student/exams/:examSession/review` — Per-question review with chosen vs correct + explanation drawer (new, replaces results).
- `/student/exams/history` — Past sessions (replaces `/app/history`).
- `/student/mastery` — Weak areas, mastery per subject/topic, trend chart (new).
- `/student/leaderboards` — Rankings + points + badges + recent achievement events (extends current leaderboard).
- `/student/settings` — kept.

**Onboarding rewrite to 3 steps:** Account (name, email, password) → Academic (program, year level, student number, major if program requires it) → Review (confirm + submit). On submit: mock sign-in then route to `/student/profile`.

**Dashboard gating:** add a "Profile readiness" card; "Start Mock Exam" button is disabled with "Update Profile" CTA when incomplete.

## Admin Journey — what changes

**Unified login:** new `/login` route reusing the SignIn page; existing `/auth/sign-in` kept as alias.

**Admin dashboard `/admin`:** redesigned with 6 workflow shortcut cards (Upload Questions, Batch Monitoring, Question Review, Question Bank, Question Classification, Topic & Subtopic Management) on top of existing KPIs.

**Academic structure (new CRUD pages, mock data, table + create/edit dialog pattern):**
- `/admin/programs`, `/admin/majors`, `/admin/subjects`, `/admin/topics`, `/admin/subtopics`.

**Question upload batches (replaces current `/admin/ocr`):**
- `/admin/question-upload-batches` — list of batches with status/confidence.
- `/admin/question-upload-batches/create` — drag-and-drop OCR upload.
- `/admin/question-upload-batches/manual` — manual batch entry form.
- `/admin/question-upload-batches/:id` — batch detail: status timeline, confidence, extracted page text (editable), Retry / Cancel / Queue-for-review actions.

**Review and classification:**
- `/admin/question-review` (replaces `/admin/review`) — edit stem, fix choices, mark valid, archive invalid.
- `/admin/question-classifications` — bulk-assign verified questions to subject/topic/subtopic.
- `/admin/questions` — full bank (existing `/admin/questions` kept).
- `/admin/item-analysis` (renamed from `/admin/analysis`) — kept, with export buttons surfaced.

**Sidebar updates** to reflect the new groups: Workflows, Academic Structure, Question Bank, Analysis.

## Shared work

- Extend `mock-data.ts` with `Program`, `Major`, `Subject`, `Topic`, `Subtopic`, `UploadBatch`, `BatchPage`, plus a `currentStudentProfile` object with a `readinessPercent`.
- Extend `student-mock.ts` with `mastery` per topic and `achievementEvents` feed.
- Reusable new pieces: `ProfileReadinessCard`, `WorkflowShortcutCard`, `BatchStatusTimeline`, `EditableExtractedText`, `MasteryHeatmap` (simple bar list), `AchievementEventList`. All built on existing shadcn primitives — no new design tokens.
- `AppSidebar` updated for the new role-aware paths; `AppShell` untouched.
- All `/app/...` and `/admin/ocr` etc. old routes redirect to their new paths so existing links keep working.

## Out of scope

- No backend/Lovable Cloud wiring — mock data only.
- No visual redesign of existing components or color tokens.
- Super Admin module is unchanged (you didn't include it in this journey).

## Technical notes

- Pure client-side routing in `App.tsx` with `<Navigate>` for old → new paths.
- Profile readiness stored in `localStorage` ("dssc-profile") seeded from onboarding submit, read by Dashboard + Exam start to gate CTA.
- Active exam session persisted in `sessionStorage` keyed by `examSession` id so `/student/exams` can detect "Resume" vs "Generate and start".
- Batch detail uses tabs: Overview · Pages (editable text) · Extracted questions · Activity.
- All new pages follow existing `PageHeader + FilterBar + DataTableShell` pattern; no new dependencies.

