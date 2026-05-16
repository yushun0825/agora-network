"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "ok" | "error";

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
        setMessage(data.message ?? "登録しました。");
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
          className="flex-1 bg-marble-white/[0.04] border border-marble-white/15 text-marble-white placeholder:text-marble-white/30 rounded-md px-4 py-3 text-[15px] focus:border-athena-bronze/60 transition"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-athena-bronze text-olive-black font-medium rounded-md px-5 py-3 text-[14px] tracking-wide hover:bg-athena-bronze/90 disabled:opacity-50 transition"
        >
          {status === "loading" ? "Sending…" : "Request invitation"}
        </button>
      </div>
      {status !== "idle" && status !== "loading" && (
        <p
          className={`mt-3 text-[13px] ${
            status === "ok" ? "text-olive-sage" : "text-sunset-coral"
          }`}
        >
          {message}
        </p>
      )}
      <p className="mt-3 text-[12px] text-marble-white/35">
        Invitation-only beta. 招待制ベータです。広告は配信しません。
      </p>
    </form>
  );
}
