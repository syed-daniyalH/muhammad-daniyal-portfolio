import type { ReactNode } from "react";

export function ProjectSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}): React.JSX.Element {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-24 border-b border-[#2D3748]/60 py-16"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.34fr_0.66fr] lg:px-10">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-300">
            {eyebrow}
          </p>
          <h2
            id={`${id}-title`}
            className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#F9FAFB] sm:text-3xl"
          >
            {title}
          </h2>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

export function BulletList({
  items,
}: {
  items: readonly string[];
}): React.JSX.Element {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-7 text-[#D1D5DB]">
          <span
            aria-hidden="true"
            className="mt-3 size-1.5 shrink-0 rounded-full bg-cyan-300"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
