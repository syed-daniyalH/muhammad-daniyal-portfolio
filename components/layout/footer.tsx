import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

import { BRAND_NAME, PROFESSIONAL_TITLE } from "@/lib/branding";

export function Footer(): React.JSX.Element {
  return (
    <footer className="border-t border-border/50 bg-console">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Brand & Description */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="font-display text-xl font-semibold tracking-tight text-foreground transition-colors hover:text-accent"
            >
              {BRAND_NAME}
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {PROFESSIONAL_TITLE}. Specializing in CRM workflows, AI automation, backend integrations, and operational systems.
            </p>
          </div>

          {/* Column 2: Expertise */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-subtle">
              Expertise
            </p>
            <div className="mt-4 flex flex-col gap-2.5">
              <span className="text-sm text-foreground/80">CRM Automation</span>
              <span className="text-sm text-foreground/80">AI Conversational Systems</span>
              <span className="text-sm text-foreground/80">API Integrations</span>
              <span className="text-sm text-foreground/80">Backend Services</span>
            </div>
          </div>

          {/* Column 3: Explore */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-subtle">
              Explore
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <Link href="/services" className="text-sm text-foreground/80 transition-colors hover:text-accent">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-sm text-foreground/80 transition-colors hover:text-accent">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-foreground/80 transition-colors hover:text-accent">
                  About
                </Link>
              </li>
              <li>
                <Link href="/insights" className="text-sm text-foreground/80 transition-colors hover:text-accent">
                  Insights
                </Link>
              </li>
              <li>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-foreground/80 transition-colors hover:text-accent"
                >
                  Resume
                  <ArrowUpRight aria-hidden="true" className="size-3 text-muted-subtle" />
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-foreground/80 transition-colors hover:text-accent">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-subtle">
              Connect
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
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

        {/* Legal / Bottom */}
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-subtle">
            © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-subtle">
            <Link href="/contact" className="transition-colors hover:text-foreground">Privacy</Link>
            <Link href="/contact" className="transition-colors hover:text-foreground">Cookies</Link>
            <Link href="/contact" className="transition-colors hover:text-foreground">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
