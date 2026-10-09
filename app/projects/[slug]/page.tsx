import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { notFound } from "next/navigation";

import { BrowserPreview } from "@/components/browser-preview";
import { Eyebrow } from "@/components/eyebrow";
import { ProjectDetailAnimations } from "@/components/project-detail-animations";
import { ProjectGallery } from "@/components/project-gallery";
import { Button } from "@/components/ui/button";
import { getProjectGallery } from "@/lib/gallery";
import { getProjectBySlug, projects } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Generate all project detail routes at build time for static site generation.
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate dynamic metadata for each project detail page.
export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Brandon Cartagena`,
    description: project.description,
  };
}

// Page component for individual project details.
// This is a server component because it uses async data lookup from the route params.
export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Build a list of detail sections for the case study layout.
  const leadDetailSections = [
    ["Problem", project.problem],
    ["Solution", project.solution],
    ["Outcome", project.results],
  ] as const;

  const supportingDetailSections = [
    ["Challenges", project.challenges],
    ["Lessons Learned", project.lessons],
  ] as const;

  // Screenshots are read from public/assets/images/projects/<slug>/ at build time,
  // so adding images to that folder is all that is needed to extend the gallery.
  // StreamTrendr's screenshots are all wide website captures that the masonry
  // grid's default portrait-leaning tile shapes would crop, so its gallery locks
  // each tile to the screenshot's own aspect ratio instead.
  const galleryItems = getProjectGallery({
    slug: project.slug,
    title: project.title,
    fallbackSrc: project.image,
    preserveAspectRatio: project.slug === "stream-trendr",
  });

  // StreamTrendr's cover is a wide website screenshot (~1.98:1) that a full-bleed
  // object-cover crop reduces to a sliver. It gets a browser-chrome frame locked
  // to its native aspect ratio instead, so the whole homepage stays visible.
  const isStreamTrendr = project.slug === "stream-trendr";

  return (
    <main data-project-detail id="main-content" tabIndex={-1} className="min-h-dvh bg-background text-foreground">
      {/* Global page entrance and scroll animations for this project detail route. */}
      <ProjectDetailAnimations />
      <div className="grid min-h-dvh lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        {/* Project artwork stays visible while the case study is read. */}
        <aside className="relative min-h-[62dvh] overflow-hidden bg-secondary sm:min-h-[68dvh] lg:sticky lg:top-0 lg:h-dvh">
          {isStreamTrendr ? (
            <div
              data-gsap="image"
              className="absolute inset-0 flex items-center justify-center bg-secondary p-5 sm:p-8 lg:p-10"
            >
              <BrowserPreview
                src={project.image}
                alt=""
                imageWidth={2940}
                imageHeight={1482}
                url={project.liveUrl}
                priority
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="w-full max-w-2xl"
              />
            </div>
          ) : (
            <div data-gsap="image" data-parallax-image className="absolute inset-0">
              <Image
                src={project.image}
                alt=""
                fill
                priority
                className="object-contain p-5 sm:p-8 lg:p-10"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          )}
        </aside>

        <section className="relative px-4 py-6 sm:px-6 sm:py-8 lg:-ml-10 lg:flex lg:min-h-dvh lg:items-start lg:px-8 lg:py-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,hsl(var(--accent)/0.12),transparent_30%)]" />
          <article className="surface-panel relative z-10 mx-auto w-full max-w-3xl rounded-lg p-5 sm:p-7 lg:my-8 lg:p-10">
            <div className="mb-8 flex flex-wrap gap-3 sm:mb-10">
              {/* Primary actions for navigating away or viewing the project externally. */}
              <Button asChild variant="secondary" size="sm" data-gsap="button">
                <Link href="/#work">
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  <span>Back to projects</span>
                </Link>
              </Button>
              <Button asChild variant="secondary" size="sm" data-gsap="button">
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <span>{project.externalLabel}</span>
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              {project.githubUrl && (
                <Button asChild variant="outline" size="sm" data-gsap="button">
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="size-4" aria-hidden="true" />
                    <span>GitHub</span>
                  </Link>
                </Button>
              )}
            </div>

            <header data-gsap="text" className="space-y-5 border-b border-white/12 pb-8 sm:space-y-6 sm:pb-10">
              <Eyebrow>{project.category}</Eyebrow>
              <h1 className="break-words text-balance text-4xl font-semibold leading-[0.95] tracking-[-0.025em] sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                {project.description}
              </p>
              <dl className="grid gap-4 border-t border-white/12 pt-5 sm:grid-cols-3">
                {[
                  ["Year", String(project.year)],
                  ["Format", project.format],
                  ["Team", project.team],
                ].map(([label, value]) => (
                  <div key={label} className="space-y-2">
                    <dt className="text-[0.68rem] font-semibold uppercase tracking-widecaps text-premium-silver">
                      {label}
                    </dt>
                    <dd className="text-sm leading-6 text-foreground/90">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="space-y-2 border-t border-white/12 pt-5">
                <p className="text-[0.68rem] font-semibold uppercase tracking-widecaps text-premium-silver">
                  My role
                </p>
                <p className="text-sm leading-7 text-foreground/90">
                  {project.role}
                </p>
              </div>
            </header>

            <div className="space-y-8 py-8 sm:space-y-10 sm:py-10 lg:space-y-11 lg:py-11">
              <section
                data-gsap="section"
                className="grid gap-4 sm:grid-cols-[180px_1fr]"
              >
                <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-premium-silver">
                  Context
                </h3>
                <p data-gsap="text" className="text-base leading-8 text-foreground/82">
                  {project.overview}
                </p>
              </section>

              {leadDetailSections.map(([title, body]) => (
                <section
                  key={title}
                  data-gsap="section"
                  className="grid gap-3 sm:grid-cols-[140px_1fr] lg:grid-cols-[180px_1fr]"
                >
                  <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-premium-silver">
                    {title}
                  </h3>
                  <p data-gsap="text" className="text-base leading-8 text-foreground/82">
                    {body}
                  </p>
                </section>
              ))}

              {project.slug === "stream-trendr" && (
                <section
                  data-gsap="section"
                  className="space-y-5 border-y border-white/12 py-8 sm:py-9"
                >
                  <div className="space-y-2">
                    <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-premium-silver">
                      Data sources
                    </h3>
                    <p className="text-sm leading-7 text-muted-foreground">
                      External catalogs supply the content available to browse and search.
                    </p>
                  </div>
                  <div className="grid items-stretch gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.2fr)_auto_minmax(0,1fr)]">
                    <div className="rounded-md border border-white/12 bg-secondary p-4">
                      <p className="font-semibold">TMDB API</p>
                      <p className="mt-1 text-sm text-muted-foreground">Movies &amp; TV</p>
                    </div>
                    <ArrowRight className="hidden size-4 self-center text-premium-silver sm:block" aria-hidden="true" />
                    <div className="rounded-md border border-primary/40 bg-primary/10 p-4">
                      <p className="font-semibold">StreamTrendr</p>
                      <p className="mt-1 text-sm text-muted-foreground">Browse &amp; search</p>
                    </div>
                    <ArrowRight className="hidden size-4 self-center rotate-180 text-premium-silver sm:block" aria-hidden="true" />
                    <div className="rounded-md border border-white/12 bg-secondary p-4">
                      <p className="font-semibold">AniList API</p>
                      <p className="mt-1 text-sm text-muted-foreground">Anime</p>
                    </div>
                  </div>
                </section>
              )}

              {supportingDetailSections.map(([title, body]) => (
                <section
                  key={title}
                  data-gsap="section"
                  className="grid gap-3 sm:grid-cols-[140px_1fr] lg:grid-cols-[180px_1fr]"
                >
                  <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-premium-silver">
                    {title}
                  </h3>
                  <p data-gsap="text" className="text-base leading-8 text-foreground/82">
                    {body}
                  </p>
                </section>
              ))}

              <section
                data-gsap="section"
                className="grid gap-3 border-b border-white/12 pb-8 sm:grid-cols-[140px_1fr] sm:pb-9 lg:grid-cols-[180px_1fr]"
              >
                <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-premium-silver">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-sm border border-white/15 bg-secondary px-3 py-2 text-xs font-medium text-foreground/90"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </section>

              <section data-gsap="section" className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-[180px_1fr]">
                  <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-premium-silver">
                    Gallery
                  </h3>
                  <p data-gsap="text" className="text-base leading-8 text-foreground/82">
                    Screenshots and design artifacts from the project.
                  </p>
                </div>
                <ProjectGallery items={galleryItems} />
              </section>

            </div>

            <footer className="flex flex-col gap-3 border-t border-white/12 pt-8 sm:flex-row sm:pt-9">
              {/* Repeated call-to-action links at the bottom of the case study. */}
              <Button
                asChild
                variant="secondary"
                className="flex-1 justify-between"
                data-gsap="button"
              >
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <span>{project.externalLabel}</span>
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              {project.githubUrl && (
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 justify-between"
                  data-gsap="button"
                >
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <span>GitHub</span>
                    <Github className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              )}
            </footer>
          </article>
        </section>
      </div>
    </main>
  );
}
