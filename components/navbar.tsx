import Link from "next/link";

import { cn } from "@/lib/utils";
import { Container } from "@/components/container";

export type NavbarItem = {
  label: string;
  href: string;
};

type NavbarProps = {
  brand?: string;
  items?: NavbarItem[];
  activeHref?: string;
  className?: string;
};

const defaultItems: NavbarItem[] = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experiments", href: "#experiments" },
  { label: "Contact", href: "#contact" },
];

export function Navbar({
  brand = "Brandon Morgan",
  items = defaultItems,
  activeHref,
  className,
}: NavbarProps) {
  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 py-6", className)}>
      <Container>
        <nav className="flex items-center justify-between rounded-lg border border-white/10 bg-background/25 px-5 py-4 shadow-soft backdrop-blur-2xl sm:px-7">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widecaps text-foreground"
            aria-label={`${brand} home`}
          >
            <span>{brand}</span>
            <span className="size-1.5 rounded-full bg-premium-ember shadow-[0_0_18px_hsl(var(--accent))]" />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {items.map((item) => {
              const active = activeHref === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative text-xs font-semibold uppercase tracking-widecaps text-foreground/55 transition hover:text-foreground",
                    active && "text-foreground",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-3 left-1/2 h-px w-0 -translate-x-1/2 bg-foreground transition-all group-hover:w-8",
                      active && "w-8",
                    )}
                  />
                  {active ? (
                    <span className="absolute -bottom-[15px] left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-foreground" />
                  ) : null}
                </Link>
              );
            })}
          </div>
        </nav>
      </Container>
    </header>
  );
}
