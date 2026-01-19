import { useState } from "react";
import { Calendar, Plus, Clock, Home, Eye, UserCheck, Wrench, ClipboardCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { scheduleItems, properties, ScheduleItem } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const typeColors = {
  Showing: "bg-primary/20 text-primary",
  "Move-In": "bg-success/20 text-success",
  "Move-Out": "bg-warning/20 text-warning",
  Inspection: "bg-accent/20 text-accent",
  Maintenance: "bg-muted text-muted-foreground",
};

const typeIcons = {
  Showing: Eye,
  "Move-In": Home,
  "Move-Out": Home,
  Inspection: ClipboardCheck,
  Maintenance: Wrench,
};

export function ScheduleView() {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [newEventOpen, setNewEventOpen] = useState(false);
  const [localSchedule, setLocalSchedule] = useState(scheduleItems);

  const filteredSchedule = localSchedule.filter((item) => 
    typeFilter === "all" || item.type === typeFilter
  );

  // Group by date
  const groupedSchedule = filteredSchedule.reduce((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = [];
    }
    acc[item.date].push(item);
    return acc;
  }, {} as Record<string, ScheduleItem[]>);

  // Sort dates
  const sortedDates = Object.keys(groupedSchedule).sort();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date("2025-01-19");
    const tomorrow = new Date("2025-01-20");
    
    if (dateStr === "2025-01-19") return "Today";
    if (dateStr === "2025-01-20") return "Tomorrow";
    
    return date.toLocaleDateString("en-US", { 
      weekday: "long", 
      month: "short", 
      day: "numeric" 
    });
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    setNewEventOpen(false);
    toast.success("Event scheduled successfully!");
  };

  const statCounts = {
    showing: localSchedule.filter(s => s.type === "Showing").length,
    moveIn: localSchedule.filter(s => s.type === "Move-In").length,
    moveOut: localSchedule.filter(s => s.type === "Move-Out").length,
    inspection: localSchedule.filter(s => s.type === "Inspection").length,
    maintenance: localSchedule.filter(s => s.type === "Maintenance").length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Schedule</h2>
          <p className="text-muted-foreground">
            Manage showings, move-ins, inspections, and more
          </p>
        </div>
        <Dialog open={newEventOpen} onOpenChange={setNewEventOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleCreateEvent}>
              <DialogHeader>
                <DialogTitle>Schedule Event</DialogTitle>
                <DialogDescription>
                  Add a new event to your calendar
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Event Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Showing">Showing</SelectItem>
                      <SelectItem value="Move-In">Move-In</SelectItem>
                      <SelectItem value="Move-Out">Move-Out</SelectItem>
                      <SelectItem value="Inspection">Inspection</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Property</Label>
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
                  <Label>Unit (optional)</Label>
                  <Input placeholder="e.g., A-101" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Time</Label>
                    <Input type="time" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Notes</Label>
                  <Textarea placeholder="Additional details..." />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setNewEventOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Schedule Event</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        <Card className="cursor-pointer hover:border-primary/50" onClick={() => setTypeFilter("Showing")}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-medium text-muted-foreground">Showings</CardTitle>
            <Eye className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">{statCounts.showing}</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-success/50" onClick={() => setTypeFilter("Move-In")}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-medium text-muted-foreground">Move-Ins</CardTitle>
            <Home className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-success">{statCounts.moveIn}</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-warning/50" onClick={() => setTypeFilter("Move-Out")}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-medium text-muted-foreground">Move-Outs</CardTitle>
            <Home className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-warning">{statCounts.moveOut}</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-accent/50" onClick={() => setTypeFilter("Inspection")}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-medium text-muted-foreground">Inspections</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-accent">{statCounts.inspection}</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-muted-foreground/50" onClick={() => setTypeFilter("Maintenance")}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-medium text-muted-foreground">Maintenance</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{statCounts.maintenance}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex justify-between items-center">
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="Showing">Showings</SelectItem>
            <SelectItem value="Move-In">Move-Ins</SelectItem>
            <SelectItem value="Move-Out">Move-Outs</SelectItem>
            <SelectItem value="Inspection">Inspections</SelectItem>
            <SelectItem value="Maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>
        {typeFilter !== "all" && (
          <Button variant="ghost" size="sm" onClick={() => setTypeFilter("all")}>
            Clear filter
          </Button>
        )}
      </div>

      {/* Schedule Timeline */}
      <div className="space-y-6">
        {sortedDates.map((date) => (
          <div key={date}>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              {formatDate(date)}
            </h3>
            <div className="space-y-3 ml-7">
              {groupedSchedule[date]
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((item) => {
                  const property = properties.find(p => p.id === item.propertyId);
                  const TypeIcon = typeIcons[item.type];
                  
                  return (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="text-center min-w-[70px]">
                            <p className="text-sm font-semibold">{item.time}</p>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <TypeIcon className="h-4 w-4 text-muted-foreground" />
                              <h4 className="font-medium">{item.title}</h4>
                              <Badge
                                variant="secondary"
                                className={cn("text-xs", typeColors[item.type])}
                              >
                                {item.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {property?.name} {item.unit ? `• Unit ${item.unit}` : ""}
                            </p>
                            {item.notes && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {item.notes}
                              </p>
                            )}
                          </div>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      {sortedDates.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No events scheduled</h3>
          <p className="text-muted-foreground">Try adjusting your filters or add a new event</p>
        </div>
      )}
    </div>
  );
}
