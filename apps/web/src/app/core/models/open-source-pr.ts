/**
 * One merged pull request, written to content/open-source.json by
 * tools/oss/fetch-prs.mjs. The GitHub API is never called while a
 * visitor is loading the page.
 */
export interface OpenSourcePr {
  repo: string;
  title: string;
  url: string;
  /** ISO date */
  mergedAt: string;
}
