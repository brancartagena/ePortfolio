import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type TechBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  label: string;
};

export function TechBadge({ label, className, ...props }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-8 items-center rounded-sm border border-white/15 bg-white/[0.04] px-3 text-xs font-medium text-foreground/90 shadow-soft backdrop-blur-md",
        className,
      )}
      {...props}
    >
      {label}
    </span>
  );
}
