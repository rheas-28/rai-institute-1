import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, BookOpen, Video } from "lucide-react";

const RAISEPathwaysAssets = () => {
  const assetCategories = [
    {
      title: "Documentation Templates",
      icon: FileText,
      items: [
        "Model Card Templates",
        "Risk Assessment Forms",
        "Audit Documentation",
        "Compliance Checklists"
      ]
    },
    {
      title: "Training Materials",
      icon: BookOpen,
      items: [
        "Onboarding Guides",
        "Best Practice Handbooks",
        "Case Study Library",
        "Policy Templates"
      ]
    },
    {
      title: "Video Resources",
      icon: Video,
      items: [
        "Certification Tutorials",
        "Implementation Walkthroughs",
        "Expert Interviews",
        "Webinar Recordings"
      ]
    },
    {
      title: "Downloadable Tools",
      icon: Download,
      items: [
        "Assessment Frameworks",
        "Governance Toolkits",
        "Reporting Templates",
        "Integration Guides"
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
                RAISE Pathways Assets
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Comprehensive collection of resources, templates, and tools to support your responsible AI certification journey
              </p>
              <Button size="lg">
                Access All Assets
              </Button>
            </div>
          </div>
        </section>

        {/* Asset Categories */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
                Available Resources
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {assetCategories.map((category, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <category.icon className="w-12 h-12 text-primary mb-4" />
                      <CardTitle>{category.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {category.items.map((item, idx) => (
                          <li key={idx} className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{item}</span>
                            <Button size="sm" variant="ghost">
                              <Download className="w-4 h-4" />
                            </Button>
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

        {/* Certification Tracks */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
                Certification Tracks
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle>Foundation</CardTitle>
                    <CardDescription>Essential knowledge and tools for getting started</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-2">20+ Assets</div>
                      <Button className="w-full mt-4">View Track</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle>Advanced</CardTitle>
                    <CardDescription>In-depth resources for experienced practitioners</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-2">35+ Assets</div>
                      <Button className="w-full mt-4">View Track</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle>Expert</CardTitle>
                    <CardDescription>Specialized tools for industry leaders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-2">50+ Assets</div>
                      <Button className="w-full mt-4">View Track</Button>
                    </div>
                  </CardContent>
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
                Start Your Certification Journey
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Access all RAISE Pathways assets and begin building responsible AI today
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

export default RAISEPathwaysAssets;
