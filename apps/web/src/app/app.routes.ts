import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'work',
    loadComponent: () => import('./pages/work/work').then((m) => m.Work),
  },
  {
    path: 'work/:slug',
    loadComponent: () =>
      import('./pages/work-detail/work-detail').then((m) => m.WorkDetail),
  },
  {
    path: 'open-source',
    loadComponent: () =>
      import('./pages/open-source/open-source').then((m) => m.OpenSource),
  },
  {
    path: 'notes',
    loadComponent: () => import('./pages/notes/notes').then((m) => m.Notes),
  },
  {
    path: 'notes/:slug',
    loadComponent: () =>
      import('./pages/note-detail/note-detail').then((m) => m.NoteDetail),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
