import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CardGrid from "@/components/CardGrid";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, Heart, Globe, Lightbulb } from "lucide-react";
import teamImage from "@/assets/team-collaboration.jpg";
import manojSaxena from "@/assets/team-manoj-saxena.jpg";
import alkaPatel from "@/assets/team-alka-patel.jpg";
import mattSanchez from "@/assets/team-matt-sanchez.png";
import joydeepGhosh from "@/assets/team-joydeep-ghosh.jpg";
import michaelStewart from "@/assets/team-michael-stewart.png";
import umangBhatt from "@/assets/team-umang-bhatt.jpeg";
import johnTang from "@/assets/team-john-tang.webp";
import stevenKelts from "@/assets/team-steven-kelts.webp";

const WhoWeAre = () => {
  const values = [
    {
      title: "Standards-Driven",
      description: "We align with international standards and frameworks to ensure consistency and reliability in AI governance.",
      icon: Target,
    },
    {
      title: "Community-Focused",
      description: "Our nonprofit mission centers on building an inclusive community of practitioners and organizations.",
      icon: Heart,
    },
    {
      title: "Global Impact",
      description: "We work across borders to advance responsible AI practices that benefit all of humanity.",
      icon: Globe,
    },
    {
      title: "Innovation in Governance",
      description: "We develop cutting-edge tools and methodologies to make AI governance practical and achievable.",
      icon: Lightbulb,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <Hero
        title="About the Responsible AI Institute"
        description="We are a nonprofit organization dedicated to advancing trustworthy AI through standards-aligned certification, comprehensive resources, and a global community of practice."
        backgroundImage={teamImage}
      />

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-8 text-lg text-muted-foreground">
            <div className="animate-fade-up">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
              <p>
                The Responsible AI Institute exists to accelerate the development and deployment of trustworthy artificial intelligence systems. We provide organizations with the frameworks, certification pathways, and community support needed to build AI that is safe, fair, transparent, and accountable.
              </p>
            </div>

            <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-3xl font-bold text-foreground mb-4">What We Do</h2>
              <p className="mb-4">
                Through our RAISE (Responsible AI Standards & Evaluation) Pathways, we offer structured certification programs that align with global AI governance standards including ISO, NIST, EU AI Act, and emerging frameworks worldwide.
              </p>
              <p>
                Our comprehensive toolkit includes risk assessment frameworks, bias detection tools, transparency reporting templates, and governance playbooks—all designed to make responsible AI implementation practical and achievable for organizations of all sizes.
              </p>
            </div>

            <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Approach</h2>
              <p>
                We believe responsible AI is not just about compliance—it's about building systems that earn and maintain public trust. Our approach combines rigorous technical standards with practical implementation guidance, supported by a vibrant community of AI practitioners, researchers, policymakers, and civil society representatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CardGrid
        title="Our Core Values"
        description="The principles that guide our work and community"
        items={values}
        columns={2}
      />

      <section className="py-20 bg-card relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center animate-fade-up">Meet Our Team</h2>
            <p className="text-center text-muted-foreground mb-16 text-lg animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Our leaders, staff, board members and advisors all share a profound care for and understanding of responsible AI. They know that responsible AI matters and that it has serious implications for businesses, governments and society.
            </p>
            
            <Tabs defaultValue="board" className="w-full">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12">
                <TabsTrigger value="board">Board Members</TabsTrigger>
                <TabsTrigger value="expert-advisors">Expert Advisors</TabsTrigger>
                <TabsTrigger value="advisors">Advisors</TabsTrigger>
              </TabsList>

              {/* Board Members Tab */}
              <TabsContent value="board" className="animate-fade-up">
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      name: "Manoj Saxena",
                      title: "Chairman and Founder",
                      image: manojSaxena,
                    },
                    {
                      name: "Alka Patel",
                      title: "VP, Government & External Affairs, COMCAST",
                      image: alkaPatel,
                    },
                    {
                      name: "Matt Sanchez",
                      title: "Vice President, Chief Technology Officer, Digital Labor, IBM",
                      image: mattSanchez,
                    },
                    {
                      name: "Dr. Joydeep Ghosh",
                      title: "Professor, Cockrell School of Engineering, University of Texas at Austin",
                      image: joydeepGhosh,
                    },
                    {
                      name: "Michael E. Stewart",
                      title: "Founder, Chairman, & CEO, Lucid.AI",
                      image: michaelStewart,
                    },
                  ].map((person, index) => (
                    <div 
                      key={index} 
                      className="p-6 rounded-lg bg-secondary/30 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 group text-center"
                    >
                      <div className="mb-4 relative w-32 h-32 mx-auto rounded-full overflow-hidden">
                        <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                      </div>
                      <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{person.name}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{person.title}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Expert Advisors Tab */}
              <TabsContent value="expert-advisors" className="animate-fade-up">
                <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                  {[
                    {
                      name: "Umang Bhatt",
                      title: "Research Associate, The Alan Turing Institute",
                      image: umangBhatt,
                    },
                    {
                      name: "John Tang",
                      title: "Managing Director of Cerberus Technology Solutions",
                      image: johnTang,
                    },
                    {
                      name: "Steven Kelts",
                      title: "Lecturer on Ethics of AI at Princeton University",
                      image: stevenKelts,
                    },
                  ].map((person, index) => (
                    <div 
                      key={index} 
                      className="p-4 rounded-lg bg-secondary/20 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 group text-center"
                    >
                      <div className="mb-3 relative w-24 h-24 mx-auto rounded-full overflow-hidden">
                        <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                      </div>
                      <h4 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{person.name}</h4>
                      <p className="text-muted-foreground text-xs leading-relaxed">{person.title}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Advisors Tab */}
              <TabsContent value="advisors" className="animate-fade-up">
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg mb-6">
                    The Responsible AI Institute works with a diverse network of advisors from academia, industry, and civil society to advance trustworthy AI practices globally.
                  </p>
                  <div className="max-w-3xl mx-auto p-8 rounded-lg bg-secondary/20 border border-border">
                    <p className="text-foreground">
                      Our advisory network includes experts in AI ethics, policy, technology, and governance who contribute their insights and guidance to help shape responsible AI frameworks and standards worldwide.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WhoWeAre;
