import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LogoWall from "@/components/LogoWall";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, FolderOpen, CheckCircle } from "lucide-react";
import communityImage from "@/assets/community-network.jpg";
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

const Community = () => {
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

  const hubFeatures = [
    {
      icon: Users,
      title: "Member Directory",
      description: "Search and connect with leaders across 36,000+ members. Filter by industry, role, or geography.",
    },
    {
      icon: MessageSquare,
      title: "Private Messaging & Chat",
      description: "Engage directly with peers and experts through the built-in chat feature.",
    },
    {
      icon: FolderOpen,
      title: "Shared Resources",
      description: "Access exclusive member-only frameworks, guidelines, and toolkits.",
    },
  ];

  const whyJoinReasons = [
    "Direct line to peers tackling similar compliance and governance issues.",
    "Visibility into how other global enterprises are meeting new regulations.",
    "Opportunities to influence best practices and standards.",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <Hero
        title="A Community Built for Enterprise AI Leaders"
        description="The RAI Institute community brings together senior AI leaders, compliance experts, and technology executives from across industries. As a member, you gain direct access to a trusted network of practitioners committed to advancing responsible AI, helping you exchange ideas, solve challenges, and strengthen your AI governance practices."
        backgroundImage={heroImage}
        ctaText="Explore Membership Benefits"
        ctaLink="/join"
      />

      <main className="flex-grow">
        {/* RAI Hub Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">RAI Hub: Connect Anytime, Anywhere</h2>
              <p className="text-xl text-muted-foreground mb-8">
                RAI Hub is the central meeting point for members. Whether you're an enterprise team or an individual practitioner, you'll have:
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {hubFeatures.map((feature, index) => (
                <div key={index} className="bg-card rounded-lg p-8 shadow-sm border">
                  <feature.icon className="w-12 h-12 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Roundtables Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <h2 className="text-4xl font-bold mb-6">Exclusive Roundtables and Conference Meetups</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  We host member roundtables at leading AI and industry conferences. These small-group sessions give enterprise executives a private space to:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-primary mr-3">•</span>
                    <span>Compare real-world approaches to AI governance.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3">•</span>
                    <span>Discuss the latest regulatory developments.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3">•</span>
                    <span>Build strategic partnerships across industries.</span>
                  </li>
                </ul>
              </div>
              <div>
                <img
                  src={communityImage}
                  alt="Community roundtable discussion"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why Leaders Join Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">Why Leaders Join the RAI Institute Community</h2>
              <p className="text-xl text-muted-foreground mb-8">
                For executives, the community is more than networking—it's about access.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6 mb-16">
              {whyJoinReasons.map((reason, index) => (
                <div key={index} className="bg-card rounded-lg p-6 shadow-sm border flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-lg">{reason}</p>
                </div>
              ))}
            </div>

            <LogoWall logos={logos} />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">
                Be Part of the Conversation That Shapes Responsible AI
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Whether you're looking to strengthen compliance readiness, exchange implementation strategies, or build alliances with trusted AI leaders, the RAI Institute community offers the people and platform to make it happen.
              </p>
              <Button size="lg" asChild>
                <a href="/join">Join the RAI Institute Community</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Community;
