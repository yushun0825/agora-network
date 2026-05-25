"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "ok" | "error";

const SITE_URL = process.env.NEXT_PUBLIC_URL ?? "https://agora-network.vercel.app";
const SHARE_TEXT =
  "AGORA — 世界中のコミュニティをひとつの地図にする試み。広告ゼロ。データ主権はあなたのもの。";
const SHARE_INTENT = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
  SHARE_TEXT,
)}&url=${encodeURIComponent(SITE_URL)}`;

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok?: boolean; message?: string };
      if (res.ok && data.ok) {
        setStatus("ok");
        setMessage(data.message ?? "");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message ?? "登録に失敗しました。");
      }
    } catch {
      setStatus("error");
      setMessage("通信エラー。少し時間をおいて再度お試しください。");
    }
  }

  // 成功時は form を完全に置き換え、儀式的なカードに切り替える
  if (status === "ok") {
    return (
      <div className="w-full max-w-md mx-auto fade-up-delay-3 rounded-lg border border-athena-bronze/40 bg-gradient-to-br from-athena-bronze/[0.08] to-transparent p-6 text-center">
        <div
          aria-hidden
          className="inline-flex items-center justify-center w-10 h-10 mb-4 rounded-full border border-athena-bronze/50 text-athena-bronze text-[18px]"
        >
          ✓
        </div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-athena-bronze/90 mb-3">
          登録ありがとうございます
        </p>
        <p className="text-[15px] text-marble-white leading-relaxed mb-2">
          あなたは最初の <strong className="text-athena-bronze font-medium">500 名</strong> の一人になりました。
        </p>
        <p className="text-[13px] text-marble-white/65 leading-relaxed mb-5">
          クローズドβ開始時（2026 年 Q4）に、招待リンクをメールでお送りします。
          コミュニティ登録権・編集権・関係追加権が優先的に付与されます。
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-marble-white/10">
          <a
            href={SHARE_INTENT}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] border border-marble-white/15 rounded-md px-3.5 py-1.5 text-marble-white/80 hover:bg-marble-white/[0.04] hover:text-marble-white transition"
          >
            𝕏 で広める
          </a>
          <a
            href="/manifesto"
            className="text-[12px] text-marble-white/65 hover:text-marble-white transition underline-offset-2 hover:underline"
          >
            Manifesto を読む
          </a>
          <a
            href="/preview"
            className="text-[12px] text-marble-white/65 hover:text-marble-white transition underline-offset-2 hover:underline"
          >
            Preview を見る
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md mx-auto fade-up-delay-3" noValidate>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          aria-label="メールアドレス"
          className="flex-1 bg-marble-white/[0.04] border border-marble-white/15 text-marble-white placeholder:text-marble-white/30 rounded-md px-4 py-3 text-[15px] focus:border-athena-bronze/60 focus:bg-marble-white/[0.06] transition"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-athena-bronze text-olive-black font-medium rounded-md px-5 py-3 text-[14px] tracking-wide hover:bg-athena-bronze/90 disabled:opacity-50 transition"
        >
          {status === "loading" ? "Sending…" : "Request invitation"}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-3 text-[13px] text-sunset-coral" role="alert">
          {message}
        </p>
      )}
      <p className="mt-3 text-[12px] text-marble-white/35">
        招待制ベータ · 広告ゼロ · データ主権はあなたのもの
      </p>
    </form>
  );
}
