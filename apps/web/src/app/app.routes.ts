import { Route } from '@angular/router';

/**
 * One page. Sections are reached by anchor, not by route.
 * The 404 exists only for links that no longer resolve.
 */
export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
