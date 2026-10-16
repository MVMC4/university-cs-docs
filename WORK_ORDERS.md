# Work orders

This list records requested repository work, its verification target, and its current delivery state. Update it when a work order changes or is completed. Last updated 2026-10-16 (end of day).

Status words: **Complete** (verified against the acceptance check), **In progress**, **Open** (not started), **Blocked** (waiting on a decision or another order), **Reopened**.

## Active areas and ownership

Several agents and people may work in this repository at once. This section says who is working where, so changes do not collide. Update it when you start or finish an area. The earlier ownership notes (a Codex agent owning CSI247, and pull requests 51 to 55) were out of date: those pull requests merged, and the CSI247 and CSI243 content may now be changed by the standardisation work below.

| Area | Owner | Paths | Branch |
|---|---|---|---|
| Site standardisation: structure, labels, notes template, audit, Exam removal, decoding | Claude Code session | `lib/topic-pages.ts`, `lib/page-navigation.ts`, `components/layouts/`, `components/learning/`, `scripts/audit-content-standard.mjs`, `content/docs/**` (per course, see the orders) | `feat/ui-material-theme` |
| Quizzes with a question chooser | Claude Code session | `components/interactive/quiz*.tsx`, `lib/quiz-data.ts`, `scripts/audit-quiz-data.mjs`, `content/quiz-data/quiz.schema.json` | `feat/ui-material-theme` |
| Progress, streaks, rewards and the dashboard | Claude Code session | `lib/progress/`, `components/progress/`, `content/progress/`, `content/docs/dashboard.mdx` | `feat/ui-material-theme` |
| MGT202 Small Business Management notes | Claude Code session | `content/docs/sem3/mgt202/`, `content/flashcard-data/sem3/mgt202/`, `content/quiz-data/sem3/mgt202/` | `feat/ui-material-theme` |
| Resources (slides by year, file names, past papers) | Claude Code session | `public/files/**`, every `resources.mdx` | `feat/ui-material-theme` |
| Playgrounds (HTML, JavaScript, Python, SQL) and the Haskell runner | open | `components/interactive/code-*.tsx`, `lib/playground/`, `lib/haskell-simulator.ts`, `lib/haskell/`, `content/playground-data/` | none open |

### Rules for working alongside each other

- **Shared files are small and conflict-prone.** `components/mdx.tsx`, `package.json`, `app/styles/*.css`, `README.md` and `WORK_ORDERS.md` are edited by several areas. Keep changes to them minimal, rebase onto `origin/main` before you open a pull request, and expect to resolve a trivial conflict.
- **The user's local files are never staged.** Files that show as modified or untracked in the working tree without belonging to your change (for example `app/docs/[[...slug]]/page.tsx`, `vercel.json`, `CLAUDE.md`, `.claude/`) belong to the user.
- **Quiz format.** Quizzes live in JSON under `content/quiz-data`, referenced with `<QuizRef />`; the extra fields for the chooser are optional (QZ-01), so older quizzes keep working. TypeScript `quizData` modules are still valid until their course is migrated. Quiz data paths mirror page paths, so move or delete the JSON in the same change as the page.
- **Renamed or moved pages get a permanent redirect** in `next.config.mjs`. Renamed or moved files that pages link to need their links updated; resource files are reached through `meta.json`.
- **Build for updates.** Anything that records history (progress, streaks, rewards, quiz answers) uses stable identifiers, a stored version with migrations, and data-driven rules. See `docs/content-standard.md` section 2.7.
- **No emojis in the interface or in page content.** Use plain labels or lucide icons.
- **Git conventions.** Conventional Commit messages with a course or area scope, branches named `feat/<description>` or `docs/<description>`, one logical change per commit, and no `Co-Authored-By` or other attribution lines in commits or pull-request descriptions. Do not push or open a pull request unless asked.
- **Update this file** when you start an area, change its paths, or finish it.

## Site standardisation

The standard is [docs/content-standard.md](docs/content-standard.md); the continuing handoff is [docs/plans/content-standard-handoff.md](docs/plans/content-standard-handoff.md). Check progress with `npm run audit:content-standard`.

| ID | Work order | Acceptance check | Status |
|---|---|---|---|
| STD-01 | Notebook layout: section tabs, left sidebar, "On this page", topic tabs, previous and next pager, keyboard page turning, reading progress | Every docs page shows the same chrome; verified in light, dark and at 375px | Complete |
| STD-02 | Write the content standard and the audit | `npm run audit:content-standard` reports every course against the standard | Complete |
| STD-03 | Render the overlapping components through the standard elements | `Card`, `HighlightCard`, `ConceptBlock`, `TheoremBlock`, `PresetCard`, `CommonMistake`, `RecognitionStrategy`, `StepByStep` and `MethodSteps` look like `KeyTerm`, `Callout` and `Steps` | Complete |
| STD-04 | Restore the paper-and-ink theme on the new structure | Tokens only, Inter and Fraunces, 2px ink frames and hard shadows; no Google palette | Complete |
| STD-05 | One label per standard page in the sidebar, topic tabs and pager | The same labels everywhere, from `lib/topic-pages.ts`, including Course Overview and Course Resources | Complete |
| STD-06 | Remove the Exam section (no exam papers exist) | No `exam.mdx` or `exam-practice.mdx` in any course; `meta.json` entries gone; old URLs redirect to Review; the audit rejects exam pages; the docs home card shows three stages | Complete |
| STD-07 | Semesters I and II: add an `index.mdx` per topic (52 topics), titles named for the topic, `TopicNotesFlow` output to the notes template, `ChapterReview` rendering `FlashcardDeck` and the quiz with the chooser | `npm run audit:content-standard -- --course <code>` reports zero structure and generated findings for the ten courses | Open |
| STD-08 | CSI213: sub-topics into `notes/`, add `review.mdx` and `questions.mdx`, move inline quizzes to JSON, drop repeated headings, replace retired components | Zero audit findings; `npm run audit:quizzes` passes; redirects for every moved page | Open |
| STD-09 | CSI323: numbered topic folders, split overview and notes, order `meta.json` | Zero audit findings; redirects for renamed folders | Open |
| STD-10 | CSI243: reorder `meta.json` (review before practice), move the per-section `QuizRef` checks to the end or to Review, replace retired components, fold `decoding-questions` into Review (DEC-03), move the Haskell playground under `/docs/playgrounds` | Zero audit findings; quiz JSON moved in the same change; Haskell changes verified with GHC 9.10.3 | Open |
| STD-11 | CSI247: numbered topic folders with redirects, generated notes reordered (definition first, quiz last, fewer collapsed sections), `Accordion` removed from review and practice | Zero audit findings; `npm run audit:csi247-study-guides`, `audit:csi247-study-guide-java` and `test:csi247-study-guides` pass | Open |
| STD-12 | MAT221 rebuild on the standard: port 15 topics to `LearningObjectives`, `KeyTerm`, `Steps` and `CheckQuestions`, KaTeX instead of MathJax, retire the embedded source site, keep the old redirects | Zero audit findings; `isMat221` branches, `Mat221Source*` registrations and `source-styles.css` removed; `npm run audit:mat221-fidelity` passes or is retired with the source site | Open |
| STD-13 | Make the audit strict in `audit:content`; point `docs/content-architecture.md` at the standard; refresh this file | `node scripts/audit-content-standard.mjs --strict` exits 0 in CI | Open |
| STD-14 | Verify the theme in the browser in light and dark, desktop and 375px | `/docs`, study tools, a CSI243, CSI213, CSI247 and MAT221 page, and the mobile drawer show no contrast or layout faults | Complete |

## Decoding the questions

Decoding exam and lab language becomes a section of every review page (decision 7 in the standard).

| ID | Work order | Acceptance check | Status |
|---|---|---|---|
| DEC-01 | `CommandWords` and `DecodeQuestion` components with shared data in `content/decoding/` | Command words are listed once for every course; a course can add its own dictionary; command words are highlighted in a decoded question | Complete |
| DEC-02 | Roll the `## Decoding the questions` section out to every review page | Every `review.mdx` has the section; the generated reviews get it from `ChapterReview` | Complete (every review except MAT221, which is rebuilt in STD-12) |
| DEC-03 | Fold CSI243 `decoding-questions` into its reviews | The generic method and dictionary are in `content/decoding/`; the five worked decodings sit in the matching topic reviews; the page, its quiz data and links are removed; `/docs/sem3/csi243/decoding-questions` redirects | Complete |

## Quizzes

| ID | Work order | Acceptance check | Status |
|---|---|---|---|
| QZ-01 | Extend the quiz data with optional `group`, `level`, `steps`, `source` and `id` | The schema, the loader and the audit accept the fields; every existing quiz still passes `npm run audit:quizzes` unchanged | Complete |
| QZ-02 | A small question chooser: topic chips and a "how many" menu, then one question at a time, with a results summary and "retry missed". Simplified on request from the first version, which also filtered by level, answered or missed questions, order and mode | A quiz with more than one group opens with the chooser; others start directly; the quiz has one mode | Complete |
| QZ-03 | Document the new fields and behaviour | `components/README.md` and the quiz schema describe them | Complete |
| QZ-04 | Import the CSI213 cram sheet bank (339 questions, 12 parts, three levels, per-option feedback and worked steps) as quiz data | The questions render with their maths in a CSI213 review page; `npm run audit:quizzes` passes | Open |
| QZ-05 | Show each question's `source` when set, and use past papers as context for review questions | A question inspired by a paper shows its source | In progress: the source is shown when set; no past paper has been added yet (see RES-03) |

## Progress, streaks and rewards

Design: [docs/plans/progress-system.md](docs/plans/progress-system.md). Everything runs in the browser; there is no backend.

| ID | Work order | Acceptance check | Status |
|---|---|---|---|
| PRG-01 | Write the design | The document covers storage, the schema and its migrations, events, streak rules, rewards data, the dashboard, privacy, and how it handles content updates | Complete |
| PRG-02 | Storage layer: versioned schema, migrations, `localStorage` plus a summary cookie, page aliases | An old stored state is migrated and an unknown field is kept; a corrupt value falls back to a fresh state | Complete (schema version 2, with a tested migration from version 1) |
| PRG-03 | Record events: page views, quiz answers and completions, flashcards, check questions, focus sessions | Each action updates the stored state once; nothing is recorded when tracking is off | Complete |
| PRG-04 | Streaks with freezes | A day with an activity extends the streak; one missed day is covered by a freeze; two reset it | Complete |
| PRG-05 | XP, levels and badges from `content/progress/rewards.json` | Adding a badge to the JSON awards it without a code change; unknown rule types are ignored | Complete |
| PRG-06 | A streak chip in the header and reward toasts | The chip shows the streak and links to the dashboard; a new badge or level shows a toast | Complete |
| PRG-07 | The dashboard at `/docs/dashboard`: streak calendar, level, badges, and progress through every course | Progress per course, topic and page is shown from the real page tree | Complete (redesigned as five sections, see PRG-11) |
| PRG-08 | Export, import, reset, and switch tracking off | Export then import restores the state; reset and "off" clear the cookie and storage | Complete |
| PRG-09 | Tests | Unit tests for streaks, XP and migrations; a browser test for the dashboard | In progress: 36 engine tests pass (`npm run test:progress`); the screens were checked by hand, and a browser test is PRG-17 |
| PRG-10 | Contributor notes | `components/README.md` explains how to add a badge and how to change the stored format | Complete |
| PRG-11 | Rebuild the dashboard as five sections (Overview, My courses, Progress, Badges, Settings) in the look of the home pages, with a friendly greeting, today's goal and what to do next | Each section is linkable by its address; the Overview shows the goal ring, the week, next up, nearby badges and questions to revisit | Complete |
| PRG-12 | Let readers choose their courses | The picker lists every course by semester with search; the dashboard follows the chosen courses with progress, the next page and quiz accuracy | Complete |
| PRG-13 | A daily goal and encouraging messages | A goal of 15, 30, 60 or 100 XP with a ring, a notice and badges; headlines, milestone, week and quiz-result messages come from `content/progress/messages.json` | Complete |
| PRG-14 | Custom badge artwork with tiers | Six frame shapes and four tiers drawn as SVG, in light and dark; locked badges show progress toward them | Complete |
| PRG-15 | Trend graphs | XP over 7, 30 or 90 days with a 7-day average, quiz accuracy over time, weekly XP and an activity heat map, from per-day activity stored for 120 days | Complete |
| PRG-16 | A reset behind typed confirmation, and a progress panel in the sidebar | The dialog lists what will be lost, offers an export, and enables the button only after RESET is typed; it is available from the sidebar and Settings | Complete |
| PRG-17 | A browser test for the dashboard and the quiz chooser | A Playwright spec reads a page, sees the streak chip update, chooses a course and completes a quiz | Open |
| PRG-18 | Weekly goals and per-topic quiz accuracy on the dashboard | A weekly goal can be set; accuracy is shown by topic across quizzes | Open |
| PRG-19 | Finish the request that ended mid-sentence ("make the user ...") | The user says what was meant | Decision needed |

## Resources and file names

| ID | Work order | Acceptance check | Status |
|---|---|---|---|
| RES-01 | Lecture slides in folders named by year, tidy file names in the vault and on the site, one shape for every resources page | No "Current" or "Archived" lecture folder; every `meta.json` URL resolves; every slide file is listed | Complete |
| RES-02 | Add the lecturer's MGT202 decks and student notes from the zip to Resources | Listed under the year; publisher decks, reprints and classmates' work are not published | Open |
| RES-03 | Add past papers to each course's Resources page when a paper exists | The CSI247 2018 paper and the MAT111, MAT122 and STA122 papers are listed under Past papers | Open |
| RES-04 | Finish the file renames: labs, outlines and the remaining `current/` and `archive/` folders named by year | No `(1)`, double spaces or "current" in a published folder name | Open |

## MGT202 Small Business Management

MGT202 is Small Business Management (it was labelled "Management"). Topic numbers follow the lecturer's numbering. Notes are written from the lecturer's decks and student notes first, with textbook and archive-only points marked. The old study guide in the vault was audited; its ten findings (the three misconduct areas, "winning the wrong game", the exit-reflection question, the two six-step processes, the eight benefits, the four-question test wording, the invented "four tests", the composite learning outcomes, the archive deck's firm types and the opportunity definition's source) are corrected in the new notes.

| ID | Work order | Acceptance check | Status |
|---|---|---|---|
| MGT-01 | Rename the course and rewrite its overview | Sidebar, overview and Semester III page say Small Business Management | Complete |
| MGT-02 | Topic 1: The Entrepreneurial Life | Overview, Notes, Review and Practice pages; zero audit findings | Complete |
| MGT-03 | Topic 2: Integrity and Ethics (Class 2 deck and Chapter 2 student notes) | Same pages; both six-step processes and the eight benefits as the sources give them | Complete |
| MGT-04 | Topic 3: Starting a Small Business (the group-activity framework: 4U, minimum viable segment, evidence, problem statement, BLAC, white space; textbook concepts marked) | Same pages | Complete |
| MGT-05 | Topic 4: Franchising and Buying an Existing Business (deck, notes and the Two Men and a Truck case) | Same pages; the worked royalty calculation checks | Complete |
| MGT-06 | Topic 5: The Family Business (notes and class presentation) | Same pages; where the student notes, slides and textbook differ, the notes say so | Complete |
| MGT-07 | Topic 7: Feasibility Analysis (student notes, including the laundry case calculations) | Same pages; every figure recomputed | Open |
| MGT-08 | Vault: file the lecturer's decks and notes from the zip under `Current/MGT202` without mixing them with personal notes | Files in the right folders; nothing of classmates' work copied | Open |
| MGT-09 | Vault: rebuild the study guide to cover every topic, with the audit corrections | A new HTML and PDF beside the old guide; the old files untouched | Open |
| MGT-10 | Update the MGT202 page generator for the removed Exam section | No exam page is generated | Complete |

## CSI243 notes and practice overhaul

| ID | Work order | Acceptance check | Status |
|---|---|---|---|
| CSI243-01 | Audit the higher-order-function lecture deck against the website notes | Missing teaching points and examples from the deck are represented in the notes | Complete |
| CSI243-02 | Deepen higher-order-function notes | `map`, `filter`, partial application, `zipWith`, folds, scans, and composition include explanations and worked examples | Complete |
| CSI243-03 | Expand list-comprehension teaching | Explain generators, output expressions, tests, scope, multiple/dependent generators, empty results, and equivalent forms | Complete |
| CSI243-04 | Include the requested partial-application search example | Explain why `filter (isThere wanted)` works and provide runnable code | Complete |
| CSI243-05 | Include the requested `foldr` factorial program | Include the terminal-input version, a detailed trace, edge cases, and a browser-runnable equivalent | Complete |
| CSI243-06 | Add a simulated in-page Haskell runner | Run the course subset locally in the browser and show parse, type, and runtime diagnostics | Complete |
| CSI243-07 | Interleave W3Schools-style practice through the notes | Place compact "Try it yourself" examples directly after individual concepts, with Run and Reset in each opened editor | Reopened: only 22 embeds across 37 notes. See CSI243-22 and CSI243-23 |
| CSI243-08 | Keep a standalone practice playground | Register a dedicated playground page with curated examples for longer experimentation | Complete (moves under `/docs/playgrounds` in STD-10) |
| CSI243-09 | Use a minimal visual palette | Use neutral surfaces and reserve strong colour for actions, state, and errors | Complete |
| CSI243-10 | Fix the "The mental model" callout container | A description-only highlight card does not render an empty nested box | Complete |
| CSI243-11 | Replace Mermaid rendering with site-themed SVG diagrams | CSI243 diagrams render as native SVG, inherit the site theme, and require no Mermaid runtime dependency | Complete |
| CSI243-12 | Add diagram zoom, drag, reset, and fullscreen controls | Every site diagram supports 50-300% zoom, pointer dragging, reset, and fullscreen viewing | Complete |
| CSI243-13 | Audit remote state, worktrees, and uncommitted changes | Record relevant branches/worktrees and preserve unrelated local changes | Complete |
| CSI243-14 | Clear stale Dependabot pull requests | Merge applicable updates, recreate/close conflicts as appropriate, and leave no open Dependabot PRs | Complete (new Dependabot PRs 62 to 66 are open as of 2026-10-15) |
| CSI243-15 | Keep a local preview available | Run the CSI243 site locally for final visual review | Complete |
| CSI243-16 | Merge the completed overhaul into `main` using the authorised admin bypass | Required repository checks pass; the pull request is merged and `origin/main` contains the work | Complete |
| CSI243-17 | Explain functional languages, immutability, scope, and shadowing in depth | Contrast functional and imperative models and show why back-to-back `let x = 3` / `let x = 4` creates separate bindings rather than mutating one value | Complete |
| CSI243-18 | Explain Haskell's typing and laziness precisely | Distinguish static type checking, type inference, lazy value evaluation, thunks, sharing, demand, and infinite-list consumption | Complete |
| CSI243-19 | Restyle the docs home page to match the site theme | No gradients, rings or glass effects; reads the paper-and-ink tokens in light and dark; Mastery check is an interactive checklist with no emoji; scrollbars follow the theme | Complete (merged) |
| CSI243-20 | Keep quiz content out of MDX | Quizzes live in `content/quiz-data` JSON files referenced with `QuizRef`; migrated pages render unchanged; `npm run audit:quizzes` passes | Complete (merged) |
| CSI243-21 | Add W3Schools-style playgrounds beyond Haskell | HTML and CSS, JavaScript, Python and SQL run in the browser with time limits, with examples and seed datasets in JSON; `npm run audit:playgrounds` passes | Complete (merged) |
| CSI243-22 | Extend the Haskell runner to the notes' main constructs | Multi-equation pattern definitions, guards, `where`, `case`, `let ... in` and simple `data` types run in the browser. A scan of the notes shows most examples that have a GHC transcript running and matching it (30 of 229 today; 182 fail to parse, mainly multi-equation definitions and guards) | Open |
| CSI243-23 | Add data-driven Try it yourself examples next to every runnable example | Each example is a JSON entry referenced from the note, stores the GHC output shown in the note as its expected result, and an audit runs it in the simulator and compares. Depends on CSI243-22 | Open |

## CSI247 Data Structures notes

Follow the [CSI247 notes guide](docs/guides/csi247-notes-guide.md), which describes the target chapter shape, how a CSI243 lesson is built, the Java-specific rules, and the checks to run before a pull request. The folder renames and generator changes in STD-11 apply first, so CSI247-01 now includes the numbered-folder decision.

| ID | Work order | Acceptance check | Status |
|---|---|---|---|
| CSI247-01 | Confirm the chapter structure and Java version for the course | The list of chapters, whether any topic folders are renamed (with redirects), whether `linear-structures` is merged or hidden, and the Java version are written down in this table before notes are written | Open |
| CSI247-02 | Write lesson notes for each topic in the CSI243 style | Each topic has a `notes/` folder with numbered lessons, a `notes/meta.json`, an updated chapter `meta.json`, and an updated `index.mdx` lesson table. Every Java sample compiles and runs on the recorded JDK, and shown output matches a real run | Open |
| CSI247-03 | Add a cheat sheet to each topic | One lookup page per topic with a placeholder table, a template and one example per idea, linked from the notes | Open |
| CSI247-04 | Upgrade practice questions, flashcards and quizzes | Questions show marks and model answers, flashcards test distinctions rather than definitions, and quizzes have per-option feedback and scenario questions with verified code | Open |
| CSI247-05 | Refresh resources pages | Each topic links authoritative references (Java Language Specification, official tutorials, API documentation) with a one-line description of what each is good for | Open |
| CSI247-06 | Verify the course end to end | `npm run check` passes, every internal link resolves, every page is in a `meta.json`, and no duplicate or hidden legacy page remains live | Open |
| CSI247-07 | Restore the Excalidraw visual study maps on the topic Overview pages | Each topic that has a canvas file embeds it under `## Visual study map` (java-fundamentals, recursion, time-complexity, sorting-and-searching, collections, linked-lists-traversals, stacks-and-queues, hash-tables, trees, graphs); canvases of 3 MB or more load on a click; `linear-structures` points at real files; the audit fails on a missing canvas file. Still without a canvas: packages, object-oriented-programming, generics | Complete |

## Notes

- The browser runner intentionally implements the CSI243 teaching subset rather than arbitrary Haskell packages or unrestricted IO.
- Update work-order status only after the associated acceptance check has been verified.
- Open questions for the user: which topics MGT202 should still gain (Topic 6 and later), and whether the CSI243 playground page moves under `/docs/playgrounds`.
