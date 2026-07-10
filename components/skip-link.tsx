import Link from "next/link";

import { cn } from "@/lib/utils";

type SkipLinkProps = {
  className?: string;
  href?: string;
  label?: string;
};

export function SkipLink({
  className,
  href = "#main-content",
  label = "Skip to content",
}: SkipLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:border focus:border-white/15 focus:bg-background/95 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-foreground",
        className,
      )}
    >
      {label}
    </Link>
  );
}
