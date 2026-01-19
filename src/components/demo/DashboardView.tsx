import {
  Building2,
  Users,
  Wrench,
  DollarSign,
  AlertTriangle,
  Calendar,
  TrendingUp,
  Home,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDashboardStats, workOrders, scheduleItems, properties } from "@/data/mockData";
import { cn } from "@/lib/utils";

const priorityColors = {
  Low: "bg-muted text-muted-foreground",
  Medium: "bg-warning/20 text-warning",
  High: "bg-destructive/20 text-destructive",
  Emergency: "bg-destructive text-destructive-foreground",
};

const statusColors = {
  Pending: "bg-warning/20 text-warning",
  "In Progress": "bg-primary/20 text-primary",
  Complete: "bg-success/20 text-success",
  "On Hold": "bg-muted text-muted-foreground",
};

const scheduleTypeColors = {
  Showing: "bg-primary/20 text-primary",
  "Move-In": "bg-success/20 text-success",
  "Move-Out": "bg-warning/20 text-warning",
  Inspection: "bg-accent/20 text-accent",
  Maintenance: "bg-muted text-muted-foreground",
};

export function DashboardView() {
  const stats = getDashboardStats();
  const pendingWorkOrders = workOrders.filter(wo => wo.status !== "Complete").slice(0, 5);
  const todaySchedule = scheduleItems.filter(s => s.date === "2025-01-19");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProperties}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalUnits} units total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vacant Units</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.vacantUnits}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.vacantUnits / stats.totalUnits) * 100).toFixed(1)}% vacancy rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeTenants}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingApplications} pending applications
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.monthlyRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-success flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +2.5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Row */}
      {(stats.overdueInvoices > 0 || stats.pendingWorkOrders > 0) && (
        <div className="flex flex-wrap gap-3">
          {stats.overdueInvoices > 0 && (
            <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <span className="text-destructive font-medium">
                {stats.overdueInvoices} overdue invoice{stats.overdueInvoices > 1 ? "s" : ""}
              </span>
            </div>
          )}
          {stats.pendingWorkOrders > 0 && (
            <div className="flex items-center gap-2 rounded-lg bg-warning/10 px-4 py-2 text-sm">
              <Wrench className="h-4 w-4 text-warning" />
              <span className="text-warning font-medium">
                {stats.pendingWorkOrders} pending work order{stats.pendingWorkOrders > 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Work Orders Queue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Work Orders</CardTitle>
              <CardDescription>Active maintenance requests</CardDescription>
            </div>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingWorkOrders.map((wo) => {
                const property = properties.find(p => p.id === wo.propertyId);
                return (
                  <div
                    key={wo.id}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{wo.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {property?.name} • Unit {wo.unit}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-3">
                      <Badge
                        variant="secondary"
                        className={cn("text-xs", priorityColors[wo.priority])}
                      >
                        {wo.priority}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={cn("text-xs", statusColors[wo.status])}
                      >
                        {wo.status}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>January 19, 2025</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Full Calendar
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaySchedule.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No events scheduled for today
                </p>
              ) : (
                todaySchedule.map((item) => {
                  const property = properties.find(p => p.id === item.propertyId);
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 rounded-lg border border-border p-3"
                    >
                      <div className="text-center min-w-[60px]">
                        <p className="text-sm font-medium">{item.time}</p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {property?.name} {item.unit ? `• Unit ${item.unit}` : ""}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className={cn("text-xs shrink-0", scheduleTypeColors[item.type])}
                      >
                        {item.type}
                      </Badge>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button>
              <Wrench className="mr-2 h-4 w-4" />
              New Work Order
            </Button>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Showing
            </Button>
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Add Tenant
            </Button>
            <Button variant="outline">
              <Building2 className="mr-2 h-4 w-4" />
              Add Property
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
