import { BlogPost } from '../models';

/**
 * Articles. Add one by adding an object here — the listing, the article page
 * and the prerendered routes all read from this array.
 *
 * `body` is plain HTML. Newest first.
 */
export const posts: BlogPost[] = [
  {
    slug: 'custom-state-management-angular',
    title: 'Custom state management in Angular, without a library',
    description:
      'We removed the store library from a large enterprise application and replaced it with one small class per feature. Here is what that looked like, and when I would not do it again.',
    category: 'Angular',
    tags: ['angular', 'signals', 'architecture'],
    publishedAt: '2026-03-12',
    updatedAt: '2026-04-02',
    readingTime: 8,
    body: `
<p>The application had grown to a few hundred components, and roughly a third of the shipped JavaScript had nothing to do with our product. It was infrastructure: a store library, its effects package, its dev tools, and the several hundred lines of boilerplate we wrote to satisfy them.</p>
<p>Nobody had chosen that. It arrived with the project template in 2019 and stayed, the way these things do.</p>

<h2>What a store really has to do</h2>
<p>When I wrote down what we actually used, the list was short. Hold some state. Let any component read a derived slice of it without re-fetching. Update it from one place so two components can never disagree. Survive a route change. That is four things, and Angular has given us primitives for all four since signals landed.</p>
<p>The rest of what the library offered — time-travel debugging, action logs, a strict reducer discipline — we were paying for on every page load and using roughly never.</p>

<h2>The shape we settled on</h2>
<p>A plain injectable class. State lives in one writable signal; everything the UI reads is a computed signal derived from it; and the only way to change it is a method on the class.</p>
<pre><code>@Injectable({ providedIn: 'root' })
export class DatasetStore {
  private readonly state = signal&lt;DatasetState&gt;(initialState);

  // everything the templates read
  readonly datasets = computed(() =&gt; this.state().datasets);
  readonly stale    = computed(() =&gt;
    this.datasets().filter((d) =&gt; d.status === 'stale'),
  );

  // the only way in
  load(workspaceId: string): void {
    this.api.datasets(workspaceId).subscribe((datasets) =&gt;
      this.state.update((s) =&gt; ({ ...s, datasets, loaded: true })),
    );
  }
}</code></pre>
<p>A component injects the store and reads <code>store.stale()</code> in its template. No actions, no reducers, no selectors file, no effects registration. When a second screen needed the same data, it injected the same store and the data was already there.</p>

<blockquote>The library was not the problem. Using a library built for a problem we did not have — that was the problem.</blockquote>

<h2>What we gave up</h2>
<p>Two things, honestly. The first is the action log: when a bug report says “the total was wrong after I refunded twice”, a recorded sequence of actions is genuinely faster to read than a stack trace. The second is discipline by default. A reducer makes it awkward to mutate state from the wrong place. A class method does not — you have to hold that line in code review instead.</p>

<h2>When not to do this</h2>
<p>If several teams write into the same state, keep the library. If your debugging genuinely depends on replaying actions, keep the library. And if the state is small enough to live in one component, do not build a store at all — that is the more common mistake, and it costs more than either option here.</p>
`,
  },
  {
    slug: 'angular-bundle-audit',
    title: 'Where the 30% went: an Angular bundle audit',
    description:
      'A walk through an actual bundle audit on a large Angular application — what was in it, which cuts were worth making, and which ones were not.',
    category: 'Performance',
    tags: ['angular', 'performance', 'bundle size'],
    publishedAt: '2026-02-04',
    readingTime: 6,
    body: `
<p>Bundle audits usually start with a chart and end with an argument. The chart tells you that one dependency is large; the argument is about whether you are allowed to remove it. This is a note about the middle part, which nobody writes down.</p>

<h2>Measure before you have an opinion</h2>
<p>Angular's build already tells you the shape of the output. Turn on a budget first, so the number becomes a thing the build cares about rather than a thing you check occasionally.</p>
<pre><code>"budgets": [
  { "type": "initial",          "maximumWarning": "200kB", "maximumError": "300kB" },
  { "type": "anyComponentStyle", "maximumWarning": "4kB",  "maximumError": "8kB" }
]</code></pre>
<p>A budget that fails the build is worth more than a report nobody opens.</p>

<h2>Where it actually was</h2>
<p>In our case it broke down roughly like this. Store infrastructure we did not use. A date library imported in full for two formatting calls. A component library imported through a barrel file, which defeated tree shaking. And a set of routes that were eagerly loaded because that is what the template did in 2019.</p>

<h2>The cuts worth making</h2>
<ul>
  <li><strong>Route-level lazy loading.</strong> The biggest single win and the least risky. A user on one screen should not download the other twelve.</li>
  <li><strong>Barrel imports.</strong> Importing from a package's index pulls the index, which pulls everything. Import the specific entry point.</li>
  <li><strong>Date and utility libraries.</strong> Two formatting calls do not justify a dependency. <code>Intl.DateTimeFormat</code> is in the browser already.</li>
</ul>

<h2>The cuts not worth making</h2>
<p>Hand-rolling something the framework gives you, to save a few kilobytes, costs more in the long run than the kilobytes are worth. The rule I use: remove a dependency when it is doing less than you thought, not when it is merely large.</p>
`,
  },
  {
    slug: 'lessons-from-angular-prs',
    title: 'What 150 pull requests to Angular taught me',
    description:
      'Most of what I learned from contributing to Angular had nothing to do with Angular. Notes on reviews, scope, and writing changes other people can say yes to.',
    category: 'Open source',
    tags: ['open source', 'angular', 'code review'],
    publishedAt: '2025-12-18',
    readingTime: 5,
    body: `
<p>I started contributing to Angular while working full time, which means almost every pull request was written in an hour I did not really have. That constraint taught me more than the code did.</p>

<h2>Small changes get merged</h2>
<p>The single strongest predictor of whether a change lands is how long it takes to review. A change that touches one file and explains itself in three sentences gets read the day it arrives. A change that touches fourteen files waits, and while it waits it rots.</p>

<h2>Write the reason, not the diff</h2>
<p>The diff is already in the pull request. What a reviewer cannot see is why you thought this was worth changing, what you considered and rejected, and what you are unsure about. Saying “I am not sure this is the right place for this check” is not weakness; it tells the reviewer where to spend their attention.</p>

<h2>Documentation counts</h2>
<p>A lot of my merged work is documentation, accessibility and developer-experience fixes rather than framework internals. That used to feel like a lesser contribution. It is not. A confusing paragraph in the docs costs thousands of people ten minutes each.</p>

<h2>Read the reviews you did not get</h2>
<p>The most useful thing I did was read reviews on other people's pull requests in the same area. You learn the project's taste — what it considers obvious, what it argues about — far faster than by waiting for that feedback on your own work.</p>
`,
  },
];

export function findPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
