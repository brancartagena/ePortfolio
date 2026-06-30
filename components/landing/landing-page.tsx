"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight, Mail, X } from "lucide-react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

import { fadeUp, staggerContainer } from "@/animations/framer";
import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/glass-card";
import { Navbar } from "@/components/navbar";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { SectionTitle } from "@/components/section-title";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/projects";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function LandingPage() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[number] | null
  >(null);

  useEffect(() => {
    if (!selectedProject) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProject]);

  return (
    <LayoutGroup>
      <div className="min-h-dvh overflow-hidden bg-background text-foreground">
        <Navbar items={navItems} activeHref="#work" />

      <main>
        <section className="relative min-h-dvh overflow-hidden pt-32 sm:pt-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,hsl(var(--surface-glow)/0.34),transparent_28%),radial-gradient(circle_at_78%_28%,hsl(38_92%_62%/0.18),transparent_24%),linear-gradient(135deg,hsl(24_22%_4%),hsl(24_18%_7%)_48%,hsl(20_35%_8%))]" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute left-1/2 top-24 h-px w-[84vw] -translate-x-1/2 bg-white/12" />

          <Container className="relative z-10 flex min-h-[calc(100dvh-10rem)] items-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="max-w-5xl space-y-8"
            >
              <motion.p
                variants={fadeUp}
                className="text-xs font-semibold uppercase tracking-widecaps text-premium-silver"
              >
                Portfolio / Frontend Engineering / Visual Systems
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="text-balance text-6xl font-semibold leading-[0.88] tracking-normal text-foreground sm:text-7xl lg:text-8xl"
              >
                Premium digital work with cinematic precision.
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg"
              >
                A minimal portfolio for polished interfaces, visual systems,
                and high-performance frontend experiences.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <Button asChild variant="glass">
                  <Link href="#work">
                    <span>View Work</span>
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="#contact">Contact</Link>
                </Button>
              </motion.div>
            </motion.div>
          </Container>
        </section>

        <Section id="work" className="pt-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-12% 0px" }}
            className="space-y-12"
          >
            <motion.div variants={fadeUp}>
              <SectionTitle
                eyebrow="Featured Projects"
                title="Selected work framed like film posters."
                description="A compact grid for visual-first projects, built to feel cinematic, quiet, and sharp."
              />
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-2 lg:gap-7">
              {projects.map((project) => (
                <motion.div key={project.title} variants={fadeUp}>
                  <ProjectCard
                    id={project.id}
                    variant="poster"
                    title={project.title}
                    category={project.category}
                    image={project.image}
                    onSelect={() => setSelectedProject(project)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Section>

        <Section id="about">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-12% 0px" }}
            >
              <SectionTitle
                eyebrow="About"
                title="Design-minded engineering for refined product moments."
              />
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-12% 0px" }}
            >
              <GlassCard className="p-6 sm:p-8">
                <p className="text-base leading-8 text-muted-foreground sm:text-lg">
                  I build interfaces where interaction, typography, motion, and
                  structure work together. The goal is simple: make each screen
                  feel intentional, fast, and memorable without adding noise.
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </Section>

        <Section id="contact" className="pb-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-12% 0px" }}
          >
            <GlassCard className="p-8 sm:p-10 lg:p-12">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-widecaps text-premium-silver">
                    Contact
                  </p>
                  <h2 className="text-balance text-4xl font-semibold leading-none tracking-normal sm:text-5xl">
                    Let&apos;s build something with presence.
                  </h2>
                </div>
                <Button asChild variant="glass">
                  <Link href="mailto:hello@example.com">
                    <Mail className="size-4" aria-hidden="true" />
                    <span>Start a Conversation</span>
                  </Link>
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </Section>
      </main>

        <Footer />
        <ProjectReveal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </LayoutGroup>
  );
}

type ProjectRevealProps = {
  project: (typeof projects)[number] | null;
  onClose: () => void;
};

function ProjectReveal({ project, onClose }: ProjectRevealProps) {
  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[90]"
          role="dialog"
          aria-modal
          aria-label={`${project.title} project preview`}
        >
          <motion.button
            type="button"
            aria-label="Close project preview"
            className="absolute inset-0 cursor-default bg-background/78 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClose}
          />

          <motion.div
            layoutId={`project-card-${project.id}`}
            className="fixed inset-4 overflow-hidden rounded-lg border border-white/16 bg-background/76 shadow-glass backdrop-blur-2xl sm:inset-6 lg:inset-8"
            transition={{
              layout: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            <div className="relative grid size-full lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)]">
              <motion.div
                layoutId={`project-image-${project.id}`}
                className="relative min-h-[46dvh] overflow-hidden bg-secondary lg:min-h-full"
                transition={{
                  layout: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 52vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/10 to-background/72" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_45%,hsl(var(--accent)/0.2),transparent_34%)]" />
              </motion.div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/65 via-transparent to-transparent lg:hidden" />

              <motion.aside
                className="relative z-10 flex items-center p-4 sm:p-6 lg:p-10"
                initial={{ x: 64, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 36, opacity: 0 }}
                transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="glass-surface w-full rounded-lg p-6 sm:p-8 lg:p-10">
                  <button
                    type="button"
                    aria-label="Close project preview"
                    onClick={onClose}
                    className="mb-10 inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-foreground/80 transition hover:bg-white/[0.08] hover:text-foreground"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>

                  <div className="space-y-7">
                    <motion.p
                      layoutId={`project-category-${project.id}`}
                      className="text-xs font-semibold uppercase tracking-widecaps text-premium-silver"
                    >
                      {project.category}
                    </motion.p>
                    <motion.h2
                      layoutId={`project-title-${project.id}`}
                      className="text-balance text-5xl font-semibold leading-none tracking-normal text-foreground sm:text-6xl"
                    >
                      {project.title}
                    </motion.h2>
                    <p className="max-w-xl text-base leading-8 text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="grid gap-5 border-t border-white/12 pt-7 sm:grid-cols-3">
                      {["Year 2026", "Role Design", "Mode Preview"].map(
                        (item) => {
                          const [label, value] = item.split(" ");

                          return (
                            <div key={item} className="space-y-2">
                              <p className="text-[0.68rem] font-semibold uppercase tracking-widecaps text-premium-silver">
                                {label}
                              </p>
                              <p className="text-sm text-foreground/90">
                                {value}
                              </p>
                            </div>
                          );
                        },
                      )}
                    </div>
                    <Button asChild variant="glass" className="w-full justify-between">
                      <Link href={`/projects/${project.slug}`}>
                        <span>View Case Study</span>
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.aside>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
