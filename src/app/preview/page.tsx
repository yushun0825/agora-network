import Link from "next/link";
import { Suspense } from "react";
import { Logo } from "@/components/Logo";
import { SearchDemo } from "@/components/SearchDemo";
import { NetworkGraph } from "@/components/NetworkGraph";
import { getGraph } from "@/lib/seed-data";

export const metadata = {
  title: "Preview — 30秒UXデモ",
  description:
    "AGORA がローンチ時に提供する検索・コミュニティ発見体験の静的プレビュー。",
};

export default function PreviewPage() {
  const graph = getGraph();

  return (
    <main className="min-h-screen">
      <header className="flex items-center justify-between px-6 sm:px-10 py-6 border-b border-marble-white/10">
        <Link href="/" className="block">
          <Logo size={26} />
        </Link>
        <nav className="flex items-center gap-5 text-[13px] text-marble-white/70">
          <Link href="/" className="hover:text-marble-white transition">
            Home
          </Link>
          <Link href="/manifesto" className="hover:text-marble-white transition">
            Manifesto
          </Link>
        </nav>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-12 sm:py-16">
        <p className="text-[11px] tracking-[0.35em] text-athena-bronze/90 uppercase mb-4">
          Preview · 静的デモ
        </p>
        <h1 className="font-serif text-[34px] sm:text-[44px] tracking-tight text-marble-white mb-4 text-balance">
          世界中のコミュニティを、検索する。
        </h1>
        <p className="text-marble-white/65 max-w-2xl leading-relaxed mb-10 text-[15px]">
          このページは AGORA の検索・発見体験を{" "}
          <span className="text-marble-white">{graph.nodes.length} 件のシードコミュニティ</span>{" "}
          で再現したプレビューです。本番では同名異物の自動解決・2次接続検出・説明可能AI推薦が稼働します。
        </p>

        <div className="mb-12">
          <NetworkGraph graph={graph} height={500} />
        </div>

        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="font-serif text-[22px] sm:text-[26px] text-marble-white tracking-tight">
            検索・絞り込み
          </h2>
          <span className="text-[11px] uppercase tracking-wider text-marble-white/40">
            Type と Tag で絞り込み可能
          </span>
        </div>

        <Suspense
          fallback={
            <div className="text-marble-white/50 text-[14px] py-8">
              読み込み中…
            </div>
          }
        >
          <SearchDemo />
        </Suspense>

        <div className="mt-16 pt-8 border-t border-marble-white/10 text-[13px] text-marble-white/55">
          <p>
            このプレビューに登場するコミュニティは、公開情報のみで構成された AGORA のシードです。
            本番では誰もが Wikipedia 型のオープン編集で追加・修正できます。
          </p>
          <p className="mt-3">
            <Link
              href="/"
              className="text-athena-bronze hover:underline"
            >
              ← 招待リストに登録する
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
