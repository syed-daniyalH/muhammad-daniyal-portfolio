import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { AudioWaveform } from "@/components/case-study/audio-waveform";
import { JsonTreeViewer } from "@/components/case-study/json-tree-viewer";
import { CodeBlock } from "@/components/code/code-block";
import { EvidenceStatePill } from "@/components/project/project-status";
import type { EvidenceAsset } from "@/types/portfolio";

export function EvidenceGallery({
  assets,
}: {
  assets: readonly EvidenceAsset[];
}): React.JSX.Element {
  return (
    <div className="space-y-8">
      {assets.map((asset) => (
        <section
          key={asset.id}
          aria-labelledby={`${asset.id}-title`}
          className="space-y-4"
        >
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <EvidenceStatePill state={asset.state} />
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-subtle">
                {asset.type}
              </span>
            </div>
            <h3
              id={`${asset.id}-title`}
              className="mt-3 text-lg font-semibold text-foreground"
            >
              {asset.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              {asset.description}
            </p>
            {asset.caption && (
              <p className="mt-3 text-xs leading-5 text-muted-subtle">
                {asset.caption}
              </p>
            )}
            {asset.confidentialityNote && (
              <p className="mt-3 rounded-xl border border-caution/15 bg-caution/[0.05] px-4 py-3 text-xs leading-5 text-caution/90">
                {asset.confidentialityNote}
              </p>
            )}
            {asset.externalUrl && (
              <a
                href={asset.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 py-3 text-xs font-semibold text-accent-foreground transition-all hover:-translate-y-0.5 hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                {asset.externalLabel ?? "Open evidence"}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            )}
          </div>

          {asset.type === "audio" && asset.src && (
            <AudioWaveform
              audioUrl={asset.src}
              title={asset.title}
              metadata={asset.caption ?? "Sanitized demonstration audio"}
            />
          )}

          {asset.type === "image" && asset.src && asset.alt && (
            <div className="overflow-hidden rounded-2xl border border-border bg-panel">
              <Image
                src={asset.src}
                alt={asset.alt}
                width={asset.width ?? 1600}
                height={asset.height ?? 900}
                sizes="(min-width: 1280px) 960px, (min-width: 768px) 80vw, 100vw"
                className="h-auto w-full"
              />
            </div>
          )}

          {asset.type === "video" && asset.src && (
            <div className="overflow-hidden rounded-2xl border border-border bg-panel">
              <video
                controls
                preload="metadata"
                playsInline
                className="h-auto w-full bg-black"
                aria-label={asset.alt ?? asset.title}
              >
                <source src={asset.src} type="video/mp4" />
              </video>
            </div>
          )}

          {asset.type === "video" && asset.embedUrl && (
            <div className="overflow-hidden rounded-2xl border border-border bg-panel">
              <div className="aspect-video w-full">
                <iframe
                  src={asset.embedUrl}
                  title={asset.title}
                  className="h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {asset.trace && (
            <JsonTreeViewer
              value={asset.trace}
              label={`${asset.title} JSON`}
              initiallyExpandedDepth={2}
            />
          )}

          {asset.code && (
            <CodeBlock
              code={asset.code.body}
              language={asset.code.language}
              filename={asset.code.filename}
              label={asset.code.label}
            />
          )}
        </section>
      ))}
    </div>
  );
}
