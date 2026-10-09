import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type TechBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  label: string;
};

export function TechBadge({ label, className, ...props }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-8 items-center rounded-sm border border-white/15 bg-secondary px-3 text-xs font-medium text-foreground/90",
        className,
      )}
      {...props}
    >
      {label}
    </span>
  );
}
