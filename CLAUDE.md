# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # next dev
npm run build      # next build (also the only full validation of route generation)
npm run lint       # eslint . (next/core-web-vitals + next/typescript)
npm run typecheck  # tsc --noEmit
```

There is no test framework in this project — `lint` + `typecheck` + `build` are the verification steps.

## Stack

Next.js 15 App Router · React 19 · TypeScript (strict) · Tailwind 3 · shadcn/ui (new-york, neutral, CSS variables) · Framer Motion · GSAP + ScrollTrigger · Lenis. Path alias `@/*` maps to the repo root.

## Content model

All site content lives in `lib/projects.ts` as a hardcoded `projects: ProjectDetail[]` array. There is no CMS, database, or fetch layer.

- Adding a project means adding an entry there. Its `slug` automatically produces a static route via `generateStaticParams` in `app/projects/[slug]/page.tsx`; `getProjectBySlug` + `notFound()` handle misses.
- `image` paths point into `public/assets/images/`. `assets/` (repo root) is for non-runtime design sources.
- Case-study body copy is rendered from a `detailSections` tuple array in the detail page, so section order/labels are defined there, not in the data.
- Gallery images are **not** in the project data — `app/projects/[slug]/page.tsx` special-cases `slug === "terrapin-creatives"` with a hardcoded image list and otherwise repeats `project.image` four times. Extending galleries to more projects means moving that into `ProjectDetail`.
- `types/site.ts` (`NavItem`, `Project`) is vestigial — nothing imports it. Use `ProjectDetail` from `lib/projects.ts`.

## Two animation systems, split by route

**Landing page (`components/landing/landing-page.tsx`) — Framer Motion.** A client component wrapped in `LayoutGroup`. Shared `fadeUp` / `staggerContainer` variants come from `animations/framer.ts`. Project cards and the fullscreen `ProjectReveal` modal share `layoutId`s (`project-card-${id}`, `project-image-${id}`, `project-title-${id}`, `project-category-${id}`) — those IDs must stay paired between `PosterProjectCard` and the modal or the shared-layout transition silently breaks.

**Project detail route — GSAP, attribute-driven.** `app/projects/[slug]/page.tsx` stays a **server component**; all animation is done by the single client component `components/project-detail-animations.tsx`, which scopes a `gsap.context` to `[data-project-detail]` and queries markers in the server-rendered markup:

| marker | effect |
| --- | --- |
| `data-gsap="text"` / `"section"` / `"button"` / `"image"` | scroll-triggered fade + rise (buttons stagger by index) |
| `data-gsap="gallery"` | image scale-in plus hover scale on the tile's `<img>` |
| `data-parallax-image` | scrubbed y-parallax |

To animate something new on that page, add the attribute — do not add a client component. Two consequences:

1. The whole effect bails out early when `prefers-reduced-motion: reduce` **or** `pointer: coarse` matches. So elements must be visible in their default CSS; never pre-hide them with `opacity-0` classes, or they stay invisible on mobile and for reduced-motion users.
2. GSAP defaults (`power3.out`, 0.8s) and `nullTargetWarn: false` are set once in `animations/gsap.ts` — import `gsap` from there, not from `"gsap"`.

## Scroll and ambient effects (root layout)

`app/layout.tsx` mounts `LenisProvider` (smooth wheel scrolling) and `AmbientEffects`. Both matter to code you write elsewhere:

- `AmbientEffects` writes `--mouse-x` / `--mouse-y` onto `document.documentElement` on `pointermove`. The `.glass-surface` and `.mouse-light` utilities in `app/globals.css` read those vars for their cursor-following highlight, so glass surfaces lose that effect if the provider is removed.
- Because Lenis owns scrolling, `components/navbar.tsx` does its own anchor handling: `preventDefault` → `window.scrollTo` with a `-96px` header offset → `history.pushState`, and suppresses its scroll-spy for 900ms via `isProgrammaticScrollRef` so the active dot doesn't flicker mid-scroll. `section[id] { scroll-margin-top: 6rem }` in `globals.css` complements this. Section-anchor nav items are `#work` / `#about` / `#contact` and must match the `Section id`s on the landing page.

## Styling

Design tokens are HSL CSS variables in `app/globals.css` `:root`, surfaced through `tailwind.config.ts` (`background`, `foreground`, `glass.*`, `premium.*`, `shadow-glass|soft|glow`, `tracking-widecaps`, `--radius: 1.75rem`). The site is **dark-only**: there is no `.dark` block and no light palette, and `next-themes` is installed but unused. Don't add `dark:` variants — write single-theme classes.

Custom utilities defined in `globals.css` (not Tailwind plugins): `.glass-surface`, `.ambient-gradient`, `.mouse-light`, `.ambient-particles`, `.animated-button` (applied by every `Button` variant via `buttonVariants`), `.text-balance`. A `@media (prefers-reduced-motion: reduce)` block at the bottom disables the ambient/particle animations.

Compose classes with `cn()` from `@/lib/utils`. Presentational primitives (`Container`, `Section`, `GlassCard`, `Eyebrow`, `SectionTitle`, `TechBadge`, `SkipLink`, `Footer`) are server components taking `className` + spread props; keep `"use client"` confined to components that need state, listeners, or motion. `components/index.ts` is a partial barrel — most files import directly from `@/components/<name>`, which is fine.

## Recurring patterns worth reusing

Both modals (`ProjectReveal` in the landing page, the preview in `components/project-gallery.tsx`) implement the same contract: `role="dialog"` + `aria-modal`, an Escape `keydown` listener, `document.body.style.overflow = "hidden"` while open, a full-bleed backdrop `<button>` for click-to-close, and `AnimatePresence` for exit. Match that contract for any new overlay.
