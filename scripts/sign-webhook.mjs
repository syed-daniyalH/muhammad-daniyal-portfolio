import { createHmac } from "node:crypto";

const [payloadArgument, secret] = process.argv.slice(2);

async function readStdin() {
  process.stdin.setEncoding("utf8");

  let payload = "";

  for await (const chunk of process.stdin) {
    payload += chunk;
  }

  return payload;
}

const payload =
  payloadArgument === "--stdin" ? await readStdin() : payloadArgument;

if (!payload || !secret) {
  console.error(
    "Usage: pnpm sign:webhook '<json-payload>' '<secret>'",
  );
  console.error(
    "   or: printf '%s' '<json-payload>' | pnpm sign:webhook --stdin '<secret>'",
  );
  process.exit(1);
}

if (secret.length < 32) {
  console.error("The test secret must be at least 32 characters.");
  process.exit(1);
}

const signature = createHmac("sha256", secret)
  .update(payload, "utf8")
  .digest("hex");

console.log(`sha256=${signature}`);
