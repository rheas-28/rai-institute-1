import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Shield, Heart, Eye, Scale } from "lucide-react";

const AICodeOfConduct = () => {
  const principles = [
    {
      icon: Users,
      title: "Human-Centered",
      description: "AI systems must prioritize human wellbeing and dignity in all applications"
    },
    {
      icon: Shield,
      title: "Safety & Security",
      description: "Implement robust safeguards to protect users and data from harm"
    },
    {
      icon: Scale,
      title: "Fairness & Equity",
      description: "Ensure AI systems are free from bias and promote equal treatment"
    },
    {
      icon: Eye,
      title: "Transparency",
      description: "Maintain clear documentation and explainability in AI decision-making"
    },
    {
      icon: Heart,
      title: "Accountability",
      description: "Establish clear responsibility and governance for AI systems"
    },
    {
      icon: FileText,
      title: "Privacy",
      description: "Protect personal data and respect user privacy rights"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-navy-darker to-background">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Unified AI Code of Conduct
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Industry-standard guidelines and ethical principles for responsible AI development, deployment, and governance
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg">
                  Download Full Code
                </Button>
                <Button size="lg" variant="outline">
                  Sign the Pledge
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Core Principles */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
                Core Principles
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {principles.map((principle, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <principle.icon className="w-12 h-12 text-primary mb-4" />
                      <CardTitle>{principle.title}</CardTitle>
                      <CardDescription>{principle.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Guidelines */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
                Implementation Framework
              </h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Design Phase</CardTitle>
                    <CardDescription>
                      Embed ethical considerations from the earliest stages of AI system design
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 mt-2" />
                        Conduct stakeholder impact assessments
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 mt-2" />
                        Define clear ethical requirements and constraints
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 mt-2" />
                        Establish governance structures and accountability
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Development Phase</CardTitle>
                    <CardDescription>
                      Maintain ethical standards throughout the development lifecycle
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 mt-2" />
                        Implement bias testing and mitigation protocols
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 mt-2" />
                        Document all decision-making processes
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 mt-2" />
                        Conduct regular ethical audits
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Deployment Phase</CardTitle>
                    <CardDescription>
                      Monitor and maintain ethical standards in production environments
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 mt-2" />
                        Establish continuous monitoring systems
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 mt-2" />
                        Create channels for stakeholder feedback
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 mt-2" />
                        Implement incident response procedures
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Signatories */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Join Leading Organizations
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Over 500 organizations have committed to the Unified AI Code of Conduct
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 opacity-60">
                <div className="flex items-center justify-center h-16 bg-secondary/50 rounded-lg">
                  <span className="text-sm font-medium">Company Logo</span>
                </div>
                <div className="flex items-center justify-center h-16 bg-secondary/50 rounded-lg">
                  <span className="text-sm font-medium">Company Logo</span>
                </div>
                <div className="flex items-center justify-center h-16 bg-secondary/50 rounded-lg">
                  <span className="text-sm font-medium">Company Logo</span>
                </div>
                <div className="flex items-center justify-center h-16 bg-secondary/50 rounded-lg">
                  <span className="text-sm font-medium">Company Logo</span>
                </div>
              </div>
              <Button size="lg">
                Add Your Organization
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Commit to Responsible AI
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Download the full code of conduct and join the movement for ethical AI
              </p>
              <Button size="lg">
                Download & Sign
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AICodeOfConduct;
