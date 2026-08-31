import assert from "node:assert/strict";
import test from "node:test";

import { resolveTechVisual } from "../lib/tech-icon";

test("resolveTechVisual uses local assets for supported brand logos", () => {
  const cases = [
    ["HeyGen", "/logos/heygen.svg"],
    ["GoHighLevel", "/logos/highlevel.png"],
    ["Synthflow", "/logos/synthflow.svg"],
    ["Microsoft Dynamics 365", "/logos/dynamics365.svg"],
    ["OpenAI", "/logos/openai.svg"],
    ["LinkedIn API", "/logos/linkedin.svg"],
    ["Power Automate", "/logos/power-automate.svg"],
  ] as const;

  cases.forEach(([name, src]) => {
    const visual = resolveTechVisual(name);

    assert.equal(visual.kind, "asset", `${name} should use a local asset`);
    assert.equal(visual.src, src);
  });
});
