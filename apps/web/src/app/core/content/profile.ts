/**
 * Everything about you that appears in more than one place.
 * Edit this file and the whole site follows.
 */
export const profile = {
  name: 'Shuaib Hasan Akib',
  role: 'Senior Software Engineer',
  location: 'Dhaka, Bangladesh',
  email: 'akibh805@gmail.com',
  linkedin: 'https://www.linkedin.com/in/',
  github: 'https://github.com/MeAkib',
  siteUrl: 'https://example.com', // TODO: replace with your domain

  /** The one sentence under your name on the home page. */
  specialism:
    'I specialize in large Angular applications — architecture, performance, and the design systems that hold them together.',

  /** The paragraph under that. */
  summary:
    'Seven years of frontend work, most of it inside Angular monorepos: multi-tenant billing platforms, enterprise data tools, shared component libraries. I contribute to the Angular framework itself, and I write about what large codebases teach you.',

  current: {
    company: 'Brain Station 23',
    title: 'Senior Software Engineer',
    since: 'February 2022',
  },

  openSource: {
    project: 'Angular',
    summary: '150+ merged pull requests · ranked #47 contributor',
  },

  /** The four-column strip under the hero. */
  focus: [
    {
      title: 'Architecture',
      detail: 'Nx monorepos, shared libraries, enforced module boundaries.',
    },
    {
      title: 'Performance',
      detail: 'Lazy routes, deferred loading, bundle budgets that fail the build.',
    },
    {
      title: 'Design systems',
      detail: 'Component libraries with CVA, theming and accessibility built in.',
    },
    {
      title: 'Delivery',
      detail: 'Azure DevOps pipelines, affected builds, release discipline.',
    },
  ],
} as const;
