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
          className="rounded-2xl border border-[#2D3748] bg-[#101724] p-5 transition-colors hover:border-[#06B6D4]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4]"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-200">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Previous project
          </span>
          <span className="mt-3 block text-lg font-semibold text-[#F9FAFB]">
            {previous.title}
          </span>
        </Link>
      )}

      {next && (
        <Link
          href={next.route}
          className="rounded-2xl border border-[#2D3748] bg-[#101724] p-5 text-left transition-colors hover:border-[#06B6D4]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4] md:text-right"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-200 md:justify-end">
            Next project
            <ArrowRight aria-hidden="true" className="size-4" />
          </span>
          <span className="mt-3 block text-lg font-semibold text-[#F9FAFB]">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
}
