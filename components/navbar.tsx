"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";

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
  const [activeSection, setActiveSection] = useState(activeHref ?? items[0]?.href ?? "");
  const isProgrammaticScrollRef = useRef(false);
  const programmaticScrollTimeoutRef = useRef<number | null>(null);
  const sectionTargets = useMemo(() => {
    return items
      .map((item) => item.href)
      .filter((href) => href.startsWith("#"))
      .map((href) => ({ href, id: href.slice(1) }));
  }, [items]);

  useEffect(() => {
    const updateActiveSection = () => {
      if (isProgrammaticScrollRef.current) {
        return;
      }

      const scrollPosition = window.scrollY + 140;
      let currentSection = sectionTargets[0]?.href ?? "";

      for (const section of sectionTargets) {
        const target = document.getElementById(section.id);
        if (!target) {
          continue;
        }

        const top = target.offsetTop;
        const nextSection = sectionTargets[sectionTargets.indexOf(section) + 1];
        const nextTop = nextSection ? document.getElementById(nextSection.id)?.offsetTop ?? Infinity : Infinity;

        if (scrollPosition >= top && scrollPosition < nextTop) {
          currentSection = section.href;
          break;
        }
      }

      if (window.scrollY < 120) {
        currentSection = sectionTargets[0]?.href ?? "";
      }

      setActiveSection(currentSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      if (programmaticScrollTimeoutRef.current) {
        window.clearTimeout(programmaticScrollTimeoutRef.current);
      }
    };
  }, [sectionTargets]);

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
      // Lenis owns scroll interpolation globally. Native smooth scrolling here
      // would stack a second animation and make the jump to the project grid
      // feel delayed.
      window.scrollTo({ top: offsetTop, behavior: "auto" });
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
            >
              <span className="whitespace-nowrap">{brand}</span>
              <span className="size-1.5 rounded-full bg-premium-ember shadow-[0_0_18px_hsl(var(--accent))]" />
            </Link>

            <div className="flex items-center gap-3 sm:gap-8">
              {items.map((item) => {
                const active = activeSection === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(event) => handleNavClick(event, item.href)}
                    className={cn(
                      "group relative text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-foreground/55 transition duration-300 ease-out hover:text-foreground sm:text-[0.7rem] sm:tracking-[0.24em]",
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
          </div>
        </nav>
      </Container>
    </header>
  );
}
