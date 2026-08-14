# ePortfolio

My personal portfolio site. The landing page with project highlights plus a case study detail page per project.

## Tech stack

- **Framework:** Next.js 15 (App Router), React 19, TypeScript (strict)
- **Styling:** Tailwind CSS 3, shadcn/ui (new-york style, CSS-variable theming)
- **Animation:** Framer Motion (landing page, shared-layout project transitions), GSAP + ScrollTrigger (project detail scroll effects), Lenis (smooth scrolling)
- **Icons:** lucide-react
- **Tooling:** ESLint (`next/core-web-vitals`, `next/typescript`), tsc for type checking

There is no backend, database, or CMS — all content is static and defined in code/the filesystem, and the whole site is statically generated.

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

Other scripts:

```bash
npm run build      # production build (also generates all static project routes)
npm run start       # serve the production build locally
npm run lint        # eslint .
npm run typecheck   # tsc --noEmit
```

## Project structure

```
app/                    Next.js App Router routes
  page.tsx              landing page
  projects/[slug]/      per-project case study page (statically generated)
components/             UI building blocks (landing, ui/, providers/, shared primitives)
lib/
  projects.ts           project content — title, description, role, tech, etc.
  gallery.ts            reads each project's screenshots folder at build time
animations/             shared Framer Motion variants and GSAP config
public/assets/images/   static images served by the site
  projects/<slug>/      per-project cover image + gallery screenshots
```

## Adding or editing a project

1. Add an entry to the `projects` array in `lib/projects.ts` (title, description, role, technologies, links, etc.). The `slug` field determines the project's URL (`/projects/<slug>`) and its image folder name.
2. Create `public/assets/images/projects/<slug>/` and drop in:
   - `cover.png` — the hero image and landing page card image
   - any number of additional screenshots — these become the case study gallery automatically, ordered by filename (e.g. `01-...`, `02-...`)

No other code changes are needed to add screenshots — see `public/assets/images/projects/README.md` for filename conventions (ordering prefixes, tile-shape suffixes, supported formats).

## Deployment

This project deploys to [Vercel](https://vercel.com) with zero configuration — it's a standard Next.js app with no environment variables or external services required. Connect the repository in Vercel and it will build with `next build` and deploy automatically on push.

Since project images are read from the filesystem at build time (`lib/gallery.ts`), adding a new project folder requires a redeploy for the new screenshots to appear in production.
