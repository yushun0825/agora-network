"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

type NavLink = { href: string; label: string };

const DEFAULT_NAV: NavLink[] = [
  { href: "/manifesto", label: "Manifesto" },
  { href: "/preview", label: "Preview" },
];

/**
 * 全ページ共通ヘッダー。
 * - 通常時: 透過
 * - スクロール 24px 超: backdrop-blur + border でガラス層に切り替わる
 * - 現在ページのリンクは aria-current="page" と bronze accent でマーキング
 */
export function Header({ nav = DEFAULT_NAV }: { nav?: NavLink[] }) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ホームページ以外では Home リンクも表示する
  const showHome = pathname !== "/";
  const links: NavLink[] = showHome
    ? [{ href: "/", label: "Home" }, ...nav.filter((l) => l.href !== "/")]
    : nav;

  return (
    <header
      className={`sticky top-0 z-30 transition-all duration-300 ${
        scrolled
          ? "bg-olive-black/75 backdrop-blur-md border-b border-marble-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 sm:px-10 py-5">
        <Link href="/" className="block" aria-label="AGORA ホーム">
          <Logo size={26} />
        </Link>
        <nav className="flex items-center gap-5 text-[13px]" aria-label="主要ナビゲーション">
          {links.map((l) => {
            const isActive = pathname === l.href || (l.href !== "/" && pathname?.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive ? "page" : undefined}
                className={`transition ${
                  isActive
                    ? "text-athena-bronze"
                    : "text-marble-white/70 hover:text-marble-white"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
