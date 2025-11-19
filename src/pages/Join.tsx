import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CardGrid from "@/components/CardGrid";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import MembershipComparison from "@/components/MembershipComparison";
import { Check } from "lucide-react";
import communityImage from "@/assets/community-network.jpg";

const Join = () => {
  const membershipTiers = [
    {
      title: "Individual Membership",
      description: "For AI practitioners, researchers, and professionals seeking personal certification and community access.",
      content: (
        <div className="space-y-4">
          <div className="text-3xl font-bold text-foreground">$299/year</div>
          <ul className="space-y-3">
            {[
              "Access to all tools and guides",
              "Individual RAISE certification",
              "Community forum access",
              "Monthly webinars and workshops",
              "Digital certification badges",
            ].map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      title: "Organizational Membership",
      description: "For companies and institutions implementing responsible AI programs with team certification needs.",
      content: (
        <div className="space-y-4">
          <div className="text-3xl font-bold text-foreground">$2,999/year</div>
          <ul className="space-y-3">
            {[
              "Everything in Individual, plus:",
              "Up to 10 team certifications",
              "Custom implementation support",
              "Priority access to new tools",
              "Logo on member directory",
              "Annual review consultations",
            ].map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      title: "Enterprise Membership",
      description: "For large organizations requiring extensive certification programs and strategic advisory support.",
      content: (
        <div className="space-y-4">
          <div className="text-3xl font-bold text-foreground">Custom</div>
          <ul className="space-y-3">
            {[
              "Everything in Organizational, plus:",
              "Unlimited team certifications",
              "Dedicated account manager",
              "Custom framework development",
              "On-site training programs",
              "Executive briefings",
              "Strategic advisory services",
            ].map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <Hero
        title="Join Our Community"
        description="Become part of a global network of organizations and professionals committed to building trustworthy AI systems."
        backgroundImage={communityImage}
      />

      <CardGrid
        title="Membership Options"
        description="Choose the membership tier that fits your needs"
        items={membershipTiers}
      />

      {/* Membership Comparison Table */}
      <MembershipComparison />

      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
              Why Join?
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Build Credibility</h3>
                <p className="text-muted-foreground">
                  Demonstrate your commitment to responsible AI through recognized certification and membership in a trusted nonprofit organization.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Access Expertise</h3>
                <p className="text-muted-foreground">
                  Tap into our network of AI ethics experts, standards professionals, and experienced practitioners from around the world.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Stay Current</h3>
                <p className="text-muted-foreground">
                  Keep pace with evolving AI regulations and standards through continuous updates, training, and community learning.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Shape the Future</h3>
                <p className="text-muted-foreground">
                  Participate in working groups that influence the development of responsible AI standards and best practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />

      <Footer />
    </div>
  );
};

export default Join;
