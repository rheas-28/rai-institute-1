import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, FileText } from "lucide-react";

const AIPolicyTemplate = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-b from-navy-darker via-navy-dark to-background overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Downloadable Template</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Use Our AI Policy Template to Get Started Fast
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Build your responsible AI policy with a proven framework aligned with global standards
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-foreground mb-6">Build Your Responsible AI Policy</h2>
              <p className="text-muted-foreground text-lg mb-8">
                The RAI Institute's AI Policy Template helps your organization set a strong foundation for how AI is developed, bought, and used.
              </p>

              <div className="grid md:grid-cols-2 gap-8 my-12">
                <div className="p-6 rounded-lg bg-card border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-4">With this template, you can:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Create clear AI policies based on ethics and risk management</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Align with key standards like ISO/IEC 42001 and the NIST AI Risk Management Framework</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Adapt the policy to your organization's needs and AI systems</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-lg bg-card border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-4">What's included:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Governance rules to ensure oversight</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Data practices for privacy, fairness, and transparency</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Risk processes to spot and reduce harms</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Project management guidance to keep AI use responsible</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Procurement and documentation tools to track requirements</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-secondary/20 border border-border rounded-lg p-8 my-12">
                <p className="text-foreground text-lg mb-6">
                  This template is built by the RAI Institute, backed by real-world experience and trusted practices.
                </p>
                <p className="text-xl font-semibold text-primary">
                  Start with a proven framework. Download the AI Policy Template.
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-foreground mb-6">Download the Template</h3>
              <Button size="lg" className="gap-2">
                <Download className="w-5 h-5" />
                Get the AI Policy Template
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Free for RAI Institute members and community
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIPolicyTemplate;
