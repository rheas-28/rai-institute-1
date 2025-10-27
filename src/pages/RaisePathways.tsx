import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CardGrid from "@/components/CardGrid";
import Footer from "@/components/Footer";
import { CheckCircle, FileCheck, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const RaisePathways = () => {
  const pathways = [
    {
      title: "Foundation Pathway",
      description: "Essential responsible AI practices for teams starting their journey. Covers core principles, risk identification, and basic governance frameworks.",
      icon: CheckCircle,
    },
    {
      title: "Advanced Pathway",
      description: "Comprehensive certification for mature AI programs. Includes advanced risk management, bias mitigation, and transparency reporting.",
      icon: FileCheck,
    },
    {
      title: "Domain-Specific Pathways",
      description: "Specialized certifications for healthcare, finance, public sector, and other regulated industries with unique AI requirements.",
      icon: Shield,
    },
    {
      title: "Executive Pathway",
      description: "Strategic certification for organizational leaders responsible for AI governance, policy, and enterprise-wide implementation.",
      icon: Award,
    },
  ];

  const benefits = [
    "Demonstrate compliance with global AI standards (ISO, NIST, EU AI Act)",
    "Build stakeholder trust through third-party verification",
    "Access exclusive tools, templates, and assessment frameworks",
    "Join a community of certified practitioners",
    "Receive ongoing updates as standards evolve",
    "Showcase certification with official badges and certificates",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <Hero
        subtitle="Certification Programs"
        title="RAISE Pathways: Standards-Aligned AI Certification"
        description="Structured certification programs that help organizations build, deploy, and maintain trustworthy AI systems aligned with global standards."
        ctaText="Start Your Certification"
        ctaLink="/join"
      />

      <CardGrid
        title="Certification Pathways"
        description="Choose the pathway that matches your organization's AI maturity and industry requirements"
        items={pathways}
      />

      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
              How RAISE Certification Works
            </h2>
            
            <div className="space-y-8 mt-12">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Assessment</h3>
                  <p className="text-muted-foreground">
                    Complete a comprehensive self-assessment using our standards-aligned evaluation framework. Identify gaps and prioritize improvements.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Implementation</h3>
                  <p className="text-muted-foreground">
                    Access our toolkit of resources, templates, and guides to address identified gaps. Get support from our community and expert advisors.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Verification</h3>
                  <p className="text-muted-foreground">
                    Submit evidence and documentation for independent review. Our assessors evaluate your AI systems against certification criteria.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Certification</h3>
                  <p className="text-muted-foreground">
                    Receive official RAISE certification, badges, and certificates. Maintain certification through annual reviews and continuous improvement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
              Certification Benefits
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary/10 to-cobalt-light/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Ready to Get Certified?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join hundreds of organizations building trustworthy AI through RAISE certification.
            </p>
            <Button asChild size="lg">
              <Link to="/join">Start Your Journey</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RaisePathways;
