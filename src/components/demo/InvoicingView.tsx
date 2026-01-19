import { useState } from "react";
import { FileText, Search, Plus, Upload, DollarSign, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { invoices, tenants, properties } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const statusColors = {
  Paid: "bg-success/20 text-success",
  Pending: "bg-warning/20 text-warning",
  Overdue: "bg-destructive/20 text-destructive",
};

const typeColors = {
  Rent: "bg-primary/20 text-primary",
  Utility: "bg-accent/20 text-accent",
  Maintenance: "bg-muted text-muted-foreground",
  "Late Fee": "bg-destructive/20 text-destructive",
};

export function InvoicingView() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [localInvoices, setLocalInvoices] = useState(invoices);

  const filteredInvoices = localInvoices.filter((inv) => {
    const tenant = tenants.find(t => t.id === inv.tenantId);
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      `${tenant?.firstName} ${tenant?.lastName}`.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || inv.status === statusFilter;
    const matchesType = typeFilter === "all" || inv.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    total: localInvoices.reduce((sum, inv) => sum + inv.amount, 0),
    paid: localInvoices.filter(inv => inv.status === "Paid").reduce((sum, inv) => sum + inv.amount, 0),
    pending: localInvoices.filter(inv => inv.status === "Pending").reduce((sum, inv) => sum + inv.amount, 0),
    overdue: localInvoices.filter(inv => inv.status === "Overdue").reduce((sum, inv) => sum + inv.amount, 0),
  };

  const handleMarkPaid = (invoiceId: string) => {
    setLocalInvoices(prev =>
      prev.map(inv =>
        inv.id === invoiceId ? { ...inv, status: "Paid" as const } : inv
      )
    );
    toast.success("Invoice marked as paid!");
  };

  const handleUploadBill = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadOpen(false);
    toast.success("Utility bill uploaded and processed!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Invoicing & Billing</h2>
          <p className="text-muted-foreground">
            Manage invoices, payments, and utility bills
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Bill
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleUploadBill}>
                <DialogHeader>
                  <DialogTitle>Upload Utility Bill</DialogTitle>
                  <DialogDescription>
                    Upload a utility bill to process and allocate to tenants
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
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
                    <Label>Bill Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electric">Electric</SelectItem>
                        <SelectItem value="water">Water</SelectItem>
                        <SelectItem value="gas">Gas</SelectItem>
                        <SelectItem value="trash">Trash</SelectItem>
                        <SelectItem value="internet">Internet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Bill Amount</Label>
                    <Input type="number" placeholder="0.00" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Upload File</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Drag & drop or click to upload
                      </p>
                      <Input type="file" className="hidden" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setUploadOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Process Bill</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Billed</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${stats.total.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Collected</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-success">${stats.paid.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-warning">${stats.pending.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-destructive">${stats.overdue.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search invoices..."
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
            <SelectItem value="Paid">Paid</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Rent">Rent</SelectItem>
            <SelectItem value="Utility">Utility</SelectItem>
            <SelectItem value="Maintenance">Maintenance</SelectItem>
            <SelectItem value="Late Fee">Late Fee</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead className="hidden sm:table-cell">Tenant</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="hidden lg:table-cell">Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => {
                const tenant = tenants.find(t => t.id === invoice.tenantId);
                const property = properties.find(p => p.id === invoice.propertyId);
                return (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div>
                        <p className="font-medium text-sm">
                          {tenant?.firstName} {tenant?.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground">{property?.name}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="secondary" className={cn("text-xs", typeColors[invoice.type])}>
                        {invoice.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold">
                      ${invoice.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{invoice.dueDate}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={cn("text-xs", statusColors[invoice.status])}
                      >
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {invoice.status !== "Paid" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkPaid(invoice.id)}
                        >
                          Mark Paid
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredInvoices.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No invoices found</h3>
          <p className="text-muted-foreground">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}
