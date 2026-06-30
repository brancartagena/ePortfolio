import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { notFound } from "next/navigation";

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

  const sections = [
    ["Overview", project.overview],
    ["Problem", project.problem],
    ["Solution", project.solution],
    ["My Role", project.role],
    ["Challenges", project.challenges],
    ["Lessons Learned", project.lessons],
    ["Results", project.results],
  ] as const;

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="grid min-h-dvh lg:grid-cols-2">
        <aside className="relative min-h-[70dvh] overflow-hidden lg:sticky lg:top-0 lg:h-dvh">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-background/5" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/10 to-background/70" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,hsl(var(--accent)/0.24),transparent_34%)]" />
          <div className="absolute inset-x-6 bottom-6 rounded-lg border border-white/12 bg-background/20 p-5 backdrop-blur-xl sm:inset-x-10 sm:bottom-10">
            <p className="text-xs font-semibold uppercase tracking-widecaps text-premium-silver">
              {project.category}
            </p>
            <h1 className="mt-3 text-balance text-5xl font-semibold leading-none tracking-normal sm:text-6xl">
              {project.title}
            </h1>
          </div>
        </aside>

        <section className="relative px-5 py-8 sm:px-8 sm:py-12 lg:-ml-16 lg:flex lg:min-h-dvh lg:items-start lg:px-10 lg:py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,hsl(var(--accent)/0.12),transparent_30%)]" />
          <article className="glass-surface relative z-10 mx-auto w-full max-w-3xl rounded-lg p-6 sm:p-9 lg:my-10 lg:p-11">
            <div className="mb-10 flex flex-wrap gap-3">
              <Button asChild variant="glass" size="sm">
                <Link href="/">
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  <span>Back</span>
                </Link>
              </Button>
              <Button asChild variant="glass" size="sm">
                <Link href={project.liveUrl} target="_blank">
                  <span>View Live</span>
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href={project.githubUrl} target="_blank">
                  <Github className="size-4" aria-hidden="true" />
                  <span>GitHub</span>
                </Link>
              </Button>
            </div>

            <header className="space-y-6 border-b border-white/12 pb-10">
              <p className="text-xs font-semibold uppercase tracking-widecaps text-premium-silver">
                Case Study
              </p>
              <h2 className="text-balance text-5xl font-semibold leading-[0.95] tracking-normal sm:text-6xl lg:text-7xl">
                {project.title}
              </h2>
              <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                {project.description}
              </p>
            </header>

            <div className="space-y-11 py-11">
              {sections.map(([title, body]) => (
                <section key={title} className="grid gap-4 sm:grid-cols-[180px_1fr]">
                  <h3 className="text-xs font-semibold uppercase tracking-widecaps text-premium-silver">
                    {title}
                  </h3>
                  <p className="text-base leading-8 text-foreground/82">{body}</p>
                </section>
              ))}

              <section className="grid gap-4 border-y border-white/12 py-9 sm:grid-cols-[180px_1fr]">
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

            <footer className="flex flex-col gap-3 border-t border-white/12 pt-9 sm:flex-row">
              <Button asChild variant="glass" className="flex-1 justify-between">
                <Link href={project.liveUrl} target="_blank">
                  <span>View Live</span>
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1 justify-between">
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
