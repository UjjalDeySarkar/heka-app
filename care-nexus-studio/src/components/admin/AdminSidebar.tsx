import { 
  LayoutDashboard, 
  Building2, 
  Hotel, 
  Bed, 
  Ambulance, 
  Stethoscope, 
  UserCog, 
  Users, 
  ClipboardList, 
  FlaskConical, 
  Home,
  AlertCircle,
  Settings,
  Bell,
  LogOut,
  ChevronRight
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const coreItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard, badge: null },
  { title: "Hospitals", url: "/hospitals", icon: Building2, badge: null },
  { title: "Doctors", url: "/doctors", icon: Stethoscope, badge: "12" },
  { title: "Patients", url: "/patients", icon: Users, badge: null },
];

const servicesItems = [
  { title: "Emergency Services", url: "/emergency", icon: AlertCircle, badge: "3" },
  { title: "Ambulances", url: "/ambulances", icon: Ambulance, badge: null },
  { title: "Home Care", url: "/home-care", icon: Home, badge: null },
  { title: "Lab Tests", url: "/lab-tests", icon: FlaskConical, badge: "8" },
];

const managementItems = [
  { title: "Hotels", url: "/hotels", icon: Hotel, badge: null },
  { title: "Rooms", url: "/rooms", icon: Bed, badge: null },
  { title: "Admissions", url: "/admissions", icon: ClipboardList, badge: null },
  { title: "Staff", url: "/staff", icon: UserCog, badge: null },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const renderMenuSection = (items: typeof coreItems, label: string) => (
    <SidebarGroup>
      <SidebarGroupLabel className={`text-xs font-semibold uppercase tracking-wider ${isCollapsed ? 'justify-center px-2' : 'px-3'}`}>
        {!isCollapsed && label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-1">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <NavLink 
                  to={item.url} 
                  end={item.url === "/"}
                  className="group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all hover:bg-sidebar-accent hover:shadow-sm"
                  activeClassName="bg-gradient-primary text-white shadow-glow"
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <>
                      <span className="font-medium flex-1">{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs bg-white/20 text-white border-0">
                          {item.badge}
                        </Badge>
                      )}
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </>
                  )}
                  {isCollapsed && item.badge && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full flex items-center justify-center">
                      <span className="text-[10px] text-white font-bold">{item.badge}</span>
                    </div>
                  )}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar className={`glass-card border-r transition-all overflow-hidden z-20 ${isCollapsed ? 'w-16' : 'w-72'}`} collapsible="icon">
      <SidebarContent className="px-2 overflow-y-auto overflow-x-hidden">
        <div className="px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            {!isCollapsed && (
              <div className="flex-1">
                <h1 className="text-lg font-bold text-foreground tracking-tight">HealthCare</h1>
                <p className="text-xs text-muted-foreground font-medium">Enterprise Portal</p>
              </div>
            )}
          </div>
        </div>

        {renderMenuSection(coreItems, "Core")}
        <Separator className="my-3 mx-3" />
        {renderMenuSection(servicesItems, "Services")}
        <Separator className="my-3 mx-3" />
        {renderMenuSection(managementItems, "Management")}
      </SidebarContent>

      <SidebarFooter className="px-2 pb-4">
        <Separator className="mb-4 mx-3" />
        <SidebarMenu className="space-y-1">
          <SidebarMenuItem>
            <SidebarMenuButton className="px-3 py-2.5 rounded-xl hover:bg-sidebar-accent transition-all">
              <Settings className="w-5 h-5" />
              {!isCollapsed && <span className="font-medium">Settings</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="px-3 py-2.5 rounded-xl hover:bg-sidebar-accent transition-all relative">
              <Bell className="w-5 h-5" />
              {!isCollapsed && <span className="font-medium">Notifications</span>}
              <div className="absolute top-2 left-7 w-2 h-2 bg-destructive rounded-full" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className={`mt-4 px-3 py-3 rounded-2xl bg-sidebar-accent/50 hover:bg-sidebar-accent transition-all cursor-pointer ${isCollapsed ? 'px-2' : ''}`}>
          <div className="flex items-center gap-3">
            <Avatar className="w-9 h-9 ring-2 ring-primary/20">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
              <AvatarFallback className="bg-gradient-primary text-white text-sm font-semibold">AD</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">Admin User</p>
                <p className="text-xs text-muted-foreground truncate">admin@healthcare.com</p>
              </div>
            )}
            {!isCollapsed && (
              <LogOut className="w-4 h-4 text-muted-foreground hover:text-destructive transition-colors" />
            )}
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
