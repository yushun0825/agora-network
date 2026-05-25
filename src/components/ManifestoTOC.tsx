"use client";

import { useEffect, useState } from "react";

type Section = { id: string; title: string };

/**
 * Manifesto の左サイドバー TOC。
 * IntersectionObserver で現在「読まれている」章を検知し、bronze アクセントで強調する。
 * クリック時は smooth scroll で章へジャンプ。
 */
export function ManifestoTOC({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const elements = sections
      .map((s) => ({ id: s.id, el: document.getElementById(s.id) }))
      .filter((x): x is { id: string; el: HTMLElement } => x.el !== null);

    if (elements.length === 0) return;

    // 「viewport 上から 30% の位置を最後にまたいだ章」をアクティブとする。
    // IntersectionObserver は jump scroll の後に state が stale になるため、
    // scroll/resize イベントで毎回計算する方式に統一。
    const compute = () => {
      const trigger = window.innerHeight * 0.3;
      let current = elements[0].id;
      for (const { id, el } of elements) {
        const top = el.getBoundingClientRect().top;
        if (top <= trigger) current = id;
        else break;
      }
      setActiveId(current);
    };

    compute();

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        compute();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [sections]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <aside className="hidden lg:block sticky top-12 self-start w-44 text-[11px]">
      <p className="uppercase tracking-[0.2em] text-marble-white/30 mb-3">Contents</p>
      <ol className="space-y-2">
        {sections.map((s, i) => {
          const isActive = activeId === s.id;
          return (
            <li key={s.id} className="relative">
              {isActive && (
                <span
                  aria-hidden
                  className="absolute -left-3 top-1 bottom-1 w-px bg-athena-bronze"
                />
              )}
              <a
                href={`#${s.id}`}
                onClick={(e) => handleClick(e, s.id)}
                className={`block leading-snug transition ${
                  isActive
                    ? "text-marble-white"
                    : "text-marble-white/45 hover:text-marble-white/80"
                }`}
              >
                <span
                  className={`mr-1 ${isActive ? "text-athena-bronze" : "text-marble-white/25"}`}
                >
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                {s.title}
              </a>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
