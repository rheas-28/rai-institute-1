interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo = ({ className = "", showText = true }: LogoProps) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* AI Icon with lines */}
      <div className="flex flex-col items-start">
        <div className="text-2xl font-bold leading-none tracking-tight">AI</div>
        <div className="flex flex-col gap-0.5 w-full mt-1">
          <div className="h-0.5 w-full bg-current"></div>
          <div className="h-0.5 w-full bg-current"></div>
          <div className="h-0.5 w-full bg-current"></div>
        </div>
      </div>
      
      {/* Text */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-medium">Responsible</span>
          <span className="text-sm font-normal">Artificial Intelligence</span>
          <span className="text-sm font-medium">Institute</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
