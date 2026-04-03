import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { VitalSignsGrid } from "@/components/VitalSignsGrid";
import { AIRiskCard } from "@/components/AIRiskCard";
import { AlertTimeline } from "@/components/AlertTimeline";
import { MedicationTracker } from "@/components/MedicationTracker";
import { FamilyConnect } from "@/components/FamilyConnect";
import { EmergencyModal } from "@/components/EmergencyModal";
import { useVitals } from "@/hooks/useVitals";
import { Button } from "@/components/ui/button";
import { Phone, Activity } from "lucide-react";

const PatientDashboard = () => {
  const { vitals, syncAgo, isRecent } = useVitals();
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  return (
    <AppLayout role="patient">
      <div className="max-w-7xl mx-auto space-y-6 animate-slide-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Amara</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              Your AI Health Guardian
              <span className="flex items-center gap-1.5 text-xs">
                <span className={`h-2 w-2 rounded-full ${isRecent ? "bg-primary vital-pulse" : "bg-alert-low"}`} />
                Synced {syncAgo < 60 ? `${syncAgo}s ago` : `${Math.floor(syncAgo / 60)}m ago`}
              </span>
            </p>
          </div>
          <Button
            className="bg-alert-critical hover:bg-alert-critical/90 text-destructive-foreground gap-2 shadow-lg"
            onClick={() => setEmergencyOpen(true)}
          >
            <Phone className="h-4 w-4" />
            Emergency
          </Button>
        </div>

        {/* Vital Signs */}
        <VitalSignsGrid vitals={vitals} />

        {/* AI + Alerts + Meds */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <AIRiskCard vitals={vitals} />
            <AlertTimeline />
          </div>
          <div className="space-y-4">
            <MedicationTracker />
            <FamilyConnect />
          </div>
        </div>
      </div>
      <EmergencyModal open={emergencyOpen} onOpenChange={setEmergencyOpen} />
    </AppLayout>
  );
};

export default PatientDashboard;
