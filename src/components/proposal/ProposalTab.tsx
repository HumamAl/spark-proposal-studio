import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Linkedin, Github, Calendar, CheckCircle2, ExternalLink } from "lucide-react";

const timeline = [
  { week: "Week 1-2", title: "Discovery & Foundation", tasks: ["Audit existing FileMaker screens", "Set up design system & component library", "Build core layouts & navigation"] },
  { week: "Week 3-4", title: "Core Features", tasks: ["Dashboard with real-time stats", "Properties & Tenants management", "Work order system with status tracking"] },
  { week: "Week 5-6", title: "Polish & Handoff", tasks: ["Invoicing & billing workflows", "Mobile optimization", "Documentation & knowledge transfer"] },
];

const experience = [
  { name: "Marlo AI", type: "iOS App", description: "AI-powered mobile application with complex state management" },
  { name: "QuantBook", type: "Web App", description: "Financial web application with data visualization and real-time updates" },
  { name: "MapCanvas.store", type: "E-commerce", description: "Full e-commerce platform with custom product configurator" },
  { name: "Cleaning Business Tools", type: "Operations", description: "Business operations software with scheduling and invoicing" },
];

export function ProposalTab() {
  return (
    <div className="space-y-10 animate-fade-in">
      {/* Understanding Section */}
      <section className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">My Understanding</h2>
        <p className="text-lg text-muted-foreground">
          You're modernizing a FileMaker-based property management system used for 20+ years. 
          The goal is a React/Next.js frontend that preserves existing workflows while enabling 
          a modern, responsive user experience. The 6-week MVP timeline is aggressive but achievable 
          with the right focus.
        </p>
      </section>

      <Separator />

      {/* Timeline */}
      <section>
        <h3 className="text-2xl font-bold text-center mb-6">Proposed Timeline</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {timeline.map((phase, index) => (
            <Card key={index}>
              <CardHeader>
                <Badge className="w-fit mb-2">{phase.week}</Badge>
                <CardTitle>{phase.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {phase.tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                      {task}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Experience */}
      <section>
        <h3 className="text-2xl font-bold text-center mb-6">Relevant Experience</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {experience.map((project, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <Badge variant="outline" className="w-fit mb-1 text-xs">{project.type}</Badge>
                <CardTitle className="text-lg">{project.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Contact */}
      <section>
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Humam Al Rubaye</CardTitle>
            <p className="text-muted-foreground">Front-End Developer | React & TypeScript Specialist</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <a href="mailto:humameu4@gmail.com" className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-sm">humameu4@gmail.com</span>
              </a>
              <a href="tel:518-965-9700" className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-sm">518-965-9700</span>
              </a>
              <a href="https://linkedin.com/in/humam-alrubaye" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                <Linkedin className="h-5 w-5 text-primary" />
                <span className="text-sm">linkedin.com/in/humam-alrubaye</span>
                <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground" />
              </a>
              <a href="https://github.com/HumamAl" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                <Github className="h-5 w-5 text-primary" />
                <span className="text-sm">github.com/HumamAl</span>
                <ExternalLink className="h-3 w-3 ml-auto text-muted-foreground" />
              </a>
            </div>
            <div className="flex justify-center pt-4">
              <Button size="lg" asChild>
                <a href="mailto:humameu4@gmail.com">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule a Call
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
