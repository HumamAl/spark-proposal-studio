import { useState } from "react";
import { Building2, MapPin, Users, Home, Search, Plus, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { properties, getPropertyTenants, getPropertyWorkOrders, Property } from "@/data/mockData";
import { cn } from "@/lib/utils";

export function PropertiesView() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const filteredProperties = properties.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.address.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || p.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Properties</h2>
          <p className="text-muted-foreground">
            Manage your property portfolio
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Property
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search properties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Residential">Residential</SelectItem>
            <SelectItem value="Commercial">Commercial</SelectItem>
            <SelectItem value="Mixed">Mixed Use</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Properties Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProperties.map((property) => {
          const occupancyRate = ((property.units - property.vacantUnits) / property.units) * 100;
          const tenants = getPropertyTenants(property.id);
          const workOrders = getPropertyWorkOrders(property.id).filter(
            (wo) => wo.status !== "Complete"
          );

          return (
            <Card
              key={property.id}
              className="cursor-pointer transition-all hover:shadow-md hover:border-primary/50"
              onClick={() => setSelectedProperty(property)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{property.name}</CardTitle>
                  </div>
                  <Badge
                    variant="secondary"
                    className={cn(
                      property.type === "Residential"
                        ? "bg-success/20 text-success"
                        : property.type === "Commercial"
                        ? "bg-primary/20 text-primary"
                        : "bg-accent/20 text-accent"
                    )}
                  >
                    {property.type}
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {property.address}, {property.city}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">{property.units}</p>
                    <p className="text-xs text-muted-foreground">Units</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{property.vacantUnits}</p>
                    <p className="text-xs text-muted-foreground">Vacant</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{occupancyRate.toFixed(0)}%</p>
                    <p className="text-xs text-muted-foreground">Occupied</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {tenants.length} tenants
                    </span>
                    {workOrders.length > 0 && (
                      <span className="flex items-center gap-1 text-warning">
                        {workOrders.length} work orders
                      </span>
                    )}
                  </div>
                  <p className="font-semibold text-sm">
                    ${property.monthlyRent.toLocaleString()}/mo
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No properties found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Property Detail Dialog */}
      <Dialog open={!!selectedProperty} onOpenChange={() => setSelectedProperty(null)}>
        <DialogContent className="max-w-2xl">
          {selectedProperty && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  {selectedProperty.name}
                </DialogTitle>
                <DialogDescription>
                  {selectedProperty.address}, {selectedProperty.city}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="rounded-lg bg-muted p-3 text-center">
                    <p className="text-2xl font-bold">{selectedProperty.units}</p>
                    <p className="text-xs text-muted-foreground">Total Units</p>
                  </div>
                  <div className="rounded-lg bg-muted p-3 text-center">
                    <p className="text-2xl font-bold">{selectedProperty.vacantUnits}</p>
                    <p className="text-xs text-muted-foreground">Vacant</p>
                  </div>
                  <div className="rounded-lg bg-muted p-3 text-center">
                    <p className="text-2xl font-bold">
                      {getPropertyTenants(selectedProperty.id).length}
                    </p>
                    <p className="text-xs text-muted-foreground">Tenants</p>
                  </div>
                  <div className="rounded-lg bg-muted p-3 text-center">
                    <p className="text-2xl font-bold">
                      ${selectedProperty.monthlyRent.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Avg Rent</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Current Tenants</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {getPropertyTenants(selectedProperty.id).map((tenant) => (
                      <div
                        key={tenant.id}
                        className="flex items-center justify-between rounded-lg border border-border p-3"
                      >
                        <div>
                          <p className="font-medium text-sm">
                            {tenant.firstName} {tenant.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Unit {tenant.unit} • Lease ends {tenant.leaseEnd}
                          </p>
                        </div>
                        <p className="font-medium text-sm">
                          ${tenant.rentAmount.toLocaleString()}/mo
                        </p>
                      </div>
                    ))}
                    {getPropertyTenants(selectedProperty.id).length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No tenants in this property
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1">View Full Details</Button>
                  <Button variant="outline">Edit Property</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
