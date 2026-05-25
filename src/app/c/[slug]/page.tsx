import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CopyUrlButton } from "@/components/CopyUrlButton";
import { SEED_COMMUNITIES, getById } from "@/lib/seed-data";
import { TYPE_LABEL, TYPE_COLOR } from "@/lib/community-labels";

const SITE_URL = process.env.NEXT_PUBLIC_URL ?? "https://agora-network.vercel.app";

export function generateStaticParams() {
  return SEED_COMMUNITIES.map((c) => ({ slug: c.id }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const c = getById(params.slug);
  if (!c) return { title: "Not Found" };
  const desc = `${c.description} — AGORA で${c.name}を見る。`;
  // 画像は同ディレクトリの opengraph-image.tsx が自動的に注入されるため、
  // ここでは明示的に images を指定しない。
  return {
    title: `${c.name} · AGORA`,
    description: desc,
    openGraph: {
      title: `${c.name} · AGORA`,
      description: desc,
      type: "article",
      url: `${SITE_URL}/c/${c.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${c.name} · AGORA`,
      description: desc,
    },
    alternates: { canonical: `${SITE_URL}/c/${c.id}` },
  };
}

export default function CommunityPage({ params }: { params: { slug: string } }) {
  const community = getById(params.slug);
  if (!community) notFound();

  const shareUrl = `${SITE_URL}/c/${community.id}`;
  const shareText = `${community.name} · AGORA — ${community.description}`;
  const tweetIntent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText,
  )}&url=${encodeURIComponent(shareUrl)}`;

  // 同 type の他のコミュニティ（discovery 用、 user-generated relation ではない）
  const sameType = SEED_COMMUNITIES.filter(
    (c) => c.type === community.type && c.id !== community.id,
  ).slice(0, 6);

  // schema.org の Organization 型として表現。広く解釈可能で、検索エンジンに「コミュニティ実体」を伝える
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: community.name,
    description: community.description,
    url: community.homepage ?? shareUrl,
    ...(community.foundedYear && { foundingDate: String(community.foundedYear) }),
    ...(community.location && { location: { "@type": "Place", name: community.location } }),
    ...(community.memberEstimate && {
      numberOfEmployees: { "@type": "QuantitativeValue", value: community.memberEstimate },
    }),
    sameAs: [shareUrl, ...(community.homepage ? [community.homepage] : [])],
    isPartOf: {
      "@type": "WebSite",
      name: "AGORA",
      url: SITE_URL,
    },
  };

  return (
    <main id="main-content" className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header
        nav={[
          { href: "/preview", label: "← 検索に戻る" },
          { href: "/manifesto", label: "Manifesto" },
        ]}
      />

      <article className="max-w-3xl mx-auto px-6 py-12 sm:py-16">
        <div className="mb-8">
          <Link
            href="/preview"
            className="text-[12px] text-marble-white/50 hover:text-marble-white/80 transition"
          >
            ← 全コミュニティ
          </Link>
        </div>

        <p className="text-[10px] sm:text-[11px] tracking-[0.24em] sm:tracking-[0.3em] text-athena-bronze/90 uppercase mb-3 kicker-tight">
          {TYPE_LABEL[community.type]}
          {community.foundedYear && ` · since ${community.foundedYear}`}
        </p>
        <h1 className="font-serif text-[26px] sm:text-[36px] md:text-[44px] lg:text-[52px] leading-[1.18] tracking-tight text-marble-white balance-ja mb-6">
          {community.name}
        </h1>

        <p className="text-[16px] sm:text-[18px] text-marble-white/85 leading-relaxed mb-6">
          {community.description}
        </p>

        {community.homepage && (
          <div className="mb-10">
            <a
              href={community.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] text-athena-bronze border border-athena-bronze/40 rounded-md px-4 py-2 hover:bg-athena-bronze/10 hover:border-athena-bronze/60 transition"
            >
              公式サイトを訪れる
              <span aria-hidden>↗</span>
            </a>
          </div>
        )}

        {/* 出典 / Evidence — AGORA は根拠で立つ。シードの出所を必ず明示する */}
        <aside className="mb-10 border-l-2 border-athena-bronze/40 pl-4 py-1 text-[12px] text-marble-white/55 leading-relaxed">
          <p className="uppercase tracking-wider text-[10px] text-athena-bronze/80 mb-1.5">
            このページの出典
          </p>
          <p>
            公開情報のみで構成された AGORA のシードです。
            {community.homepage && (
              <>
                {" "}主な出典:{" "}
                <a
                  href={community.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-marble-white/75 hover:text-marble-white underline underline-offset-2 break-all"
                >
                  {community.homepage.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </a>
                。
              </>
            )}{" "}
            <span className="text-marble-white/40">
              AGORA 公開後は、根拠（Evidence）と共に誰でも編集できます。
            </span>
          </p>
        </aside>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-[13px] mb-10 border-t border-b border-marble-white/10 py-6">
          {community.location && <Row label="場所">{community.location}</Row>}
          {community.memberEstimate && (
            <Row label="推定構成員">
              {community.memberEstimate.toLocaleString()} 名
            </Row>
          )}
          {community.foundedYear && (
            <Row label="設立">{community.foundedYear}</Row>
          )}
          {community.homepage && (
            <Row label="HP">
              <a
                href={community.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-athena-bronze hover:underline break-all"
              >
                {community.homepage.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </a>
            </Row>
          )}
        </dl>

        <div className="mb-10">
          <p className="text-[11px] uppercase tracking-wider text-marble-white/45 mb-3">
            タグ
          </p>
          <div className="flex flex-wrap gap-1.5">
            {community.tags.map((t) => (
              <Link
                key={t}
                href={`/preview?tag=${encodeURIComponent(t)}`}
                className="text-[11px] px-2.5 py-1 rounded border border-marble-white/15 text-marble-white/65 hover:bg-marble-white/[0.04] hover:text-marble-white transition"
              >
                #{t}
              </Link>
            ))}
          </div>
        </div>

        {/* コミュニティ間の関係 — プリシードしない。ユーザーが根拠と共に追加する */}
        <section className="mb-12 border border-dashed border-marble-white/15 rounded-md p-6">
          <p className="text-[11px] uppercase tracking-wider text-marble-white/45 mb-3 text-center">
            このコミュニティが繋がっている場所
          </p>
          <p className="text-[14px] text-marble-white/75 leading-relaxed text-center">
            まだ誰も関係（Evidence）を描いていません。
          </p>
          <p className="text-[12px] text-marble-white/45 leading-relaxed mt-3 text-center max-w-md mx-auto">
            AGORA はあなたが描いた「繋がり」を根拠と共に未来へ残します。
            運営はコミュニティ間の関係を勝手に作りません。
          </p>
          <div className="text-center mt-5">
            <Link
              href="/"
              className="inline-block text-[13px] bg-athena-bronze text-olive-black font-medium rounded-md px-4 py-2 hover:bg-athena-bronze/90 transition"
            >
              関係を追加できる権利を請求 →
            </Link>
          </div>
        </section>

        {/* 同 type の他のコミュニティ — 純粋に type-based discovery (relation ではない) */}
        {sameType.length > 0 && (
          <section className="mb-12">
            <div className="flex items-baseline justify-between mb-4">
              <p className="text-[11px] uppercase tracking-wider text-marble-white/45">
                同じ {TYPE_LABEL[community.type]} のコミュニティ
              </p>
              <Link
                href={`/preview?type=${community.type}`}
                className="text-[11px] text-marble-white/55 hover:text-marble-white transition"
              >
                すべて見る →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sameType.map((c) => (
                <Link
                  key={c.id}
                  href={`/c/${c.id}`}
                  className="group flex items-start gap-3 border border-marble-white/10 rounded-md px-3 py-2.5 hover:bg-marble-white/[0.04] hover:border-athena-bronze/30 transition"
                >
                  <span
                    aria-hidden
                    className="mt-2 inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: TYPE_COLOR[c.type], opacity: 0.85 }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] text-marble-white truncate group-hover:text-athena-bronze transition">
                      {c.name}
                    </div>
                    <div className="text-[11px] text-marble-white/45 truncate">
                      {c.location ?? c.description.slice(0, 40)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-marble-white/35 leading-relaxed">
              ※ これは type による分類です。コミュニティ間の<em className="not-italic text-marble-white/55">関係</em>は AGORA 公開後、ユーザーが Evidence と共に描き加えます。
            </p>
          </section>
        )}

        {/* AGORA でこのページにできること — 公開後の機能予告 */}
        <section className="mb-12">
          <p className="text-[11px] uppercase tracking-wider text-marble-white/45 mb-4">
            AGORA 公開時、あなたはこのページで
          </p>
          <ul className="space-y-3 text-[13px]">
            <FutureAction label="編集">
              説明・タグ・出典を更新できる。すべての編集は根拠（Evidence）必須。
            </FutureAction>
            <FutureAction label="関係を描く">
              このコミュニティと他のコミュニティの繋がりを、根拠と共に登録できる。
            </FutureAction>
            <FutureAction label="購読">
              情報が更新されたら通知を受け取る。広告は配信しません。
            </FutureAction>
            <FutureAction label="同名異物の解決">
              同じ名前で呼ばれる別のコミュニティが現れたとき、AGORA は両者を区別して提示します。
            </FutureAction>
          </ul>
        </section>

        <div className="mt-12 pt-8 border-t border-marble-white/10">
          <p className="text-[11px] uppercase tracking-wider text-marble-white/45 mb-3">
            この情報は正しいですか？
          </p>
          <p className="text-[13px] text-marble-white/60 leading-relaxed mb-5">
            AGORA は誰もが編集できるオープン・データベースです。
            ローンチ後は、根拠（Evidence）と共に誰でも更新できるようになります。
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={tweetIntent}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] border border-marble-white/15 rounded-md px-4 py-2 text-marble-white/80 hover:bg-marble-white/[0.04] hover:text-marble-white transition"
            >
              𝕏 で共有
            </a>
            <Link
              href="/"
              className="text-[13px] bg-athena-bronze text-olive-black font-medium rounded-md px-4 py-2 hover:bg-athena-bronze/90 transition"
            >
              編集権を待機リストで請求 →
            </Link>
          </div>
        </div>

        <div className="mt-16 text-[11px] text-marble-white/40">
          <p>AGORA · {community.name}</p>
          <p className="mt-1 flex flex-wrap items-center gap-2">
            <span>URL:</span>
            <span className="font-mono text-marble-white/55 break-all">{shareUrl}</span>
            <CopyUrlButton url={shareUrl} />
          </p>
        </div>
      </article>

      <Footer />
    </main>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-marble-white/45 mb-1">{label}</dt>
      <dd className="text-marble-white/85">{children}</dd>
    </div>
  );
}

function FutureAction({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3 items-baseline">
      <span className="flex-shrink-0 text-[10px] tracking-[0.2em] uppercase text-athena-bronze/85 border border-athena-bronze/30 rounded px-2 py-0.5 mt-0.5">
        {label}
      </span>
      <span className="text-marble-white/75 leading-relaxed">{children}</span>
    </li>
  );
}
