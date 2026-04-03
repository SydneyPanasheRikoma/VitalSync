import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import FamilyDashboard from "./pages/FamilyDashboard";
import EducationHub from "./pages/EducationHub";
import DevicePairing from "./pages/DevicePairing";
import NotFound from "./pages/NotFound";
import { getCurrentUser, roleHomePath, type UserRole } from "@/lib/auth";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = getCurrentUser();
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function RoleRoute({ role, children }: { role: UserRole; children: React.ReactNode }) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== role) {
    return <Navigate to={roleHomePath(user.role)} replace />;
  }

  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/dashboard"
            element={
              <RoleRoute role="patient">
                <PatientDashboard />
              </RoleRoute>
            }
          />
          <Route
            path="/doctor"
            element={
              <RoleRoute role="doctor">
                <DoctorDashboard />
              </RoleRoute>
            }
          />
          <Route
            path="/family"
            element={
              <RoleRoute role="family">
                <FamilyDashboard />
              </RoleRoute>
            }
          />
          <Route
            path="/education"
            element={
              <ProtectedRoute>
                <EducationHub />
              </ProtectedRoute>
            }
          />
          <Route
            path="/devices"
            element={
              <ProtectedRoute>
                <DevicePairing />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
