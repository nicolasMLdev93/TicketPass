interface LogoProps {
  size?: number;
  showText?: boolean;
  variant?: "full" | "icon";
  className?: string;
}

export default function Logo({
  size = 48,
  showText = true,
  variant = "full",
  className = "",
}: LogoProps) {
  const showLabel = showText && variant === "full";

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>

          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect
          x="4"
          y="4"
          width="56"
          height="56"
          rx="16"
          fill="url(#blueGradient)"
        />

        <rect
          x="4"
          y="4"
          width="56"
          height="56"
          rx="16"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M 16 22 
             L 48 22 
             C 48 22 48 22 48 24 
             L 48 26 
             C 46 26 45 27.5 45 29.5 
             C 45 31.5 46 33 48 33 
             L 48 38 
             C 48 40 48 40 46 40 
             L 18 40 
             C 16 40 16 40 16 38 
             L 16 33 
             C 18 33 19 31.5 19 29.5 
             C 19 27.5 18 26 16 26 
             L 16 24 
             C 16 22 16 22 16 22 Z"
          fill="url(#goldGradient)"
          filter="url(#glow)"
        />
        <line
          x1="32"
          y1="24"
          x2="32"
          y2="38"
          stroke="#0F172A"
          strokeWidth="1.5"
          strokeDasharray="2 2"
          opacity="0.4"
        />

        <path
          d="M 21 29 L 27 29 M 24 29 L 24 35 M 37 29 L 43 29 M 40 29 L 40 35"
          stroke="#0F172A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M 50 14 L 50 18 M 48 16 L 52 16 M 49 15 L 51 17 M 51 15 L 49 17"
          stroke="#FCD34D"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>

      {showLabel && (
        <div className="flex flex-col leading-none">
          <span className="text-xl font-bold text-white tracking-tight">
            Ticket<span className="text-amber-400">Pass</span>
          </span>
          <span className="text-[10px] text-neutral-500 tracking-widest uppercase mt-0.5">
            Events Platform
          </span>
        </div>
      )}
    </div>
  );
}
