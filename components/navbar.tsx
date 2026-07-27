"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type MouseEvent } from "react";

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
  { label: "Contact", href: "#contact" },
];

export function Navbar({
  brand = "Brandon Cartagena",
  items = defaultItems,
  activeHref,
  className,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(activeHref ?? items[0]?.href ?? "");
  const isProgrammaticScrollRef = useRef(false);
  const programmaticScrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const sectionIds = items
      .map((item) => item.href)
      .filter((href) => href.startsWith("#"))
      .map((href) => href.slice(1));

    if (sectionIds.length === 0) {
      return;
    }

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScrollRef.current) {
          return;
        }

        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveSection(`#${visibleEntry.target.id}`);
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.2, 0.4, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      if (programmaticScrollTimeoutRef.current) {
        window.clearTimeout(programmaticScrollTimeoutRef.current);
      }
    };
  }, [items]);

  useEffect(() => {
    if (activeHref) {
      setActiveSection(activeHref);
    }
  }, [activeHref]);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) {
      setActiveSection(href);
      return;
    }

    event.preventDefault();
    setActiveSection(href);
    isProgrammaticScrollRef.current = true;

    if (programmaticScrollTimeoutRef.current) {
      window.clearTimeout(programmaticScrollTimeoutRef.current);
    }

    const target = document.getElementById(href.slice(1));
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
      window.history.pushState(null, "", href);

      programmaticScrollTimeoutRef.current = window.setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 900);
    }
  };

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 py-3 sm:py-5", className)}>
      <Container>
        <nav className="rounded-full border border-white/10 bg-background/25 px-4 py-3 shadow-soft backdrop-blur-2xl sm:px-6 sm:py-3.5">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-foreground sm:text-xs"
              aria-label={`${brand} home`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span>{brand}</span>
              <span className="size-1.5 rounded-full bg-premium-ember shadow-[0_0_18px_hsl(var(--accent))]" />
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              {items.map((item) => {
                const active = activeSection === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(event) => handleNavClick(event, item.href)}
                    className={cn(
                      "group relative text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-foreground/55 transition duration-300 ease-out hover:text-foreground",
                      active && "text-foreground",
                    )}
                  >
                    {item.label}
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
                    const active = activeSection === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={(event) => {
                          setIsMenuOpen(false);
                          handleNavClick(event, item.href);
                        }}
                        className={cn(
                          "rounded-full px-3 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-foreground/70 transition duration-300 ease-out hover:bg-white/[0.05] hover:text-foreground",
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
