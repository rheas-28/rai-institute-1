import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Link } from "react-router-dom";
import resourceHandbook from "@/assets/resource-handbook.jpg";
import resourceFramework from "@/assets/resource-framework.jpg";
import resourceChecklist from "@/assets/resource-checklist.jpg";
import resourceToolkit from "@/assets/resource-toolkit.jpg";

interface Resource {
  title: string;
  description: string;
  type: string;
  pages?: number;
  image: string;
}

const ResourceHub = () => {
  const resources: Resource[] = [
    {
      title: "Responsible AI Handbook",
      description: "Comprehensive guide to implementing trustworthy AI systems in your organization.",
      type: "PDF Guide",
      pages: 145,
      image: resourceHandbook,
    },
    {
      title: "RAISE Certification Framework",
      description: "Complete framework documentation and assessment criteria for RAISE pathways.",
      type: "Framework Document",
      pages: 89,
      image: resourceFramework,
    },
    {
      title: "Compliance Checklist Template",
      description: "Ready-to-use templates for ISO 42001, NIST AI RMF, and EU AI Act compliance.",
      type: "Excel Template",
      image: resourceChecklist,
    },
    {
      title: "AI Risk Assessment Toolkit",
      description: "Tools and methodologies for identifying and mitigating AI-related risks.",
      type: "Toolkit Bundle",
      pages: 67,
      image: resourceToolkit,
    },
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Resource Hub
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Download practical tools, frameworks, and guides to accelerate your responsible AI journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <Card
              key={index}
              className="group hover:shadow-elegant transition-all duration-300 border-border/50 hover:border-primary/50 animate-fadeUp overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <Download className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {resource.title}
                </CardTitle>
                <CardDescription className="text-sm">
                  {resource.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-muted-foreground font-medium">
                    {resource.type}
                  </span>
                  {resource.pages && (
                    <span className="text-xs text-muted-foreground">
                      {resource.pages} pages
                    </span>
                  )}
                </div>
                <Button asChild variant="outline" size="sm" className="w-full group-hover:border-primary group-hover:text-primary">
                  <Link to="/tools-guides">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fadeIn">
          <Button asChild size="lg">
            <Link to="/tools-guides">Browse All Resources</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ResourceHub;
