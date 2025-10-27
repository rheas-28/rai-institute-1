import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, FileText, Users } from "lucide-react";
import { Link } from "react-router-dom";
import featuredWebinar from "@/assets/featured-webinar.jpg";
import featuredCaseStudy from "@/assets/featured-case-study.jpg";
import featuredWhitepaper from "@/assets/featured-whitepaper.jpg";

interface FeaturedItem {
  title: string;
  description: string;
  type: "webinar" | "whitepaper" | "case-study";
  image: string;
  link: string;
}

const FeaturedContent = () => {
  const featuredItems: FeaturedItem[] = [
    {
      title: "Building Trust in AI Systems",
      description: "On-demand webinar covering best practices for implementing trustworthy AI governance frameworks in enterprise environments.",
      type: "webinar",
      image: featuredWebinar,
      link: "/news",
    },
    {
      title: "Financial Services AI Case Study",
      description: "How leading banks implemented RAISE certification to meet regulatory requirements and build customer trust.",
      type: "case-study",
      image: featuredCaseStudy,
      link: "/news",
    },
    {
      title: "2025 AI Governance Framework",
      description: "Comprehensive guide to aligning your AI systems with ISO 42001, EU AI Act, and NIST AI RMF standards.",
      type: "whitepaper",
      image: featuredWhitepaper,
      link: "/tools-guides",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "webinar":
        return PlayCircle;
      case "whitepaper":
        return FileText;
      case "case-study":
        return Users;
      default:
        return FileText;
    }
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Resources
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our latest insights, case studies, and expert guidance on responsible AI implementation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredItems.map((item, index) => {
            const Icon = getIcon(item.type);
            return (
              <Card
                key={index}
                className="group hover:shadow-elegant transition-all duration-300 border-border/50 hover:border-primary/50 animate-fadeUp overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold uppercase flex items-center gap-1">
                    <Icon className="h-3 w-3" />
                    {item.type.replace("-", " ")}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full group-hover:border-primary group-hover:text-primary">
                    <Link to={item.link}>
                      {item.type === "webinar" ? "Watch Now" : "Learn More"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedContent;
