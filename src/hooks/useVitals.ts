import { useState, useEffect } from "react";
import { generateVitals, type VitalSigns } from "@/lib/mockData";

export const useVitals = (intervalMs = 5000) => {
  const [vitals, setVitals] = useState<VitalSigns>(generateVitals());
  const [lastSync, setLastSync] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setVitals(generateVitals());
      setLastSync(new Date());
    }, intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs]);

  const syncAgo = Math.floor((Date.now() - lastSync.getTime()) / 1000);
  const isRecent = syncAgo < 300;

  return { vitals, lastSync, syncAgo, isRecent };
};
