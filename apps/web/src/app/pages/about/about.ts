import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { profile } from '../../core/content/profile';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrl: './about.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  protected readonly profile = profile;

  constructor() {
    inject(SeoService).set({
      title: 'About',
      description: profile.summary,
      path: '/about',
    });
  }
}
