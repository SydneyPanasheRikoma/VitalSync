import { AppLayout } from "@/components/AppLayout";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Phone, ShieldCheck, AlertTriangle, BookOpen, Clock } from "lucide-react";
import { mockAlerts, mockEducationArticles, mockPatients } from "@/lib/mockData";
import { getCurrentUser } from "@/lib/auth";

const FamilyDashboard = () => {
  const user = getCurrentUser();
  const linked = useMemo(() => {
    if (user?.linkedPatients?.length) {
      return mockPatients.filter((patient) => user.linkedPatients.includes(patient.id));
    }

    return mockPatients.slice(0, 2);
  }, [user]);

  const [selectedPatientId, setSelectedPatientId] = useState(linked[0]?.id ?? "1");
  const selectedPatient = linked.find((patient) => patient.id === selectedPatientId) ?? linked[0];

  const criticalAlerts = mockAlerts.filter((a) => a.type !== "low");
  const selectedVitals = selectedPatient?.lastVitals;
  const isStable = selectedVitals
    ? selectedVitals.glucose <= 140 && selectedVitals.heartRate <= 90 && selectedVitals.spo2 >= 95
    : true;

  return (
    <AppLayout role="family">
      <div className="max-w-4xl mx-auto space-y-6 animate-slide-in">
        <h1 className="text-2xl font-semibold">Family Monitoring Dashboard</h1>

        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <p className="mb-3 text-sm font-medium">Linked Patients</p>
          <div className="flex flex-wrap gap-2">
            {linked.map((patient) => (
              <Button
                key={patient.id}
                type="button"
                variant={selectedPatientId === patient.id ? "default" : "outline"}
                onClick={() => setSelectedPatientId(patient.id)}
                className="h-8"
              >
                {patient.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Patient card */}
        <div className={`rounded-xl border border-border bg-card p-6 shadow-sm space-y-4 ${!isStable ? "ring-2 ring-alert-medium/40" : ""}`}>
          {isStable ? (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Patient is stable with no active alerts</span>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-alert-medium/5 border border-alert-medium/20">
              <AlertTriangle className="h-5 w-5 text-alert-medium" />
              <span className="text-sm font-medium text-alert-medium">Alert active: vitals require attention</span>
            </div>
          )}

          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">{selectedPatient?.avatar || "PT"}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">{selectedPatient?.name || "Patient"}</h2>
              <p className="text-sm text-muted-foreground">
                {selectedPatient?.condition || "Chronic monitoring"} • Age {selectedPatient?.age || "--"}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Last active: within 5 minutes
              </div>
            </div>
          </div>

          {/* Vitals summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="text-center p-3 rounded-lg bg-vital-heart/5">
              <p className="text-xs text-muted-foreground">Heart Rate</p>
              <p className="text-xl font-bold text-vital-heart">{selectedVitals?.heartRate}</p>
              <p className="text-[10px] text-muted-foreground">bpm</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-vital-bp/5">
              <p className="text-xs text-muted-foreground">BP</p>
              <p className="text-xl font-bold text-vital-bp">{selectedVitals?.bpSystolic}/{selectedVitals?.bpDiastolic}</p>
              <p className="text-[10px] text-muted-foreground">mmHg</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-vital-glucose/5">
              <p className="text-xs text-muted-foreground">Glucose</p>
              <p className="text-xl font-bold text-vital-glucose">{selectedVitals?.glucose}</p>
              <p className="text-[10px] text-muted-foreground">mg/dL</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-vital-spo2/5">
              <p className="text-xs text-muted-foreground">SpO2</p>
              <p className="text-xl font-bold text-vital-spo2">{selectedVitals?.spo2}%</p>
              <p className="text-[10px] text-muted-foreground">oxygen</p>
            </div>
          </div>
        </div>

        {/* Alert Timeline */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-3 shadow-sm">
          <h3 className="text-sm font-semibold">Recent Alerts</h3>
          <div className="space-y-2">
            {criticalAlerts.map((alert) => (
              <div key={alert.id} className={`p-3 rounded-lg border ${
                alert.type === "critical" ? "border-alert-critical/20 bg-alert-critical/5" : "border-alert-medium/20 bg-alert-medium/5"
              }`}>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`text-[10px] ${
                    alert.type === "critical" ? "bg-alert-critical/10 text-alert-critical border-alert-critical/20" : "bg-alert-medium/10 text-alert-medium border-alert-medium/20"
                  }`}>{alert.type}</Badge>
                  <span className="text-xs text-muted-foreground">{new Date(alert.timestamp).toLocaleDateString()}</span>
                </div>
                <p className="text-sm font-medium mt-1">{alert.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-3 shadow-sm">
          <h3 className="text-sm font-semibold">Emergency Contacts</h3>
          <div className="space-y-2">
            {[
              { name: "Dr. Smith", phone: "(555) 123-4567" },
              { name: "City Hospital", phone: "(555) 000-1111" },
              { name: "911", phone: "Emergency Services" },
            ].map((contact) => (
              <div key={contact.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{contact.name}</p>
                    <p className="text-xs text-muted-foreground">{contact.phone}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-xs h-7">Call</Button>
              </div>
            ))}
            <Button variant="outline" className="w-full text-xs">Test Alert System</Button>
          </div>
        </div>

        {/* Health Education */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-3 shadow-sm">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold">Recommended Reading</h3>
          </div>
          <div className="space-y-2">
            {mockEducationArticles.slice(0, 3).map((article) => (
              <div key={article.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                <div>
                  <p className="text-sm font-medium">{article.title}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="text-[10px]">{article.category}</Badge>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default FamilyDashboard;
