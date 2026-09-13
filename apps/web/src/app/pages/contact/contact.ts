import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { profile } from '../../core/content/profile';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly profile = profile;

  constructor() {
    inject(SeoService).set({
      title: 'Contact',
      description: `Email ${profile.email} or find me on LinkedIn and GitHub.`,
      path: '/contact',
    });
  }
}
