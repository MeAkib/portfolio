/** A piece of work shown on /work. */
export interface CaseStudy {
  slug: string;
  title: string;
  /** One or two sentences, used on the detail page and in meta tags. */
  description: string;
  role: string;
  company: string;
  /** e.g. "2024 — present" */
  period: string;
  /** Sort key and the year shown in the list. */
  year: string;
  stack: string[];
  /** True when the client cannot be named, so the page describes approach only. */
  underNda: boolean;
  /** The short paragraph shown in the list on the home page and /work. */
  summary: string;
  /** A small line under the tags in the list — a metric, a domain, or a note. */
  highlight: string;
  /** The page body, as HTML. */
  body: string;
}
