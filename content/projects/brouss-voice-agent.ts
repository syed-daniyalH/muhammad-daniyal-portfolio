import type { PortfolioProject } from "@/types/portfolio";

export const broussVoiceAgent = {
  slug: "brouss-voice-agent",
  route: "/case-studies/brouss-voice-agent",
  tier: "flagship",
  title: "Brouss AI Voice Agent",
  shortTitle: "Brouss Voice",
  status: "implemented-final-validation-pending",
  statusLabel: "Implemented and Configured, Final Live Validation Pending",
  summary:
    "A bilingual after-hours AI voice agent for Brouss Elevators that classifies inbound calls, routes entrapment and emergency requests safely, handles informational and follow-up requests without ghost tickets, and hands validated outcomes into GoHighLevel post-call automation.",
  metaDescription:
    "Brouss AI Voice Agent case study covering Synthflow, GPT-4.1, ElevenLabs Multilingual v2, follow-up case lookup, GoHighLevel post-call automation, and structured after-hours support routing.",
  businessValue:
    "The agent gives Brouss a dependable after-hours front line: life-safety calls are escalated immediately, informational callers do not create unnecessary work, and service outcomes arrive in operations with structured context instead of vague voicemail.",
  role: "Voice AI and automation engineer responsible for Synthflow flow design, GPT and voice-setting calibration, follow-up case-lookup logic, GoHighLevel post-call automation mapping, and QA hardening across repeated revisions.",
  challenge: [
    "After-hours callers needed one number that could separate entrapment, emergency service, follow-up, informational, and commercial requests without sounding robotic or confused.",
    "A voice agent that treats every inquiry like a service ticket creates ghost work, so informational callers needed a direct answer path with no case creation.",
    "Returning callers often asked for case status, which required verification and graceful failure handling when the lookup did not return a match.",
    "Synthflow behavior changed with prompt, variable, and node edits, so the project needed repeated QA across dozens of versions rather than one polished prompt.",
  ],
  responsibilities: [
    "Modeled the after-hours voice system across 26 states, 32 transitions, and more than 50 recorded revisions, with V51 and V52 shown in the final screenshots.",
    "Designed bilingual call paths for entrapment, emergency dispatch, informational queries, sales and quotes, and existing-case follow-up.",
    "Built the follow-up branch around last-four verification and a live case lookup endpoint, including recovery when the lookup failed.",
    "Mapped post-call automation into GoHighLevel so contact creation, routing, webhooks, and internal notifications happened downstream instead of inside the voice layer itself.",
  ],
  solution: [
    "Treat the voice experience as a controlled state machine, with the global prompt limited to behavior rules and the flow nodes owning the actual conversation steps.",
    "Split the flow into explicit operational lanes: entrapment, other emergency service, informational only, no service, commercial requests, and follow-up case status.",
    "Use the existing-case lookup only when the caller context supports follow-up, and fall back into new-request handling when the lookup fails or the caller lacks the exact last four.",
    "Keep case creation and internal notifications in GoHighLevel post-call automation so operational records stay controlled by downstream workflow logic.",
  ],
  architecture: [
    {
      id: "classification",
      title: "Greeting and Classification Core",
      description:
        "Bix answers first, applies the life-safety warning, and classifies the caller into service categories and case-type values before the deeper branch logic begins.",
      technology: "Synthflow",
    },
    {
      id: "emergency",
      title: "Emergency and Entrapment Lanes",
      description:
        "Entrapment and emergency calls use dedicated branches that collect only the missing details and close with safety-first end-call behavior.",
      technology: "Emergency intake",
    },
    {
      id: "intake",
      title: "Service and Informational Branching",
      description:
        "Informational queries answer directly and avoid case creation, while service, sales, quotes, accounting, and engineering calls follow structured intake or routed closeout paths.",
      technology: "State-based call flow",
    },
    {
      id: "lookup",
      title: "Follow-up Case Lookup",
      description:
        "Existing-case follow-up calls collect the last four and hit the `case_fetch.php` endpoint, then either read the update, redirect for more help, or recover into new-request handling.",
      technology: "voice.brouss.com API",
    },
    {
      id: "postcall",
      title: "GoHighLevel Post-Call Automation",
      description:
        "After the call, GHL creates the contact, checks the existing-case flag, triggers the right webhook path, and sends internal notification to the operations team.",
      technology: "GoHighLevel",
    },
    {
      id: "tuning",
      title: "Voice Tuning and QA Layer",
      description:
        "GPT-4.1, ElevenLabs Multilingual v2, Synthflow STT, custom vocabulary, interruption tuning, and repeated QA rounds harden the caller experience across versions.",
      technology: "GPT-4.1 + ElevenLabs",
    },
  ],
  workflow: [
    {
      id: "greet",
      title: "Answer with the after-hours safety gate",
      description:
        "Bix opens with the life-safety warning, bilingual greeting, and first classification prompt so dangerous situations are handled before anything else.",
    },
    {
      id: "classify",
      title: "Classify into the right service lane",
      description:
        "The first conversation node assigns service category and case type so the call can move into entrapment, emergency, informational, follow-up, or general intake logic.",
    },
    {
      id: "collect",
      title: "Collect only the missing details",
      description:
        "Each branch asks only for the minimum missing information, with NATO building confirmation, digit-by-digit callback confirmation, and Spanish switching when needed.",
    },
    {
      id: "lookup",
      title: "Look up existing-case status when appropriate",
      description:
        "Follow-up callers provide the last four, the system checks the live endpoint, and the agent either reads the update or recovers into new-request handling.",
    },
    {
      id: "postcall",
      title: "Trigger post-call automation",
      description:
        "Structured call outcomes move into the GHL post-call workflow, which creates contacts, evaluates the case flag, triggers webhooks, and alerts the team.",
    },
    {
      id: "close",
      title: "Close with a branch-specific end call",
      description:
        "Each lane ends with a controlled message so the caller hears the right closeout instead of a generic goodbye or repeated phrasing.",
    },
  ],
  metrics: [
    {
      label: "States / transitions",
      value: "26 / 32",
      state: "owner-provided-qa-summary",
      source:
        "The handover document describes 26 states and 32 transitions in the final voice-flow design.",
    },
    {
      label: "Logged QA tests",
      value: "31",
      state: "owner-provided-qa-summary",
      source:
        "Ian's July 2026 QA summary lists 20 tests in round one and 11 tests in round two.",
    },
    {
      label: "Recorded revisions",
      value: "50+",
      state: "owner-provided-qa-summary",
      source:
        "The handover notes more than 50 versions, and the supplied Synthflow screenshots show late-stage V51 and V52 builds.",
    },
  ],
  decisions: [
    {
      decision: "Keep the global prompt behavioral and keep the steps in the nodes.",
      rationale:
        "Synthflow performed more reliably when the prompt handled tone and guardrails while the visible flow nodes owned the actual branch-by-branch dialogue.",
      impact:
        "The system stayed easier to debug, safer to revise, and more transparent during QA.",
    },
    {
      decision: "Add an informational-only branch with no case creation.",
      rationale:
        "General company questions should be answered directly, not turned into false service work.",
      impact:
        "The agent can be helpful without flooding operations with ghost tickets.",
    },
    {
      decision: "Let GHL post-call automation own case creation and notifications.",
      rationale:
        "The voice layer is a front door, but the CRM workflow is the safer place to create records, branch notifications, and keep operational ownership clear.",
      impact:
        "Operational updates remain auditable and synchronized even when the voice flow changes.",
    },
    {
      decision: "Preserve the live variable and API names even when they are inconsistent.",
      rationale:
        "The final handover explicitly warns that renaming fields like `{exisiting_case}` or the `case_last_five` API parameter would break the live flow.",
      impact:
        "The implementation favors safe incremental changes over cosmetic cleanup in a working production-adjacent system.",
    },
  ],
  reliability: [
    "Entrapment and life-safety keywords route to an immediate bilingual 911 message and controlled end call.",
    "Informational callers bypass case creation entirely, which prevents noise from entering the service workflow.",
    "The follow-up lane recovers cleanly when the case lookup fails, so the caller can still be logged as a new request instead of hitting a dead end.",
    "The post-call GHL workflow creates the contact, evaluates the existing-case condition, and routes into webhook or notification paths after the voice flow finishes.",
    "Critical variable and endpoint quirks were preserved intentionally to avoid breaking a working integration.",
  ],
  security: [
    "Sensitive case-status discussion requires the verified last four before the agent reads back customer-specific update notes.",
    "Informational branches are explicitly told not to collect caller name, building, or callback details when there is no service issue.",
    "Real caller recordings, transcripts, names, phone numbers, service addresses, and case identifiers stay out of public portfolio evidence.",
    "Operational records remain downstream in GHL and related systems rather than being treated as source-of-truth inside the voice layer.",
  ],
  testing: [
    "The handover document records two QA rounds in July 2026: 20 tests in round one and 11 in round two.",
    "Fixes validated in QA include the greeting, informational-only routing, follow-up detection, action-failure recovery, pause timing, and case-creation behavior.",
    "The project documents known Synthflow platform issues such as duplicate question phrasing, audio dropout, crash-recovery greeting behavior, and pronunciation drift.",
    "The final QA summary explicitly notes that cases were creating successfully in Dynamics 365 through the GHL post-call automation path.",
  ],
  technologies: [
    { name: "Synthflow", category: "voice" },
    { name: "GPT-4.1", category: "ai" },
    { name: "ElevenLabs Multilingual v2", category: "voice" },
    { name: "Synthflow STT", category: "voice" },
    { name: "GoHighLevel", category: "crm" },
    { name: "Webhook API", category: "automation" },
    { name: "Microsoft Dynamics 365", category: "crm" },
    { name: "Voice QA", category: "testing" },
  ],
  evidence: [
    {
      id: "brouss-voice-main-flow",
      projectSlug: "brouss-voice-agent",
      type: "image",
      title: "Main Synthflow branch overview",
      description:
        "The final V52 builder view shows the main greeting and classification node splitting into explicit lanes for entrapment, informational-only calls, other emergency service, and no-service handling.",
      state: "verified-public",
      src: "/media/brouss-voice-agent/main-flow-overview.png",
      alt: "Synthflow builder view showing the Brouss main flow with greeting, classification, and top-level emergency and informational branches.",
      width: 1224,
      height: 664,
      caption:
        "This screenshot makes the branch design visible: the voice agent is not one long prompt, but a controlled flow with distinct support lanes.",
      confidentialityNote:
        "Public screenshots use builder views only and avoid caller transcripts, service addresses, and case-history detail.",
    },
    {
      id: "brouss-voice-settings",
      projectSlug: "brouss-voice-agent",
      type: "image",
      title: "Voice settings and custom vocabulary",
      description:
        "The settings view captures the operational tuning layer: Synthflow STT on high accuracy, interruption sensitivity at five words, one-second pause before speaking, and custom vocabulary for terms like `entrapment`, `Bix`, and `Brouss`.",
      state: "verified-public",
      src: "/media/brouss-voice-agent/voice-settings-and-vocabulary.png",
      alt: "Synthflow settings panel for the Brouss voice agent showing STT, latency, interruption, and custom vocabulary controls.",
      width: 1280,
      height: 858,
      caption:
        "The handover document ties these settings directly to QA outcomes such as pacing, interruption handling, noise tolerance, and pronunciation fixes.",
    },
    {
      id: "brouss-voice-follow-up",
      projectSlug: "brouss-voice-agent",
      type: "image",
      title: "Follow-up and case-status branch",
      description:
        "This branch view shows the `Everything Else` intake path feeding the follow-up case-status update lane, including last-four collection, issue verification, and the `No Existing Case` fallback.",
      state: "verified-public",
      src: "/media/brouss-voice-agent/follow-up-case-status.png",
      alt: "Synthflow builder view of the Brouss follow-up and case-status update branch.",
      width: 1278,
      height: 864,
      caption:
        "Follow-up handling is separated from new-request intake so callers can be verified and routed differently when they are checking on an existing case.",
    },
    {
      id: "brouss-voice-lookup-recovery",
      projectSlug: "brouss-voice-agent",
      type: "image",
      title: "Case lookup success and recovery logic",
      description:
        "The builder view highlights the live case lookup action, the success path that reads the latest update, and the failure and not-found recovery branches that redirect safely back into supported intake.",
      state: "verified-public",
      src: "/media/brouss-voice-agent/case-lookup-recovery.png",
      alt: "Synthflow builder view showing the Brouss case lookup action, action success, and action failure recovery branches.",
      width: 1280,
      height: 867,
      caption:
        "The handover notes that variable names and API parameters were intentionally preserved here because cosmetic renames would break the working lookup integration.",
    },
    {
      id: "brouss-voice-post-call",
      projectSlug: "brouss-voice-agent",
      type: "image",
      title: "GoHighLevel post-call automation",
      description:
        "The post-call GHL workflow shows the downstream automation that creates the contact, evaluates whether the call relates to an existing case, triggers the correct webhook path, and sends the internal notification.",
      state: "verified-public",
      src: "/media/brouss-voice-agent/post-call-automation-builder.png",
      alt: "GoHighLevel workflow builder view for the Brouss post-call automation.",
      width: 1278,
      height: 892,
      caption:
        "This is where operational record creation happens, which is why the voice agent can stay focused on structured intake instead of becoming the system of record itself.",
    },
  ],
  remainingWork: [
    "Finish live testing for the `Brouss` and `Broos` pronunciation variants and settle the best phonetic spelling for production voice output.",
    "Follow up the undocumented round-one QA failures for tests 8, 17, 18, and 19 so the remaining unknowns are explicitly closed.",
    "If callers continue to interrupt the agent mid-response, test whether interruption sensitivity should move from five words to off.",
    "Complete final live synchronization validation across the downstream operational workflow after the last tuning changes.",
  ],
  confidentiality:
    "All public Brouss voice evidence must avoid caller identity, service addresses, case-history details, and real recordings or transcripts, even though the live system is configured to save them internally.",
} satisfies PortfolioProject;

