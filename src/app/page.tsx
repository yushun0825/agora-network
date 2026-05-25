import Link from "next/link";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Constellation } from "@/components/Constellation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_URL ?? "https://agora-network.vercel.app";

const HOME_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AGORA",
  alternateName: "AGORA — The open database of the world's communities",
  url: SITE_URL,
  description:
    "AGORA collects every community on Earth into one open atlas — and helps you find where you belong. Built by Stark Technologies.",
  publisher: {
    "@type": "Organization",
    name: "Stark Technologies",
  },
};

export default function Home() {
  return (
    <main id="main-content" className="relative min-h-screen overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_JSONLD) }}
      />
      {/* Background visualization */}
      <div className="absolute inset-0 pointer-events-none">
        <Constellation />
        <div className="absolute inset-0 bg-gradient-to-b from-olive-black/30 via-olive-black/60 to-olive-black" />
      </div>

      <div className="relative z-30">
        <Header />
      </div>

      {/* Hero */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-12 pb-24 sm:pt-24 text-center">
        <p className="fade-up text-[10px] sm:text-[12px] tracking-[0.28em] sm:tracking-[0.35em] text-athena-bronze/90 uppercase mb-8 kicker-tight">
          Stark Technologies · Coming Q4 2026
        </p>

        <h1 className="fade-up-delay-1 font-serif font-medium balance-ja leading-[1.2] text-[28px] sm:text-[44px] md:text-[56px] lg:text-[68px] tracking-tight text-marble-white">
          <span className="block">世界中のコミュニティを、</span>
          <span className="block text-athena-bronze">ここに。</span>
        </h1>

        <div className="fade-up-delay-2 mt-10 h-px bg-marble-white/15 max-w-md mx-auto draw-in" />

        <p className="fade-up-delay-2 mt-10 text-balance text-[16px] sm:text-[18px] text-marble-white/75 leading-relaxed max-w-2xl mx-auto">
          AGORA は、世界中のコミュニティと人的紐帯のオープン・データベースです。
          人類が築いてきた<strong className="text-marble-white">つながりそのもの</strong>を、集合知でひとつの地図に集めます。
          <br className="hidden sm:block" />
          地球上のあらゆるコミュニティを発見し、参加し、構築できる「人類のメタ接続層」になります。
        </p>

        {/* Waitlist */}
        <div className="mt-12">
          <WaitlistForm />
        </div>

        {/* Three Questions — Pillars の前に「自分への問い」を立てさせる */}
        <div className="mt-24 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8" aria-hidden>
            <span className="flex-1 max-w-[60px] h-px bg-marble-white/15" />
            <span className="w-1 h-1 rounded-full bg-athena-bronze/60" />
            <span className="flex-1 max-w-[60px] h-px bg-marble-white/15" />
          </div>
          <ol className="space-y-7 text-center">
            {QUESTIONS.map((q, i) => (
              <li key={i}>
                <p className="font-serif text-[20px] sm:text-[22px] md:text-[24px] text-marble-white/90 leading-snug balance-ja">
                  {q.main}
                </p>
                <p className="mt-2 text-[12px] sm:text-[13px] text-marble-white/45 leading-relaxed balance-ja">
                  {q.sub}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Pillars */}
        <div className="fade-up-delay-4 mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="group relative border border-marble-white/10 rounded-lg p-6 bg-marble-white/[0.02] hover:bg-marble-white/[0.04] hover:border-athena-bronze/35 hover:-translate-y-1 hover:shadow-[0_12px_32px_-16px_rgba(184,152,112,0.45)] transition-all duration-200 ease-out"
            >
              <span
                aria-hidden
                className="absolute top-5 right-5 font-serif text-[28px] text-athena-bronze/30 group-hover:text-athena-bronze/55 transition"
              >
                {p.numeral}
              </span>
              <div className="text-[10px] tracking-[0.28em] text-athena-bronze/90 uppercase mb-3 kicker-tight">
                {p.kicker}
              </div>
              <h3 className="font-serif text-[19px] md:text-[20px] text-marble-white mb-3 balance-ja leading-snug pr-8">
                {p.title}
              </h3>
              <p className="text-[13px] text-marble-white/65 leading-relaxed mb-4">
                {p.body}
              </p>
              <div className="pt-3 border-t border-marble-white/10 flex items-baseline gap-2 text-[11px] mb-3">
                <span aria-hidden className="text-athena-bronze/80">✦</span>
                <span className="text-marble-white/55 leading-snug">{p.commitment}</span>
              </div>
              <Link
                href={p.chapter.href}
                className="inline-flex items-center gap-1 text-[11px] text-marble-white/45 hover:text-athena-bronze transition tracking-wide"
              >
                <span aria-hidden className="text-marble-white/30">↳</span>
                {p.chapter.label} を読む
              </Link>
            </div>
          ))}
        </div>

        {/* 10年後の地図 — 大胆なビジョン宣言 */}
        <div className="mt-28 max-w-4xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] text-athena-bronze/85 uppercase mb-3 text-center kicker-tight">
            Vision · 2036
          </p>
          <h2 className="font-serif text-[24px] sm:text-[30px] md:text-[36px] leading-[1.25] tracking-tight text-marble-white text-center mb-12 balance-ja">
            <span className="block">10 年後、AGORA は</span>
            <span className="block text-athena-bronze">人類のメタ接続層になる。</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 text-center">
            {VISION_METRICS.map((m) => (
              <div key={m.label} className="border-l border-marble-white/15 pl-4 text-left">
                <p className="font-serif text-[22px] sm:text-[26px] md:text-[28px] text-marble-white leading-none mb-2 tabular-nums">
                  {m.value}
                </p>
                <p className="text-[10px] tracking-[0.18em] text-athena-bronze/80 uppercase mb-1.5">
                  {m.unit}
                </p>
                <p className="text-[12px] text-marble-white/55 leading-snug">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-[12px] text-marble-white/40 leading-relaxed max-w-md mx-auto">
            国境を越える共同創業・婚姻・市民権取得が、AGORA 経由で日常的に成立する未来。
            <br />
            これは <span className="text-marble-white/70">未踏のインフラ</span> である。
          </p>
        </div>

        {/* Lineage — 思想の根を強調する碑文（inscription）風 */}
        <div className="mt-28 max-w-2xl mx-auto text-center">
          {/* オーナメント: 細い水平ライン + ブロンズの点 */}
          <div className="flex items-center justify-center gap-3 mb-8" aria-hidden>
            <span className="flex-1 max-w-[80px] h-px bg-marble-white/15" />
            <span className="w-1.5 h-1.5 rounded-full bg-athena-bronze/60" />
            <span className="flex-1 max-w-[80px] h-px bg-marble-white/15" />
          </div>
          <p className="text-[10px] tracking-[0.4em] text-athena-bronze/85 uppercase mb-6 kicker-tight">
            Lineage · ἀγορά
          </p>
          <blockquote className="font-serif text-[16px] sm:text-[18px] text-marble-white/85 leading-[1.85] italic">
            「広場 (<span className="not-italic">agora</span>) ── 市民が集い、議論し、商取引し、出会いを生んだ場所」
          </blockquote>
          <p className="mt-6 text-[12px] tracking-wider text-marble-white/40 uppercase">
            Ancient Greek city-state, 7th c. BCE
          </p>
          <p className="mt-10 text-[13px] sm:text-[14px] text-marble-white/65 leading-relaxed balance-ja">
            私たちはその名を借りて、
            <em className="not-italic text-marble-white/85 font-medium">人類のあらゆるコミュニティが交わる広場</em>
            をインターネット上に建てます。
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

const VISION_METRICS = [
  { value: "1,000万", unit: "Communities", label: "地図に描かれるコミュニティ数" },
  { value: "1億", unit: "Monthly Active", label: "月間アクティブユーザー" },
  { value: "1,000億", unit: "JPY", label: "想定時価総額（事業売却基準）" },
  { value: "0", unit: "Ad Revenue", label: "広告収益（終生不参入）" },
];

const QUESTIONS = [
  {
    main: "あなたはどこに、属しているか？",
    sub: "「いる場所」と「属している場所」は違う。",
  },
  {
    main: "あなたが本当に出会うべき場所は、どこか？",
    sub: "意見を交わし、出会いを生む場所は、もう日常にあるか？",
  },
  {
    main: "あなたのデータは、誰のものか？",
    sub: "あなたが築いた関係は、なぜ他人の資産になるべきなのか？",
  },
];

const PILLARS = [
  {
    numeral: "I",
    kicker: "Discover",
    title: "あらゆる広場を、ひとつの地図に",
    body: "デジタル都市国家、DAO、研究室、地縁団体、ファンダム ── 種類を問わず、世界中のコミュニティを横断的に検索・発見できます。",
    commitment: "16種のコミュニティ・タイプを横断する単一の地図",
    chapter: { label: "Manifesto IV", href: "/manifesto#the-map" },
  },
  {
    numeral: "II",
    kicker: "Connect",
    title: "あなたが属すべき場所",
    body: "説明可能なAIが、あなたの所属・関心・つながりから「次に出会うべき場所と人」を提案します。理由は常に開示されます。",
    commitment: "推薦理由を100%開示。ブラックボックス推薦は採用しません",
    chapter: { label: "Manifesto III", href: "/manifesto#irreducible" },
  },
  {
    numeral: "III",
    kicker: "Sovereign",
    title: "あなたのデータは、あなたのもの",
    body: "広告は配信しません。データは常時エクスポート可能、削除リクエストは30日以内に物理削除。AGORA に閉じ込めません。",
    commitment: "削除リクエストは30日以内に物理削除。広告は終生ゼロ",
    chapter: { label: "Manifesto V", href: "/manifesto#absolutes" },
  },
];
