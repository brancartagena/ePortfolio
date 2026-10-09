import Image from "next/image";
import { Lock } from "lucide-react";

import { cn } from "@/lib/utils";

type BrowserPreviewProps = {
  src: string;
  alt: string;
  /** Native pixel dimensions of the screenshot, used to lock the frame to its real aspect ratio. */
  imageWidth: number;
  imageHeight: number;
  /** Optional hostname shown in the browser frame. */
  url?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Frames a full-page screenshot in a lightweight browser-chrome bar and locks
 * the image container to the screenshot's own aspect ratio, so the full page
 * stays visible at any width.
 */
export function BrowserPreview({
  src,
  alt,
  imageWidth,
  imageHeight,
  url,
  sizes = "100vw",
  priority,
  className,
}: BrowserPreviewProps) {
  if (
    !Number.isFinite(imageWidth) ||
    !Number.isFinite(imageHeight) ||
    imageWidth <= 0 ||
    imageHeight <= 0
  ) {
    throw new RangeError("BrowserPreview image dimensions must be positive numbers.");
  }

  const addressLabel = url ? getHostname(url) : undefined;

  return (
    <div className={cn("surface-panel relative overflow-hidden rounded-lg", className)}>
      <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]/60" />
          <span className="size-2.5 rounded-full bg-[#febc2e]/60" />
          <span className="size-2.5 rounded-full bg-[#28c840]/60" />
        </div>
        {addressLabel ? (
          <div className="mx-auto flex min-w-0 items-center gap-1.5 border border-white/10 bg-background px-3 py-1.5 text-xs text-foreground/80">
            <Lock className="size-3" aria-hidden="true" />
            <span className="truncate">{addressLabel}</span>
          </div>
        ) : null}
      </div>
      <div
        className="relative w-full bg-secondary"
        style={{ aspectRatio: `${imageWidth} / ${imageHeight}` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-contain"
        />
      </div>
    </div>
  );
}

function getHostname(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}
