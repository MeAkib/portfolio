import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { profile } from '../../core/content/profile';
import { caseStudies } from '../../core/content/case-studies';
import {
  openSourceGroups,
  openSourceTotal,
  openSourceUpdatedAt,
} from '../../core/content/open-source.generated';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-home',
  imports: [DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly profile = profile;
  protected readonly work = caseStudies;

  protected readonly groups = openSourceGroups;
  /** Commits authored across all three repositories. */
  protected readonly totalCommits = openSourceTotal;
  /** The narrower "PRs GitHub marks merged" figure, for the footnote. */
  protected readonly mergedPrTotal = openSourceGroups.reduce(
    (n, g) => n + g.mergedPrs,
    0,
  );
  protected readonly prsUpdatedAt = openSourceUpdatedAt;

  /** The strongest standing of the three, for the one line in the hero. */
  private readonly best = [...openSourceGroups]
    .filter((g) => g.rank !== null)
    .sort((a, b) => (a.rank ?? Infinity) - (b.rank ?? Infinity))[0];
  protected readonly bestRank = this.best?.rank ?? null;
  protected readonly bestRankRepo = this.best?.label ?? '';

  constructor() {
    inject(SeoService).set({
      title: profile.name,
      description: profile.specialism,
      path: '/',
    });
  }
}
