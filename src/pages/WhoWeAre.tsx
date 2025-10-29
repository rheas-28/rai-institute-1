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
import aurelieJacquet from "@/assets/team-aurelie-jacquet.jpeg";
import vilmosLorincz from "@/assets/team-vilmos-lorincz.webp";
import deborahLeff from "@/assets/team-deborah-leff.webp";
import sueWilliams from "@/assets/team-sue-williams.webp";
import mohanReddy from "@/assets/team-mohan-reddy.webp";
import alexWoodruff from "@/assets/team-alex-woodruff.webp";
import jeffreyRoy from "@/assets/team-jeffrey-roy.webp";
import graemeAuld from "@/assets/team-graeme-auld.webp";
import michaelGolub from "@/assets/team-michael-golub.jpg";
import veronicaRotemberg from "@/assets/team-veronica-rotemberg.webp";
import arunaKolluru from "@/assets/team-aruna-kolluru.webp";
import brandieNonnecke from "@/assets/team-brandie-nonnecke.webp";
import juliaStoyanovich from "@/assets/team-julia-stoyanovich.webp";
import matissaHollister from "@/assets/team-matissa-hollister.webp";
import barbaraCosgrove from "@/assets/team-barbara-cosgrove.webp";
import craigShank from "@/assets/team-craig-shank.webp";
import karenSilverman from "@/assets/team-karen-silverman.webp";
import nanditaSampath from "@/assets/team-nandita-sampath.webp";
import brentMittelstadt from "@/assets/team-brent-mittelstadt.webp";
import timVincent from "@/assets/team-tim-vincent.webp";
import kasiaChmielinski from "@/assets/team-kasia-chmielinski.webp";
import cameronDavies from "@/assets/team-cameron-davies.webp";
import rajeevRonanki from "@/assets/team-rajeev-ronanki.webp";
import markRolston from "@/assets/team-mark-rolston.webp";
import cathyCobey from "@/assets/team-cathy-cobey.webp";
import bhattVadlamani from "@/assets/team-bhatt-vadlamani.webp";
import doreenLorenzo from "@/assets/team-doreen-lorenzo.webp";
import surajMadnani from "@/assets/team-suraj-madnani.webp";
import saimaShafiq from "@/assets/team-saima-shafiq.jpeg";
import ashleyCasovan from "@/assets/team-ashley-casovan.jpeg";

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
                <div className="grid md:grid-cols-4 gap-6">
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
                    {
                      name: "Aurelie Jacquet",
                      title: "Chair of Standards Committee, International Standards on AI",
                      image: aurelieJacquet,
                    },
                    {
                      name: "Vilmos Lorincz",
                      title: "Managing Director, Data and Digital Products, Commercial Bank, Lloyds Banking Group",
                      image: vilmosLorincz,
                    },
                    {
                      name: "Deborah Leff",
                      title: "Board Member, Recruiter.com",
                      image: deborahLeff,
                    },
                    {
                      name: "Sue Williams",
                      title: "Managing Director, Hexagon Consultants",
                      image: sueWilliams,
                    },
                    {
                      name: "Mohan Reddy",
                      title: "Co-Founder & CTO, SkyHive",
                      image: mohanReddy,
                    },
                    {
                      name: "Alex Woodruff",
                      title: "Global Accounts, Fiddler AI",
                      image: alexWoodruff,
                    },
                    {
                      name: "Jeffrey Roy",
                      title: "Professor, Dalhousie University School of Public Administration",
                      image: jeffreyRoy,
                    },
                    {
                      name: "Graeme Auld",
                      title: "Professor, School of Public Policy and Administration, Carleton University",
                      image: graemeAuld,
                    },
                    {
                      name: "Michael Golub",
                      title: "Director of AI Ethics and Compliance, Merck",
                      image: michaelGolub,
                    },
                    {
                      name: "Veronica Rotemberg",
                      title: "Dermatologist, Memorial Sloan Kettering Cancer Center",
                      image: veronicaRotemberg,
                    },
                    {
                      name: "Aruna Kolluru",
                      title: "Chief Technologist, AI, Dell Technologies",
                      image: arunaKolluru,
                    },
                    {
                      name: "Brandie Nonnecke",
                      title: "Founding Director, CITRIS Policy Lab, UC Berkeley",
                      image: brandieNonnecke,
                    },
                    {
                      name: "Julia Stoyanovich",
                      title: "Associate Professor, NYU Tandon School of Engineering, New York University",
                      image: juliaStoyanovich,
                    },
                    {
                      name: "Matissa Hollister",
                      title: "Assistant Professor of Organizational Behaviour, McGill University",
                      image: matissaHollister,
                    },
                    {
                      name: "Barbara Cosgrove",
                      title: "VP, Chief Privacy Officer, Workday",
                      image: barbaraCosgrove,
                    },
                    {
                      name: "Craig Shank",
                      title: "Senior Leader & Strategist: Artificial Intelligence and Emerging Tech Ethics",
                      image: craigShank,
                    },
                    {
                      name: "Karen Silverman",
                      title: "CEO & Founder, The Cantellus Group",
                      image: karenSilverman,
                    },
                    {
                      name: "Nandita Sampath",
                      title: "AI Policy Analyst, Consumer Reports",
                      image: nanditaSampath,
                    },
                    {
                      name: "Brent Mittelstadt",
                      title: "Director of Research, Associate Professor, and Senior Research Fellow, Oxford Internet Institute, University of Oxford",
                      image: brentMittelstadt,
                    },
                    {
                      name: "Tim Vincent",
                      title: "Retired IBM Fellow & CTO of Data and Analytics, IBM",
                      image: timVincent,
                    },
                    {
                      name: "Kasia Chmielinski",
                      title: "Co-Founder, Data Nutrition Project",
                      image: kasiaChmielinski,
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
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      name: "Cameron Davies",
                      title: "Chief Data Officer, Yum! Brands",
                      image: cameronDavies,
                    },
                    {
                      name: "Rajeev Ronanki",
                      title: "CEO, Lyric",
                      image: rajeevRonanki,
                    },
                    {
                      name: "Mark Rolston",
                      title: "Founder & Chief Creative, argodesign",
                      image: markRolston,
                    },
                    {
                      name: "Cathy Cobey",
                      title: "Global Trusted AI Leader, EY",
                      image: cathyCobey,
                    },
                    {
                      name: "Dr. Bhatt Vadlamani",
                      title: "VP & Chief Technology Advisor to COO, Jackson Financial",
                      image: bhattVadlamani,
                    },
                    {
                      name: "Doreen Lorenzo",
                      title: "Assistant Dean, School of Design and Creative Technology, University of Texas at Austin",
                      image: doreenLorenzo,
                    },
                    {
                      name: "Suraj Madnani",
                      title: "VP & Chief Product Owner, Risk Management and Product Development, American Express",
                      image: surajMadnani,
                    },
                    {
                      name: "Saima Shafiq",
                      title: "SVP, Head of Applied AI Transformation, PNC Bank",
                      image: saimaShafiq,
                    },
                    {
                      name: "Ashley Casovan",
                      title: "Managing Director, AI Governance Centre, IAPP",
                      image: ashleyCasovan,
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
            </Tabs>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WhoWeAre;
