import { Brain, ShieldCheck, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { VitalSigns } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";

export function AIRiskCard({ vitals }: { vitals: VitalSigns }) {
  const score =
    (vitals.glucose > 150 ? 45 : vitals.glucose > 140 ? 30 : 10) +
    (vitals.heartRate > 95 ? 30 : vitals.heartRate > 85 ? 20 : 10) +
    (vitals.spo2 < 94 ? 20 : 5);

  const level = score >= 80 ? "critical" : score >= 55 ? "medium" : score >= 35 ? "low" : "clear";
  const hasRisk = level !== "clear";
  const confidence = hasRisk ? Math.min(96, 65 + Math.floor(score / 2)) : 92;
  const hoursAhead = hasRisk ? 24 + Math.floor((score % 24)) : 48;

  const levelStyles = {
    low: "bg-alert-low/10 text-alert-low border-alert-low/30",
    medium: "bg-alert-medium/10 text-alert-medium border-alert-medium/30",
    critical: "bg-alert-critical/10 text-alert-critical border-alert-critical/30",
    clear: "bg-primary/10 text-primary border-primary/20",
  } as const;

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Brain className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold">AI Risk Prediction</h3>
          <p className="text-xs text-muted-foreground">Baseline Day 7 complete • 24-48h risk window</p>
        </div>
        <Badge variant="outline" className={`ml-auto capitalize ${levelStyles[level]}`}>
          {level === "clear" ? "No active risk" : `${level} risk`}
        </Badge>
      </div>

      {hasRisk ? (
        <div className="space-y-3">
          <div
            className={`flex items-start gap-3 p-3 rounded-lg border ${
              level === "critical"
                ? "bg-alert-critical/5 border-alert-critical/20"
                : level === "medium"
                ? "bg-alert-medium/5 border-alert-medium/20"
                : "bg-alert-low/5 border-alert-low/20"
            }`}
          >
            <AlertTriangle
              className={`h-5 w-5 mt-0.5 shrink-0 ${
                level === "critical" ? "text-alert-critical" : level === "medium" ? "text-alert-medium" : "text-alert-low"
              }`}
            />
            <div className="space-y-1">
              <p className="text-sm font-medium">
                {level === "critical"
                  ? `Critical decompensation risk in ~${hoursAhead} hours`
                  : level === "medium"
                  ? `Moderate risk trend identified for the next ${hoursAhead} hours`
                  : `Low-level risk signal detected in ~${hoursAhead} hours`}
              </p>
              <p className="text-xs text-muted-foreground">
                {vitals.glucose > 140
                  ? "Driver: glucose trend above baseline. Recommendation: hydration, glucose recheck, medication adherence."
                  : "Driver: elevated pulse and oxygen variation. Recommendation: rest, repeat vitals in 30 minutes."}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-medium text-muted-foreground">Confidence</span>
                <Progress value={confidence} className="h-1.5 flex-1" />
                <span className="text-xs font-semibold">{confidence}%</span>
              </div>
            </div>
          </div>

          {/* 48h timeline */}
          <div className="flex items-center gap-1 px-1">
            {Array.from({ length: 48 }).map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full ${
                  i < hoursAhead - 4
                    ? "bg-primary/20"
                    : i < hoursAhead
                    ? "bg-alert-low/60"
                    : "bg-muted"
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground px-1">
            <span>Now</span>
            <span>+24h</span>
            <span>+48h</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-medium text-primary">No active risk</p>
            <p className="text-xs text-muted-foreground">Current trend is within baseline for the next 48 hours.</p>
          </div>
        </div>
      )}
    </div>
  );
}
