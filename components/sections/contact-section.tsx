"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2, FileText, Github, Linkedin, Mail } from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { BRAND_NAME, RESUME_PATH } from "@/lib/branding";

const DIRECT_LINKS = [
  {
    label: "EMAIL",
    value: "daniyalhaider784@gmail.com",
    href: "mailto:daniyalhaider784@gmail.com",
    icon: Mail,
    external: false,
  },
  {
    label: "LINKEDIN",
    value: "linkedin.com/in/syeddaniyalhaider3",
    href: "https://linkedin.com/in/syeddaniyalhaider3",
    icon: Linkedin,
    external: true,
  },
  {
    label: "GITHUB",
    value: "github.com/syed-daniyalH",
    href: "https://github.com/syed-daniyalH",
    icon: Github,
    external: true,
  },
  {
    label: "RESUME",
    value: "Download PDF Resume",
    href: RESUME_PATH,
    icon: FileText,
    external: true,
  },
] as const;

export function ContactSection(): React.JSX.Element {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "Automation audit",
    message: "",
    consent: false,
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "submitted">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.consent) return;

    setStatus("submitting");

    // Construct mailto link fallback
    const subject = encodeURIComponent(`Inquiry from ${formData.name} - ${formData.service}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || "N/A"}\nCompany: ${formData.company || "N/A"}\nTopic: ${formData.service}\n\nMessage / Process Context:\n${formData.message}`
    );

    setTimeout(() => {
      setStatus("submitted");
      window.location.href = `mailto:daniyalhaider784@gmail.com?subject=${subject}&body=${body}`;
    }, 600);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-24 bg-background py-16 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:items-start">
          
          {/* Left Column: Context, Direct Links, Next Steps */}
          <ScrollReveal className="space-y-10">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                CONTACT / START WITH THE PROCESS
              </p>
              <h1
                id="contact-title"
                className="mt-4 text-4xl font-semibold leading-[1.08] tracking-[-0.025em] text-foreground sm:text-[3.5rem] lg:text-[4.15rem]"
              >
                What feels harder than it should?
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Describe the workflow, where it slows down, and what a better outcome would look like. I’ll review the context and suggest a useful next step.
              </p>
            </div>

            {/* Direct Info Rows with Professional Icon Badges */}
            <div className="border-t border-border/50 divide-y divide-border/50">
              {DIRECT_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <div key={link.label} className="grid grid-cols-[6rem_1fr] items-center py-4 text-sm">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-subtle">
                      {link.label}
                    </span>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noreferrer" : undefined}
                      className="group inline-flex items-center gap-2.5 font-medium text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-border-strong/70 bg-surface text-muted-subtle transition-colors group-hover:border-accent/50 group-hover:bg-surface-elevated group-hover:text-accent">
                        <Icon className="size-3.5" />
                      </div>
                      <span className="break-all sm:break-normal">{link.value}</span>
                      {link.external && (
                        <ArrowUpRight aria-hidden="true" className="size-3.5 text-muted-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                      )}
                    </a>
                  </div>
                );
              })}
            </div>

            {/* What Happens Next Card */}
            <div className="rounded-2xl border border-border-strong/60 bg-surface/40 p-6 sm:p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent mb-3">
                WHAT HAPPENS NEXT
              </p>
              <ul className="space-y-3 text-sm leading-relaxed text-muted">
                <li className="flex items-start gap-2.5">
                  <span className="font-mono text-xs text-accent font-semibold">01</span>
                  <span>I review the process, system architecture, and desired outcome.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-mono text-xs text-accent font-semibold">02</span>
                  <span>I identify important integration boundaries, constraints, or failure points.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-mono text-xs text-accent font-semibold">03</span>
                  <span>We align on whether an audit, technical consultation, or focused build is the right next step.</span>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Right Column: High-Precision Form Card */}
          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl border border-border-strong bg-surface/60 p-6 sm:p-8 lg:p-9 shadow-[6px_6px_0px_0px_rgba(227,165,72,0.22)] backdrop-blur-sm">
              {status === "submitted" ? (
                <div className="py-12 text-center space-y-4">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <CheckCircle2 className="size-6" />
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                    Enquiry Prepared!
                  </h3>
                  <p className="text-sm leading-relaxed text-muted max-w-md mx-auto">
                    Your email client is opening with your formatted details. You can also directly reach out at{" "}
                    <a href="mailto:daniyalhaider784@gmail.com" className="text-accent underline underline-offset-4">
                      daniyalhaider784@gmail.com
                    </a>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-foreground hover:border-accent/60"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name and Email */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="block text-xs font-semibold tracking-tight text-foreground">
                        Name <span className="text-accent">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full rounded-xl border border-border-strong bg-background/80 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-subtle focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="block text-xs font-semibold tracking-tight text-foreground">
                        Business email <span className="text-accent">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                        className="w-full rounded-xl border border-border-strong bg-background/80 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-subtle focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone and Company */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="contact-phone" className="block text-xs font-semibold tracking-tight text-foreground">
                        Phone <span className="text-muted-subtle font-normal">(optional)</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full rounded-xl border border-border-strong bg-background/80 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-subtle focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="contact-company" className="block text-xs font-semibold tracking-tight text-foreground">
                        Company <span className="text-muted-subtle font-normal">(optional)</span>
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Company or agency"
                        className="w-full rounded-xl border border-border-strong bg-background/80 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-subtle focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                      />
                    </div>
                  </div>

                  {/* Topic / Service */}
                  <div className="space-y-2">
                    <label htmlFor="contact-service" className="block text-xs font-semibold tracking-tight text-foreground">
                      What would you like to improve?
                    </label>
                    <select
                      id="contact-service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full rounded-xl border border-border-strong bg-background/80 px-3.5 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                    >
                      <option value="Automation audit">Automation audit</option>
                      <option value="CRM & Pipeline integration (GoHighLevel, Zoho)">CRM & Pipeline integration (GoHighLevel, Zoho)</option>
                      <option value="AI & Conversational workflows (n8n, OpenAI, Voice)">AI & Conversational workflows (n8n, OpenAI, Voice)</option>
                      <option value="Backend & API integration (Python, FastAPI)">Backend & API integration (Python, FastAPI)</option>
                      <option value="Full-time / Contract engineering role">Full-time / Contract engineering role</option>
                      <option value="Other technical inquiry">Other technical inquiry</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="block text-xs font-semibold tracking-tight text-foreground">
                      Tell me about the process
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="What happens today, where does it slow down, and what would a better outcome look like?"
                      className="w-full rounded-xl border border-border-strong bg-background/80 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-subtle focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors resize-y"
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-3 pt-1">
                    <input
                      id="contact-consent"
                      type="checkbox"
                      required
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1 size-4 rounded border-border-strong bg-background text-accent focus:ring-accent focus:ring-offset-background"
                    />
                    <label htmlFor="contact-consent" className="text-xs leading-relaxed text-muted">
                      I agree that {BRAND_NAME} may use these details to respond to my enquiry.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-accent-foreground transition-all duration-200 hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.99] disabled:opacity-50"
                  >
                    {status === "submitting" ? "Opening email..." : "SEND PROJECT ENQUIRY"}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
