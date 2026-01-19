import { useState } from "react";
import { Users, Search, Plus, Mail, Phone, Home, CreditCard, ChevronRight } from "lucide-react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { tenants, properties, Tenant } from "@/data/mockData";
import { cn } from "@/lib/utils";

const statusColors = {
  Active: "bg-success/20 text-success",
  Pending: "bg-warning/20 text-warning",
  Past: "bg-muted text-muted-foreground",
};

export function TenantsView() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  const filteredTenants = tenants.filter((t) => {
    const matchesSearch =
      `${t.firstName} ${t.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase()) ||
      t.unit.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getCreditScoreColor = (score: number) => {
    if (score >= 750) return "text-success";
    if (score >= 700) return "text-primary";
    if (score >= 650) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Tenants</h2>
          <p className="text-muted-foreground">
            {tenants.filter(t => t.status === "Active").length} active tenants across all properties
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Tenant
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Tenants</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{tenants.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-success">
              {tenants.filter(t => t.status === "Active").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-warning">
              {tenants.filter(t => t.status === "Pending").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Credit Score</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {Math.round(tenants.reduce((sum, t) => sum + t.creditScore, 0) / tenants.length)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tenants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Past">Past</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tenants Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant</TableHead>
                <TableHead className="hidden md:table-cell">Property</TableHead>
                <TableHead className="hidden sm:table-cell">Unit</TableHead>
                <TableHead className="hidden lg:table-cell">Rent</TableHead>
                <TableHead className="hidden lg:table-cell">Credit Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[40px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTenants.map((tenant) => {
                const property = properties.find(p => p.id === tenant.propertyId);
                return (
                  <TableRow
                    key={tenant.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedTenant(tenant)}
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {tenant.firstName} {tenant.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground md:hidden">
                          {property?.name}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {property?.name}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{tenant.unit}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      ${tenant.rentAmount.toLocaleString()}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className={cn("font-medium", getCreditScoreColor(tenant.creditScore))}>
                        {tenant.creditScore}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={cn("text-xs", statusColors[tenant.status])}
                      >
                        {tenant.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredTenants.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No tenants found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Tenant Detail Sheet */}
      <Sheet open={!!selectedTenant} onOpenChange={() => setSelectedTenant(null)}>
        <SheetContent className="sm:max-w-lg">
          {selectedTenant && (
            <>
              <SheetHeader>
                <SheetTitle>
                  {selectedTenant.firstName} {selectedTenant.lastName}
                </SheetTitle>
                <SheetDescription>Tenant Details</SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className={cn("text-sm", statusColors[selectedTenant.status])}
                  >
                    {selectedTenant.status}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span className={cn("font-bold", getCreditScoreColor(selectedTenant.creditScore))}>
                      {selectedTenant.creditScore}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedTenant.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedTenant.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {properties.find(p => p.id === selectedTenant.propertyId)?.name} • Unit {selectedTenant.unit}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm text-muted-foreground">Monthly Rent</p>
                    <p className="text-xl font-bold">${selectedTenant.rentAmount.toLocaleString()}</p>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm text-muted-foreground">Lease Ends</p>
                    <p className="text-xl font-bold">{selectedTenant.leaseEnd}</p>
                  </div>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <h4 className="font-medium mb-2">Lease Period</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedTenant.leaseStart} — {selectedTenant.leaseEnd}
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1">Send Message</Button>
                  <Button variant="outline" className="flex-1">Edit Tenant</Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
