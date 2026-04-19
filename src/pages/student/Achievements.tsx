import { AppShell } from "@/components/shell/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { AchievementCard } from "@/components/student/achievement-card";
import { StreakTracker } from "@/components/student/streak-tracker";
import { MotivationalBanner } from "@/components/student/motivational-banner";
import { mockAchievements } from "@/lib/student-mock";

export default function Achievements() {
  const unlocked = mockAchievements.filter((a) => a.unlocked).length;
  return (
    <AppShell role="student">
      <PageHeader
        title="Achievements"
        description={`${unlocked} of ${mockAchievements.length} unlocked — keep going!`}
      />

      <MotivationalBanner
        variant="success"
        message="You're 60% of the way to the Marathoner badge — 8 more exams to go."
        className="mb-6"
      />

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <StreakTracker streak={7} className="lg:col-span-1" />
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mockAchievements.slice(0, 2).map((a) => (
            <AchievementCard key={a.id} achievement={a} />
          ))}
        </div>
      </div>

      <h2 className="font-display font-semibold text-lg mb-3">All badges</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockAchievements.map((a) => (
          <AchievementCard key={a.id} achievement={a} />
        ))}
      </div>
    </AppShell>
  );
}
