import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

import { BRAND_NAME, PROFESSIONAL_TITLE } from "@/lib/branding";

const FOOTER_LINKS = [
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function Footer(): React.JSX.Element {
  return (
    <footer className="border-t border-border/60 bg-console">
      <div className="mx-auto max-w-[1480px] px-5 py-18 sm:px-8 sm:py-20 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.6fr_0.7fr] lg:gap-16">
          <div className="max-w-xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              {BRAND_NAME}
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-normal text-foreground sm:text-[3.3rem]">
              Automation systems for clearer operations.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-muted">
              {PROFESSIONAL_TITLE}. Production delivery across GoHighLevel,
              n8n, Make.com, Python, and API-connected business systems.
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-subtle">
              Navigate
            </p>
            <ul className="mt-5 space-y-3.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.98rem] text-foreground/80 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-subtle">
              Connect
            </p>
            <ul className="mt-5 space-y-3.5">
              <li>
                <a
                  href="mailto:daniyalhaider784@gmail.com"
                  className="inline-flex items-center gap-2 text-[0.98rem] text-foreground/80 transition-colors hover:text-accent"
                >
                  <Mail aria-hidden="true" className="size-3.5" />
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/syeddaniyalhaider3"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-[0.98rem] text-foreground/80 transition-colors hover:text-accent"
                >
                  <Linkedin aria-hidden="true" className="size-3.5" />
                  LinkedIn
                  <ArrowUpRight aria-hidden="true" className="size-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/syed-daniyalH"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-[0.98rem] text-foreground/80 transition-colors hover:text-accent"
                >
                  <Github aria-hidden="true" className="size-3.5" />
                  GitHub
                  <ArrowUpRight aria-hidden="true" className="size-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-border/60 pt-6 font-mono text-[10px] text-muted-subtle sm:flex-row">
          <p>Copyright {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
          <p>Public case studies are sanitized for safe review.</p>
        </div>
      </div>
    </footer>
  );
}
