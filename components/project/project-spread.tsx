import type { ReactNode } from "react";

import { ScrollReveal } from "@/components/motion/scroll-reveal";

export function Spread({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}): React.JSX.Element {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-28 border-b border-border/60 py-14 last:border-b-0 sm:py-16"
    >
      <ScrollReveal>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
          {eyebrow}
        </p>
        <h2
          id={`${id}-title`}
          className="mt-3 text-2xl font-semibold tracking-normal text-foreground sm:text-3xl"
        >
          {title}
        </h2>
        {description && (
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{description}</p>
        )}
      </ScrollReveal>

      <div className="mt-8">{children}</div>
    </section>
  );
}

export function BulletList({ items }: { items: readonly string[] }): React.JSX.Element {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-7 text-foreground/85">
          <span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
