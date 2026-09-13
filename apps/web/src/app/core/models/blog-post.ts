/** One article, shown on /notes and /notes/:slug. */
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  /** ISO date, e.g. 2026-03-12 */
  publishedAt: string;
  updatedAt?: string;
  /** Minutes. */
  readingTime: number;
  /** The article body, as HTML. */
  body: string;
}
