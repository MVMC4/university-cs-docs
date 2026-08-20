import { getPageImage, getPageMarkdownUrl, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { gitConfig } from '@/lib/shared';
import { Quiz } from '@/components/interactive/quiz';
import { siteConfig } from '@/lib/site';
import { flattenTree } from 'fumadocs-core/page-tree';

function getCourseFooterItems(pageUrl: string) {
  const segments = pageUrl.split('/').filter(Boolean);
  if (segments.length < 3 || segments[0] !== 'docs') return undefined;

  const courseUrl = `/${segments.slice(0, 3).join('/')}`;
  const pages = flattenTree(source.getPageTree().children).filter(
    (item) => item.url === courseUrl || item.url.startsWith(`${courseUrl}/`),
  );
  const currentIndex = pages.findIndex((item) => item.url === pageUrl);
  if (currentIndex === -1) return undefined;

  return {
    previous: pages[currentIndex - 1],
    next: pages[currentIndex + 1],
  };
}

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;
  const canonicalUrl = new URL(page.url, siteConfig.url).toString();
  const imageUrl = new URL(getPageImage(page).url, siteConfig.url).toString();
  const hasCustomEntryHeader = page.url === '/docs' || page.url === '/docs/study-tools';
  const learningResourceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: page.data.title,
    description: page.data.description,
    url: canonicalUrl,
    image: imageUrl,
    inLanguage: siteConfig.language,
    isAccessibleForFree: true,
    educationalLevel: 'University',
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      footer={{ items: getCourseFooterItems(page.url) }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(learningResourceJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      {!hasCustomEntryHeader && <>
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
        <div className="flex flex-row gap-2 items-center border-b pb-6">
          <MarkdownCopyButton markdownUrl={markdownUrl} />
          <ViewOptionsPopover
            markdownUrl={markdownUrl}
            githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
          />
        </div>
      </>}
      <DocsBody>
        <MDX
          components={getMDXComponents({
          Quiz,
          // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const canonicalUrl = new URL(page.url, siteConfig.url).toString();
  const imageUrl = new URL(getPageImage(page).url, siteConfig.url).toString();
  const socialImage = {
    url: imageUrl,
    width: 1200,
    height: 630,
    alt: `${page.data.title} - ${siteConfig.name}`,
  };

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: 'article',
      images: [socialImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.title,
      description: page.data.description,
      images: [socialImage],
    },
  };
}
