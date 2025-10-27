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
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-16 w-full opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
            >
              <img
                src={logo}
                alt={`Partner logo ${index + 1}`}
                className="max-h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoWall;
