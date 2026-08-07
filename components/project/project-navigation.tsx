import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import type { PortfolioProject } from "@/types/portfolio";

export function ProjectNavigation({
  previous,
  next,
}: {
  previous: PortfolioProject | null;
  next: PortfolioProject | null;
}): React.JSX.Element {
  return (
    <nav
      aria-label="Project navigation"
      className="mx-auto grid max-w-7xl gap-4 px-5 py-12 sm:px-8 md:grid-cols-2 lg:px-10"
    >
      {previous && (
        <Link
          href={previous.route}
          className="rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-accent">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Previous project
          </span>
          <span className="mt-3 block text-lg font-semibold text-foreground">
            {previous.title}
          </span>
        </Link>
      )}

      {next && (
        <Link
          href={next.route}
          className="rounded-2xl border border-border bg-surface p-5 text-left transition-colors hover:border-accent/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:text-right"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-accent md:justify-end">
            Next project
            <ArrowRight aria-hidden="true" className="size-4" />
          </span>
          <span className="mt-3 block text-lg font-semibold text-foreground">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
}
