import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle2, Code2, ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Challenge {
  problem: string;
  whyFail: string;
  solution: string;
  tech: string[];
  codeSnippet?: {
    title: string;
    language: string;
    code: string;
  };
}

const challenges: Challenge[] = [
  {
    problem: "Legacy FileMaker Migration",
    whyFail: "Teams try to replicate everything at once, leading to scope creep and delays. FileMaker's unique workflow logic gets lost in translation.",
    solution: "Document existing workflows first, then build modular React components that mirror each screen. Incremental migration with parallel systems during transition.",
    tech: ["React", "TypeScript", "Component Architecture"],
    codeSnippet: {
      title: "Mapping FileMaker layouts to React components",
      language: "typescript",
      code: `// FileMaker Layout → React Component mapping
interface PropertyLayout {
  // Maps to FileMaker "Properties" layout fields
  id: string;
  name: string;
  address: string;
  units: Unit[];
  tenants: Tenant[];
}

// Composable view that mirrors FileMaker's portal structure
function PropertyDetailView({ property }: { property: PropertyLayout }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Main property info - maps to FileMaker header */}
      <PropertyInfoCard property={property} />

      {/* Portal: Units list */}
      <UnitsPortal units={property.units} />

      {/* Portal: Active tenants */}
      <TenantsPortal tenants={property.tenants} />
    </div>
  );
}`,
    },
  },
  {
    problem: "Complex Data Tables with Filters",
    whyFail: "Custom table implementations become unmaintainable. Performance degrades with large datasets and multiple filter combinations.",
    solution: "TanStack Table with virtual scrolling, server-side pagination patterns, and debounced filter inputs. Reusable table components with consistent UX.",
    tech: ["TanStack Table", "React Query", "Virtual Scrolling"],
    codeSnippet: {
      title: "Reusable property table with filters",
      language: "typescript",
      code: `// Composable table hook for property management
function usePropertyTable(properties: Property[]) {
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    status: "all",
  });

  // Debounced search for performance
  const debouncedSearch = useDebounce(filters.search, 300);

  const filteredData = useMemo(() =>
    properties.filter(p => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());
      const matchesType = filters.type === "all" ||
        p.type === filters.type;
      return matchesSearch && matchesType;
    }),
    [properties, debouncedSearch, filters.type]
  );

  return { filteredData, filters, setFilters };
}`,
    },
  },
  {
    problem: "Multi-Role Dashboard Views",
    whyFail: "One-size-fits-all dashboards that don't serve any role well. Conditional rendering spaghetti that's impossible to maintain.",
    solution: "Role-based layout system with shared component library. Composable dashboard widgets that can be configured per user type.",
    tech: ["shadcn/ui", "RBAC Patterns", "Composable Components"],
    codeSnippet: {
      title: "Role-based dashboard composition",
      language: "typescript",
      code: `// Define widgets available per role
const dashboardConfig: Record<UserRole, WidgetConfig[]> = {
  owner: [
    { id: "revenue", component: RevenueWidget, cols: 2 },
    { id: "properties", component: PropertiesWidget, cols: 1 },
    { id: "payments", component: PaymentStatusWidget, cols: 1 },
  ],
  manager: [
    { id: "workOrders", component: WorkOrdersWidget, cols: 2 },
    { id: "schedule", component: ScheduleWidget, cols: 1 },
    { id: "applications", component: ApplicationsWidget, cols: 1 },
  ],
  tenant: [
    { id: "myUnit", component: TenantUnitWidget, cols: 2 },
    { id: "maintenance", component: MaintenanceWidget, cols: 2 },
  ],
};

// Render dashboard based on user role
function Dashboard({ role }: { role: UserRole }) {
  const widgets = dashboardConfig[role];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {widgets.map(({ id, component: Widget, cols }) => (
        <div key={id} className={\`md:col-span-\${cols}\`}>
          <Widget />
        </div>
      ))}
    </div>
  );
}`,
    },
  },
  {
    problem: "Real-Time Data Consistency",
    whyFail: "Stale data across screens leads to user confusion. Race conditions when multiple users edit simultaneously.",
    solution: "Optimistic updates with React Query invalidation patterns. Polling strategies for critical data, with clear loading and error states.",
    tech: ["React Query", "Optimistic Updates", "Error Boundaries"],
    codeSnippet: {
      title: "Optimistic updates for work orders",
      language: "typescript",
      code: `function useUpdateWorkOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateWorkOrderStatus,

    // Optimistic update - instant UI feedback
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ['workOrders'] });

      const previous = queryClient.getQueryData(['workOrders']);

      queryClient.setQueryData(['workOrders'], (old: WorkOrder[]) =>
        old.map(wo => wo.id === id ? { ...wo, status } : wo)
      );

      return { previous };
    },

    // Rollback on error
    onError: (err, variables, context) => {
      queryClient.setQueryData(['workOrders'], context?.previous);
      toast.error("Failed to update status");
    },

    // Sync with server
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['workOrders'] });
    },
  });
}`,
    },
  },
  {
    problem: "Mobile-First Responsiveness",
    whyFail: "Desktop-first builds that break on mobile. Touch interactions feel clunky, tables become unusable on small screens.",
    solution: "Mobile-first Tailwind approach. Responsive tables with card layouts on mobile. Touch-friendly interaction areas and gesture support.",
    tech: ["Tailwind CSS", "Responsive Design", "Touch UX"],
    codeSnippet: {
      title: "Responsive property list with card/table toggle",
      language: "typescript",
      code: `function PropertyList({ properties }: Props) {
  // Automatically switch layout based on screen size
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    // Card layout for mobile - touch-friendly
    return (
      <div className="space-y-3">
        {properties.map(property => (
          <PropertyCard
            key={property.id}
            property={property}
            // Larger touch targets (44px minimum)
            className="min-h-[88px] active:scale-[0.98]"
          />
        ))}
      </div>
    );
  }

  // Full table for desktop
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Property</TableHead>
          <TableHead>Units</TableHead>
          <TableHead>Occupancy</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {properties.map(p => <PropertyRow key={p.id} {...p} />)}
      </TableBody>
    </Table>
  );
}`,
    },
  },
];

export function ChallengesTab() {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set([0]));
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCards(newExpanded);
  };

  const copyCode = async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      toast.success("Code copied to clipboard");
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      toast.error("Failed to copy code");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-3">Project Challenges & Solutions</h2>
        <p className="text-muted-foreground">
          Based on the job description and FileMaker screenshots, here are the key technical
          challenges I anticipate and my proven approaches to solving them.
        </p>
        <p className="text-sm text-primary mt-2">
          Click any challenge to see implementation details and code examples
        </p>
      </div>

      <div className="grid gap-6">
        {challenges.map((challenge, index) => {
          const isExpanded = expandedCards.has(index);

          return (
            <Card key={index} className="overflow-hidden transition-all duration-200">
              <CardHeader
                className="bg-muted/50 pb-4 cursor-pointer hover:bg-muted/70 transition-colors"
                onClick={() => toggleCard(index)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{challenge.problem}</CardTitle>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {challenge.tech.map((t) => (
                          <Badge key={t} variant="secondary" className="text-xs">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="shrink-0">
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>

              <div className={cn(
                "overflow-hidden transition-all duration-300",
                isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
              )}>
                <CardContent className="pt-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-destructive font-medium">
                        <AlertTriangle className="h-4 w-4" />
                        Why Teams Fail
                      </div>
                      <p className="text-sm text-muted-foreground">{challenge.whyFail}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-success font-medium">
                        <CheckCircle2 className="h-4 w-4" />
                        My Solution
                      </div>
                      <p className="text-sm text-muted-foreground">{challenge.solution}</p>
                    </div>
                  </div>

                  {challenge.codeSnippet && (
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-primary font-medium">
                          <Code2 className="h-4 w-4" />
                          {challenge.codeSnippet.title}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyCode(challenge.codeSnippet!.code, index);
                          }}
                          className="h-8 px-2"
                        >
                          {copiedIndex === index ? (
                            <>
                              <Check className="h-3 w-3 mr-1 text-success" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3 mr-1" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                      <div className="relative rounded-lg bg-slate-950 text-slate-50 p-4 overflow-x-auto">
                        <pre className="text-xs leading-relaxed">
                          <code>{challenge.codeSnippet.code}</code>
                        </pre>
                      </div>
                    </div>
                  )}
                </CardContent>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
