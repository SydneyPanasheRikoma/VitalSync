import { AppLayout } from "@/components/AppLayout";
import { useVitals } from "@/hooks/useVitals";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Phone, Heart, ShieldCheck, AlertTriangle, BookOpen, Clock } from "lucide-react";
import { mockAlerts, mockEducationArticles } from "@/lib/mockData";

const FamilyDashboard = () => {
  const { vitals, isRecent } = useVitals();
  const criticalAlerts = mockAlerts.filter((a) => a.type !== "low");
  const isStable = vitals.glucose <= 140 && vitals.heartRate <= 90 && vitals.spo2 >= 95;

  return (
    <AppLayout role="family">
      <div className="max-w-4xl mx-auto space-y-6 animate-slide-in">
        <h1 className="text-2xl font-bold">Family Caregiver View</h1>

        {/* Patient card */}
        <div className={`glass-card rounded-xl p-6 space-y-4 ${!isStable ? "ring-2 ring-alert-medium/40" : ""}`}>
          {isStable ? (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Patient is stable — no active alerts</span>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-alert-medium/5 border border-alert-medium/20">
              <AlertTriangle className="h-5 w-5 text-alert-medium" />
              <span className="text-sm font-medium text-alert-medium">⚠️ Alert active — vitals require attention</span>
            </div>
          )}

          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">AK</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-bold">Amara Khalil</h2>
              <p className="text-sm text-muted-foreground">Type 2 Diabetes • Age 67</p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                <span className={`h-2 w-2 rounded-full ${isRecent ? "bg-primary" : "bg-alert-low"}`} />
                Last active: {isRecent ? "Just now" : "5 min ago"}
              </div>
            </div>
          </div>

          {/* Vitals summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="text-center p-3 rounded-lg bg-vital-heart/5">
              <p className="text-xs text-muted-foreground">Heart Rate</p>
              <p className="text-xl font-bold text-vital-heart">{vitals.heartRate}</p>
              <p className="text-[10px] text-muted-foreground">bpm</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-vital-bp/5">
              <p className="text-xs text-muted-foreground">BP</p>
              <p className="text-xl font-bold text-vital-bp">{vitals.bpSystolic}/{vitals.bpDiastolic}</p>
              <p className="text-[10px] text-muted-foreground">mmHg</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-vital-glucose/5">
              <p className="text-xs text-muted-foreground">Glucose</p>
              <p className="text-xl font-bold text-vital-glucose">{vitals.glucose}</p>
              <p className="text-[10px] text-muted-foreground">mg/dL</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-vital-spo2/5">
              <p className="text-xs text-muted-foreground">SpO2</p>
              <p className="text-xl font-bold text-vital-spo2">{vitals.spo2}%</p>
              <p className="text-[10px] text-muted-foreground">oxygen</p>
            </div>
          </div>
        </div>

        {/* Alert Timeline */}
        <div className="glass-card rounded-xl p-5 space-y-3">
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
        <div className="glass-card rounded-xl p-5 space-y-3">
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
        <div className="glass-card rounded-xl p-5 space-y-3">
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
