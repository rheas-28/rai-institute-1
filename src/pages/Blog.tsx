import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";
import newsImage from "@/assets/news-updates.jpg";

const Blog = () => {
  const [activeTab, setActiveTab] = useState("all");
  const blogPosts = [
    {
      title: "FROM POLICY TO PRACTICE: Responsible AI Institute Announces Bold Strategic Shift",
      date: "2025-02-19",
      category: "Strategy",
      excerpt: "The Responsible AI Institute is pivoting from policy development to practical implementation, focusing on helping organizations operationalize responsible AI through tools, training, and certification programs.",
    },
    {
      title: "AI Governance in Transition: Shifting from the Biden to Trump Administration",
      date: "2025-01-20",
      category: "Policy",
      excerpt: "Examining the implications of the presidential transition on AI governance frameworks, regulatory approaches, and industry priorities for responsible AI development.",
    },
    {
      title: "Introducing the RAISE Certification Program",
      date: "2024-11-15",
      category: "Tools",
      excerpt: "Announcing our new RAISE (Responsible AI Standard for Excellence) certification program, providing organizations with a clear pathway to demonstrate commitment to responsible AI practices.",
    },
    {
      title: "Building Trust Through Transparency: AI Documentation Best Practices",
      date: "2024-10-08",
      category: "Research",
      excerpt: "Exploring how comprehensive documentation and model cards can build stakeholder trust and improve AI system accountability across the development lifecycle.",
    },
    {
      title: "Responsible AI in Healthcare: Lessons from Early Adopters",
      date: "2024-09-22",
      category: "Community",
      excerpt: "Healthcare organizations share their experiences implementing responsible AI frameworks, from algorithmic fairness testing to clinical validation processes.",
    },
    {
      title: "The EU AI Act: What Organizations Need to Know",
      date: "2024-08-14",
      category: "Policy",
      excerpt: "A comprehensive guide to understanding the EU AI Act's requirements, risk classifications, and compliance timelines for organizations deploying AI systems in Europe.",
    },
    {
      title: "Bias Detection and Mitigation: New Tools and Techniques",
      date: "2024-07-05",
      category: "Tools",
      excerpt: "Review of emerging techniques and toolkits for identifying and addressing algorithmic bias across different types of AI systems and use cases.",
    },
    {
      title: "Global AI Governance Summit 2024: Key Takeaways",
      date: "2024-06-18",
      category: "Events",
      excerpt: "Highlights from our annual summit featuring discussions on international AI standards, cross-sector collaboration, and the future of AI governance.",
    },
    {
      title: "Building Responsible AI Teams: Skills and Competencies",
      date: "2023-12-10",
      category: "Community",
      excerpt: "Identifying the critical skills, roles, and organizational structures needed to successfully implement and maintain responsible AI practices.",
    },
    {
      title: "Risk Management Frameworks for AI Systems",
      date: "2023-11-03",
      category: "Research",
      excerpt: "Comparing different AI risk management frameworks and methodologies, including NIST, ISO, and sector-specific approaches to AI governance.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <Hero
        title="Blogs & Insights"
        description="Explore insights, best practices, and thought leadership on responsible AI governance, implementation, and emerging trends."
        backgroundImage={newsImage}
      />

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-7 mb-8">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="strategy">Strategy</TabsTrigger>
                <TabsTrigger value="policy">Policy</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
                <TabsTrigger value="research">Research</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="space-y-6">
                {blogPosts
                  .filter(item => activeTab === "all" || item.category.toLowerCase() === activeTab)
                  .map((item, index) => (
              <Card
                key={index}
                className="bg-card border-border hover:border-primary/50 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(item.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <CardTitle className="text-foreground">{item.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {item.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <button className="text-primary hover:text-cobalt-light transition-colors text-sm font-medium">
                    Read more →
                  </button>
                </CardContent>
              </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Stay Updated</h2>
            <p className="text-lg text-muted-foreground">
              Subscribe to our newsletter for monthly blog updates, insights, and responsible AI best practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="your.email@example.com"
                className="flex-1 px-4 py-3 rounded-md bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
