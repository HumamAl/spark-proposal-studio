import { useState } from "react";
import { UserCheck, Search, Plus, Mail, Phone, Building2, DollarSign, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { owners, properties, Owner } from "@/data/mockData";
import { cn } from "@/lib/utils";

export function OwnersView() {
  const [search, setSearch] = useState("");
  const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);

  const filteredOwners = owners.filter((o) =>
    `${o.firstName} ${o.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    o.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = owners.reduce((sum, o) => sum + o.balance, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Property Owners</h2>
          <p className="text-muted-foreground">
            Manage owner relationships and distributions
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Owner
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Owners</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{owners.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Properties Managed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{properties.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Units</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {owners.reduce((sum, o) => sum + o.totalUnits, 0)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Combined Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={cn("text-2xl font-bold", totalRevenue >= 0 ? "text-success" : "text-destructive")}>
              ${totalRevenue.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search owners..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Owners Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Owner</TableHead>
                <TableHead className="hidden sm:table-cell">Properties</TableHead>
                <TableHead className="hidden md:table-cell">Units</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead className="w-[40px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOwners.map((owner) => {
                const ownerProperties = properties.filter(p => owner.properties.includes(p.id));
                return (
                  <TableRow
                    key={owner.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedOwner(owner)}
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {owner.firstName} {owner.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">{owner.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {ownerProperties.slice(0, 2).map(p => (
                          <Badge key={p.id} variant="secondary" className="text-xs">
                            {p.name}
                          </Badge>
                        ))}
                        {ownerProperties.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{ownerProperties.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{owner.totalUnits}</TableCell>
                    <TableCell>
                      <span className={cn(
                        "font-medium",
                        owner.balance >= 0 ? "text-success" : "text-destructive"
                      )}>
                        ${owner.balance.toLocaleString()}
                      </span>
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

      {filteredOwners.length === 0 && (
        <div className="text-center py-12">
          <UserCheck className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No owners found</h3>
          <p className="text-muted-foreground">Try adjusting your search</p>
        </div>
      )}

      {/* Owner Detail Sheet */}
      <Sheet open={!!selectedOwner} onOpenChange={() => setSelectedOwner(null)}>
        <SheetContent className="sm:max-w-lg">
          {selectedOwner && (
            <>
              <SheetHeader>
                <SheetTitle>
                  {selectedOwner.firstName} {selectedOwner.lastName}
                </SheetTitle>
                <SheetDescription>Owner Details</SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedOwner.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedOwner.phone}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm text-muted-foreground">Total Units</p>
                    <p className="text-xl font-bold">{selectedOwner.totalUnits}</p>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm text-muted-foreground">Balance</p>
                    <p className={cn(
                      "text-xl font-bold",
                      selectedOwner.balance >= 0 ? "text-success" : "text-destructive"
                    )}>
                      ${selectedOwner.balance.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Owned Properties
                  </h4>
                  <div className="space-y-2">
                    {properties
                      .filter(p => selectedOwner.properties.includes(p.id))
                      .map(property => (
                        <div
                          key={property.id}
                          className="flex items-center justify-between rounded-lg border border-border p-3"
                        >
                          <div>
                            <p className="font-medium text-sm">{property.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {property.units} units • {property.city}
                            </p>
                          </div>
                          <Badge variant="secondary">{property.type}</Badge>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Process Distribution
                  </Button>
                  <Button variant="outline" className="flex-1">Edit Owner</Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
