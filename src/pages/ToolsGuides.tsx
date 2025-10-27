import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CardGrid from "@/components/CardGrid";
import Footer from "@/components/Footer";
import { FileText, Wrench, BookOpen, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

const ToolsGuides = () => {
  const resources = [
    {
      title: "Risk Assessment Framework",
      description: "Comprehensive methodology for identifying, categorizing, and mitigating AI-related risks across the development lifecycle.",
      icon: FileText,
    },
    {
      title: "Bias Detection Toolkit",
      description: "Technical tools and statistical methods for detecting and measuring bias in training data, models, and system outputs.",
      icon: Wrench,
    },
    {
      title: "Transparency Playbook",
      description: "Best practices for documenting AI systems, creating model cards, and communicating with stakeholders about AI capabilities and limitations.",
      icon: BookOpen,
    },
    {
      title: "Governance Templates",
      description: "Ready-to-use policy templates, review checklists, and governance frameworks adaptable to your organization's needs.",
      icon: Code,
    },
  ];

  const guides = [
    {
      title: "Getting Started with Responsible AI",
      category: "Fundamentals",
      description: "Introduction to core principles and practical first steps for any organization.",
    },
    {
      title: "Building AI Ethics Committees",
      category: "Governance",
      description: "How to establish, structure, and empower internal AI review boards.",
    },
    {
      title: "Data Quality for Fair AI",
      category: "Technical",
      description: "Ensuring training data represents diverse populations and use cases.",
    },
    {
      title: "Explainability Techniques",
      category: "Technical",
      description: "Methods for making AI decision-making interpretable and auditable.",
    },
    {
      title: "Stakeholder Engagement",
      category: "Community",
      description: "Involving users, affected communities, and experts in AI development.",
    },
    {
      title: "Incident Response Planning",
      category: "Operations",
      description: "Preparing for and responding to AI system failures or unintended harms.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <Hero
        title="Tools & Guides for Trustworthy AI"
        description="Practical resources to help your organization implement responsible AI practices at every stage of the development lifecycle."
      />

      <CardGrid
        title="Core Toolkits"
        description="Essential frameworks and tools for responsible AI implementation"
        items={resources}
      />

      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
              Implementation Guides
            </h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Step-by-step guides covering technical, organizational, and community aspects of responsible AI
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((guide, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg border border-border hover:border-primary/50 transition-all bg-background"
                >
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                    {guide.category}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {guide.description}
                  </p>
                  <Button variant="secondary" size="sm" className="w-full">
                    Read Guide
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
              Access All Resources
            </h2>
            <p className="text-center text-muted-foreground text-lg mb-8">
              Members receive full access to our complete library of tools, templates, guides, and frameworks, plus regular updates as new resources are developed.
            </p>
            <div className="flex justify-center">
              <Button size="lg">Become a Member</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ToolsGuides;
