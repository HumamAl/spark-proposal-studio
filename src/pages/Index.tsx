import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DemoApp } from "@/components/demo/DemoApp";
import { ChallengesTab } from "@/components/proposal/ChallengesTab";
import { ProposalTab } from "@/components/proposal/ProposalTab";
import { Building2, AlertTriangle, FileText } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">Property Management SaaS</h1>
                <p className="text-sm text-muted-foreground">Front-End Developer Proposal</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">by Humam Al Rubaye</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="app" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="app" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">App Demo</span>
              <span className="sm:hidden">Demo</span>
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">Challenges</span>
              <span className="sm:hidden">Issues</span>
            </TabsTrigger>
            <TabsTrigger value="proposal" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Proposal</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="app" className="mt-6">
            <DemoApp />
          </TabsContent>

          <TabsContent value="challenges" className="mt-6">
            <ChallengesTab />
          </TabsContent>

          <TabsContent value="proposal" className="mt-6">
            <ProposalTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
