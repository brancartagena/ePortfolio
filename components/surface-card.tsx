import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type SurfaceCardProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function SurfaceCard<T extends ElementType = "div">({
  as,
  children,
  className,
  ...props
}: SurfaceCardProps<T>) {
  const Comp = as ?? "div";

  return (
    <Comp
      className={cn(
        "surface-panel relative overflow-hidden rounded-xl",
        className,
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </Comp>
  );
}
