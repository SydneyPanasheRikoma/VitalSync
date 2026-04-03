import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AppLayoutProps {
  children: React.ReactNode;
  role?: "patient" | "doctor" | "family";
}

const roleLabels = {
  patient: "Patient",
  doctor: "Doctor",
  family: "Caregiver",
};

const roleColors = {
  patient: "bg-primary/10 text-primary",
  doctor: "bg-vital-bp/10 text-vital-bp",
  family: "bg-alert-low/10 text-alert-low",
};

export function AppLayout({ children, role = "patient" }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b bg-card/80 backdrop-blur-sm px-4 sticky top-0 z-30">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4.5 w-4.5" />
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-alert-critical text-[10px] font-bold flex items-center justify-center text-destructive-foreground">3</span>
              </Button>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">AK</AvatarFallback>
                </Avatar>
                <Badge variant="secondary" className={`text-[10px] font-medium ${roleColors[role]}`}>
                  {roleLabels[role]}
                </Badge>
              </div>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
