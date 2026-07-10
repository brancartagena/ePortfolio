import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type EyebrowProps = HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
};

export function Eyebrow({ children, className, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-premium-silver",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
