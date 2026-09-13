/** One merged pull request, shown on /open-source. */
export interface OpenSourcePr {
  repo: string;
  title: string;
  url: string;
  /** ISO date. */
  mergedAt: string;
}
