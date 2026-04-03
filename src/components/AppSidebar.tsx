import { Brain, Users, LayoutDashboard, Stethoscope, BookOpen, Bluetooth } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import type { ComponentType } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import type { UserRole } from "@/lib/auth";

const navigationByRole: Record<UserRole, Array<{ title: string; url: string; icon: ComponentType<{ className?: string }> }>> = {
  patient: [
    { title: "Patient Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Health Education", url: "/education", icon: BookOpen },
    { title: "Device Pairing", url: "/devices", icon: Bluetooth },
  ],
  doctor: [
    { title: "Doctor Dashboard", url: "/doctor", icon: Stethoscope },
    { title: "Health Education", url: "/education", icon: BookOpen },
  ],
  family: [
    { title: "Family Dashboard", url: "/family", icon: Users },
    { title: "Health Education", url: "/education", icon: BookOpen },
  ],
};

const toolItems: Array<{ title: string; url: string; icon: ComponentType<{ className?: string }> }> = [];

export function AppSidebar({ role }: { role: UserRole }) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const mainItems = navigationByRole[role];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary/15">
            <img src="/vitalsync-icon.svg" alt="VitalSync icon" className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-bold text-sidebar-foreground">VitalSync AI</span>
              <span className="text-[10px] text-sidebar-foreground/60">Clinical Monitoring Platform</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50">Dashboards</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url} end activeClassName="bg-sidebar-accent text-sidebar-primary">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {toolItems.length > 0 ? (
          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground/50">Tools</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {toolItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                      <NavLink to={item.url} end activeClassName="bg-sidebar-accent text-sidebar-primary">
                        <item.icon className="mr-2 h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : null}
      </SidebarContent>

      <SidebarFooter className="p-4">
        {!collapsed && (
          <div className="rounded-lg border border-sidebar-border bg-sidebar-accent/40 p-3">
            <div className="flex items-center gap-2 text-xs text-sidebar-foreground/70">
              <Brain className="h-3.5 w-3.5 text-sidebar-primary" />
              <span>Baseline learning complete: Day 7/7</span>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
