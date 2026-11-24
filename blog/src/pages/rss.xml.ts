import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts, postUrl } from '../lib/editions';
import { t } from '../i18n/ui';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  return rss({
    title: t('site.name'),
    description: t('site.description'),
    site: context.site ?? 'http://localhost:4321',
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.summary,
      pubDate: p.data.publishedAt ?? p.data.date,
      link: postUrl(p),
      categories: p.data.tags,
    })),
  });
}
