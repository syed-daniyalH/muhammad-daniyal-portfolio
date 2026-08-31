"use client";

import { motion, useReducedMotion } from "framer-motion";

import { ScrollReveal, StaggerGroup, staggerItemVariants } from "@/components/motion/scroll-reveal";

const EXPERIENCE_ITEMS = [
  {
    period: "Jun 2026 to Present",
    title: "Automation Engineer and GHL Specialist",
    organization: "Hysentra",
    description:
      "Designed VenAI Agency client onboarding automation, built multi-channel lead routing for 300 plus active contacts, developed the Venzo Chatbot and booking confirmation system with qualification, CRM planning, booking and handoff flow, and built the Brouss Elevators bilingual chatbot, AI voice agent, and Dynamics 365 case creation flow.",
  },
  {
    period: "Dec 2025 to Jun 2026",
    title: "Junior AI Automation Engineer",
    organization: "Techionik, Lahore, Pakistan",
    description:
      "Delivered n8n and Make.com automations for active clients, extended QuickBooks and FastAPI invoicing systems, reduced response time from more than 4 hours to 15 to 20 minutes with AI calling flows, and built SM2 Racing plus autonomous LinkedIn and Instagram content pipelines.",
  },
] as const;

function TimelineDot({
  index,
  reducedMotion,
}: {
  index: number;
  reducedMotion: boolean;
}): React.JSX.Element {
  return (
    <span
      aria-hidden="true"
      className="absolute -left-[calc(2rem+5px)] top-1 flex size-2.5 items-center justify-center rounded-full bg-accent ring-4 ring-background"
    >
      {!reducedMotion && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-accent/40"
          animate={{ scale: [1, 2.2, 2.2], opacity: [0.85, 0, 0] }}
          transition={{
            duration: 3.6,
            delay: index * 0.18,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      )}
    </span>
  );
}

export function ExperienceSection(): React.JSX.Element {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="scroll-mt-24 border-b border-border/60 bg-background py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <ScrollReveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
              Experience
            </p>
            <h2
              id="experience-title"
              className="mt-4 text-3xl font-semibold tracking-normal text-foreground sm:text-5xl"
            >
              Experience behind the case studies.
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted">
              Recent client roles across GoHighLevel, conversational AI,
              workflow automation, and Python-backed delivery.
            </p>
          </ScrollReveal>

          <div className="relative pl-8">
            <motion.div
              aria-hidden="true"
              className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-transparent via-border/80 to-transparent"
              initial={reducedMotion ? false : { opacity: 0.4, scaleY: 0.7 }}
              animate={reducedMotion ? undefined : { opacity: [0.4, 0.9, 0.4], scaleY: [0.78, 1, 0.78] }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-accent/0 via-accent/50 to-accent/0"
              initial={reducedMotion ? false : { opacity: 0.35 }}
              animate={reducedMotion ? undefined : { opacity: [0.25, 0.7, 0.25] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <StaggerGroup className="space-y-10" step={0.1}>
              {EXPERIENCE_ITEMS.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={staggerItemVariants}
                  whileHover={reducedMotion ? undefined : { x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  className="group relative"
                >
                  <TimelineDot index={index} reducedMotion={reducedMotion} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-subtle">
                    {item.period}
                  </span>
                  <h3 className="mt-2 text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-accent">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-foreground/85">
                    {item.organization}
                  </p>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
