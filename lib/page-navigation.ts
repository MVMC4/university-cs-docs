import { findPath, flattenTree } from 'fumadocs-core/page-tree';
import type * as PageTree from 'fumadocs-core/page-tree';
import { source } from './source';
import { stageLabel } from './topic-pages';

export type TopicTab = { label: string; url: string; active: boolean };

function pathTo(url: string) {
  const tree = source.getPageTree();
  const path = findPath(tree.children, (node) => node.type === 'page' && node.url === url, { includeSeparator: false });
  return path ?? [];
}

function firstUrl(folder: PageTree.Folder) {
  return folder.index?.url ?? flattenTree(folder.children)[0]?.url;
}

/**
 * The pages of the topic the current page belongs to (Overview, Notes, Questions, Review …),
 * shown as tabs above the title. A page inside a topic's notes/ folder belongs to that topic,
 * so the notes folder appears as a single "Notes" tab. Courses and semesters get no tabs:
 * the header tabs and the sidebar already cover them.
 */
export function getTopicTabs(url: string): TopicTab[] {
  const path = pathTo(url);
  const folders = path.filter((node): node is PageTree.Folder => node.type === 'folder');
  if (folders.length < 3) return [];

  let topicIndex = folders.length - 1;
  const segments = url.split('/').filter(Boolean);
  if (topicIndex >= 3 && segments[topicIndex + 1] === 'notes') topicIndex -= 1;
  if (topicIndex < 2) return [];

  const topic = folders[topicIndex];
  const slugAt = topicIndex + 2;
  const topicUrl = `/${segments.slice(0, slugAt).join('/')}`;
  const tabs: TopicTab[] = [];

  if (topic.index) {
    tabs.push({ label: stageLabel('index') ?? 'Overview', url: topic.index.url, active: topic.index.url === url });
  }

  for (const child of topic.children) {
    if (child.type === 'page') {
      // The topic's own page is its Overview, even when meta.json lists it as an ordinary page.
      const slug = child.url === topicUrl ? 'index' : child.url.split('/').filter(Boolean)[slugAt];
      tabs.push({ label: stageLabel(slug) ?? String(child.name), url: child.url, active: child.url === url });
    } else if (child.type === 'folder') {
      const target = firstUrl(child);
      if (!target) continue;
      const slug = target.split('/').filter(Boolean)[slugAt];
      const inside = flattenTree([child]).some((page) => page.url === url);
      tabs.push({ label: stageLabel(slug) ?? String(child.name), url: target, active: inside });
    }
  }

  return tabs.length >= 2 && tabs.length <= 8 ? tabs : [];
}

export type PageNeighbours = {
  previous?: { name: string; url: string };
  next?: { name: string; url: string };
  position: number;
  total: number;
  scope?: string;
};

/**
 * Previous and next pages for the pager and the arrow keys. Inside a course the
 * sequence stays within that course; elsewhere it follows the whole site.
 */
export function getPageNeighbours(url: string): PageNeighbours {
  const tree = source.getPageTree();
  const path = pathTo(url);
  const course = path.filter((node): node is PageTree.Folder => node.type === 'folder')[1];
  const pages = flattenTree(course ? [course] : tree.children);
  const index = pages.findIndex((page) => page.url === url);
  if (index === -1) return { position: 0, total: 0 };

  const link = (page?: PageTree.Item) => (page ? { name: String(page.name), url: page.url } : undefined);
  return {
    previous: link(pages[index - 1]),
    next: link(pages[index + 1]),
    position: index + 1,
    total: pages.length,
    scope: course ? String(course.name) : undefined,
  };
}
