export const EarthLogo = ({ className = "h-20 w-20" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`${className} animate-spin`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="100" cy="100" r="95" fill="none" stroke="hsl(142 76% 36%)" strokeWidth="2" opacity="0.3" />
      
      {/* Planet Earth */}
      <defs>
        <radialGradient id="earthGradient" cx="35%" cy="35%">
          <stop offset="0%" stopColor="hsl(200 100% 60%)" />
          <stop offset="100%" stopColor="hsl(142 76% 36%)" />
        </radialGradient>
      </defs>
      
      {/* Earth sphere */}
      <circle cx="100" cy="100" r="80" fill="url(#earthGradient)" />
      
      {/* Continents - simplified Africa and Europe */}
      <g fill="hsl(142 76% 36%)" opacity="0.8">
        {/* Africa */}
        <ellipse cx="110" cy="110" rx="25" ry="35" />
        {/* Europe */}
        <ellipse cx="95" cy="75" rx="18" ry="12" />
        {/* Asia */}
        <path d="M 120 70 Q 140 80 135 100 Q 130 110 115 105 Q 110 95 120 70" />
        {/* South America */}
        <path d="M 70 115 Q 75 130 70 145 Q 65 140 65 125 Q 65 115 70 115" />
      </g>
      
      {/* Clouds/atmosphere effect */}
      <circle cx="100" cy="100" r="80" fill="none" stroke="white" strokeWidth="1" opacity="0.2" />
      <circle cx="100" cy="100" r="78" fill="none" stroke="white" strokeWidth="0.5" opacity="0.15" />
      
      {/* Shine effect */}
      <ellipse cx="75" cy="70" rx="20" ry="25" fill="white" opacity="0.3" />
    </svg>
  );
};
