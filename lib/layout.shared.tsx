import Image from 'next/image';
import type { BaseLayoutProps, LayoutTab } from 'fumadocs-ui/layouts/shared';
import type * as PageTree from 'fumadocs-core/page-tree';
import { appName, docsRoute, gitConfig } from './shared';
import { TimerTrigger } from '@/features/study-timer';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // The favicon artwork is the site logo.
      title: (
        <>
          <Image src="/logo.png" alt="" width={28} height={28} priority />
          {appName}
        </>
      ),
    },
    links: [
      {
        type: 'custom',
        secondary: true,
        children: <TimerTrigger />,
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}

/** Short tab labels for the top-level folders; the sidebar keeps the full folder names. */
const tabTitles: Record<string, string> = {
  'study-tools': 'Study tools',
  playgrounds: 'Playgrounds',
  sem1: 'Semester I',
  sem2: 'Semester II',
  sem3: 'Semester III',
  sem5: 'Semester V',
};

/**
 * The row of section tabs under the header. One "Overview" tab for the docs
 * landing page, then one per top-level folder or page in the order of meta.json.
 */
export function docsTabs(tree: PageTree.Root): LayoutTab[] {
  const tabs: LayoutTab[] = [{ title: 'Overview', url: docsRoute, urls: new Set([docsRoute]) }];

  for (const node of tree.children) {
    if (node.type === 'folder') {
      const url = node.index?.url ?? node.children.find((child) => child.type === 'page')?.url;
      if (!url) continue;
      const slug = url.slice(docsRoute.length + 1).split('/')[0];
      tabs.push({ title: tabTitles[slug] ?? node.name, url, $folder: node });
    } else if (node.type === 'page' && node.url !== docsRoute) {
      const slug = node.url.slice(docsRoute.length + 1);
      tabs.push({ title: tabTitles[slug] ?? node.name, url: node.url, urls: new Set([node.url]) });
    }
  }

  return tabs;
}
