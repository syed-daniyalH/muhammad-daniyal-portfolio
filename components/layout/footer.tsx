import { ArrowUpRight, Github, Linkedin, Mail, Network } from "lucide-react";

export function Footer(): React.JSX.Element {
  return (
    <footer className="border-t border-[#2D3748]/60 bg-[#080C13]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl border border-indigo-400/25 bg-indigo-400/10 text-indigo-300">
                <Network aria-hidden="true" className="size-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#F9FAFB]">Daniyal Haider</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-cyan-300">
                  AI &amp; Full-Stack Automation Engineer
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-xl text-sm leading-6 text-[#9CA3AF]">
              Secure, event-driven AI systems connecting conversations,
              operational workflows, enterprise data, and accountable human review.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:daniyalhaider784@gmail.com"
              aria-label="Email Daniyal Haider"
              className="inline-flex items-center gap-2 rounded-xl border border-[#2D3748] bg-[#161E2E] px-4 py-2.5 text-xs font-medium text-[#D1D5DB] transition-colors hover:border-cyan-400/40 hover:text-cyan-200"
            >
              <Mail aria-hidden="true" className="size-4" />
              Email
            </a>

            <a
              href="https://linkedin.com/in/syeddaniyalhaider3"
              target="_blank"
              rel="noreferrer"
              aria-label="Open LinkedIn profile"
              className="inline-flex items-center gap-2 rounded-xl border border-[#2D3748] bg-[#161E2E] px-4 py-2.5 text-xs font-medium text-[#D1D5DB] transition-colors hover:border-cyan-400/40 hover:text-cyan-200"
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
              className="inline-flex items-center gap-2 rounded-xl border border-[#2D3748] bg-[#161E2E] px-4 py-2.5 text-xs font-medium text-[#D1D5DB] transition-colors hover:border-cyan-400/40 hover:text-cyan-200"
            >
              <Github aria-hidden="true" className="size-4" />
              GitHub
              <ArrowUpRight aria-hidden="true" className="size-3" />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-[#2D3748]/60 pt-6 font-mono text-[10px] text-[#6B7280] sm:flex-row">
          <p>Copyright {new Date().getFullYear()} Daniyal Haider.</p>
          <p>Sanitized demonstrations. No production credentials are exposed.</p>
        </div>
      </div>
    </footer>
  );
}
