import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/container";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  children: ReactNode;
  contained?: boolean;
};

export function Section({
  children,
  className,
  contained = true,
  ...props
}: SectionProps) {
  const content = contained ? <Container>{children}</Container> : children;

  return (
    <section
      className={cn("relative py-20 sm:py-28 lg:py-36 xl:py-40", className)}
      {...props}
    >
      {content}
    </section>
  );
}
