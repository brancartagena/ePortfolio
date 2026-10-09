"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SurfaceCard } from "@/components/surface-card";
import { TechBadge } from "@/components/tech-badge";
import type { MouseEvent } from "react";

type ProjectMeta = {
  label: string;
  value: string;
};

type ProjectCardProps = {
  id?: string;
  index?: string;
  title: string;
  description?: string;
  year: number;
  format: string;
  category?: string;
  href?: string;
  image?: string;
  eyebrow?: string;
  tags?: string[];
  meta?: ProjectMeta[];
  variant?: "feature" | "poster";
  className?: string;
  onSelect?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export function ProjectCard({
  id,
  index,
  title,
  description = "",
  year,
  format,
  category,
  href,
  image,
  eyebrow,
  tags = [],
  meta = [],
  variant = "feature",
  className,
  onSelect,
}: ProjectCardProps) {
  if (variant === "poster") {
    return (
      <PosterProjectCard
        id={id ?? title}
        title={title}
        category={category ?? eyebrow ?? index ?? "Project"}
        description={description}
        year={year}
        format={format}
        image={image}
        className={className}
        onSelect={onSelect}
      />
    );
  }

  return (
    <SurfaceCard className={cn("p-4 sm:p-5 lg:p-6", className)}>
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
        <div className="relative min-h-80 overflow-hidden rounded-md bg-secondary">
          {image ? (
            <Image
              src={image}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,hsl(var(--accent)/0.32),transparent_34%),linear-gradient(145deg,hsl(34_38%_18%),hsl(24_22%_5%))]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
        </div>

        <div className="flex flex-col justify-between gap-8 p-2 sm:p-4 lg:p-6">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widecaps text-premium-silver">
                {eyebrow ?? index ?? "Project"}
              </p>
              <h3 className="text-balance text-3xl font-semibold leading-none tracking-normal text-foreground sm:text-5xl">
                {title}
              </h3>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              {description}
            </p>

            {meta.length > 0 ? (
              <dl className="grid gap-5 border-y border-white/12 py-6 sm:grid-cols-3">
                {meta.map((item) => (
                  <div key={item.label} className="space-y-2">
                    <dt className="text-[0.68rem] font-semibold uppercase tracking-widecaps text-premium-silver">
                      {item.label}
                    </dt>
                    <dd className="text-sm text-foreground/90">{item.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <TechBadge key={tag} label={tag} />
                ))}
              </div>
            ) : null}
          </div>

          {href ? (
            <Button asChild variant="secondary" className="w-full justify-between">
              <Link href={href}>
                <span>View Project</span>
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          ) : null}
        </div>
      </div>
    </SurfaceCard>
  );
}

type PosterProjectCardProps = {
  id: string;
  title: string;
  category: string;
  description: string;
  year: number;
  format: string;
  image?: string;
  className?: string;
  onSelect?: (event: MouseEvent<HTMLButtonElement>) => void;
};

function PosterProjectCard({
  id,
  title,
  category,
  description,
  year,
  format,
  image,
  className,
  onSelect,
}: PosterProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "surface-panel group relative overflow-hidden rounded-xl transition duration-200 ease-out before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-px before:bg-gradient-to-r before:from-transparent before:via-primary/70 before:to-transparent",
        !shouldReduceMotion &&
          "hover:-translate-y-0.5 hover:border-white/25 hover:shadow-[0_18px_60px_rgba(0,0,0,0.3)]",
        className,
      )}
    >
      <motion.button
        type="button"
        layoutId={shouldReduceMotion ? undefined : `project-card-${id}`}
        onClick={onSelect}
        aria-label={`Preview ${title}`}
        className="grid min-h-[18rem] w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring lg:grid-cols-[0.9fr_1.1fr]"
      >
        <span className="relative min-h-56 overflow-hidden bg-[radial-gradient(ellipse_at_50%_50%,hsl(var(--accent)/0.08),transparent_65%),hsl(var(--secondary))] lg:min-h-full">
          {image ? (
            <Image
              src={image}
              alt=""
              fill
              className={cn(
                "object-contain p-3 transition-transform duration-300 ease-out",
                !shouldReduceMotion && "group-hover:scale-[1.025]",
              )}
              sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, 100vw"
            />
          ) : (
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_45%_20%,hsl(var(--accent)/0.34),transparent_32%),linear-gradient(145deg,hsl(34_38%_18%),hsl(24_22%_5%))]" />
          )}
        </span>

        <span className="flex flex-col justify-center gap-4 p-5 sm:p-7">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-premium-silver">
            {category}
          </span>
          <span
            role="heading"
            aria-level={3}
            className="block text-balance text-3xl font-semibold leading-[0.98] tracking-[-0.02em] text-foreground sm:text-4xl"
          >
            {title}
          </span>
          <span className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-semibold text-premium-gold">
              {year}
            </span>
            <span
              aria-hidden="true"
              className="size-1 rounded-full bg-primary"
            />
            <span className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs font-medium text-premium-gold">
              {format}
            </span>
          </span>
          <span className="text-sm leading-6 text-muted-foreground">
            {description}
          </span>
        </span>
      </motion.button>
      <div className="flex justify-end border-t border-white/10 px-5 py-3 sm:px-7">
        <Link
          href={`/projects/${id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-premium-silver focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Read case study
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
