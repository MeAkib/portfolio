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
  protected readonly totalMerged = openSourceTotal;
  protected readonly prsUpdatedAt = openSourceUpdatedAt;

  constructor() {
    inject(SeoService).set({
      title: profile.name,
      description: profile.specialism,
      path: '/',
    });
  }
}
