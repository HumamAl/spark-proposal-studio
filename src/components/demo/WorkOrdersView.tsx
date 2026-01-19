import { useState } from "react";
import { Wrench, Search, Plus, Filter, Clock, CheckCircle2, AlertCircle, PauseCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { workOrders, properties, WorkOrder } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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

const statusIcons = {
  Pending: Clock,
  "In Progress": AlertCircle,
  Complete: CheckCircle2,
  "On Hold": PauseCircle,
};

export function WorkOrdersView() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [localWorkOrders, setLocalWorkOrders] = useState(workOrders);
  const [newWOOpen, setNewWOOpen] = useState(false);

  const filteredWorkOrders = localWorkOrders.filter((wo) => {
    const matchesSearch =
      wo.title.toLowerCase().includes(search.toLowerCase()) ||
      wo.description.toLowerCase().includes(search.toLowerCase()) ||
      wo.assignedTo.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || wo.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || wo.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleStatusChange = (workOrderId: string, newStatus: WorkOrder["status"]) => {
    setLocalWorkOrders(prev =>
      prev.map(wo =>
        wo.id === workOrderId ? { ...wo, status: newStatus } : wo
      )
    );
    toast.success(`Work order status updated to ${newStatus}`);
  };

  const handleCreateWorkOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setNewWOOpen(false);
    toast.success("Work order created successfully!");
  };

  const statCounts = {
    pending: localWorkOrders.filter(wo => wo.status === "Pending").length,
    inProgress: localWorkOrders.filter(wo => wo.status === "In Progress").length,
    complete: localWorkOrders.filter(wo => wo.status === "Complete").length,
    onHold: localWorkOrders.filter(wo => wo.status === "On Hold").length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Work Orders</h2>
          <p className="text-muted-foreground">
            Manage maintenance requests and repairs
          </p>
        </div>
        <Dialog open={newWOOpen} onOpenChange={setNewWOOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Work Order
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleCreateWorkOrder}>
              <DialogHeader>
                <DialogTitle>Create Work Order</DialogTitle>
                <DialogDescription>
                  Submit a new maintenance request
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="property">Property</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property" />
                    </SelectTrigger>
                    <SelectContent>
                      {properties.map(p => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input id="unit" placeholder="e.g., A-101" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Brief description of issue" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Detailed description..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Plumbing">Plumbing</SelectItem>
                        <SelectItem value="Electrical">Electrical</SelectItem>
                        <SelectItem value="HVAC">HVAC</SelectItem>
                        <SelectItem value="Appliance">Appliance</SelectItem>
                        <SelectItem value="General">General</SelectItem>
                        <SelectItem value="Exterior">Exterior</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setNewWOOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Work Order</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card className="cursor-pointer hover:border-warning/50" onClick={() => setStatusFilter("Pending")}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-warning">{statCounts.pending}</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-primary/50" onClick={() => setStatusFilter("In Progress")}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
            <AlertCircle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">{statCounts.inProgress}</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-success/50" onClick={() => setStatusFilter("Complete")}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Complete</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-success">{statCounts.complete}</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-muted-foreground/50" onClick={() => setStatusFilter("On Hold")}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">On Hold</CardTitle>
            <PauseCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{statCounts.onHold}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search work orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Complete">Complete</SelectItem>
            <SelectItem value="On Hold">On Hold</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="Emergency">Emergency</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Work Orders List */}
      <div className="space-y-3">
        {filteredWorkOrders.map((wo) => {
          const property = properties.find(p => p.id === wo.propertyId);
          const StatusIcon = statusIcons[wo.status];
          
          return (
            <Card key={wo.id}>
              <CardContent className="p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <StatusIcon className={cn(
                      "h-5 w-5 mt-0.5 shrink-0",
                      wo.status === "Pending" && "text-warning",
                      wo.status === "In Progress" && "text-primary",
                      wo.status === "Complete" && "text-success",
                      wo.status === "On Hold" && "text-muted-foreground"
                    )} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-medium">{wo.title}</h4>
                        <Badge variant="secondary" className={cn("text-xs", priorityColors[wo.priority])}>
                          {wo.priority}
                        </Badge>
                        <Badge variant="outline" className="text-xs">{wo.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{wo.description}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                        <span>{property?.name} • Unit {wo.unit}</span>
                        <span>Assigned: {wo.assignedTo}</span>
                        <span>Created: {wo.createdAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                    <Select
                      value={wo.status}
                      onValueChange={(value) => handleStatusChange(wo.id, value as WorkOrder["status"])}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Complete">Complete</SelectItem>
                        <SelectItem value="On Hold">On Hold</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredWorkOrders.length === 0 && (
        <div className="text-center py-12">
          <Wrench className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No work orders found</h3>
          <p className="text-muted-foreground">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}
