import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import heroImage1 from "@/assets/hero-ai-governance-network.jpg";
import heroImage2 from "@/assets/hero-ai-network.jpg";

interface HeroSlide {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage: string;
  badge?: string;
}

const HeroCarousel = () => {
  const slides: HeroSlide[] = [
    {
      title: "Building Trust in AI Through Standards & Certification",
      subtitle: "Nonprofit Organization",
      description: "The Responsible AI Institute advances trustworthy AI development through membership programs, certification pathways, and comprehensive resources aligned with global standards.",
      ctaText: "Become a Member",
      ctaLink: "/join",
      secondaryCtaText: "Explore RAISE Pathways",
      secondaryCtaLink: "/raise-pathways",
      backgroundImage: heroImage1,
    },
    {
      title: "How Genpact Builds Responsible AI",
      subtitle: "On-Demand Webinar",
      description: "Watch this on-demand session with Genpact's VP of AI/ML, Megha Sinha, for practical insights on building responsible AI into real-world systems.",
      ctaText: "Watch the Recording",
      ctaLink: "/case-studies",
      backgroundImage: heroImage2,
      badge: "Featured Webinar",
    },
    {
      title: "AI Maturity Assessment",
      subtitle: "Interactive Survey",
      description: "Take our 5-minute AI Maturity Assessment to benchmark your current efforts and get clear, actionable next steps.",
      ctaText: "Start the Assessment",
      ctaLink: "/ai-maturity-assessment",
      backgroundImage: heroImage1,
    },
    {
      title: "Responsible AI Handbook",
      subtitle: "Downloadable Guide",
      description: "Get a practical, enterprise-ready guide to building responsible AI. Includes governance frameworks, C-suite checklists, and a 5-stage maturity model aligned with global standards.",
      ctaText: "Get the Handbook",
      ctaLink: "/responsible-ai-handbook",
      backgroundImage: heroImage2,
      badge: "Free Resource",
    },
    {
      title: "AI Policy Template for Governance",
      subtitle: "Downloadable Template",
      description: "This template gives you a proven foundation to govern how AI is developed, bought, and used—aligned with ISO, NIST, and other leading frameworks.",
      ctaText: "Download the Template",
      ctaLink: "/ai-policy-template",
      backgroundImage: heroImage1,
      badge: "New Release",
    },
  ];

  return (
    <div className="relative">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative min-h-[600px] flex items-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.backgroundImage})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-navy-darker/95 via-navy-darker/85 to-navy-darker/60"></div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-6 relative z-10">
                  <div className="max-w-3xl animate-fade-in">
                    {slide.badge && (
                      <div className="inline-block mb-4 px-4 py-2 bg-primary/20 border border-primary/30 rounded-full text-primary text-sm font-medium backdrop-blur-sm">
                        {slide.badge}
                      </div>
                    )}
                    <p className="text-cobalt-light text-lg mb-4 font-medium">
                      {slide.subtitle}
                    </p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link to={slide.ctaLink}>
                        <Button size="lg" className="w-full sm:w-auto">
                          {slide.ctaText}
                        </Button>
                      </Link>
                      {slide.secondaryCtaText && slide.secondaryCtaLink && (
                        <Link to={slide.secondaryCtaLink}>
                          <Button size="lg" variant="outline" className="w-full sm:w-auto">
                            {slide.secondaryCtaText}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                {/* Slide Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                  {slides.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        idx === index ? "w-8 bg-primary" : "w-4 bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation Buttons */}
        <CarouselPrevious className="left-4 md:left-8" />
        <CarouselNext className="right-4 md:right-8" />
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
