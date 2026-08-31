import type { PortfolioProject } from "@/types/portfolio";

export const venzoAiChatbot = {
  slug: "venzo-ai-chatbot",
  route: "/case-studies/venzo-ai-chatbot",
  tier: "supporting",
  title: "Venzo Chatbot & Booking Confirmation System",
  shortTitle: "Venzo Booking",
  summary:
    "A conversational sales assistant and booking-confirmation system for VenAI Agency that answers service questions, qualifies prospects, routes high-intent leads into Cal.com scheduling, and keeps GoHighLevel synced through booking, reschedule, and cancellation events.",
  metaDescription:
    "Venzo chatbot and booking-confirmation case study covering GoHighLevel Conversation AI, qualification logic, Cal.com scheduling, GHL CRM planning, booking confirmation, reschedule and cancellation automations, and QA validation.",
  websiteUrl: "https://www.venaiagency.com/",
  websiteLabel: "VenAI Agency website",
  businessValue:
    "The system turns website conversations into qualified sales opportunities and then protects the handoff by keeping booking confirmation, reschedule, and cancellation events synchronized back into GoHighLevel.",
  challenge: [
    "Website prospects needed faster answers and a cleaner path from first question to booked consultation.",
    "Lead qualification needed to feel consultative rather than robotic or form-like.",
    "The chatbot had to explain services accurately without overstating what VenAI delivers.",
    "Contact capture, booking, and human handoff needed to stay aligned with the CRM workflow.",
    "Once a call was booked, rescheduled, or cancelled, Cal.com events still had to update the right GHL contact and automation state without creating duplicates or stale reminders.",
  ],
  role:
    "Implementation Specialist and Conversational AI & GHL Automation Developer responsible for chatbot conversation design, qualification logic, GHL CRM integration planning, booking and handoff flow design, Cal.com event automation, QA testing, and automation architecture.",
  responsibilities: [
    "Designed the core conversation framework for understanding, qualifying, capturing, converting, and handoff.",
    "Built qualification logic around business type, bottlenecks, outcomes, lead source, and buying intent.",
    "Planned the GoHighLevel CRM actions for contact capture, field writes, duplicate prevention, and handover behavior.",
    "Mapped the high-intent booking path into Cal.com with follow-up confirmation behavior.",
    "Built or mapped the booking confirmation, reschedule, and cancellation automations that keep Cal.com and GoHighLevel aligned after the chatbot handoff.",
  ],
  solution: [
    "Use short consultative replies that answer first, then guide the prospect to the next useful step.",
    "Progress the conversation through business problem discovery, lead qualification, relevant solution recommendation, and consultation booking.",
    "Only capture contact details when intent is clear, and keep the conversation attached to the correct CRM contact.",
    "Route high-intent users directly into the booking path while preserving human handoff during office hours.",
    "Handle booking confirmation, reschedule, and cancellation as explicit automation flows so post-booking CRM state stays accurate.",
  ],
  architecture: [
    {
      id: "chat",
      title: "GoHighLevel Conversation AI",
      description:
        "The core chatbot handles live web conversations with structured prompt logic and intent-aware replies.",
      technology: "GoHighLevel",
    },
    {
      id: "qualification",
      title: "Qualification Layer",
      description:
        "Prospect context is gathered through natural conversation rather than a long form or repeated prompts.",
      technology: "Conversational AI",
    },
    {
      id: "crm",
      title: "GHL CRM Actions",
      description:
        "Contact details, conversation history, and handoff actions stay attached to the right lead record.",
      technology: "GoHighLevel CRM",
    },
    {
      id: "booking",
      title: "Cal.com Booking Path",
      description:
        "High-intent prospects are routed into consultation scheduling when they are ready to act.",
      technology: "Cal.com",
    },
    {
      id: "followup",
      title: "Confirmation Flow",
      description:
        "Booked consultations move into confirmation and follow-up messaging after the handoff point.",
      technology: "GHL Automation",
    },
    {
      id: "events",
      title: "Cal.com Event Sync",
      description:
        "Booking, reschedule, and cancellation webhooks update the right GHL contact and workflow state after the calendar action occurs.",
      technology: "n8n + Cal.com Webhooks",
    },
  ],
  workflow: [
    {
      id: "question",
      title: "Visitor question",
      description:
        "A prospect starts with a natural-language service question or business enquiry.",
    },
    {
      id: "explanation",
      title: "AI service explanation",
      description:
        "Venzo explains the relevant VenAI capability in concise, business-aware language.",
    },
    {
      id: "discovery",
      title: "Business problem discovery",
      description:
        "The chatbot identifies the prospect's bottleneck, goals, and current lead-handling process.",
    },
    {
      id: "qualification",
      title: "Lead qualification",
      description:
        "Intent level, fit, and next-step readiness are determined without turning the flow into a questionnaire.",
    },
    {
      id: "recommendation",
      title: "Relevant solution recommendation",
      description:
        "The conversation connects the prospect's problem to the VenAI offer that best fits.",
    },
    {
      id: "booking",
      title: "Cal.com consultation booking",
      description:
        "High-intent leads are sent directly to the consultation booking link when they are ready.",
    },
    {
      id: "confirmation",
      title: "GHL confirmation email",
      description:
        "After booking, the CRM flow moves the lead into confirmation and follow-up communication.",
    },
    {
      id: "reschedule",
      title: "Reschedule and cancellation sync",
      description:
        "Later Cal.com events update or clear booking state in GoHighLevel so reminders and follow-up automation reflect the latest appointment outcome.",
    },
  ],
  decisions: [
    {
      decision: "Understand first, then guide.",
      rationale:
        "Prospects respond better to a consultative exchange than to scripted lead capture.",
      impact:
        "The chatbot can qualify demand while still feeling natural and helpful.",
    },
    {
      decision: "Handle low, mid, and high intent differently.",
      rationale:
        "Not every visitor is ready to book, and over-pushing weakens trust.",
      impact:
        "High-intent users move faster while exploratory visitors still receive relevant answers.",
    },
    {
      decision: "Keep contact capture tied to intent and CRM state.",
      rationale:
        "Duplicate records and premature contact prompts create friction and reduce lead quality.",
      impact:
        "The system preserves cleaner handoff into booking and follow-up automation.",
    },
    {
      decision: "Treat booking confirmation, reschedule, and cancellation as separate webhook automations.",
      rationale:
        "Post-booking events do not share the same CRM outcome, so one generic webhook path would make the follow-up state harder to trust.",
      impact:
        "The CRM can apply different updates for confirmed, moved, and cancelled appointments without muddying lead status.",
    },
  ],
  reliability: [
    "The chatbot remembers previously supplied answers instead of restarting discovery.",
    "One purposeful question at a time keeps qualification structured without feeling robotic.",
    "Booking and handoff paths are separated so high-intent routing stays predictable.",
    "CRM planning includes duplicate prevention and correct contact attachment.",
    "The booking-confirmation flow can reuse an existing GHL contact or create and merge one before updating booking state.",
    "Reschedule and cancellation flows remove or re-enroll the contact in the correct workflow so follow-up messages stay current.",
  ],
  security: [
    "Internal prompts, credentials, and private configuration are not exposed to the visitor.",
    "Pricing is discussed only when requested and without invented figures.",
    "Sensitive industries receive more careful treatment before moving into sales language.",
    "Human handoff rules are constrained by office-hours workflow logic.",
    "Webhook automations update CRM state without exposing private booking payloads or internal action settings in the public case study.",
  ],
  testing: [
    "Conversation QA checks context memory, concise replies, and one-question-at-a-time progression.",
    "CRM validation checks contact-field writes, contact attachment, and duplicate prevention.",
    "Booking validation checks high-intent routing into the Cal.com consultation link.",
    "Handover validation checks office-hours human routing and after-hours callback capture.",
    "Booking-confirmation testing checks contact search, create-or-merge behavior, booking data writes, source tagging, and workflow trigger behavior.",
    "Reschedule testing checks contact lookup, booking-data update, workflow removal, and workflow re-enrollment.",
    "Cancellation testing checks contact lookup, cancellation email trigger, booking-data clearing, and workflow removal.",
  ],
  technologies: [
    { name: "GoHighLevel", category: "crm" },
    { name: "Conversation AI", category: "ai" },
    { name: "Cal.com", category: "automation" },
    { name: "n8n", category: "automation" },
    { name: "CRM Automation", category: "crm" },
    { name: "Webhooks", category: "automation" },
    { name: "Lead Qualification", category: "ai" },
    { name: "Web Chat", category: "frontend" },
  ],
  evidence: [
    {
      id: "venzo-overview",
      projectSlug: "venzo-ai-chatbot",
      type: "document",
      title: "Venzo implementation overview",
      description:
        "Internal implementation overview documenting conversation design, qualification logic, booking flow, and QA checks.",
      state: "private-not-publishable",
      source: "Internal implementation overview",
      caption:
        "Conversation design, QA framework, and booking-flow review notes.",
      confidentialityNote:
        "Keep private prompt rules, credentials, and internal action settings out of public screenshots.",
    },
    {
      id: "venzo-booking-confirmation",
      projectSlug: "venzo-ai-chatbot",
      type: "image",
      title: "Cal.com to GHL booking confirmation flow",
      description:
        "This n8n execution view shows the booking confirmation workflow creating or reusing the correct GHL contact, merging state when needed, updating booking data, tagging the lead source, and triggering the downstream GHL workflow.",
      state: "verified-public",
      src: "/media/venzo-chatbot/cal-ghl-booking-confirmation.png",
      alt: "n8n execution view of the Cal.com to GoHighLevel booking confirmation workflow for Venzo.",
      width: 1280,
      height: 844,
      caption:
        "Confirmation is handled as its own webhook path so the CRM can write the appointment state before follow-up automation begins.",
    },
    {
      id: "venzo-booking-reschedule",
      projectSlug: "venzo-ai-chatbot",
      type: "image",
      title: "Cal.com to GHL booking reschedule flow",
      description:
        "The reschedule automation finds the right GHL contact, updates the booking details, removes the contact from the old workflow state, and re-enrolls them into the correct follow-up path.",
      state: "verified-public",
      src: "/media/venzo-chatbot/cal-ghl-booking-reschedule.png",
      alt: "n8n execution view of the Cal.com to GoHighLevel booking reschedule workflow for Venzo.",
      width: 1280,
      height: 862,
      caption:
        "Reschedules are treated as a distinct CRM event so reminders and handoff timing reflect the moved appointment rather than the original one.",
    },
    {
      id: "venzo-booking-cancelled",
      projectSlug: "venzo-ai-chatbot",
      type: "image",
      title: "Cal.com to GHL booking cancellation flow",
      description:
        "The cancellation automation extracts the event data, finds the matching GHL contact, triggers the cancellation email, clears booking details, removes the contact from the workflow, and returns a clean webhook response.",
      state: "verified-public",
      src: "/media/venzo-chatbot/cal-ghl-booking-cancelled.png",
      alt: "n8n execution view of the Cal.com to GoHighLevel booking cancellation workflow for Venzo.",
      width: 1280,
      height: 862,
      caption:
        "Cancellation handling closes the loop so stale booked-state data and follow-up messaging do not remain active after the appointment is dropped.",
    },
  ],
  status: "production-implementation-qa-baseline",
  statusLabel: "Production Implementation + QA Baseline",
  remainingWork: [
    "Publish approved public screenshots of the GoHighLevel bot configuration.",
    "Confirm final production contact-write and booking-action behavior in the live environment.",
    "Add an approved public view of the GHL-side workflow that receives these Cal.com event updates.",
    "Add an approved public conversation example after client review.",
  ],
  confidentiality:
    "Public examples should avoid exposing internal prompt rules, private CRM actions, credentials, or unpublished commercial details.",
} satisfies PortfolioProject;

