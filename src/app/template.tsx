"use client";

/**
 * 全ページ共通テンプレート。
 * Next.js は遷移ごとにこのコンポーネントを再マウントするため、
 * page-enter アニメーションが毎回再生され、ページ間の連続感が生まれる。
 * prefers-reduced-motion が指定されている場合は globals.css 側で実質静止する。
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
