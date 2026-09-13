import { ChangeDetectionStrategy, Component, OnInit, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { findPost, posts } from '../../core/content/posts';
import { BlogPost } from '../../core/models';
import { profile } from '../../core/content/profile';
import { SeoService } from '../../core/seo.service';

@Component({
  selector: 'app-note-detail',
  imports: [RouterLink, DatePipe],
  templateUrl: './note-detail.html',
  styleUrl: './note-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteDetail implements OnInit {
  readonly slug = input.required<string>();

  private readonly seo = inject(SeoService);
  protected readonly profile = profile;

  protected get post(): BlogPost | undefined {
    return findPost(this.slug());
  }

  protected get related(): BlogPost[] {
    return posts.filter((p) => p.slug !== this.slug()).slice(0, 2);
  }

  ngOnInit(): void {
    const post = this.post;
    if (post) {
      this.seo.set({
        title: post.title,
        description: post.description,
        path: `/notes/${post.slug}`,
        article: {
          publishedAt: post.publishedAt,
          updatedAt: post.updatedAt,
          tags: post.tags,
        },
      });
    }
  }
}
