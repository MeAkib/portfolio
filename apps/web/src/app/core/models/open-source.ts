/** One merged pull request. */
export interface OpenSourcePr {
  number: number;
  title: string;
  url: string;
  /** ISO date, e.g. 2026-11-10 */
  mergedAt: string;
}

/** One repository's worth of contributions, shown as its own group. */
export interface OpenSourceGroup {
  /** e.g. "angular/angular" */
  repo: string;
  /** Human label for the heading, e.g. "Angular CLI" */
  label: string;
  /** One line explaining what the work in this repo is. */
  blurb: string;
  /** Total merged PRs in this repo — not just the ones listed. */
  merged: number;
  /** The most recent few, newest first. */
  prs: OpenSourcePr[];
}
