import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Breadcrumbs } from "./Breadcrumbs";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background overflow-x-hidden">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="glass-card sticky top-0 z-10 border-b border-border/50 shadow-soft backdrop-blur-lg bg-background/95">
            <div className="flex items-center justify-between px-8 py-5">
              <div className="flex items-center gap-6">
                <SidebarTrigger className="hover:bg-sidebar-accent rounded-lg p-2 transition-colors" />
                <div className="relative w-[480px] hidden lg:block">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search across all modules..." 
                    className="pl-11 h-11 glass border-border/50 focus:border-primary/50 rounded-xl shadow-soft"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-3 pl-3 border-l border-border/50">
                  <div className="text-right hidden md:block">
                    <p className="text-sm font-semibold text-foreground">Admin User</p>
                    <p className="text-xs text-muted-foreground">System Administrator</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow cursor-pointer ring-2 ring-primary/20">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Breadcrumbs */}
            <div className="px-8 pb-4 pt-2">
              <Breadcrumbs />
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-8 overflow-y-auto overflow-x-hidden">
            <div className="max-w-[1920px] mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
