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
| `pnpm fetch:prs` | Refresh the merged-PR list from GitHub |
| `pnpm lint` | Lint |

## Where things are

```
apps/web/src/
├── index.html
├── styles.css                 design tokens — every colour and size starts here
└── app/
    ├── app.ts/html/css        the shell: header, anchor nav, footer
    ├── app.routes.ts          one page, plus a 404
    ├── app.routes.server.ts   how routes render (all prerendered)
    ├── core/
    │   ├── content/           ← THE FILES YOU EDIT
    │   │   ├── profile.ts     your name, role, links, focus areas
    │   │   ├── case-studies.ts
    │   │   └── open-source.generated.ts   ← generated, do not hand-edit
    │   ├── models/
    │   └── seo.service.ts     title, meta, canonical, JSON-LD
    └── pages/
        ├── home/              the whole site: hero, work, open source, about, contact
        └── not-found/

tools/fetch-prs.mjs            pulls merged PRs from GitHub at build time
```

It is one page. Sections are reached by anchor (`#work`, `#open-source`,
`#about`, `#contact`), not by route, so there is nothing to navigate between
and nothing to load.

## Editing the site

- **Your details, the hero, the focus strip** — `core/content/profile.ts`.
- **Add a case study** — add an object to the array in `case-studies.ts`. Its
  summary shows in the list and its `body` (plain HTML) sits behind a
  "Read the full case study" toggle.
- **Open source** — do not edit by hand. Run `pnpm fetch:prs`, or just
  `pnpm build`, which runs it first.

## The open-source list

`tools/fetch-prs.mjs` reads the same data as each repository's contributors
graph (`github.com/<repo>/graphs/contributors?all=1`) for
`angular/angular`, `angular/angular-cli` and `angular/components`, and writes
it into `core/content/open-source.generated.ts`. The three are shown as
separate groups, each with its own rank and commit count, plus the most recent
merged pull requests as examples.

**Why commits and not merged pull requests.** Angular's caretakers land a lot
of contributions by cherry-pick, which closes the pull request without GitHub
marking it "merged". Counting `is:merged` therefore undercounts badly — 256
against 326 at the time of writing. The contributors graph counts commits on
the default branch, which is what actually shipped, and it is the number
anyone can verify on GitHub.

This runs at **build time**, never in a visitor's browser. The page stays
static, nobody waits on GitHub to read it, and GitHub's rate limits cannot
affect a visitor. If GitHub is unreachable the script keeps the committed list
and exits cleanly, so an outage there can never fail a deploy.

Set `GITHUB_TOKEN` to lift the API rate limit. It is optional — the script
works without one.

To refresh the list without changing anything else, run `pnpm fetch:prs` and
commit the regenerated file. (A scheduled Vercel deploy would do the same
automatically.)


## What the tests check

`pnpm test` validates the content, not the code: unique url-safe slugs, no
missing fields, the three repository groups present and separate, the group
totals adding up, every PR link pointing at the repository it is filed under,
and each group listed newest-merged first. That last one has already caught a
real bug — GitHub search sorts by when a PR was opened, not when it merged.

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
