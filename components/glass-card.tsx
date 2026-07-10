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
        "glass-surface relative overflow-hidden rounded-[1.35rem]",
        "before:pointer-events-none before:absolute before:inset-px before:rounded-[calc(1.35rem-1px)] before:bg-gradient-to-br before:from-white/12 before:via-white/4 before:to-transparent before:opacity-80",
        interactive &&
          "transition duration-500 ease-out hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_18px_50px_rgba(0,0,0,0.28)]",
        className,
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </Comp>
  );
}
