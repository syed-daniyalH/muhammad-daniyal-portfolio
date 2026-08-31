"use client";

import { useState, useEffect } from "react";
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
  { label: "Services", href: "/services" },
  { label: "Work", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

function isRouteActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || mobileMenuOpen
          ? "bg-background/95 backdrop-blur-md border-b border-border/50"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <nav
          aria-label="Primary site navigation"
          className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8"
        >
          {/* Logo / Brand */}
          <Link
            href="/"
            aria-label={`${BRAND_NAME} home`}
            className="group flex flex-col justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <span className="font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              {BRAND_NAME}
            </span>
            <span className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-accent mt-0.5">
              AI Automation & Systems Engineer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {NAVIGATION_ITEMS.map((item) => {
              const isActive = isRouteActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`text-sm font-medium transition-colors hover:text-foreground ${
                    isActive ? "text-foreground font-semibold" : "text-foreground/70"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-1.5 rounded-full bg-accent px-4.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent-foreground transition-all hover:bg-accent-strong"
            >
              Book an audit
              <ArrowUpRight
                aria-hidden="true"
                className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((current) => !current)}
            className="flex size-10 items-center justify-center rounded-md text-foreground/80 transition-colors hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden"
          >
            {mobileMenuOpen ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence initial={false}>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden bg-background border-b border-border/40 lg:hidden"
            >
              <div className="px-4 py-6 space-y-4 sm:px-6">
                <div className="flex flex-col space-y-3">
                  {NAVIGATION_ITEMS.map((item) => {
                    const isActive = isRouteActive(pathname, item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={`text-base font-medium transition-colors ${
                          isActive ? "text-accent font-semibold" : "text-foreground/80"
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>

                <div className="pt-4 mt-4 border-t border-border/20 flex flex-col gap-2.5">
                  <Link
                    href="/case-studies"
                    className="inline-flex items-center justify-center w-full gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] rounded-full border border-border-strong text-foreground transition-colors hover:border-accent/60"
                  >
                    View Case Studies
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center w-full gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] rounded-full bg-accent text-accent-foreground transition-transform active:scale-95"
                  >
                    Book an audit
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
