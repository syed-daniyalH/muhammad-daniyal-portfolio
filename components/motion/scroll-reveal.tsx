"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  id?: string;
}

/**
 * A single, deliberately restrained reveal-on-scroll wrapper used across
 * the site instead of ad-hoc whileInView props on every section. Honors
 * the app-wide `MotionConfig reducedMotion="user"` set in LenisProvider,
 * so it automatically becomes a no-op animation for reduced-motion users.
 *
 * Renders a plain `motion.div` (a static property access rather than a
 * dynamic one) so framer-motion's client/server proxy boundary stays
 * intact when this is rendered from Server Component trees.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 18,
  id,
}: ScrollRevealProps): React.JSX.Element {
  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  /** Seconds between each direct child's reveal. */
  step?: number;
}

/**
 * Wrap a list of children to reveal them with a shared, gentle stagger.
 * Pass ScrollReveal (or motion elements) as direct children.
 */
export function StaggerGroup({
  children,
  className,
  step = 0.08,
}: StaggerGroupProps): React.JSX.Element {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: step }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
} as const;
