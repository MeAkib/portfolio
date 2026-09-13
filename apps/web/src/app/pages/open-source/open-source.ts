import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { openSourceIsPlaceholder, openSourcePrs } from '../../core/content/open-source';
import { profile } from '../../core/content/profile';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-open-source',
  imports: [DatePipe],
  templateUrl: './open-source.html',
  styleUrl: './open-source.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenSource {
  protected readonly prs = openSourcePrs;
  protected readonly isPlaceholder = openSourceIsPlaceholder;
  protected readonly profile = profile;

  constructor() {
    inject(SeoService).set({
      title: 'Open source',
      description:
        'Merged contributions to the Angular framework — mostly documentation, accessibility and developer-experience work.',
      path: '/open-source',
    });
  }
}
