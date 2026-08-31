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
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr_0.7fr]">
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight text-foreground">
              {BRAND_NAME}
            </p>
            <p className="mt-1 font-mono text-[9px] tracking-[0.16em] text-accent">
              {PROFESSIONAL_TITLE}
            </p>
            <p className="mt-5 max-w-md text-sm leading-6 text-muted">
              I build production automation systems across GoHighLevel, n8n,
              Make.com, Python, and API integrations for businesses that need
              dependable CRM, communication, and operational workflows.
            </p>
          </div>

          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-subtle">
              Navigate
            </p>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-subtle">
              Connect
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:daniyalhaider784@gmail.com"
                  className="inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-accent"
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
                  className="inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-accent"
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
                  className="inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-accent"
                >
                  <Github aria-hidden="true" className="size-3.5" />
                  GitHub
                  <ArrowUpRight aria-hidden="true" className="size-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-border/60 pt-6 font-mono text-[10px] text-muted-subtle sm:flex-row">
          <p>Copyright {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
          <p>Client data and credentials have been removed from all case studies.</p>
        </div>
      </div>
    </footer>
  );
}
