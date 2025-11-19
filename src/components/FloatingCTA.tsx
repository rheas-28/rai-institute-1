import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show after scrolling 50vh, hide when near footer (last 100vh)
      const showThreshold = windowHeight * 0.5;
      const hideThreshold = documentHeight - (windowHeight * 2);
      
      if (!isDismissed && scrollPosition > showThreshold && scrollPosition < hideThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-0 right-0 z-40 animate-slide-up">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-cta-primary to-warning rounded-xl shadow-cta p-4 flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-cta-primary-foreground font-semibold text-sm md:text-base">
              Ready to build trustworthy AI? Join our community today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="secondary"
              size="sm"
              className="bg-white hover:bg-white/90 text-cta-primary font-semibold"
              data-cta-location="floating-bar"
            >
              <Link to="/join">Become a Member</Link>
            </Button>
            <button
              onClick={handleDismiss}
              className="text-cta-primary-foreground/80 hover:text-cta-primary-foreground transition-colors p-1"
              aria-label="Dismiss"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingCTA;
