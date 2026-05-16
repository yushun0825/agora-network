"use client";

import { useMemo, useState } from "react";
import { SEED_COMMUNITIES, search } from "@/lib/seed-data";
import type { SeedCommunity } from "@/lib/types";

const TYPE_LABEL: Record<SeedCommunity["type"], string> = {
  geographical: "地縁",
  academic: "学術",
  professional: "業界・職能",
  corporate: "企業",
  religious: "宗教",
  political: "政治",
  hobby: "趣味",
  sports: "スポーツ",
  alumni: "同窓",
  digital_nation: "デジタル国家",
  dao: "DAO",
  family: "家族",
  movement: "思想運動",
  fandom: "ファンダム",
  mutual_aid: "相互扶助",
  other: "その他",
};

export function SearchDemo() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<SeedCommunity | null>(null);

  const results = useMemo(() => {
    if (!q.trim()) return SEED_COMMUNITIES.slice(0, 8);
    return search(q);
  }, [q]);

  return (
    <div className="space-y-6">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          {results.length === 0 && (
            <p className="text-marble-white/50 text-[14px] py-8 text-center">
              該当するコミュニティが見つかりませんでした。
              <br />
              <span className="text-[12px] text-marble-white/35">
                AGORA 公開時は、あなた自身が登録できます。
              </span>
            </p>
          )}
          {results.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c)}
              className={`w-full text-left border rounded-md px-4 py-3 transition ${
                selected?.id === c.id
                  ? "border-athena-bronze/60 bg-athena-bronze/10"
                  : "border-marble-white/10 bg-marble-white/[0.02] hover:bg-marble-white/[0.04]"
              }`}
            >
              <div className="flex items-baseline gap-2 mb-1">
                <h3 className="text-[15px] font-medium text-marble-white truncate">{c.name}</h3>
                <span className="text-[10px] uppercase tracking-wider text-athena-bronze/80 flex-shrink-0">
                  {TYPE_LABEL[c.type]}
                </span>
              </div>
              <p className="text-[12px] text-marble-white/55 line-clamp-2">{c.description}</p>
              <div className="flex items-center gap-3 mt-2 text-[11px] text-marble-white/40">
                {c.location && <span>📍 {c.location}</span>}
                {c.memberEstimate && (
                  <span>👥 {c.memberEstimate.toLocaleString()}</span>
                )}
                {c.foundedYear && <span>since {c.foundedYear}</span>}
              </div>
            </button>
          ))}
        </div>

        <aside className="md:sticky md:top-6 md:self-start">
          {selected ? (
            <CommunityDetail community={selected} />
          ) : (
            <div className="border border-marble-white/10 rounded-md p-6 text-[13px] text-marble-white/50 leading-relaxed">
              左の一覧からコミュニティを選択してください。
              <br />
              <br />
              詳細・関連コミュニティ・タグが表示されます。
              <br />
              <br />
              これは AGORA の検索体験の<strong>静的プレビュー</strong>です。
              本番では同名異物の自動解決、2次接続検出、説明可能AI推薦が動作します。
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function CommunityDetail({ community }: { community: SeedCommunity }) {
  const related = community.relatedCommunities
    ?.map((id) => SEED_COMMUNITIES.find((c) => c.id === id))
    .filter((c): c is SeedCommunity => Boolean(c));

  return (
    <div className="border border-marble-white/15 rounded-md p-6 bg-marble-white/[0.02]">
      <div className="flex items-baseline gap-2 mb-1">
        <h3 className="font-serif text-[24px] text-marble-white">{community.name}</h3>
      </div>
      <p className="text-[11px] uppercase tracking-wider text-athena-bronze/90 mb-4">
        {TYPE_LABEL[community.type]}
        {community.foundedYear && ` · since ${community.foundedYear}`}
      </p>

      <p className="text-[14px] text-marble-white/80 leading-relaxed mb-5">
        {community.description}
      </p>

      <div className="space-y-2 text-[12px] text-marble-white/60">
        {community.location && (
          <div>
            <span className="text-marble-white/40">場所:</span> {community.location}
          </div>
        )}
        {community.memberEstimate && (
          <div>
            <span className="text-marble-white/40">推定構成員:</span>{" "}
            {community.memberEstimate.toLocaleString()}
          </div>
        )}
        {community.homepage && (
          <div>
            <span className="text-marble-white/40">HP:</span>{" "}
            <a
              href={community.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-athena-bronze hover:underline"
            >
              {community.homepage.replace(/^https?:\/\//, "")}
            </a>
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {community.tags.map((t) => (
          <span
            key={t}
            className="text-[10px] px-2 py-1 rounded border border-marble-white/15 text-marble-white/60"
          >
            #{t}
          </span>
        ))}
      </div>

      {related && related.length > 0 && (
        <div className="mt-6 pt-5 border-t border-marble-white/10">
          <p className="text-[11px] uppercase tracking-wider text-marble-white/40 mb-2">
            関連コミュニティ
          </p>
          <ul className="space-y-1">
            {related.map((r) => (
              <li key={r.id} className="text-[13px] text-marble-white/70">
                → {r.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
