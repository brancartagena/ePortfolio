import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type EyebrowProps = HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
};

export function Eyebrow({ children, className, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-xs font-semibold uppercase tracking-[0.12em] text-premium-silver",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
