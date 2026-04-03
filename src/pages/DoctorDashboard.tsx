import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, AlertTriangle, ChevronRight } from "lucide-react";
import { mockPatients, mockAlerts, generateVitals, type Patient } from "@/lib/mockData";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const riskColor = (score: number) =>
  score >= 80 ? "text-alert-critical" : score >= 50 ? "text-alert-medium" : "text-primary";

const riskBg = (score: number) =>
  score >= 80 ? "bg-alert-critical/10" : score >= 50 ? "bg-alert-medium/10" : "bg-primary/10";

const populationData = Array.from({ length: 14 }, (_, i) => ({
  day: `Day ${i + 1}`,
  high: Math.floor(Math.random() * 5 + 2),
  medium: Math.floor(Math.random() * 8 + 5),
  low: Math.floor(Math.random() * 15 + 10),
}));

const DoctorDashboard = () => {
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const filtered = mockPatients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.condition.toLowerCase().includes(search.toLowerCase())
  );

  const criticalAlerts = mockAlerts.filter((a) => a.type === "critical" || a.type === "medium");

  return (
    <AppLayout role="doctor">
      <div className="max-w-7xl mx-auto space-y-6 animate-slide-in">
        <h1 className="text-2xl font-bold">Doctor Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient list */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients by name or condition..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="glass-card rounded-xl overflow-hidden">
              <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-5 py-3 border-b text-xs font-medium text-muted-foreground">
                <span>Patient</span>
                <span>Condition</span>
                <span>Risk</span>
                <span>Last Alert</span>
                <span></span>
              </div>
              {filtered.map((patient) => (
                <button
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient)}
                  className="w-full grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-5 py-3 border-b last:border-0 hover:bg-muted/50 transition-colors items-center text-left"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">{patient.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{patient.name}</p>
                      <p className="text-xs text-muted-foreground">Age {patient.age}</p>
                    </div>
                  </div>
                  <span className="text-sm">{patient.condition}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${riskColor(patient.riskScore)}`}>{patient.riskScore}</span>
                    <Progress value={patient.riskScore} className={`w-12 h-1.5`} />
                  </div>
                  <span className="text-xs text-muted-foreground">{patient.lastAlert}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>

            {/* Population chart */}
            <div className="glass-card rounded-xl p-5 space-y-3">
              <h3 className="text-sm font-semibold">Patient Risk Distribution</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={populationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                    <Line type="monotone" dataKey="high" stroke="hsl(var(--alert-critical))" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="medium" stroke="hsl(var(--alert-medium))" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="low" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-4 text-xs">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-alert-critical" />High Risk</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-alert-medium" />Medium</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary" />Low</span>
              </div>
            </div>
          </div>

          {/* Priority Alerts */}
          <div className="space-y-4">
            <div className="glass-card rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-alert-critical" />
                <h3 className="text-sm font-semibold">Priority Alerts</h3>
              </div>
              <div className="space-y-3">
                {criticalAlerts.map((alert) => {
                  const styles = alert.type === "critical"
                    ? "border-alert-critical/20 bg-alert-critical/5"
                    : "border-alert-medium/20 bg-alert-medium/5";
                  return (
                    <div key={alert.id} className={`p-3 rounded-lg border ${styles} space-y-1`}>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={alert.type === "critical" ? "bg-alert-critical/10 text-alert-critical border-alert-critical/20 text-[10px]" : "bg-alert-medium/10 text-alert-medium border-alert-medium/20 text-[10px]"}
                        >
                          {alert.type}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">Sarah J.</span>
                      </div>
                      <p className="text-xs font-medium">{alert.title}</p>
                      <Button variant="outline" size="sm" className="w-full text-xs h-7 mt-1">
                        Review
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Detail Modal */}
      <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary">{selectedPatient?.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <span>{selectedPatient?.name}</span>
                <p className="text-xs text-muted-foreground font-normal">{selectedPatient?.condition} • Age {selectedPatient?.age}</p>
              </div>
            </DialogTitle>
          </DialogHeader>
          {selectedPatient && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Risk Score:</span>
                <span className={`text-2xl font-bold ${riskColor(selectedPatient.riskScore)}`}>{selectedPatient.riskScore}</span>
                <Progress value={selectedPatient.riskScore} className="flex-1 h-2" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-vital-heart/5 border border-vital-heart/10">
                  <p className="text-xs text-muted-foreground">Heart Rate</p>
                  <p className="text-lg font-bold text-vital-heart">{selectedPatient.lastVitals.heartRate} bpm</p>
                </div>
                <div className="p-3 rounded-lg bg-vital-bp/5 border border-vital-bp/10">
                  <p className="text-xs text-muted-foreground">Blood Pressure</p>
                  <p className="text-lg font-bold text-vital-bp">{selectedPatient.lastVitals.bpSystolic}/{selectedPatient.lastVitals.bpDiastolic}</p>
                </div>
                <div className="p-3 rounded-lg bg-vital-glucose/5 border border-vital-glucose/10">
                  <p className="text-xs text-muted-foreground">Glucose</p>
                  <p className="text-lg font-bold text-vital-glucose">{selectedPatient.lastVitals.glucose} mg/dL</p>
                </div>
                <div className="p-3 rounded-lg bg-vital-spo2/5 border border-vital-spo2/10">
                  <p className="text-xs text-muted-foreground">SpO2</p>
                  <p className="text-lg font-bold text-vital-spo2">{selectedPatient.lastVitals.spo2}%</p>
                </div>
              </div>
              <Button className="w-full">Open Full Chart</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default DoctorDashboard;
