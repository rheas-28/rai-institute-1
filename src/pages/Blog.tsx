import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen, Users, Lightbulb, FileText, Video, Presentation, Globe, MessageSquare, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import newsImage from "@/assets/news-updates.jpg";
import Newsletter from "@/components/Newsletter";

const Blog = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const featuredInsights = [
    {
      title: "The State of AI Governance 2025: From Policy to Practice",
      date: "2025-02-19",
      category: "Research",
      excerpt: "Our comprehensive analysis reveals how organizations are transitioning from theoretical AI governance frameworks to practical implementation. This report examines 500+ organizations across industries.",
      readTime: "12 min read",
      type: "Report",
    },
    {
      title: "Building Trust Through AI Transparency",
      date: "2025-02-10",
      category: "Best Practices",
      excerpt: "Explore proven strategies for implementing transparent AI systems that build stakeholder confidence while maintaining competitive advantage.",
      readTime: "8 min read",
      type: "Article",
    },
    {
      title: "Navigating the EU AI Act: A Practical Guide",
      date: "2025-01-25",
      category: "Policy",
      excerpt: "Essential guidance for organizations deploying AI systems in Europe, including compliance timelines, risk assessments, and implementation strategies.",
      readTime: "15 min read",
      type: "Guide",
    },
  ];
  
  const blogPosts = [
    {
      title: "FROM POLICY TO PRACTICE: Responsible AI Institute Announces Bold Strategic Shift",
      date: "2025-02-19",
      category: "Strategy",
      excerpt: "The Responsible AI Institute is pivoting from policy development to practical implementation, focusing on helping organizations operationalize responsible AI through tools, training, and certification programs.",
      readTime: "5 min read",
    },
    {
      title: "AI Governance in Transition: Shifting from the Biden to Trump Administration",
      date: "2025-01-20",
      category: "Policy",
      excerpt: "Examining the implications of the presidential transition on AI governance frameworks, regulatory approaches, and industry priorities for responsible AI development.",
      readTime: "7 min read",
    },
    {
      title: "Introducing the RAISE Certification Program",
      date: "2024-11-15",
      category: "Tools",
      excerpt: "Announcing our new RAISE (Responsible AI Standard for Excellence) certification program, providing organizations with a clear pathway to demonstrate commitment to responsible AI practices.",
      readTime: "6 min read",
    },
    {
      title: "Building Trust Through Transparency: AI Documentation Best Practices",
      date: "2024-10-08",
      category: "Research",
      excerpt: "Exploring how comprehensive documentation and model cards can build stakeholder trust and improve AI system accountability across the development lifecycle.",
      readTime: "10 min read",
    },
    {
      title: "Responsible AI in Healthcare: Lessons from Early Adopters",
      date: "2024-09-22",
      category: "Community",
      excerpt: "Healthcare organizations share their experiences implementing responsible AI frameworks, from algorithmic fairness testing to clinical validation processes.",
      readTime: "8 min read",
    },
    {
      title: "The EU AI Act: What Organizations Need to Know",
      date: "2024-08-14",
      category: "Policy",
      excerpt: "A comprehensive guide to understanding the EU AI Act's requirements, risk classifications, and compliance timelines for organizations deploying AI systems in Europe.",
      readTime: "12 min read",
    },
    {
      title: "Bias Detection and Mitigation: New Tools and Techniques",
      date: "2024-07-05",
      category: "Tools",
      excerpt: "Review of emerging techniques and toolkits for identifying and addressing algorithmic bias across different types of AI systems and use cases.",
      readTime: "9 min read",
    },
    {
      title: "Global AI Governance Summit 2024: Key Takeaways",
      date: "2024-06-18",
      category: "Events",
      excerpt: "Highlights from our annual summit featuring discussions on international AI standards, cross-sector collaboration, and the future of AI governance.",
      readTime: "6 min read",
    },
    {
      title: "Building Responsible AI Teams: Skills and Competencies",
      date: "2023-12-10",
      category: "Community",
      excerpt: "Identifying the critical skills, roles, and organizational structures needed to successfully implement and maintain responsible AI practices.",
      readTime: "11 min read",
    },
    {
      title: "Risk Management Frameworks for AI Systems",
      date: "2023-11-03",
      category: "Research",
      excerpt: "Comparing different AI risk management frameworks and methodologies, including NIST, ISO, and sector-specific approaches to AI governance.",
      readTime: "13 min read",
    },
  ];

  const resources = [
    {
      title: "AI Governance Framework Toolkit",
      description: "Comprehensive templates and guidelines for establishing AI governance in your organization.",
      icon: FileText,
      type: "Download",
    },
    {
      title: "Webinar Series: Implementing Responsible AI",
      description: "Monthly webinars featuring industry experts sharing practical implementation strategies.",
      icon: Video,
      type: "Watch",
    },
    {
      title: "Community Forum",
      description: "Connect with peers, share experiences, and get answers from our global community.",
      icon: Users,
      type: "Join",
    },
    {
      title: "Case Study Library",
      description: "Real-world examples of organizations successfully implementing responsible AI practices.",
      icon: BookOpen,
      type: "Read",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <Hero
        title="Shaping the Global Conversation on Responsible AI"
        description="Our thought leadership program is built for impact. We share practical, data-driven insights that help organizations meet regulatory demands, implement governance frameworks, and demonstrate responsible AI practices. Members gain opportunities to amplify their own expertise alongside the RAI Institute."
        backgroundImage={newsImage}
      />

      {/* Webinars and Live Sessions */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block p-3 rounded-lg bg-primary/10 mb-4">
                  <Video className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Webinars and Live Sessions with Industry Experts
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  We host webinars and live sessions covering critical developments in responsible AI — from emerging regulations to practical governance strategies. These sessions feature RAI Institute experts, regulators, and industry leaders.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">Participate in panel discussions</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">Share case studies from their organizations</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">Co-host sessions on emerging topics</p>
                  </div>
                </div>
                <Button asChild>
                  <a href="https://www.linkedin.com/company/responsible-ai-institute/events/" target="_blank" rel="noopener noreferrer">
                    View Upcoming Events
                  </a>
                </Button>
              </div>
              <div className="relative">
                <img 
                  src="https://www.responsible.ai/wp-content/uploads/2025/08/thought-leadership-1-1.jpg" 
                  alt="Webinar session" 
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conferences and Executive Roundtables */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="grid grid-cols-2 gap-4">
                  <img 
                    src="https://www.responsible.ai/wp-content/uploads/2025/08/Thought-Leadership-4.jpg" 
                    alt="Conference" 
                    className="rounded-lg shadow-md"
                  />
                  <img 
                    src="https://www.responsible.ai/wp-content/uploads/2025/08/Thought-Leadership-1.jpg" 
                    alt="Executive roundtable" 
                    className="rounded-lg shadow-md"
                  />
                  <img 
                    src="https://www.responsible.ai/wp-content/uploads/2025/08/Thought-Leadership-3.jpg" 
                    alt="Event" 
                    className="rounded-lg shadow-md"
                  />
                  <img 
                    src="https://www.responsible.ai/wp-content/uploads/2025/08/Thought-Leadership-4.jpg" 
                    alt="Summit" 
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="inline-block p-3 rounded-lg bg-primary/10 mb-4">
                  <Presentation className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Conferences and Executive Roundtables
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  From global AI summits to specialized industry gatherings, the RAI Institute plays a visible role in shaping policy and practice.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">Speaking at major events</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">Leading closed-door executive roundtables</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">Representing their industry in cross-sector forums</p>
                  </div>
                </div>
                <Button asChild>
                  <a href="https://www.linkedin.com/company/responsible-ai-institute/events/" target="_blank" rel="noopener noreferrer">
                    View Upcoming Events
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles, Research, and Co-Created Resources */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Articles, Research, and Co-Created Resources</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                The RAI Institute publishes practical guidance, research briefs, and frameworks that help organizations strengthen AI governance. Many of these are created with direct input from members, giving them a platform to share expertise and shape resources used across industries.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {featuredInsights.map((insight, index) => (
                <Card key={index} className="bg-card border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {insight.type}
                      </span>
                      <span className="text-xs text-muted-foreground">{insight.readTime}</span>
                    </div>
                    <CardTitle className="text-foreground text-xl">{insight.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(insight.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground mb-4">
                      {insight.excerpt}
                    </CardDescription>
                    <button className="text-primary hover:text-cobalt-light transition-colors text-sm font-medium">
                      Read full article →
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Latest Articles & Updates</h2>
              <p className="text-lg text-muted-foreground">
                Stay informed with our latest insights on AI governance, policy, and best practices
              </p>
            </div>
            
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
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-4">
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
                    <span className="text-sm text-muted-foreground">{item.readTime}</span>
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

      {/* Spotlighting Member Contributions */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block p-3 rounded-lg bg-primary/10 mb-4">
                <Youtube className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Spotlighting Member Contributions</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                For years, the RAI Institute has partnered with members to share their expertise through our video series on YouTube, featuring leaders from organizations like Shell, Paramount, TD Bank, and more.
              </p>
            </div>
            
            <div className="bg-secondary/20 rounded-lg p-8 mb-8">
              <p className="text-muted-foreground text-center mb-6">
                We're now expanding this work through <strong className="text-foreground">ROI of RAI</strong>, a live LinkedIn series where members take the mic to discuss how they're putting responsible AI into practice. Each session explores real-world strategies—from scaling governance frameworks to building "Green AI" programs—so peers can learn what works in complex enterprise environments.
              </p>
              <p className="text-muted-foreground text-center">
                This evolving platform offers members a public stage to share case studies, debate industry shifts, and connect their expertise with a global audience.
              </p>
            </div>

            <div className="text-center">
              <Button asChild size="lg">
                <a href="https://www.youtube.com/@ResponsibleAIInstitute/videos" target="_blank" rel="noopener noreferrer">
                  Watch Our Video Series
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities to Share Your Expertise */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-cobalt-light/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Opportunities to Share Your Expertise
            </h2>
            <p className="text-lg text-muted-foreground">
              Whether you're a researcher, compliance leader, or AI executive, the RAI Institute provides the platform and reach to share your insights with a global audience.
            </p>
            <p className="text-muted-foreground">
              Our team works with members to match expertise with the right opportunities — and ensure your voice is part of the conversation shaping the future of AI.
            </p>
            <Button asChild size="lg">
              <Link to="/join#form">Explore Member Opportunities</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />

      <Footer />
    </div>
  );
};

export default Blog;
