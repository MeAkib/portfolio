import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Every public page is prerendered to static HTML at build time.
 * SSR stays wired up, so switching a single route to RenderMode.Server
 * later is a one-line change rather than a migration.
 */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Prerender },
];
