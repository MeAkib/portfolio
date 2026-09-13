import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { profile } from './content/profile';

export interface PageSeo {
  title: string;
  description: string;
  /** Path only, e.g. "/notes/my-article". */
  path: string;
  /** Set on article pages so the right structured data is emitted. */
  article?: {
    publishedAt: string;
    updatedAt?: string;
    tags: string[];
  };
}

/**
 * Sets everything a search engine or a link preview reads.
 *
 * Every page calls `set()` once. Because the site is prerendered, whatever this
 * writes ends up in the static HTML file rather than being applied in the
 * browser afterwards.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  set(page: PageSeo): void {
    const fullTitle =
      page.path === '/' ? profile.name : `${page.title} — ${profile.name}`;
    const url = `${profile.siteUrl}${page.path}`;

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({ name: 'author', content: profile.name });

    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({
      property: 'og:type',
      content: page.article ? 'article' : 'website',
    });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });

    this.setCanonical(url);
    this.setStructuredData(page, url, fullTitle);
  }

  private setCanonical(url: string): void {
    const head = this.document.head;
    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  /**
   * Only ever describes what is actually on the page: a Person on the home
   * page, a BlogPosting on an article, nothing anywhere else.
   */
  private setStructuredData(page: PageSeo, url: string, fullTitle: string): void {
    const head = this.document.head;
    const existing = head.querySelector('script[data-seo="ld"]');
    if (existing) {
      existing.remove();
    }

    let data: Record<string, unknown> | null = null;

    if (page.article) {
      data = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: page.title,
        description: page.description,
        datePublished: page.article.publishedAt,
        dateModified: page.article.updatedAt ?? page.article.publishedAt,
        keywords: page.article.tags.join(', '),
        author: { '@type': 'Person', name: profile.name },
        mainEntityOfPage: url,
      };
    } else if (page.path === '/') {
      data = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: profile.name,
        jobTitle: profile.role,
        email: `mailto:${profile.email}`,
        url: profile.siteUrl,
        sameAs: [profile.github, profile.linkedin],
        worksFor: { '@type': 'Organization', name: profile.current.company },
      };
    }

    if (!data) {
      return;
    }

    const script = this.document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-seo', 'ld');
    script.textContent = JSON.stringify(data);
    head.appendChild(script);
    void fullTitle;
  }
}
