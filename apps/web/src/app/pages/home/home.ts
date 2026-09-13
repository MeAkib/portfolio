import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { profile } from '../../core/content/profile';
import { caseStudies } from '../../core/content/case-studies';
import { posts } from '../../core/content/posts';
import { openSourcePrs } from '../../core/content/open-source';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly profile = profile;
  protected readonly work = caseStudies;
  protected readonly notes = posts.slice(0, 3);
  protected readonly prs = openSourcePrs.slice(0, 3);

  constructor() {
    inject(SeoService).set({
      title: profile.name,
      description: profile.specialism,
      path: '/',
    });
  }
}
