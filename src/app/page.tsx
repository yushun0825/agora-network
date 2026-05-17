import Link from "next/link";
import { Logo } from "@/components/Logo";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Constellation } from "@/components/Constellation";

const SITE_URL = process.env.NEXT_PUBLIC_URL ?? "https://agora-network.vercel.app";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background visualization */}
      <div className="absolute inset-0 pointer-events-none">
        <Constellation />
        <div className="absolute inset-0 bg-gradient-to-b from-olive-black/30 via-olive-black/60 to-olive-black" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-6">
        <Logo size={28} />
        <nav className="flex items-center gap-5 text-[13px] text-marble-white/70">
          <Link href="/manifesto" className="hover:text-marble-white transition">
            Manifesto
          </Link>
          <Link href="/preview" className="hover:text-marble-white transition">
            Preview
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pt-12 pb-24 sm:pt-24 text-center">
        <p className="fade-up text-[11px] sm:text-[12px] tracking-[0.35em] text-athena-bronze/90 uppercase mb-8">
          Stark Technologies · Coming Q4 2026
        </p>

        <h1 className="fade-up-delay-1 font-serif font-medium text-balance leading-[1.05] text-[42px] sm:text-[64px] md:text-[80px] tracking-tight text-marble-white">
          世界中のコミュニティを、
          <br />
          <span className="text-athena-bronze">ここに。</span>
        </h1>

        <div className="fade-up-delay-2 mt-10 h-px bg-marble-white/15 max-w-md mx-auto draw-in" />

        <p className="fade-up-delay-2 mt-10 text-balance text-[16px] sm:text-[18px] text-marble-white/75 leading-relaxed max-w-2xl mx-auto">
          AGORA は、世界中のコミュニティと人的紐帯のオープン・データベースです。
          Wikipedia が知識を集約したように、AGORA は<strong className="text-marble-white">つながりそのもの</strong>を集約します。
          <br className="hidden sm:block" />
          地球上のあらゆるコミュニティを発見し、参加し、構築できる「人類のメタ接続層」になります。
        </p>

        {/* Waitlist */}
        <div className="mt-12">
          <WaitlistForm />
        </div>

        {/* Pillars */}
        <div className="fade-up-delay-4 mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-3xl mx-auto">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="border border-marble-white/10 rounded-lg p-5 bg-marble-white/[0.02]"
            >
              <div className="text-[11px] tracking-[0.2em] text-athena-bronze/90 uppercase mb-2">
                {p.kicker}
              </div>
              <h3 className="font-serif text-[20px] text-marble-white mb-2">{p.title}</h3>
              <p className="text-[13px] text-marble-white/65 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        {/* Lineage */}
        <div className="mt-24 text-[12px] text-marble-white/45 leading-relaxed max-w-xl mx-auto">
          <p className="mb-2 tracking-[0.2em] text-marble-white/60 uppercase">Lineage</p>
          <p>
            古代ギリシャ都市国家の「広場（agora）」── 市民が集い、議論し、商取引し、出会いを生んだ場所。
            <br />
            私たちはその名を借りて、<em className="not-italic text-marble-white/70">人類のあらゆるコミュニティが交わる広場</em> をインターネット上に建てます。
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-marble-white/10 px-6 sm:px-10 py-8 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-marble-white/50">
          <div className="flex items-center gap-3">
            <Logo size={18} showWordmark={false} />
            <span>AGORA · A project of Stark Technologies</span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={`${SITE_URL}/manifesto`}
              className="hover:text-marble-white transition"
            >
              Manifesto
            </a>
            <a
              href={`${SITE_URL}/preview`}
              className="hover:text-marble-white transition"
            >
              Preview
            </a>
            <span className="text-marble-white/30">© 2026</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

const PILLARS = [
  {
    kicker: "I. Discover",
    title: "あらゆる広場を、ひとつの地図に",
    body: "デジタル都市国家、DAO、研究室、地縁団体、ファンダム ── 種類を問わず、世界中のコミュニティを横断的に検索・発見できます。",
  },
  {
    kicker: "II. Connect",
    title: "あなたが属すべき場所",
    body: "説明可能なAIが、あなたの所属・関心・つながりから「次に出会うべき場所と人」を提案します。理由は常に開示されます。",
  },
  {
    kicker: "III. Sovereign",
    title: "あなたのデータは、あなたのもの",
    body: "広告は配信しません。データは常時エクスポート可能、削除リクエストは30日以内に物理削除。AGORA に閉じ込めません。",
  },
];
