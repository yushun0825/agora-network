import { ImageResponse } from "next/og";
import { SEED_COMMUNITIES, getById } from "@/lib/seed-data";
import { TYPE_LABEL } from "@/lib/community-labels";

export const runtime = "edge";
export const alt = "AGORA — community page";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// generateImageMetadata は不要（同一スロット1枚のみ）。Next.js が default export を slug ごとに呼び出す。

const OLIVE_BLACK = "#1A1F1A";
const MARBLE = "#F5F4EE";
const BRONZE = "#B89870";
const NAVY = "#2A3F6F";

export default async function Image({ params }: { params: { slug: string } }) {
  const community = getById(params.slug);
  if (!community) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: OLIVE_BLACK,
            color: MARBLE,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 60,
          }}
        >
          AGORA
        </div>
      ),
      { ...size },
    );
  }

  const sinceText = community.foundedYear ? ` · since ${community.foundedYear}` : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: OLIVE_BLACK,
          backgroundImage: `radial-gradient(ellipse 80% 60% at 20% 0%, rgba(42, 63, 111, 0.22) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 90% 100%, rgba(184, 152, 112, 0.12) 0%, transparent 60%)`,
          color: MARBLE,
          padding: 72,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Top: AGORA wordmark + type/year kicker */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Mark />
            <span
              style={{
                fontSize: 28,
                fontWeight: 500,
                letterSpacing: 6,
                color: MARBLE,
              }}
            >
              AGORA
            </span>
          </div>
          <div
            style={{
              fontSize: 18,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: BRONZE,
              display: "flex",
            }}
          >
            {TYPE_LABEL[community.type]}
            {sinceText}
          </div>
        </div>

        {/* Center: community name + description */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
          <div
            style={{
              fontSize: community.name.length > 18 ? 64 : 84,
              lineHeight: 1.1,
              letterSpacing: -1,
              fontWeight: 600,
              color: MARBLE,
              marginBottom: 28,
              display: "flex",
            }}
          >
            {community.name}
          </div>
          <div
            style={{
              fontSize: 24,
              lineHeight: 1.5,
              color: "rgba(245, 244, 238, 0.78)",
              maxWidth: 980,
              display: "flex",
            }}
          >
            {community.description.length > 100
              ? community.description.slice(0, 98) + "…"
              : community.description}
          </div>
        </div>

        {/* Bottom: tagline + brand */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100%",
            paddingTop: 28,
            borderTop: "1px solid rgba(245, 244, 238, 0.14)",
          }}
        >
          <div
            style={{
              fontSize: 18,
              color: "rgba(245, 244, 238, 0.55)",
              display: "flex",
            }}
          >
            世界中のコミュニティと人的紐帯のオープン・データベース
          </div>
          <div
            style={{
              fontSize: 14,
              letterSpacing: 3,
              color: "rgba(245, 244, 238, 0.45)",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            A project of Stark Technologies
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

function Mark() {
  // 中心ノード + 6スポーク ハブ・スポークの簡易図形（ImageResponse 用に SVG をインライン）
  return (
    <svg width="48" height="48" viewBox="-30 -30 60 60">
      <circle cx={0} cy={-14} r={1.8} fill={MARBLE} />
      <circle cx={13.06} cy={-7} r={1.6} fill={MARBLE} />
      <circle cx={13.06} cy={7} r={1.8} fill={BRONZE} />
      <circle cx={0} cy={14} r={1.6} fill={MARBLE} />
      <circle cx={-13.06} cy={7} r={1.6} fill={MARBLE} />
      <circle cx={-13.06} cy={-7} r={1.8} fill={BRONZE} />
      <circle cx={0} cy={0} r={3} fill={BRONZE} />
      <line x1={0} y1={-14} x2={0} y2={0} stroke={MARBLE} strokeWidth={1.1} strokeOpacity={0.5} />
      <line
        x1={13.06}
        y1={-7}
        x2={0}
        y2={0}
        stroke={MARBLE}
        strokeWidth={1.1}
        strokeOpacity={0.5}
      />
      <line
        x1={13.06}
        y1={7}
        x2={0}
        y2={0}
        stroke={MARBLE}
        strokeWidth={1.1}
        strokeOpacity={0.5}
      />
      <line x1={0} y1={14} x2={0} y2={0} stroke={MARBLE} strokeWidth={1.1} strokeOpacity={0.5} />
      <line
        x1={-13.06}
        y1={7}
        x2={0}
        y2={0}
        stroke={MARBLE}
        strokeWidth={1.1}
        strokeOpacity={0.5}
      />
      <line
        x1={-13.06}
        y1={-7}
        x2={0}
        y2={0}
        stroke={MARBLE}
        strokeWidth={1.1}
        strokeOpacity={0.5}
      />
      <circle cx={0} cy={0} r={20} fill="none" stroke={MARBLE} strokeOpacity={0.18} strokeWidth={0.8} />
    </svg>
  );
}
