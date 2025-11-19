import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, Award, CheckCircle, Shield } from "lucide-react";

const VerificationBadges = () => {
  const badges = [
    {
      level: "Foundation",
      icon: CheckCircle,
      color: "text-blue-500",
      description: "Entry-level verification for organizations beginning their responsible AI journey",
      criteria: ["Basic AI governance structure", "Initial risk assessment", "Documentation standards"]
    },
    {
      level: "Advanced",
      icon: Shield,
      color: "text-purple-500",
      description: "Intermediate verification for organizations with established AI practices",
      criteria: ["Comprehensive governance framework", "Regular audits", "Stakeholder engagement"]
    },
    {
      level: "Expert",
      icon: Award,
      color: "text-gold-500",
      description: "Premium verification for industry-leading responsible AI implementation",
      criteria: ["Industry-leading practices", "Continuous monitoring", "Third-party validation"]
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
              <Badge className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Responsible AI Verification Badges
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Industry-recognized certification and verification badges demonstrating your commitment to responsible AI practices
              </p>
              <Button size="lg">
                Apply for Verification
              </Button>
            </div>
          </div>
        </section>

        {/* Badge Levels */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
                Verification Levels
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {badges.map((badge, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <badge.icon className={`w-16 h-16 mx-auto mb-4 ${badge.color}`} />
                      <CardTitle className="text-2xl">{badge.level}</CardTitle>
                      <CardDescription className="text-base">{badge.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-semibold mb-3">Key Criteria:</h4>
                      <ul className="space-y-2">
                        {badge.criteria.map((criterion, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start">
                            <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            {criterion}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
                Benefits of Verification
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Build Trust</CardTitle>
                    <CardDescription>
                      Demonstrate your commitment to responsible AI to stakeholders and customers
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Industry Recognition</CardTitle>
                    <CardDescription>
                      Gain credibility with third-party verified responsible AI practices
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Competitive Advantage</CardTitle>
                    <CardDescription>
                      Stand out in the market with verified responsible AI credentials
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Regulatory Compliance</CardTitle>
                    <CardDescription>
                      Stay ahead of evolving AI regulations and compliance requirements
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Ready to Get Verified?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Start your verification journey and join leading organizations in responsible AI
              </p>
              <Button size="lg">
                Start Application
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default VerificationBadges;
