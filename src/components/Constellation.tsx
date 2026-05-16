"use client";

import { useEffect, useState } from "react";

// 静的な星座風ビジュアライザー。装飾目的。
const NODES = [
  { x: 12, y: 22, r: 1.6 },
  { x: 28, y: 14, r: 1.2 },
  { x: 44, y: 30, r: 1.8 },
  { x: 60, y: 18, r: 1.4 },
  { x: 78, y: 28, r: 2.0 },
  { x: 88, y: 12, r: 1.2 },
  { x: 20, y: 48, r: 1.4 },
  { x: 36, y: 62, r: 1.8 },
  { x: 52, y: 54, r: 1.4 },
  { x: 68, y: 68, r: 1.6 },
  { x: 84, y: 54, r: 1.4 },
  { x: 14, y: 78, r: 1.2 },
  { x: 30, y: 86, r: 1.6 },
  { x: 50, y: 80, r: 1.4 },
  { x: 72, y: 88, r: 1.8 },
  { x: 90, y: 76, r: 1.4 },
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
  [0, 6], [2, 7], [4, 8], [3, 9], [5, 10],
  [6, 7], [7, 8], [8, 9], [9, 10],
  [6, 11], [7, 12], [8, 13], [9, 14], [10, 15],
  [11, 12], [12, 13], [13, 14], [14, 15],
];

export function Constellation() {
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPulse((v) => (v + 1) % NODES.length), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full opacity-50"
      aria-hidden
    >
      <g stroke="#F5F4EE" strokeWidth="0.15" strokeOpacity="0.35" fill="none">
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
      <g fill="#F5F4EE">
        {NODES.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r * (i === pulse ? 1.6 : 1)}
            opacity={i === pulse ? 1 : 0.7}
            style={{ transition: "r 0.4s ease, opacity 0.4s ease" }}
          />
        ))}
      </g>
    </svg>
  );
}
