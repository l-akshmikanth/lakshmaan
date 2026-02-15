# Copilot Instructions — Lakshmikanth & Maanya Wedding Site

## Project Overview

Single-page bilingual (English/Kannada) wedding invitation website for **Lakshmikanth & Maanya**. Built with **Vite + React 18 + TypeScript + Tailwind CSS + shadcn/ui**. No backend — purely static, deployed via Lovable.

## Architecture

- **Entry point**: `src/main.tsx` wraps `<BrowserRouter>` → `<LanguageProvider>` → `<App>`
- **Routing**: URL-based language — `/en` (English, default), `/kn` (Kannada). Root `/` redirects to `/en`. Route pattern: `/:lang` → `Index` page. See `src/App.tsx`.
- **Page composition**: `src/pages/Index.tsx` orchestrates all sections with a **curtain reveal** animation flow — `CurtainReveal` → `HeroSection` → `FamiliesSection` → `CountdownTimer` → `EventsSection` → `EngagementGallery` → `VenueSection` → `Footer`.
- **UI components**: `src/components/ui/` contains shadcn/ui primitives (do not edit manually — use `npx shadcn-ui@latest add <component>`). Custom components live in `src/components/`.

## i18n System

All user-facing strings go through the translation system — never hardcode display text.

- **`src/i18n/translations.ts`**: Defines `TranslationStrings` interface and `translations` record with `en`/`kn` keys. Add new strings by: (1) adding the key to `TranslationStrings`, (2) adding values to both `kn` and `en` objects.
- **`src/i18n/LanguageContext.tsx`**: Provides `useLanguage()` hook returning `{ language, toggleLanguage, t }`. Language is derived from URL path, not state.
- **Usage pattern**: `const { t } = useLanguage(); ... t("section.key")`
- **Kannada text**: CSS rule `:lang(kn)` applies `line-height: 1.8` for Kannada script rendering. The `<html lang>` attribute is synced automatically.

## Styling Conventions

- **Path alias**: `@/` maps to `src/` (configured in both `vite.config.ts` and `tsconfig.json`)
- **Utility-first Tailwind** with project-specific custom classes defined in `src/index.css`:
  - `.glass` — glassmorphism backdrop blur effect
  - `.glass-lift` — glass with hover elevation
  - `.gold-text` — gradient gold text using `background-clip: text`
  - `.gold-shimmer-text` — animated gold shimmer on hover
  - `.scroll-animate`, `.scroll-animate-left`, `.scroll-animate-right` — IntersectionObserver-triggered entrance animations
  - `.animate-cascade` + `.cascade--running` — staggered reveal controlled by `animationDelay` inline styles
- **Custom colors**: `gold`, `ivory`, `champagne`, `warm-white` defined as CSS variables in `:root` and referenced via Tailwind (`text-primary`, `bg-gold`, etc.)
- **Fonts**: Playfair Display (serif headings), Inter (sans body), Noto Serif Kannada (Kannada script). Use `font-serif` / `font-sans` Tailwind classes.
- **`cn()` utility**: Import from `@/lib/utils` to merge Tailwind classes: `cn("base-class", conditional && "extra")`

## Animation Patterns

- **Curtain reveal**: `CurtainReveal` component manages a two-phase open animation (curtain slide 1300ms → fade 900ms). Parent `Index` tracks `curtainOpen` / `curtainDone` state.
- **Scroll animations**: Wrap content in `<ScrollAnimate variant="up|left|right|scale|tilt" delay={ms}>` for IntersectionObserver-based entrance effects.
- **`KolamPattern`**: Decorative SVG component used as background ornament in sections. Applied with low opacity (`text-primary/[0.04]`).
- **Keyframe animations** are defined in `src/index.css` — `ken-burns`, `particle-rise`, `rotate-slow`, `ring-pulse`, etc.

## Dev Workflow

```sh
bun install          # Install deps (bun.lockb present; npm also works)
npm run dev          # Dev server on port 8080
npm run build        # Production build
npm run lint         # ESLint
npm run test         # Vitest (jsdom, @testing-library/react)
npm run test:watch   # Vitest watch mode
```

- **Test setup**: `src/test/setup.ts` polyfills `window.matchMedia`. Tests go in `src/**/*.{test,spec}.{ts,tsx}`.
- **Assets**: Static assets (images, audio) in `src/assets/`, imported directly in components. `public/` for robots.txt and other static files.
- **TypeScript**: Strict-ish config but `noImplicitAny: false`, `strictNullChecks: false`, `noUnusedLocals: false`. Unused vars are allowed.

## Key Patterns to Follow

1. **Component structure**: Functional components with arrow functions, default exports. Props via inline destructuring.
2. **Icons**: Use `lucide-react` — e.g., `import { Volume2 } from "lucide-react"`
3. **Section IDs**: Each major section has an `id` attribute (`home`, `family`, `events`, `gallery`, `venue`) used for nav scroll-to behavior.
4. **Accessibility**: Curtain and music player use `aria-label` with translated strings. Follow this pattern for interactive elements.
5. **No backend/API calls**: All data is hardcoded in translations or components. `@tanstack/react-query` is available but currently unused.
