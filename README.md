# Mahmoud Kharouf — Portfolio

A personal portfolio for **Mahmoud Kharouf**, Full-Stack Developer (Django + React),
built around the **Atlas ERP** graduation project — a production-ready, multi-tenant
business platform (accounting, HR, inventory, point-of-sale).

Built with **React 19 + TypeScript + Vite + Tailwind CSS + Framer Motion**.

## Three designs, one click

The site ships with **three complete designs** you can switch between live using the
floating **“Design”** control in the bottom-right corner. Your choice is saved to the
browser (`localStorage`) and can also be deep-linked:

| Design      | Vibe                              | Deep link            |
| ----------- | --------------------------------- | -------------------- |
| `terminal`  | Dark, technical, developer-first  | `/?design=terminal`  |
| `aurora`    | Modern gradient glassmorphism     | `/?design=aurora`    |
| `editorial` | Clean, light, corporate-ready     | `/?design=editorial` |

All three share one data source (`src/data/index.ts`), the same photo, and the same
Atlas ERP case study with the 10 real product screenshots.

## Develop

```bash
npm install
npm run dev       # http://localhost:5173
```

## Build

```bash
npm run build     # type-checks + bundles to dist/
npm run preview   # serve the production build locally
```

## Deploy

The repo is ready for **Vercel** (`vercel.json`) and **Netlify** (`public/_redirects`) —
both rewrite all routes to the SPA. Push to a connected Git repo, or run `vercel`.

### Before you publish

1. **Set your domain.** Replace `https://mahmoudkharouf.dev/` everywhere it appears:
   - `index.html` (canonical, Open Graph, Twitter, JSON-LD)
   - `public/sitemap.xml`
   - `public/robots.txt`
2. **Optional — lock a default design.** To launch on a single design and hide the
   switcher, set `DEFAULT_DESIGN` in `src/design/DesignContext.tsx` and remove
   `<DesignSwitcher />` from `src/App.tsx`.
3. The social-share image is the Atlas dashboard screenshot
   (`public/projects/atlas/dashboard.png`). Swap the `og:image` in `index.html` if you
   prefer a different one.

## Project structure

```
src/
  data/index.ts              # single source of truth (profile, Atlas modules, etc.)
  design/
    DesignContext.tsx        # design state + persistence + ?design= override
    terminal/                # Design A
    aurora/                  # Design B
    editorial/               # Design C
  components/                # DesignSwitcher, Lightbox, BrowserFrame, icons
  hooks/                     # useTypewriter, useLightbox
public/
  profile.png                # photo (shared by all designs)
  projects/atlas/*.png       # Atlas ERP screenshots
```
