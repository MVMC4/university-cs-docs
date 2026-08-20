import { mat221Topics } from '../manifest';

export const mat221DocsBase = '/docs/sem3/mat221';

export function destinationTopic(sourceSlug: string) {
  return mat221Topics.find((topic) => topic.sourceSlug === sourceSlug);
}

export function sourceTopicHref(sourceSlug: string, page: 'notes' | 'questions' | 'quiz' | 'review' | 'exam-practice' = 'notes') {
  const topic = destinationTopic(sourceSlug);
  return topic ? `${mat221DocsBase}/${topic.slug}/${page}` : mat221DocsBase;
}

export function sourceSlugFromPageUrl(pageUrl: string) {
  const destinationSlug = pageUrl.slice(mat221DocsBase.length + 1).split('/')[0];
  return mat221Topics.find((topic) => topic.slug === destinationSlug)?.sourceSlug;
}
