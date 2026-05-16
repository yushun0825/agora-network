import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import { SEED_COMMUNITIES, getById } from "@/lib/seed-data";
import { TYPE_LABEL } from "@/lib/community-labels";

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
  return {
    title: `${c.name} · AGORA`,
    description: desc,
    openGraph: {
      title: `${c.name} · AGORA`,
      description: desc,
      type: "article",
      url: `${SITE_URL}/c/${c.id}`,
      images: [`${SITE_URL}/og-image.svg`],
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

  return (
    <main className="min-h-screen">
      <header className="flex items-center justify-between px-6 sm:px-10 py-6 border-b border-marble-white/10">
        <Link href="/" className="block">
          <Logo size={26} />
        </Link>
        <nav className="flex items-center gap-5 text-[13px] text-marble-white/70">
          <Link href="/preview" className="hover:text-marble-white transition">
            ← 検索に戻る
          </Link>
          <Link href="/manifesto" className="hover:text-marble-white transition">
            Manifesto
          </Link>
        </nav>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-12 sm:py-16">
        <div className="mb-8">
          <Link
            href="/preview"
            className="text-[12px] text-marble-white/50 hover:text-marble-white/80 transition"
          >
            ← 全コミュニティ
          </Link>
        </div>

        <p className="text-[11px] tracking-[0.3em] text-athena-bronze/90 uppercase mb-3">
          {TYPE_LABEL[community.type]}
          {community.foundedYear && ` · since ${community.foundedYear}`}
        </p>
        <h1 className="font-serif text-[36px] sm:text-[52px] leading-[1.1] tracking-tight text-marble-white text-balance mb-6">
          {community.name}
        </h1>

        <p className="text-[16px] sm:text-[18px] text-marble-white/85 leading-relaxed mb-10">
          {community.description}
        </p>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-[13px] mb-10 border-t border-b border-marble-white/10 py-6">
          {community.location && (
            <Row label="場所">{community.location}</Row>
          )}
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

        {/* 関係（Connection）はユーザーが作るもの。プリシードしない。 */}
        <div className="mb-12 border border-dashed border-marble-white/15 rounded-md p-6 text-center">
          <p className="text-[11px] uppercase tracking-wider text-marble-white/45 mb-2">
            関連コミュニティ
          </p>
          <p className="text-[14px] text-marble-white/70 leading-relaxed">
            関連コミュニティは、まだ誰も登録していません。
          </p>
          <p className="text-[13px] text-marble-white/50 leading-relaxed mt-2">
            AGORA では、コミュニティ間の関係は登録ユーザーが根拠（Evidence）と共に追加します。
            <br />
            私たちは関係を勝手に作りません。
          </p>
          <Link
            href="/"
            className="inline-block mt-4 text-[13px] bg-athena-bronze text-olive-black font-medium rounded-md px-4 py-2 hover:bg-athena-bronze/90 transition"
          >
            関係を追加できる権利を請求 →
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-marble-white/10">
          <p className="text-[11px] uppercase tracking-wider text-marble-white/45 mb-3">
            この情報は正しいですか？
          </p>
          <p className="text-[13px] text-marble-white/60 leading-relaxed mb-5">
            AGORA は誰もが編集できる Wikipedia 型のオープンデータベースを目指しています。
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
          <p className="mt-1">
            URL: <span className="font-mono text-marble-white/55">{shareUrl}</span>
          </p>
        </div>
      </article>
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
