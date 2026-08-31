import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { INSIGHTS_ARTICLES, getInsightBySlug } from "@/content/insights";
import { BRAND_NAME } from "@/lib/branding";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INSIGHTS_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) {
    return { title: "Insight Not Found" };
  }

  return {
    title: `${article.title} | ${BRAND_NAME}`,
    description: article.summary,
    alternates: {
      canonical: `/insights/${slug}`,
    },
  };
}

export default async function InsightDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main id="main-content" className="min-h-screen bg-background pt-28 pb-20 text-foreground sm:pt-36">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-subtle transition-colors hover:text-accent mb-8"
        >
          <ArrowLeft className="size-3.5" />
          Back to Insights
        </Link>

        {/* Article Header */}
        <header className="border-b border-border/50 pb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs font-semibold text-accent">
              {article.number}
            </span>
            <span className="text-border-strong">·</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              {article.category}
            </span>
            <span className="text-border-strong">·</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-subtle">
              {article.readTime} / {article.date}
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-semibold leading-[1.12] tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
            {article.summary}
          </p>
        </header>

        {/* Core Takeaways Box */}
        <div className="my-10 rounded-2xl border border-border-strong/70 bg-surface/50 p-6 sm:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent mb-4">
            KEY ARCHITECTURAL TAKEAWAYS
          </p>
          <ul className="space-y-3">
            {article.takeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/90">
                <CheckCircle2 className="size-4 shrink-0 text-accent mt-0.5" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Article Body Content */}
        <div className="space-y-6 text-base leading-relaxed text-muted sm:text-lg">
          {article.content.map((paragraph, pIdx) => (
            <p key={pIdx}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Next Step / Contact Callout */}
        <div className="mt-16 rounded-2xl border border-border/60 bg-surface/40 p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-subtle">
              NEXT STEPS
            </p>
            <h3 className="mt-1 text-xl font-semibold text-foreground">
              Ready to implement this in your systems?
            </h3>
            <p className="mt-1 text-sm text-muted">
              I help companies design and audit their CRM and automation architecture.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-accent-foreground transition-all hover:bg-accent-strong"
            >
              Book an audit
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/insights"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-foreground hover:border-accent/60"
            >
              More Insights
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
