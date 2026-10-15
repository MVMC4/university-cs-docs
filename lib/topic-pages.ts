/**
 * The pages every topic folder may contain, with the one label the sidebar,
 * the topic tabs and the pager use for each. Order here is the required order
 * (docs/content-standard.md, section 2.1).
 */
export const topicStages = [
  { slug: 'index', label: 'Overview' },
  { slug: 'notes', label: 'Notes' },
  { slug: 'cheat-sheet', label: 'Cheat sheet' },
  { slug: 'review', label: 'Review' },
  { slug: 'questions', label: 'Practice' },
  { slug: 'exam', label: 'Exam practice' },
  { slug: 'resources', label: 'Resources' },
] as const;

/** Old slugs that still exist until their course is migrated; they share a label with the standard page. */
const legacyStageLabels: Record<string, string> = {
  'exam-practice': 'Exam practice',
  quiz: 'Quiz',
};

const stageLabels: Record<string, string> = {
  ...legacyStageLabels,
  ...Object.fromEntries(topicStages.map((stage) => [stage.slug, stage.label])),
};

export function stageLabel(slug: string): string | undefined {
  return stageLabels[slug];
}

/** The two pages every course folder has besides its topics. */
const coursePageLabels: Record<string, string> = {
  index: 'Course Overview',
  resources: 'Course Resources',
};

/**
 * The label for a content file that is a standard page: a page of a topic folder
 * (`sem1/csi131/01-logic/review.mdx`) or a course's own overview and resources page
 * (`sem3/csi243/resources.mdx`). Undefined for every other file, including lessons
 * inside `notes/`.
 */
export function topicPageLabel(filePath: string | undefined): string | undefined {
  if (!filePath) return undefined;
  const path = filePath.replace(/\\/g, '/');
  const topicPage = /^sem\d+\/[^/]+\/[^/]+\/([^/]+)\.mdx?$/.exec(path);
  if (topicPage) return stageLabel(topicPage[1]);
  const coursePage = /^sem\d+\/[^/]+\/([^/]+)\.mdx?$/.exec(path);
  return coursePage ? coursePageLabels[coursePage[1]] : undefined;
}
