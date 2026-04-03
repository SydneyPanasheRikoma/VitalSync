import { Heart, TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { VitalSigns } from "@/lib/mockData";

interface VitalCardProps {
  label: string;
  value: number | string;
  unit: string;
  icon: React.ReactNode;
  colorClass: string;
  bgClass: string;
  trend?: "up" | "down" | "stable";
  baseline?: string;
  subtitle?: string;
  warning?: boolean;
}

export function VitalCard({ label, value, unit, icon, colorClass, bgClass, trend, baseline, subtitle, warning }: VitalCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  return (
    <div className={`glass-card-hover rounded-xl p-5 relative overflow-hidden ${warning ? "ring-2 ring-alert-critical/40" : ""}`}>
      {warning && (
        <div className="absolute top-0 right-0 px-2 py-0.5 bg-alert-critical text-destructive-foreground text-[10px] font-bold rounded-bl-lg">
          WARNING
        </div>
      )}
      <div className="flex items-start justify-between mb-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${bgClass}`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs ${trend === "up" ? "text-alert-medium" : trend === "down" ? "text-primary" : "text-muted-foreground"}`}>
            <TrendIcon className="h-3 w-3" />
            <span>{trend === "stable" ? "Stable" : trend === "up" ? "Rising" : "Falling"}</span>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <div className="flex items-baseline gap-1">
          <span className={`text-3xl font-bold ${colorClass}`}>{value}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
        {baseline && <p className="text-[11px] text-muted-foreground">Baseline: {baseline}</p>}
        {subtitle && <p className="text-[11px] text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
}

export function VitalSignsGrid({ vitals }: { vitals: VitalSigns }) {
  const hrTrend = vitals.heartRate > vitals.baseline.hrMax ? "up" : vitals.heartRate < vitals.baseline.hrMin ? "down" : "stable";
  const glucoseTrend = vitals.glucose > vitals.baseline.glucoseMax ? "up" : vitals.glucose < vitals.baseline.glucoseMin ? "down" : "stable";
  const predictedGlucose = vitals.glucose + Math.floor(Math.random() * 20 - 5);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <VitalCard
        label="Heart Rate"
        value={vitals.heartRate}
        unit="bpm"
        icon={<Heart className="h-5 w-5 text-vital-heart" />}
        colorClass="text-vital-heart"
        bgClass="bg-vital-heart/10"
        trend={hrTrend}
        baseline={`${vitals.baseline.hrMin}-${vitals.baseline.hrMax} bpm`}
      />
      <VitalCard
        label="Blood Pressure"
        value={`${vitals.bpSystolic}/${vitals.bpDiastolic}`}
        unit="mmHg"
        icon={<svg className="h-5 w-5 text-vital-bp" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>}
        colorClass="text-vital-bp"
        bgClass="bg-vital-bp/10"
        trend={vitals.bpSystolic > 130 ? "up" : "stable"}
        subtitle={vitals.bpSystolic > 130 ? "Slightly elevated" : "Normal range"}
      />
      <VitalCard
        label="Blood Glucose"
        value={vitals.glucose}
        unit="mg/dL"
        icon={<svg className="h-5 w-5 text-vital-glucose" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>}
        colorClass="text-vital-glucose"
        bgClass="bg-vital-glucose/10"
        trend={glucoseTrend}
        baseline={`${vitals.baseline.glucoseMin}-${vitals.baseline.glucoseMax} mg/dL`}
        subtitle={`Predicted in 4h: ${predictedGlucose} mg/dL`}
        warning={vitals.glucose > 150}
      />
      <VitalCard
        label="SpO2"
        value={vitals.spo2}
        unit="%"
        icon={<svg className="h-5 w-5 text-vital-spo2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M12 6v6l4 2"/></svg>}
        colorClass="text-vital-spo2"
        bgClass="bg-vital-spo2/10"
        trend="stable"
        subtitle={vitals.spo2 < 95 ? "⚠️ Below safe threshold" : "Normal oxygen levels"}
        warning={vitals.spo2 < 95}
      />
    </div>
  );
}
