import { ArrowUpRight, Github, Linkedin, Mail, Network } from "lucide-react";

export function Footer(): React.JSX.Element {
  return (
    <footer className="border-t border-border/60 bg-console">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                <Network aria-hidden="true" className="size-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">Daniyal Haider</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-accent">
                  AI &amp; Full-Stack Automation Engineer
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
              Secure, event-driven AI systems connecting conversations,
              operational workflows, enterprise data, and accountable human review.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:daniyalhaider784@gmail.com"
              aria-label="Email Daniyal Haider"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-medium text-foreground/85 transition-colors hover:border-accent/40 hover:text-accent"
            >
              <Mail aria-hidden="true" className="size-4" />
              Email
            </a>

            <a
              href="https://linkedin.com/in/syeddaniyalhaider3"
              target="_blank"
              rel="noreferrer"
              aria-label="Open LinkedIn profile"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-medium text-foreground/85 transition-colors hover:border-accent/40 hover:text-accent"
            >
              <Linkedin aria-hidden="true" className="size-4" />
              LinkedIn
              <ArrowUpRight aria-hidden="true" className="size-3" />
            </a>

            <a
              href="https://github.com/syed-daniyalH"
              target="_blank"
              rel="noreferrer"
              aria-label="Open GitHub profile"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-medium text-foreground/85 transition-colors hover:border-accent/40 hover:text-accent"
            >
              <Github aria-hidden="true" className="size-4" />
              GitHub
              <ArrowUpRight aria-hidden="true" className="size-3" />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-border/60 pt-6 font-mono text-[10px] text-muted-subtle sm:flex-row">
          <p>Copyright {new Date().getFullYear()} Daniyal Haider.</p>
          <p>Sanitized demonstrations. No production credentials are exposed.</p>
        </div>
      </div>
    </footer>
  );
}
