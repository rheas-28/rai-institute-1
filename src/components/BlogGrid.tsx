import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import blogEuAiAct from "@/assets/blog-eu-ai-act.jpg";
import blogTransparentAi from "@/assets/blog-transparent-ai.jpg";
import blogRiskManagement from "@/assets/blog-risk-management.jpg";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  link: string;
}

const BlogGrid = () => {
  const posts: BlogPost[] = [
    {
      title: "New EU AI Act Compliance Requirements for 2025",
      excerpt: "Understanding the latest regulatory changes and how they impact your AI governance strategy.",
      date: "2025-01-15",
      image: blogEuAiAct,
      link: "/news",
    },
    {
      title: "ISO 42001 Certification: A Complete Guide",
      excerpt: "Step-by-step walkthrough of the ISO 42001 certification process and key requirements.",
      date: "2025-01-10",
      image: blogTransparentAi,
      link: "/news",
    },
    {
      title: "Building Ethical AI Teams: Best Practices",
      excerpt: "How leading organizations are structuring their teams to ensure responsible AI development.",
      date: "2025-01-05",
      image: blogRiskManagement,
      link: "/news",
    },
  ];

  return (
    <section className="py-20 bg-muted/30 border-y border-border/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cta-primary/5 via-transparent to-transparent"></div>
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Latest Insights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest trends, regulations, and best practices in responsible AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {posts.map((post, index) => (
            <Card
              key={index}
              className="group hover:shadow-elegant transition-all duration-300 border-border/50 hover:border-primary/50 overflow-hidden animate-fadeUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="link" className="px-0 group-hover:text-primary">
                  <Link to={post.link}>
                    Read More →
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fadeIn">
          <Button asChild variant="outline" size="lg">
            <Link to="/news">View All Insights</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;
