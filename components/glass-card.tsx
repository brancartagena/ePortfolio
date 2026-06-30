import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type GlassCardProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  interactive?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function GlassCard<T extends ElementType = "div">({
  as,
  children,
  className,
  interactive = false,
  ...props
}: GlassCardProps<T>) {
  const Comp = as ?? "div";

  return (
    <Comp
      className={cn(
        "glass-surface relative overflow-hidden rounded-lg",
        "before:pointer-events-none before:absolute before:inset-px before:rounded-[calc(var(--radius)-1px)] before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-60",
        interactive &&
          "transition duration-500 hover:-translate-y-1 hover:border-white/25 hover:shadow-glow",
        className,
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </Comp>
  );
}
