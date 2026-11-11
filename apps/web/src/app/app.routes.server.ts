import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Both routes are prerendered, so the build emits plain HTML files and the
 * site needs no server. SSR is wired up but unused — switching a route to
 * RenderMode.Server later is a one-line change.
 */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Prerender },
];
