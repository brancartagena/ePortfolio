import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "animated-button inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold uppercase tracking-[0.18em] transition duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-soft hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground shadow-soft hover:bg-secondary/80",
        glass:
          "border border-white/18 bg-white/[0.06] text-foreground shadow-soft backdrop-blur-xl hover:border-white/30 hover:bg-white/[0.1]",
        ghost: "text-foreground/80 hover:bg-white/[0.06] hover:text-foreground",
        outline:
          "border border-input bg-transparent text-foreground hover:bg-white/[0.06]",
        link: "h-auto rounded-none p-0 tracking-normal text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-14 px-7 py-3",
        sm: "h-10 rounded-md px-4 text-xs",
        lg: "h-16 px-9 text-base",
        icon: "size-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
