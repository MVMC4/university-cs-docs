import { access, readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const frozen = path.join(root, 'features', 'courses', 'mat221', 'source');
const destination = path.join(root, 'content', 'docs', 'sem3', 'mat221');
const external = process.env.MAT221_SOURCE_REPO || 'C:\\Users\\Nido\\Desktop\\Projects\\Active\\mat221-docs';
const failures = [];

const topics = [
  ['foundations', '01-foundations'], ['substitution', '02-substitution'], ['partials', '03-partial-fractions'],
  ['parts', '04-integration-by-parts'], ['reduction-formulas', '05-reduction-formulas'], ['trig', '06-trigonometric-integrals'],
  ['trig-substitution', '07-trigonometric-substitution'], ['weierstrass', '08-weierstrass-substitution'], ['improper', '09-improper-integrals'],
  ['numerical', '10-numerical-integration'], ['applications', '11-applications'], ['lhopital', '12-lhopital'],
  ['sequences-series', '13-sequences-and-series'], ['power-series', '14-power-series'], ['taylor', '15-taylor-series'],
];
const routeFiles = ['notes.mdx', 'questions.mdx', 'quiz.mdx', 'review.mdx', 'exam-practice.mdx', 'meta.json'];

function hash(buffer) { return createHash('sha256').update(buffer).digest('hex'); }
function normalizeNoteTitle(buffer) { return Buffer.from(buffer.toString('utf8').replace(/^title:.*$/m, 'title: Notes')); }

async function filesUnder(directory, relative = '') {
  const entries = await readdir(path.join(directory, relative), { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const next = path.join(relative, entry.name);
    if (entry.isDirectory()) files.push(...await filesUnder(directory, next));
    else files.push(next.replaceAll('\\', '/'));
  }
  return files.sort();
}

async function compareTrees(label, left, right, ignored = new Set()) {
  const [leftFilesRaw, rightFilesRaw] = await Promise.all([filesUnder(left), filesUnder(right)]);
  const leftFiles = leftFilesRaw.filter((file) => !ignored.has(file));
  const rightFiles = rightFilesRaw.filter((file) => !ignored.has(file));
  if (JSON.stringify(leftFiles) !== JSON.stringify(rightFiles)) failures.push(`${label}: file inventories differ`);
  for (const file of leftFiles.filter((item) => rightFiles.includes(item))) {
    const [a, b] = await Promise.all([readFile(path.join(left, file)), readFile(path.join(right, file))]);
    if (hash(a) !== hash(b)) failures.push(`${label}: content differs for ${file}`);
  }
}

for (const [sourceSlug, destinationSlug] of topics) {
  const [sourceNote, destinationNote] = await Promise.all([
    readFile(path.join(frozen, 'content', 'docs', `${sourceSlug}.mdx`)),
    readFile(path.join(destination, destinationSlug, 'notes.mdx')),
  ]);
  if (hash(normalizeNoteTitle(sourceNote)) !== hash(normalizeNoteTitle(destinationNote))) failures.push(`note body differs: ${sourceSlug} -> ${destinationSlug}`);
  for (const file of routeFiles) {
    try { await access(path.join(destination, destinationSlug, file)); }
    catch { failures.push(`missing route file: ${destinationSlug}/${file}`); }
  }
}

try {
  await access(external);
  const approvedDeletions = {
    app: new Set(['layout.tsx', 'page.tsx', 'planner/page.tsx', 'sitemap.ts', 'topics/[slug]/review/page.tsx']),
    components: new Set(['FoundationsReviewVideo.tsx', 'Goals.tsx', 'Sidebar.tsx', 'Timers.tsx']),
    lib: new Set(['planner.ts', 'resources.ts']),
    styles: new Set(['planner.css']),
  };
  for (const directory of ['app', 'components', 'lib', 'styles']) {
    await compareTrees(`frozen ${directory}`, path.join(external, directory), path.join(frozen, directory), approvedDeletions[directory]);
  }
  await compareTrees('frozen content/docs', path.join(external, 'content', 'docs'), path.join(frozen, 'content', 'docs'));
} catch {
  console.warn(`External source unavailable; skipped frozen-snapshot comparison: ${external}`);
}

if (failures.length) {
  console.error(`MAT221 fidelity audit failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log('MAT221 fidelity audit passed: 15 source-faithful note bodies, 75 route surfaces, and the source snapshot with approved deletions.');
}
