import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CardGrid from "@/components/CardGrid";
import LogoWall from "@/components/LogoWall";
import Footer from "@/components/Footer";
import { Shield, Award, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-ai-network.jpg";

const Index = () => {
  const features = [
    {
      title: "Standards-Aligned Certification",
      description:
        "RAISE Pathways provide structured certification for AI systems aligned with global standards and best practices.",
      icon: Award,
    },
    {
      title: "Comprehensive Resources",
      description:
        "Access tools, guides, and frameworks designed to help organizations build trustworthy AI at every stage.",
      icon: BookOpen,
    },
    {
      title: "Community & Membership",
      description:
        "Join a global network of AI practitioners, researchers, and organizations committed to responsible AI development.",
      icon: Users,
    },
    {
      title: "Risk Management",
      description:
        "Implement proven methodologies for identifying, assessing, and mitigating AI-related risks in your organization.",
      icon: Shield,
    },
  ];

  const logos = [
    "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=200&h=100&fit=crop",
    "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&h=100&fit=crop",
    "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=200&h=100&fit=crop",
    "https://images.unsplash.com/photo-1614729939124-032a4e3a50f1?w=200&h=100&fit=crop",
    "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=200&h=100&fit=crop",
    "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=200&h=100&fit=crop",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <Hero
        subtitle="Nonprofit Organization"
        title="Building Trust in AI Through Standards & Certification"
        description="The Responsible AI Institute advances trustworthy AI development through membership programs, certification pathways, and comprehensive resources aligned with global standards."
        ctaText="Become a Member"
        ctaLink="/join"
        secondaryCtaText="Explore RAISE Pathways"
        secondaryCtaLink="/raise-pathways"
        backgroundImage={heroImage}
      />

      <LogoWall title="Trusted by Leading Organizations" logos={logos} />

      <CardGrid
        title="Why Choose Responsible AI Institute"
        description="We provide the frameworks, tools, and community support you need to implement responsible AI practices."
        items={features}
      />

      {/* Stats Section */}
      <section className="py-20 bg-navy-darker">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Member Organizations</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Countries Represented</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">1,200+</div>
              <div className="text-muted-foreground">Certified Systems</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">15+</div>
              <div className="text-muted-foreground">Standards Aligned</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-cobalt-light/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Ready to Build Trustworthy AI?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join our community of organizations committed to responsible AI development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg">
                <Link to="/join">Become a Member</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link to="/raise-pathways">Learn About RAISE</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
