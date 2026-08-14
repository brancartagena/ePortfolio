import fs from "node:fs";
import path from "node:path";

import type { ProjectGalleryItem } from "@/components/project-gallery";

// Each project keeps its runtime images in a folder named after its slug, so a
// project's gallery is discovered from disk instead of being listed in code.
// This module reads the filesystem and is therefore server-only: import it from
// server components (such as the project detail route), never from a client one.
const PROJECTS_IMAGE_DIRECTORY = path.join(
  process.cwd(),
  "public",
  "assets",
  "images",
  "projects",
);

const PROJECTS_PUBLIC_PATH = "/assets/images/projects";

const IMAGE_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".avif",
  ".gif",
]);

// A file named cover.* is the project's hero image, not a gallery tile.
const COVER_BASENAME = "cover";

type GallerySize = NonNullable<ProjectGalleryItem["size"]>;

const GALLERY_SIZES: GallerySize[] = ["large", "wide", "tall", "standard"];

/**
 * Lists the image files in a project's folder, ordered by filename with numeric
 * awareness so both `01-` and `1-` style prefixes sort as expected. Filenames are
 * the ordering mechanism for the gallery. Returns an empty list when the folder
 * does not exist yet, so a project without images never breaks the build.
 */
function readProjectImageFiles(slug: string) {
  let entries: string[];

  try {
    entries = fs.readdirSync(path.join(PROJECTS_IMAGE_DIRECTORY, slug));
  } catch {
    return [];
  }

  return entries
    .filter((entry) => IMAGE_EXTENSIONS.has(path.extname(entry).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
}

function fileBasename(file: string) {
  return path.basename(file, path.extname(file)).toLowerCase();
}

/**
 * Reads a PNG's width/height straight from its IHDR chunk (bytes 16-23), so the
 * gallery can size a tile to an image's real aspect ratio without a new dependency.
 */
function readPngDimensions(filePath: string): { width: number; height: number } | null {
  try {
    const buffer = Buffer.alloc(24);
    const fd = fs.openSync(filePath, "r");
    fs.readSync(fd, buffer, 0, 24, 0);
    fs.closeSync(fd);

    if (buffer.toString("ascii", 12, 16) !== "IHDR") {
      return null;
    }

    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  } catch {
    return null;
  }
}

/**
 * Tile shape comes from an optional `--wide`, `--tall`, `--large`, or `--standard`
 * suffix on the filename (for example `03-checkout--tall.png`). Without a suffix,
 * tiles alternate between wide and standard to keep the masonry rhythm varied.
 */
function resolveGallerySize(file: string, index: number): GallerySize {
  const name = fileBasename(file);
  const override = GALLERY_SIZES.find((size) => name.endsWith(`--${size}`));

  return override ?? (index % 2 === 0 ? "wide" : "standard");
}

/**
 * Placeholder tiles for a project whose folder holds only a cover image. Keeps the
 * case study layout populated until real screenshots are added to the folder.
 */
function buildPlaceholderGallery(
  title: string,
  src: string,
): ProjectGalleryItem[] {
  return [
    {
      src,
      alt: `${title} large screenshot`,
      label: "Large Screenshot",
      size: "wide",
    },
    {
      src,
      alt: `${title} wireframe exploration`,
      label: "Wireframe",
      size: "tall",
    },
    {
      src,
      alt: `${title} interface design`,
      label: "UI Design",
      size: "standard",
    },
    {
      src,
      alt: `${title} process image`,
      label: "Process Image",
      size: "large",
    },
  ];
}

type ProjectGalleryOptions = {
  slug: string;
  title: string;
  /** Shown as placeholder tiles when the project folder has no screenshots yet. */
  fallbackSrc: string;
  /**
   * Sizes each tile to the screenshot's own aspect ratio instead of the canned
   * masonry shapes, so full-page website screenshots display uncropped. Opt-in
   * because it changes the grid's rhythm — only worth it for wide screenshots
   * that don't suit the default portrait-leaning tile shapes.
   */
  preserveAspectRatio?: boolean;
};

/**
 * Builds the gallery for a project by reading `public/assets/images/projects/<slug>/`.
 * Adding screenshots to that folder is all that is needed for them to appear.
 */
export function getProjectGallery({
  slug,
  title,
  fallbackSrc,
  preserveAspectRatio,
}: ProjectGalleryOptions): ProjectGalleryItem[] {
  const files = readProjectImageFiles(slug).filter(
    (file) => fileBasename(file) !== COVER_BASENAME,
  );

  if (files.length === 0) {
    return buildPlaceholderGallery(title, fallbackSrc);
  }

  return files.map((file, index) => {
    const dimensions = preserveAspectRatio
      ? readPngDimensions(path.join(PROJECTS_IMAGE_DIRECTORY, slug, file))
      : null;

    return {
      src: `${PROJECTS_PUBLIC_PATH}/${slug}/${file}`,
      alt: `${title} gallery image ${index + 1}`,
      label: `Gallery ${index + 1}`,
      size: resolveGallerySize(file, index),
      width: dimensions?.width,
      height: dimensions?.height,
    };
  });
}
