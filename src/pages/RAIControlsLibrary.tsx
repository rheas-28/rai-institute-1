import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Database, Lock, Eye, FileCheck, AlertTriangle } from "lucide-react";

const RAIControlsLibrary = () => {
  const controlCategories = [
    {
      icon: Shield,
      title: "Governance Controls",
      description: "Frameworks and policies for AI governance oversight",
      controls: ["AI Ethics Board", "Risk Management Framework", "Compliance Monitoring"]
    },
    {
      icon: Database,
      title: "Data Controls",
      description: "Data quality, privacy, and bias mitigation controls",
      controls: ["Data Quality Checks", "Privacy Protection", "Bias Detection"]
    },
    {
      icon: Lock,
      title: "Security Controls",
      description: "Security measures for AI systems and data protection",
      controls: ["Access Control", "Encryption Standards", "Threat Detection"]
    },
    {
      icon: Eye,
      title: "Monitoring Controls",
      description: "Continuous monitoring and performance tracking",
      controls: ["Model Monitoring", "Drift Detection", "Performance Metrics"]
    },
    {
      icon: FileCheck,
      title: "Documentation Controls",
      description: "Requirements for AI system documentation",
      controls: ["Model Cards", "Data Sheets", "Audit Trails"]
    },
    {
      icon: AlertTriangle,
      title: "Risk Controls",
      description: "Risk assessment and mitigation strategies",
      controls: ["Impact Assessment", "Risk Mitigation", "Incident Response"]
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
                RAI Controls Library
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Comprehensive collection of responsible AI controls, frameworks, and best practices to ensure ethical and compliant AI implementation
              </p>
              <Button size="lg">
                Download Controls Framework
              </Button>
            </div>
          </div>
        </section>

        {/* Control Categories */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
                Control Categories
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {controlCategories.map((category, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <category.icon className="w-12 h-12 text-primary mb-4" />
                      <CardTitle>{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {category.controls.map((control, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                            {control}
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

        {/* CTA Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Ready to Implement RAI Controls?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Access our complete controls library and implementation guides
              </p>
              <Button size="lg">
                Get Started
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default RAIControlsLibrary;
