"use client";

import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { motion } from "framer-motion";

import { fadeUp, staggerContainer } from "@/animations/framer";
import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { GlassCard } from "@/components/glass-card";
import { Navbar } from "@/components/navbar";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { SectionTitle } from "@/components/section-title";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Creative Systems",
    category: "Brand Direction",
    image: "/assets/images/umd_creatives.png",
  },
  {
    title: "Product Motion",
    category: "Interaction Design",
    image: "/assets/images/gamerate.png",
  },
  {
    title: "Commerce Flow",
    category: "Frontend Engineering",
    image: "/assets/images/tickyaza.png",
  },
  {
    title: "Digital Identity",
    category: "Visual Design",
    image: "/assets/images/apple.png",
  },
];

const navItems = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function LandingPage() {
  return (
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
                    variant="poster"
                    title={project.title}
                    category={project.category}
                    image={project.image}
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
    </div>
  );
}
