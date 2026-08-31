import { HeroSection } from "@/components/home/hero-section";
import { ProcessSection } from "@/components/home/process-section";
import { TechStackMarquee } from "@/components/home/tech-stack-marquee";
import { WorkTeaser } from "@/components/home/work-teaser";

export default function HomePage(): React.JSX.Element {
  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <TechStackMarquee />
      <WorkTeaser />
      <ProcessSection />
    </main>
  );
}
