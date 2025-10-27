import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CardGrid from "@/components/CardGrid";
import Footer from "@/components/Footer";
import { Target, Heart, Globe, Lightbulb } from "lucide-react";
import teamImage from "@/assets/team-collaboration.jpg";

const WhoWeAre = () => {
  const values = [
    {
      title: "Standards-Driven",
      description: "We align with international standards and frameworks to ensure consistency and reliability in AI governance.",
      icon: Target,
    },
    {
      title: "Community-Focused",
      description: "Our nonprofit mission centers on building an inclusive community of practitioners and organizations.",
      icon: Heart,
    },
    {
      title: "Global Impact",
      description: "We work across borders to advance responsible AI practices that benefit all of humanity.",
      icon: Globe,
    },
    {
      title: "Innovation in Governance",
      description: "We develop cutting-edge tools and methodologies to make AI governance practical and achievable.",
      icon: Lightbulb,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <Hero
        title="About the Responsible AI Institute"
        description="We are a nonprofit organization dedicated to advancing trustworthy AI through standards-aligned certification, comprehensive resources, and a global community of practice."
        backgroundImage={teamImage}
      />

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-8 text-lg text-muted-foreground">
            <div className="animate-fade-up">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
              <p>
                The Responsible AI Institute exists to accelerate the development and deployment of trustworthy artificial intelligence systems. We provide organizations with the frameworks, certification pathways, and community support needed to build AI that is safe, fair, transparent, and accountable.
              </p>
            </div>

            <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-3xl font-bold text-foreground mb-4">What We Do</h2>
              <p className="mb-4">
                Through our RAISE (Responsible AI Standards & Evaluation) Pathways, we offer structured certification programs that align with global AI governance standards including ISO, NIST, EU AI Act, and emerging frameworks worldwide.
              </p>
              <p>
                Our comprehensive toolkit includes risk assessment frameworks, bias detection tools, transparency reporting templates, and governance playbooks—all designed to make responsible AI implementation practical and achievable for organizations of all sizes.
              </p>
            </div>

            <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Approach</h2>
              <p>
                We believe responsible AI is not just about compliance—it's about building systems that earn and maintain public trust. Our approach combines rigorous technical standards with practical implementation guidance, supported by a vibrant community of AI practitioners, researchers, policymakers, and civil society representatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CardGrid
        title="Our Core Values"
        description="The principles that guide our work and community"
        items={values}
        columns={2}
      />

      <section className="py-20 bg-card relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center animate-fade-up">Leadership Team</h2>
            <p className="text-center text-muted-foreground mb-12 text-lg animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Our team brings together decades of experience in AI research, policy, industry implementation, and nonprofit leadership.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  name: "Dr. Sarah Chen",
                  title: "Executive Director",
                  bio: "Former AI Policy Director at leading tech consortium, PhD in Computer Science from Stanford.",
                },
                {
                  name: "Michael Rodriguez",
                  title: "Chief Standards Officer",
                  bio: "20+ years in standards development, previously with ISO and IEEE AI committees.",
                },
                {
                  name: "Dr. Aisha Patel",
                  title: "Director of Research",
                  bio: "AI ethics researcher, author of influential papers on algorithmic fairness and accountability.",
                },
                {
                  name: "James Thompson",
                  title: "Director of Member Services",
                  bio: "Nonprofit leadership experience, focused on building inclusive communities of practice.",
                },
              ].map((person, index) => (
                <div 
                  key={index} 
                  className="p-6 rounded-lg bg-secondary/30 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 animate-fade-up group"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{person.name}</h3>
                  <p className="text-primary text-sm font-medium mb-3">{person.title}</p>
                  <p className="text-muted-foreground text-sm">{person.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WhoWeAre;
