import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { posts } from '../../core/content/posts';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-notes',
  imports: [RouterLink, DatePipe],
  templateUrl: './notes.html',
  styleUrl: './notes.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Notes {
  protected readonly posts = posts;

  constructor() {
    inject(SeoService).set({
      title: 'Notes',
      description:
        'Short pieces about Angular architecture, performance, and the parts of open-source work nobody writes down.',
      path: '/notes',
    });
  }
}
