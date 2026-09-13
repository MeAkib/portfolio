/** A piece of work on the /work section. */
export interface CaseStudy {
  slug: string;
  title: string;
  description: string;
  role: string;
  company: string;
  /** e.g. "2024 — present" */
  period: string;
  stack: string[];
  /** True when the client cannot be named, so the page shows approach only. */
  underNda: boolean;
  html: string;
}
