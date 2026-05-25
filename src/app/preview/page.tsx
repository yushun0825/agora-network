import Link from "next/link";
import { Suspense } from "react";
import { SearchDemo } from "@/components/SearchDemo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEED_COMMUNITIES } from "@/lib/seed-data";

export const metadata = {
  title: "Preview — 30秒UXデモ",
  description:
    "AGORA がローンチ時に提供する検索・コミュニティ発見体験の静的プレビュー。",
};

export default function PreviewPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />

      <section className="max-w-6xl mx-auto px-6 py-12 sm:py-16">
        <p className="text-[10px] sm:text-[11px] tracking-[0.28em] sm:tracking-[0.35em] text-athena-bronze/90 uppercase mb-4 kicker-tight">
          Preview · 静的デモ
        </p>
        <h1 className="font-serif text-[26px] sm:text-[36px] md:text-[42px] lg:text-[48px] leading-[1.22] tracking-tight text-marble-white mb-4 balance-ja">
          <span className="block">世界中のコミュニティを、</span>
          <span className="block">検索する。</span>
        </h1>
        <p className="text-marble-white/65 max-w-2xl leading-relaxed mb-10 text-[15px]">
          このページは AGORA の検索・発見体験を{" "}
          <span className="text-marble-white">{SEED_COMMUNITIES.length} 件のシードコミュニティ</span>{" "}
          で再現したプレビューです。本番では同名異物の自動解決や説明可能AI推薦が稼働します。
        </p>

        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="font-serif text-[22px] sm:text-[26px] text-marble-white tracking-tight balance-ja leading-snug">
            検索・絞り込み
          </h2>
          <span className="text-[11px] uppercase tracking-wider text-marble-white/40">
            Type / Tag / 並び順 で絞り込み
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
            <strong className="text-marble-white/80">コミュニティ同士の関係（人脈・所属・派生）は、ローンチ後に登録ユーザーが追加していきます。</strong>
            私たちは関係を勝手にプリシードしません。
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

      <Footer />
    </main>
  );
}
