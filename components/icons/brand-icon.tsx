import type { CSSProperties, SVGProps } from "react";
import type { SimpleIcon } from "simple-icons";

interface BrandIconProps
  extends Omit<SVGProps<SVGSVGElement>, "color"> {
  icon: SimpleIcon;
  label: string;
  color?: string;
  decorative?: boolean;
}

export function BrandIcon({
  icon,
  label,
  color,
  decorative = false,
  className,
  style,
  ...svgProps
}: BrandIconProps): React.JSX.Element {
  const resolvedColor = color ?? `#${icon.hex}`;

  const mergedStyle: CSSProperties = {
    color: resolvedColor,
    ...style,
  };

  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : label}
      focusable="false"
      className={className}
      style={mergedStyle}
      {...svgProps}
    >
      {!decorative && <title>{label}</title>}
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}
