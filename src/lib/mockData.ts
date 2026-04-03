export interface VitalSigns {
  heartRate: number;
  bpSystolic: number;
  bpDiastolic: number;
  glucose: number;
  spo2: number;
  timestamp: string;
  baseline: {
    hrMin: number;
    hrMax: number;
    glucoseMin: number;
    glucoseMax: number;
  };
}

export interface Alert {
  id: string;
  type: "low" | "medium" | "critical";
  title: string;
  description: string;
  timestamp: string;
  vitals?: Partial<VitalSigns>;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
  refillDays: number;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  riskScore: number;
  lastAlert: string;
  lastVitals: VitalSigns;
  avatar: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  avatar: string;
  sharingEnabled: boolean;
}

const randomInRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const generateVitals = (): VitalSigns => ({
  heartRate: randomInRange(65, 95),
  bpSystolic: randomInRange(110, 135),
  bpDiastolic: randomInRange(68, 88),
  glucose: randomInRange(85, 155),
  spo2: randomInRange(93, 99),
  timestamp: new Date().toISOString(),
  baseline: {
    hrMin: 65,
    hrMax: 85,
    glucoseMin: 90,
    glucoseMax: 140,
  },
});

export const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "critical",
    title: "High Blood Glucose Detected",
    description: "Blood glucose reached 186 mg/dL, exceeding your baseline maximum of 140 mg/dL.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    vitals: { glucose: 186, heartRate: 92 },
  },
  {
    id: "2",
    type: "medium",
    title: "Elevated Heart Rate During Rest",
    description: "Resting heart rate of 98 bpm detected at 2:30 AM, above your baseline of 85 bpm.",
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    vitals: { heartRate: 98, bpSystolic: 128 },
  },
  {
    id: "3",
    type: "low",
    title: "Mild Blood Pressure Fluctuation",
    description: "Systolic pressure varied by 15 mmHg within 2 hours. Continue monitoring.",
    timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    vitals: { bpSystolic: 132, bpDiastolic: 85 },
  },
  {
    id: "4",
    type: "medium",
    title: "SpO2 Dropped Below 95%",
    description: "Oxygen saturation dropped to 93% for 8 minutes during sleep.",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    vitals: { spo2: 93 },
  },
  {
    id: "5",
    type: "low",
    title: "Irregular Sleep Pattern",
    description: "Sleep quality score dropped 22% compared to your 7-day average.",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockMedications: Medication[] = [
  { id: "1", name: "Metformin", dosage: "500mg", time: "08:00 AM", taken: true, refillDays: 12 },
  { id: "2", name: "Lisinopril", dosage: "10mg", time: "09:00 AM", taken: true, refillDays: 8 },
  { id: "3", name: "Atorvastatin", dosage: "20mg", time: "09:00 PM", taken: false, refillDays: 22 },
  { id: "4", name: "Aspirin", dosage: "81mg", time: "08:00 AM", taken: true, refillDays: 30 },
];

export const mockPatients: Patient[] = [
  { id: "1", name: "Sarah Johnson", age: 67, condition: "Type 2 Diabetes", riskScore: 72, lastAlert: "2h ago", lastVitals: generateVitals(), avatar: "SJ" },
  { id: "2", name: "Robert Chen", age: 54, condition: "Hypertension", riskScore: 45, lastAlert: "1d ago", lastVitals: generateVitals(), avatar: "RC" },
  { id: "3", name: "Maria Garcia", age: 71, condition: "Post-Surgery Recovery", riskScore: 83, lastAlert: "30m ago", lastVitals: generateVitals(), avatar: "MG" },
  { id: "4", name: "James Wilson", age: 62, condition: "COPD", riskScore: 58, lastAlert: "4h ago", lastVitals: generateVitals(), avatar: "JW" },
  { id: "5", name: "Emily Davis", age: 45, condition: "Gestational Diabetes", riskScore: 34, lastAlert: "3d ago", lastVitals: generateVitals(), avatar: "ED" },
  { id: "6", name: "William Brown", age: 78, condition: "Heart Failure", riskScore: 91, lastAlert: "15m ago", lastVitals: generateVitals(), avatar: "WB" },
];

export const mockFamilyMembers: FamilyMember[] = [
  { id: "1", name: "Michael", relation: "Son", avatar: "MS", sharingEnabled: true },
  { id: "2", name: "Linda", relation: "Daughter", avatar: "LK", sharingEnabled: true },
  { id: "3", name: "Robert", relation: "Spouse", avatar: "RK", sharingEnabled: false },
];

export const mockEducationArticles = [
  { id: "1", title: "Managing Blood Sugar After Meals", category: "Diabetes", readTime: "5 min", saved: false },
  { id: "2", title: "Understanding Your Blood Pressure Readings", category: "Hypertension", readTime: "4 min", saved: true },
  { id: "3", title: "Post-Surgery Recovery: What to Expect", category: "Post-surgery", readTime: "7 min", saved: false },
  { id: "4", title: "Elderly Care: Preventing Falls at Home", category: "Elderly Care", readTime: "6 min", saved: false },
  { id: "5", title: "How Wearables Track Your Heart Health", category: "Technology", readTime: "3 min", saved: false },
  { id: "6", title: "Nutrition Plans for Chronic Conditions", category: "Diabetes", readTime: "8 min", saved: true },
];
