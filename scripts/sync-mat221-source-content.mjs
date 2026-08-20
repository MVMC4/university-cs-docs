import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'features', 'courses', 'mat221', 'source', 'content', 'docs');
const destination = path.join(root, 'content', 'docs', 'sem3', 'mat221');

const topics = [
  ['foundations', '01-foundations', 'Antiderivatives and the Fundamental Theorem'],
  ['substitution', '02-substitution', 'Integration by Substitution'],
  ['partials', '03-partial-fractions', 'Partial Fractions'],
  ['parts', '04-integration-by-parts', 'Integration by Parts'],
  ['reduction-formulas', '05-reduction-formulas', 'Reduction Formulas'],
  ['trig', '06-trigonometric-integrals', 'Trigonometric Integrals'],
  ['trig-substitution', '07-trigonometric-substitution', 'Trigonometric Substitution'],
  ['weierstrass', '08-weierstrass-substitution', 'Weierstrass Substitution'],
  ['improper', '09-improper-integrals', 'Improper Integrals'],
  ['numerical', '10-numerical-integration', 'Numerical Integration'],
  ['applications', '11-applications', 'Applications of Integration'],
  ['lhopital', '12-lhopital', 'L’Hôpital’s Rule'],
  ['sequences-series', '13-sequences-and-series', 'Sequences and Series'],
  ['power-series', '14-power-series', 'Power Series'],
  ['taylor', '15-taylor-series', 'Taylor Series'],
];

const routePages = [
  ['questions', 'Written Questions', 'Mat221SourceQuestionsPage'],
  ['quiz', 'Quiz', 'Mat221SourceQuizPage'],
  ['review', 'Review', 'Mat221SourceReviewPage'],
  ['exam-practice', 'Exam Practice', 'Mat221SourceExamPracticePage'],
];

for (const [sourceSlug, destinationSlug, title] of topics) {
  const topicDir = path.join(destination, destinationSlug);
  await mkdir(topicDir, { recursive: true });
  const sourceNote = await readFile(path.join(source, `${sourceSlug}.mdx`), 'utf8');
  const noteWithSidebarTitle = sourceNote.replace(/^title:.*$/m, 'title: Notes');
  await writeFile(path.join(topicDir, 'notes.mdx'), noteWithSidebarTitle, 'utf8');
  await writeFile(path.join(topicDir, 'meta.json'), `${JSON.stringify({ title: `${destinationSlug.slice(0, 2)}. ${title}`, pages: ['notes', 'questions', 'review', 'exam-practice'] }, null, 2)}\n`, 'utf8');

  for (const [file, label, component] of routePages) {
    const body = `---\ntitle: ${label}\ndescription: Source-faithful MAT221 ${label.toLowerCase()} for ${title}.\n---\n\n<${component} slug="${sourceSlug}" />\n`;
    await writeFile(path.join(topicDir, `${file}.mdx`), body, 'utf8');
  }
}

const courseMeta = {
  title: 'MAT221: Calculus II',
  pages: [
    'index',
    '---Course tools---',
    'formula-sheet',
    'resources',
    '---Chapters---',
    ...topics.map(([, destinationSlug]) => destinationSlug),
  ],
};

await writeFile(path.join(destination, 'meta.json'), `${JSON.stringify(courseMeta, null, 2)}\n`, 'utf8');
await writeFile(path.join(destination, 'index.mdx'), `---\ntitle: MAT221 Course Overview\ndescription: A complete source-faithful MAT221 course companion with notes, review, quizzes, and exam practice.\n---\n\n<Mat221SourceCourseOverview />\n`, 'utf8');
await writeFile(path.join(destination, 'formula-sheet.mdx'), `---\ntitle: Calculus I Formula Sheet\ndescription: A printable MAT221 formula sheet covering integration, applications, limits, series, and Taylor polynomials.\n---\n\n<Mat221SourceFormulaSheet />\n`, 'utf8');
await writeFile(path.join(destination, 'resources.mdx'), `---\ntitle: Calculus I Learning Resources\ndescription: Recommended textbooks, courses, visual tools, and study methods for MAT221.\n---\n\n<Mat221SourceResources />\n`, 'utf8');
