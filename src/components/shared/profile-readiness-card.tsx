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
    <Card className={cn(className)}>
      <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
              ready ? "bg-success/10 text-success" : "bg-warning/10 text-warning",
            )}
          >
            {ready ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          </div>
          <div className="min-w-0 space-y-1.5">
            <p className="text-sm font-semibold">
              {ready ? "Profile complete" : "Complete your profile to start exams"}
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {ready
                ? "All required academic info is on file."
                : missing.length > 0
                ? `Missing: ${missing.join(", ")}`
                : "Add program, year level, and student number."}
            </p>
            <div className="flex items-center gap-2 pt-0.5">
              <Progress value={percent} className="h-1 max-w-[200px]" />
              <span className="text-xs font-medium tabular-nums text-muted-foreground">{percent}%</span>
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
