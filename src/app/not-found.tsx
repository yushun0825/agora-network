import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "まだ地図に描かれていません",
  description: "AGORA がまだ知らない場所です。",
};

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen flex flex-col">
      <Header />

      <section className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-xl text-center">
          {/* 「未描画の点」を示すミニマルなSVGマーク */}
          <svg
            aria-hidden
            width="56"
            height="56"
            viewBox="-30 -30 60 60"
            className="mx-auto mb-8"
          >
            <circle
              cx={0}
              cy={0}
              r={22}
              fill="none"
              stroke="#B89870"
              strokeOpacity="0.3"
              strokeWidth="0.6"
              strokeDasharray="2 3"
            />
            <circle cx={0} cy={0} r={2.2} fill="#B89870" opacity="0.6" />
          </svg>

          <p className="text-[11px] tracking-[0.35em] text-athena-bronze/85 uppercase mb-5 kicker-tight">
            404 · Uncharted
          </p>
          <h1 className="font-serif text-[32px] sm:text-[40px] md:text-[48px] leading-[1.2] tracking-tight text-marble-white balance-ja mb-6">
            <span className="block">まだこの地図には、</span>
            <span className="block text-athena-bronze">描かれていません。</span>
          </h1>
          <p className="text-[14px] sm:text-[15px] text-marble-white/70 leading-relaxed mb-10 balance-ja">
            あなたが探している場所は、AGORA にまだ登録されていないか、
            URL が変更された可能性があります。
            <br className="hidden sm:block" />
            AGORA 公開後は、誰でも新しいコミュニティを地図に描き加えることができます。
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/preview"
              className="text-[13px] bg-athena-bronze text-olive-black font-medium rounded-md px-5 py-2.5 hover:bg-athena-bronze/90 transition"
            >
              全コミュニティを見る →
            </Link>
            <Link
              href="/"
              className="text-[13px] border border-marble-white/20 rounded-md px-5 py-2.5 text-marble-white/80 hover:bg-marble-white/[0.04] hover:text-marble-white transition"
            >
              ホームへ戻る
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-marble-white/10 text-[11px] text-marble-white/40 leading-relaxed">
            <p>
              AGORA は誰もが編集できるオープン・データベースです。
              <br />
              新しいコミュニティの登録は{" "}
              <Link
                href="/"
                className="text-marble-white/65 underline underline-offset-2 hover:text-marble-white transition"
              >
                招待リスト
              </Link>{" "}
              からリクエストできます。
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
