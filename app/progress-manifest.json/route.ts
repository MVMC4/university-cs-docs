import { flattenTree } from 'fumadocs-core/page-tree';
import type * as PageTree from 'fumadocs-core/page-tree';
import type { Manifest, ManifestCourse, ManifestPage, ManifestTopic } from '@/features/progress/core';
import { source } from '@/lib/source';

/**
 * The list of courses, topics and pages, for the progress dashboard and the course badges.
 * It is built from the same page tree as the sidebar and served as static JSON, so the site stays backend-free
 * and the dashboard always matches the content that was deployed.
 */
export const revalidate = false;

const MANIFEST_VERSION = 1;

function segments(url: string) {
  return url.split('/').filter(Boolean);
}

function kindOf(url: string, topicUrl: string): string {
  if (url === topicUrl) return 'overview';
  const parts = segments(url);
  if (parts.includes('notes')) return 'notes';
  const last = parts[parts.length - 1];
  if (last === 'questions') return 'practice';
  if (['review', 'cheat-sheet', 'resources'].includes(last)) return last;
  return 'other';
}

function pagesOf(node: PageTree.Node, topicUrl: string): ManifestPage[] {
  return flattenTree([node]).map((page) => ({ path: page.url, title: String(page.name), kind: kindOf(page.url, topicUrl) }));
}

function firstUrl(node: PageTree.Folder): string | undefined {
  return node.index?.url ?? flattenTree([node])[0]?.url;
}

function build(): Manifest {
  const courses: ManifestCourse[] = [];
  for (const semester of source.getPageTree().children) {
    if (semester.type !== 'folder') continue;
    const semesterUrl = firstUrl(semester);
    const semesterId = semesterUrl ? segments(semesterUrl)[1] : undefined;
    if (!semesterId || !/^sem\d+$/.test(semesterId)) continue;

    for (const course of semester.children) {
      if (course.type !== 'folder') continue;
      const courseUrl = firstUrl(course);
      const courseSlug = courseUrl ? segments(courseUrl)[2] : undefined;
      if (!courseSlug) continue;

      const topics: ManifestTopic[] = [];
      const coursePages: ManifestPage[] = [];
      for (const child of course.children) {
        if (child.type === 'page') {
          const last = segments(child.url).length === 3 ? 'overview' : segments(child.url).pop() ?? 'other';
          coursePages.push({ path: child.url, title: String(child.name), kind: last });
        } else if (child.type === 'folder') {
          const firstPage = firstUrl(child);
          if (!firstPage) continue;
          // The topic's own address is its first four segments, whether or not it has an index page.
          const topicUrl = `/${segments(firstPage).slice(0, 4).join('/')}`;
          topics.push({ id: segments(topicUrl)[3], title: String(child.name), pages: pagesOf(child, topicUrl) });
        }
      }
      if (coursePages.length > 0) topics.unshift({ id: 'course', title: 'Course pages', pages: coursePages });

      courses.push({
        id: `${semesterId}/${courseSlug}`,
        title: String(course.name),
        semester: semesterId,
        semesterTitle: String(semester.name),
        topics,
      });
    }
  }
  return { version: MANIFEST_VERSION, courses };
}

export function GET() {
  return Response.json(build());
}
