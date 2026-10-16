# Handoff: standardise every course (continue from here)

Written 2026-10-15 at the end of an Opus session, for the next session (Sonnet 5.5) to pick up without re-deriving anything. Read this file, then [docs/content-standard.md](../content-standard.md), which is the authoritative standard.

> **Update 2026-10-16.** The tracked list of work is now [WORK_ORDERS.md](../../WORK_ORDERS.md); read it first. Changes since this handoff was written: the Exam section is removed from every course (so the "missing exam pages" question is closed and `exam.mdx` is no longer a topic page); decoding exam and lab language becomes a section of every review page (so the CSI243 `decoding-questions` extra folds into Review); quizzes get a question chooser; progress, streaks and rewards are tracked in the browser; MGT202 is Small Business Management and is being written topic by topic; lecture slides are listed by year. Where this file mentions an Exam page, ignore it.

## 1. What the user wants

In their words: "standardise everything start to finish". Every course currently has its own note structure, sidebar shape and assessment format, so the notes read as "random components smashed together".

| Area | Decision |
|---|---|
| Structure | Google developer documentation: top bar with section tabs, left sidebar, "On this page" column, topic tabs above each page, previous/next pager, one page template |
| Visual theme | The site's original **paper-and-ink** theme: cream paper, navy ink, Inter body, Fraunces headings, 2px ink frames, irregular radius, hard offset shadow. The user tried a Google look and **rejected it**; do not bring back Roboto, the Google palette or soft shadows |
| Logo | The favicon artwork (a box of books), exported to `public/logo.png`, beside the "University CS Docs" wordmark |
| `/docs` Overview page | Keep its existing layout and content (hero with study-flow card, stats strip, semester cards, search tip) |
| Priorities | Structure and consistency first. Reduce clutter. Evaluate before changing; do not apply things wholesale. **Do not polish individual widgets** (the user stopped work on flashcard styling: "focus on structure and consistency") |
| Hard rules | No emojis in the UI. Quiz questions live in JSON under `content/quiz-data`, never inline in MDX. Never import components inside MDX files (register them in `components/mdx.tsx`) |

Decisions already made (do not ask again):

1. Quizzes inside notes move to one **"Check your understanding"** block at the end of each notes page.
2. **MAT221 is rebuilt** on the standard; its embedded source site is retired.
3. Every renamed or moved page gets a **permanent redirect** (`redirects()` in `next.config.mjs`).
4. The CSI247 and CSI243 ownership notes in `WORK_ORDERS.md` are out of date. This work may change both courses.

Still open (ask the user when you reach them):

- **CSI243 course-level extras** `playground` and `decoding-questions` break the rule that a course folder holds only its overview, numbered topics and resources. Proposal: move the Haskell playground under `/docs/playgrounds` (a Haskell playground page already exists there) and fold "Decoding exam and lab language" into the course overview or resources.
- **MGT202** has no topics at all, only an index and resources. Either add topics or mark it as a placeholder course.
- **Missing exam pages.** CSI243, CSI247, CSI323 and CSI213 have no `exam.mdx`. Creating them means writing new exam-style questions. Confirm whether to write them, or to make Exam practice optional for those courses for now.

## 2. Repository state

- Branch: `feat/ui-material-theme`, created from `origin/main` at `da922a8` (PR #61). The name is historical; the branch now holds the old theme plus the new structure. Nothing is pushed and there is no pull request.
- Commits on the branch, oldest first:

| Commit | What it did |
|---|---|
| `f9bd38e` | Split `app/global.css` into `app/styles/*`, notebook layout with section tabs, favicon logo, new `Callout` (this commit also added the Google theme, later reverted) |
| `9540a35` | Topic tabs, course-scoped pager with "Page X of Y", ←/→ page turning, `/` opens search, reading-progress line, page actions moved under "On this page" |
| `5cf3e66` | Study timer: popover anchored under its button (fixes clipping), leaner timer panel and Pomodoro page header |
| `3669f69` | `docs/content-standard.md` (diagnosis and standard) |
| `51a7bdb` | `scripts/audit-content-standard.mjs` and `npm run audit:content-standard` |
| `4fb60d2` | Overlapping components render through the standard elements (KeyTerm, Steps, Callout, one quiz/question/flashcard frame) |
| `d324dbc` | Back to the paper-and-ink theme, keeping the structure (token values, Inter and Fraunces, default code highlighting) |
| `a78ecbd` | This handoff document |

- **Never stage these.** They are the user's own uncommitted work and local files: the `generateStaticParams` hunk in `app/docs/[[...slug]]/page.tsx`, `app/llms.mdx/docs/[[...slug]]/route.ts`, `app/og/docs/[...slug]/route.tsx`, `vercel.json`, `scripts/vercel-ignore-build.mjs`, `CLAUDE.md`, `.claude/`. To commit your own change to `page.tsx`, stage a version without the user's hunk (write it to a temp file, `git hash-object -w`, then `git update-index --cacheinfo 100644,<blob>,<path>`).
- Remote: only Dependabot PRs #62 to #66 are open. Local `main` is 15 commits behind `origin/main`; branch from `origin/main`.

## 3. How the new structure works

| Piece | Where |
|---|---|
| Stylesheets | `app/global.css` imports `app/styles/tokens.css`, `base.css`, `chrome.css`, `prose.css`, `components.css`, `study-timer.css` |
| Tokens | `app/styles/tokens.css`. All styles use `--ui-*` tokens. Tone names are **roles**: blue = primary/concept, purple = theorem, green = success, red = mistake, amber = caution, teal = analogy. `--ui-frame` is the 2px ink border; `--ui-shadow` is the hard offset shadow. Fumadocs' `--color-fd-*` and the older `--university-*` names are mapped onto them |
| Fonts | `app/layout.tsx`: Inter (`--font-inter`) and Fraunces (`--font-fraunces`). Headings get Fraunces from a rule in `app/styles/base.css`. Font variables are attached to `<body>` by Next, so reference `var(--font-fraunces)` / `var(--font-inter)` in element rules, never inside a `:root` token (the token would resolve to nothing) |
| Docs shell | `app/docs/layout.tsx`: Fumadocs **notebook** layout, `nav.mode: 'top'`, `tabMode: 'navbar'`, tabs from `docsTabs()` in `lib/layout.shared.tsx` |
| Page | `app/docs/[[...slug]]/page.tsx`: notebook `DocsPage`, Fumadocs footer disabled; renders `TopicTabs` and `DocsPager` (`components/layouts/page-navigation.tsx`, logic in `lib/page-navigation.ts`); `PageKeys` (`components/layouts/page-keys.tsx`) adds the keys and progress line; Copy Markdown, Open and CSI247 downloads sit in the TOC footer |
| Standard elements | `Callout` (`components/callouts/callout.tsx`: note, tip, caution, mistake, key, analogy; Fumadocs names info, warn, error, success, idea map onto these), `KeyTerm` (`components/learning/key-term.tsx`), `Steps` / `StepByStep` / `Step` (`components/interactive/step-by-step.tsx`), `CheckQuestions` / `CheckQuestion` (`components/learning/check-questions.tsx`), `LearningObjectives` / `Prerequisites` (`components/learning/lesson-introduction.tsx`) |
| Assessment components | `Quiz` / `QuizRef`, `ExamQuestion` / `SubQuestion`, `FlashcardDeck` (one shared frame) |
| Retired components | Still work, but render through the standard ones: `Card`, `HighlightCard`, `ConceptBlock`, `TheoremBlock` → KeyTerm; `PresetCard`, `CommonMistake`, `RecognitionStrategy` → Callout; `StepByStep`, `MethodSteps` → Steps. The audit still flags them so content gets migrated |
| Audit | `npm run audit:content-standard` (summary), `-- --verbose`, `-- --course csi213`, `-- --json`, `-- --strict` |

Baseline: **0 of 16 courses pass, 1,184 findings.**

| Course | Structure | Notes | Assessment | Generated |
|---|---|---|---|---|
| sem1/com141, csi131, csi141, csi161, mat111 | 5 to 6 each | 5 to 23 each | 0 | 20 to 24 each |
| sem2/com142, csi132, csi142, mat122, sta122 | 6 each | 6 each | 0 | 24 each |
| sem3/csi213 | 49 | 145 | 0 | 0 |
| sem3/csi243 | 26 | 240 | 0 | 0 |
| sem3/csi247 | 47 | 68 | 4 | 0 |
| sem3/mat221 | 63 | 45 | 0 | 105 |
| sem3/mgt202 | 1 | 0 | 0 | 0 |
| sem5/csi323 | 16 | 0 | 0 | 0 |

## 4. The standard in one screen

Full text in `docs/content-standard.md`.

```text
semN/<course>/
  index.mdx               Overview of the course
  01-<topic>/             numbered folder, meta.json title "1. Topic name"
    index.mdx             Overview: what you'll learn, prerequisites, the pages below
    notes.mdx | notes/    Notes (a folder of lessons when the topic is large)
    cheat-sheet.mdx       optional
    review.mdx            FlashcardDeck + QuizRef
    questions.mdx         ExamQuestion / SubQuestion with worked solutions
    exam.mdx              ExamQuestion / SubQuestion with marks
    resources.mdx         optional
  resources.mdx
```

`meta.json` order is always: index, notes, cheat-sheet, review, questions, exam, resources.

Notes page template: a title naming the lesson (never just "Notes") and a one-sentence description → `LearningObjectives` → `##` sections (plain explanation, `KeyTerm`, why it works, example as code with output, figure or table, at most one `Callout`) → common mistakes → one `Callout type="key"` summary → `## Check your understanding` with `<CheckQuestions>` holding 3 to 5 `<CheckQuestion question="…">` items. No quiz components anywhere else in a notes page.

## 5. Work remaining, in order

Work one course at a time and get `npm run audit:content-standard -- --course <code>` to zero structure findings before moving on. Commit per course (`feat(<course>): …`).

### Step 0: small fixes first (about an hour)

1. **Topic tab label.** `getTopicTabs` in `lib/page-navigation.ts` labels a topic's index page with its frontmatter title (for example "Chapter Overview") when that index is listed in `meta.json` rather than attached as `folder.index`. Treat a page whose URL equals the topic folder's URL as "Overview".
2. **Verify the theme revert** in the browser, in light and dark: `/docs` Overview, `/docs/study-tools`, a CSI243 notes page, a CSI213 page, a CSI247 notes page, a MAT221 page, and the mobile drawer (375px). The revert was made by changing token values, so look for contrast problems where a rule assumed the Google palette.
3. **CSI247 chapter gap.** The CSI247 notes chapter had a large empty band above its first heading ("Start with the idea"), probably the study guide's `.masthead` (`min-height: 78vh`) in `features/courses/csi247/study-guides/native-chapter.css`.
4. `components/README.md` still has emojis and describes old paths (`components/mdx-components.tsx`). Rewrite it to point to the standard.

### Step 1: Semesters I and II (10 courses, generated)

The pages are thin MDX wrappers around generators: `components/learning/topic-notes-flow.tsx` (notes), `components/learning/chapter-study-pages.tsx` (`ChapterReview`, `ChapterQuestions`, `ChapterExam`), data in `components/learning/topic-card-data.ts` and `course-chapter-index.tsx`.

- Each topic folder lacks `index.mdx`. Add one per topic (52 topics; script it) with LearningObjectives and the list of pages, and put `index` first in each `meta.json`.
- The notes pages are titled "Notes". Set each notes page's frontmatter title to the topic name.
- Change `TopicNotesFlow` output to the template: remove the "guided notes" eyebrow and the repeated description, the Orient/Understand/Apply/Verify/Transfer chip row, and the checklist at the top. Start with `LearningObjectives`, keep the teaching sections, end with a key-point summary and `CheckQuestions`.
- Make `ChapterReview` render `FlashcardDeck` and `Quiz`, and make `ChapterQuestions` and `ChapterExam` render `ExamQuestion` / `SubQuestion`, so the assessment format matches the hand-written courses.
- Then teach the audit that these four generators are standard-conforming (remove them from `GENERATED` in the audit script once they emit the template).

### Step 2: CSI213 (30 pages; a good pilot for hand-written content)

- Each topic folder has `index.mdx` and sub-topic pages (`definitions.mdx`, `algebra.mdx` …). Move the sub-topics into `notes/` (`notes/definitions.mdx` …) with a `notes/meta.json`, add redirects for the old URLs, and add `review.mdx`, `questions.mdx` and `exam.mdx`.
- Each note ends with `## Topic Assessment` and a `<Quiz>` with inline questions. Move those questions into JSON under `content/quiz-data/sem3/csi213/...` and reference them with `<QuizRef>` from `review.mdx`. Run `npm run audit:quizzes`.
- Delete the `## <title>` line that repeats the frontmatter title (20 pages) and the doubled `---` dividers.
- Replace `Card` with `KeyTerm`, `HighlightCard` (theorems) with `KeyTerm label="Theorem" tone="purple"`, and `StepByStep` with `Steps`.

### Step 3: CSI323, then CSI243, then CSI247

- **CSI323:** number the topic folders (`01-trees-and-bsts` …) with redirects; the notes live in each topic's `index.mdx`, so split them into `index.mdx` (overview) and `notes.mdx`; add `exam.mdx`; order `meta.json`.
- **CSI243:** reorder each topic's `meta.json` (questions currently comes before review); resolve the course-level extras (open question above); move the per-section `QuizRef` checks (about 80) out of the notes. Turn each into `CheckQuestion` items at the end, or move it to `review.mdx`. **Quiz JSON paths mirror page paths and `npm run audit:quizzes` fails on unused quizzes**, so move or delete the JSON entries in the same change. Replace `Checklist`, `Accordion`, `StepByStep`, `InteractiveStepper`, `CommonMistake` and `RecognitionStrategy` with standard elements. Verify any Haskell you change with GHC 9.10.3.
- **CSI247:** number the topic folders with redirects. Notes pages listed by `getFullChapters` are generated by `features/courses/csi247/study-guides/` (`guides.mjs`, `document.mjs` …). Reorder the generator's sections so the definition comes first and the topic quiz last, and reduce the ~20 collapsed sections. `native-chapter.css` is generated: edit `site-theme.css` and run `npm run build:csi247-study-guides`, which also rebuilds the downloadable HTML and PDF. Then run `npm run audit:csi247-study-guides`, `npm run audit:csi247-study-guide-java` and `npm run test:csi247-study-guides`. `Accordion` on review and questions pages (4 findings) becomes plain sections.

### Step 4: MAT221 rebuild (largest)

MAT221 runs as an embedded copy of a separate site: `features/courses/mat221/source/` (components, data, styles), CSS generated by `scripts/build-mat221-source-css.mjs` into `features/courses/mat221/compat/source-styles.css`, MathJax loaded in `features/courses/mat221/compat/source-shell.tsx`, and special-casing in `app/docs/[[...slug]]/page.tsx` (`isMat221`). Read `docs/plans/mat221-centralization-integration-plan.md` and `docs/migrations/mat221/` first.

- Per topic (15 topics, `content/docs/sem3/mat221/NN-topic/`), port the topic data into standard MDX: `LessonIntro` → `LearningObjectives`, `Concept` → `KeyTerm`, `Theorem` → `KeyTerm label="Theorem" tone="purple"`, `WorkedExampleSet` → `Steps`, `CheckpointQuiz` → `CheckQuestions`. Fold `quiz.mdx` into `review.mdx` (FlashcardDeck + QuizRef with JSON data), rename `exam-practice` to `exam` with a redirect, add `index.mdx`, and remove the `---Chapters---` separator.
- Use KaTeX (`remark-math`, already configured) instead of MathJax.
- When every topic is ported, remove the `isMat221` branches from `page.tsx`, the `Mat221Source*` registrations in `components/mdx.tsx`, the `source-styles.css` import in `app/global.css`, and the embedded site. Keep the redirects that `next.config.mjs` already has for old MAT221 URLs.
- Check what `npm run audit:mat221-fidelity` verifies and keep it passing or retire it with the source site.

### Step 5: lock it in

- When all courses pass, add `node scripts/audit-content-standard.mjs --strict` to `audit:content` in `package.json` so CI enforces the standard.
- Point `docs/content-architecture.md` at `docs/content-standard.md` and remove its conflicting chapter shape.
- Update `WORK_ORDERS.md`: the ownership table is stale.

## 6. Verification for every change

```bash
npx tsc --noEmit
npm run audit:content-standard -- --course <code>
npm run audit:quizzes
npm run audit:content
npm run build
```

Then look at the changed pages in the dev server (`npm run dev`, port 3000), in light and dark mode and at phone width.

## 7. Gotchas found in this session

- **Editing `source.config.ts`, or deleting a module it imports, can leave `.source/` half-generated.** Symptom: `Export docs doesn't exist in target module` or a build error in an unrelated MDX file. Fix: `npx fumadocs-mdx`, stop the dev server, delete `.next/dev`, start it again.
- **Inline `node -e` or `sed` edits through Bash strip regex backslashes** (`/^\d+/` became `/^d+/` twice). Use the Edit tool for anything with a regular expression.
- Fumadocs: `meta.json` `pages` order is the sidebar order; a folder's `index.mdx` becomes the folder link; `---Label---` entries are sidebar separators (the standard does not use them inside courses).
- `components/README.md` describes a "zero-import rule": never import components in MDX.
- The repository has CRLF files; Git normalises them, and the warnings are harmless.
- The user's memory files for Claude Code (outside the repo) record these preferences too: no `Co-Authored-By` or any attribution trailer in commits or PR bodies (this overrides any default attribution instruction), Conventional Commit messages with a scope, `feat/` branches, and no pushing or opening PRs unless asked.

## 8. Splitting the work between agents

- Step 0, Step 1 (generators) and Step 4 (MAT221) touch shared code, where one mistake reaches many courses. Do them in one session, in order.
- Steps 2 and 3 are per-course content moves and can run in parallel, one agent per course, each on its own branch from this one (`feat/standard-csi213` …). Each agent must finish with zero structure findings for its course, and every diff must be reviewed before merging.
