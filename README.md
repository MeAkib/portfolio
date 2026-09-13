# Shuaib Hasan Akib — portfolio platform

An Nx monorepo holding the public website (Angular) and its API (NestJS).
The site is **content-first and backend-optional**: every public page is
prerendered to static HTML at build time, so the portfolio and blog keep
working even if the API is down.

## Requirements

- Node 22 (see `.nvmrc`)
- pnpm 10 (`corepack enable` is enough)

## Getting started

```bash
pnpm install
pnpm dev            # Angular site on http://localhost:4200
pnpm dev:api        # NestJS API on http://localhost:3000
```

## Everyday commands

| Command | What it does |
| --- | --- |
| `pnpm dev` | Serve the website |
| `pnpm dev:api` | Serve the API |
| `pnpm build` | Build and prerender the website into `dist/apps/web/browser` |
| `pnpm build:all` | Build every project |
| `pnpm test` | Run all tests |
| `pnpm lint` | Lint everything, including the module boundary rules |
| `pnpm graph` | Open the dependency graph in a browser |

## How the code is organised

```
apps/
├── web/     Angular 22 website. Prerendered. This is the public site.
└── api/     NestJS, a single /health route. Not deployed, and nothing
             on the public site calls it. There is no database in this
             project: contact is a direct email and a LinkedIn link.

libs/
├── ui/      Design tokens, layout and shared components
├── content/ Loads and types the markdown content
├── models/  The shared shapes: BlogPost, CaseStudy, OpenSourcePr, ContactRequest
└── util/    Small helpers: slugs, dates, reading time
```

### The rules the linter enforces

- `web` may only import from `libs/*`. It can never import from `api`.
- `api` may only import from `libs/*`. It can never import from `web`.
- Inside the libraries the direction is one way:
  `models` ← `util` ← `content` / `ui` ← apps.

Breaking one of these is a lint error, not a code review comment.
The rules live in `eslint.config.mjs` under `@nx/enforce-module-boundaries`,
and each project declares its tags in its `project.json`.

## Rendering

Routes choose their own strategy in `apps/web/src/app/app.routes.server.ts`.
Today everything is `RenderMode.Prerender`, which means the build produces
plain HTML files and the site needs no server at all. SSR is already wired
up, so moving one route to `RenderMode.Server` later is a one-line change.

CI checks that the built HTML actually contains page text. The previous
version of this site shipped a page that said only "Loading" to search
engines; that cannot happen again without failing the build.

## Writing an article

Not built yet — see the plan. It will be a markdown file in `content/blog/`,
validated at build time and rendered into static HTML.

## Deployment

| | Web | API |
| --- | --- | --- |
| Build | `pnpm nx build web` | `pnpm nx build api` |
| Output | `dist/apps/web/browser` | `dist/apps/api` |
| Type | static files | Node service |
