import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

const Careers = () => {
  const openings = [
    {
      title: "Senior Standards Development Manager",
      department: "Standards & Policy",
      location: "Remote (US)",
      type: "Full-time",
      description: "Lead development of new RAISE certification pathways and maintain alignment with evolving global AI standards.",
    },
    {
      title: "AI Risk Assessment Specialist",
      department: "Research & Tools",
      location: "San Francisco, CA or Remote",
      type: "Full-time",
      description: "Design and implement risk assessment frameworks for AI systems across various domains and industries.",
    },
    {
      title: "Member Success Manager",
      department: "Member Services",
      location: "Remote (US)",
      type: "Full-time",
      description: "Support organizational members through certification process, providing guidance and technical assistance.",
    },
    {
      title: "Technical Writer",
      department: "Communications",
      location: "Remote (Global)",
      type: "Contract",
      description: "Create clear, accessible documentation for technical frameworks, tools, and implementation guides.",
    },
  ];

  const values = [
    "Mission-driven work advancing responsible AI for social benefit",
    "Collaborative culture with diverse, expert team members",
    "Flexible remote work and work-life balance",
    "Competitive nonprofit compensation and benefits",
    "Professional development and conference attendance",
    "Impact on global AI governance standards",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <Hero
        title="Join Our Team"
        description="Help us build the future of trustworthy AI. We're looking for passionate individuals committed to responsible innovation."
      />

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Why Work With Us</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join a team shaping global standards for responsible AI development
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border"
                >
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
              Open Positions
            </h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              We're actively hiring for these roles
            </p>

            <div className="space-y-6">
              {openings.map((job, index) => (
                <Card
                  key={index}
                  className="bg-background border-border hover:border-primary/50 transition-all"
                >
                  <CardHeader>
                    <CardTitle className="text-foreground">{job.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {job.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        {job.department}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </div>
                    </div>
                    <Button variant="secondary">View Details & Apply</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Don't See Your Role?</h2>
            <p className="text-lg text-muted-foreground">
              We're always interested in hearing from talented individuals passionate about responsible AI. Send us your information and we'll keep you in mind for future openings.
            </p>
            <Button size="lg">Send General Application</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
