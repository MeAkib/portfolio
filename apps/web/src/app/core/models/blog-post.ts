/**
 * One article. Built from a markdown file in content/blog at build time —
 * nothing here is fetched at runtime.
 */
export interface BlogPost {
  /** Comes from the filename. Never written by hand, never changed after publishing. */
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  /** ISO date, e.g. 2026-03-12 */
  publishedAt: string;
  updatedAt?: string;
  coverImage?: string;
  /** Minutes, calculated from the word count. */
  readingTime: number;
  /** Markdown already rendered to HTML at build time. */
  html: string;
}
