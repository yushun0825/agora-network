"use client";

/**
 * 人類接続レイヤーを示唆する背景ビジュアライザー。
 * クラスタ + ブロンズハブ + 連続的なノード breathing で「世界中のコミュニティが息づく」感覚を作る。
 * 装飾目的。テキスト可読性を最優先するため、opacity と blur で抑制している。
 */

type Node = {
  x: number;
  y: number;
  r: number;
  hub?: boolean;
};

// クラスタごとに自然な散らばりを設計。中央は薄く（テキスト領域）、周辺を濃く。
const NODES: Node[] = [
  // upper-left cluster
  { x: 6, y: 14, r: 1.0 },
  { x: 14, y: 8, r: 1.4 },
  { x: 18, y: 22, r: 1.2 },
  { x: 9, y: 30, r: 0.9 },
  { x: 22, y: 11, r: 1.0 },
  { x: 4, y: 24, r: 1.6, hub: true },
  // upper-center scatter
  { x: 30, y: 6, r: 0.9 },
  { x: 38, y: 18, r: 1.2 },
  { x: 50, y: 8, r: 1.4 },
  { x: 60, y: 14, r: 1.0 },
  // upper-right cluster
  { x: 70, y: 10, r: 1.2 },
  { x: 80, y: 18, r: 1.4 },
  { x: 86, y: 8, r: 1.0 },
  { x: 94, y: 22, r: 1.2 },
  { x: 76, y: 26, r: 0.9 },
  { x: 90, y: 34, r: 1.6, hub: true },
  // mid-left (sparser around text)
  { x: 3, y: 44, r: 1.2 },
  { x: 12, y: 52, r: 1.0 },
  { x: 6, y: 64, r: 1.4 },
  // mid-right
  { x: 96, y: 46, r: 1.2 },
  { x: 88, y: 56, r: 1.0 },
  { x: 92, y: 68, r: 1.4 },
  // mid scatter (very sparse, behind text)
  { x: 32, y: 42, r: 0.7 },
  { x: 68, y: 44, r: 0.7 },
  { x: 42, y: 56, r: 0.8 },
  { x: 58, y: 56, r: 0.8 },
  // lower-left cluster
  { x: 8, y: 76, r: 1.2 },
  { x: 16, y: 84, r: 1.0 },
  { x: 22, y: 72, r: 1.4 },
  { x: 4, y: 88, r: 0.9 },
  { x: 28, y: 92, r: 1.0 },
  { x: 14, y: 70, r: 1.6, hub: true },
  // lower-center
  { x: 40, y: 80, r: 1.0 },
  { x: 50, y: 88, r: 1.2 },
  { x: 58, y: 78, r: 0.9 },
  // lower-right cluster
  { x: 72, y: 82, r: 1.4 },
  { x: 82, y: 76, r: 1.2 },
  { x: 88, y: 90, r: 1.0 },
  { x: 94, y: 80, r: 0.9 },
  { x: 78, y: 92, r: 1.0 },
];

// クラスタ内 + クラスタ間の意図的なエッジ。完全グラフではなく「実在しそうな」つながり。
const EDGES: [number, number][] = [
  // upper-left cluster
  [0, 1], [1, 2], [2, 3], [3, 5], [5, 0], [1, 4], [4, 2], [2, 5],
  // upper-left → upper-center
  [4, 7], [2, 7],
  // upper-center scatter (loose)
  [6, 7], [7, 8], [8, 9],
  // upper-center → upper-right
  [9, 10], [8, 10],
  // upper-right cluster
  [10, 11], [11, 12], [12, 13], [13, 15], [11, 14], [14, 15], [13, 11],
  // upper → mid (long edges)
  [5, 16], [15, 19],
  // mid edges to scatter
  [16, 17], [17, 18], [19, 20], [20, 21], [18, 26], [21, 36],
  // mid scatter to clusters
  [22, 17], [23, 20], [24, 26], [25, 36],
  // lower-left cluster
  [26, 27], [27, 28], [28, 31], [29, 26], [30, 28], [31, 26], [31, 27],
  // lower-center
  [28, 32], [32, 33], [33, 34], [25, 34],
  // lower-center → lower-right
  [34, 35], [33, 35],
  // lower-right cluster
  [35, 36], [36, 37], [37, 38], [38, 39], [35, 38], [36, 39],
  // diagonal "bridges" connecting distant clusters
  [5, 31], [15, 21], [31, 21], [0, 6], [13, 22], [22, 23], [23, 19], [24, 25],
];

const ACCENT = "#B89870"; // athena-bronze
const MARBLE = "#F5F4EE"; // marble-white

export function Constellation() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.55 }}
      aria-hidden
    >
      <defs>
        {/* 接続線のグラデーション。薄く、ハブ近辺だけ少し濃く見えるイメージ */}
        <radialGradient id="agora-edge-fade" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={MARBLE} stopOpacity="0.5" />
          <stop offset="100%" stopColor={MARBLE} stopOpacity="0.15" />
        </radialGradient>
      </defs>

      <g stroke={MARBLE} strokeWidth="0.12" strokeOpacity="0.28" fill="none">
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
          />
        ))}
      </g>

      <g>
        {NODES.map((n, i) => {
          // 連続的な breathing。位相を index から決定して、全体としてランダムに見せる。
          const delay = (i * 0.37) % 6;
          const duration = n.hub ? 5 : 6 + ((i * 13) % 5);
          const base = n.hub ? 0.55 : 0.4;
          const peak = n.hub ? 1 : 0.85;
          return (
            <circle
              key={i}
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill={n.hub ? ACCENT : MARBLE}
              style={{
                animation: `node-breath ${duration}s ease-in-out ${delay}s infinite`,
                ["--node-base" as string]: base,
                ["--node-peak" as string]: peak,
              }}
            />
          );
        })}
      </g>
    </svg>
  );
}
