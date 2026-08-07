"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  LoaderCircle,
  Pause,
  Play,
  Radio,
  Volume2,
  VolumeX,
} from "lucide-react";
import WaveSurfer from "wavesurfer.js";

import type { AudioWaveformProps } from "@/components/case-study/audio-waveform";

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);

  return `${minutes}:${remainder.toString().padStart(2, "0")}`;
}

export function AudioWaveformClient({
  audioUrl,
  title,
  metadata,
  className = "",
}: Required<
  Pick<AudioWaveformProps, "audioUrl" | "title" | "metadata">
> &
  Pick<AudioWaveformProps, "className">): React.JSX.Element {
  const waveformContainerRef = useRef<HTMLDivElement | null>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);

  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const container = waveformContainerRef.current;
    if (!container) return;

    setReady(false);
    setPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setErrorMessage(null);

    const waveSurfer = WaveSurfer.create({
      container,
      url: audioUrl,
      height: 96,
      waveColor: "#7C93AD",
      progressColor: "#E3A548",
      cursorColor: "#F5F5F3",
      cursorWidth: 1,
      barWidth: 2,
      barGap: 2,
      barRadius: 2,
      normalize: true,
      dragToSeek: true,
      hideScrollbar: true,
      autoScroll: false,
      autoCenter: true,
    });

    waveSurferRef.current = waveSurfer;

    const unsubscribeReady = waveSurfer.on(
      "ready",
      (loadedDuration: number) => {
        setDuration(loadedDuration);
        setReady(true);
      },
    );

    const unsubscribeTimeUpdate = waveSurfer.on(
      "timeupdate",
      (time: number) => setCurrentTime(time),
    );

    const unsubscribePlay = waveSurfer.on("play", () => setPlaying(true));
    const unsubscribePause = waveSurfer.on("pause", () => setPlaying(false));

    const unsubscribeFinish = waveSurfer.on("finish", () => {
      setPlaying(false);
      setCurrentTime(waveSurfer.getDuration());
    });

    const unsubscribeError = waveSurfer.on("error", (error: Error) => {
      setErrorMessage(
        error.message || "The audio recording could not be loaded.",
      );
      setReady(false);
      setPlaying(false);
    });

    return () => {
      unsubscribeReady();
      unsubscribeTimeUpdate();
      unsubscribePlay();
      unsubscribePause();
      unsubscribeFinish();
      unsubscribeError();

      waveSurfer.destroy();
      waveSurferRef.current = null;
    };
  }, [audioUrl]);

  const togglePlayback = useCallback(async (): Promise<void> => {
    const waveSurfer = waveSurferRef.current;
    if (!waveSurfer || !ready) return;

    try {
      await waveSurfer.playPause();
    } catch {
      setErrorMessage("Playback was blocked by the browser.");
    }
  }, [ready]);

  const toggleMute = useCallback((): void => {
    const waveSurfer = waveSurferRef.current;
    if (!waveSurfer) return;

    const nextMuted = !muted;
    waveSurfer.setMuted(nextMuted);
    setMuted(nextMuted);
  }, [muted]);

  return (
    <section
      role="region"
      aria-label={`${title} audio player`}
      className={`overflow-hidden rounded-2xl border border-border bg-background/72 shadow-[0_22px_60px_rgba(0,0,0,0.26)] ${className}`}
    >
      <div className="flex flex-col gap-4 border-b border-border/80 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Radio aria-hidden="true" className="size-4 text-accent" />
            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-accent">
              Voice-agent recording
            </span>
          </div>

          <h3 className="mt-2 text-base font-semibold text-foreground">
            {title}
          </h3>
          <p className="mt-1 text-xs text-muted">{metadata}</p>
        </div>

        <span className="w-fit rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1.5 text-[10px] font-medium text-emerald-300">
          Replace with approved audio
        </span>
      </div>

      <div className="p-5">
        <div className="relative overflow-hidden rounded-xl border border-border/80 bg-console px-3 py-4">
          {!ready && !errorMessage && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-console/80 backdrop-blur-sm">
              <LoaderCircle
                aria-hidden="true"
                className="size-5 animate-spin text-accent"
              />
              <span className="ml-2 text-xs text-muted">
                Loading waveform...
              </span>
            </div>
          )}

          <div
            ref={waveformContainerRef}
            aria-label="Interactive audio waveform"
          />
        </div>

        {errorMessage && (
          <p
            role="alert"
            className="mt-3 rounded-lg border border-red-400/20 bg-red-400/[0.06] px-3 py-2 text-xs text-red-200"
          >
            {errorMessage}
          </p>
        )}

        <div className="mt-5 flex items-center gap-4">
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={togglePlayback}
            disabled={!ready}
            aria-label={
              playing
                ? "Pause voice-agent recording"
                : "Play voice-agent recording"
            }
            className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-[0_12px_30px_rgba(227,165,72,0.28)] transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {playing ? (
              <Pause aria-hidden="true" className="size-5" />
            ) : (
              <Play aria-hidden="true" className="ml-0.5 size-5" />
            )}
          </motion.button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between font-mono text-[10px] text-muted">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div
              aria-hidden="true"
              className="mt-2 h-1 overflow-hidden rounded-full bg-border"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent-soft to-accent transition-[width] duration-150"
                style={{
                  width:
                    duration > 0
                      ? `${Math.min(100, (currentTime / duration) * 100)}%`
                      : "0%",
                }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={toggleMute}
            disabled={!ready}
            aria-label={
              muted
                ? "Unmute voice-agent recording"
                : "Mute voice-agent recording"
            }
            className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-muted transition-colors hover:border-accent/40 hover:text-accent disabled:cursor-not-allowed disabled:opacity-45"
          >
            {muted ? (
              <VolumeX aria-hidden="true" className="size-4" />
            ) : (
              <Volume2 aria-hidden="true" className="size-4" />
            )}
          </button>
        </div>

        <p className="mt-5 text-[10px] leading-5 text-muted-subtle">
          The included file is a synthetic audio placeholder. Replace it only
          with a client-approved recording after removing names, telephone
          numbers, addresses, case identifiers, and confidential details.
        </p>
      </div>
    </section>
  );
}
