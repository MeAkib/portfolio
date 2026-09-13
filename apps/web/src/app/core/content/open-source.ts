import { OpenSourcePr } from '../models';

/**
 * Merged pull requests shown on /open-source.
 *
 * TODO: these are placeholder rows. Replace them with your real merged PRs —
 * the GitHub search that lists them is:
 *
 *   is:pr author:MeAkib repo:angular/angular is:merged
 *
 * The page reads this file at build time. The GitHub API is deliberately never
 * called while a visitor is loading the page: an outage on their side must not
 * be able to break a page on yours.
 */
export const openSourcePrs: OpenSourcePr[] = [
  {
    repo: 'angular/angular',
    title: 'docs: correct the control flow migration example',
    url: 'https://github.com/angular/angular/pulls?q=is%3Apr+author%3AMeAkib',
    mergedAt: '2026-03-02',
  },
  {
    repo: 'angular/angular',
    title: 'docs-infra: keyboard focus trap in the sidebar navigation',
    url: 'https://github.com/angular/angular/pulls?q=is%3Apr+author%3AMeAkib',
    mergedAt: '2026-01-19',
  },
  {
    repo: 'angular/angular',
    title: 'docs: clarify deferred loading triggers',
    url: 'https://github.com/angular/angular/pulls?q=is%3Apr+author%3AMeAkib',
    mergedAt: '2025-11-08',
  },
];

/** True while the rows above are still placeholders, so the page can say so. */
export const openSourceIsPlaceholder = true;
