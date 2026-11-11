# Shuaib Hasan Akib — portfolio

One Angular application, prerendered to static HTML at build time. That is the
whole system: no API, no database. Contact is a direct email address and a
LinkedIn link.

## Requirements

- Node 24 (see `.nvmrc`)
- pnpm 11 (`corepack enable` is enough)

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:4200
```

## Commands

| Command | What it does |
| --- | --- |
| `pnpm dev` | Serve the site locally |
| `pnpm build` | Build and prerender into `dist/apps/web/browser` |
| `pnpm test` | Run the content tests |
| `pnpm lint` | Lint |

## Where things are

```
apps/web/src/
├── styles.css                 design tokens — every colour and size starts here
├── index.html
└── app/
    ├── app.ts/html/css        the shell: header, router outlet, footer
    ├── app.routes.ts          the routes
    ├── app.routes.server.ts   how each route renders (all prerendered today)
    ├── core/
    │   ├── content/           ← THE FILES YOU EDIT
    │   │   ├── profile.ts     your name, role, links, focus areas
    │   │   ├── case-studies.ts
    │   │   ├── posts.ts       articles
    │   │   └── open-source.ts merged pull requests
    │   ├── models/            the shapes those files must match
    │   └── seo.service.ts     title, meta, canonical, JSON-LD
    └── pages/                 one folder per page
```

## Editing the site

Everything you will want to change is in `app/core/content/`.

- **Your details, the hero, the focus strip** — `profile.ts`.
- **Add a case study** — add an object to the array in `case-studies.ts`. The
  list page, the detail page and the prerendered routes all pick it up.
- **Add an article** — add an object to the array in `posts.ts`, newest first.
- **Open-source list** — `open-source.ts`. Those rows are placeholders today;
  replace them with your real merged PRs.

`body` is plain HTML in both `case-studies.ts` and `posts.ts`. When the writing
gets frequent this is the point to swap in a markdown pipeline — the page
components will not need to change, only the file that feeds them.

## What the tests check

`pnpm test` validates the content, not the code: unique url-safe slugs, no
missing titles or descriptions, valid dates, no article updated before it was
published, and posts in newest-first order. A content mistake fails the build
instead of shipping a broken page.

## Rendering

`app.routes.server.ts` decides how each route renders. Everything is
`RenderMode.Prerender`, so `pnpm build` writes a real HTML file per page and the
site deploys as static files with no server. SSR is wired up but unused —
switching one route to `RenderMode.Server` later is a one-line change.

The app runs **zoneless**, so `zone.js` is not shipped at all.

CI checks that the built HTML actually contains page text. The previous version
of this site shipped a page that said only "Loading" to search engines; that
cannot happen again without failing the build.

## Before going live

- Set `siteUrl` in `core/content/profile.ts` — canonical URLs and Open Graph
  tags use it.
- Replace the LinkedIn URL in the same file.
- Replace the placeholder rows in `core/content/open-source.ts`.
- Fonts load from Google Fonts via a `<link>` in `index.html`. Self-hosting them
  as woff2 is a small, worthwhile improvement once the design is settled.

## Deployment

Build with `pnpm build` and serve `dist/apps/web/browser` as static files.

## Deploying to Vercel

`vercel.json` states every setting explicitly because Vercel's Angular preset
does not fit an Nx workspace: the preset runs `ng build` and looks for
`dist/<project>/browser`, while this repo builds with `pnpm build` and
prerenders into `dist/apps/web/browser`. Setting `framework` to `null` turns
the preset off.

Note that `vercel.json` is strict JSON — it rejects `//` comment keys with a
schema error before the build even starts. Keep explanations in this file.

The deployment is plain static hosting. No serverless function is created,
because every route is prerendered at build time.
