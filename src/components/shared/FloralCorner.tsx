export default function FloralCorner({
  position = "top-left",
  className = "",
}: {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}) {
  const rotation = {
    "top-left": "rotate(0deg)",
    "top-right": "scaleX(-1)",
    "bottom-left": "scaleY(-1)",
    "bottom-right": "scale(-1,-1)",
  }[position];

  const pos = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  }[position];

  return (
    <div
      className={`absolute ${pos} w-32 md:w-48 pointer-events-none opacity-60 ${className}`}
      style={{ transform: rotation }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b97f47" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {/* Main stem */}
        <path
          d="M10,10 Q40,40 60,80 Q70,110 80,140"
          stroke="url(#leafGrad)"
          strokeWidth="1.2"
          fill="none"
        />
        {/* Eucalyptus-style leaves */}
        <g fill="url(#leafGrad)" opacity="0.7">
          <ellipse cx="25" cy="30" rx="10" ry="5" transform="rotate(-35 25 30)" />
          <ellipse cx="40" cy="50" rx="11" ry="5" transform="rotate(-20 40 50)" />
          <ellipse cx="55" cy="75" rx="12" ry="5" transform="rotate(-5 55 75)" />
          <ellipse cx="65" cy="105" rx="13" ry="6" transform="rotate(10 65 105)" />
          <ellipse cx="75" cy="135" rx="13" ry="6" transform="rotate(25 75 135)" />
        </g>
        {/* Opposite side leaves */}
        <g fill="url(#leafGrad)" opacity="0.55">
          <ellipse cx="35" cy="25" rx="9" ry="4" transform="rotate(45 35 25)" />
          <ellipse cx="55" cy="45" rx="10" ry="5" transform="rotate(60 55 45)" />
          <ellipse cx="70" cy="70" rx="11" ry="5" transform="rotate(75 70 70)" />
          <ellipse cx="80" cy="100" rx="12" ry="5" transform="rotate(90 80 100)" />
          <ellipse cx="90" cy="130" rx="12" ry="6" transform="rotate(105 90 130)" />
        </g>
        {/* Small bud accents */}
        <circle cx="30" cy="15" r="2" fill="#d4af37" opacity="0.8" />
        <circle cx="50" cy="35" r="1.8" fill="#d4af37" opacity="0.7" />
      </svg>
    </div>
  );
}
