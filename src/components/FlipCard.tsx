import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface FlipCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

const FlipCard = ({ title, description, icon }: FlipCardProps) => {
  return (
    <div className="flip-card h-64 perspective-1000">
      <div className="flip-card-inner relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d]">
        {/* Front */}
        <div className="flip-card-front absolute w-full h-full bg-card border rounded-lg shadow-sm flex flex-col items-center justify-center p-6 [backface-visibility:hidden]">
          {icon && <div className="mb-4 text-primary">{icon}</div>}
          <h3 className="text-xl font-bold text-center">{title}</h3>
        </div>
        
        {/* Back */}
        <div className="flip-card-back absolute w-full h-full bg-secondary text-secondary-foreground border rounded-lg shadow-sm flex flex-col items-start justify-center p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-sm text-left mb-4">{description}</p>
          <Button variant="outline" size="sm" className="self-start">
            Know More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
