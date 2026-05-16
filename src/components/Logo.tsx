interface LogoProps {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}

export function Logo({ size = 32, showWordmark = true, className }: LogoProps) {
  const w = showWordmark ? size * (200 / 60) : size;
  return (
    <div className={className} style={{ display: "inline-flex", alignItems: "center" }}>
      <svg
        viewBox={showWordmark ? "0 0 200 60" : "0 0 60 60"}
        width={w}
        height={size}
        role="img"
        aria-label="AGORA"
      >
        <g
          transform={showWordmark ? "translate(20 30)" : "translate(30 30)"}
          fill="none"
          stroke="#F5F4EE"
          strokeWidth="1.1"
          strokeLinecap="round"
        >
          <circle cx="0" cy="-14" r="1.6" fill="#F5F4EE" stroke="none" />
          <circle cx="13.06" cy="-7" r="1.6" fill="#F5F4EE" stroke="none" />
          <circle cx="13.06" cy="7" r="1.6" fill="#F5F4EE" stroke="none" />
          <circle cx="0" cy="14" r="1.6" fill="#F5F4EE" stroke="none" />
          <circle cx="-13.06" cy="7" r="1.6" fill="#F5F4EE" stroke="none" />
          <circle cx="-13.06" cy="-7" r="1.6" fill="#F5F4EE" stroke="none" />
          <circle cx="0" cy="0" r="2.6" fill="#B89870" stroke="none" className="node-pulse" />
          <line x1="0" y1="-14" x2="0" y2="0" strokeOpacity="0.45" />
          <line x1="13.06" y1="-7" x2="0" y2="0" strokeOpacity="0.45" />
          <line x1="13.06" y1="7" x2="0" y2="0" strokeOpacity="0.45" />
          <line x1="0" y1="14" x2="0" y2="0" strokeOpacity="0.45" />
          <line x1="-13.06" y1="7" x2="0" y2="0" strokeOpacity="0.45" />
          <line x1="-13.06" y1="-7" x2="0" y2="0" strokeOpacity="0.45" />
        </g>
        {showWordmark && (
          <text
            x="56"
            y="40"
            fontFamily="'Cormorant Garamond', 'EB Garamond', Georgia, serif"
            fontSize="34"
            fontWeight="500"
            letterSpacing="6"
            fill="#F5F4EE"
          >
            AGORA
          </text>
        )}
      </svg>
    </div>
  );
}
