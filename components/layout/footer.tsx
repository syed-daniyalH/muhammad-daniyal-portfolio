import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

import { BRAND_NAME, PROFESSIONAL_TITLE } from "@/lib/branding";

export function Footer(): React.JSX.Element {
  return (
    <footer className="border-t border-border/60 bg-console">
      <div className="mx-auto max-w-[1480px] px-5 py-18 sm:px-8 sm:py-20 lg:px-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Brand & Description */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="font-display text-[1.35rem] font-semibold tracking-normal text-foreground transition-colors hover:text-accent-soft"
            >
              {BRAND_NAME}
            </Link>
            <p className="mt-4 text-[0.95rem] leading-7 text-muted">
              {PROFESSIONAL_TITLE}. Delivering production-grade intelligent automation across GoHighLevel, n8n, Python, and custom API-connected ecosystems.
            </p>
          </div>

          {/* Column 2: Expertise */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-subtle">
              Expertise
            </p>
            <div className="mt-5 flex flex-col gap-3.5">
              <span className="text-[0.98rem] text-foreground/80">CRM Automation</span>
              <span className="text-[0.98rem] text-foreground/80">AI Voice Agents</span>
              <span className="text-[0.98rem] text-foreground/80">API Integrations</span>
              <span className="text-[0.98rem] text-foreground/80">Revenue Operations</span>
            </div>
          </div>

          {/* Column 3: Explore */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-subtle">
              Explore
            </p>
            <ul className="mt-5 flex flex-col gap-3.5">
              <li>
                <Link href="/case-studies" className="text-[0.98rem] text-foreground/80 transition-colors hover:text-accent">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[0.98rem] text-foreground/80 transition-colors hover:text-accent">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[0.98rem] text-foreground/80 transition-colors hover:text-accent">
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
            <ul className="mt-5 flex flex-col gap-3.5">
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

        {/* Legal / Bottom */}
        <div className="mt-20 flex flex-col justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row sm:items-center">
          <p className="text-[0.85rem] text-muted-subtle">
            © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </p>
          <div className="flex gap-6 text-[0.85rem] text-muted-subtle">
            <Link href="#" className="transition-colors hover:text-foreground">Privacy</Link>
            <Link href="#" className="transition-colors hover:text-foreground">Cookies</Link>
            <Link href="#" className="transition-colors hover:text-foreground">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
