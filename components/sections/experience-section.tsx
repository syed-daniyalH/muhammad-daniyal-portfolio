"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal, StaggerGroup, staggerItemVariants } from "@/components/motion/scroll-reveal";

const EXPERIENCE_ITEMS = [
  {
    period: "Jun 2026 to Present",
    title: "AI Automation Engineer & GHL Specialist",
    organization: "Techionik (Client Projects)",
    selectedWork: "VenAI / Venus, Brouss Elevators",
    points: [
      "Designed VenAI client onboarding automation using GoHighLevel, n8n, Stripe, and Cal.com, connecting deal submission, dynamic service agreements, dual eSignatures, payment tracking, and kickoff booking.",
      "Built multi-channel source attribution and lead routing for 300+ active contacts using catch-all logic, Smart Lists, tags, automated queues, and pipeline workflows.",
      "Architected a production GoHighLevel Conversation AI chatbot with intent routing, achieving a 100% pass rate across 20 internal test scenarios before client handoff.",
      "Built a bilingual English and Spanish chatbot for Brouss Elevators covering 10+ case types and creating Microsoft Dynamics 365 cases automatically through webhooks.",
      "Iterated a Synthflow voice agent through 50+ production releases, resolving priority issues across call flow, language handling, confirmation logic, and noise sensitivity.",
    ],
  },
  {
    period: "Dec 2025 to Jun 2026",
    title: "Junior AI Automation Engineer",
    organization: "Techionik · Lahore, Pakistan",
    selectedWork: "Dispatch Alex, SM2 Racing, LinkedIn & Instagram Video Automation",
    points: [
      "Delivered n8n and Make.com automations for 3+ active clients by integrating OpenAI, Twilio, and CRM platforms, reducing manual processing time by approximately 70%.",
      "Extended a QuickBooks and FastAPI invoicing pipeline for 5+ clients, removing recurring manual billing entry and improving consistency across each billing cycle.",
      "Configured AI calling agents for inbound and outbound lead flows, reducing average response time from more than 4 hours to 15 to 20 minutes.",
      "Audited and rebuilt Zoho CRM workflows, pipeline stages, and forecasting logic, then integrated WooCommerce for automated deal creation and stage-based follow up.",
      "Developed the SM2 Racing OCR and analytics workflow, reducing race event processing from approximately 2 hours to under 5 minutes using OpenAI and Google Sheets automation.",
      "Built autonomous LinkedIn and Instagram content pipelines using n8n, GPT-4o, HeyGen, and platform APIs for script generation, video rendering, and scheduled publishing.",
    ],
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
      className="absolute -left-[calc(1.75rem+5px)] top-1.5 flex size-2.5 items-center justify-center rounded-full bg-accent ring-4 ring-background"
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
      className="scroll-mt-24 border-b border-border/50 bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <ScrollReveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              Career Track / Experience
            </p>
            <h2
              id="experience-title"
              className="mt-4 text-3xl font-semibold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-[3.25rem]"
            >
              Professional Experience
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Production roles across GoHighLevel, conversational AI, workflow orchestration, and Python-backed systems engineering.
            </p>
          </ScrollReveal>

          <div className="relative pl-7">
            <motion.div
              aria-hidden="true"
              className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-transparent via-border-strong/70 to-transparent"
              initial={reducedMotion ? false : { opacity: 0.4, scaleY: 0.7 }}
              animate={reducedMotion ? undefined : { opacity: [0.4, 0.9, 0.4], scaleY: [0.78, 1, 0.78] }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <StaggerGroup className="space-y-12" step={0.1}>
              {EXPERIENCE_ITEMS.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={staggerItemVariants}
                  whileHover={reducedMotion ? undefined : { x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  className="group relative"
                >
                  <TimelineDot index={index} reducedMotion={reducedMotion} />
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent font-semibold">
                      {item.period}
                    </span>
                    <span className="text-border-strong">·</span>
                    <span className="font-mono text-[10px] text-muted-subtle uppercase tracking-[0.12em]">
                      {item.organization}
                    </span>
                  </div>

                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent sm:text-2xl">
                    {item.title}
                  </h3>

                  <p className="mt-1 font-mono text-xs text-accent-soft">
                    Selected work: {item.selectedWork}
                  </p>

                  <ul className="mt-4 space-y-2.5">
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent/80" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
