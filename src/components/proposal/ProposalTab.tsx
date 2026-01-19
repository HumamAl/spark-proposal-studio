import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Calendar,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Target,
  Clock,
  Star,
  Zap,
  Shield,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

// Calculate actual dates from today
const getProjectDates = () => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() + 3); // Project starts in 3 days

  const phases = [
    { start: new Date(startDate), end: new Date(startDate) },
    { start: new Date(startDate), end: new Date(startDate) },
    { start: new Date(startDate), end: new Date(startDate) },
  ];

  // Phase 1: Days 1-10
  phases[0].end.setDate(startDate.getDate() + 10);

  // Phase 2: Days 11-24
  phases[1].start.setDate(startDate.getDate() + 11);
  phases[1].end.setDate(startDate.getDate() + 24);

  // Phase 3: Days 25-42 (6 weeks)
  phases[2].start.setDate(startDate.getDate() + 25);
  phases[2].end.setDate(startDate.getDate() + 42);

  return {
    startDate,
    phases,
    endDate: phases[2].end,
  };
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const { startDate, phases, endDate } = getProjectDates();

const timeline = [
  {
    week: `${formatDate(startDate)} - ${formatDate(phases[0].end)}`,
    title: "Discovery & Foundation",
    subtitle: "Week 1-2",
    tasks: [
      "Audit existing FileMaker screens & document workflows",
      "Set up React/TypeScript project with shadcn/ui design system",
      "Build core layouts, navigation, and component library",
      "Establish data models matching your existing schema",
    ],
    deliverable: "Clickable prototype of core navigation & dashboard",
  },
  {
    week: `${formatDate(phases[1].start)} - ${formatDate(phases[1].end)}`,
    title: "Core Features",
    subtitle: "Week 3-4",
    tasks: [
      "Dashboard with real-time stats & alerts",
      "Properties management with search & filtering",
      "Tenants & owners views with detail panels",
      "Work order system with status tracking",
    ],
    deliverable: "Functional MVP with live data integration ready",
  },
  {
    week: `${formatDate(phases[2].start)} - ${formatDate(phases[2].end)}`,
    title: "Polish & Handoff",
    subtitle: "Week 5-6",
    tasks: [
      "Invoicing & billing workflows",
      "Scheduling calendar with event management",
      "Mobile optimization & touch interactions",
      "Documentation & knowledge transfer",
    ],
    deliverable: "Production-ready application with full documentation",
  },
];

const experience = [
  {
    name: "Marlo AI",
    type: "iOS App",
    description: "AI-powered mobile app with complex state management and real-time data sync",
    relevance: "Similar multi-role user architecture",
    icon: Zap,
  },
  {
    name: "QuantBook",
    type: "Web App",
    description: "Financial dashboard with data tables, filters, and real-time updates",
    relevance: "Complex data tables & filtering",
    icon: Target,
  },
  {
    name: "MapCanvas.store",
    type: "E-commerce",
    description: "Full e-commerce platform with custom configurator and checkout flow",
    relevance: "Form-heavy workflows similar to property management",
    icon: Star,
  },
  {
    name: "Business Operations",
    type: "SaaS Platform",
    description: "Operations software with scheduling, invoicing, and client management",
    relevance: "Direct experience with similar feature set",
    icon: Shield,
  },
];

const whyMe = [
  {
    title: "FileMaker Migration Experience",
    description: "I've helped 3 businesses transition from legacy systems to modern React apps without losing critical workflows",
  },
  {
    title: "Property Management Domain Knowledge",
    description: "Built tenant portals, work order systems, and invoice management features in previous projects",
  },
  {
    title: "Hawaii-Based Understanding",
    description: "Familiar with local business practices and can schedule calls during your working hours",
  },
];

export function ProposalTab() {
  const [isScheduling, setIsScheduling] = useState(false);

  const handleScheduleCall = async () => {
    setIsScheduling(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsScheduling(false);
    toast.success("Opening calendar...", {
      description: "You'll be redirected to schedule a call",
    });
    // In a real app, this would open Calendly or similar
    window.open("mailto:humameu4@gmail.com?subject=Property Management Project Discussion", "_blank");
  };

  const totalWeeks = 6;
  const progressPercent = 0; // Not started yet

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Hero Section */}
      <section className="max-w-3xl mx-auto text-center">
        <Badge className="mb-4" variant="secondary">
          Available to start {formatDate(startDate)}
        </Badge>
        <h2 className="text-3xl font-bold mb-4">
          Let's Modernize Your Property Management System
        </h2>
        <p className="text-lg text-muted-foreground mb-6">
          I understand you're modernizing a FileMaker-based system that's served your Hawaiian
          properties well for 20+ years. The goal: a React/Next.js frontend that preserves your
          existing workflows while enabling a modern, responsive experience for your team.
        </p>
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>6-week timeline</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <span>MVP-focused approach</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span>Milestone-based delivery</span>
          </div>
        </div>
      </section>

      <Separator />

      {/* Project Timeline */}
      <section>
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Project Timeline</h3>
          <p className="text-muted-foreground">
            Target completion: {formatDate(endDate)}
          </p>
          <div className="max-w-md mx-auto mt-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Project Start</span>
              <span>{progressPercent}% Complete</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {timeline.map((phase, index) => (
            <Card key={index} className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {phase.subtitle}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{phase.week}</span>
                </div>
                <CardTitle>{phase.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {phase.tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                      {task}
                    </li>
                  ))}
                </ul>
                <div className="pt-3 border-t border-border">
                  <p className="text-xs font-medium text-primary flex items-center gap-1">
                    <ArrowRight className="h-3 w-3" />
                    Deliverable: {phase.deliverable}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Why Me */}
      <section>
        <h3 className="text-2xl font-bold text-center mb-6">Why I'm the Right Fit</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {whyMe.map((item, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Relevant Experience */}
      <section>
        <h3 className="text-2xl font-bold text-center mb-6">Relevant Experience</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {experience.map((project, index) => {
            const Icon = project.icon;
            return (
              <Card key={index} className="group hover:border-primary/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {project.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                  <p className="text-xs text-primary font-medium">{project.relevance}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <Separator />

      {/* Contact CTA */}
      <section>
        <Card className="max-w-2xl mx-auto border-primary/20 bg-primary/5">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
            <p className="text-muted-foreground">
              Let's discuss your project requirements and timeline
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Contact Info */}
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href="mailto:humameu4@gmail.com"
                className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors"
              >
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-sm">humameu4@gmail.com</span>
              </a>
              <a
                href="tel:518-965-9700"
                className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors"
              >
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-sm">518-965-9700</span>
              </a>
              <a
                href="https://linkedin.com/in/humam-alrubaye"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors"
              >
                <Linkedin className="h-5 w-5 text-primary" />
                <span className="text-sm">linkedin.com/in/humam-alrubaye</span>
                <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground" />
              </a>
              <a
                href="https://github.com/HumamAl"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors"
              >
                <Github className="h-5 w-5 text-primary" />
                <span className="text-sm">github.com/HumamAl</span>
                <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground" />
              </a>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center pt-2">
              <Button
                size="lg"
                onClick={handleScheduleCall}
                disabled={isScheduling}
                className="min-w-[200px]"
              >
                {isScheduling ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Opening...
                  </>
                ) : (
                  <>
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule a Call
                  </>
                )}
              </Button>
            </div>

            {/* Availability Note */}
            <p className="text-center text-xs text-muted-foreground">
              Available for calls Mon-Fri, 9 AM - 6 PM HST
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Developer Info Footer */}
      <div className="text-center pt-4">
        <p className="text-sm font-medium">Humam Al Rubaye</p>
        <p className="text-xs text-muted-foreground">
          Front-End Developer | React & TypeScript Specialist
        </p>
      </div>
    </div>
  );
}
