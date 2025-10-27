import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const EventBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("eventBannerDismissed");
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("eventBannerDismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-primary via-cobalt to-primary-glow text-white py-3 px-6 relative overflow-hidden animate-slideDown">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-[gradient_15s_ease_infinite]"></div>
      <div className="container mx-auto flex items-center justify-between relative">
        <div className="flex-1 text-center">
          <span className="text-sm md:text-base font-medium">
            🎉 <strong>AI Governance Summit 2025</strong> – Register now and save 20% with code <code className="bg-white/20 px-2 py-1 rounded">RAISE2025</code>
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-white hover:bg-white/20 ml-4"
          onClick={handleDismiss}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default EventBanner;
