import Link from "next/link";
import { Logo } from "./Logo";

/**
 * 全ページ共通フッター。
 * Stark Technologies 旗艦としての重み、思想の再掲、サイトマップを兼ねる。
 */
export function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-marble-white/10">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-[1.4fr_1fr_1fr] gap-10 sm:gap-12">
          {/* Brand column */}
          <div>
            <Logo size={26} />
            <p className="mt-5 text-[13px] text-marble-white/65 leading-relaxed max-w-sm">
              世界中のコミュニティと人的紐帯のオープン・データベース。
              <br />
              人類のあらゆる「広場」を、ひとつの地図に。
            </p>
            <p className="mt-4 text-[11px] tracking-[0.2em] uppercase text-marble-white/35">
              A project of{" "}
              <span className="text-marble-white/55">Stark Technologies</span>
            </p>
          </div>

          {/* Sitemap */}
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-marble-white/40 mb-4">
              Explore
            </p>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <Link
                  href="/"
                  className="text-marble-white/75 hover:text-marble-white transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/manifesto"
                  className="text-marble-white/75 hover:text-marble-white transition"
                >
                  Manifesto
                </Link>
              </li>
              <li>
                <Link
                  href="/preview"
                  className="text-marble-white/75 hover:text-marble-white transition"
                >
                  Preview
                </Link>
              </li>
            </ul>
          </div>

          {/* Principles */}
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-marble-white/40 mb-4">
              Principles
            </p>
            <ul className="space-y-2.5 text-[12px] text-marble-white/55 leading-snug">
              <li className="flex items-baseline gap-2">
                <span className="text-athena-bronze/70" aria-hidden>
                  ✦
                </span>
                <span>広告ゼロ。終生不参入。</span>
              </li>
              <li className="flex items-baseline gap-2">
                <span className="text-athena-bronze/70" aria-hidden>
                  ✦
                </span>
                <span>データ主権。30日で物理削除。</span>
              </li>
              <li className="flex items-baseline gap-2">
                <span className="text-athena-bronze/70" aria-hidden>
                  ✦
                </span>
                <span>説明可能AI。推薦理由を開示。</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-marble-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-marble-white/40">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>© 2026 Stark Technologies</span>
            <span aria-hidden className="hidden sm:inline text-marble-white/20">
              ·
            </span>
            <span>Coming Q4 2026</span>
            <span aria-hidden className="hidden sm:inline text-marble-white/20">
              ·
            </span>
            <span className="font-mono">v0.5</span>
          </div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-marble-white/30">
            ἀγορά · since 7th c. BCE
          </p>
        </div>
      </div>
    </footer>
  );
}
