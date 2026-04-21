import { StudentShell } from "@/components/shell/app-shell";
import { PageHeader } from "@/components/shared/page-header";
import { AchievementCard } from "@/components/student/achievement-card";
import { StreakTracker } from "@/components/student/streak-tracker";
import { MotivationalBanner } from "@/components/student/motivational-banner";
import { mockAchievements } from "@/lib/student-mock";

export default function Achievements() {
  const unlocked = mockAchievements.filter((achievement) => achievement.unlocked).length;

  return (
    <StudentShell>
      <PageHeader
        title="Achievements"
        description={`${unlocked} of ${mockAchievements.length} unlocked - keep going!`}
      />

      <MotivationalBanner
        variant="success"
        message="You're 60% of the way to the Marathoner badge. 8 more exams to go."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <StreakTracker streak={7} className="lg:col-span-1" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
          {mockAchievements.slice(0, 2).map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>

      <h2 className="text-lg font-display font-semibold">All badges</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockAchievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </StudentShell>
  );
}
