import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionTitleProps = HTMLAttributes<HTMLDivElement> & {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  className,
  ...props
}: SectionTitleProps) {
  return (
    <div className={cn("max-w-3xl space-y-4 sm:space-y-5", className)} {...props}>
      {eyebrow ? (
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-premium-silver">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance text-4xl font-semibold leading-[0.92] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg lg:text-xl">
          {description}
        </p>
      ) : null}
    </div>
  );
}
