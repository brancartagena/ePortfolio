import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionTitleProps = HTMLAttributes<HTMLDivElement> & {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
  ...props
}: SectionTitleProps) {
  return (
    <div className={cn("max-w-3xl space-y-4 sm:space-y-5", className)} {...props}>
      {eyebrow ? (
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-premium-silver">
          {eyebrow}
        </p>
      ) : null}
      <h2 className={cn("text-balance text-4xl font-bold leading-[1.2] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl", titleClassName)}>
        {title}
      </h2>
      {description ? (
        <p className={cn("max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg lg:text-xl", descriptionClassName)}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
