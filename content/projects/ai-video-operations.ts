import type { PortfolioProject } from "@/types/portfolio";

export const aiVideoOperations = {
  slug: "ai-video-operations",
  route: "/case-studies/ai-video-operations",
  tier: "flagship",
  title: "AI Video: Automated Content Production System",
  shortTitle: "AI Video",
  categoryLabel: "CONTENT OPS · AUTOMATION PIPELINE",
  status: "production-implementation-qa-baseline",
  statusLabel: "Validated Implementation",
  summary:
    "An automated social production pipeline in n8n that handles script generation, compliance checks, HeyGen video rendering, and scheduled publishing to LinkedIn and Instagram with error alerting.",
  metaDescription:
    "AI Video Operations case study covering n8n workflows, OpenAI, HeyGen, LinkedIn API, Instagram Graph API, Google Sheets, and automated social video publishing.",
  businessValue:
    "The system turns social video production into a repeatable operating flow with scheduled content slots, platform-specific publishing, and guardrails that catch bad scripts, missing credits, invalid files, and failed uploads before they reach the account.",
  role: "Automation engineer responsible for the end-to-end n8n architecture, AI prompt flow, platform-specific publishing logic, guardrail design, and QA hardening for both LinkedIn and Instagram.",
  challenge: [
    "Daily short-form video output depended on many linked steps across ideation, scripting, generation, validation, upload, and publishing.",
    "LinkedIn and Instagram had different publishing mechanics, media requirements, and failure modes.",
    "AI copy had to stay inside brand, length, and compliance rules before spending HeyGen credits or posting publicly.",
    "The workflow needed logs, retries, and alerts so failures stayed visible instead of breaking silently.",
  ],
  responsibilities: [
    "Designed a 45-node LinkedIn workflow and a 27-node Instagram workflow around the same generation core.",
    "Built scheduled slot logic for rotating content pillars, posting windows, and avatar selection.",
    "Mapped JSON validation, compliance review, word-count enforcement, duration caps, and low-credit gates into the flow.",
    "Implemented provider polling, video validation, platform upload steps, Google Sheets logging, and failure-alert branches.",
  ],
  solution: [
    "Split the automation into shared generation stages and separate publishing paths for LinkedIn and Instagram.",
    "Use OpenAI for idea and script generation, then re-check the output with JSON, compliance, and length validators before video creation.",
    "Gate expensive or irreversible steps behind HeyGen credit checks, duration rules, file validation, and publish-readiness checks.",
    "Write operational logs to Google Sheets and surface failed runs through dedicated alert branches so the workflow stays reviewable.",
  ],
  architecture: [
    {
      id: "scheduler",
      title: "Scheduler and Slot Control",
      description:
        "Timed triggers choose the posting window, content pillar, and avatar rotation before any generation starts.",
      technology: "n8n",
    },
    {
      id: "ideation",
      title: "Title and Script Generation",
      description:
        "OpenAI produces the angle, title, and draft script for a 30-second vertical video format.",
      technology: "OpenAI GPT-4o",
    },
    {
      id: "qa",
      title: "Script QA Gate",
      description:
        "JSON validation, compliance review, word-count rules, and duration checks prevent weak scripts from reaching video generation.",
      technology: "Validation layer",
    },
    {
      id: "video",
      title: "HeyGen Video Pipeline",
      description:
        "Video jobs are submitted, polled, and checked for readiness before the workflow moves to a platform upload step.",
      technology: "HeyGen API",
    },
    {
      id: "linkedin",
      title: "LinkedIn Publish Branch",
      description:
        "The longer branch handles credit gating, file validation, upload initialization, chunk handling, finalize checks, and public post creation.",
      technology: "LinkedIn API",
    },
    {
      id: "instagram",
      title: "Instagram Publish Branch",
      description:
        "The lighter branch packages the completed video into an Instagram Reel container, waits for readiness, and publishes the post.",
      technology: "Instagram Graph API",
    },
    {
      id: "ops",
      title: "Logging and Alerts",
      description:
        "Execution summaries and publishing outcomes are written to Google Sheets, with dedicated failure branches for broken runs.",
      technology: "Google Sheets",
    },
  ],
  workflow: [
    {
      id: "schedule",
      title: "Select the daily content slot",
      description:
        "Timed triggers pick the publish window, content pillar, and avatar so the system can rotate output without manual setup.",
    },
    {
      id: "angle",
      title: "Generate the topic and title",
      description:
        "OpenAI creates the post angle and headline, then the flow validates the JSON response before moving forward.",
    },
    {
      id: "script",
      title: "Write and review the 30-second script",
      description:
        "A second model pass rewrites or fixes the script until it matches format, compliance, and spoken-language requirements.",
    },
    {
      id: "guardrails",
      title: "Apply guardrails before generation",
      description:
        "Word-count limits, duration caps, and low-credit checks stop weak or expensive runs before HeyGen is called.",
    },
    {
      id: "video",
      title: "Create and poll the HeyGen video",
      description:
        "The workflow submits the request, waits between retries, and checks provider status until the final media is ready.",
    },
    {
      id: "linkedin",
      title: "Validate and publish to LinkedIn",
      description:
        "The LinkedIn path downloads the video, validates the file, completes upload finalization, and then creates the public post.",
    },
    {
      id: "instagram",
      title: "Package and publish the Instagram Reel",
      description:
        "The Instagram path creates the media container, waits for upload readiness, and publishes the reel once the container is valid.",
    },
    {
      id: "ops",
      title: "Log the run and surface failures",
      description:
        "Execution summaries, video URLs, and publish outcomes are logged while failed branches emit dedicated error alerts for review.",
    },
  ],
  decisions: [
    {
      decision: "Keep LinkedIn and Instagram as separate terminal branches.",
      rationale:
        "The two platforms require different upload mechanics, readiness checks, and publish calls.",
      impact:
        "Each path can be hardened independently without burying platform-specific edge cases inside one giant publish step.",
    },
    {
      decision: "Validate structure before generating the video.",
      rationale:
        "A weak title or malformed script becomes more expensive once it reaches video generation and upload.",
      impact:
        "Broken runs are caught early, and the final media is more likely to pass downstream publish checks.",
    },
    {
      decision: "Validate the produced video before upload.",
      rationale:
        "Provider success does not automatically guarantee a usable file for platform delivery.",
      impact:
        "The LinkedIn path can fail fast on invalid media instead of wasting upload attempts and debugging time later.",
    },
    {
      decision: "Log runs and failures as first-class workflow outputs.",
      rationale:
        "Scheduled automation is hard to trust when the only signal is whether a post appears at the end.",
      impact:
        "The operator can review successful runs, investigate broken ones, and tune the system without guessing where a failure occurred.",
    },
  ],
  reliability: [
    "The LinkedIn flow checks HeyGen credits before generation and aborts early when the balance is below threshold.",
    "Script generation is validated twice: first for JSON structure, then for compliance, word count, and spoken duration.",
    "HeyGen jobs are polled through retry and wait nodes instead of assuming the video is ready immediately.",
    "The LinkedIn path validates the downloaded file, upload parts, and finalize payload before creating the public post.",
    "The Instagram path waits for media-container readiness before issuing the reel publish call.",
    "Both flows log execution context so failed runs can be reviewed instead of disappearing into a black box.",
  ],
  security: [
    "API keys, account tokens, and platform identifiers stay server-side inside the automation environment.",
    "Prompt rules block political content, off-brand language, and unsupported audience framing before scripts move to video generation.",
    "Public portfolio evidence uses canvas screenshots only and excludes live tokens, webhook URLs, and unpublished assets.",
  ],
  testing: [
    "Exported canvases confirm a 45-node LinkedIn flow and 27-node Instagram flow with distinct publish branches.",
    "QA checks cover title JSON validity, script JSON validity, word-count windows, duration caps, credit gates, and provider polling.",
    "LinkedIn testing includes video file validation, upload finalization guards, duplicate-resistant post preparation, and publish success handling.",
    "Instagram testing includes media container creation, upload wait, container validation, and reel publish completion.",
  ],
  technologies: [
    { name: "n8n", category: "automation" },
    { name: "OpenAI", category: "ai" },
    { name: "GPT-4o", category: "ai" },
    { name: "HeyGen API", category: "ai" },
    { name: "LinkedIn API", category: "automation" },
    { name: "Instagram Graph API", category: "automation" },
    { name: "Google Sheets", category: "automation" },
    { name: "Workflow Guardrails", category: "testing" },
    { name: "Content QA", category: "testing" },
  ],
  evidence: [
    {
      id: "instagram-workflow-canvas",
      projectSlug: "ai-video-operations",
      type: "image",
      title: "Instagram Reel workflow canvas",
      description:
        "The Instagram branch shows the timed trigger, AI title and script generation, HeyGen polling loop, Google Sheets logging, and final Reel publishing sequence.",
      state: "verified-public",
      src: "/media/ai-video-operations/instagram-workflow.png",
      alt: "A wide n8n canvas for the Instagram Reel automation flow.",
      width: 872,
      height: 126,
      caption:
        "27-node Instagram flow covering schedule, generation, validation, HeyGen polling, Sheets logging, media-container creation, and Reel publish.",
    },
    {
      id: "linkedin-workflow-canvas",
      projectSlug: "ai-video-operations",
      type: "image",
      title: "LinkedIn video workflow canvas",
      description:
        "The LinkedIn branch captures the heavier publish path: credit checks, script-length control, duration guardrails, video validation, upload finalization, post creation, and failure handling.",
      state: "verified-public",
      src: "/media/ai-video-operations/linkedin-workflow.png",
      alt: "A wide n8n canvas for the LinkedIn video publishing automation flow.",
      width: 1208,
      height: 158,
      caption:
        "45-node LinkedIn flow covering slot control, OpenAI generation, credit gating, HeyGen output validation, upload finalization, Google Sheets logging, and publish alerts.",
    },
  ],
  remainingWork: [
    "Add a zoomed public crop set for the most important validation and publishing nodes.",
    "Attach approved examples of live post outputs once the client signs off on them.",
    "Document the reporting layer that summarizes publish success across longer time windows.",
  ],
  confidentiality:
    "Public evidence excludes live tokens, account identifiers, unpublished media, and provider credentials.",
} satisfies PortfolioProject;

