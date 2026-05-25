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
          strokeWidth="1.3"
          strokeLinecap="round"
        >
          {/* 外周（広場の境界） — 非常に薄く、囲い込みを示唆 */}
          <circle cx="0" cy="0" r="20" stroke="#F5F4EE" strokeOpacity="0.18" strokeWidth="0.8" />

          {/* スポーク（メタ層が周辺コミュニティを束ねる） */}
          <line x1="0" y1="-14" x2="0" y2="0" strokeOpacity="0.5" />
          <line x1="13.06" y1="-7" x2="0" y2="0" strokeOpacity="0.5" />
          <line x1="13.06" y1="7" x2="0" y2="0" strokeOpacity="0.5" />
          <line x1="0" y1="14" x2="0" y2="0" strokeOpacity="0.5" />
          <line x1="-13.06" y1="7" x2="0" y2="0" strokeOpacity="0.5" />
          <line x1="-13.06" y1="-7" x2="0" y2="0" strokeOpacity="0.5" />

          {/* 周辺間の薄い結び（ノード同士も繋がる「メッシュ」性） */}
          <line x1="0" y1="-14" x2="13.06" y2="-7" strokeOpacity="0.22" />
          <line x1="13.06" y1="7" x2="0" y2="14" strokeOpacity="0.22" />
          <line x1="-13.06" y1="7" x2="-13.06" y2="-7" strokeOpacity="0.22" />

          {/* 外側ノード */}
          <circle cx="0" cy="-14" r="1.8" fill="#F5F4EE" stroke="none" />
          <circle cx="13.06" cy="-7" r="1.6" fill="#F5F4EE" stroke="none" />
          <circle cx="13.06" cy="7" r="1.8" fill="#B89870" stroke="none" />
          <circle cx="0" cy="14" r="1.6" fill="#F5F4EE" stroke="none" />
          <circle cx="-13.06" cy="7" r="1.6" fill="#F5F4EE" stroke="none" />
          <circle cx="-13.06" cy="-7" r="1.8" fill="#B89870" stroke="none" />

          {/* 中心ノード（脈動） */}
          <circle cx="0" cy="0" r="2.8" fill="#B89870" stroke="none" className="node-pulse" />
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
