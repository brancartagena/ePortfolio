import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/glass-card";
import { TechBadge } from "@/components/tech-badge";

type ProjectMeta = {
  label: string;
  value: string;
};

type ProjectCardProps = {
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
};

export function ProjectCard({
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
}: ProjectCardProps) {
  if (variant === "poster") {
    return (
      <GlassCard
        interactive
        className={cn("group aspect-[4/5] p-3 sm:p-4", className)}
      >
        <div className="relative size-full overflow-hidden rounded-md bg-secondary">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(min-width: 1024px) 44vw, 100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_20%,hsl(var(--accent)/0.34),transparent_32%),linear-gradient(145deg,hsl(34_38%_18%),hsl(24_22%_5%))]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 space-y-4 p-5 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-widecaps text-premium-silver">
              {category ?? eyebrow ?? index ?? "Project"}
            </p>
            <h3 className="text-balance text-3xl font-semibold leading-none tracking-normal text-foreground sm:text-4xl lg:text-5xl">
              {title}
            </h3>
          </div>
        </div>
      </GlassCard>
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
