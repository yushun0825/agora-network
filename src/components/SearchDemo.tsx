"use client";

import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { SEED_COMMUNITIES, allTags } from "@/lib/seed-data";
import type { CommunityType, SeedCommunity } from "@/lib/types";
import { TYPE_LABEL, TYPE_LIST, TYPE_COLOR } from "@/lib/community-labels";

const TOP_TAGS_LIMIT = 14;

// Empty state で示す「試してみて」例。実在の seed と一致させ、押せば即フィルタが効くもの。
const EXAMPLE_QUERIES: { label: string; q?: string; tag?: string; type?: CommunityType }[] = [
  { label: "Web3 のコミュニティ", tag: "web3" },
  { label: "デジタル都市国家", type: "digital_nation" },
  { label: "宇宙・航空", tag: "aerospace" },
  { label: "中山研", q: "中山" },
];

type SortKey = "relevance" | "founded_desc" | "founded_asc" | "members_desc" | "name_asc";

const SORT_LABELS: Record<SortKey, string> = {
  relevance: "関連度順",
  founded_desc: "新しい順",
  founded_asc: "古い順",
  members_desc: "規模順",
  name_asc: "名前順",
};

const SORT_LIST: SortKey[] = [
  "relevance",
  "founded_desc",
  "founded_asc",
  "members_desc",
  "name_asc",
];

export function SearchDemo() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialQ = searchParams.get("q") ?? "";
  const initialType = (searchParams.get("type") as CommunityType | null) ?? null;
  const initialTag = searchParams.get("tag");

  const initialSort = (searchParams.get("sort") as SortKey | null) ?? "relevance";

  const [q, setQ] = useState(initialQ);
  const [activeType, setActiveType] = useState<CommunityType | null>(initialType);
  const [activeTag, setActiveTag] = useState<string | null>(initialTag);
  const [sort, setSort] = useState<SortKey>(
    SORT_LIST.includes(initialSort) ? initialSort : "relevance",
  );
  const inputRef = useRef<HTMLInputElement>(null);

  // キーボードショートカット: "/" でフォーカス、Esc でフィルタ解除
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
      if (e.key === "/" && !isTyping) {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === "Escape" && document.activeElement === inputRef.current) {
        if (q) {
          setQ("");
        } else {
          inputRef.current?.blur();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [q]);

  // Sync URL with state so deep-links work and back/forward navigation behaves
  const syncUrl = useCallback(() => {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (activeType) params.set("type", activeType);
    if (activeTag) params.set("tag", activeTag);
    if (sort !== "relevance") params.set("sort", sort);
    const search = params.toString();
    router.replace(search ? `${pathname}?${search}` : pathname, { scroll: false });
  }, [q, activeType, activeTag, sort, pathname, router]);

  useEffect(() => {
    const handle = setTimeout(syncUrl, 200);
    return () => clearTimeout(handle);
  }, [syncUrl]);

  const topTags = useMemo(() => allTags().slice(0, TOP_TAGS_LIMIT), []);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    const filtered = SEED_COMMUNITIES.filter((c) => {
      if (activeType && c.type !== activeType) return false;
      if (activeTag && !c.tags.includes(activeTag)) return false;
      if (!query) return true;
      const haystack = [c.name, c.description, c.location ?? "", ...c.tags]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });

    // ソート: relevance はシード順を維持。それ以外は明示的に並び替える
    if (sort === "relevance") return filtered;
    const sorted = [...filtered];
    switch (sort) {
      case "founded_desc":
        sorted.sort((a, b) => (b.foundedYear ?? -Infinity) - (a.foundedYear ?? -Infinity));
        break;
      case "founded_asc":
        sorted.sort((a, b) => (a.foundedYear ?? Infinity) - (b.foundedYear ?? Infinity));
        break;
      case "members_desc":
        sorted.sort((a, b) => (b.memberEstimate ?? -1) - (a.memberEstimate ?? -1));
        break;
      case "name_asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name, "ja"));
        break;
    }
    return sorted;
  }, [q, activeType, activeTag, sort]);

  const hasFilters = q.trim() || activeType || activeTag;

  return (
    <div className="space-y-5">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="コミュニティ名・タグ・場所で検索 ─ JAXA, 中山研, Web3, Tokyo …"
          className="w-full bg-marble-white/[0.04] border border-marble-white/15 text-marble-white placeholder:text-marble-white/30 rounded-md pl-5 pr-16 py-4 text-[15px] focus:border-athena-bronze/60 focus:bg-marble-white/[0.06] transition"
          aria-label="コミュニティ検索"
        />
        <kbd
          aria-hidden
          className="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-marble-white/35 border border-marble-white/15 rounded px-1.5 py-0.5 font-mono"
        >
          /
        </kbd>
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
              className={`group inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded border transition ${
                isActive
                  ? "border-athena-bronze/60 bg-athena-bronze/15 text-marble-white"
                  : "border-marble-white/15 text-marble-white/55 hover:bg-marble-white/[0.04]"
              }`}
            >
              <span
                aria-hidden
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{
                  background: TYPE_COLOR[value],
                  opacity: isActive ? 1 : 0.75,
                }}
              />
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

      {/* Result summary line + sort */}
      <div className="flex items-baseline justify-between gap-3 pt-1 text-[12px] text-marble-white/55 border-b border-marble-white/10 pb-3">
        <span>
          <span className="font-mono text-marble-white text-[14px] tabular-nums">
            {results.length.toLocaleString()}
          </span>
          <span className="text-marble-white/40"> / {SEED_COMMUNITIES.length.toLocaleString()}</span>
          <span className="ml-2 text-marble-white/55">のコミュニティ</span>
          {hasFilters && (
            <span className="ml-3 text-[11px] text-marble-white/40">
              フィルタ適用中
            </span>
          )}
        </span>
        <label className="flex items-center gap-2 text-[11px] text-marble-white/45">
          <span className="hidden sm:inline">並び替え</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="bg-marble-white/[0.04] border border-marble-white/15 text-marble-white/85 text-[12px] rounded px-2 py-1 hover:bg-marble-white/[0.07] focus:border-athena-bronze/60 transition"
            aria-label="結果の並び替え"
          >
            {SORT_LIST.map((key) => (
              <option key={key} value={key} className="bg-olive-black">
                {SORT_LABELS[key]}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Results grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
        {results.length === 0 && (
          <div className="col-span-full py-12 text-center space-y-5">
            <p className="text-marble-white/55 text-[14px]">
              該当するコミュニティが見つかりませんでした。
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {EXAMPLE_QUERIES.map((ex) => (
                <button
                  key={ex.label}
                  onClick={() => {
                    setQ(ex.q ?? "");
                    setActiveType(ex.type ?? null);
                    setActiveTag(ex.tag ?? null);
                  }}
                  className="text-[12px] px-3 py-1.5 rounded-md border border-marble-white/15 text-marble-white/70 hover:border-athena-bronze/50 hover:text-marble-white transition"
                >
                  {ex.label}
                </button>
              ))}
            </div>
            <p className="text-[12px] text-marble-white/35 pt-2">
              AGORA 公開時、あなた自身がここに新しい場所を描き加えられます。
            </p>
          </div>
        )}
        {results.map((c) => (
          <CommunityCard key={c.id} community={c} />
        ))}
      </div>
    </div>
  );
}

function CommunityCard({ community }: { community: SeedCommunity }) {
  const meta: string[] = [];
  if (community.location) meta.push(community.location);
  if (community.memberEstimate)
    meta.push(`${community.memberEstimate.toLocaleString()} 名`);
  if (community.foundedYear) meta.push(`${community.foundedYear}`);

  return (
    <Link
      href={`/c/${community.id}`}
      className="relative block group border border-marble-white/10 rounded-md px-4 py-3 bg-marble-white/[0.02] hover:bg-marble-white/[0.06] hover:border-athena-bronze/45 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-12px_rgba(184,152,112,0.35)] transition-all duration-200 ease-out"
    >
      {/* hover 時に左端 1px の bronze アクセント */}
      <span
        aria-hidden
        className="absolute left-0 top-3 bottom-3 w-0.5 rounded-r bg-athena-bronze opacity-0 group-hover:opacity-70 transition-opacity"
      />
      <div className="flex items-baseline gap-2 mb-1.5">
        <h3 className="text-[14px] font-medium text-marble-white truncate group-hover:text-athena-bronze transition">
          {community.name}
        </h3>
        <span
          className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-athena-bronze/80 flex-shrink-0"
        >
          <span
            aria-hidden
            className="inline-block w-1 h-1 rounded-full"
            style={{ background: TYPE_COLOR[community.type], opacity: 0.85 }}
          />
          {TYPE_LABEL[community.type]}
        </span>
      </div>
      <p className="text-[12px] text-marble-white/60 line-clamp-2 mb-2">
        {community.description}
      </p>
      {meta.length > 0 && (
        <p className="text-[10px] text-marble-white/40 leading-snug">
          {meta.join(" · ")}
        </p>
      )}
    </Link>
  );
}
