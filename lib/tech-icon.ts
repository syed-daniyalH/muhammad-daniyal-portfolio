import type { LucideIcon } from "lucide-react";
import {
  AudioLines,
  Boxes,
  Braces,
  Clapperboard,
  Database,
  FileText,
  KeyRound,
  ListChecks,
  MessageCircleMore,
  Mic,
  Radio,
  ScanText,
  ShieldCheck,
  Sparkles,
  Webhook,
  Workflow,
} from "lucide-react";
import {
  siCaldotcom,
  siDocker,
  siFastapi,
  siFlask,
  siGooglechrome,
  siGooglegemini,
  siGooglesheets,
  siInstagram,
  siJavascript,
  siMake,
  siN8n,
  siNeon,
  siNextdotjs,
  siPostgresql,
  siPython,
  siQuickbooks,
  siReact,
  siSelenium,
  siSqlalchemy,
  siStripe,
  siTypescript,
  siWoocommerce,
  siZoho,
  type SimpleIcon,
} from "simple-icons";

export type TechVisual =
  | { kind: "brand"; icon: SimpleIcon; color: string }
  | { kind: "asset"; src: string }
  | { kind: "lucide"; icon: LucideIcon; color: string };

interface Rule {
  test: RegExp;
  visual: TechVisual;
}

const NEUTRAL = "#F5F5F3";

function asset(src: string): TechVisual {
  return { kind: "asset", src };
}

const RULES: readonly Rule[] = [
  // Asset-backed logos copied into /public/logos so the brand marks can render
  // exactly as provided in the workspace.
  { test: /heygen/i, visual: asset("/logos/heygen.svg") },
  {
    test: /gohighlevel|highlevel|\bghl\b/i,
    visual: asset("/logos/highlevel.png"),
  },
  { test: /synthflow/i, visual: asset("/logos/synthflow.svg") },
  {
    test: /dynamics|fieldboss/i,
    visual: asset("/logos/dynamics365.svg"),
  },
  { test: /openai/i, visual: asset("/logos/openai.svg") },
  { test: /linkedin/i, visual: asset("/logos/linkedin.svg") },
  { test: /power automate/i, visual: asset("/logos/power-automate.svg") },

  // --- Real brand icons (verified present in the installed simple-icons package) ---
  { test: /neon/i, visual: { kind: "brand", icon: siNeon, color: `#${siNeon.hex}` } },
  { test: /postgres/i, visual: { kind: "brand", icon: siPostgresql, color: `#${siPostgresql.hex}` } },
  { test: /fastapi/i, visual: { kind: "brand", icon: siFastapi, color: `#${siFastapi.hex}` } },
  { test: /next\.?js/i, visual: { kind: "brand", icon: siNextdotjs, color: NEUTRAL } },
  { test: /docker/i, visual: { kind: "brand", icon: siDocker, color: `#${siDocker.hex}` } },
  { test: /make\.com|^make$/i, visual: { kind: "brand", icon: siMake, color: `#${siMake.hex}` } },
  { test: /n8n/i, visual: { kind: "brand", icon: siN8n, color: `#${siN8n.hex}` } },
  { test: /quickbooks/i, visual: { kind: "brand", icon: siQuickbooks, color: `#${siQuickbooks.hex}` } },
  { test: /stripe/i, visual: { kind: "brand", icon: siStripe, color: `#${siStripe.hex}` } },
  { test: /sqlalchemy/i, visual: { kind: "brand", icon: siSqlalchemy, color: `#${siSqlalchemy.hex}` } },
  { test: /gemini/i, visual: { kind: "brand", icon: siGooglegemini, color: `#${siGooglegemini.hex}` } },
  { test: /google sheets/i, visual: { kind: "brand", icon: siGooglesheets, color: `#${siGooglesheets.hex}` } },
  { test: /chromedriver|chrome/i, visual: { kind: "brand", icon: siGooglechrome, color: `#${siGooglechrome.hex}` } },
  { test: /^react|react\s*\+|react and/i, visual: { kind: "brand", icon: siReact, color: `#${siReact.hex}` } },
  { test: /typescript/i, visual: { kind: "brand", icon: siTypescript, color: `#${siTypescript.hex}` } },
  { test: /javascript/i, visual: { kind: "brand", icon: siJavascript, color: `#${siJavascript.hex}` } },
  { test: /python/i, visual: { kind: "brand", icon: siPython, color: `#${siPython.hex}` } },
  { test: /flask/i, visual: { kind: "brand", icon: siFlask, color: NEUTRAL } },
  { test: /selenium/i, visual: { kind: "brand", icon: siSelenium, color: `#${siSelenium.hex}` } },
  { test: /woocommerce/i, visual: { kind: "brand", icon: siWoocommerce, color: `#${siWoocommerce.hex}` } },
  { test: /zoho/i, visual: { kind: "brand", icon: siZoho, color: `#${siZoho.hex}` } },
  { test: /instagram/i, visual: { kind: "brand", icon: siInstagram, color: `#${siInstagram.hex}` } },
  { test: /cal\.com/i, visual: { kind: "brand", icon: siCaldotcom, color: `#${siCaldotcom.hex}` } },

  // --- No official brand icon exists in the installed library for these companies/products.
  // Using a deliberately generic, non-brand-colored icon rather than a wrong or misleading one. ---
  { test: /twilio|sms/i, visual: { kind: "lucide", icon: Radio, color: NEUTRAL } },
  { test: /\bai\b|llm|gpt/i, visual: { kind: "lucide", icon: Sparkles, color: NEUTRAL } },
  { test: /gohighlevel|highlevel|\bghl\b/i, visual: { kind: "lucide", icon: MessageCircleMore, color: NEUTRAL } },
  { test: /voice/i, visual: { kind: "lucide", icon: AudioLines, color: NEUTRAL } },
  { test: /video/i, visual: { kind: "lucide", icon: Clapperboard, color: NEUTRAL } },

  // --- Concepts and generic terms that were never a brand to begin with;
  // a representative icon is the correct choice here, not a gap. ---
  { test: /ocr/i, visual: { kind: "lucide", icon: ScanText, color: NEUTRAL } },
  { test: /voice capture/i, visual: { kind: "lucide", icon: Mic, color: NEUTRAL } },
  { test: /jwt/i, visual: { kind: "lucide", icon: KeyRound, color: NEUTRAL } },
  { test: /webhook/i, visual: { kind: "lucide", icon: Webhook, color: NEUTRAL } },
  { test: /rest api/i, visual: { kind: "lucide", icon: Braces, color: NEUTRAL } },
  { test: /document/i, visual: { kind: "lucide", icon: FileText, color: NEUTRAL } },
  { test: /\bforms?\b/i, visual: { kind: "lucide", icon: ListChecks, color: NEUTRAL } },
  { test: /security|access|role/i, visual: { kind: "lucide", icon: ShieldCheck, color: NEUTRAL } },
  { test: /\bcrm\b/i, visual: { kind: "lucide", icon: Database, color: NEUTRAL } },
  { test: /automation/i, visual: { kind: "lucide", icon: Workflow, color: NEUTRAL } },
] as const;

const FALLBACK: TechVisual = { kind: "lucide", icon: Boxes, color: NEUTRAL };

export function resolveTechVisual(name: string): TechVisual {
  const match = RULES.find((rule) => rule.test.test(name));
  return match?.visual ?? FALLBACK;
}
