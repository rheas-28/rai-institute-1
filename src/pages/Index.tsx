import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HeroCarousel from "@/components/HeroCarousel";
import CardGrid from "@/components/CardGrid";
import LogoWall from "@/components/LogoWall";
import Footer from "@/components/Footer";
import EventBanner from "@/components/EventBanner";
import FeaturedContent from "@/components/FeaturedContent";
import BlogGrid from "@/components/BlogGrid";
import ResourceHub from "@/components/ResourceHub";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import FloatingCTA from "@/components/FloatingCTA";
import { Shield, Scale, Globe, Rocket, Activity, Radar, Network, Users, Award, Lightbulb } from "lucide-react";
import FlipCard from "@/components/FlipCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-ai-governance-network.jpg";
import logoKPMG from "@/assets/logo-kpmg.webp";
import logoMastercard from "@/assets/logo-mastercard.webp";
import logoAMD from "@/assets/logo-amd.webp";
import logoDow from "@/assets/logo-dow.png";
import logoGenpact from "@/assets/logo-genpact.png";
import logoHCLTech from "@/assets/logo-hcltech.png";
import logoOneTrust from "@/assets/logo-onetrust.png";
import logoAlly from "@/assets/logo-ally.png";
import logoATB from "@/assets/logo-atb.webp";
import logoSuncor from "@/assets/logo-suncor.png";
import logoVFS from "@/assets/logo-vfs.png";
import logoArmilla from "@/assets/logo-armilla.webp";
const Index = () => {
  const features = [{
    title: "Governance & Compliance",
    description: "Structured frameworks aligned with global standards to ensure your AI systems meet regulatory requirements and ethical guidelines.",
    icon: Scale
  }, {
    title: "Risk & Assurance",
    description: "Comprehensive risk assessment and mitigation strategies to identify, monitor, and address AI-related vulnerabilities proactively.",
    icon: Shield
  }, {
    title: "Alignment to Global Standards",
    description: "Certification pathways that align with ISO, NIST, EU AI Act, and other international frameworks for trustworthy AI.",
    icon: Globe
  }, {
    title: "Enterprise Readiness",
    description: "Practical tools and methodologies to accelerate your organization's journey to deploying production-ready responsible AI systems.",
    icon: Rocket
  }];
  const logos = [logoKPMG, logoMastercard, logoAMD, logoDow, logoGenpact, logoHCLTech, logoOneTrust, logoAlly, logoATB, logoSuncor, logoVFS, logoArmilla];
  const membershipReasons = [
    {
      title: "Expert Community",
      description: "Connect with 500+ organizations and thought leaders advancing responsible AI practices globally.",
      icon: Users,
    },
    {
      title: "Industry Recognition",
      description: "Earn certifications and badges that demonstrate your commitment to trustworthy AI development.",
      icon: Award,
    },
    {
      title: "Practical Tools",
      description: "Access frameworks, templates, and AI agents that accelerate your responsible AI journey.",
      icon: Lightbulb,
    },
  ];

  return <div className="min-h-screen bg-background">
      <EventBanner />
      <Navigation />
      <FloatingCTA />
      
      <HeroCarousel />

      <LogoWall title="Trusted by Leading Organizations" logos={logos} />

      <CardGrid title="Why Choose Responsible AI Institute" description="We provide the frameworks, tools, and community support you need to implement responsible AI practices." items={features} />

      {/* Stats Section */}
      <section className="py-20 bg-muted/30 border-y border-border/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
        <div className="container mx-auto px-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-up" style={{
            animationDelay: '0.1s'
          }}>
              <div className="text-4xl md:text-5xl font-bold text-cobalt-light mb-2 hover:scale-110 transition-transform duration-300">500+</div>
              <div className="text-muted-foreground">Member Organizations</div>
            </div>
            <div className="animate-fade-up" style={{
            animationDelay: '0.2s'
          }}>
              <div className="text-4xl md:text-5xl font-bold text-cobalt-light mb-2 hover:scale-110 transition-transform duration-300">50+</div>
              <div className="text-muted-foreground">Countries Represented</div>
            </div>
            <div className="animate-fade-up" style={{
            animationDelay: '0.3s'
          }}>
              <div className="text-4xl md:text-5xl font-bold text-cobalt-light mb-2 hover:scale-110 transition-transform duration-300">1,200+</div>
              <div className="text-muted-foreground">Certified Systems</div>
            </div>
            <div className="animate-fade-up" style={{
            animationDelay: '0.4s'
          }}>
              <div className="text-4xl md:text-5xl font-bold text-cobalt-light mb-2 hover:scale-110 transition-transform duration-300">15+</div>
              <div className="text-muted-foreground">Standards Aligned</div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Agents Section */}
      <section className="py-20 bg-muted/30 border-y border-border/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our AI Agents</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Powered by advanced AI technology, our suite of agents helps organizations achieve and maintain responsible AI practices.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FlipCard title="MIRA" description="Diagnoses an organization's baseline maturity and readiness for Responsible AI practices." icon={<Activity className="w-12 h-12" />} />
              <FlipCard title="VERA" description="Independently verifies and validates Responsible AI compliance and integrity." icon={<Shield className="w-12 h-12" />} />
              <FlipCard title="WATCHTOWER AGENT" description="Aggregates, curates, and categorizes global news and updates related to Responsible AI, Sustainable AI, and AI Regulation, providing members with a trusted stream of high quality insights that inform readiness and verification." icon={<Radar className="w-12 h-12" />} />
              <FlipCard title="LINK AGENT" description="Connects members through the Responsible AI Hub ecosystem, driving collaboration, shared learning, and benchmarking across industries." icon={<Network className="w-12 h-12" />} />
            </div>
          </div>
        </div>
      </section>

      <BlogGrid />

      <ResourceHub />

      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-cobalt-light/5 to-primary/5 relative overflow-hidden border-t border-border/20">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,118,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[gradient_15s_ease_infinite]"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Ready to Build Trustworthy AI?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join our community of organizations committed to responsible AI development and get started today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-cta-primary hover:bg-cta-hover text-cta-primary-foreground font-semibold shadow-cta"
                data-cta-location="bottom-primary"
              >
                <Link to="/join">Explore Membership Options</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/join" data-cta-location="bottom-secondary">Schedule a Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />

      <Footer />
    </div>;
};
export default Index;