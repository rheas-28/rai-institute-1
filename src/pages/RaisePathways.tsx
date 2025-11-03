import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CardGrid from "@/components/CardGrid";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { CheckCircle, FileCheck, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import certificationImage from "@/assets/certification-pathways.jpg";

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
        backgroundImage={certificationImage}
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
              How It Works
            </h2>
            
            <div className="space-y-8 mt-12">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Evaluate Your Organization</h3>
                  <p className="text-muted-foreground">
                    Evaluate your organization's AI governance implementation maturity using RAI Institute's self-guided platform with controls mapped to global frameworks (NIST AI RMF, ISO/IEC 42001, OWASP, etc.).
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Follow the RAISE Framework</h3>
                  <p className="text-muted-foreground">
                    Progress through structured verification across various badge types (Foundation, Trust, Sustainability, Cost Efficiency) tailored to your AI system type (ML/AI, GenAI, or Agentic AI).
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Earn Verified Credentials</h3>
                  <p className="text-muted-foreground">
                    Achieve badges at 70% implementation threshold, demonstrating commitment to responsible AI practices across governance, security, sustainability and cost domains.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Showcase on Registry</h3>
                  <p className="text-muted-foreground">
                    Display your verified achievements on the Responsible AI Registry, building stakeholder trust and demonstrating regulatory readiness.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">5</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Join RAI's 36,000+ Community</h3>
                  <p className="text-muted-foreground">
                    Connect with industry leaders, access 1,100+ AI controls spanning 17 standards, and participate in the vendor-agnostic ecosystem driving responsible AI governance since 2016.
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

      <section id="form" className="py-20 bg-secondary/20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Your AI Governance Journey Starts Here
              </h2>
              <p className="text-lg text-muted-foreground">
                Whether piloting an LLM or managing enterprise-scale AI, RAISE Pathways helps organizations take the next right step—with credibility, structure, and support.
              </p>
              <p className="text-muted-foreground mt-4">
                Fill out the form and we'll help:
              </p>
              <ul className="text-left text-muted-foreground mt-4 space-y-2 max-w-2xl mx-auto">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Identify the right starting point for your organization in RAISE Pathways</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Learn how our tools and badges align with your business goals</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Explore what membership unlocks at your stage of maturity</span>
                </li>
              </ul>
            </div>
            <ContactForm />
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
