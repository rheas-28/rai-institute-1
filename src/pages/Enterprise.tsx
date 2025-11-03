import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LogoWall from "@/components/LogoWall";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import enterpriseImage from "@/assets/tools-frameworks.jpg";
import thoughtLeadershipImage from "@/assets/featured-webinar.jpg";
import heroImage from "@/assets/hero-ai-governance-network.jpg";

// Import logos
import logoAlly from "@/assets/logo-ally.png";
import logoAmd from "@/assets/logo-amd.webp";
import logoArmilla from "@/assets/logo-armilla.webp";
import logoAtb from "@/assets/logo-atb.webp";
import logoDow from "@/assets/logo-dow.png";
import logoGenpact from "@/assets/logo-genpact.png";
import logoHcltech from "@/assets/logo-hcltech.png";
import logoKpmg from "@/assets/logo-kpmg.webp";
import logoMastercard from "@/assets/logo-mastercard.webp";
import logoOnetrust from "@/assets/logo-onetrust.png";
import logoSuncor from "@/assets/logo-suncor.png";
import logoVfs from "@/assets/logo-vfs.png";

const Enterprise = () => {
  const logos = [
    logoSuncor,
    logoVfs,
    logoArmilla,
    logoKpmg,
    logoDow,
    logoAmd,
    logoAtb,
    logoAlly,
    logoHcltech,
    logoGenpact,
    logoMastercard,
    logoOnetrust,
  ];

  const challenges = [
    "Complex, evolving AI regulations across jurisdictions.",
    "Verifying responsible AI practices across multi-vendor ecosystems.",
    "Bridging the gap between governance frameworks and real-world implementation.",
    "Proving compliance readiness to regulators, investors, and customers.",
  ];

  const caseStudyOutcomes = [
    "Recognized by regulators for transparent governance.",
    "Cut AI operational costs significantly.",
    "Reduced carbon intensity through carbon-aware computing.",
  ];

  const engagementOpportunities = [
    "Executive roundtables at leading industry conferences.",
    "Public thought leadership through co-authored articles, LinkedIn Live discussions, and speaking engagements.",
    "Shaping best practices in working groups alongside peers and policymakers.",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <Hero
        title="Supporting Enterprise Leaders in Responsible AI"
        description=""
        backgroundImage={heroImage}
      />

      <main className="flex-grow">
        {/* Meeting Demands Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Meeting the Demands of Responsible AI at Scale</h2>
              <p className="text-xl text-muted-foreground">
                Enterprise AI teams face growing regulatory pressure, higher stakeholder expectations, and the challenge of scaling governance across complex systems.
              </p>
              <p className="text-xl text-muted-foreground mt-4">
                The RAI Institute works with senior leaders to strengthen oversight, align with recognized standards, and exchange practical strategies with peers across industries.
              </p>
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">Addressing the Challenges Enterprises Face</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {challenges.map((challenge, index) => (
                  <div key={index} className="bg-card rounded-lg p-6 shadow-sm border">
                    <p className="text-lg">{challenge}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AI Inventories Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Read AI Inventories: Practical Challenges for Organizational Risk Management
              </h2>
              <Button size="lg" asChild>
                <a href="https://www.responsible.ai/chevron-and-responsible-ai-institute-release-guide-on-ai-inventories-and-risk-management/" target="_blank" rel="noopener noreferrer">
                  Read More
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* How We Work Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <h2 className="text-4xl font-bold mb-6">How the RAI Institute Works with Enterprises</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Our programs, assessments, and expert network give enterprise leaders clarity on governance and confidence in compliance. We bring together practitioners from finance, healthcare, energy, and technology to share tested approaches that reduce risk while enabling innovation.
                </p>
                <Button size="lg" asChild>
                  <a href="/community">See How We Collaborate With Industry Leaders</a>
                </Button>
              </div>
              <div>
                <img
                  src={enterpriseImage}
                  alt="Enterprise collaboration"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>

            <div className="mt-16">
              <LogoWall logos={logos} />
            </div>
          </div>
        </section>

        {/* Case Study Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-center">Proof Through Real-World Impact</h2>
              <div className="bg-card rounded-lg p-8 shadow-sm border">
                <p className="text-lg mb-6">
                  A leading UK bank partnered with the RAI Institute to independently verify its Generative AI system through the RAISE Pathways.
                </p>
                <p className="text-lg mb-6">
                  The bank earned three credentials, strengthening governance, reducing costs, and improving environmental performance — while gaining recognition as an industry leader in responsible AI.
                </p>
                <h3 className="text-xl font-semibold mb-4">Key Outcomes:</h3>
                <ul className="space-y-3 mb-8">
                  {caseStudyOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">Insights from Enterprise Leaders</h2>
              <div className="bg-card rounded-lg p-8 shadow-sm border">
                <blockquote className="text-lg italic mb-4">
                  "Booz Allen Hamilton's partnership with the Responsible AI Institute allows us to develop state-of-the-art Responsible AI offerings which are backed by a diverse community of member expertise, deep technical and policy knowledge, and a collaborative environment for developing best practices."
                </blockquote>
                <p className="font-semibold">— Geoff Schaefer, Head of Responsible AI, Booz Allen Hamilton</p>
              </div>
            </div>
          </div>
        </section>

        {/* Engagement Opportunities Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <img
                  src={thoughtLeadershipImage}
                  alt="Thought leadership opportunities"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-6">Opportunities for Enterprise Engagement</h2>
                <p className="text-lg text-muted-foreground mb-6">Enterprise members take part in:</p>
                <ul className="space-y-4 mb-8">
                  {engagementOpportunities.map((opportunity, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-3">•</span>
                      <span>{opportunity}</span>
                    </li>
                  ))}
                </ul>
                <Button size="lg" asChild>
                  <a href="/news">Explore Thought Leadership Opportunities</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">
                Explore if RAI Institute Is Right for Your Organization
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                We work with enterprises at different stages of AI governance maturity — from those building first policies to those seeking independent verification of advanced systems.
              </p>
              <p className="text-xl text-muted-foreground mb-8">
                If you're looking for an independent, globally recognized partner to strengthen your AI governance and connect you with leaders solving the same challenges, we invite you to learn more.
              </p>
              <Button size="lg" asChild>
                <a href="/join">Request More Information</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Enterprise;
