// Mock data for Property Management Demo - Hawaiian properties matching the FileMaker screenshots

export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  units: number;
  vacantUnits: number;
  type: "Residential" | "Commercial" | "Mixed";
  status: "Active" | "Inactive";
  monthlyRent: number;
}

export interface Tenant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyId: string;
  unit: string;
  leaseStart: string;
  leaseEnd: string;
  rentAmount: number;
  status: "Active" | "Pending" | "Past";
  creditScore: number;
}

export interface Owner {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  properties: string[];
  totalUnits: number;
  balance: number;
}

export interface WorkOrder {
  id: string;
  propertyId: string;
  unit: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High" | "Emergency";
  status: "Pending" | "In Progress" | "Complete" | "On Hold";
  createdAt: string;
  assignedTo: string;
  category: "Plumbing" | "Electrical" | "HVAC" | "Appliance" | "General" | "Exterior";
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  tenantId: string;
  propertyId: string;
  amount: number;
  dueDate: string;
  status: "Paid" | "Pending" | "Overdue";
  type: "Rent" | "Utility" | "Maintenance" | "Late Fee";
  createdAt: string;
}

export interface Application {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  propertyId: string;
  unit: string;
  status: "Pending Review" | "Approved" | "Denied" | "In Progress";
  creditScore: number;
  income: number;
  submittedAt: string;
}

export interface ScheduleItem {
  id: string;
  title: string;
  type: "Showing" | "Move-In" | "Move-Out" | "Inspection" | "Maintenance";
  date: string;
  time: string;
  propertyId: string;
  unit?: string;
  notes?: string;
}

// Properties
export const properties: Property[] = [
  { id: "P001", name: "Kailua Shores", address: "1234 Kalanianaole Hwy", city: "Kailua", units: 24, vacantUnits: 2, type: "Residential", status: "Active", monthlyRent: 2800 },
  { id: "P002", name: "Aloha Gardens", address: "567 Kapiolani Blvd", city: "Honolulu", units: 48, vacantUnits: 5, type: "Mixed", status: "Active", monthlyRent: 3200 },
  { id: "P003", name: "Maui Palms", address: "890 Kaanapali Pkwy", city: "Lahaina", units: 16, vacantUnits: 1, type: "Residential", status: "Active", monthlyRent: 3500 },
  { id: "P004", name: "Pearl Harbor View", address: "234 Arizona Memorial Dr", city: "Pearl City", units: 36, vacantUnits: 3, type: "Residential", status: "Active", monthlyRent: 2400 },
  { id: "P005", name: "Diamond Head Plaza", address: "456 Monsarrat Ave", city: "Honolulu", units: 12, vacantUnits: 0, type: "Commercial", status: "Active", monthlyRent: 4500 },
  { id: "P006", name: "Waikiki Sunset", address: "789 Kalakaua Ave", city: "Honolulu", units: 64, vacantUnits: 8, type: "Mixed", status: "Active", monthlyRent: 3800 },
];

// Tenants
export const tenants: Tenant[] = [
  { id: "T001", firstName: "Keoni", lastName: "Nakamura", email: "keoni.n@email.com", phone: "(808) 555-0101", propertyId: "P001", unit: "A-101", leaseStart: "2024-01-15", leaseEnd: "2025-01-14", rentAmount: 2800, status: "Active", creditScore: 720 },
  { id: "T002", firstName: "Leilani", lastName: "Wong", email: "leilani.w@email.com", phone: "(808) 555-0102", propertyId: "P002", unit: "B-205", leaseStart: "2024-03-01", leaseEnd: "2025-02-28", rentAmount: 3200, status: "Active", creditScore: 685 },
  { id: "T003", firstName: "Makoa", lastName: "Tanaka", email: "makoa.t@email.com", phone: "(808) 555-0103", propertyId: "P003", unit: "C-12", leaseStart: "2023-08-01", leaseEnd: "2024-07-31", rentAmount: 3500, status: "Active", creditScore: 750 },
  { id: "T004", firstName: "Nalani", lastName: "Kim", email: "nalani.k@email.com", phone: "(808) 555-0104", propertyId: "P004", unit: "D-302", leaseStart: "2024-06-15", leaseEnd: "2025-06-14", rentAmount: 2400, status: "Active", creditScore: 695 },
  { id: "T005", firstName: "Koa", lastName: "Yamamoto", email: "koa.y@email.com", phone: "(808) 555-0105", propertyId: "P006", unit: "W-1504", leaseStart: "2024-02-01", leaseEnd: "2025-01-31", rentAmount: 3800, status: "Active", creditScore: 780 },
  { id: "T006", firstName: "Malia", lastName: "Chen", email: "malia.c@email.com", phone: "(808) 555-0106", propertyId: "P001", unit: "A-203", leaseStart: "2024-07-01", leaseEnd: "2025-06-30", rentAmount: 2850, status: "Active", creditScore: 710 },
  { id: "T007", firstName: "Kai", lastName: "Patel", email: "kai.p@email.com", phone: "(808) 555-0107", propertyId: "P002", unit: "B-108", leaseStart: "2024-04-15", leaseEnd: "2025-04-14", rentAmount: 3150, status: "Pending", creditScore: 665 },
  { id: "T008", firstName: "Hina", lastName: "Santos", email: "hina.s@email.com", phone: "(808) 555-0108", propertyId: "P006", unit: "W-808", leaseStart: "2023-12-01", leaseEnd: "2024-11-30", rentAmount: 3750, status: "Active", creditScore: 735 },
];

// Owners
export const owners: Owner[] = [
  { id: "O001", firstName: "Robert", lastName: "Kamehameha", email: "robert.k@email.com", phone: "(808) 555-0201", properties: ["P001", "P003"], totalUnits: 40, balance: 12500 },
  { id: "O002", firstName: "Susan", lastName: "Liu", email: "susan.l@email.com", phone: "(808) 555-0202", properties: ["P002"], totalUnits: 48, balance: 8200 },
  { id: "O003", firstName: "David", lastName: "Akaka", email: "david.a@email.com", phone: "(808) 555-0203", properties: ["P004", "P005"], totalUnits: 48, balance: -2400 },
  { id: "O004", firstName: "Jennifer", lastName: "Ito", email: "jennifer.i@email.com", phone: "(808) 555-0204", properties: ["P006"], totalUnits: 64, balance: 45800 },
];

// Work Orders
export const workOrders: WorkOrder[] = [
  { id: "WO001", propertyId: "P001", unit: "A-101", title: "Leaking faucet in bathroom", description: "Bathroom sink faucet dripping constantly", priority: "Medium", status: "Pending", createdAt: "2025-01-18", assignedTo: "Mike's Plumbing", category: "Plumbing" },
  { id: "WO002", propertyId: "P002", unit: "B-205", title: "AC not cooling", description: "Air conditioning unit not producing cold air", priority: "High", status: "In Progress", createdAt: "2025-01-17", assignedTo: "Island HVAC", category: "HVAC" },
  { id: "WO003", propertyId: "P006", unit: "W-1504", title: "Broken garbage disposal", description: "Garbage disposal making grinding noise and not working", priority: "Medium", status: "Complete", createdAt: "2025-01-15", assignedTo: "Aloha Appliance", category: "Appliance" },
  { id: "WO004", propertyId: "P003", unit: "C-12", title: "Exterior paint peeling", description: "Paint peeling on lanai railing", priority: "Low", status: "On Hold", createdAt: "2025-01-14", assignedTo: "Paradise Painters", category: "Exterior" },
  { id: "WO005", propertyId: "P004", unit: "D-302", title: "Electrical outlet not working", description: "Kitchen outlet sparking when appliances plugged in", priority: "Emergency", status: "In Progress", createdAt: "2025-01-19", assignedTo: "Pacific Electric", category: "Electrical" },
  { id: "WO006", propertyId: "P001", unit: "A-203", title: "Replace smoke detector batteries", description: "Smoke detector beeping - low battery", priority: "Medium", status: "Pending", createdAt: "2025-01-18", assignedTo: "Maintenance Team", category: "General" },
  { id: "WO007", propertyId: "P002", unit: "B-108", title: "Clogged drain", description: "Shower drain very slow", priority: "Medium", status: "Pending", createdAt: "2025-01-19", assignedTo: "Mike's Plumbing", category: "Plumbing" },
];

// Invoices
export const invoices: Invoice[] = [
  { id: "INV001", invoiceNumber: "INV-2025-001", tenantId: "T001", propertyId: "P001", amount: 2800, dueDate: "2025-02-01", status: "Pending", type: "Rent", createdAt: "2025-01-15" },
  { id: "INV002", invoiceNumber: "INV-2025-002", tenantId: "T002", propertyId: "P002", amount: 3200, dueDate: "2025-02-01", status: "Pending", type: "Rent", createdAt: "2025-01-15" },
  { id: "INV003", invoiceNumber: "INV-2025-003", tenantId: "T003", propertyId: "P003", amount: 3500, dueDate: "2025-01-15", status: "Paid", type: "Rent", createdAt: "2025-01-01" },
  { id: "INV004", invoiceNumber: "INV-2025-004", tenantId: "T004", propertyId: "P004", amount: 2400, dueDate: "2025-01-10", status: "Overdue", type: "Rent", createdAt: "2024-12-25" },
  { id: "INV005", invoiceNumber: "INV-2025-005", tenantId: "T005", propertyId: "P006", amount: 3800, dueDate: "2025-02-01", status: "Pending", type: "Rent", createdAt: "2025-01-15" },
  { id: "INV006", invoiceNumber: "INV-2025-006", tenantId: "T004", propertyId: "P004", amount: 75, dueDate: "2025-01-20", status: "Pending", type: "Late Fee", createdAt: "2025-01-11" },
  { id: "INV007", invoiceNumber: "INV-2025-007", tenantId: "T001", propertyId: "P001", amount: 145, dueDate: "2025-01-25", status: "Pending", type: "Utility", createdAt: "2025-01-10" },
  { id: "INV008", invoiceNumber: "INV-2025-008", tenantId: "T006", propertyId: "P001", amount: 2850, dueDate: "2025-01-01", status: "Paid", type: "Rent", createdAt: "2024-12-15" },
];

// Applications
export const applications: Application[] = [
  { id: "APP001", applicantName: "James Kawai", email: "james.k@email.com", phone: "(808) 555-0301", propertyId: "P001", unit: "A-105", status: "Pending Review", creditScore: 695, income: 85000, submittedAt: "2025-01-17" },
  { id: "APP002", applicantName: "Maria Santos", email: "maria.s@email.com", phone: "(808) 555-0302", propertyId: "P006", unit: "W-2001", status: "In Progress", creditScore: 720, income: 110000, submittedAt: "2025-01-16" },
  { id: "APP003", applicantName: "Brandon Lee", email: "brandon.l@email.com", phone: "(808) 555-0303", propertyId: "P002", unit: "B-401", status: "Approved", creditScore: 780, income: 125000, submittedAt: "2025-01-10" },
  { id: "APP004", applicantName: "Nicole Chang", email: "nicole.c@email.com", phone: "(808) 555-0304", propertyId: "P004", unit: "D-115", status: "Denied", creditScore: 580, income: 45000, submittedAt: "2025-01-08" },
];

// Schedule Items
export const scheduleItems: ScheduleItem[] = [
  { id: "S001", title: "Showing - A-105", type: "Showing", date: "2025-01-19", time: "10:00 AM", propertyId: "P001", unit: "A-105", notes: "James Kawai interested in 1BR" },
  { id: "S002", title: "Move-In - B-401", type: "Move-In", date: "2025-01-20", time: "9:00 AM", propertyId: "P002", unit: "B-401", notes: "Brandon Lee moving in" },
  { id: "S003", title: "Annual Inspection", type: "Inspection", date: "2025-01-21", time: "2:00 PM", propertyId: "P003", notes: "Full property inspection" },
  { id: "S004", title: "Showing - W-2001", type: "Showing", date: "2025-01-19", time: "2:30 PM", propertyId: "P006", unit: "W-2001", notes: "Maria Santos - 2BR luxury unit" },
  { id: "S005", title: "Move-Out - D-210", type: "Move-Out", date: "2025-01-22", time: "11:00 AM", propertyId: "P004", unit: "D-210", notes: "Final walkthrough scheduled" },
  { id: "S006", title: "AC Maintenance", type: "Maintenance", date: "2025-01-19", time: "3:00 PM", propertyId: "P002", unit: "B-205", notes: "Follow up on WO002" },
];

// Helper functions
export const getPropertyById = (id: string) => properties.find(p => p.id === id);
export const getTenantById = (id: string) => tenants.find(t => t.id === id);
export const getOwnerById = (id: string) => owners.find(o => o.id === id);

export const getPropertyTenants = (propertyId: string) => tenants.filter(t => t.propertyId === propertyId);
export const getPropertyWorkOrders = (propertyId: string) => workOrders.filter(wo => wo.propertyId === propertyId);
export const getPropertyInvoices = (propertyId: string) => invoices.filter(inv => inv.propertyId === propertyId);

// Dashboard stats
export const getDashboardStats = () => ({
  totalProperties: properties.length,
  totalUnits: properties.reduce((sum, p) => sum + p.units, 0),
  vacantUnits: properties.reduce((sum, p) => sum + p.vacantUnits, 0),
  activeTenants: tenants.filter(t => t.status === "Active").length,
  pendingWorkOrders: workOrders.filter(wo => wo.status === "Pending").length,
  inProgressWorkOrders: workOrders.filter(wo => wo.status === "In Progress").length,
  overdueInvoices: invoices.filter(inv => inv.status === "Overdue").length,
  pendingApplications: applications.filter(app => app.status === "Pending Review" || app.status === "In Progress").length,
  todaySchedule: scheduleItems.filter(s => s.date === "2025-01-19").length,
  monthlyRevenue: tenants.filter(t => t.status === "Active").reduce((sum, t) => sum + t.rentAmount, 0),
});
