import Link from "next/link";
import { Logo } from "@/components/Logo";
import { SearchDemo } from "@/components/SearchDemo";

export const metadata = {
  title: "Preview — 30秒UXデモ",
  description:
    "AGORA がローンチ時に提供する検索・コミュニティ発見体験の静的プレビュー。",
};

export default function PreviewPage() {
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

      <section className="max-w-5xl mx-auto px-6 py-12 sm:py-20">
        <p className="text-[11px] tracking-[0.35em] text-athena-bronze/90 uppercase mb-4">
          Preview · 静的デモ
        </p>
        <h1 className="font-serif text-[34px] sm:text-[44px] tracking-tight text-marble-white mb-4 text-balance">
          世界中のコミュニティを、検索する。
        </h1>
        <p className="text-marble-white/65 max-w-2xl leading-relaxed mb-12 text-[15px]">
          このページは、AGORA の検索・発見体験を静的データ
          （50 コミュニティのシード）で再現したプレビューです。<br className="hidden sm:block" />
          本番では同名異物の自動解決・2次接続検出・説明可能AI推薦が稼働します。
        </p>

        <SearchDemo />

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
