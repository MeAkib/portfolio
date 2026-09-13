import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { caseStudies } from '../../core/content/case-studies';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-work',
  imports: [RouterLink],
  templateUrl: './work.html',
  styleUrl: './work.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Work {
  protected readonly work = caseStudies;

  constructor() {
    inject(SeoService).set({
      title: 'Work',
      description:
        'Case studies: a multi-tenant billing platform, an enterprise data tool, and two years of remote frontend work.',
      path: '/work',
    });
  }
}
