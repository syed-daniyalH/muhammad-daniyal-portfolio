const FALLBACK_SITE_URL = "http://localhost:3000";

function normalizeSiteUrl(
  value: string | undefined,
): string | null {
  const trimmed = value?.trim();

  if (!trimmed) {
    return null;
  }

  const withProtocol =
    /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed)
      ? trimmed
      : trimmed.includes("localhost") ||
          trimmed.startsWith("127.0.0.1")
        ? `http://${trimmed}`
        : `https://${trimmed}`;

  try {
    const url = new URL(withProtocol);

    if (
      url.protocol !== "http:" &&
      url.protocol !== "https:"
    ) {
      return null;
    }

    url.pathname = "";
    url.search = "";
    url.hash = "";

    return url.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

export function getSiteUrl(): string {
  return (
    normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
    normalizeSiteUrl(
      process.env.VERCEL_PROJECT_PRODUCTION_URL,
    ) ??
    normalizeSiteUrl(process.env.VERCEL_URL) ??
    FALLBACK_SITE_URL
  );
}

export function getSiteOrigin(): string {
  return new URL(getSiteUrl()).origin;
}
