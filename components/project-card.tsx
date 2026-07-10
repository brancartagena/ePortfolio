"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { MouseEvent } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/glass-card";
import { TechBadge } from "@/components/tech-badge";

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
  onSelect?: () => void;
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
    <GlassCard interactive className={cn("p-4 sm:p-5 lg:p-6", className)}>
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
            <Button asChild variant="glass" className="w-full justify-between">
              <Link href={href}>
                <span>View Project</span>
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          ) : null}
        </div>
      </div>
    </GlassCard>
  );
}

type PosterProjectCardProps = {
  id: string;
  title: string;
  category: string;
  image?: string;
  className?: string;
  onSelect?: () => void;
};

function PosterProjectCard({
  id,
  title,
  category,
  image,
  className,
  onSelect,
}: PosterProjectCardProps) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 24, mass: 0.4 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 24, mass: 0.4 });
  const imageX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const imageY = useTransform(smoothY, [-1, 1], [-10, 10]);
  const titleY = useTransform(smoothY, [-1, 1], [3, -3]);
  const glowX = useTransform(smoothX, [-1, 1], [18, 82]);
  const glowY = useTransform(smoothY, [-1, 1], [18, 82]);
  const glow = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, hsl(var(--accent) / 0.32), transparent 42%)`;

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    pointerX.set((x - 0.5) * 2);
    pointerY.set((y - 0.5) * 2);
  };

  const onMouseLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.button
      type="button"
      layoutId={`project-card-${id}`}
      onClick={onSelect}
      className={cn(
        "glass-surface group relative block aspect-[5/4] w-full overflow-hidden rounded-lg p-3 text-left outline-none transition duration-500 focus-visible:ring-1 focus-visible:ring-ring sm:aspect-[4/5] sm:p-4",
        "hover:-translate-y-1 hover:border-white/25 hover:shadow-glow",
        className,
      )}
      transition={{ layout: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } }}
    >
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative size-full overflow-hidden rounded-md bg-secondary will-change-transform"
      >
        <motion.div
          layoutId={`project-image-${id}`}
          className="absolute -inset-3"
          style={{ x: imageX, y: imageY }}
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.06 },
          }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 44vw, 100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_20%,hsl(var(--accent)/0.34),transparent_32%),linear-gradient(145deg,hsl(34_38%_18%),hsl(24_22%_5%))]" />
          )}
        </motion.div>

        <motion.div
          className="absolute inset-0 opacity-0"
          style={{ background: glow }}
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="absolute inset-0 bg-white/[0.045] opacity-0 backdrop-blur-[2px]"
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 overflow-hidden p-5 sm:p-7">
          <motion.div style={{ y: titleY }}>
            <motion.div
              className="space-y-4"
              variants={{
                rest: { y: 0 },
                hover: { y: -12 },
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
            <motion.p
              layoutId={`project-category-${id}`}
              className="text-xs font-semibold uppercase tracking-widecaps text-premium-silver"
                variants={{
                  rest: { opacity: 0, y: 8 },
                  hover: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
              {category}
            </motion.p>
            <motion.h3
              layoutId={`project-title-${id}`}
              className="text-balance text-3xl font-semibold leading-none tracking-normal text-foreground sm:text-4xl lg:text-5xl"
                variants={{
                  rest: { y: 0, opacity: 0.94 },
                  hover: { y: -6, opacity: 1 },
                }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                {title}
              </motion.h3>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.button>
  );
}
