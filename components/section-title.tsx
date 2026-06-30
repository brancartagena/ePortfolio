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
    <div className={cn("max-w-3xl space-y-5", className)} {...props}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-widecaps text-premium-silver">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance text-4xl font-semibold leading-[0.98] tracking-normal text-foreground sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
