"use client";

import dynamic from "next/dynamic";

export interface AudioWaveformProps {
  audioUrl?: string;
  title?: string;
  metadata?: string;
  className?: string;
}

function AudioWaveformSkeleton(): React.JSX.Element {
  return (
    <div
      role="status"
      aria-label="Loading audio waveform"
      className="overflow-hidden rounded-2xl border border-[#2D3748] bg-[#0B0F17]/70 p-5"
    >
      <div className="animate-pulse">
        <div className="h-4 w-48 rounded-full bg-[#2D3748]/80" />

        <div className="mt-6 flex h-24 items-center gap-1 rounded-xl bg-[#161E2E]/70 px-4">
          {Array.from({ length: 36 }).map((_, index) => (
            <span
              key={index}
              className="flex-1 rounded-full bg-[#2D3748]"
              style={{
                height: `${24 + ((index * 17) % 62)}%`,
              }}
            />
          ))}
        </div>

        <div className="mt-5 h-11 rounded-xl bg-[#161E2E]" />
      </div>
    </div>
  );
}

const AudioWaveformClient = dynamic(
  () =>
    import("@/components/case-study/audio-waveform-client").then(
      (module) => module.AudioWaveformClient,
    ),
  {
    ssr: false,
    loading: AudioWaveformSkeleton,
  },
);

export function AudioWaveform({
  audioUrl = "/media/brouss-synthflow-test-sanitized.wav",
  title = "Bilingual Service Cancellation Test",
  metadata = "Synthetic placeholder waveform - 00:24s",
  className,
}: AudioWaveformProps): React.JSX.Element {
  return (
    <AudioWaveformClient
      audioUrl={audioUrl}
      title={title}
      metadata={metadata}
      className={className}
    />
  );
}
