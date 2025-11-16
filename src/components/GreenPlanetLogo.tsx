export const GreenPlanetLogo = ({ className = "h-40 w-40" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 200 240"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer dark green circle */}
      <circle cx="100" cy="95" r="85" fill="none" stroke="#1b5e20" strokeWidth="9" />
      
      {/* White inner ring */}
      <circle cx="100" cy="95" r="76" fill="none" stroke="white" strokeWidth="3" />
      
      {/* Planet - light cyan water background */}
      <circle cx="100" cy="95" r="72" fill="#7dd3c0" />
      
      {/* Continents */}
      {/* Greenland - top left */}
      <path d="M 65 40 Q 68 25 75 35 Q 78 50 70 55 Q 65 50 65 40" fill="#558b2f" />
      
      {/* North America - left side top */}
      <path d="M 50 50 Q 45 45 52 35 Q 62 42 65 55 Q 58 58 50 50" fill="#558b2f" />
      
      {/* Central America/South America - left side */}
      <path d="M 55 65 Q 48 75 50 105 Q 60 110 68 90 Q 65 75 55 65" fill="#558b2f" />
      
      {/* Europe - top center */}
      <ellipse cx="95" cy="35" rx="13" ry="18" fill="#558b2f" />
      
      {/* Africa - center right, large */}
      <path d="M 110 65 Q 135 70 145 95 Q 142 125 120 140 Q 105 130 105 95 Q 108 75 110 65" fill="#558b2f" />
      
      {/* Asia - top right */}
      <path d="M 130 40 Q 155 35 160 55 Q 155 70 135 68 Q 130 55 130 40" fill="#558b2f" />
      
      {/* Australia - right bottom */}
      <ellipse cx="155" cy="125" rx="11" ry="14" fill="#558b2f" />
      
      {/* Water shine - top left area */}
      <ellipse cx="75" cy="60" rx="16" ry="22" fill="white" opacity="0.3" />
      
      {/* LEFT LEAF */}
      <g>
        {/* Leaf shape */}
        <path
          d="M 45 155 Q 25 165 20 195 Q 25 220 50 225 Q 75 215 80 175 Q 70 160 45 155"
          fill="#7cb342"
          stroke="#1b5e20"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Leaf vein */}
        <path d="M 45 155 Q 40 180 25 210" stroke="#1b5e20" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
      
      {/* RIGHT LEAF */}
      <g>
        {/* Leaf shape */}
        <path
          d="M 155 155 Q 175 165 180 195 Q 175 220 150 225 Q 125 215 120 175 Q 130 160 155 155"
          fill="#7cb342"
          stroke="#1b5e20"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Leaf vein */}
        <path d="M 155 155 Q 160 180 175 210" stroke="#1b5e20" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
      
      {/* Bottom connector */}
      <path d="M 80 175 Q 100 188 120 175" fill="none" stroke="#1b5e20" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};
