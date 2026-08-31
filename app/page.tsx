import Link from "next/link";
import { ArrowRight, UserRound } from "lucide-react";

import { HeroSection } from "@/components/home/hero-section";
import { TechStackMarquee } from "@/components/home/tech-stack-marquee";
import { WorkTeaser } from "@/components/home/work-teaser";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { BRAND_NAME } from "@/lib/branding";

export default function HomePage(): React.JSX.Element {
  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <TechStackMarquee />
      <WorkTeaser />

      <section aria-labelledby="home-cta-title" className="bg-panel py-20 sm:py-24">
        <ScrollReveal className="mx-auto max-w-4xl px-5 text-center sm:px-8 lg:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
            The rest of the story
          </p>
          <h2
            id="home-cta-title"
            className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl"
          >
            Read how {BRAND_NAME} works, or start a conversation directly.
          </h2>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/about"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border-strong px-6 py-3.5 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <UserRound aria-hidden="true" className="size-4" />
              About {BRAND_NAME}
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-all hover:-translate-y-0.5 hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              Get in touch
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
