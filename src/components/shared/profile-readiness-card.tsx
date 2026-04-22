import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileReadinessCardProps {
  percent: number;
  missing?: string[];
  profilePath?: string;
  className?: string;
}

export function ProfileReadinessCard({
  percent,
  missing = [],
  profilePath = "/student/profile",
  className,
}: ProfileReadinessCardProps) {
  const ready = percent >= 100;

  return (
    <Card className={cn("border-border/60", ready ? "bg-success/5" : "bg-warning/5", className)}>
      <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
              ready ? "bg-success/15 text-success" : "bg-warning/15 text-warning",
            )}
          >
            {ready ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          </div>
          <div className="min-w-0 space-y-1.5">
            <p className="font-display text-sm font-semibold sm:text-base">
              {ready ? "Profile is ready for exams" : "Complete your profile to start exams"}
            </p>
            <p className="text-xs text-muted-foreground sm:text-sm">
              {ready
                ? "All required academic info is on file."
                : missing.length > 0
                ? `Still needed: ${missing.join(", ")}`
                : "Add your program, year level, and student number to continue."}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <Progress value={percent} className="h-1.5 max-w-[220px]" />
              <span className="text-xs font-medium text-muted-foreground">{percent}%</span>
            </div>
          </div>
        </div>
        {!ready && (
          <Button asChild size="sm" className="gap-1.5 sm:shrink-0">
            <Link to={profilePath}>
              Update profile <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
