# Akash Madduru — 3D Software Engineer Portfolio

An immersive, Awwwards-quality portfolio built to feel like a product, not a résumé.
Cinematic 3D hero, premium motion, glassmorphism + aurora design — engineered for
**60 FPS**, **Lighthouse 95+**, and **WCAG AA**.

![Portfolio](public/icon.svg)

## ✨ Highlights

- **Interactive 3D hero** — React Three Fiber scene (floating workspace, particles,
  dynamic lights, mouse-parallax camera), lazy-loaded and DPR-capped for performance.
- **Dark-luxury design system** — Tailwind CSS v4 (CSS-first `@theme`), aurora gradients,
  glassmorphism, soft glow, large display type.
- **Premium micro-interactions** — magnetic buttons, 3D tilt cards, cursor spotlight,
  scroll reveals, morphing aurora, animated timeline, scroll-spy nav, custom cursor glow.
- **Interactive skills constellation** — a live 2D-canvas node graph (no progress bars).
- **Case-study project modals** — overview, architecture, challenges, results, tech stack.
- **Accessibility-first** — semantic HTML, keyboard nav, focus rings, skip link, and full
  `prefers-reduced-motion` support (3D + animations gracefully disabled).
- **SEO** — metadata API, OpenGraph + dynamic OG image, JSON-LD, sitemap, robots, manifest.
- **Robustness** — loading screen, error boundary, 404, WebGL fallback.

## 🧱 Tech Stack

| Area        | Tech |
| ----------- | ---- |
| Framework   | Next.js 15 (App Router), React 19, TypeScript |
| Styling     | Tailwind CSS v4, shadcn-style UI primitives |
| 3D          | React Three Fiber, three.js, drei |
| Motion      | Framer Motion, Lenis smooth scroll, GSAP-ready |
| Icons       | lucide-react |
| Forms       | react-hook-form + zod, Resend (optional) |

## 🚀 Getting Started

> Requires **Node.js 18.18+** (Node 20 LTS recommended).

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
# → http://localhost:3000

# 3. Production build
npm run build && npm start
```

### Scripts

| Command             | Description                       |
| ------------------- | --------------------------------- |
| `npm run dev`       | Start the dev server              |
| `npm run build`     | Production build                  |
| `npm start`         | Serve the production build        |
| `npm run lint`      | Lint with ESLint                  |
| `npm run typecheck` | Type-check with `tsc --noEmit`    |

## ✏️ Make it yours

All content lives in **`lib/data/`** — edit these, no component changes needed:

| File | What to edit |
| ---- | ------------ |
| `lib/data/profile.ts`    | Name, roles, tagline, narrative, stats |
| `lib/data/socials.ts`    | **Email, phone, LinkedIn, GitHub URLs** (placeholders — replace) |
| `lib/data/experience.ts` | Work history |
| `lib/data/projects.ts`   | Case studies, metrics, repo/demo links (placeholders) |
| `lib/data/skills.ts`     | Skill clusters |
| `lib/data/education.ts`  | Education |

Other assets to replace:

- **`public/resume.pdf`** — placeholder; drop in your real CV (same filename).
- **`app/icon.svg` / `public/icon.svg`** — favicon monogram.

> Search the codebase for `TODO: replace` to find every placeholder link.

## 📧 Contact form

The form works with **zero config**: if email isn't set up, it gracefully falls back
to opening the visitor's mail client (`mailto:`).

To enable real delivery via [Resend](https://resend.com):

1. `cp .env.example .env.local`
2. Fill in `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
3. Restart the dev server.

## ☁️ Deploy to Vercel

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — Next.js is auto-detected.
3. (Optional) add the env vars from `.env.example` in Project → Settings → Environment Variables.
4. Deploy. Also set `NEXT_PUBLIC_SITE_URL` to your production domain for correct SEO/OG.

## 🗂️ Project Structure

```
app/                 App Router: layout, page, SEO routes, api/contact, error/loading/404
components/
  sections/          Hero, About, Experience, Skills, Projects, Education, Contact
  three/             R3F canvas + scene (lazy-loaded)
  motion/            Magnetic, TiltCard, Spotlight, Reveal, TextReveal, Aurora
  layout/            Navbar, Footer, providers, smooth-scroll, cursor glow, scroll progress
  ui/                Button, Card, Badge, Dialog, Tooltip, Separator, Toaster
lib/
  data/              ← all site content
  hooks/             reduced-motion, media-query, scroll-spy
  utils.ts           cn() + math helpers
```

## ♿ Accessibility & Performance notes

- Every animation is gated behind `prefers-reduced-motion`; the 3D hero swaps to a static
  gradient when reduced motion is requested or WebGL is unavailable.
- three.js is code-split via `next/dynamic({ ssr: false })` so it never blocks first paint.
- Fonts are self-hosted through `next/font` (no layout shift).

## 📄 License

MIT — free to use as a template. Attribution appreciated but not required.

---

Built with Next.js, Three.js & care.
