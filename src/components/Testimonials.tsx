import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo1 from "@/assets/logo-placeholder-1.png";
import logo2 from "@/assets/logo-placeholder-2.png";
import logo3 from "@/assets/logo-placeholder-3.png";

interface Testimonial {
  quote: string;
  author: string;
  title: string;
  company: string;
  logo: string;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      quote: "The RAISE certification process transformed how we approach AI governance. The frameworks are practical, comprehensive, and aligned with global standards.",
      author: "Sarah Chen",
      title: "Chief AI Officer",
      company: "Global Financial Services",
      logo: logo1,
    },
    {
      quote: "Joining the Responsible AI Institute gave us access to a community of experts and resources that accelerated our trustworthy AI implementation by months.",
      author: "Michael Rodriguez",
      title: "VP of Technology",
      company: "Healthcare Innovation Group",
      logo: logo2,
    },
    {
      quote: "The certification pathways provided clear guidance for meeting EU AI Act requirements. Our stakeholders now have confidence in our AI systems.",
      author: "Dr. Emily Thompson",
      title: "Director of Compliance",
      company: "Enterprise Tech Solutions",
      logo: logo3,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 8000);
    return () => clearInterval(interval);
  }, []);

  const current = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-cobalt-light/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,118,255,0.03)_50%,transparent_75%)] bg-[length:250%_250%] animate-[gradient_20s_ease_infinite]"></div>
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how organizations are building trust through responsible AI practices.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-border/50 shadow-elegant animate-fadeIn">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col items-center text-center">
                <Quote className="h-12 w-12 text-primary/30 mb-6" />
                
                <blockquote className="text-xl md:text-2xl text-foreground font-medium mb-8 leading-relaxed">
                  "{current.quote}"
                </blockquote>

                <div className="flex flex-col items-center gap-4">
                  <img
                    src={current.logo}
                    alt={current.company}
                    className="h-12 w-auto grayscale opacity-60"
                  />
                  <div>
                    <div className="font-semibold text-foreground text-lg">
                      {current.author}
                    </div>
                    <div className="text-muted-foreground">
                      {current.title}, {current.company}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-8">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevTestimonial}
                    className="hover:border-primary hover:text-primary"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === currentIndex
                            ? "w-8 bg-primary"
                            : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextTestimonial}
                    className="hover:border-primary hover:text-primary"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
