import { ChangeDetectionStrategy, Component, OnInit, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { caseStudies, findCaseStudy } from '../../core/content/case-studies';
import { CaseStudy } from '../../core/models';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-work-detail',
  imports: [RouterLink],
  templateUrl: './work-detail.html',
  styleUrl: './work-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkDetail implements OnInit {
  /** Bound from the :slug route parameter. */
  readonly slug = input.required<string>();

  private readonly seo = inject(SeoService);

  protected get study(): CaseStudy | undefined {
    return findCaseStudy(this.slug());
  }

  protected get next(): CaseStudy | undefined {
    const index = caseStudies.findIndex((c) => c.slug === this.slug());
    return caseStudies[(index + 1) % caseStudies.length];
  }

  ngOnInit(): void {
    const study = this.study;
    if (study) {
      this.seo.set({
        title: study.title,
        description: study.description,
        path: `/work/${study.slug}`,
      });
    }
  }
}
