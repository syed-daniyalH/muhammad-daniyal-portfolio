"use client";

import Image from "next/image";

import { BrandIcon } from "@/components/icons/brand-icon";
import { resolveTechVisual } from "@/lib/tech-icon";

export function TechVisualIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}): React.JSX.Element {
  const visual = resolveTechVisual(name);

  if (visual.kind === "brand") {
    return (
      <BrandIcon
        icon={visual.icon}
        label={`${name} logo`}
        color={visual.color}
        className={className}
        decorative
      />
    );
  }

  if (visual.kind === "asset") {
    return (
      <span
        aria-hidden="true"
        className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-border/70 bg-background/90 p-0.5 ${
          className ?? ""
        }`}
      >
        <Image
          src={visual.src}
          alt=""
          fill
          sizes="16px"
          className="object-contain"
        />
      </span>
    );
  }

  const Icon = visual.icon;
  return <Icon aria-hidden="true" className={className} style={{ color: visual.color }} />;
}
