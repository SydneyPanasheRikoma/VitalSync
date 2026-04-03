import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";
import { mockAlerts, type Alert } from "@/lib/mockData";
import { formatDistanceToNow } from "date-fns";

const alertStyles = {
  low: { badge: "bg-alert-low/10 text-alert-low border-alert-low/20", dot: "bg-alert-low" },
  medium: { badge: "bg-alert-medium/10 text-alert-medium border-alert-medium/20", dot: "bg-alert-medium" },
  critical: { badge: "bg-alert-critical/10 text-alert-critical border-alert-critical/20", dot: "bg-alert-critical" },
};

export function AlertTimeline() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="glass-card rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Alert History</h3>
        <span className="text-xs text-muted-foreground">Last 7 days</span>
      </div>
      <div className="space-y-3">
        {mockAlerts.map((alert) => (
          <AlertItem
            key={alert.id}
            alert={alert}
            expanded={expandedId === alert.id}
            onToggle={() => setExpandedId(expandedId === alert.id ? null : alert.id)}
          />
        ))}
      </div>
    </div>
  );
}

function AlertItem({ alert, expanded, onToggle }: { alert: Alert; expanded: boolean; onToggle: () => void }) {
  const styles = alertStyles[alert.type];
  return (
    <div className="space-y-2">
      <button onClick={onToggle} className="w-full flex items-start gap-3 text-left group">
        <div className="flex flex-col items-center mt-1">
          <div className={`h-2.5 w-2.5 rounded-full ${styles.dot}`} />
          <div className="w-px h-full bg-border min-h-[20px]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-medium truncate">{alert.title}</p>
            <Badge variant="outline" className={`text-[10px] ${styles.badge}`}>
              {alert.type}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
          </p>
        </div>
        {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground mt-1" /> : <ChevronDown className="h-4 w-4 text-muted-foreground mt-1" />}
      </button>
      {expanded && (
        <div className="ml-6 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground animate-slide-in">
          <p>{alert.description}</p>
          {alert.vitals && (
            <div className="flex gap-3 mt-2 text-[11px]">
              {alert.vitals.heartRate && <span>HR: {alert.vitals.heartRate} bpm</span>}
              {alert.vitals.glucose && <span>Glucose: {alert.vitals.glucose} mg/dL</span>}
              {alert.vitals.bpSystolic && <span>BP: {alert.vitals.bpSystolic}/{alert.vitals.bpDiastolic}</span>}
              {alert.vitals.spo2 && <span>SpO2: {alert.vitals.spo2}%</span>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
