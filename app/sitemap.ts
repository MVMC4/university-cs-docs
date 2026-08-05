import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { siteConfig } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const docs = source.getPages().map((page) => ({
    url: new URL(page.url, siteConfig.url).toString(),
    changeFrequency: 'monthly' as const,
    priority: page.slugs.length <= 2 ? 0.8 : 0.6,
  }));

  return [
    {
      url: siteConfig.url,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...docs,
  ];
}
