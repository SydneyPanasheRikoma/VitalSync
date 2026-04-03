import { Brain, ShieldCheck, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { VitalSigns } from "@/lib/mockData";

export function AIRiskCard({ vitals }: { vitals: VitalSigns }) {
  const hasRisk = vitals.glucose > 140 || vitals.heartRate > 90;
  const confidence = hasRisk ? Math.floor(Math.random() * 20 + 70) : 0;
  const hoursAhead = hasRisk ? Math.floor(Math.random() * 30 + 6) : 0;

  return (
    <div className="glass-card rounded-xl p-5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Brain className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold">AI Risk Prediction</h3>
          <p className="text-xs text-muted-foreground">Next 48 hours analysis</p>
        </div>
      </div>

      {hasRisk ? (
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-alert-low/5 border border-alert-low/20">
            <AlertTriangle className="h-5 w-5 text-alert-low mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-medium">
                {vitals.glucose > 140
                  ? `Hyperglycemia risk in ~${hoursAhead} hours`
                  : `Elevated heart rate pattern detected`}
              </p>
              <p className="text-xs text-muted-foreground">
                {vitals.glucose > 140
                  ? "Suggested: Stay hydrated, check ketone levels, consider light activity."
                  : "Suggested: Monitor stress levels, avoid caffeine, ensure rest."}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-medium text-muted-foreground">Confidence</span>
                <Progress value={confidence} className="h-1.5 flex-1" />
                <span className="text-xs font-semibold text-alert-low">{confidence}%</span>
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
            <p className="text-sm font-medium text-primary">All Clear — Stable</p>
            <p className="text-xs text-muted-foreground">AI sees no anomalies in your next 48 hours.</p>
          </div>
        </div>
      )}
    </div>
  );
}
