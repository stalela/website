# Stalela Website

Public marketing site for Stalela. Built with Next.js App Router + React 19.

## Setup

```bash
npm install
cp .env.example .env.local  # fill in your env vars
npm run dev
```

Runs on [http://localhost:3000](http://localhost:3000).

## Dependencies

- **[@stalela/commons](https://github.com/stalela/stalela-commons)** — Shared Supabase data layer (installed from GitHub).

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` | Yes | Supabase anon/public key |
| `DASHSCOPE_API_KEY` | No | DashScope API key for image generation |

## i18n

Supports locales: `en`, `zu`, `af`, `xh` via `next-intl`. Messages live in `src/messages/`.

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run lint` — Run ESLint
- `npm run generate-images` — Generate service images via DashScope
