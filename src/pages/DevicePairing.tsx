import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Bluetooth, Smartphone, Watch, CheckCircle2, ArrowRight } from "lucide-react";

const devices = [
  { id: "fitbit", name: "Fitbit", icon: Watch, desc: "Sense 2, Versa 4, Charge 6" },
  { id: "apple", name: "Apple Health", icon: Smartphone, desc: "iPhone, Apple Watch" },
  { id: "manual", name: "Manual Entry", icon: Bluetooth, desc: "Enter vitals manually" },
];

const DevicePairing = () => {
  const [step, setStep] = useState(1);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [baselineDay, setBaselineDay] = useState(1);

  const handleConnect = () => {
    setStep(2);
    setTimeout(() => setStep(3), 2000);
  };

  return (
    <AppLayout>
      <div className="max-w-lg mx-auto space-y-6 animate-slide-in">
        <h1 className="text-2xl font-bold">Device Pairing</h1>

        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= s ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {step > s ? <CheckCircle2 className="h-4 w-4" /> : s}
              </div>
              {s < 3 && <div className={`w-12 h-0.5 ${step > s ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Select your wearable device or data source:</p>
            {devices.map((device) => (
              <button
                key={device.id}
                onClick={() => setSelectedDevice(device.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  selectedDevice === device.id
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                    : "border-border hover:border-primary/30 glass-card"
                }`}
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <device.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">{device.name}</p>
                  <p className="text-xs text-muted-foreground">{device.desc}</p>
                </div>
              </button>
            ))}
            <Button className="w-full" disabled={!selectedDevice} onClick={handleConnect}>
              Connect <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="glass-card rounded-xl p-8 text-center space-y-4">
            <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center vital-pulse">
              <Bluetooth className="h-8 w-8 text-primary" />
            </div>
            <p className="text-sm font-medium">Connecting to {devices.find((d) => d.id === selectedDevice)?.name}...</p>
            <Progress value={65} className="h-2" />
          </div>
        )}

        {step === 3 && (
          <div className="glass-card rounded-xl p-8 text-center space-y-4">
            <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-lg font-bold">Connected Successfully!</p>
              <p className="text-sm text-muted-foreground mt-1">AI is now learning your baseline</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Baseline Progress</span>
                <span className="font-semibold text-primary">Day {baselineDay} of 7</span>
              </div>
              <Progress value={(baselineDay / 7) * 100} className="h-3" />
              <p className="text-xs text-muted-foreground">
                The AI needs 7 days of data to learn your personal health patterns. Predictions begin after baseline is complete.
              </p>
            </div>
            <Button variant="outline" onClick={() => { setStep(1); setSelectedDevice(null); }}>
              Pair Another Device
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default DevicePairing;
