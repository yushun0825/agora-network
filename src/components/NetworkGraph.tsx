"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  forceSimulation,
  forceManyBody,
  forceLink,
  forceCenter,
  forceCollide,
  type Simulation,
  type SimulationNodeDatum,
} from "d3-force";
import { TYPE_COLOR, TYPE_LABEL } from "@/lib/community-labels";
import type { CommunityType } from "@/lib/types";

interface GraphInput {
  nodes: { id: string; name: string; type: CommunityType }[];
  links: { source: string; target: string }[];
}

interface SimNode extends SimulationNodeDatum {
  id: string;
  name: string;
  type: CommunityType;
  degree: number;
}

interface SimLink {
  source: string | SimNode;
  target: string | SimNode;
}

interface Props {
  graph: GraphInput;
  height?: number;
  highlightId?: string;
  showCaption?: boolean;
  linkDistance?: number;
  chargeStrength?: number;
}

export function NetworkGraph({
  graph,
  height = 480,
  highlightId,
  showCaption = true,
  linkDistance = 75,
  chargeStrength = -90,
}: Props) {
  const router = useRouter();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(800);
  const [hovered, setHovered] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  // ノードとリンクは graph 入力から派生させる。次数を計算
  const { nodes, links } = useMemo(() => {
    const degree = new Map<string, number>();
    for (const l of graph.links) {
      degree.set(l.source, (degree.get(l.source) ?? 0) + 1);
      degree.set(l.target, (degree.get(l.target) ?? 0) + 1);
    }
    const ns: SimNode[] = graph.nodes.map((n) => ({
      ...n,
      degree: degree.get(n.id) ?? 0,
    }));
    const ls: SimLink[] = graph.links.map((l) => ({
      source: l.source,
      target: l.target,
    }));
    return { nodes: ns, links: ls };
  }, [graph]);

  // 親要素の幅を観測
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setWidth(el.clientWidth);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // d3-force シミュレーション
  const simRef = useRef<Simulation<SimNode, SimLink> | null>(null);
  useEffect(() => {
    if (!width || !height) return;
    const sim = forceSimulation<SimNode, SimLink>(nodes)
      .force(
        "link",
        forceLink<SimNode, SimLink>(links)
          .id((d) => d.id)
          .distance(linkDistance)
          .strength(0.4),
      )
      .force("charge", forceManyBody().strength(chargeStrength))
      .force("center", forceCenter(width / 2, height / 2))
      .force("collide", forceCollide().radius(18))
      .alpha(1)
      .alphaDecay(0.04);

    sim.on("tick", () => setTick((t) => t + 1));
    simRef.current = sim;
    return () => {
      sim.stop();
    };
  }, [nodes, links, width, height]);

  // ハイライト ID が変わったら simulation を「揺らす」
  useEffect(() => {
    if (highlightId && simRef.current) {
      simRef.current.alpha(0.6).restart();
    }
  }, [highlightId]);

  // 隣接ノード
  const neighbours = useMemo(() => {
    const target = hovered ?? highlightId;
    if (!target) return new Set<string>();
    const set = new Set<string>([target]);
    for (const l of links) {
      const s = typeof l.source === "string" ? l.source : l.source.id;
      const t = typeof l.target === "string" ? l.target : l.target.id;
      if (s === target) set.add(t);
      if (t === target) set.add(s);
    }
    return set;
  }, [hovered, highlightId, links]);

  const focusNode = hovered ?? highlightId;
  // tick は描画のためのトリガーに使用
  void tick;

  return (
    <div ref={wrapRef} className="relative w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        className="block rounded-lg border border-marble-white/10 bg-marble-white/[0.015]"
      >
        {/* Edges */}
        <g strokeOpacity={0.4} strokeWidth={0.8} stroke="rgba(245,244,238,0.35)">
          {links.map((l, i) => {
            const s = typeof l.source === "string" ? null : (l.source as SimNode);
            const t = typeof l.target === "string" ? null : (l.target as SimNode);
            if (!s || !t || s.x == null || t.x == null) return null;
            const sId = s.id;
            const tId = t.id;
            const inFocus =
              focusNode && (sId === focusNode || tId === focusNode);
            return (
              <line
                key={i}
                x1={s.x}
                y1={s.y}
                x2={t.x}
                y2={t.y}
                stroke={inFocus ? "#B89870" : undefined}
                strokeOpacity={focusNode ? (inFocus ? 0.9 : 0.08) : 0.4}
              />
            );
          })}
        </g>

        {/* Nodes */}
        <g>
          {nodes.map((n) => {
            if (n.x == null || n.y == null) return null;
            const isFocus = focusNode === n.id;
            const isNeighbour = neighbours.has(n.id);
            const dim = focusNode && !isNeighbour;
            const r = 4 + Math.min(n.degree * 0.8, 5);
            return (
              <g
                key={n.id}
                transform={`translate(${n.x}, ${n.y})`}
                onMouseEnter={() => setHovered(n.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => router.push(`/c/${n.id}`)}
                style={{ cursor: "pointer" }}
                role="link"
                aria-label={`Open ${n.name}`}
              >
                <circle
                  r={isFocus ? r + 2 : r}
                  fill={TYPE_COLOR[n.type]}
                  stroke={isFocus ? "#F5F4EE" : "rgba(26,31,26,0.8)"}
                  strokeWidth={isFocus ? 1.4 : 0.8}
                  opacity={dim ? 0.22 : 1}
                />
                {(isFocus || isNeighbour || n.degree >= 3) && (
                  <text
                    x={r + 4}
                    y={3}
                    fontSize={10}
                    fill="rgba(245,244,238,0.85)"
                    opacity={dim ? 0.3 : 1}
                    style={{ pointerEvents: "none" }}
                  >
                    {n.name}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {showCaption && (
        <div className="absolute top-3 left-3 text-[10px] text-marble-white/45 leading-tight pointer-events-none">
          <p className="uppercase tracking-[0.2em] text-marble-white/35 mb-1">
            Network · {nodes.length} 個のコミュニティ · {links.length} 本の関係
          </p>
          <p>ノードにホバー / クリックで該当ページへ。</p>
        </div>
      )}

      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-[10px] text-marble-white/55">
        {Object.entries(TYPE_COLOR).map(([type, color]) => (
          <span key={type} className="inline-flex items-center gap-1.5">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ background: color }}
            />
            {TYPE_LABEL[type as CommunityType]}
          </span>
        ))}
      </div>
    </div>
  );
}
