import { useState } from "react";
import { DemoSidebar, DemoView } from "./DemoSidebar";
import { DashboardView } from "./DashboardView";
import { PropertiesView } from "./PropertiesView";
import { TenantsView } from "./TenantsView";
import { OwnersView } from "./OwnersView";
import { WorkOrdersView } from "./WorkOrdersView";
import { InvoicingView } from "./InvoicingView";
import { ApplicationsView } from "./ApplicationsView";
import { ScheduleView } from "./ScheduleView";

export function DemoApp() {
  const [currentView, setCurrentView] = useState<DemoView>("dashboard");

  const renderView = () => {
    switch (currentView) {
      case "dashboard": return <DashboardView />;
      case "properties": return <PropertiesView />;
      case "tenants": return <TenantsView />;
      case "owners": return <OwnersView />;
      case "workorders": return <WorkOrdersView />;
      case "invoices": return <InvoicingView />;
      case "applications": return <ApplicationsView />;
      case "schedule": return <ScheduleView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="flex h-[calc(100vh-120px)] min-h-[600px] overflow-hidden rounded-lg border border-border bg-background shadow-lg">
      <DemoSidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 overflow-auto p-6">
        {renderView()}
      </main>
    </div>
  );
}
