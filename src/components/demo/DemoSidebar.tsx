import { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  Users,
  UserCheck,
  Wrench,
  FileText,
  ClipboardList,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type DemoView = 
  | "dashboard" 
  | "properties" 
  | "tenants" 
  | "owners" 
  | "workorders" 
  | "invoices" 
  | "applications" 
  | "schedule";

interface DemoSidebarProps {
  currentView: DemoView;
  onViewChange: (view: DemoView) => void;
}

const menuItems = [
  { id: "dashboard" as DemoView, label: "Dashboard", icon: LayoutDashboard },
  { id: "properties" as DemoView, label: "Properties", icon: Building2 },
  { id: "tenants" as DemoView, label: "Tenants", icon: Users },
  { id: "owners" as DemoView, label: "Owners", icon: UserCheck },
  { id: "workorders" as DemoView, label: "Work Orders", icon: Wrench },
  { id: "invoices" as DemoView, label: "Invoicing", icon: FileText },
  { id: "applications" as DemoView, label: "Applications", icon: ClipboardList },
  { id: "schedule" as DemoView, label: "Schedule", icon: Calendar },
];

export function DemoSidebar({ currentView, onViewChange }: DemoSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "relative flex flex-col border-r border-border bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-56"
      )}
    >
      {/* Header */}
      <div className="flex h-14 items-center justify-between border-b border-border px-3">
        {!collapsed && (
          <span className="text-sm font-semibold text-foreground">PropManager</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="border-t border-border p-3">
          <p className="text-xs text-muted-foreground">Demo Mode</p>
          <p className="text-xs text-muted-foreground">All data is simulated</p>
        </div>
      )}
    </div>
  );
}
