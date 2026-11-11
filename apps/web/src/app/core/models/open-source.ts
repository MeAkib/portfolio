/** One pull request, shown as an example of the work. */
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
  /**
   * Commits authored in this repository that are on the default branch.
   *
   * This is the honest count. Angular's caretakers land many contributions by
   * cherry-pick, which CLOSES the pull request without GitHub marking it
   * "merged" — so a merged-PR count understates the work badly. Commits
   * authored is what actually shipped.
   */
  commits: number;
  /** PRs GitHub marks merged. Kept for context; always lower than `commits`. */
  mergedPrs: number;
  /** The most recent few merged PRs, newest first, as examples. */
  prs: OpenSourcePr[];
}
