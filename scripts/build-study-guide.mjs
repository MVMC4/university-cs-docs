#!/usr/bin/env node
/**
 * Builds a standalone study guide (one HTML file, and optionally a PDF) for a course whose topics follow the
 * content standard. The guide is made from the same files as the site, so it never drifts from them:
 * for each numbered topic, its notes, a table of key ideas (the flashcards), the practice questions with their
 * worked solutions, and the quiz bank with answers.
 *
 *   node scripts/build-study-guide.mjs --course mgt202 --out "<folder>" [--name <file name>] [--front <file.md>] [--pdf]
 *
 * --course  the course folder name under content/docs/sem*, for example mgt202
 * --out     the folder to write into (created if missing)
 * --name    the file name without extension (default: <COURSE>_Study_Guide)
 * --front   a markdown file shown under "About this guide" (what the guide covers, how sources are handled)
 * --pdf     also write a PDF, using Microsoft Edge or Chromium through Playwright
 *
 * It reads only the course's files and writes only into --out.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as runtime from 'react/jsx-runtime';
import { evaluate } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import yaml from 'js-yaml';

// Importing a flashcard .ts file makes Node print a module-type notice that does not matter here.
process.removeAllListeners('warning');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docsRoot = path.join(root, 'content/docs');
const args = process.argv.slice(2);
const option = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);

const courseName = option('--course')?.toLowerCase();
const outDir = option('--out');
if (!courseName || !outDir) {
  console.error('Usage: node scripts/build-study-guide.mjs --course <code> --out <folder> [--name <file>] [--front <file.md>] [--pdf]');
  process.exit(1);
}
const baseName = option('--name') ?? `${courseName.toUpperCase()}_Study_Guide`;
const frontFile = option('--front');
const wantPdf = args.includes('--pdf');

/* ───────── locate the course ───────── */

let courseDir;
let semester;
for (const entry of fs.readdirSync(docsRoot).filter((name) => /^sem\d+$/.test(name))) {
  const candidate = path.join(docsRoot, entry, courseName);
  if (fs.existsSync(candidate)) {
    courseDir = candidate;
    semester = entry;
  }
}
if (!courseDir) {
  console.error(`No course folder "${courseName}" under content/docs.`);
  process.exit(1);
}

const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const courseMeta = readJson(path.join(courseDir, 'meta.json'));
const courseTitle = courseMeta.title ?? courseName.toUpperCase();
const [courseCode, ...courseRest] = courseTitle.split(':');
const courseSubject = courseRest.join(':').trim() || courseTitle;

/* ───────── small helpers ───────── */

const escapeHtml = (text) => String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
/** Plain text from data files: escaped, with `code` spans. */
const rich = (text) => escapeHtml(text).replace(/`([^`\n]+)`/g, '<code>$1</code>');
const slugify = (text) => String(text).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function textOf(node) {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  return textOf(node.props?.children);
}

function splitFrontmatter(source) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source);
  if (!match) return { data: {}, content: source };
  return { data: yaml.load(match[1]) ?? {}, content: source.slice(match[0].length) };
}

/* ───────── MDX components, rendered as plain HTML ───────── */

const CALLOUT_LABELS = { note: 'Note', tip: 'Tip', caution: 'Caution', mistake: 'Common mistake', key: 'Key idea', analogy: 'Analogy' };
const unknown = new Set();

function makeComponents(topicKey) {
  const used = new Map();
  const heading = (level) =>
    function Heading({ children }) {
      const base = `${topicKey}-${slugify(textOf(children))}`;
      const count = used.get(base) ?? 0;
      used.set(base, count + 1);
      return h(`h${level}`, { id: count ? `${base}-${count + 1}` : base }, children);
    };

  const components = {
    // The topic title is h2 and its sections h3, so every heading in the notes moves down a level.
    h1: heading(3),
    h2: heading(3),
    h3: heading(4),
    h4: heading(5),
    h5: heading(6),
    table: ({ children }) => h('div', { className: 'tablewrap' }, h('table', null, children)),
    LearningObjectives: ({ items = [] }) =>
      h('div', { className: 'objectives' }, h('div', { className: 'lab' }, 'Learning objectives'), h('ul', null, items.map((item, index) => h('li', { key: index }, item)))),
    Callout: ({ type = 'note', title, children }) =>
      h('aside', { className: `callout callout-${type}` }, h('div', { className: 'lab' }, CALLOUT_LABELS[type] ?? type, title ? `: ${title}` : ''), h('div', { className: 'callout-body' }, children)),
    KeyTerm: ({ label = 'Key term', title, children }) =>
      h('div', { className: 'keyterm' }, label ? h('div', { className: 'lab' }, label) : null, title ? h('div', { className: 'keyterm-title' }, title) : null, h('div', null, children)),
    Steps: ({ title, children }) => h('div', { className: 'steps' }, title ? h('div', { className: 'steps-title' }, title) : null, h('ol', null, children)),
    Step: ({ title, children }) => h('li', null, title ? h('div', { className: 'step-title' }, title) : null, h('div', null, children)),
    CheckQuestions: ({ children }) => h('div', { className: 'checks' }, children),
    CheckQuestion: ({ question, children }) =>
      h('details', { className: 'check' }, h('summary', null, question), h('div', { className: 'answer' }, children)),
    ExamQuestion: ({ title, children }) => h('section', { className: 'exam' }, h('h4', null, title), children),
    SubQuestion: ({ part, prompt, solution }) =>
      h(
        'div',
        { className: 'sub' },
        h('div', { className: 'prompt' }, h('strong', null, `(${part}) `), prompt),
        h('details', null, h('summary', null, 'Worked solution'), h('div', { className: 'solution' }, solution)),
      ),
  };

  // Any other component is shown as its children, and reported so it can be given a rendering.
  return new Proxy(components, {
    get(target, name) {
      if (name in target || typeof name !== 'string' || !/^[A-Z]/.test(name)) return target[name];
      unknown.add(name);
      return ({ children }) => h('div', { className: 'figure-omitted' }, children);
    },
  });
}

async function renderMdx(source, topicKey) {
  const { content } = splitFrontmatter(source);
  const { default: Content } = await evaluate(content, { ...runtime, remarkPlugins: [remarkGfm] });
  return renderToStaticMarkup(h(Content, { components: makeComponents(topicKey) }));
}

/* ───────── read each topic ───────── */

const topicFolders = (courseMeta.pages ?? []).filter((page) => /^\d\d-/.test(page) && fs.statSync(path.join(courseDir, page)).isDirectory());

async function loadFlashcards(slug) {
  const file = path.join(root, 'content/flashcard-data', semester, courseName, slug, 'flashcards.ts');
  if (!fs.existsSync(file)) return [];
  const module = await import(pathToFileURL(file).href);
  return module.flashcardData ?? Object.values(module).find(Array.isArray) ?? [];
}

function loadQuiz(slug) {
  const file = path.join(root, 'content/quiz-data', semester, courseName, slug, 'review.json');
  if (!fs.existsSync(file)) return null;
  const quizzes = Object.values(readJson(file).quizzes ?? {});
  return quizzes[0] ?? null;
}

async function notesHtml(directory, topicKey) {
  const single = path.join(directory, 'notes.mdx');
  if (fs.existsSync(single)) return renderMdx(fs.readFileSync(single, 'utf8'), topicKey);
  const folder = path.join(directory, 'notes');
  if (!fs.existsSync(folder)) return '';
  const parts = [];
  for (const file of fs.readdirSync(folder).filter((name) => name.endsWith('.mdx')).sort()) {
    const source = fs.readFileSync(path.join(folder, file), 'utf8');
    const { data } = splitFrontmatter(source);
    parts.push(`<h3>${escapeHtml(data.title ?? file)}</h3>${await renderMdx(source, `${topicKey}-${slugify(file)}`)}`);
  }
  return parts.join('\n');
}

const LETTERS = 'ABCDEFGH';

function quizHtml(quiz) {
  if (!quiz) return '';
  return quiz.questions
    .map((question, index) => {
      const answer = `${LETTERS[question.correctIndex]}. ${question.options[question.correctIndex]}`;
      return `<div class="qq">
  <div class="qq-head"><span class="qn">${index + 1}</span>${question.group ? `<span class="qg">${escapeHtml(question.group)}</span>` : ''}</div>
  <p class="qtext">${rich(question.question)}</p>
  ${question.code ? `<pre>${escapeHtml(Array.isArray(question.code) ? question.code.join('\n') : question.code)}</pre>` : ''}
  <ol class="qopts" type="A">${question.options.map((option) => `<li>${rich(option)}</li>`).join('')}</ol>
  <details><summary>Answer</summary><p><strong>${rich(answer)}</strong>${question.explanation ? ` ${rich(question.explanation)}` : ''}</p></details>
</div>`;
    })
    .join('\n');
}

const topics = [];
for (const folder of topicFolders) {
  const directory = path.join(courseDir, folder);
  const number = Number(folder.slice(0, 2));
  const meta = readJson(path.join(directory, 'meta.json'));
  const name = String(meta.title ?? folder).replace(/^\d+\.\s*/, '');
  const key = `t${number}`;
  const { data: indexData } = fs.existsSync(path.join(directory, 'index.mdx'))
    ? splitFrontmatter(fs.readFileSync(path.join(directory, 'index.mdx'), 'utf8'))
    : { data: {} };
  const practiceFile = path.join(directory, 'questions.mdx');
  const flashcards = await loadFlashcards(folder);
  const quiz = loadQuiz(folder);
  topics.push({
    number,
    name,
    key,
    description: indexData.description ?? '',
    notes: await notesHtml(directory, key),
    practice: fs.existsSync(practiceFile) ? await renderMdx(fs.readFileSync(practiceFile, 'utf8'), `${key}-practice`) : '',
    flashcards,
    quiz,
    quizHtml: quizHtml(quiz),
  });
}

/* ───────── assemble the page ───────── */

/** [1, 2, 3, 4, 5, 7] becomes "1 to 5 and 7". */
function describeNumbers(numbers) {
  const runs = [];
  for (const number of numbers) {
    const last = runs[runs.length - 1];
    if (last && number === last.end + 1) last.end = number;
    else runs.push({ start: number, end: number });
  }
  const items = runs.flatMap((run) =>
    run.end - run.start >= 2 ? [`${run.start} to ${run.end}`] : Array.from({ length: run.end - run.start + 1 }, (_, offset) => String(run.start + offset)),
  );
  return items.length > 1 ? `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}` : (items[0] ?? '');
}

const today = new Date().toISOString().slice(0, 10);
const topicList = describeNumbers(topics.map((topic) => topic.number));
const front = frontFile ? await renderMdx(fs.readFileSync(path.resolve(frontFile), 'utf8'), 'about') : '';

const toc = topics
  .map(
    (topic) => `<li><a href="#${topic.key}"><span class="num">${topic.number}</span>${escapeHtml(topic.name)}</a>
  <small><a href="#${topic.key}-notes">Notes</a> · <a href="#${topic.key}-ideas">Key ideas</a> · <a href="#${topic.key}-practice">Practice</a> · <a href="#${topic.key}-quiz">Quiz bank</a></small></li>`,
  )
  .join('\n');

const topicSections = topics
  .map((topic) => {
    const cards = topic.flashcards.length
      ? `<section id="${topic.key}-ideas"><h3>Key ideas</h3>
<p class="lead">The flashcards for this topic as a table. Cover the right-hand column and test yourself.</p>
<div class="tablewrap"><table class="ideas"><thead><tr><th>Term or question</th><th>What to know</th></tr></thead><tbody>
${topic.flashcards.map((card) => `<tr><td>${rich(card.front)}</td><td>${rich(card.back)}</td></tr>`).join('\n')}
</tbody></table></div></section>`
      : '';
    return `<section class="topic" id="${topic.key}">
<header class="topic-head"><div class="lab">Topic ${topic.number}</div><h2>${escapeHtml(topic.name)}</h2>${topic.description ? `<p class="lead">${escapeHtml(topic.description)}</p>` : ''}</header>
<section id="${topic.key}-notes">
${topic.notes}
</section>
${cards}
${topic.practice ? `<section id="${topic.key}-practice"><h3>Practice questions</h3>${topic.practice}</section>` : ''}
${topic.quiz ? `<section id="${topic.key}-quiz"><h3>Quiz bank</h3><p class="lead">${topic.quiz.questions.length} questions. Answer each one before opening the answer.</p>${topic.quizHtml}</section>` : ''}
</section>`;
  })
  .join('\n');

const css = `
:root{color-scheme:light;--ink:#202124;--body:#3c4043;--muted:#5f6368;--rule:#dadce0;--soft:#f1f3f4;--faint:#f8f9fa;--blue:#1a73e8;--blue-t:#e8f0fe;--green:#1e8e3e;--green-t:#e6f4ea;--amber:#e37400;--amber-t:#fef7e0;--red:#c5221f;--red-t:#fce8e6;--violet:#7627bb;--violet-t:#f3e8fd;--teal:#00796b;--teal-t:#e0f2f1}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:#fff;color:var(--body);font:16px/1.55 "Segoe UI",Roboto,Arial,"Helvetica Neue",sans-serif}
.sheet{max-width:920px;margin:0 auto;padding:0 clamp(16px,4vw,32px) 80px}
h1,h2,h3,h4,h5{color:var(--ink);font-weight:500;line-height:1.3;margin:0}
h1{font-size:clamp(30px,5vw,44px);font-weight:400;margin:0 0 8px}
h2{font-size:clamp(25px,3.4vw,32px);font-weight:400}
h3{font-size:21px;margin:36px 0 12px;padding-top:6px;border-top:1px solid var(--rule)}
h4{font-size:17px;margin:24px 0 8px}
h5{font-size:15px;margin:18px 0 6px}
p{margin:0 0 14px}
a{color:var(--blue);text-decoration:none}a:hover{text-decoration:underline}
strong{color:var(--ink);font-weight:600}
code{font:0.9em Consolas,"Roboto Mono",monospace;background:var(--soft);padding:1px 5px;border-radius:3px}
pre{background:var(--faint);border:1px solid var(--rule);border-radius:6px;padding:12px 14px;overflow:auto;font:13px/1.5 Consolas,"Roboto Mono",monospace}
ul,ol{margin:0 0 14px;padding-left:1.4em}li{margin:3px 0}
.lab{font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
.lead{color:var(--muted);font-size:17px}
.num{font-variant-numeric:tabular-nums}

.cover{padding:48px 0 8px}
.cover-rule{width:120px;height:5px;border-radius:3px;margin-bottom:24px;background:linear-gradient(to right,var(--green) 0 33%,var(--blue) 33% 66%,var(--violet) 66%)}
.cover .sub{font-size:19px;color:var(--muted);margin:0 0 20px}
.meta{display:flex;flex-wrap:wrap;gap:8px 24px;color:var(--muted);font-size:14px;margin:0 0 24px}
.toc{border:1px solid var(--rule);border-radius:8px;padding:18px 22px;margin:8px 0 32px}
.toc ol{list-style:none;padding:0;margin:10px 0 0;display:grid;gap:10px}
.toc li{margin:0}
.toc li>a{font-weight:500;font-size:16px}
.toc li>a .num{display:inline-block;min-width:1.6em;color:var(--muted)}
.toc small{display:block;margin-left:1.6em;color:var(--muted)}
.about{border:1px solid var(--rule);border-radius:8px;padding:6px 22px 14px;margin:0 0 8px;background:var(--faint)}
.about h3{border-top:0;margin-top:18px}

.topic{margin-top:56px}
.topic-head{padding:28px 0 6px;border-top:4px solid var(--ink)}
.topic-head h2{margin:4px 0 8px}

.tablewrap{overflow-x:auto;margin:0 0 18px}
table{border-collapse:collapse;width:100%;font-size:14.5px}
th,td{border:1px solid var(--rule);padding:7px 10px;text-align:left;vertical-align:top}
th{background:var(--soft);color:var(--ink);font-weight:600}
tbody tr:nth-child(even) td{background:var(--faint)}
table.ideas td:first-child{width:30%;font-weight:500;color:var(--ink)}

.objectives{border:1px solid var(--rule);border-left:4px solid var(--blue);border-radius:6px;padding:12px 18px 4px;margin:0 0 18px;background:var(--blue-t)}
.objectives ul{margin:8px 0 10px}
.keyterm{border:1px solid var(--rule);border-left:4px solid var(--blue);border-radius:6px;padding:10px 16px;margin:0 0 16px;background:#fff}
.keyterm-title{font-weight:600;color:var(--ink);margin:2px 0 2px}
.keyterm>div:last-child>:last-child{margin-bottom:2px}
.callout{border-radius:6px;padding:10px 16px;margin:0 0 16px;border-left:4px solid var(--muted);background:var(--faint)}
.callout .lab{margin-bottom:4px}
.callout-body>:last-child{margin-bottom:2px}
.callout-note{border-color:var(--blue);background:var(--blue-t)}
.callout-tip{border-color:var(--green);background:var(--green-t)}
.callout-caution{border-color:var(--amber);background:var(--amber-t)}
.callout-mistake{border-color:var(--red);background:var(--red-t)}
.callout-key{border-color:var(--violet);background:var(--violet-t)}
.callout-analogy{border-color:var(--teal);background:var(--teal-t)}
.steps{border:1px solid var(--rule);border-radius:6px;padding:12px 18px 6px;margin:0 0 18px}
.steps-title{font-weight:600;color:var(--ink);margin-bottom:8px}
.steps ol{list-style:none;counter-reset:s;padding:0;margin:0}
.steps li{counter-increment:s;position:relative;padding:0 0 10px 34px;margin:0}
.steps li::before{content:counter(s);position:absolute;left:0;top:0;width:24px;height:24px;border-radius:50%;background:var(--ink);color:#fff;font-size:13px;font-weight:600;display:grid;place-items:center}
.step-title{font-weight:600;color:var(--ink)}
.steps li>div:last-child>:last-child{margin-bottom:0}

details{border:1px solid var(--rule);border-radius:6px;margin:0 0 10px;background:#fff}
details>summary{cursor:pointer;padding:9px 14px;font-weight:500;color:var(--ink)}
details[open]>summary{border-bottom:1px solid var(--rule);background:var(--faint)}
details>div,details>p{padding:10px 14px 4px;margin:0}
details>div>:last-child,details>p:last-child{margin-bottom:8px}
.exam{border:1px solid var(--rule);border-radius:8px;padding:6px 18px 10px;margin:0 0 18px}
.exam>h4{margin:12px 0 10px;font-size:17px}
.sub{margin:0 0 14px}
.sub .prompt{margin:0 0 6px;color:var(--ink)}

.qq{border:1px solid var(--rule);border-radius:8px;padding:12px 16px 4px;margin:0 0 14px}
.qq-head{display:flex;gap:10px;align-items:center;margin-bottom:6px}
.qn{display:inline-grid;place-items:center;width:26px;height:26px;border-radius:50%;background:var(--ink);color:#fff;font-size:13px;font-weight:600}
.qg{font-size:12px;color:var(--muted)}
.qtext{color:var(--ink);font-weight:500;margin-bottom:8px}
.qopts{margin:0 0 10px;padding-left:1.8em}

@media print{
  @page{size:A4;margin:16mm 14mm 18mm}
  body{font-size:10.5pt;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .sheet{max-width:none;padding:0}
  .topic{break-before:page;margin-top:0}
  h3,h4,h5{break-after:avoid}
  table,aside,.keyterm,.objectives,.steps li,.sub,.qq,details,.exam>h4{break-inside:avoid}
  tr{break-inside:avoid}
  a{color:inherit}
  .toc small a{color:var(--muted)}
  details>summary{list-style:none}
  details>summary::-webkit-details-marker{display:none}
}`;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(courseCode)} ${escapeHtml(courseSubject)}: Study Guide</title>
<style>${css}</style>
</head>
<body>
<main class="sheet">
<header class="cover">
<div class="cover-rule"></div>
<div class="lab">${escapeHtml(courseCode)} · Study guide</div>
<h1>${escapeHtml(courseSubject)}</h1>
<p class="sub">${topics.length === 1 ? 'Topic' : 'Topics'} ${escapeHtml(topicList)}: notes, key ideas, practice questions with worked solutions, and a quiz bank for each topic.</p>
<div class="meta"><span>Built ${today}</span><span>${topics.length} topics</span><span>${topics.reduce((sum, topic) => sum + (topic.quiz?.questions.length ?? 0), 0)} quiz questions</span></div>
</header>
<nav class="toc" aria-label="Contents"><div class="lab">Contents</div><ol>
${toc}
</ol></nav>
${front ? `<section class="about" id="about"><h3>About this guide</h3>${front}</section>` : ''}
${topicSections}
</main>
</body>
</html>
`;

fs.mkdirSync(outDir, { recursive: true });
const htmlPath = path.join(outDir, `${baseName}.html`);
fs.writeFileSync(htmlPath, html, 'utf8');
console.log(`Wrote ${htmlPath} (${Math.round(html.length / 1024)} KB, ${topics.length} topics)`);
if (unknown.size) console.warn(`Components shown as plain text only: ${[...unknown].join(', ')}`);

/* ───────── PDF ───────── */

if (wantPdf) {
  const { chromium } = await import('playwright');
  let browser;
  for (const channel of ['msedge', 'chrome', undefined]) {
    try {
      browser = await chromium.launch(channel ? { channel } : {});
      break;
    } catch {
      /* try the next browser */
    }
  }
  if (!browser) {
    console.error('No browser found for the PDF. Install Microsoft Edge, Chrome, or run "npx playwright install chromium".');
    process.exit(1);
  }
  const page = await browser.newPage();
  await page.goto(pathToFileURL(htmlPath).href);
  // The PDF is for reading offline, so every answer and solution is shown.
  await page.evaluate(() => document.querySelectorAll('details').forEach((element) => { element.open = true; }));
  const pdfPath = path.join(outDir, `${baseName}.pdf`);
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: `<div style="width:100%;font:8px 'Segoe UI',Arial,sans-serif;color:#5f6368;text-align:center">${escapeHtml(courseCode)} ${escapeHtml(courseSubject)} · <span class="pageNumber"></span> / <span class="totalPages"></span></div>`,
  });
  await browser.close();
  console.log(`Wrote ${pdfPath} (${Math.round(fs.statSync(pdfPath).size / 1024)} KB)`);
}
