import { CaseStudy } from '../models';

/**
 * Case studies. Add one by adding an object here — the list page, the detail
 * page and the prerendered routes all read from this array.
 *
 * `body` is plain HTML. Keep client names and internal figures out of anything
 * marked `underNda`.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'race-billing-platform',
    title: 'Race: three billing applications on one Angular monorepo',
    description:
      'A multi-tenant platform for ISP and FinTech providers. The hard part was never the invoices — it was keeping three separate products from drifting into three separate design languages.',
    role: 'Senior Software Engineer',
    company: 'Brain Station 23',
    period: '2024 — present',
    year: '2024',
    stack: ['Angular 20', 'Nx', 'RxJS', 'Ng Zorro', 'Azure DevOps'],
    underNda: false,
    summary:
      'A B2B platform for ISP and FinTech providers covering order-to-cash, invoicing, tax, payments, wallets and reseller hierarchies. Three Angular applications on one Nx monorepo, sharing a single component library.',
    highlight: '3 apps · 1 shared library · lazy-loaded routes',
    body: `
<h2>The problem</h2>
<p>Billing platforms grow sideways. Every new provider wants one more payment method, one more tax rule, one more way of slicing a reseller hierarchy — and each of those requests lands in a different part of the product. Race is three applications: a billing back office, a customer self-care portal, and a network-side console. They share customers, permissions and vocabulary, but they were on course to share nothing else.</p>
<p>My work was the frontend architecture: one monorepo, one component library, and boundaries strict enough that a change in one application cannot quietly break another.</p>

<h2>How it is structured</h2>
<p>Three applications, one shared library, and a rule that applications never import from each other. Everything common — form controls, tables, permission directives, translation keys — lives in the library and is versioned with the monorepo.</p>
<pre><code>apps/
├── billing/        order-to-cash, invoicing, tax, payments
├── self-care/      customer portal, wallets, usage
└── radius/         network provisioning console

libs/
└── shared/
    ├── ui/         tables, forms, CVA-backed controls
    ├── auth/       RBAC directives and route guards
    ├── i18n/       translation keys, locale formatting
    └── models/     invoice, subscription, tenant</code></pre>

<h2>What I owned</h2>
<ul>
  <li>The shared component library, including heavy use of <code>ControlValueAccessor</code> so complex inputs behave like native form controls everywhere.</li>
  <li>Role-based access control at the route, view and action level — field-wise permissions, not just page-wise.</li>
  <li>Route-level lazy loading across all three applications, so a self-care user never downloads the billing back office.</li>
  <li>Internationalisation, including locale-aware currency and tax display.</li>
  <li>Technical documentation and the Azure DevOps pipelines that build and ship it.</li>
</ul>

<blockquote>A shared library is not a folder of components. It is a promise that two teams will keep meaning the same thing by the word “invoice”.</blockquote>

<h2>Constraints that shaped it</h2>
<p>Providers run Race on their own tenants, with their own branding, their own tax rules and their own definition of who may refund what. That pushed almost every decision toward configuration over code: theming through design tokens rather than forked stylesheets, permissions resolved from the server rather than compiled in, and translation keys owned by the library so a new locale is a data change.</p>

<h2>Where it landed</h2>
<p>The three applications now look and behave like one product. New screens start from library components instead of from scratch, and a permission change is made in one place. The part I am most pleased with is duller than it sounds: the boundaries hold, so nobody has to hold the whole thing in their head at once.</p>
`,
  },
  {
    slug: 'enterprise-data-tool',
    title: 'State management without a library, in a mission-critical app',
    description:
      'An internal platform used by engineers across a very large company. A state layer written in plain Angular, no store library, and a shipped bundle 30% smaller than where it started.',
    role: 'Senior Software Engineer',
    company: 'Brain Station 23',
    period: '2023',
    year: '2023',
    stack: ['Angular', 'RxJS', 'Bundle budgets'],
    underNda: true,
    summary:
      'A mission-critical internal platform used by engineers worldwide. I designed a state management layer in plain Angular, with no external store library, and cut the shipped bundle by 30%.',
    highlight: 'Client under NDA · described by approach only',
    body: `
<h2>Why this page is vague in places</h2>
<p>The client cannot be named and the screens cannot be shown. What follows is the engineering, which is mine to describe.</p>

<h2>The problem</h2>
<p>The application had grown to a few hundred components, and roughly a third of the shipped JavaScript had nothing to do with the product. It was infrastructure: a store library, its effects package, its developer tools, and the several hundred lines of boilerplate written to satisfy them. Nobody had chosen that — it arrived with a project template years earlier and stayed.</p>

<h2>What a store actually had to do here</h2>
<p>When I wrote down what was genuinely used, the list was short. Hold some state. Let any component read a derived slice of it without re-fetching. Update it from one place so two components can never disagree. Survive a route change. Angular has primitives for all four.</p>

<h2>The shape we settled on</h2>
<p>A plain injectable class. State lives in one writable signal, everything the UI reads is a computed signal derived from it, and the only way to change it is a method on the class.</p>
<pre><code>@Injectable({ providedIn: 'root' })
export class DatasetStore {
  private readonly state = signal&lt;DatasetState&gt;(initialState);

  readonly datasets = computed(() =&gt; this.state().datasets);
  readonly stale    = computed(() =&gt;
    this.datasets().filter((d) =&gt; d.status === 'stale'),
  );

  load(workspaceId: string): void {
    this.api.datasets(workspaceId).subscribe((datasets) =&gt;
      this.state.update((s) =&gt; ({ ...s, datasets, loaded: true })),
    );
  }
}</code></pre>

<h2>What we gave up</h2>
<p>Two things, honestly. The action log — when a bug report says “the total was wrong after I refunded twice”, a recorded sequence of actions is faster to read than a stack trace. And discipline by default: a reducer makes it awkward to mutate state from the wrong place, a class method does not, so that line has to be held in code review instead.</p>

<h2>Result</h2>
<p>The shipped bundle came down by 30%, and build times fell with it. More usefully, a new screen no longer starts with four files of boilerplate before it does anything.</p>
`,
  },
  {
    slug: 'future-junction',
    title: 'Two years of remote frontend work for a studio in Japan',
    description:
      'Design-to-interface conversion for marketing sites and single-page applications, with a standing requirement that everything load quickly on a phone.',
    role: 'Frontend Developer (remote)',
    company: 'Future Junction, Miyazaki, Japan',
    period: '2020 — 2022',
    year: '2020',
    stack: ['React', 'Next.js', 'Tailwind CSS', 'Material UI'],
    underNda: false,
    summary:
      'Remote frontend work for a studio in Miyazaki, Japan. Design-to-interface conversion for marketing sites and single-page applications, with a hard requirement on mobile load time.',
    highlight: 'futurejunction.co.jp',
    body: `
<h2>The work</h2>
<p>Single-page applications and marketing sites, built from designs, for clients in Japan. Mostly React and Next.js, with Tailwind and Material UI depending on the project.</p>

<h2>What made it different</h2>
<p>Working remotely across a time zone and a language meant the handover had to carry more weight than a standup could. Designs arrived finished; questions cost a day. That taught me to read a design for its edge cases before starting — what happens at 320 pixels, what happens when the title is three lines, what happens when the list is empty.</p>

<h2>What I took from it</h2>
<ul>
  <li>Mobile load time as a requirement rather than an afterthought.</li>
  <li>Converting a design faithfully, then arguing about the parts that do not survive contact with real content.</li>
  <li>Writing the kind of commit messages and notes that answer a question the reader will have tomorrow morning while you are asleep.</li>
</ul>
`,
  },
];

export function findCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
