"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

interface TocItem {
  id: string;
  label: string;
}

export function ProjectTableOfContents({
  items,
}: {
  items: readonly TocItem[];
}): React.JSX.Element {
  const lenis = useLenis();
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const activeIdRef = useRef(activeId);
  activeIdRef.current = activeId;

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.intersectionRatio);
        });

        let bestId = activeIdRef.current;
        let bestRatio = 0;

        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        if (bestRatio > 0) setActiveId(bestId);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: "-112px 0px -60% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (id: string): void => {
    const section = document.getElementById(id);
    if (!section) return;

    const targetTop = section.getBoundingClientRect().top + window.scrollY - 100;

    if (lenis) {
      lenis.scrollTo(targetTop, { duration: 1 });
    } else {
      window.scrollTo({ top: targetTop, behavior: "smooth" });
    }

    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <>
      <nav
        aria-label="Case study sections"
        className="hidden lg:sticky lg:top-28 lg:block lg:h-fit lg:w-48 lg:shrink-0"
      >
        <ul className="space-y-1 border-l border-border/70">
          {items.map((item) => {
            const isActive = activeId === item.id;

            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`-ml-px block border-l-2 py-1.5 pl-4 text-left text-sm transition-colors ${
                    isActive
                      ? "border-accent text-accent"
                      : "border-transparent text-muted hover:border-border-strong hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <nav
        aria-label="Case study sections"
        className="-mx-5 flex gap-2 overflow-x-auto border-b border-border/60 bg-console px-5 py-4 sm:-mx-8 sm:px-8 lg:hidden"
      >
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToSection(item.id)}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-[10px] font-medium transition-colors ${
              activeId === item.id
                ? "border-accent/50 bg-accent/[0.08] text-accent"
                : "border-border bg-surface text-muted hover:border-accent/45 hover:text-accent"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </>
  );
}
