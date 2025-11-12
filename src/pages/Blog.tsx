import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Lightbulb, FileText, Video, Presentation, Globe, MessageSquare, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import newsImage from "@/assets/news-updates.jpg";
import Newsletter from "@/components/Newsletter";
import FlipCard from "@/components/FlipCard";
import { Activity, Shield, Radar, Network } from "lucide-react";

const Blog = () => {
  const featuredInsights = [
    {
      title: "Leaders in Responsible AI: A Member's Story",
      date: "2025-07-01",
      category: "Community",
      excerpt: "Megha Sinha, Genpact - Vice President AI/ML. As a seasoned Technology and AI leader, I serve as a catalyst for driving AI innovation and responsible practices across the organization.",
      image: "https://www.responsible.ai/wp-content/uploads/2025/07/Megha-Sinha.jpg",
    },
    {
      title: "Top 4 AI Governance Best Practices from Leading Companies",
      date: "2025-03-01",
      category: "Best Practices",
      excerpt: "The pressure to build and deploy AI responsibly is no longer theoretical. Regulatory mandates are taking shape in the U.S., EU, Canada, and globally. Public scrutiny is mounting.",
      image: "https://www.responsible.ai/wp-content/uploads/2025/03/RAII-47-Blog-Post-Image-Option-2.jpg",
    },
    {
      title: "Leaders in Responsible AI: A Member's Story",
      date: "2025-03-01",
      category: "Community",
      excerpt: "Ally Financial - Home to the nation's largest all-digital bank, we're building the future of banking. As the world shifts toward more personalized experiences, banking is transforming too.",
      image: "https://www.responsible.ai/wp-content/uploads/2025/03/TechTeamPhoto-scaled.jpg",
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

      {/* AI Agents Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our AI Agents</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Powered by advanced AI technology, our suite of agents helps organizations achieve and maintain responsible AI practices.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FlipCard 
                title="MIRA"
                description="Diagnoses an organization's baseline maturity and readiness for Responsible AI practices."
                icon={<Activity className="w-12 h-12" />}
              />
              <FlipCard 
                title="VERA"
                description="Independently verifies and validates Responsible AI compliance and integrity."
                icon={<Shield className="w-12 h-12" />}
              />
              <FlipCard 
                title="WATCHTOWER Agent"
                description="Aggregates, curates, and categorizes global news and updates related to Responsible AI, Sustainable AI, and AI Regulation, providing members with a trusted stream of high quality insights that inform readiness and verification."
                icon={<Radar className="w-12 h-12" />}
              />
              <FlipCard 
                title="LINK Agent"
                description="Connects members through the Responsible AI Hub ecosystem, driving collaboration, shared learning, and benchmarking across industries."
                icon={<Network className="w-12 h-12" />}
              />
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
                <Card key={index} className="bg-card border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  {insight.image && (
                    <div className="aspect-video w-full overflow-hidden">
                      <img 
                        src={insight.image} 
                        alt={insight.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium w-fit mb-2">
                      {insight.category}
                    </span>
                    <CardTitle className="text-foreground text-xl">{insight.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground mb-4">
                      {insight.excerpt}
                    </CardDescription>
                    <button className="text-primary hover:text-cobalt-light transition-colors text-sm font-medium">
                      Read More →
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg">
                <Link to="/news">Read More</Link>
              </Button>
            </div>
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

            {/* Featured Video */}
            <div className="mb-12 max-w-4xl mx-auto">
              <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/EydBSUuGRMU"
                  title="Empowering Communities in AI Development with Vilas Dhar | Responsible AI Report | EP 15"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
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
