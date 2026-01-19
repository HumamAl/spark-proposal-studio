import { useState, useEffect } from "react";
import { DemoSidebar, DemoView } from "./DemoSidebar";
import { DashboardView } from "./DashboardView";
import { PropertiesView } from "./PropertiesView";
import { TenantsView } from "./TenantsView";
import { OwnersView } from "./OwnersView";
import { WorkOrdersView } from "./WorkOrdersView";
import { InvoicingView } from "./InvoicingView";
import { ApplicationsView } from "./ApplicationsView";
import { ScheduleView } from "./ScheduleView";
import { DashboardSkeleton, PropertiesGridSkeleton, TableSkeleton, ScheduleSkeleton } from "./LoadingSkeletons";

export function DemoApp() {
  const [currentView, setCurrentView] = useState<DemoView>("dashboard");
  const [isLoading, setIsLoading] = useState(true);
  const [viewKey, setViewKey] = useState(0);

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Simulate loading when switching views
  const handleViewChange = (view: DemoView) => {
    if (view !== currentView) {
      setIsLoading(true);
      setCurrentView(view);
      setViewKey(k => k + 1);
      setTimeout(() => setIsLoading(false), 400);
    }
  };

  const renderSkeleton = () => {
    switch (currentView) {
      case "dashboard": return <DashboardSkeleton />;
      case "properties": return <PropertiesGridSkeleton />;
      case "tenants":
      case "workorders":
      case "invoices":
      case "applications": return <TableSkeleton />;
      case "schedule": return <ScheduleSkeleton />;
      case "owners": return <PropertiesGridSkeleton />;
      default: return <DashboardSkeleton />;
    }
  };

  const renderView = () => {
    if (isLoading) {
      return renderSkeleton();
    }

    switch (currentView) {
      case "dashboard": return <DashboardView key={viewKey} />;
      case "properties": return <PropertiesView key={viewKey} />;
      case "tenants": return <TenantsView key={viewKey} />;
      case "owners": return <OwnersView key={viewKey} />;
      case "workorders": return <WorkOrdersView key={viewKey} />;
      case "invoices": return <InvoicingView key={viewKey} />;
      case "applications": return <ApplicationsView key={viewKey} />;
      case "schedule": return <ScheduleView key={viewKey} />;
      default: return <DashboardView key={viewKey} />;
    }
  };

  return (
    <div className="flex h-[calc(100vh-120px)] min-h-[600px] overflow-hidden rounded-lg border border-border bg-background shadow-lg">
      <DemoSidebar currentView={currentView} onViewChange={handleViewChange} />
      <main className="flex-1 overflow-auto p-6">
        {renderView()}
      </main>
    </div>
  );
}
