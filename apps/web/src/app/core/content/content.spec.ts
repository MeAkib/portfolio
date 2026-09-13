import { describe, expect, it } from 'vitest';
import { caseStudies } from './case-studies';
import { posts } from './posts';
import { openSourcePrs } from './open-source';
import { profile } from './profile';

/**
 * These tests guard the content, not the code. A missing description or a
 * duplicated slug is the kind of mistake that ships silently and quietly
 * breaks a page or a link, so it fails the build instead.
 */

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

describe('case studies', () => {
  it('has at least one', () => {
    expect(caseStudies.length).toBeGreaterThan(0);
  });

  it('has unique, url-safe slugs', () => {
    const slugs = caseStudies.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug, `"${slug}" is not a clean slug`).toMatch(SLUG);
    }
  });

  it('fills in every field a page renders', () => {
    for (const study of caseStudies) {
      expect(study.title.trim(), study.slug).not.toBe('');
      expect(study.description.trim(), study.slug).not.toBe('');
      expect(study.summary.trim(), study.slug).not.toBe('');
      expect(study.body.trim(), study.slug).not.toBe('');
      expect(study.stack.length, study.slug).toBeGreaterThan(0);
    }
  });
});

describe('posts', () => {
  it('has unique, url-safe slugs', () => {
    const slugs = posts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug, `"${slug}" is not a clean slug`).toMatch(SLUG);
    }
  });

  it('has valid dates, and never an update before publication', () => {
    for (const post of posts) {
      expect(post.publishedAt, post.slug).toMatch(ISO_DATE);
      expect(Number.isNaN(Date.parse(post.publishedAt)), post.slug).toBe(false);

      if (post.updatedAt) {
        expect(post.updatedAt, post.slug).toMatch(ISO_DATE);
        expect(
          Date.parse(post.updatedAt) >= Date.parse(post.publishedAt),
          `${post.slug} was updated before it was published`,
        ).toBe(true);
      }
    }
  });

  it('is ordered newest first', () => {
    const dates = posts.map((p) => Date.parse(p.publishedAt));
    const sorted = [...dates].sort((a, b) => b - a);
    expect(dates).toEqual(sorted);
  });

  it('fills in every field a page renders', () => {
    for (const post of posts) {
      expect(post.title.trim(), post.slug).not.toBe('');
      expect(post.description.trim(), post.slug).not.toBe('');
      expect(post.category.trim(), post.slug).not.toBe('');
      expect(post.body.trim(), post.slug).not.toBe('');
      expect(post.readingTime, post.slug).toBeGreaterThan(0);
    }
  });
});

describe('open source', () => {
  it('links somewhere real', () => {
    for (const pr of openSourcePrs) {
      expect(pr.url.startsWith('https://'), pr.title).toBe(true);
      expect(pr.mergedAt).toMatch(ISO_DATE);
    }
  });
});

describe('profile', () => {
  it('has contact details the pages can use', () => {
    expect(profile.email).toContain('@');
    expect(profile.name.trim()).not.toBe('');
    expect(profile.specialism.trim()).not.toBe('');
  });
});
