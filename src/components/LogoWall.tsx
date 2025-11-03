interface LogoWallProps {
  title?: string;
  logos: string[];
}

const LogoWall = ({ title, logos }: LogoWallProps) => {
  // Duplicate logos for infinite scroll effect
  const duplicatedLogos = [...logos, ...logos];
  
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-6">
        {title && (
          <h3 className="text-center text-muted-foreground text-sm font-semibold uppercase tracking-wider mb-8">
            {title}
          </h3>
        )}
        
        <div className="bg-white rounded-2xl p-6 shadow-sm overflow-hidden">
          <div className="flex gap-12 animate-scroll">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center flex-shrink-0 w-48 h-32 opacity-80 hover:opacity-100 transition-all duration-500 grayscale-[30%] hover:grayscale-0 hover:scale-110"
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
