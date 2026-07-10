"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

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
  brand = "Brandon Cartagena",
  items = defaultItems,
  activeHref,
  className,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 py-4 sm:py-6", className)}>
      <Container>
        <nav className="rounded-lg border border-white/10 bg-background/25 px-4 py-3 shadow-soft backdrop-blur-2xl sm:px-7 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-widecaps text-foreground sm:text-xs"
              aria-label={`${brand} home`}
              onClick={() => setIsMenuOpen(false)}
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

            <button
              type="button"
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isMenuOpen}
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-foreground/80 transition hover:bg-white/[0.08] hover:text-foreground md:hidden"
              onClick={() => setIsMenuOpen((value) => !value)}
            >
              {isMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>

          <AnimatePresence>
            {isMenuOpen ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden md:hidden"
              >
                <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4">
                  {items.map((item) => {
                    const active = activeHref === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          "rounded-md px-2 py-2 text-sm font-semibold uppercase tracking-widecaps text-foreground/70 transition hover:bg-white/[0.05] hover:text-foreground",
                          active && "bg-white/[0.05] text-foreground",
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </nav>
      </Container>
    </header>
  );
}
