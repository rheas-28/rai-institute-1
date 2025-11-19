import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingUp, Users, CheckCircle } from "lucide-react";

const CaseStudies = () => {
  const caseStudies = [
    {
      company: "Global Financial Services",
      industry: "Banking & Finance",
      challenge: "Implementing fair lending AI while meeting regulatory compliance",
      solution: "Deployed comprehensive bias detection and RAISE verification framework",
      results: [
        "40% reduction in bias-related incidents",
        "100% regulatory compliance achieved",
        "Enhanced customer trust scores"
      ],
      badge: "Foundation Certified"
    },
    {
      company: "Healthcare Technology Leader",
      industry: "Healthcare",
      challenge: "Ensuring patient data privacy in AI-powered diagnostic systems",
      solution: "Implemented RAI controls library and continuous monitoring",
      results: [
        "Zero data privacy incidents",
        "30% improvement in diagnostic accuracy",
        "HIPAA compliance certification"
      ],
      badge: "Advanced Certified"
    },
    {
      company: "E-Commerce Platform",
      industry: "Retail Technology",
      challenge: "Transparent AI recommendations and personalization at scale",
      solution: "Integrated RAISE agents for real-time ethical monitoring",
      results: [
        "25% increase in customer satisfaction",
        "Transparent recommendation engine",
        "Industry-leading ethical AI practices"
      ],
      badge: "Expert Certified"
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
                Member Case Studies
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Real-world success stories from organizations implementing responsible AI practices with RAISE
              </p>
              <Button size="lg">
                Submit Your Story
              </Button>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto space-y-8">
              {caseStudies.map((study, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Building2 className="w-6 h-6 text-primary" />
                          <CardTitle className="text-2xl">{study.company}</CardTitle>
                        </div>
                        <CardDescription className="text-base">{study.industry}</CardDescription>
                      </div>
                      <Badge variant="secondary">{study.badge}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <Users className="w-5 h-5 text-primary" />
                          Challenge
                        </h4>
                        <p className="text-sm text-muted-foreground">{study.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-primary" />
                          Solution
                        </h4>
                        <p className="text-sm text-muted-foreground">{study.solution}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-primary" />
                          Results
                        </h4>
                        <ul className="space-y-2">
                          {study.results.map((result, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 mt-2 flex-shrink-0" />
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-border">
                      <Button variant="outline">Read Full Case Study</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
                Impact Across Industries
              </h2>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">100+</div>
                  <div className="text-muted-foreground">Case Studies</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">15+</div>
                  <div className="text-muted-foreground">Industries</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">85%</div>
                  <div className="text-muted-foreground">Success Rate</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">50+</div>
                  <div className="text-muted-foreground">Countries</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Share Your Success Story
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Help others learn from your responsible AI journey
              </p>
              <Button size="lg">
                Submit Case Study
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudies;
