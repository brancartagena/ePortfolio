"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";
import { useDialogAccessibility } from "@/hooks/use-dialog-accessibility";

export type ProjectGalleryItem = {
  src: string;
  alt: string;
  label: string;
  size?: "large" | "wide" | "tall" | "standard";
  /** Natural pixel dimensions. When present, the tile locks to this ratio instead of `size`, so the full screenshot shows uncropped. */
  width?: number;
  height?: number;
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
const maxZoom = 3;

export function ProjectGallery({ items, className }: ProjectGalleryProps) {
  const [activeItem, setActiveItem] = useState<ProjectGalleryItem | null>(null);
  const [zoom, setZoom] = useState(1);
  const shouldReduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const galleryTriggerRef = useRef<HTMLElement | null>(null);
  const closeGalleryPreview = useCallback(() => setActiveItem(null), []);
  useDialogAccessibility(
    activeItem !== null,
    closeGalleryPreview,
    dialogRef,
    galleryTriggerRef,
  );

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
            onClick={(event) => {
              galleryTriggerRef.current = event.currentTarget;
              setZoom(1);
              setActiveItem(item);
            }}
            style={item.width && item.height ? { aspectRatio: `${item.width} / ${item.height}` } : undefined}
            className={cn(
              "group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-md border border-white/12 bg-secondary text-left shadow-soft outline-none",
              "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
              sizeClassName[item.size ?? "standard"],
            )}
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 320px, 92vw"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-background/72 via-background/10 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-4">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-premium-silver">
                {item.label}
              </span>
            </span>
          </motion.button>
        ))}
      </div>

      {/* Portal the dialog to the document body so it layers above the case study page. */}
      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {activeItem ? (
                <motion.div
                  data-lenis-prevent
                  className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
                  role="dialog"
                  aria-modal="true"
                  aria-label={`${activeItem.label} gallery preview`}
                  ref={dialogRef}
                  tabIndex={-1}
                  initial={shouldReduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                >
                  <button
                    type="button"
                    aria-label="Close gallery preview"
                    tabIndex={-1}
                    className="absolute inset-0 bg-background/90"
                    onClick={closeGalleryPreview}
                  />
                  <motion.div
                    className="surface-panel relative z-10 w-full max-w-6xl overflow-hidden rounded-lg p-3 sm:p-4"
                    initial={shouldReduceMotion ? false : { scale: 0.98, y: 8 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { scale: 0.98, y: 10 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                  >
                    <button
                      type="button"
                      aria-label="Close gallery preview"
                      onClick={closeGalleryPreview}
                      className="absolute right-5 top-5 z-20 inline-flex size-11 items-center justify-center rounded-md border border-white/15 bg-background text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                    >
                      <X className="size-4" aria-hidden="true" />
                    </button>
                    <div className="absolute right-5 top-20 z-20 flex gap-2">
                      <button
                        type="button"
                        aria-label="Zoom out"
                        disabled={zoom <= 1}
                        onClick={() => setZoom((value) => Math.max(1, Number((value - 0.25).toFixed(2))))}
                        className="inline-flex size-11 items-center justify-center rounded-md border border-white/15 bg-background text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Minus className="size-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        aria-label="Zoom in"
                        disabled={zoom >= maxZoom}
                        onClick={() => setZoom((value) => Math.min(maxZoom, Number((value + 0.25).toFixed(2))))}
                        className="inline-flex size-11 items-center justify-center rounded-md border border-white/15 bg-background text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Plus className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                    <span className="sr-only" aria-live="polite">
                      Image zoom: {Math.round(zoom * 100)} percent
                    </span>
                    <div className="relative flex max-h-[78vh] max-w-[88vw] items-center justify-center overflow-auto rounded-md bg-secondary p-3 sm:p-4">
                      <Image
                        src={activeItem.src}
                        alt={activeItem.alt}
                        width={activeItem.width ?? 1600}
                        height={activeItem.height ?? 1000}
                        priority
                        className="h-auto max-h-[74vh] w-auto max-w-[84vw] object-contain"
                        style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
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
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
