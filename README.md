# Shuaib Hasan Akib — portfolio

One Angular application, prerendered to static HTML at build time. That is
the whole system. There is no API and no database: contact is a direct email
address and a LinkedIn link.

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
| `pnpm test` | Run the tests |
| `pnpm lint` | Lint |

## Layout

```
apps/web/src/app/
├── app.ts, app.html        the shell: header, router outlet, footer
├── app.routes.ts           the routes
├── app.routes.server.ts    how each route is rendered (all prerendered today)
├── core/models/            BlogPost, CaseStudy, OpenSourcePr
└── pages/                  one folder per page

content/
├── blog/                   articles, as markdown (pipeline comes later)
└── work/                   case studies, as markdown
```

It is deliberately flat. Nothing is split into a library until two different
places actually need it — at that point `nx g @nx/js:lib` takes one command.

## Rendering

`app.routes.server.ts` decides how each route renders. Today everything is
`RenderMode.Prerender`, so the build produces plain HTML files and the site
needs no server at all. SSR is already wired up, so moving one route to
`RenderMode.Server` later is a one-line change.

CI checks that the built HTML actually contains page text. The previous
version of this site shipped a page that said only "Loading" to search
engines; that cannot happen again without failing the build.

## Deployment

Build with `pnpm build` and serve `dist/apps/web/browser` as static files.
