import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const News = () => {
  const newsItems = [
    {
      title: "New EU AI Act Compliance Pathway Launched",
      date: "2025-03-15",
      category: "Standards",
      excerpt: "We've launched a specialized RAISE pathway to help organizations demonstrate compliance with the EU AI Act requirements.",
    },
    {
      title: "500+ Organizations Now RAISE Certified",
      date: "2025-03-08",
      category: "Milestone",
      excerpt: "Celebrating a major milestone as our global community reaches 500 certified organizations across 50 countries.",
    },
    {
      title: "Bias Detection Toolkit 2.0 Released",
      date: "2025-02-28",
      category: "Tools",
      excerpt: "Major update to our bias detection toolkit includes new statistical methods and integration with popular ML frameworks.",
    },
    {
      title: "Partnership with Global Standards Body Announced",
      date: "2025-02-20",
      category: "Partnership",
      excerpt: "Formal collaboration with ISO to ensure RAISE certification aligns with emerging international AI governance standards.",
    },
    {
      title: "Healthcare AI Governance Report Published",
      date: "2025-02-12",
      category: "Research",
      excerpt: "New research report examines responsible AI implementation challenges and best practices in healthcare settings.",
    },
    {
      title: "Annual Member Summit Registration Opens",
      date: "2025-02-01",
      category: "Events",
      excerpt: "Join us for three days of workshops, case studies, and networking with responsible AI practitioners from around the world.",
    },
    {
      title: "Q4 2024 Transparency Report Released",
      date: "2025-01-15",
      category: "Transparency",
      excerpt: "Our quarterly report on certification activities, community growth, and organizational performance now available.",
    },
    {
      title: "New Board Members Appointed",
      date: "2025-01-05",
      category: "Organization",
      excerpt: "We welcome three distinguished experts to our Board of Directors, bringing expertise in policy, technology, and civil society.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <Hero
        title="Latest News & Updates"
        description="Stay informed about new certifications, partnerships, research, and developments in the responsible AI ecosystem."
      />

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {newsItems.map((item, index) => (
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
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Stay Updated</h2>
            <p className="text-lg text-muted-foreground">
              Subscribe to our newsletter for monthly updates on standards, tools, and responsible AI best practices.
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

export default News;
