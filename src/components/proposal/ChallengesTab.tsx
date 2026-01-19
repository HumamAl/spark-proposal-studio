import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, Code2, Zap } from "lucide-react";

const challenges = [
  {
    problem: "Legacy FileMaker Migration",
    whyFail: "Teams try to replicate everything at once, leading to scope creep and delays. FileMaker's unique workflow logic gets lost in translation.",
    solution: "Document existing workflows first, then build modular React components that mirror each screen. Incremental migration with parallel systems during transition.",
    tech: ["React", "TypeScript", "Component Architecture"],
  },
  {
    problem: "Complex Data Tables with Filters",
    whyFail: "Custom table implementations become unmaintainable. Performance degrades with large datasets and multiple filter combinations.",
    solution: "TanStack Table with virtual scrolling, server-side pagination patterns, and debounced filter inputs. Reusable table components with consistent UX.",
    tech: ["TanStack Table", "React Query", "Virtual Scrolling"],
  },
  {
    problem: "Multi-Role Dashboard Views",
    whyFail: "One-size-fits-all dashboards that don't serve any role well. Conditional rendering spaghetti that's impossible to maintain.",
    solution: "Role-based layout system with shared component library. Composable dashboard widgets that can be configured per user type.",
    tech: ["shadcn/ui", "RBAC Patterns", "Composable Components"],
  },
  {
    problem: "Real-Time Data Consistency",
    whyFail: "Stale data across screens leads to user confusion. Race conditions when multiple users edit simultaneously.",
    solution: "Optimistic updates with React Query invalidation patterns. Polling strategies for critical data, with clear loading and error states.",
    tech: ["React Query", "Optimistic Updates", "Error Boundaries"],
  },
  {
    problem: "Mobile-First Responsiveness",
    whyFail: "Desktop-first builds that break on mobile. Touch interactions feel clunky, tables become unusable on small screens.",
    solution: "Mobile-first Tailwind approach. Responsive tables with card layouts on mobile. Touch-friendly interaction areas and gesture support.",
    tech: ["Tailwind CSS", "Responsive Design", "Touch UX"],
  },
];

export function ChallengesTab() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-3">Project Challenges & Solutions</h2>
        <p className="text-muted-foreground">
          Based on the job description and FileMaker screenshots, here are the key technical 
          challenges I anticipate and how I would address them.
        </p>
      </div>

      <div className="grid gap-6">
        {challenges.map((challenge, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="bg-muted/50 pb-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                  {index + 1}
                </div>
                <div>
                  <CardTitle className="text-xl">{challenge.problem}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-3">
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
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <Code2 className="h-4 w-4" />
                    Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {challenge.tech.map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
