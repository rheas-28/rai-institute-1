import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Video, Users, Play } from "lucide-react";

const EventsArchive = () => {
  const events = [
    {
      title: "AI Governance Summit 2024",
      date: "March 15, 2024",
      type: "Conference",
      duration: "Full Day",
      attendees: "500+",
      description: "Industry-leading conference on AI governance frameworks and best practices",
      topics: ["Governance", "Compliance", "Risk Management"]
    },
    {
      title: "Implementing RAI Controls Workshop",
      date: "February 28, 2024",
      type: "Workshop",
      duration: "3 hours",
      attendees: "200+",
      description: "Hands-on workshop for implementing responsible AI controls in your organization",
      topics: ["Controls", "Implementation", "Best Practices"]
    },
    {
      title: "Ethics in AI: A Panel Discussion",
      date: "January 20, 2024",
      type: "Webinar",
      duration: "90 min",
      attendees: "1000+",
      description: "Expert panel discussing ethical considerations in AI development and deployment",
      topics: ["Ethics", "AI Development", "Stakeholder Impact"]
    },
    {
      title: "RAISE Certification Deep Dive",
      date: "January 10, 2024",
      type: "Training",
      duration: "2 hours",
      attendees: "150+",
      description: "Comprehensive overview of RAISE certification pathways and requirements",
      topics: ["Certification", "Pathways", "Requirements"]
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
                Events & Webinars Archive
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Access recordings, presentations, and resources from past RAISE events and webinars
              </p>
              <Button size="lg">
                View Upcoming Events
              </Button>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto flex flex-wrap gap-4 justify-center">
              <Button variant="outline">All Events</Button>
              <Button variant="outline">Webinars</Button>
              <Button variant="outline">Workshops</Button>
              <Button variant="outline">Conferences</Button>
              <Button variant="outline">Training</Button>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {events.map((event, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="secondary">{event.type}</Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </div>
                      </div>
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <CardDescription>{event.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Video className="w-4 h-4" />
                            {event.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {event.attendees}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {event.topics.map((topic, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                        <div className="pt-4 flex gap-2">
                          <Button className="flex-1">
                            <Play className="w-4 h-4 mr-2" />
                            Watch Recording
                          </Button>
                          <Button variant="outline">
                            Resources
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
                Our Impact
              </h2>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">50+</div>
                  <div className="text-muted-foreground">Events Hosted</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                  <div className="text-muted-foreground">Total Attendees</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">100+</div>
                  <div className="text-muted-foreground">Expert Speakers</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">30+</div>
                  <div className="text-muted-foreground">Hours Content</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Stay Updated on Upcoming Events
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Subscribe to receive notifications about new webinars, workshops, and conferences
              </p>
              <div className="flex gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-md border border-border bg-background text-foreground"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EventsArchive;
