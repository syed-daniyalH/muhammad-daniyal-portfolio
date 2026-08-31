"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { BRAND_NAME } from "@/lib/branding";

interface NavigationItem {
  label: string;
  href: string;
}

const NAVIGATION_ITEMS: readonly NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

function isRouteActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function MonogramMark(): React.JSX.Element {
  return (
    <span
      aria-hidden="true"
      className="relative flex h-11 w-12 shrink-0 items-center justify-center"
    >
      <span className="absolute inset-x-1 bottom-1 h-5 rounded-full bg-accent/15 blur-lg" />
      <span className="absolute left-0 top-0 font-display text-[2.15rem] leading-none tracking-[-0.09em] text-accent-soft">
        M
      </span>
      <span className="absolute bottom-0 right-0 font-display text-[1.85rem] leading-none tracking-[-0.08em] text-accent/85">
        D
      </span>
    </span>
  );
}

export function Navbar(): React.JSX.Element {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4 lg:px-6">
      <div
        className={`mx-auto max-w-[1450px] overflow-hidden rounded-[2rem] border transition-[background-color,border-color,box-shadow,transform] duration-300 ${
          scrolled || mobileMenuOpen
            ? "border-border/90 bg-[linear-gradient(180deg,rgba(14,14,18,0.96),rgba(9,9,12,0.96))] shadow-[0_24px_70px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl"
            : "border-border/70 bg-[linear-gradient(180deg,rgba(16,16,20,0.94),rgba(10,10,13,0.94))] shadow-[0_16px_42px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl"
        }`}
      >
        <nav
          aria-label="Primary site navigation"
          className="grid min-h-[78px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:px-8"
        >
          <Link
            href="/"
            aria-label={`${BRAND_NAME} home`}
            className="group flex min-w-0 items-center gap-3 rounded-2xl py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <MonogramMark />
            <span className="truncate font-display text-[1.18rem] font-semibold tracking-[-0.04em] text-foreground transition-colors duration-300 group-hover:text-accent-soft sm:text-[1.32rem] lg:text-[1.5rem]">
              {BRAND_NAME}
            </span>
          </Link>

          <div className="hidden lg:flex lg:justify-self-center">
            <div className="flex items-center rounded-full border border-border/80 bg-[linear-gradient(180deg,rgba(24,24,29,0.92),rgba(13,13,17,0.92))] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_12px_30px_rgba(0,0,0,0.24)]">
              {NAVIGATION_ITEMS.map((item, index) => {
                const isActive = isRouteActive(pathname, item.href);

                return (
                  <Fragment key={item.href}>
                    {index > 0 && (
                      <span
                        aria-hidden="true"
                        className="mx-2 h-6 w-px rounded-full bg-border/70"
                      />
                    )}
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative min-w-[9.5rem] rounded-full px-6 py-3 text-center text-[0.95rem] font-medium tracking-[-0.01em] transition-[color,transform] duration-300 focus-visible:outline-none focus-visible:text-accent ${
                        isActive
                          ? "text-foreground"
                          : "text-foreground/72 hover:text-foreground"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="navbar-active-pill"
                          className="absolute inset-0 -z-10 rounded-full border border-white/5 bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        />
                      )}
                      {item.label}
                    </Link>
                  </Fragment>
                );
              })}
            </div>
          </div>

          <div className="hidden items-center justify-self-end gap-5 lg:flex">
            <div className="flex items-center gap-3 text-[0.92rem] font-medium tracking-[-0.01em] text-foreground/72">
              <span
                aria-hidden="true"
                className="size-2.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.08),0_0_18px_rgba(52,211,153,0.5)]"
              />
              Open to new engagements
            </div>

            <a
              href="mailto:daniyalhaider784@gmail.com"
              className="group relative inline-flex min-h-[3.4rem] items-center gap-2 overflow-hidden rounded-full border border-accent/55 bg-[linear-gradient(180deg,rgba(227,165,72,0.12),rgba(227,165,72,0.03))] px-6 py-3 text-sm font-semibold text-accent-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-soft/80 hover:text-foreground hover:shadow-[0_0_0_1px_rgba(227,165,72,0.12),0_18px_34px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-soft to-transparent opacity-75 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span>Start a conversation</span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((current) => !current)}
            className="flex size-11 items-center justify-center justify-self-end rounded-full border border-border/80 bg-surface/70 text-foreground shadow-[0_12px_25px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.03)] transition-all duration-300 hover:border-accent/45 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden"
          >
            {mobileMenuOpen ? (
              <X aria-hidden="true" className="size-4" />
            ) : (
              <Menu aria-hidden="true" className="size-4" />
            )}
          </button>
        </nav>

        <AnimatePresence initial={false}>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-border/70 bg-[linear-gradient(180deg,rgba(16,16,20,0.98),rgba(9,9,12,0.98))] lg:hidden"
            >
              <div className="px-4 pb-4 pt-2 sm:px-6">
                <div className="rounded-[1.6rem] border border-border/70 bg-surface/55 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                  <div className="space-y-1">
                    {NAVIGATION_ITEMS.map((item, index) => {
                      const isActive = isRouteActive(pathname, item.href);

                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.24, delay: index * 0.05 }}
                        >
                          <Link
                            href={item.href}
                            aria-current={isActive ? "page" : undefined}
                            className={`flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium tracking-[-0.01em] transition-all duration-300 ${
                              isActive
                                ? "border border-white/5 bg-white/[0.04] text-foreground"
                                : "text-foreground/78 hover:bg-white/[0.03] hover:text-foreground"
                            }`}
                          >
                            {item.label}
                            <ArrowUpRight
                              aria-hidden="true"
                              className="size-4 text-muted-subtle"
                            />
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="mt-4 flex items-center gap-3 rounded-2xl border border-border/60 bg-background/55 px-4 py-3 text-sm font-medium text-foreground/72">
                    <span
                      aria-hidden="true"
                      className="size-2.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.08),0_0_16px_rgba(52,211,153,0.45)]"
                    />
                    Open to new engagements
                  </div>

                  <a
                    href="mailto:daniyalhaider784@gmail.com"
                    className="group relative mt-4 inline-flex min-h-[3.2rem] w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-accent/55 bg-[linear-gradient(180deg,rgba(227,165,72,0.12),rgba(227,165,72,0.03))] px-5 py-3 text-sm font-semibold text-accent-soft transition-all duration-300 hover:border-accent-soft/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-soft to-transparent opacity-75"
                    />
                    <span>Start a conversation</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
