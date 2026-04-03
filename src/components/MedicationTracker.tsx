import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Pill, AlertCircle, Clock } from "lucide-react";
import { mockMedications } from "@/lib/mockData";

export function MedicationTracker() {
  const [meds, setMeds] = useState(mockMedications);

  const toggleMed = (id: string) => {
    setMeds((prev) => prev.map((m) => (m.id === id ? { ...m, taken: !m.taken } : m)));
  };

  return (
    <div className="glass-card rounded-xl p-5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-vital-bp/10">
          <Pill className="h-5 w-5 text-vital-bp" />
        </div>
        <div>
          <h3 className="text-sm font-semibold">Today's Medications</h3>
          <p className="text-xs text-muted-foreground">
            {meds.filter((m) => m.taken).length}/{meds.length} taken
          </p>
        </div>
      </div>
      <div className="space-y-2">
        {meds.map((med) => (
          <div
            key={med.id}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
              med.taken ? "bg-primary/5 border-primary/10" : "bg-card border-border hover:border-primary/20"
            }`}
          >
            <Checkbox checked={med.taken} onCheckedChange={() => toggleMed(med.id)} />
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${med.taken ? "line-through text-muted-foreground" : ""}`}>
                {med.name} — {med.dosage}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{med.time}</span>
                {med.refillDays <= 10 && (
                  <span className="flex items-center gap-1 text-alert-low">
                    <AlertCircle className="h-3 w-3" />
                    Refill in {med.refillDays}d
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
