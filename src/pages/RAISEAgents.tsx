import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Zap, Shield, Eye } from "lucide-react";

const RAISEAgents = () => {
  const agents = [
    {
      name: "MIRA",
      subtitle: "Model Inspection & Risk Assessment",
      icon: Eye,
      description: "Automated model inspection and comprehensive risk assessment for AI systems",
      capabilities: [
        "Automated model validation",
        "Risk scoring and categorization",
        "Compliance checking",
        "Performance benchmarking"
      ]
    },
    {
      name: "VERA",
      subtitle: "Validation & Ethical Review Agent",
      icon: Shield,
      description: "Ethical review and validation framework for AI decision-making systems",
      capabilities: [
        "Ethical impact assessment",
        "Bias detection and mitigation",
        "Fairness validation",
        "Stakeholder impact analysis"
      ]
    },
    {
      name: "WATCHTOWER AGENT",
      subtitle: "Continuous Monitoring",
      icon: Bot,
      description: "Real-time monitoring and alerting for AI system performance and compliance",
      capabilities: [
        "24/7 system monitoring",
        "Drift detection",
        "Anomaly alerting",
        "Performance tracking"
      ]
    },
    {
      name: "LINK AGENT",
      subtitle: "Integration & Orchestration",
      icon: Zap,
      description: "Seamless integration and orchestration across AI governance workflows",
      capabilities: [
        "Workflow automation",
        "Cross-system integration",
        "Data pipeline management",
        "Report generation"
      ]
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
                RAISE Agents
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                AI-powered agents that automate and enhance responsible AI implementation, monitoring, and governance across your organization
              </p>
              <Button size="lg">
                Request Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Agents Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
                Our AI Agents
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {agents.map((agent, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-2">
                        <agent.icon className="w-12 h-12 text-primary" />
                        <div>
                          <CardTitle className="text-2xl">{agent.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{agent.subtitle}</p>
                        </div>
                      </div>
                      <CardDescription className="text-base">{agent.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-semibold mb-3">Key Capabilities:</h4>
                      <ul className="space-y-2">
                        {agent.capabilities.map((capability, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 mt-2 flex-shrink-0" />
                            {capability}
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
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Transform Your AI Governance
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                RAISE Agents work together to provide comprehensive, automated responsible AI governance
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">80%</div>
                  <div className="text-muted-foreground">Reduction in manual review time</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-muted-foreground">Continuous monitoring</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-muted-foreground">Compliance coverage</div>
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
                Ready to Deploy RAISE Agents?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Contact our team to learn how RAISE Agents can transform your AI governance
              </p>
              <Button size="lg">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default RAISEAgents;
