interface LogoWallProps {
  title?: string;
  logos: string[];
}

const LogoWall = ({ title, logos }: LogoWallProps) => {
  // Duplicate logos for infinite scroll effect
  const duplicatedLogos = [...logos, ...logos];
  
  return (
      <section className="py-16 bg-background border-t border-border/20">
        <div className="container mx-auto px-6">
          {title && (
            <h3 className="text-center text-muted-foreground text-sm font-semibold uppercase tracking-wider mb-8">
              {title}
            </h3>
          )}
          
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg overflow-hidden">
          <div className="flex gap-8 animate-scroll">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center flex-shrink-0 w-48 h-32 opacity-95 hover:opacity-100 transition-all duration-500 grayscale-0 hover:scale-110"
              >
                <img
                  src={logo}
                  alt={`Partner logo ${index + 1}`}
                  className="max-h-32 max-w-full w-auto object-contain transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoWall;
