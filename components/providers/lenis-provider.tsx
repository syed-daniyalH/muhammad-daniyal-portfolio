"use client";

import type { ComponentProps, PropsWithChildren } from "react";
import { MotionConfig, useReducedMotion } from "framer-motion";
import { ReactLenis } from "lenis/react";

type ReactLenisOptions = NonNullable<
  ComponentProps<typeof ReactLenis>["options"]
>;

const LENIS_OPTIONS: ReactLenisOptions = {
  autoRaf: true,
  duration: 1.05,
  easing: (time: number): number =>
    Math.min(1, 1.001 - Math.pow(2, -10 * time)),
  gestureOrientation: "vertical",
  orientation: "vertical",
  smoothWheel: true,
  syncTouch: false,
  touchMultiplier: 1.1,
  wheelMultiplier: 0.9,
};

export function LenisProvider({
  children,
}: PropsWithChildren): React.JSX.Element {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <MotionConfig reducedMotion="always">{children}</MotionConfig>;
  }

  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis root options={LENIS_OPTIONS}>
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
