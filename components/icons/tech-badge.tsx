import React from "react";
import { TechVisualIcon } from "@/components/icons/tech-visual-icon";

interface TechBadgeProps {
  name: string;
  size?: "sm" | "md";
  showIcon?: boolean;
  className?: string;
}

export function TechBadge({
  name,
  size = "md",
  showIcon = true,
  className = "",
}: TechBadgeProps): React.JSX.Element {
  if (size === "sm") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border border-border-strong/60 bg-surface/70 px-2.5 py-1 text-[11px] font-medium tracking-tight text-foreground/85 transition-colors hover:border-accent/40 ${className}`}
      >
        {showIcon && <TechVisualIcon name={name} className="size-3.5" />}
        <span>{name}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-border-strong/70 bg-surface/80 px-3.5 py-1.5 text-xs font-medium tracking-tight text-foreground/90 transition-colors hover:border-accent/50 ${className}`}
    >
      {showIcon && <TechVisualIcon name={name} className="size-4" />}
      <span>{name}</span>
    </span>
  );
}
