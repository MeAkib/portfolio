import { RenderMode, ServerRoute } from '@angular/ssr';
import { caseStudies } from './core/content/case-studies';
import { posts } from './core/content/posts';

/**
 * How each route is rendered.
 *
 * Everything is prerendered: the build writes a real HTML file per page, so the
 * site deploys as static files and needs no server at all. The two :slug routes
 * tell the builder which pages exist by reading the same content the pages read.
 *
 * SSR is wired up but unused. Switching one route to RenderMode.Server later is
 * a one-line change, not a migration.
 */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'work', renderMode: RenderMode.Prerender },
  {
    path: 'work/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => caseStudies.map((c) => ({ slug: c.slug })),
  },
  { path: 'open-source', renderMode: RenderMode.Prerender },
  { path: 'notes', renderMode: RenderMode.Prerender },
  {
    path: 'notes/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => posts.map((p) => ({ slug: p.slug })),
  },
  { path: 'about', renderMode: RenderMode.Prerender },
  { path: 'contact', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Prerender },
];
