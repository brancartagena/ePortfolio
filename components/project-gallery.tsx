"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

export type ProjectGalleryItem = {
  src: string;
  alt: string;
  label: string;
  size?: "large" | "wide" | "tall" | "standard";
};

type ProjectGalleryProps = {
  items: ProjectGalleryItem[];
  className?: string;
};

// Maps gallery item sizes to Tailwind aspect ratio utility classes.
const sizeClassName: Record<NonNullable<ProjectGalleryItem["size"]>, string> = {
  large: "aspect-[4/3]",
  wide: "aspect-[16/10]",
  tall: "aspect-[4/5]",
  standard: "aspect-[5/4]",
};

export function ProjectGallery({ items, className }: ProjectGalleryProps) {
  // Currently selected gallery item for the modal preview.
  const [activeItem, setActiveItem] = useState<ProjectGalleryItem | null>(null);

  // Accessible label for the active preview dialog.
  const activeLabel = useMemo(() => activeItem?.label ?? "gallery preview", [activeItem]);

  useEffect(() => {
    if (!activeItem) {
      return;
    }

    // Allow closing the modal with Escape key and freeze page scroll while open.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveItem(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeItem]);

  return (
    <>
      {/* Gallery grid of image buttons. Clicking a tile opens the preview modal. */}
      <div
        className={cn("columns-1 gap-3 space-y-3 sm:columns-2", className)}
      >
        {items.map((item, index) => (
          <motion.button
            key={`${item.src}-${item.label}-${index}`}
            type="button"
            data-gsap="gallery"
            aria-haspopup="dialog"
            aria-label={`Open ${item.label} preview`}
            onClick={() => setActiveItem(item)}
            className={cn(
              "group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-md border border-white/12 bg-secondary text-left shadow-soft outline-none",
              "focus-visible:ring-1 focus-visible:ring-ring",
              sizeClassName[item.size ?? "standard"],
            )}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 320px, 92vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/72 via-background/10 to-transparent" />
            <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
              <div className="absolute inset-0 bg-white/[0.045] backdrop-blur-[2px]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,hsl(var(--accent)/0.2),transparent_42%)]" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-premium-silver">
                {item.label}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Modal preview overlay. AnimatePresence handles exit animations when activeItem becomes null. */}
      <AnimatePresence>
        {activeItem ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeLabel} gallery preview`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              aria-label="Close gallery preview"
              className="absolute inset-0 bg-background/82 backdrop-blur-xl"
              onClick={() => setActiveItem(null)}
            />
            <motion.div
              className="glass-surface relative z-10 w-full max-w-6xl overflow-hidden rounded-lg p-3 sm:p-4"
              initial={{ scale: 0.96, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                aria-label="Close gallery preview"
                onClick={() => setActiveItem(null)}
                className="absolute right-5 top-5 z-20 inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-background/40 text-foreground/80 backdrop-blur-xl transition hover:bg-white/[0.08] hover:text-foreground"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
              <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-secondary">
                <Image
                  src={activeItem.src}
                  alt={activeItem.alt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 70vw, 100vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/78 to-transparent p-6">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-premium-silver">
                    {activeItem.label}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
