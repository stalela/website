# Stalela Website — Copilot Instructions

## Scope
- This repo is the Stalela public marketing site (Next.js App Router + React 19).
- Shared data layer comes from `@stalela/commons` (installed via `github:stalela/stalela-commons`).

## Architecture
- Primary flow: UI → Next.js route/server component → `@stalela/commons` factory API → Supabase.
- Marketing uses anon/public client only: `src/lib/supabase.ts` → `createPublicClient()`, wrapped in a lazy Proxy (same deferred-init pattern as admin).
- Server components handle data fetching + metadata; client components handle interactivity.

## Key integration paths
- Lead capture: `src/components/LeadForm.tsx` → `POST /api/lead` (`src/app/api/lead/route.ts`) with required `source`.
- Blog listing/detail pages fetch published posts from Supabase with ISR (`revalidate = 3600`).
- Blog API routes (`/api/blog`, `/api/blog/[slug]`) are read-only JSON endpoints for published posts.

## Framework conventions
- Next.js App Router + React 19; `params` in pages/layouts are often `Promise<...>` and must be awaited.
- `reactCompiler: true` is enabled.
- Tailwind CSS v4 setup is CSS-first (`@import "tailwindcss"`, `@plugin`, `@theme inline`) in `src/app/globals.css`.

## i18n
- Uses `next-intl` with locales `en`, `zu`, `af`, `xh` (`src/i18n/routing.ts`).
- Use `Link` from `@/i18n/navigation` (not `next/link`) for locale-aware navigation.
- Root fonts/meta live in `src/app/layout.tsx`; locale wiring (`NextIntlClientProvider`, `setRequestLocale`) lives in `src/app/[locale]/layout.tsx`.
- Server components use `getTranslations()` + `setRequestLocale()`. Client components use `useTranslations()`.
- All user-facing copy comes from message files in `src/messages/{locale}.json` (namespaced keys).

## Page patterns
- Every page exports `generateMetadata()` using centralized `buildPageMetadata()` from `src/lib/seo.ts`.
- Structured data (JSON-LD) via `JsonLd` server component: Organization + WebSite on home, Service + BreadcrumbList on service pages.
- Sitemap (`src/app/sitemap.ts`) generates entries for all static pages × locales + blog posts with hreflang alternates.

## Services architecture (data-driven)
- Services defined once in `src/lib/services-data.ts` (29 services, 5 categories) — single source of truth for routing, rendering, sitemap, and navigation.
- Service pages have two rendering modes: **custom rich pages** via `customPages` map (using `StudioPage` reusable template), or **generic fallback** via `ServicePageContent`.
- SEO helpers centralized in `src/lib/seo.ts` (`buildPageMetadata`, `buildAlternates`, `SITE_URL`).

## Import conventions
- `@stalela/commons` subpath imports: `/client`, `/blog`, `/leads`, `/customers`, `/seo`, `/metrics`, `/companies`, `/research`, `/types`.
- `@/*` path alias for local source files.

## Env vars
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
- Optional: `DASHSCOPE_API_KEY` (for image generation scripts)

## Change constraints
- Prefer targeted changes that match existing patterns over new abstractions.
- Do not add auth/dashboard/compliance-engine features to marketing pages unless requested.
- Keep marketing copy factual; do not invent legal/compliance claims.
- Supabase remote image host is `hwfhtdlbtjhmwzyvejxd.supabase.co`.
