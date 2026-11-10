# Aditya Kumar Soni — Portfolio

Next.js (App Router) + TypeScript + Motion. Styling is plain CSS: design tokens in `app/globals.css`, component styles in co-located CSS Modules. No UI kit, no Tailwind — the layout is bespoke, so utility classes would only add a dependency.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
```

## Folder structure

```
app/
  layout.tsx            fonts, metadata, nav + footer shell
  page.tsx              home: hero, work, about, approach, stack, contact
  work/[slug]/page.tsx  case-study pages, pre-rendered for each published project
  globals.css           tokens (colour, type scale, spacing, motion) and base styles
  sitemap.ts, robots.ts, not-found.tsx, icon.svg
components/
  navigation/   fixed nav, active-section underline, mobile sheet
  hero/         headline that doubles as an index into the three work tabs
  projects/     WorkExplorer (tabs), ProjectCard, ProjectPlate, CaseStudy, StatusTag
  about/        About + timeline, Approach (principles band)
  stack/        grouped, levelled technology explorer
  contact/      contact section, copy-email button
  footer/       footer, live year
  animations/   Reveal (scroll-in), MotionProvider (reduced-motion)
  ui/           ButtonLink, SectionHeader, brand icons, Draft text
data/           ← all content lives here
  profile.ts        name, links, status line, email, site URL
  projects.ts       categories, projects, case-study copy
  technologies.ts   stack groups and honest proficiency levels
  experience.ts     timeline and engineering principles
  types.ts          the `draft()` helper
lib/            small helpers (cn, easing, tab-switch event)
public/
  resume.pdf        placeholder — replace it
  projects/         put screenshots here
```

## Drafts: how missing information works

Anything not yet known is written as `draft("what to write here")`.

- In `npm run dev` drafts show as dashed terracotta notes, so you can see what's missing.
- In production builds they are removed entirely. Visitors never see placeholder copy, and case-study sections with nothing but drafts are hidden.

## Before you deploy — checklist

1. `public/resume.pdf` — replace with your real résumé.
2. `data/profile.ts` — set `email` (contact switches from LinkedIn to your address automatically) and `siteUrl` (used for SEO, sitemap, Open Graph).
3. `data/projects.ts`
   - Realtime Chat and Doctor & Receptionist: add `repo` URLs once confirmed (the cards say "Repository soon" until then). Confirm the chat app's status and how messages are delivered in real time.
   - Doctor & Receptionist: add the frontend stack and database.
   - Books: name the dataset and embedding model on its plate.
   - Fill the `draft(...)` sections — motivation, challenges, solutions, learnings. Only add results you've measured.
   - Add `year` to each project.
4. `data/experience.ts` — Fluvina start date and responsibilities; education entry.
5. `data/technologies.ts` — levels are a first pass inferred from which projects use what. Adjust anything that's off.
6. About copy lives at the top of `components/about/About.tsx` — read it and make sure it sounds like you.

## Adding things

**A project:** add an object to `projects` in `data/projects.ts`. It appears in its tab and gets a `/work/<slug>` page automatically. `pipeline` drives the architecture plate.

**A screenshot:** drop it in `public/projects/` and add
`image: { src: "/projects/name.png", alt: "…", width: 1600, height: 1200 }`. It replaces the plate and is optimised by `next/image`.

**A data project:** pick a reserved slot in the Data section, remove `placeholder: true`, and fill in the fields.

**Status line:** `profile.status` is hand-edited text, not a live indicator.
