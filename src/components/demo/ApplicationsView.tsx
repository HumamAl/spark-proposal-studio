import { useState } from "react";
import { ClipboardList, Search, Eye, CheckCircle2, XCircle, Clock, FileCheck, Loader2 } from "lucide-react";
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
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { applications, properties, Application } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const statusColors = {
  "Pending Review": "bg-warning/20 text-warning",
  "In Progress": "bg-primary/20 text-primary",
  Approved: "bg-success/20 text-success",
  Denied: "bg-destructive/20 text-destructive",
};

const statusIcons = {
  "Pending Review": Clock,
  "In Progress": FileCheck,
  Approved: CheckCircle2,
  Denied: XCircle,
};

export function ApplicationsView() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [localApplications, setLocalApplications] = useState(applications);
  const [isUpdating, setIsUpdating] = useState(false);

  const filteredApplications = localApplications.filter((app) => {
    const matchesSearch =
      app.applicantName.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = async (appId: string, newStatus: Application["status"]) => {
    setIsUpdating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    setLocalApplications(prev =>
      prev.map(app =>
        app.id === appId ? { ...app, status: newStatus } : app
      )
    );
    setIsUpdating(false);
    setSelectedApp(null);
    toast.success(`Application ${newStatus.toLowerCase()}!`, {
      description: newStatus === "Approved"
        ? "The applicant will be notified via email"
        : newStatus === "Denied"
        ? "A rejection email will be sent"
        : "Status has been updated",
    });
  };

  const getCreditScoreColor = (score: number) => {
    if (score >= 750) return "text-success";
    if (score >= 700) return "text-primary";
    if (score >= 650) return "text-warning";
    return "text-destructive";
  };

  const getCreditScoreLabel = (score: number) => {
    if (score >= 750) return "Excellent";
    if (score >= 700) return "Good";
    if (score >= 650) return "Fair";
    return "Poor";
  };

  const statCounts = {
    pending: localApplications.filter(a => a.status === "Pending Review").length,
    inProgress: localApplications.filter(a => a.status === "In Progress").length,
    approved: localApplications.filter(a => a.status === "Approved").length,
    denied: localApplications.filter(a => a.status === "Denied").length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Applications</h2>
          <p className="text-muted-foreground">
            Review and process rental applications
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card className="cursor-pointer hover:border-warning/50" onClick={() => setStatusFilter("Pending Review")}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-warning">{statCounts.pending}</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-primary/50" onClick={() => setStatusFilter("In Progress")}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
            <FileCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">{statCounts.inProgress}</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-success/50" onClick={() => setStatusFilter("Approved")}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-success">{statCounts.approved}</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-destructive/50" onClick={() => setStatusFilter("Denied")}>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Denied</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-destructive">{statCounts.denied}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search applications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Pending Review">Pending Review</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Denied">Denied</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Applications Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredApplications.map((app) => {
          const property = properties.find(p => p.id === app.propertyId);
          const StatusIcon = statusIcons[app.status];
          
          return (
            <Card key={app.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-lg">{app.applicantName}</h4>
                    <p className="text-sm text-muted-foreground">{app.email}</p>
                  </div>
                  <Badge variant="secondary" className={cn("text-xs", statusColors[app.status])}>
                    <StatusIcon className="mr-1 h-3 w-3" />
                    {app.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Property</p>
                    <p className="text-sm font-medium">{property?.name}</p>
                    <p className="text-xs text-muted-foreground">Unit {app.unit}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Annual Income</p>
                    <p className="text-sm font-medium">${app.income.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-muted-foreground">Credit Score</p>
                    <span className={cn("text-sm font-bold", getCreditScoreColor(app.creditScore))}>
                      {app.creditScore} - {getCreditScoreLabel(app.creditScore)}
                    </span>
                  </div>
                  <Progress
                    value={(app.creditScore / 850) * 100}
                    className="h-2"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Submitted: {app.submittedAt}
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setSelectedApp(app)}>
                    <Eye className="mr-2 h-4 w-4" />
                    Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredApplications.length === 0 && (
        <div className="text-center py-12">
          <ClipboardList className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No applications found</h3>
          <p className="text-muted-foreground">Try adjusting your filters</p>
        </div>
      )}

      {/* Application Review Dialog */}
      <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
        <DialogContent className="max-w-lg">
          {selectedApp && (
            <>
              <DialogHeader>
                <DialogTitle>Application Review</DialogTitle>
                <DialogDescription>
                  {selectedApp.applicantName} - {properties.find(p => p.id === selectedApp.propertyId)?.name}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-xs text-muted-foreground">Credit Score</p>
                    <p className={cn("text-xl font-bold", getCreditScoreColor(selectedApp.creditScore))}>
                      {selectedApp.creditScore}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {getCreditScoreLabel(selectedApp.creditScore)}
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted p-3">
                    <p className="text-xs text-muted-foreground">Annual Income</p>
                    <p className="text-xl font-bold">${selectedApp.income.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">
                      ${Math.round(selectedApp.income / 12).toLocaleString()}/mo
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-border p-3">
                  <h4 className="font-medium mb-2">Contact Information</h4>
                  <p className="text-sm">{selectedApp.email}</p>
                  <p className="text-sm">{selectedApp.phone}</p>
                </div>

                <div className="rounded-lg border border-border p-3">
                  <h4 className="font-medium mb-2">Property Details</h4>
                  <p className="text-sm">
                    {properties.find(p => p.id === selectedApp.propertyId)?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">Unit {selectedApp.unit}</p>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
                  <Badge variant="secondary" className={cn(statusColors[selectedApp.status])}>
                    {selectedApp.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Submitted on {selectedApp.submittedAt}
                  </span>
                </div>
              </div>

              <DialogFooter className="flex-col gap-2 sm:flex-row">
                {selectedApp.status !== "Denied" && selectedApp.status !== "Approved" && (
                  <>
                    <Button
                      variant="destructive"
                      onClick={() => handleUpdateStatus(selectedApp.id, "Denied")}
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <XCircle className="mr-2 h-4 w-4" />
                      )}
                      Deny
                    </Button>
                    <Button
                      variant="default"
                      onClick={() => handleUpdateStatus(selectedApp.id, "Approved")}
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                      )}
                      Approve
                    </Button>
                  </>
                )}
                {selectedApp.status === "Pending Review" && (
                  <Button
                    variant="outline"
                    onClick={() => handleUpdateStatus(selectedApp.id, "In Progress")}
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Start Review"
                    )}
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
