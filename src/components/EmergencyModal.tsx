import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, X, AlertTriangle } from "lucide-react";
import { useEffect } from "react";

interface EmergencyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EmergencyModal({ open, onOpenChange }: EmergencyModalProps) {
  const [countdown, setCountdown] = useState(60);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!open) {
      setCountdown(60);
      setConfirmed(false);
      return;
    }
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          setConfirmed(true);
          clearInterval(timer);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-alert-critical/50 bg-alert-critical/5">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full gradient-critical flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-destructive-foreground" />
            </div>
            <div>
              <DialogTitle className="text-alert-critical">Emergency Alert</DialogTitle>
              <DialogDescription>Critical vitals detected — response required</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="p-3 rounded-lg bg-card border space-y-1">
            <p className="text-sm font-medium">Patient: Amara Khalil</p>
            <p className="text-xs text-muted-foreground">Blood glucose: 210 mg/dL • Heart Rate: 105 bpm</p>
            <p className="text-xs text-muted-foreground">{new Date().toLocaleString()}</p>
          </div>

          {!confirmed ? (
            <>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Auto-confirming emergency in</p>
                <p className="text-4xl font-bold text-alert-critical">{countdown}s</p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => onOpenChange(false)}
                >
                  <X className="h-4 w-4 mr-1" /> I'm OK — Cancel
                </Button>
                <Button
                  className="flex-1 bg-alert-critical hover:bg-alert-critical/90 text-destructive-foreground"
                  onClick={() => setConfirmed(true)}
                >
                  Confirm Emergency
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-3 text-center">
              <p className="text-sm font-medium text-alert-critical">🚨 Emergency confirmed — contacts notified</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 rounded bg-muted text-sm">
                  <Phone className="h-4 w-4" /> Dr. Smith — (555) 123-4567
                </div>
                <div className="flex items-center gap-2 p-2 rounded bg-muted text-sm">
                  <Phone className="h-4 w-4" /> Michael (Son) — (555) 987-6543
                </div>
                <div className="flex items-center gap-2 p-2 rounded bg-muted text-sm">
                  <Phone className="h-4 w-4" /> 911 — Emergency Services
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
