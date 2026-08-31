"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, Cpu, Database, Network, Workflow } from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { TechBadge } from "@/components/icons/tech-badge";

const SERVICES_LIST = [
  {
    id: "01",
    category: "CRM & WORKFLOW AUTOMATION",
    title: "CRM Architecture & Pipeline Automation",
    icon: Workflow,
    description:
      "End-to-end automation of lead capture, customer onboarding, scheduling, payment routing, and multi-stage CRM pipelines that eliminate manual repetitive tasks.",
    solves:
      "Fragmented lead intake, dropped follow-ups, manual scheduling friction, disconnected payment flows, and lack of CRM data governance.",
    deliverables: [
      "Custom multi-stage GoHighLevel & Zoho CRM pipeline design",
      "Automated booking, reminder, and reschedule flows (Cal.com / GHL)",
      "Client onboarding intake & agreement triggers with Stripe",
      "Field mapping, tagging, and bi-directional status synchronization",
      "Automated customer notification sequences across SMS & Email",
    ],
    technologies: ["GoHighLevel", "n8n", "Make", "Zoho CRM", "Stripe", "Cal.com"],
    caseStudySlug: "/case-studies/venzo-ai-chatbot",
    caseStudyLabel: "See Venzo Chatbot & Booking System",
  },
  {
    id: "02",
    category: "AI & CONVERSATIONAL WORKFLOWS",
    title: "AI Agents & Conversational Intake Systems",
    icon: Cpu,
    description:
      "24/7 intelligent voice and text agents that qualify prospects, handle inbound support queries, book appointments, and escalate high-priority emergencies.",
    solves:
      "Missed after-hours calls, slow lead response times, repetitive tier-1 support burdens, and unstructured customer inquiries.",
    deliverables: [
      "24/7 bilingual AI voice agents for after-hours intake (Synthflow / ElevenLabs)",
      "GoHighLevel Conversational AI & prompt engineering (GPT-4o)",
      "Emergency classification & instantaneous human escalation routing",
      "Post-call transcription, structured summary extraction, and CRM sync",
      "Guardrails against hallucination and out-of-scope queries",
    ],
    technologies: ["Conversational AI", "Voice AI", "OpenAI", "Synthflow", "ElevenLabs", "Twilio"],
    caseStudySlug: "/case-studies/brouss-elevators",
    caseStudyLabel: "See Brouss Elevators AI Intake",
  },
  {
    id: "03",
    category: "API & SYSTEM INTEGRATION",
    title: "API Orchestration & Webhook Pipelines",
    icon: Network,
    description:
      "Robust data synchronization pipelines connecting your CRMs, ERPs, accounting software, communication channels, and internal databases with zero data loss.",
    solves:
      "Siloed platforms, rate-limit failures, manual data re-entry between accounting and operations, and silent webhook delivery drops.",
    deliverables: [
      "Bi-directional webhook synchronization with HMAC signature validation",
      "Idempotency handling and automated retry & backoff logic",
      "Accounting integrations (QuickBooks Online, Stripe Invoicing)",
      "Real-time alerting via Slack, Discord, or Email for system failures",
      "Custom middleware in n8n, Make.com, or lightweight Python services",
    ],
    technologies: ["Webhooks", "REST APIs", "n8n", "Make", "QuickBooks", "Microsoft Dynamics 365"],
    caseStudySlug: "/case-studies/zoho-revenue-operations",
    caseStudyLabel: "See Zoho & QuickBooks Integration",
  },
  {
    id: "04",
    category: "BACKEND & INTERNAL PLATFORMS",
    title: "Custom Backend Services & Operations Portals",
    icon: Database,
    description:
      "Tailored web applications, internal dispatch tools, and backend microservices built for specific operational workflows that standard SaaS tools cannot handle.",
    solves:
      "Overly rigid SaaS limitations, spreadsheet sprawl, lack of role separation for field teams, and slow manual document processing.",
    deliverables: [
      "FastAPI & Python backend services with clean OpenAPI documentation",
      "Relational PostgreSQL schema architecture and query optimization",
      "Role-based access control (Admin, Technician, Driver portals)",
      "Automated OCR intake, voice transcription, and document parsing",
      "Next.js / React responsive web interfaces for operations",
    ],
    technologies: ["FastAPI", "Python", "PostgreSQL", "Next.js", "React", "Make"],
    caseStudySlug: "/case-studies/sm2-race-control",
    caseStudyLabel: "See SM2 Motorsport Platform",
  },
] as const;

const ENGAGEMENT_MODELS = [
  {
    number: "01",
    title: "Automation Audit & Architecture",
    description:
      "A thorough deep dive into your existing tech stack, data flows, and team bottlenecks. You receive a concrete architecture diagram, failure analysis, and step-by-step implementation blueprint.",
  },
  {
    number: "02",
    title: "End-to-End Build & Deployment",
    description:
      "Turnkey engineering of your automated systems. From initial sandbox setup and prompt engineering to webhook security, CRM configuration, and live production release.",
  },
  {
    number: "03",
    title: "Engineering Retainer & Optimization",
    description:
      "Ongoing technical partnership covering monitoring, schema updates, API migrations, performance tuning, and continuous workflow improvements as your business scales.",
  },
] as const;

export function ServicesSection(): React.JSX.Element {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="scroll-mt-24 bg-background py-16 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <ScrollReveal className="max-w-4xl border-b border-border/50 pb-12 sm:pb-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            SERVICES / SYSTEMS ARCHITECTURE & AUTOMATION
          </p>
          <h1
            id="services-title"
            className="mt-4 text-4xl font-semibold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-[3.5rem] lg:text-[4.25rem]"
          >
            Engineering automation that connects AI, CRMs, APIs, and business operations.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            I design and implement resilient automation systems built around real operational requirements. Every workflow is architected with strict validation, error handling, and clean documentation.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              Book an automation audit
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-border-strong bg-surface/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              View Case Studies
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </ScrollReveal>

        {/* 4 Core Service Offerings */}
        <div className="mt-16 space-y-12 sm:space-y-16">
          {SERVICES_LIST.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollReveal
                key={service.id}
                delay={index * 0.05}
                className="group rounded-2xl border border-border-strong/70 bg-surface/40 p-6 transition-all duration-300 hover:border-accent/50 sm:p-8 lg:p-10"
              >
                <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
                  {/* Service Info & Problem */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-accent">
                        {service.id}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-subtle">
                        {service.category}
                      </span>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border-strong bg-surface-elevated text-accent">
                        <Icon className="size-5" />
                      </div>
                      <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                        {service.title}
                      </h2>
                    </div>

                    <p className="text-base leading-relaxed text-muted sm:text-[1.05rem]">
                      {service.description}
                    </p>

                    {/* What it solves */}
                    <div className="rounded-xl border border-border/60 bg-background/50 p-4 sm:p-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-subtle mb-1.5">
                        What this solves
                      </p>
                      <p className="text-sm leading-relaxed text-foreground/85">
                        {service.solves}
                      </p>
                    </div>

                    {/* Case Study Link */}
                    <Link
                      href={service.caseStudySlug}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-accent transition-colors hover:text-accent-soft"
                    >
                      <span>{service.caseStudyLabel}</span>
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    </Link>
                  </div>

                  {/* Deliverables & Stack */}
                  <div className="flex flex-col justify-between space-y-6 rounded-xl border border-border/50 bg-background/40 p-6 sm:p-7">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-subtle mb-4">
                        Key Deliverables
                      </p>
                      <ul className="space-y-2.5">
                        {service.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/80 leading-relaxed">
                            <CheckCircle2 className="size-4 shrink-0 text-accent mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-border/50 pt-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-subtle mb-3">
                        Core Technologies
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <TechBadge key={tech} name={tech} size="sm" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Engagement Models */}
        <ScrollReveal className="mt-20 border-t border-border/50 pt-16 sm:mt-24 sm:pt-20">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              HOW WE WORK
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Flexible Engagement Models
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Whether you need a complete workflow audit, a turnkey production system, or ongoing technical retainers, engagements are structured around clear deliverables.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {ENGAGEMENT_MODELS.map((model) => (
              <div
                key={model.number}
                className="flex flex-col justify-between rounded-2xl border border-border-strong/60 bg-surface/40 p-6 sm:p-7"
              >
                <div>
                  <span className="font-mono text-xs font-semibold text-accent">
                    {model.number}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-foreground">
                    {model.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {model.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Bottom CTA */}
        <ScrollReveal className="mt-20 rounded-2xl border border-border-strong bg-surface/60 p-8 text-center sm:p-12 lg:p-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            START WITH THE PROCESS
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
            Have a workflow bottleneck or automation project?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
            Let’s discuss your current systems and map out an automation plan tailored to your business goals.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent-foreground transition-all hover:bg-accent-strong"
            >
              Book an automation audit
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-border-strong bg-surface/50 px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-foreground transition-all hover:border-accent/60 hover:text-accent"
            >
              Explore Case Studies
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
