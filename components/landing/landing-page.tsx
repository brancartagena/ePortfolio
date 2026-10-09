"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import type { RefObject } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";

import { fadeUp, staggerContainer } from "@/animations/framer";
import { BrowserPreview } from "@/components/browser-preview";
import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { SurfaceCard } from "@/components/surface-card";
import { Navbar } from "@/components/navbar";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { SectionTitle } from "@/components/section-title";
import { Eyebrow } from "@/components/eyebrow";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/projects";
import { useDialogAccessibility } from "@/hooks/use-dialog-accessibility";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const projectsByRecency = [...projects].sort((first, second) => second.year - first.year);

export function LandingPage() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[number] | null
  >(null);
  const shouldReduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const projectTriggerRef = useRef<HTMLElement | null>(null);
  const closeProjectPreview = useCallback(() => setSelectedProject(null), []);

  useDialogAccessibility(
    selectedProject !== null,
    closeProjectPreview,
    dialogRef,
    projectTriggerRef,
  );

  return (
    <LayoutGroup>
      <div className="min-h-dvh overflow-hidden bg-background text-foreground">
        <Navbar items={navItems} activeHref="#work" />

      <main id="main-content" tabIndex={-1}>
        <section className="relative min-h-dvh overflow-hidden pt-28 sm:pt-36 lg:pt-40 xl:pt-44">
          <div className="absolute inset-0 bg-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,hsl(var(--accent)/0.1),transparent_40%)]" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute left-1/2 top-24 h-px w-[84vw] -translate-x-1/2 bg-white/12" />

          <Container className="relative z-10 flex min-h-[calc(100dvh-10rem)] items-center">
            <motion.div
              variants={staggerContainer}
              initial={shouldReduceMotion ? false : "hidden"}
              animate={shouldReduceMotion ? undefined : "visible"}
              className="max-w-5xl space-y-8"
            >
              <motion.div variants={fadeUp}>
                <Eyebrow>PRODUCT DESIGN · UX · WEB DEVELOPMENT</Eyebrow>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="text-balance text-5xl font-semibold leading-[0.9] tracking-[-0.035em] text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
              >
                I design digital products and build for the web.
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="max-w-2xl text-sm leading-8 text-muted-foreground sm:text-base lg:text-lg lg:max-w-3xl"
              >
                I&apos;m Brandon, a University of Maryland Information Science graduate with a Data Science minor. My work brings together user research, product design, and hands-on web development—from team-based prototypes to a live, API-powered web app.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-1">
                <Button asChild variant="secondary">
                  <Link href="#work">
                    <span>Explore selected work</span>
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="#contact">Get in touch</Link>
                </Button>
              </motion.div>
            </motion.div>
          </Container>
        </section>

        <Section id="work" className="pt-10">
          <motion.div
            variants={staggerContainer}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-12% 0px" }}
            className="space-y-10 sm:space-y-12"
          >
            <motion.div variants={fadeUp}>
              <SectionTitle
                eyebrow="Selected work"
                title="Research, product design, and web development."
                description="A mix of team-led research and product concepts, plus a live web app I designed and built. Each case study makes the project scope and my contribution clear."
              />
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2 lg:gap-7 xl:gap-8">
              {projectsByRecency.map((project) => (
                <motion.div key={project.title} variants={fadeUp}>
                  <ProjectCard
                    id={project.id}
                    variant="poster"
                    title={project.title}
                    category={project.category}
                    description={project.description}
                    year={project.year}
                    format={project.format}
                    image={project.image}
                    onSelect={(event) => {
                      projectTriggerRef.current = event.currentTarget;
                      setSelectedProject(project);
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Section>

        <Section id="about">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <motion.div
              variants={fadeUp}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView={shouldReduceMotion ? undefined : "visible"}
              viewport={{ once: true, margin: "-12% 0px" }}
            >
              <SectionTitle
                eyebrow="About"
                title="Designer’s curiosity. Builder’s mindset."
                titleClassName="font-bold leading-[1.2]"
              />
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView={shouldReduceMotion ? undefined : "visible"}
              viewport={{ once: true, margin: "-12% 0px" }}
            >
              <SurfaceCard className="p-6 sm:p-8">
                <p className="text-[15px] font-normal leading-8 text-foreground sm:text-[16px]">
                  I&apos;m an Information Science graduate from the University of Maryland with a minor in Data Science. My projects span team-based UX research and product concepts to StreamTrendr, a solo web app using TMDB and AniList data. I enjoy turning a clear problem into an experience people can understand, then carrying it through design and implementation.
                </p>
                <p className="mt-4 text-[15px] font-normal leading-8 text-foreground sm:text-[16px]">
                  Outside of project work, I enjoy anime, TV, movies, music, and time with friends—interests that inspire some of the products I make.
                </p>
                <dl className="mt-7 grid gap-4 border-t border-white/12 pt-6 sm:grid-cols-3">
                  {[
                    ["Research", "Surveys and interviews"],
                    ["Product design", "Wireframes and prototypes"],
                    ["Web development", "React and API integration"],
                  ].map(([label, value]) => (
                    <div key={label} className="space-y-2">
                      <dt className="text-xs font-semibold uppercase tracking-widecaps text-premium-silver">
                        {label}
                      </dt>
                      <dd className="text-sm leading-6 text-foreground/85">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </SurfaceCard>
            </motion.div>
          </div>
        </Section>

        <Section id="contact" className="pb-24">
          <motion.div
            variants={fadeUp}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-12% 0px" }}
          >
            <SurfaceCard className="p-8 sm:p-10 lg:p-12">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="space-y-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-premium-silver">
                    Contact
                  </p>
                  <h2 className="text-balance text-4xl font-semibold leading-[0.95] tracking-[-0.025em] sm:text-5xl">
                    Let&apos;s talk about product design and web development.
                  </h2>
                  <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                    I&apos;m open to early-career opportunities where I can contribute to thoughtful digital products and keep growing as a designer and developer.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:items-start">
                  <Link
                    href="mailto:brancartagena@gmail.com"
                    className="text-base text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    brancartagena@gmail.com
                  </Link>
                  <Button asChild variant="ghost">
                    <Link
                      href="https://www.linkedin.com/in/brancartagena/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                      <span>LinkedIn</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </SurfaceCard>
          </motion.div>
        </Section>
      </main>

        <Footer />
        <ProjectReveal
          project={selectedProject}
          onClose={closeProjectPreview}
          dialogRef={dialogRef}
          shouldReduceMotion={shouldReduceMotion}
        />
      </div>
    </LayoutGroup>
  );
}

type ProjectRevealProps = {
  project: (typeof projects)[number] | null;
  onClose: () => void;
  dialogRef: RefObject<HTMLDivElement | null>;
  shouldReduceMotion: boolean | null;
};

function ProjectReveal({
  project,
  onClose,
  dialogRef,
  shouldReduceMotion,
}: ProjectRevealProps) {
  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          layoutId={shouldReduceMotion ? undefined : `project-card-${project.id}`}
          className="fixed inset-0 z-[90]"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} project preview`}
          ref={dialogRef}
          tabIndex={-1}
        >
          <motion.button
            type="button"
            aria-label="Close project preview"
            tabIndex={-1}
            className="absolute inset-0 cursor-default bg-background/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
            onClick={onClose}
          />

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            data-lenis-prevent
            className="surface-panel fixed inset-3 touch-pan-y overflow-x-hidden overflow-y-auto overscroll-contain rounded-xl sm:inset-5 lg:inset-8"
            transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: "easeOut" }}
          >
            <div className="relative grid min-h-full min-w-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)]">
              <div className="relative min-h-[46dvh] min-w-0 overflow-hidden bg-secondary lg:min-h-full">
                {project.slug === "stream-trendr" ? (
                  <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-8">
                    <BrowserPreview
                      src={project.image}
                      alt=""
                      imageWidth={2940}
                      imageHeight={1482}
                      url={project.liveUrl}
                      priority
                      sizes="(min-width: 1024px) 48vw, 92vw"
                      className="w-full max-w-xl"
                    />
                  </div>
                ) : (
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    priority
                    sizes="(min-width: 1024px) 52vw, 100vw"
                    className="object-contain"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/10 to-background/72" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_45%,hsl(var(--accent)/0.2),transparent_34%)]" />
              </div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/65 via-transparent to-transparent lg:hidden" />

              <motion.aside
                className="relative z-10 flex min-w-0 items-center p-4 sm:p-6 lg:p-10"
                initial={shouldReduceMotion ? false : { x: 24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={shouldReduceMotion ? undefined : { x: 16, opacity: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.24, ease: "easeOut" }}
              >
                <div className="surface-panel min-w-0 w-full rounded-lg p-6 sm:p-8 lg:p-10">
                  <button
                    type="button"
                    aria-label="Close project preview"
                    onClick={onClose}
                    className="mb-10 inline-flex size-11 items-center justify-center rounded-md border border-white/15 bg-secondary text-foreground/80 transition-colors hover:bg-secondary/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>

                  <div className="space-y-7">
                    <p className="text-xs font-semibold uppercase tracking-widecaps text-premium-silver">
                      {project.category}
                    </p>
                    <h2 className="break-words text-balance text-4xl font-semibold leading-[0.95] tracking-[-0.02em] text-foreground sm:text-6xl">
                      {project.title}
                    </h2>
                    <p className="max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                      {project.description}
                    </p>
                    <div className="grid gap-5 border-t border-white/12 pt-7 sm:grid-cols-3">
                      {[
                        { label: "Year", value: String(project.year) },
                        { label: "Format", value: project.format },
                        { label: "Team", value: project.team },
                      ].map(({ label, value }) => (
                        <div key={label} className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-premium-silver">
                            {label}
                          </p>
                          <p className="text-sm text-foreground/90">{value}</p>
                        </div>
                      ))}
                    </div>
                    <Button asChild variant="secondary" className="w-full justify-between">
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
