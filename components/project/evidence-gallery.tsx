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
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#6B7280]">
                {asset.type}
              </span>
            </div>
            <h3
              id={`${asset.id}-title`}
              className="mt-3 text-lg font-semibold text-[#F9FAFB]"
            >
              {asset.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#9CA3AF]">
              {asset.description}
            </p>
            {asset.caption && (
              <p className="mt-3 text-xs leading-5 text-[#6B7280]">
                {asset.caption}
              </p>
            )}
            {asset.confidentialityNote && (
              <p className="mt-3 rounded-xl border border-amber-400/15 bg-amber-400/[0.05] px-4 py-3 text-xs leading-5 text-amber-100/80">
                {asset.confidentialityNote}
              </p>
            )}
          </div>

          {asset.type === "audio" && asset.src && (
            <AudioWaveform
              audioUrl={asset.src}
              title={asset.title}
              metadata={asset.caption ?? "Sanitized demonstration audio"}
            />
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
