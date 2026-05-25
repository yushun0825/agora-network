import Link from "next/link";
import { ManifestoTOC } from "@/components/ManifestoTOC";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Manifesto",
  description: "Why we are building AGORA — the open database of the world's communities.",
};

const SITE_URL = process.env.NEXT_PUBLIC_URL ?? "https://agora-network.vercel.app";

const SECTIONS = [
  { id: "info-shift", title: "情報化は完了しつつある" },
  { id: "relationships", title: "人間関係も、その途上にある" },
  { id: "irreducible", title: "人間は人間関係から逃れられない" },
  { id: "the-map", title: "AGORA は、その問いに答える地図である" },
  { id: "absolutes", title: "私たちが絶対にしないこと" },
  { id: "decade", title: "私たちが目指す10年後" },
  { id: "join", title: "参加するには" },
];

export default function ManifestoPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <Header />

      <div className="max-w-3xl lg:max-w-5xl mx-auto px-6 py-16 sm:py-24 grid lg:grid-cols-[auto_1fr] lg:gap-12">
        {/* Sticky TOC (desktop only) — scroll-spy 連動 */}
        <ManifestoTOC sections={SECTIONS} />

        <article>
          <p className="text-[10px] sm:text-[11px] tracking-[0.28em] sm:tracking-[0.35em] text-athena-bronze/90 uppercase mb-6 kicker-tight">
            AGORA · Manifesto v0
          </p>
          <h1 className="font-serif text-[26px] sm:text-[36px] md:text-[44px] leading-[1.22] tracking-tight text-marble-white mb-12 balance-ja max-w-[720px]">
            <span className="block">人類は土地ではなく、</span>
            <span className="block">思想と関係で繋がる時代に入った。</span>
          </h1>

          <Section id="info-shift" title="情報化は完了しつつある">
            <P>
              現金は、クレジットカードに置き換わり、キャッシュレスとなり、いまや
              デジタル通貨として中央銀行が発行する直前まで来ている。
              紙の権利書は登記DXに置き換わり、株券は完全に電子化され、
              身分証明はマイナンバーから分散型ID（DID）へと進化しつつある。
            </P>
            <P>
              <strong>あらゆる価値は、情報空間に移行した。</strong>
            </P>
          </Section>

          <Section id="relationships" title="人間関係も、その途上にある">
            <P>
              地縁・血縁という、引っ越せば消えてしまう緩い紐帯。
              学校・職場という、卒業・退職で薄れていく関係。
              それらは LinkedIn、Facebook、Discord、マッチングアプリと、
              個別に情報化されつつある。
            </P>
            <P>
              だが、<em>コミュニティそのもの</em> ── 人々が集う「場」の全体地図は、
              まだ誰も描いていない。
            </P>
          </Section>

          <Section id="irreducible" title="人間は人間関係から逃れられない">
            <P>
              技術がどれだけ進歩しても、人類は孤独では存続できない。
              情報化が進めば進むほど、
              「自分はどこに属すべきか」「誰と繋がるべきか」という問いは
              むしろ切実になる。
            </P>
            <P>
              SNSの隆盛、宗教的回帰、デジタル都市国家の勃興、ファンダムの巨大化 ──
              これらはすべて、その問いへの異なる応答である。
            </P>
          </Section>

          <Divider />

          <Section id="the-map" title="AGORA は、その問いに答える地図である">
            <P>
              私たちが作っているのは、<strong>世界中のコミュニティのオープン・データベース</strong>である。
              人類はかつて「知識」を集合知で地図化することに成功した。
              AGORA は今、<strong>「人と関係そのもの」</strong> を集合知で地図化する。
            </P>
            <P>
              個々のコミュニティが「一つの居場所」を建てるならば、
              AGORA は「あらゆる居場所が交わる広場」を建てる。
              私たちは個別のコミュニティと競合せず、その上位にメタ層として立つ。
            </P>
          </Section>

          <Section id="absolutes" title="私たちが絶対にしないこと">
            <ul className="list-disc list-outside pl-6 space-y-3 text-marble-white/80 leading-relaxed">
              <li>広告ビジネスに参入しない。ユーザーは商品ではない。</li>
              <li>滞在時間最大化を目指さない。エンゲージメント中毒は人類を不幸にする。</li>
              <li>データを抱え込まない。エクスポートは常時可能、削除は30日で物理消去。</li>
              <li>クローズドなアルゴリズムを使わない。推薦は説明可能・調整可能。</li>
              <li>特定の国家・大企業・宗教団体に独占的アクセスを与えない。</li>
            </ul>
          </Section>

          <Section id="decade" title="私たちが目指す10年後">
            <P>
              月間 1億人 の AGORA 利用者。
              1,000万 のコミュニティが地図に描かれる。
              国家・自治体・大学・企業が一次情報源として参照する。
              国境を越える共同創業・婚姻・市民権取得が、AGORA 経由で日常的に成立する。
            </P>
            <blockquote className="my-6 border-l-2 border-athena-bronze pl-5 sm:pl-6 py-2">
              <p className="font-serif text-[20px] sm:text-[22px] md:text-[24px] text-marble-white leading-snug balance-ja">
                これは <span className="text-athena-bronze">人類のメタ接続層</span> となる、
                <br className="hidden sm:block" />
                未踏のインフラである。
              </p>
            </blockquote>
          </Section>

          <Divider />

          <Section id="join" title="参加するには">
            <div className="relative mt-2 rounded-lg border border-athena-bronze/30 bg-gradient-to-br from-athena-bronze/[0.06] to-transparent p-6 sm:p-8">
              <p className="text-[12px] uppercase tracking-[0.25em] text-athena-bronze/85 mb-4">
                これを最後まで読んだあなたへ
              </p>
              <p className="text-[16px] sm:text-[17px] text-marble-white leading-relaxed mb-3 balance-ja">
                最初の <strong className="text-athena-bronze font-medium">500 名</strong> と一緒に、AGORA の最初のコミュニティ群を地図に描きます。
              </p>
              <p className="text-[13px] text-marble-white/65 leading-relaxed mb-6">
                2026 年 Q4 にクローズド β を開始、12 月に世界へ公開予定。
                招待リストに登録すると、コミュニティ登録権・編集権・関係追加権が優先的に付与されます。
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="inline-block bg-athena-bronze text-olive-black font-medium rounded-md px-5 py-3 text-[14px] tracking-wide hover:bg-athena-bronze/90 transition"
                >
                  招待リストに登録する →
                </Link>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    "AGORA — 世界中のコミュニティをひとつの地図にする試み。広告ゼロ。データ主権はあなたのもの。",
                  )}&url=${encodeURIComponent(`${SITE_URL}/manifesto`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-marble-white/20 rounded-md px-5 py-3 text-[14px] text-marble-white/80 hover:bg-marble-white/[0.04] hover:text-marble-white transition"
                >
                  𝕏 で思想を広める
                </a>
              </div>
              <div className="mt-5 pt-5 border-t border-marble-white/10">
                <Link
                  href="/preview"
                  className="text-[12px] text-marble-white/55 hover:text-marble-white/85 transition"
                >
                  まずは <span className="text-athena-bronze underline underline-offset-2">67 件のシードコミュニティ</span> をプレビューで見る →
                </Link>
              </div>
            </div>
          </Section>

          <div className="mt-20 pt-8 border-t border-marble-white/10 text-[12px] text-marble-white/40">
            <p>― Stark Technologies / 2026-05-15 / Tokyo</p>
            <p className="mt-1">v0 — フィードバックは歓迎します。v1 で6項目を更新予定。</p>
          </div>
        </article>
      </div>

      <Footer />
    </main>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-12 scroll-mt-24">
      <h2 className="group font-serif text-[24px] sm:text-[28px] text-marble-white mb-4 tracking-tight flex items-baseline gap-3 balance-ja leading-snug">
        <span>{title}</span>
        <a
          href={`#${id}`}
          aria-label={`Link to ${title}`}
          className="text-marble-white/0 group-hover:text-marble-white/40 transition text-[14px] no-underline"
        >
          #
        </a>
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] sm:text-[16px] text-marble-white/85 leading-relaxed">{children}</p>
  );
}

function Divider() {
  return (
    <div className="my-12 flex items-center gap-4">
      <div className="flex-1 h-px bg-marble-white/15" />
      <div
        aria-hidden
        className="w-1.5 h-1.5 rounded-full bg-athena-bronze opacity-70"
      />
      <div className="flex-1 h-px bg-marble-white/15" />
    </div>
  );
}
