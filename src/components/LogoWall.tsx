interface LogoWallProps {
  title?: string;
  logos: string[];
}

const LogoWall = ({ title, logos }: LogoWallProps) => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-6">
        {title && (
          <h3 className="text-center text-muted-foreground text-sm font-semibold uppercase tracking-wider mb-8">
            {title}
          </h3>
        )}
        
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-items-center">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-20 w-full opacity-80 hover:opacity-100 transition-all duration-500 grayscale-[30%] hover:grayscale-0 hover:scale-110 animate-fade-up p-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={logo}
                  alt={`Partner logo ${index + 1}`}
                  className="max-h-20 w-auto object-contain transition-all duration-500"
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
