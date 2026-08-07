"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, Network, X } from "lucide-react";
import { useLenis } from "lenis/react";

interface NavigationItem {
  label: string;
  target: `#${string}`;
}

const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  { label: "Overview", target: "#hero" },
  { label: "Work", target: "#work" },
  { label: "Evidence Lab", target: "#case-study" },
  { label: "Contact", target: "#contact" },
] as const;

export function Navbar(): React.JSX.Element {
  const lenis = useLenis();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (target: NavigationItem["target"]): void => {
    const section = document.querySelector<HTMLElement>(target);
    if (!section) {
      window.location.assign(`/${target}`);
      return;
    }

    const targetTop =
      section.getBoundingClientRect().top + window.scrollY - 88;

    if (lenis) {
      lenis.scrollTo(targetTop, { duration: 1.05 });
    } else {
      window.scrollTo({ top: targetTop, behavior: "smooth" });
    }

    window.history.replaceState(null, "", target);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <nav
        aria-label="Primary portfolio navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10"
      >
        <button
          type="button"
          onClick={() => scrollToSection("#hero")}
          aria-label="Return to portfolio introduction"
          className="group flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          <span className="flex size-9 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent transition-all duration-300 group-hover:scale-105 group-hover:border-accent/40">
            <Network aria-hidden="true" className="size-4" />
          </span>

          <span className="text-left">
            <span className="block text-sm font-semibold tracking-tight text-foreground">
              Daniyal Haider
            </span>
            <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
              AI Systems Engineering
            </span>
          </span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {NAVIGATION_ITEMS.map((item) => (
            <button
              key={item.target}
              type="button"
              onClick={() => scrollToSection(item.target)}
              className="relative py-2 text-sm font-medium text-muted transition-colors duration-200 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:text-foreground hover:after:scale-x-100 focus-visible:outline-none focus-visible:text-accent"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1.5">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[11px] font-medium text-emerald-300">
              Available for AI &amp; Automation Projects
            </span>
          </div>

          <a
            href="mailto:daniyalhaider784@gmail.com"
            className="inline-flex items-center gap-2 rounded-xl border border-accent/30 bg-accent px-4 py-2.5 text-xs font-semibold text-accent-foreground shadow-[0_12px_30px_rgba(227,165,72,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-strong hover:shadow-[0_16px_38px_rgba(227,165,72,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Start a conversation
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </div>

        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileMenuOpen((current) => !current)}
          className="flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
        >
          {mobileMenuOpen ? <X aria-hidden="true" className="size-4" /> : <Menu aria-hidden="true" className="size-4" />}
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border/60 bg-background/96 backdrop-blur-xl md:hidden"
          >
            <div className="space-y-2 px-5 py-5">
              {NAVIGATION_ITEMS.map((item) => (
                <button
                  key={item.target}
                  type="button"
                  onClick={() => scrollToSection(item.target)}
                  className="flex w-full items-center justify-between rounded-xl border border-transparent px-4 py-3 text-left text-sm font-medium text-muted transition-colors hover:border-border hover:bg-surface hover:text-foreground"
                >
                  {item.label}
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </button>
              ))}

              <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-3">
                <span className="size-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-medium text-emerald-300">
                  Available for selected projects
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
