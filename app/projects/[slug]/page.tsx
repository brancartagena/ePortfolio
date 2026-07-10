import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { notFound } from "next/navigation";

import { ProjectDetailAnimations } from "@/components/project-detail-animations";
import { ProjectGallery, type ProjectGalleryItem } from "@/components/project-gallery";
import { Button } from "@/components/ui/button";
import { getProjectBySlug, projects } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

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

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const detailSections = [
    ["Problem", project.problem],
    ["Solution", project.solution],
    ["My Role", project.role],
    ["Challenges", project.challenges],
    ["Lessons Learned", project.lessons],
    ["Results", project.results],
  ] as const;
  const supportingImages = projects
    .filter((galleryProject) => galleryProject.id !== project.id)
    .map((galleryProject) => galleryProject.image);
  const galleryItems: ProjectGalleryItem[] = [
    {
      src: project.image,
      alt: `${project.title} large screenshot`,
      label: "Large Screenshot",
      size: "wide",
    },
    {
      src: supportingImages[0] ?? project.image,
      alt: `${project.title} wireframe exploration`,
      label: "Wireframe",
      size: "tall",
    },
    {
      src: supportingImages[1] ?? project.image,
      alt: `${project.title} interface design`,
      label: "UI Design",
      size: "standard",
    },
    {
      src: supportingImages[2] ?? project.image,
      alt: `${project.title} process image`,
      label: "Process Image",
      size: "large",
    },
  ];

  return (
    <main data-project-detail className="min-h-dvh bg-background text-foreground">
      <ProjectDetailAnimations />
      <div className="grid min-h-dvh lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <aside className="relative min-h-[62dvh] overflow-hidden sm:min-h-[68dvh] lg:sticky lg:top-0 lg:h-dvh">
          <div data-gsap="image" data-parallax-image className="absolute inset-0">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-background/5" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/10 to-background/70" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,hsl(var(--accent)/0.24),transparent_34%)]" />
          <div
            data-gsap="text"
            className="absolute inset-x-4 bottom-4 rounded-lg border border-white/12 bg-background/20 p-4 backdrop-blur-xl sm:inset-x-6 sm:bottom-6 sm:p-5 lg:inset-x-8 lg:bottom-8 lg:p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-widecaps text-premium-silver">
              {project.category}
            </p>
            <h1 className="mt-3 text-balance text-5xl font-semibold leading-none tracking-normal sm:text-6xl">
              {project.title}
            </h1>
          </div>
        </aside>

        <section className="relative px-4 py-6 sm:px-6 sm:py-8 lg:-ml-10 lg:flex lg:min-h-dvh lg:items-start lg:px-8 lg:py-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,hsl(var(--accent)/0.12),transparent_30%)]" />
          <article className="glass-surface relative z-10 mx-auto w-full max-w-3xl rounded-lg p-5 sm:p-7 lg:my-8 lg:p-10">
            <div className="mb-8 flex flex-wrap gap-3 sm:mb-10">
              <Button asChild variant="glass" size="sm" data-gsap="button">
                <Link href="/">
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  <span>Back</span>
                </Link>
              </Button>
              <Button asChild variant="glass" size="sm" data-gsap="button">
                <Link href={project.liveUrl} target="_blank">
                  <span>View Live</span>
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" data-gsap="button">
                <Link href={project.githubUrl} target="_blank">
                  <Github className="size-4" aria-hidden="true" />
                  <span>GitHub</span>
                </Link>
              </Button>
            </div>

            <header data-gsap="text" className="space-y-5 border-b border-white/12 pb-8 sm:space-y-6 sm:pb-10">
              <p className="text-xs font-semibold uppercase tracking-widecaps text-premium-silver">
                Case Study
              </p>
              <h2 className="text-balance text-4xl font-semibold leading-[0.95] tracking-normal sm:text-5xl lg:text-6xl">
                {project.title}
              </h2>
              <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                {project.description}
              </p>
            </header>

            <div className="space-y-8 py-8 sm:space-y-10 sm:py-10 lg:space-y-11 lg:py-11">
              <section
                data-gsap="section"
                className="grid gap-4 sm:grid-cols-[180px_1fr]"
              >
                <h3 className="text-xs font-semibold uppercase tracking-widecaps text-premium-silver">
                  Overview
                </h3>
                <p data-gsap="text" className="text-base leading-8 text-foreground/82">
                  {project.overview}
                </p>
              </section>

              <section data-gsap="section" className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-[180px_1fr]">
                  <h3 className="text-xs font-semibold uppercase tracking-widecaps text-premium-silver">
                    Gallery
                  </h3>
                  <p data-gsap="text" className="text-base leading-8 text-foreground/82">
                    Large screenshots, wireframes, UI designs, and process
                    images from the project direction.
                  </p>
                </div>
                <ProjectGallery items={galleryItems} />
              </section>

              {detailSections.map(([title, body]) => (
                <section
                  key={title}
                  data-gsap="section"
                  className="grid gap-3 sm:grid-cols-[140px_1fr] lg:grid-cols-[180px_1fr]"
                >
                  <h3 className="text-xs font-semibold uppercase tracking-widecaps text-premium-silver">
                    {title}
                  </h3>
                  <p data-gsap="text" className="text-base leading-8 text-foreground/82">
                    {body}
                  </p>
                </section>
              ))}

              <section
                data-gsap="section"
                className="grid gap-3 border-y border-white/12 py-8 sm:grid-cols-[140px_1fr] sm:py-9 lg:grid-cols-[180px_1fr]"
              >
                <h3 className="text-xs font-semibold uppercase tracking-widecaps text-premium-silver">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-sm border border-white/15 bg-white/[0.04] px-3 py-2 text-xs font-medium text-foreground/90 backdrop-blur-md"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </section>

            </div>

            <footer className="flex flex-col gap-3 border-t border-white/12 pt-8 sm:flex-row sm:pt-9">
              <Button
                asChild
                variant="glass"
                className="flex-1 justify-between"
                data-gsap="button"
              >
                <Link href={project.liveUrl} target="_blank">
                  <span>View Live</span>
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex-1 justify-between"
                data-gsap="button"
              >
                <Link href={project.githubUrl} target="_blank">
                  <span>GitHub</span>
                  <Github className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </footer>
          </article>
        </section>
      </div>
    </main>
  );
}
