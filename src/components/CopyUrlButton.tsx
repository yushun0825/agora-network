"use client";

import { useState } from "react";

/**
 * URL をクリップボードにコピーするボタン。
 * AGORA は「データ主権はあなたのもの」原則のもと、共有しやすさを支援する。
 */
export function CopyUrlButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard 拒否時: 視覚的に何も起きなければ意味がないので state は変えない
    }
  };

  return (
    <button
      onClick={onClick}
      aria-label="URL をコピー"
      className={`inline-flex items-center gap-1 text-[10px] tracking-wider uppercase border rounded px-2 py-0.5 transition ${
        copied
          ? "border-athena-bronze/60 text-athena-bronze bg-athena-bronze/[0.08]"
          : "border-marble-white/15 text-marble-white/50 hover:text-marble-white/85 hover:border-marble-white/25"
      }`}
    >
      {copied ? "✓ コピー済" : "コピー"}
    </button>
  );
}
