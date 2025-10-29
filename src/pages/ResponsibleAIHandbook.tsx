import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, BookOpen } from "lucide-react";

const ResponsibleAIHandbook = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-b from-navy-darker via-navy-dark to-background overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Downloadable Guide</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Responsible AI Handbook
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              A practical, enterprise-ready guide to building responsible AI systems
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-6">Your Complete Guide to Responsible AI</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Get a practical, enterprise-ready guide to building responsible AI. Includes governance frameworks, C-suite checklists, and a 5-stage maturity model aligned with global standards.
              </p>
            </div>

            {/* What's Included */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="p-6 rounded-lg bg-card border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-4">Governance Frameworks</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Comprehensive governance structures for AI oversight</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Role definitions and responsibilities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Decision-making processes and escalation paths</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-lg bg-card border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-4">C-Suite Checklists</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Executive-level action items</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Board reporting templates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Strategic planning guidance</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-lg bg-card border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-4">5-Stage Maturity Model</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Self-assessment framework</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Roadmap for progression</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Benchmarking capabilities</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-lg bg-card border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-4">Global Standards Alignment</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>ISO/IEC 42001 mapping</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>NIST AI Risk Management Framework</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>EU AI Act considerations</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-secondary/20 border border-border rounded-lg p-8 mb-12">
              <h3 className="text-2xl font-bold text-foreground mb-6">What Makes This Handbook Different</h3>
              <div className="space-y-4">
                <p className="text-foreground">
                  <strong>Practical and Actionable:</strong> Every section includes real-world examples, templates, and step-by-step guidance you can implement immediately.
                </p>
                <p className="text-foreground">
                  <strong>Enterprise-Tested:</strong> Developed in collaboration with Fortune 500 companies and leading AI practitioners.
                </p>
                <p className="text-foreground">
                  <strong>Standards-Aligned:</strong> Built to help you meet international requirements while maintaining flexibility for your specific context.
                </p>
                <p className="text-foreground">
                  <strong>Nonprofit-Backed:</strong> Created by the RAI Institute with no commercial bias—just trusted, independent guidance.
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-foreground mb-6">Get the Handbook</h3>
              <Button size="lg" className="gap-2">
                <Download className="w-5 h-5" />
                Download the Responsible AI Handbook
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Free for RAI Institute members • Updated regularly with latest practices
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResponsibleAIHandbook;
