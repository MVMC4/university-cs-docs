export function mat221TopicHref(slug: string, page?: 'notes' | 'questions' | 'review' | 'exam-practice') {
  const base = `/docs/sem3/mat221/${slug}`;
  return page ? `${base}/${page}` : base;
}

export function mat221SourceRoute(sourceSlug: string, page?: 'questions' | 'quiz' | 'review' | 'exam-practice') {
  const base = `/topics/${sourceSlug}`;
  return page ? `${base}/${page}` : base;
}
