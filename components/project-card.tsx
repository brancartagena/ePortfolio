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
  image?: string;
  className?: string;
  onSelect?: (event: MouseEvent<HTMLButtonElement>) => void;
};

function PosterProjectCard({
  id,
  title,
  category,
  image,
  className,
  onSelect,
}: PosterProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      layoutId={shouldReduceMotion ? undefined : `project-card-${id}`}
      onClick={onSelect}
      className={cn(
        "project-card-surface surface-panel group relative block aspect-[5/4] w-full overflow-hidden rounded-xl p-3 text-left outline-none transition duration-200 ease-out focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:aspect-[4/5] sm:p-4",
        !shouldReduceMotion && "hover:-translate-y-0.5 hover:border-white/25 hover:shadow-[0_18px_60px_rgba(0,0,0,0.3)]",
        className,
      )}
    >
      <span className="relative block size-full overflow-hidden rounded-md bg-secondary will-change-transform">
        <motion.span
          layoutId={shouldReduceMotion ? undefined : `project-image-${id}`}
          className={cn(
            "absolute -inset-3 transition duration-300 ease-out",
            !shouldReduceMotion && "group-hover:scale-[1.04]",
          )}
        >
          {image ? (
            <Image
              src={image}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 44vw, 100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_20%,hsl(var(--accent)/0.34),transparent_32%),linear-gradient(145deg,hsl(34_38%_18%),hsl(24_22%_5%))]" />
          )}
        </motion.span>

        <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,hsl(var(--accent)/0.22),transparent_44%)] opacity-0 transition duration-500 ease-out group-hover:opacity-100" />
        <span className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent" />

        <span className="absolute inset-x-0 bottom-0 block overflow-hidden p-5 sm:p-7">
          <span className="block space-y-4 transition duration-300 ease-out group-hover:-translate-y-1">
            <motion.span
              layoutId={shouldReduceMotion ? undefined : `project-category-${id}`}
              className="text-xs font-semibold uppercase tracking-[0.12em] text-premium-silver"
            >
              {category}
            </motion.span>
            <motion.span
              role="heading"
              aria-level={3}
              layoutId={shouldReduceMotion ? undefined : `project-title-${id}`}
              className="block text-balance text-3xl font-semibold leading-[0.95] tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl"
            >
              {title}
            </motion.span>
          </span>
        </span>
      </span>
    </motion.button>
  );
}
