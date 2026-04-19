import { Award, Flame, Star, Target, Trophy, Zap, LucideIcon, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Achievement } from "@/lib/student-mock";

const iconMap: Record<Achievement["icon"], LucideIcon> = {
  flame: Flame,
  trophy: Trophy,
  target: Target,
  zap: Zap,
  award: Award,
  star: Star,
};

export function AchievementCard({ achievement }: { achievement: Achievement }) {
  const Icon = iconMap[achievement.icon];
  return (
    <Card
      className={cn(
        "border-border/50 transition-smooth hover:shadow-md",
        achievement.unlocked && "ring-1 ring-accent/40",
      )}
    >
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div
            className={cn(
              "h-11 w-11 rounded-xl flex items-center justify-center",
              achievement.unlocked
                ? "bg-gradient-accent text-accent-foreground shadow-sm"
                : "bg-muted text-muted-foreground",
            )}
          >
            {achievement.unlocked ? <Icon className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
          </div>
          {achievement.unlocked && (
            <span className="text-[10px] font-semibold uppercase tracking-wide text-accent bg-accent/10 px-2 py-0.5 rounded-full">
              Unlocked
            </span>
          )}
        </div>
        <div className="space-y-1">
          <h3 className="font-display font-semibold tracking-tight">{achievement.title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{achievement.description}</p>
        </div>
        <div className="space-y-1">
          <Progress value={achievement.progress} className="h-1.5" />
          <p className="text-[10px] text-muted-foreground font-medium">{achievement.progress}% complete</p>
        </div>
      </CardContent>
    </Card>
  );
}
