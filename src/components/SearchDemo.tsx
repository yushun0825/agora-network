"use client";

import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo, useState, useCallback } from "react";
import { SEED_COMMUNITIES, allTags } from "@/lib/seed-data";
import type { CommunityType, SeedCommunity } from "@/lib/types";
import { TYPE_LABEL, TYPE_LIST } from "@/lib/community-labels";

const TOP_TAGS_LIMIT = 14;

export function SearchDemo() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialQ = searchParams.get("q") ?? "";
  const initialType = (searchParams.get("type") as CommunityType | null) ?? null;
  const initialTag = searchParams.get("tag");

  const [q, setQ] = useState(initialQ);
  const [activeType, setActiveType] = useState<CommunityType | null>(initialType);
  const [activeTag, setActiveTag] = useState<string | null>(initialTag);

  // Sync URL with state so deep-links work and back/forward navigation behaves
  const syncUrl = useCallback(() => {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (activeType) params.set("type", activeType);
    if (activeTag) params.set("tag", activeTag);
    const search = params.toString();
    router.replace(search ? `${pathname}?${search}` : pathname, { scroll: false });
  }, [q, activeType, activeTag, pathname, router]);

  useEffect(() => {
    const handle = setTimeout(syncUrl, 200);
    return () => clearTimeout(handle);
  }, [syncUrl]);

  const topTags = useMemo(() => allTags().slice(0, TOP_TAGS_LIMIT), []);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    return SEED_COMMUNITIES.filter((c) => {
      if (activeType && c.type !== activeType) return false;
      if (activeTag && !c.tags.includes(activeTag)) return false;
      if (!query) return true;
      const haystack = [c.name, c.description, c.location ?? "", ...c.tags]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [q, activeType, activeTag]);

  const hasFilters = q.trim() || activeType || activeTag;

  return (
    <div className="space-y-5">
      <div className="relative">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="コミュニティ名・タグ・場所で検索 ─ PRAXIS, 中山研, Web3, Tokyo …"
          className="w-full bg-marble-white/[0.04] border border-marble-white/15 text-marble-white placeholder:text-marble-white/30 rounded-md px-5 py-4 text-[15px] focus:border-athena-bronze/60 transition"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] tracking-widest text-marble-white/30 uppercase">
          {results.length} / {SEED_COMMUNITIES.length}
        </span>
      </div>

      {/* Type filter chips */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] uppercase tracking-wider text-marble-white/40 mr-1">
          Type
        </span>
        {TYPE_LIST.map(({ value, label }) => {
          const isActive = activeType === value;
          return (
            <button
              key={value}
              onClick={() => setActiveType(isActive ? null : value)}
              className={`text-[11px] px-2.5 py-1 rounded border transition ${
                isActive
                  ? "border-athena-bronze/60 bg-athena-bronze/15 text-marble-white"
                  : "border-marble-white/15 text-marble-white/55 hover:bg-marble-white/[0.04]"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Top tags */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] uppercase tracking-wider text-marble-white/40 mr-1">
          Tag
        </span>
        {topTags.map(({ tag, count }) => {
          const isActive = activeTag === tag;
          return (
            <button
              key={tag}
              onClick={() => setActiveTag(isActive ? null : tag)}
              className={`text-[11px] px-2.5 py-1 rounded border transition ${
                isActive
                  ? "border-athena-bronze/60 bg-athena-bronze/15 text-marble-white"
                  : "border-marble-white/15 text-marble-white/55 hover:bg-marble-white/[0.04]"
              }`}
            >
              #{tag}
              <span className="text-marble-white/30 ml-1">{count}</span>
            </button>
          );
        })}
        {hasFilters && (
          <button
            onClick={() => {
              setQ("");
              setActiveType(null);
              setActiveTag(null);
            }}
            className="text-[11px] px-2.5 py-1 text-marble-white/55 hover:text-marble-white transition underline-offset-2 hover:underline"
          >
            ✕ クリア
          </button>
        )}
      </div>

      {/* Results grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
        {results.length === 0 && (
          <p className="col-span-full text-marble-white/50 text-[14px] py-12 text-center">
            該当するコミュニティが見つかりませんでした。
            <br />
            <span className="text-[12px] text-marble-white/35">
              AGORA 公開時は、あなた自身が登録できます。
            </span>
          </p>
        )}
        {results.map((c) => (
          <CommunityCard key={c.id} community={c} />
        ))}
      </div>
    </div>
  );
}

function CommunityCard({ community }: { community: SeedCommunity }) {
  return (
    <Link
      href={`/c/${community.id}`}
      className="block group border border-marble-white/10 rounded-md px-4 py-3 bg-marble-white/[0.02] hover:bg-marble-white/[0.05] hover:border-athena-bronze/40 transition"
    >
      <div className="flex items-baseline gap-2 mb-1">
        <h3 className="text-[14px] font-medium text-marble-white truncate group-hover:text-athena-bronze transition">
          {community.name}
        </h3>
        <span className="text-[10px] uppercase tracking-wider text-athena-bronze/80 flex-shrink-0">
          {TYPE_LABEL[community.type]}
        </span>
      </div>
      <p className="text-[12px] text-marble-white/60 line-clamp-2 mb-2">
        {community.description}
      </p>
      <div className="flex items-center gap-3 text-[10px] text-marble-white/40">
        {community.location && <span>📍 {community.location}</span>}
        {community.memberEstimate && (
          <span>👥 {community.memberEstimate.toLocaleString()}</span>
        )}
        {community.foundedYear && <span>· {community.foundedYear}</span>}
      </div>
    </Link>
  );
}
