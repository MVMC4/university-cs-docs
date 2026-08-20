# MAT221 Centralization and University Site Transition Plan

**Status:** Fidelity-pass implementation in progress on `feat/mat221-fidelity-pass`; the earlier progressive rewrite/content-gate strategy is superseded by the amendment below
**Prepared:** 20 August 2026
**Last audited:** 20 August 2026
**Target repository:** `C:\Users\Nido\Desktop\Projects\Active\university-cs-docs`
**Migration source:** `C:\Users\Nido\Desktop\Projects\Active\mat221-docs`
**Original implementation branch:** `feat/mat221-centralization`
**Active fidelity branch:** `feat/mat221-fidelity-pass`
**Target baseline:** `d6267f8c155c7f1ffefcb64699e5b51ca225aace`
**MAT221 source baseline:** `6f4dd6b48dafb2b0378dd265c2dac8bba799f815`

---

## 0. Fidelity-first amendment (supersedes conflicting sections)

The initial plan solved for architectural normalization before it proved source parity. That was the wrong priority for this migration. It converted the source into host-native abstractions, published only a rewritten Substitution pilot, and treated most source route material as blocked. The result was cleaner in isolation but failed the primary requirement: students should receive the existing MAT221 notes, components, routes, and visual teaching system without content loss.

This amendment changes the migration contract:

1. The source repository at commit `6f4dd6b48dafb2b0378dd265c2dac8bba799f815` is the fidelity baseline.
2. All 15 source MDX lessons are copied byte-for-byte to their numbered destination chapter `notes.mdx` files.
3. All 16 source components, 19 source library files, seven CSS partials, 15 MDX lessons, and the source App Router files are retained unchanged under `features/courses/mat221/source/` as a reviewable frozen snapshot.
4. Active MAT221 pages use the copied source primitives and interactive components. Thin compatibility wrappers may change only route paths, host shell placement, asset paths, theme ownership, and timer ownership.
5. The source chapter route contract is retained: Notes, Questions, Quiz, Review, and Exam Practice for every chapter.
6. MAT221 uses the university/Fumadocs sidebar. The standalone custom sidebar remains reference-only and is not mounted.
7. Source CSS is composed in source order and scoped to `.mat221-source`; its light palette remains source-faithful. A dark-mode adapter maps the same roles to the host dark palette.
8. Source MathJax behavior is retained only inside the MAT221 course shell because prop-string mathematics in the copied components is not fully covered by the host static KaTeX pipeline. The host KaTeX pipeline remains active for ordinary MDX math.
9. The source Pomodoro and Goals UI remain in the frozen snapshot for fidelity evidence but are not mounted. The course planner uses the university singleton timer and contains no goal UI.
10. Source-root asset URLs are handled by host rewrites so copied video and diagram components do not need editing or duplicated public files.
11. The content-quality concerns identified in the first audit become a later editorial pass. They do not authorize replacing, shortening, or withholding the source during migration.
12. Tests and fixes run only after the complete copy and integration stages, per the requested execution order.

### Critique of the original approach

| Original choice | Why it was wrong for this request | Corrected approach |
|---|---|---|
| Rewrite source lessons into shared host primitives first | It changed wording, structure, example coverage, and component behavior before parity existed | Copy all source notes first; refactor only after parity is signed off |
| Publish one pilot and gate the other 14 chapters | It made a complete source course appear mostly missing in the host | Publish the complete 15-chapter route set, then audit content quality separately |
| Reject the source sidebar outright | It removed an important part of the source navigation experience | Mount a course-scoped copy with host-path translation |
| Force a single KaTeX-only pipeline immediately | It risked losing math rendered from component prop strings | Keep course-scoped MathJax compatibility while retaining host KaTeX for MDX |
| Rebuild components instead of preserving them | It made visual and behavioral parity difficult to prove | Freeze all components unchanged and use direct imports wherever host boundaries allow |
| Treat generated source material as a migration blocker | It conflated migration fidelity with later academic editing | Copy faithfully, label provenance, and schedule editorial review after parity |

### Corrected execution stages

1. Freeze the exact source snapshot and record its commit.
2. Add host adapters for numbered routes, assets, MDX registration, course shell, and source sidebar.
3. Copy all 15 MDX notes byte-for-byte and generate the five source route surfaces per topic.
4. Compose the seven source CSS files under the course scope and add a dark-theme adapter.
5. Mount the complete overview, formula sheet, planner, resources, notes, questions, quiz, review, and exam-practice surfaces.
6. Substitute only the shared Pomodoro and omit Goals from the mounted planner.
7. At the end, run hash parity, route/content inventory, type checking, production build, and rendered desktop/mobile light/dark checks; apply fixes only from those results.

The remainder of this document is retained as historical design rationale. Where it conflicts with this amendment—especially the progressive publication gate, KaTeX-only rule, five-page-without-quiz contract, and no-copy infrastructure rule—this amendment controls.

---

## 1. Purpose

This document defines the complete transition from the standalone MAT221 application into `university-cs-docs`. It covers the verified current state, final architecture, content ownership, exact route transition, global light-theme change, dark-theme preservation, navbar treatment, global Pomodoro integration, goal removal, mathematics rendering, asset handling, migration order, content ledger, validation gates, release strategy, and rollback.

The objective is centralization, not embedding one application inside another. `university-cs-docs` will become the only active runtime and deployment. MAT221 will contribute its authored calculus material, learning interactions, course assets, and light visual language without bringing across its old application shell, dependency graph, duplicate renderer, or generated filler.

---

## 2. Locked product decisions

The following decisions are treated as approved requirements.

1. `university-cs-docs` is the canonical application, navigation system, search index, content engine, deployment target, and dark-theme owner.
2. The existing university navbar and Fumadocs sidebar mechanics remain. Their light-mode appearance changes; their structure and core behavior do not.
3. The MAT221 cream, navy, lavender, pink, typography, borders, and card treatment become the light design language for the whole university site.
4. The current university dark appearance remains authoritative.
5. MAT221 uses the university content tree. It will not retain a second navbar, custom standalone sidebar, root layout, source loader, or deployment.
6. MAT221-specific application code receives a dedicated feature boundary.
7. Reusable learning components remain in or move into the existing shared component system.
8. Narrative teaching content remains in Fumadocs MDX and is not duplicated inside the MAT221 feature module.
9. The university Pomodoro implementation is the behavioral base for the global timer.
10. Goals are removed from the interface and timer behavior. Existing stored goal data is left untouched.
11. There is one timer provider, one timer state model, one mathematics pipeline, and one deployment.
12. Static mathematics uses the host KaTeX pipeline. The standalone global MathJax loader is not migrated.
13. MAT221 review pages follow the host convention: flashcards first, explained quiz second.
14. Student-facing worked examples, questions, solutions, distractors, and assessment explanations must be explicitly authored and reviewed. Synthetic padding is prohibited.
15. The standalone MAT221 repository remains available during comparison and cutover, then becomes a read-only archive after parity is confirmed.

---

## 3. Verified baseline

### 3.1 Repository state

The following claims were verified directly on 20 August 2026.

| Claim | Verdict | Evidence |
|---|---|---|
| CSI243 redemption is merged into local university `main` | Confirmed | Feature commit `9706f5d`; merge commit `d6267f8` |
| University working tree is clean | Superseded by implementation audit | The supplied `docs/` plan was untracked when implementation began; no tracked host files were modified |
| University local `main` is two commits ahead of `origin/main` | Confirmed | `main...origin/main [ahead 2]` |
| The two CSI243 commits have not been pushed | Supported locally | Local branch is ahead by two; remote state was not mutated |
| MAT221 source working tree is clean | Confirmed | `main...origin/main` with no file changes |
| MAT221 integration code has not been written | Confirmed at baseline | University MAT221 remains the short placeholder section |
| Both projects currently type-check and build | Confirmed after regeneration | MAT221 passed all checks; the host initially encountered a zero-byte generated `.source/server.ts`, then passed `npm run types:check` and `npm run build` after rerunning Fumadocs generation |

Current validation results:

- MAT221: `npm run typecheck`, `npm run audit:lessons`, and `npm run build` pass.
- University: the equivalent `npm run types:check` followed by `npm run build` passes. A one-shot `npm run check` first failed because `.source/server.ts` was temporarily generated as a zero-byte file; the regeneration rerun passed and produced a successful production build.
- MAT221 statically generated 84 pages at the verified baseline.
- University statically generated its current documentation tree successfully at the verified baseline.

Passing the current MAT221 lesson audit does **not** mean all student-facing material is acceptable for centralization. The audit verifies shared structure and example numbering; it does not reject the generic repair content generated by `lib/content-model.ts`.

### 3.1.1 Implementation audit adjustments

The implementation-start audit amended Phase 0 as follows:

- The feature branch was created from `d6267f8c155c7f1ffefcb64699e5b51ca225aace` as planned.
- The host repository began with one untracked user-supplied tree, `docs/`; this is the plan and its Phase 0 records, not pre-existing integration code. Phase 0 therefore requires **no unexplained tracked changes**, rather than a literally empty working tree.
- The active shell uses Node `v24.18.0` and npm `11.16.0`, while the host declares Node `>=22 <23` and npm `>=10`. Validation is recorded as an environment deviation; CI or a Node 22 run remains the authoritative engine-compatibility gate.
- The host Fumadocs generator can transiently leave `.source/server.ts` empty. If the first type check reports that the generated file is not a module, rerun `npm run types:check` before classifying the baseline as broken, and retain both results in `validation-results.md`.
- A fresh production server successfully switched between light and dark themes. An already-running development server did not switch themes reliably and was not used for canonical visual captures.
- The Phase 0 visual baseline is representative rather than exhaustive: home, docs landing, MAT221, CSI243, CSI247, and study tools at 1440×1000 and 390×844 in both themes. The full matrix in section 13.1 remains a later gate after migrated pages exist.
- The host currently owns 26 MAT221 lecture PDFs plus one resource metadata file: 27 files and 73,456,201 bytes under `public/files/sem3/mat221`.

### 3.1.2 Post-baseline architecture audit adjustments

The Phase 0 records were reviewed before runtime work began. That review approved the architecture boundary and added the following implementation constraints:

- The source curriculum is Calculus II in scope. The active destination title is therefore `MAT221: Calculus II`; the old host Limits and Derivatives pages remain archived rather than being presented as this course’s opening chapters.
- The source contains usable authored narrative and explicit worked examples for all 15 topics, but much of its questions, review, and exam material is generated by the repair-content path. Generated output is not evidence that a destination chapter is complete.
- Phase 6 is a **progressive course shell**, not permission to publish 70 incomplete pages. The typed manifest, course index, planner, and route contracts represent the entire sequence; active navigation includes a chapter only after its overview, notes, questions, review, and exam-practice pages are explicitly authored and reviewed.
- Integration by Substitution is the first active five-page chapter. Its eight examples, flashcards, quiz items, written questions, and exam problems are explicit destination records rather than padded generator output.
- The global light theme, timer, and learning primitives are implemented before the course expands because they are shared contracts, not chapter-local conveniences.
- All implementation work is completed before the final test-and-fix pass. This follows the requested execution order and does not waive any Phase 10 gate.

### 3.2 Technology comparison

| Area | University host | MAT221 source | Transition consequence |
|---|---|---|---|
| Next.js | 16.2.6 | 16.3.0 | Host version remains authoritative |
| React | 19.2.6 | 19.2.x | Adapt code to host lockfile |
| Fumadocs Core | 16.9.3 | 12.5.6 | Do not copy source loader or configuration |
| Fumadocs MDX | 15.0.10 | 8.2.34 | Convert content to host conventions |
| Fumadocs UI | 16.9.3 | Not used | Use host navbar, sidebar, pages, and MDX registry |
| TypeScript | 6.0.3 | 5.5.4 | Host compiler and types are authoritative |
| Styling | Tailwind 4, Fumadocs tokens, large global stylesheet | Seven plain CSS partials | Translate visual rules into layered host tokens and modules |
| Navigation | Fumadocs tree | Custom `Sidebar` and App Router pages | Replace source navigation with `meta.json` hierarchy |
| Static math | Remark math and KaTeX | Remark math and KaTeX | Keep the host pipeline |
| Client math | Explicit KaTeX in interactive components | Global MathJax page re-typesetting | Do not migrate global MathJax |
| Study timer | Timer coupled to goals | Separate timer and goals | Refactor university timer into one global provider |

The following MAT221 files must not be copied into the host as application infrastructure:

- `package.json` and lockfile;
- root `app/layout.tsx`;
- root `app/globals.css` as a wholesale import;
- source configuration and loader;
- custom `Sidebar` as active site navigation;
- MathJax scripts and page-wide re-typesetter;
- standalone manifest, robots, sitemap, metadata, and analytics shell.

### 3.3 Verified MAT221 source inventory

| Item | Verified count or state |
|---|---:|
| Topic slugs in dependency order | 15 |
| Narrative lesson MDX files | 15 |
| Topic note routes | 15 dynamic outputs |
| Written-question routes | 15 dynamic outputs |
| Quiz routes | 15 dynamic outputs |
| Review routes | 15 dynamic outputs |
| Exam-practice routes | 15 dynamic outputs |
| Standalone tools | Formula sheet, planner, resources |
| CSS partials | 7 |
| Public files | 25 |
| Total public-file size | 39,335,696 bytes, approximately 37.5 MiB/39.3 MB |
| MP4 videos | 3 |
| VTT caption files | 3 |
| Video poster PNGs | 3 |
| Course diagram SVGs | 14 |
| Site icon SVG | 1 |
| Open Graph PNG | 1 |

The earlier claim of “15 SVG diagrams” is corrected here. There are 15 SVG files in total, but one is `icon.svg`; the course diagram directory contains 14 diagrams.

### 3.4 Verified host MAT221 state

The current university MAT221 section contains:

- `index.mdx`;
- `limits.mdx`;
- `derivatives.mdx`;
- `resources.mdx`;
- `meta.json`;
- existing lecture PDFs under `public/files/sem3/mat221/lectures/`.

The lecture collection contains 26 PDFs (73,456,161 bytes) plus `public/files/sem3/mat221/meta.json` (40 bytes).

Only `index` and `resources` are currently listed in its `meta.json`. The short Limits and Derivatives pages are placeholders and are not part of the final 15-topic integration sequence. They must be archived before replacement.

### 3.5 Verified generated-content risk

`mat221-docs/lib/content-model.ts` is not a neutral data adapter. It creates student-facing material by:

- collecting seeds from blocks, flashcards, and quiz questions;
- padding seeds in a `while (seeds.length < 10)` loop;
- assigning generic classifications by index;
- manufacturing ten-step worked solutions around the seed;
- converting quiz and worked-example titles into written prompts;
- padding practice in a `while (items.length < 18)` loop;
- reusing generic constraints, diagnostics, checks, and feedback.

`lib/index.ts` also generates additional recall cards from Cornell cues. Those cards can be useful drafting material, but they are generated and must be reviewed before migration.

Therefore:

> `getRepairTopic()` output is audit input and drafting evidence, not approved canonical course content.

No automatically padded example or practice item may be copied into the centralized student-facing site without being rewritten as an explicit authored record and reviewed for correctness, distinct purpose, complete mathematics, and useful feedback.

### 3.6 Verified host review convention

CSI243 and CSI247 both use a single `review.mdx` page containing:

1. flashcards; then
2. one or more explained quizzes or assessments.

Their chapter metadata does not create a separate quiz route. MAT221 will follow this host convention. Written questions remain separate. Exam practice remains separate when the chapter has material substantial enough to justify it.

---

## 4. Target system architecture

### 4.1 Runtime ownership

After centralization:

```text
university-cs-docs
├── owns Next.js runtime
├── owns Fumadocs source and routing
├── owns navbar and sidebar behavior
├── owns global theme and fonts
├── owns shared MDX registry
├── owns search, sitemap, metadata, and deployment
├── owns global Pomodoro state
└── hosts MAT221 as a course module and content tree
```

`mat221-docs` becomes:

```text
mat221-docs
├── migration evidence
├── visual comparison reference
├── source of authored calculus material
├── source of course assets
└── read-only archive after cutover
```

### 4.2 Canonical content tree

```text
content/docs/sem3/mat221/
├── index.mdx
├── meta.json
├── 01-foundations/
│   ├── index.mdx
│   ├── notes.mdx
│   ├── questions.mdx
│   ├── review.mdx
│   ├── exam-practice.mdx
│   └── meta.json
├── 02-substitution/
├── 03-partial-fractions/
├── 04-integration-by-parts/
├── 05-reduction-formulas/
├── 06-trigonometric-integrals/
├── 07-trigonometric-substitution/
├── 08-weierstrass-substitution/
├── 09-improper-integrals/
├── 10-numerical-integration/
├── 11-applications/
├── 12-lhopital/
├── 13-sequences-and-series/
├── 14-power-series/
├── 15-taylor-series/
├── formula-sheet.mdx
├── planner.mdx
└── resources.mdx
```

Each topic uses the same route contract:

| Page | Responsibility |
|---|---|
| `index.mdx` | Chapter orientation, outcomes, prerequisites, study order, and page links |
| `notes.mdx` | Complete teaching narrative and eight integrated worked examples |
| `questions.mdx` | Explicit written problem bank with marks and worked solutions |
| `review.mdx` | Academic flashcards followed by explained quiz questions |
| `exam-practice.mdx` | Timed, marking-oriented, exam-shaped problems |
| `meta.json` | Stable sidebar order and labels |

Do not create a separate `quiz.mdx` route during initial migration. A future standalone assessment route requires enough unique material to justify a distinct student workflow.

### 4.3 MAT221 feature module

Only course-specific executable code and structured data belong in the feature module:

```text
features/courses/mat221/
├── components/
│   ├── calculus-diagram/
│   ├── formula-sheet/
│   ├── method-recognition/
│   └── course-planner/
├── data/
│   ├── manifests/
│   ├── worked-examples/
│   ├── flashcards/
│   ├── quizzes/
│   ├── questions/
│   └── exam-practice/
├── lib/
│   ├── asset-paths.ts
│   ├── content-references.ts
│   ├── schemas.ts
│   └── validation.ts
├── styles/
│   ├── calculus.css
│   └── print.css
├── components.ts
├── manifest.ts
└── index.ts
```

Boundary rules:

- Narrative lessons remain in `content/docs/sem3/mat221`; they are not duplicated under `features`.
- Other code imports from the module entry points, not deep internal paths.
- Course CSS starts from a course scope or component class and never targets global elements without the site-theme layer.
- Calculus-specific assumptions remain inside MAT221.
- A component moves to shared learning only after its props and behavior are course-neutral.

### 4.4 Shared learning layer

Reusable learning components belong under the existing `components/learning` system:

```text
components/learning/
├── lesson-introduction.tsx
├── learning-objectives.tsx
├── prerequisites.tsx
├── concept-block.tsx
├── theorem-block.tsx
├── recognition-strategy.tsx
├── worked-example.tsx
├── worked-example-set.tsx
├── method-steps.tsx
├── common-mistake.tsx
├── practice-checkpoint.tsx
├── lesson-summary.tsx
└── lesson-connection.tsx
```

Existing host components are reused where they already satisfy the need:

- `FlashcardDeck`;
- `Quiz`;
- `ExamQuestion`;
- `ResourceCard` and `ResourceGrid`;
- accordions, tabs, and step sequences;
- math and formula components;
- callouts and cards.

No duplicate MAT221 version is created merely to reproduce colour. Theme tokens handle visual differences.

### 4.5 MDX component registration

The global MDX registry remains the single registration point. It may expose:

- stable shared learning primitives globally;
- a small explicit set of MAT221 public components where zero-import MDX is beneficial.

It must not expose internal data adapters, validators, or course-only implementation helpers.

---

## 5. Design and theme transition

### 5.1 Token layers

The MAT221 palette becomes the global light theme by extending the Fumadocs token system, not by installing a parallel theme.

#### Layer 1: Fumadocs structural tokens

- background and foreground;
- card and card foreground;
- popover and popover foreground;
- muted and muted foreground;
- border;
- primary/accent and corresponding foreground;
- secondary surfaces;
- sidebar and navbar surfaces.

#### Layer 2: university learning tokens

- concept;
- theorem;
- worked example;
- warning and common mistake;
- success and verification;
- assessment;
- focus timer;
- interactive selected and hover states.

#### Layer 3: MAT221 course tokens

- calculus graph axes and curves;
- substitution highlights;
- formula-sheet grouping;
- identity, theorem-condition, and method-recognition accents;
- diagram colours requiring light/dark variants.

### 5.2 Global light-mode source values

The verified MAT221 source palette includes:

| Semantic role | Source value |
|---|---|
| Page background | `#F1EBDD` |
| Dark panel/navy | `#30364D` |
| Card surface | `#FBF5E9` |
| Primary ink | `#273047` |
| Muted text | `#6E7180` |
| Lavender | `#B8C5DF` |
| Pink | `#D9A9B0` |
| Accent | `#C97F86` |
| Success | `#6D9C91` |
| Error | `#A96D78` |

The global light rollout also includes:

- the subtle cream-page texture;
- Fraunces display headings;
- Inter body and control text;
- strong navy borders;
- restrained irregular corner radii;
- small offset shadows;
- lavender and pink active states;
- theme-aware tables, callouts, cards, forms, and overlays.

### 5.3 Dark-mode preservation

The existing `.dark` Fumadocs variables remain authoritative. The transition must not simply invert the MAT221 palette.

Dark requirements:

- no cream surface remains unintentionally;
- no navy text is placed on a dark surface;
- semantic learning blocks remain distinguishable without relying only on colour;
- current navbar/sidebar dark behavior remains;
- formulas and diagrams retain sufficient contrast;
- no broad `!important` rule destroys status colours or button contrast;
- each light-mode component conversion includes a dark regression check.

### 5.4 Typography transition

- Load Fraunces and Inter through the host application font system.
- Use Fraunces for major headings and editorial display text.
- Use Inter for body text, navigation, tables, forms, flashcards, assessments, and timer controls.
- Remove the need for the standalone external Google Fonts stylesheet.
- Confirm font fallbacks and prevent cumulative layout shift.

### 5.5 Navbar and sidebar

Keep the existing Fumadocs structures and behavior:

- title/branding;
- search;
- GitHub link;
- theme control;
- mobile navigation;
- keyboard interaction;
- responsive collapse;
- Fumadocs page-tree navigation.

Change only the light appearance:

- map surfaces and borders to the MAT221 light tokens;
- apply the new typography carefully;
- use pink/lavender active and hover states;
- retain clear focus-visible treatment;
- restyle search and controls without changing their semantics;
- retain current dark selectors and behavior.

MAT221 chapter navigation comes from nested `meta.json` files. The standalone custom sidebar is not migrated.

### 5.6 Component showcase

Add a non-indexed internal route that renders all shared learning and study-tool states:

```text
/docs/internal/component-reference
```

It must include light/dark examples of:

- objectives and prerequisites;
- concept and theorem blocks;
- recognition strategy;
- worked examples in all difficulty levels;
- common mistakes and checks;
- flashcard front/back/long-content states;
- quiz unanswered/correct/incorrect/submitted states;
- formulas and long display math;
- timer idle/running/paused/break/settings/fullscreen states;
- loading, empty, and error states.

Exclude this route from ordinary course navigation and search.

---

## 6. Global Pomodoro transition and goal removal

### 6.1 Verified current university coupling

`components/learning/study-tools.tsx` currently combines:

- `StudyGoals`;
- `PomodoroTimer`;
- goal storage and active-goal storage;
- a custom study-change event;
- timer-to-active-goal progress updates;
- a two-panel study page.

The timer itself already has valuable host behavior:

- focus, short-break, and long-break phases;
- persisted settings;
- end-timestamp recovery;
- automatic transitions;
- completed blocks and focused minutes;
- sound;
- settings dialog;
- fullscreen mode;
- document-title countdown.

This makes it the correct behavioral base, but it must be separated from goals and moved above individual pages.

### 6.2 Target module

```text
features/study-timer/
├── components/
│   ├── timer-trigger.tsx
│   ├── timer-popover.tsx
│   ├── timer-panel.tsx
│   ├── timer-settings.tsx
│   └── timer-fullscreen.tsx
├── timer-provider.tsx
├── timer-reducer.ts
├── timer-storage.ts
├── timer-audio.ts
├── timer-types.ts
├── timer.css
└── index.ts
```

### 6.3 Provider ownership

Mount one provider near the root provider:

```tsx
<RootProvider>
  <StudyTimerProvider>
    {children}
  </StudyTimerProvider>
</RootProvider>
```

The provider owns:

- phase;
- duration settings;
- remaining seconds;
- end timestamp;
- running/paused state;
- cycle and round;
- completed focus blocks for the current day;
- focused minutes;
- automatic focus/break transitions;
- sound setting;
- open popover/settings/fullscreen state where appropriate.

There must be one interval owner. Presentational timer instances read the same provider and never start separate intervals.

### 6.4 Navbar integration

Add a compact action to the existing navbar without replacing the navbar:

| Timer state | Navbar display |
|---|---|
| Idle | Timer icon and `Focus` |
| Running focus | Remaining `MM:SS` |
| Paused | Remaining time plus paused state |
| Short break | Short-break label/time |
| Long break | Long-break label/time |

Activating the control opens a popover or responsive sheet with start/pause, reset, skip, phase selection, settings, and fullscreen access. Mobile uses the same provider and an accessible trigger in the existing navigation experience.

### 6.5 Study-tools page

Retain `/docs/study-tools` as the expanded workspace, but change it to:

- one timer panel;
- today’s completed blocks;
- focused minutes;
- cycle settings;
- automatic-transition settings;
- sound;
- fullscreen mode;
- a short Pomodoro explanation.

Remove the goals column and rewrite all goal-oriented headings and instructions.

### 6.6 Goal removal

Remove:

- `StudyGoals` registration and rendering;
- goal types and helpers;
- goal form, filters, lists, and styles;
- active-goal messaging;
- timer reads of the active-goal key;
- timer writes to goal progress;
- study-change events used only for goals;
- two-column goal/timer layout;
- goal-specific icons and copy.

Do not delete browser data. Stop reading these keys:

- `university-docs-study-goals-v2`;
- `university-docs-active-goal-v2`.

Preserve or version-migrate:

- `university-docs-pomodoro-v2`.

### 6.7 Cross-origin storage limitation

The standalone MAT221 site uses:

- `mat221-goals-v1`;
- `mat221-pomodoro-v2`;
- `mat221-flashcards-*`;
- `mat221-exam-practice-*`.

Browser storage is origin-scoped. If the standalone and centralized sites use different origins, the university site cannot silently read MAT221 storage. The plan must not promise automatic progress transfer.

Default transition:

- do not migrate old standalone timer/goals state;
- begin new global timer statistics in the host;
- preserve course progress only if an explicit export/import feature is separately approved.

---

## 7. Mathematics rendering architecture

### 7.1 Canonical pipeline

Static MDX mathematics uses:

```text
remark-math -> rehype-katex -> generated HTML/MathML
```

Interactive components may use the host’s existing explicit KaTeX helpers for structured strings. They must not trigger page-wide re-typesetting.

### 7.2 Prohibited behavior

- no root MathJax CDN script;
- no page-wide MathJax scan after navigation or flipping;
- no simultaneous KaTeX and MathJax ownership of the same expression;
- no repeated rendering into already-rendered math nodes;
- no raw untrusted HTML passed to the math renderer;
- no formula that forces the whole page wider than the viewport.

### 7.3 Interactive-math contract

- Keep hidden flashcard faces mounted where practical.
- Render their math once and reveal by CSS state.
- Key stateful content by stable content IDs, not transient array positions where avoidable.
- Put long display math inside a local horizontal scroller.
- Preserve one visible expression and one accessible interpretation.
- Ensure flips, quiz submissions, and answer disclosures do not duplicate math output.

### 7.4 Required audits

Port and adapt the MAT221 rendered-math audit to the university output. Check for:

- nested KaTeX roots;
- repeated adjacent expressions;
- raw TeX delimiters in output;
- duplicate accessibility text;
- overflow beyond component boundaries;
- malformed definite bounds;
- formula reconstruction after flashcard flip.

---

## 8. Content ownership and academic standards

### 8.1 Ownership model

Avoid both duplicate sources and one enormous topic “god object.” Use manifest-and-reference ownership.

| Concern | Canonical owner |
|---|---|
| Teaching narrative and section order | Topic `notes.mdx` |
| Topic title, slug, order, prerequisites, objectives, references | Topic manifest |
| Worked-example prompts, steps, answers, checks | Explicit worked-example data |
| Flashcard fronts, backs, and notes | Explicit flashcard data |
| Quiz choices, answers, explanations | Explicit quiz data |
| Written prompts, marks, solutions, diagnostics | Explicit question data |
| Exam prompts, time, marks, solution, marking notes | Explicit exam-practice data |
| Asset locations and metadata | Asset manifest |
| Sidebar labels and order | Fumadocs `meta.json` |

MDX references structured records; it does not repeat their full content in a second file.

### 8.2 Explicit-authoring rule

Every migrated topic must explicitly provide:

- learning objectives;
- prerequisites;
- What, Why, and When explanation;
- rule or theorem and its conditions;
- recognition cues;
- complete method;
- at least eight genuinely distinct worked examples;
- common mistakes;
- a practice checkpoint;
- at least ten reviewed flashcards;
- explained quiz questions;
- written questions with worked solutions;
- exam practice with marks and timing;
- summary and next-topic connection.

Forbidden student-facing patterns:

- generated “topic variation N” prompts;
- padding until a numeric target is reached;
- generic ten-step wrappers around unrelated seeds;
- answer choices without explanations;
- flashcards created automatically from cues without review;
- solutions that say only “apply the rule” or “continue the algebra”;
- repeated examples whose only change is a constant;
- unexplained theorem identities or skipped transformations;
- loose “Worked example” headings outside the worked-example component.

### 8.3 Worked-example schema

Each example should contain:

```ts
type WorkedExample = {
  id: string;
  number: number;
  title: string;
  difficulty: 'foundation' | 'developing' | 'exam-ready';
  purpose: string;
  prompt: string;
  recognition: string;
  methodDecision: string;
  ruleAndConditions: string;
  steps: Array<{ title: string; explanation: string; math?: string }>;
  answer: string;
  verification: string;
  commonWrongPath: string;
  transferPrompt?: string;
};
```

Validation rejects duplicate IDs/numbers, missing steps, empty checks, non-sequential numbering, and fewer than eight examples.

### 8.4 Review composition

Each `review.mdx` follows:

1. short retrieval instructions;
2. `FlashcardDeck` with at least ten reviewed cards;
3. explained chapter quiz;
4. score and retry behavior;
5. link to written questions or exam practice.

### 8.5 Flashcard stability

The host flashcard already uses a fixed-height stage with absolutely positioned faces. Preserve and strengthen that model:

- shared front/back dimensions;
- no document-height change on flip;
- internal scrolling for long faces;
- controls outside the flip surface;
- stable math nodes;
- keyboard activation;
- reduced-motion fallback;
- light and dark semantic tokens;
- mobile overflow testing.

---

## 9. Exact route transition

### 9.1 Course-level routes

| Standalone source | Central destination |
|---|---|
| `/` | `/docs/sem3/mat221` |
| `/formula-sheet` | `/docs/sem3/mat221/formula-sheet` |
| `/planner` | `/docs/sem3/mat221/planner` |
| `/resources` | `/docs/sem3/mat221/resources` |

### 9.2 Topic routes

For each source slug:

| Standalone source pattern | Central destination pattern |
|---|---|
| `/topics/{slug}` | `/docs/sem3/mat221/{numbered-slug}/notes` |
| `/topics/{slug}/questions` | `/docs/sem3/mat221/{numbered-slug}/questions` |
| `/topics/{slug}/quiz` | `/docs/sem3/mat221/{numbered-slug}/review#chapter-assessment` |
| `/topics/{slug}/review` | `/docs/sem3/mat221/{numbered-slug}/review` |
| `/topics/{slug}/exam-practice` | `/docs/sem3/mat221/{numbered-slug}/exam-practice` |

Each chapter overview is a new host route:

```text
/docs/sem3/mat221/{numbered-slug}
```

### 9.3 Redirect policy

Internal host redirects are useful only if the centralized deployment receives the old paths. If the standalone site stays on a different domain, configure redirects at that deployment to the new absolute URLs.

The route map must be machine-readable and used by:

- redirect configuration;
- link migration checks;
- sitemap comparison;
- final parity audit.

---

## 10. Content migration ledger

Statuses below describe migration readiness, not current source existence.

| # | Topic | Source MDX | Destination folder | Wave | Required content action | Initial status |
|---:|---|---|---|---|---|---|
| 1 | Antiderivatives and FTC | `foundations.mdx` | `01-foundations` | A | Preserve narrative; verify seven explicit data examples plus authored MDX example; replace generated practice | Audit required |
| 2 | Integration by Substitution | `substitution.mdx` | `02-substitution` | Pilot/A | Use as full architecture pilot; preserve examples 1–8 and verify every component boundary | Pilot candidate |
| 3 | Partial Fractions | `partials.mdx` | `03-partial-fractions` | B | Verify factor classifications, long division, repeated factors, quadratics, and explicit assessments | Audit required |
| 4 | Integration by Parts | `parts.mdx` | `04-integration-by-parts` | B | Verify LIATE, repeated/tabular, cyclic, and definite cases | Audit required |
| 5 | Reduction Formulas | `reduction-formulas.mdx` | `05-reduction-formulas` | B | Verify derivations, valid ranges, base cases, and no missing boundary terms | Priority after pilot |
| 6 | Trigonometric Integrals | `trig.mdx` | `06-trigonometric-integrals` | B | Verify parity strategy, identities, product-to-sum, and method selection | Audit required |
| 7 | Trigonometric Substitution | `trig-substitution.mdx` | `07-trigonometric-substitution` | B | Verify all radical patterns, triangles, domains, and back-substitution | Audit required |
| 8 | Weierstrass Substitution | `weierstrass.mdx` | `08-weierstrass-substitution` | B | Verify rational conversion and decisions where shorter methods apply | Audit required |
| 9 | Improper Integrals | `improper.mdx` | `09-improper-integrals` | C | Verify every improper boundary, one-sided limits, and convergence statements | Audit required |
| 10 | Numerical Integration | `numerical.mdx` | `10-numerical-integration` | C | Verify table construction, weights, interval requirements, and error reasoning | Audit required |
| 11 | Applications of Integration | `applications.mdx` | `11-applications` | C | Verify geometry, intersections, units, washers/shells/length selection | Audit required |
| 12 | L’Hôpital’s Rule | `lhopital.mdx` | `12-lhopital` | C | Verify hypotheses and transformation of products, differences, and powers | Audit required |
| 13 | Sequences and Series | `sequences-series.mdx` | `13-sequences-and-series` | D | Verify test selection, hypotheses, absolute/conditional classification | Audit required |
| 14 | Power Series | `power-series.mdx` | `14-power-series` | D | Verify radius, separate endpoints, and termwise calculus conditions | Audit required |
| 15 | Taylor Series | `taylor.mdx` | `15-taylor-series` | D | Verify construction, known-series transformations, remainder bounds, and domains | Audit required |

For every row, completion requires all five destination pages, reviewed structured data, asset/link verification, dark/light visual checks, math audit, and an approved content checklist.

### 10.1 Course tools ledger

| Tool | Source | Destination | Transition rule |
|---|---|---|---|
| Formula sheet | Standalone route and `lib/formula-sheet` | `formula-sheet.mdx` plus MAT221 formula component/data | Preserve printability; use one math pipeline |
| Planner | Standalone planner route/data | `planner.mdx` plus course-planner component | Course scheduling only; no second Pomodoro |
| Resources | Standalone resources plus university PDFs | `resources.mdx` | Combine reviewed external resources, three videos, diagrams, and existing lecture PDFs |
| Timer | Both projects | Global `features/study-timer` | University timer is base; one provider; no goals |

### 10.2 Placeholder handling

Before replacing university MAT221:

1. copy the existing placeholder MDX into a dated archive location;
2. record whether any useful statement belongs in the final course overview;
3. remove the old placeholder routes from active `meta.json`;
4. verify no external host links rely on them;
5. add redirects only where necessary.

---

## 11. Asset migration ledger

### 11.1 Corrected source inventory

| Type | Count | Destination |
|---|---:|---|
| MP4 review videos | 3 | `public/videos/sem3/mat221/` |
| VTT captions | 3 | `public/videos/sem3/mat221/` |
| Poster PNGs | 3 | `public/images/sem3/mat221/video-posters/` |
| Course diagram SVGs | 14 | `public/images/sem3/mat221/diagrams/` |
| Open Graph PNG | 1 | Evaluate against host social-image system; do not blindly copy |
| Site icon SVG | 1 | Do not replace the university site icon by default |

### 11.2 Asset rules

- Create one typed asset manifest.
- Avoid repeated raw paths inside MDX.
- Preserve all VTT captions.
- Add useful video titles, captions, and fallback links.
- Verify poster aspect ratios and dimensions.
- Check SVG embedded text and line contrast in both themes.
- Do not duplicate the 39.3 MB collection in multiple public directories.
- Keep the existing university MAT221 lecture PDFs in course resources.
- Evaluate repository-hosted MP4 performance after functional migration; external media hosting is a later optimization, not a migration blocker.
- Audit filename casing because deployment filesystems may be case-sensitive.

---

## 12. Implementation phases and gates

### Phase 0 — Reproducible baseline

Actions:

- create `feat/mat221-centralization` from the updated local university `main`;
- record both full commit hashes;
- confirm a clean MAT221 source worktree and no unexplained tracked changes in the host;
- run source typecheck, lesson audit, and build;
- run host check and build;
- capture desktop/mobile light/dark baselines;
- inventory routes, assets, storage keys, and public component behavior;
- archive current university MAT221 placeholders;
- commit the verified inventory and route map.

Gate:

- both baselines reproduce after documented generated-source recovery where needed;
- inventory counts agree with this document or this document is amended explicitly;
- no migration code has begun before the archive and route map exist.

### Phase 1 — Architecture contracts

Actions:

- create feature-module and shared-component boundaries;
- define schemas and validation rules;
- define content ownership;
- define asset manifest;
- define route conventions;
- document prohibited generated-content patterns;
- decide public module entry points.

Gate:

- no duplicate narrative owner;
- no god-object course model;
- no deep imports in the proposed API;
- no second sidebar, timer, or math pipeline.

### Phase 2 — Theme foundation and component reference

Actions:

- map MAT221 light values into Fumadocs structural variables;
- add semantic university learning tokens;
- add MAT221-only calculation/diagram tokens;
- load Fraunces and Inter through the host;
- restyle navbar, sidebar, search, breadcrumbs, TOC, and previous/next controls;
- create the non-indexed component reference page;
- retain the current dark variable layer.

Gate:

- university home, CSI243, CSI247, and one older course remain usable in light and dark;
- navbar mechanics are unchanged;
- no MAT221 course selector leaks globally;
- component reference passes desktop/mobile and light/dark inspection.

### Phase 3 — Global timer and goal removal

Actions:

- split timer logic from current combined file;
- remove goal reads, writes, events, UI, styles, and copy;
- introduce one root timer provider;
- add navbar timer trigger;
- connect the full study-tools page to the same provider;
- retain settings, recovery, sound, rounds, statistics, and fullscreen;
- add focus management and reduced-motion handling;
- leave dormant goal storage untouched.

Gate:

- one provider and one interval;
- timer continues across client navigation;
- reload restores valid timer state;
- navbar, page, settings, and fullscreen show identical state;
- no goal key is read;
- no goal UI remains.

### Phase 4 — Shared learning primitives

Actions:

- create or adapt lesson introduction, objectives, prerequisites, concept, theorem, recognition, worked example, mistakes, checkpoint, summary, and connection components;
- adapt FlashcardDeck and Quiz only where required by MAT221 content;
- register stable public components in MDX;
- add schema-level and rendered tests.

Gate:

- component reference passes light/dark, mobile, keyboard, long-content, math, and reduced-motion checks;
- flashcard flips produce no page reflow;
- worked examples cannot render without required explanatory fields.

### Phase 5 — Substitution pilot

Why this pilot:

- it contains definite and indefinite integrals;
- it tests recognition, constants, complete variable replacement, changed bounds, and back-substitution;
- it already has the intended eight-example progression;
- it exercises long math, structured examples, flashcards, quiz, questions, and exam practice.

Actions:

- build the chapter overview, notes, questions, review, exam-practice, data, and metadata;
- convert examples 1–8 into explicit records;
- remove all dependency on generated repair output;
- migrate relevant diagram/video references;
- verify exact lesson order and no loose worked-example headings.

Gate:

- teaching review approves all eight examples;
- no unexplained substitution step remains;
- definite bounds are explained before use;
- all five routes are navigable;
- math, theme, flashcard, and responsive audits pass.

### Phase 6 — Complete course shell

Actions:

- replace placeholder MAT221 metadata;
- represent all 15 numbered chapters in the typed manifest, course index, and planner;
- publish a numbered chapter in navigation only after all five required pages pass the authored-content gate;
- add overview, formula sheet, planner, and resources;
- add chapter page ordering;
- implement route redirects where deployment topology requires them;
- verify search and previous/next navigation boundaries.

Gate:

- every planned chapter is represented by a stable contract and destination slug;
- no empty student-facing page is published;
- no generated repair output is used to make a chapter appear complete;
- chapter navigation is usable on desktop and mobile.

### Phase 7 — Authored content migration waves

#### Wave A: foundations

- Antiderivatives and FTC
- Integration by Substitution pilot refinements

#### Wave B: integration techniques

- Partial Fractions
- Integration by Parts
- Reduction Formulas
- Trigonometric Integrals
- Trigonometric Substitution
- Weierstrass Substitution

#### Wave C: advanced integration and applications

- Improper Integrals
- Numerical Integration
- Applications of Integration
- L’Hôpital’s Rule

#### Wave D: sequences and series

- Sequences and Series
- Power Series
- Taylor Series

Each topic receives its own content review and validation report. A wave is incomplete while any topic uses generated filler or lacks a required route.

### Phase 8 — Course tools and assets

Actions:

- migrate formula-sheet data and print layout;
- convert planner to course schedule without a timer duplicate;
- merge resources and university lecture PDFs;
- migrate three videos, captions, posters, and fourteen diagrams;
- implement typed asset manifest;
- add notes, formula-sheet, and exam-practice print treatment.

Gate:

- all 25 source public files are intentionally migrated, replaced, or rejected with a recorded reason;
- no duplicated large asset exists;
- captions and fallback downloads work;
- printed output is readable.

### Phase 9 — Full university light-theme rollout

Convert remaining surfaces in this order:

1. documentation shell;
2. semester pages;
3. course overview pages;
4. resource pages;
5. study tools;
6. interactive overlays;
7. home page;
8. print styles.

Gate after each surface family:

- light design matches the approved MAT221-derived reference;
- dark appearance has no regression;
- accessibility and mobile layout remain valid.

### Phase 10 — Final verification and cutover

Run:

- Fumadocs generation;
- TypeScript checking;
- production build;
- structural content audit;
- generated-filler prohibition audit;
- route and redirect audit;
- internal-link audit;
- asset audit;
- rendered-math audit;
- flashcard reflow test;
- timer singleton and persistence tests;
- accessibility audit;
- desktop/mobile visual comparison;
- light/dark regression comparison;
- search-index check;
- sitemap and canonical inspection;
- performance review;
- final academic content review.

Cutover sequence:

1. deploy a preview;
2. approve pilot and representative pages;
3. deploy centralized site;
4. keep standalone MAT221 available temporarily;
5. monitor missing routes, assets, and client errors;
6. mark standalone site as superseded and redirect users;
7. archive standalone repository only after parity is signed off.

---

## 13. Validation matrix

| Area | Automated check | Manual check |
|---|---|---|
| Content structure | Required pages/sections per topic | Teaching flow reads coherently |
| Examples | Count, IDs, numbering, required fields | Distinct purpose and correct mathematics |
| Generated filler | Reject known template phrases/patterns | Review originality and usefulness |
| Flashcards | Minimum count and valid faces | No reflow; long answers remain usable |
| Quiz | Valid indices and explanations | Distractors are plausible and diagnostic |
| Questions | Marks, solutions, diagnostics present | Method marks and algebra are complete |
| Exam practice | Timing/marks/schema present | Difficulty and marking guidance are realistic |
| Mathematics | No duplicate/nested rendering or raw TeX | Visual correctness and mobile overflow |
| Routes | Every manifest reference resolves | Sidebar and previous/next flow make sense |
| Assets | Manifest paths and file existence | Captions, posters, contrast, and media playback |
| Timer | One provider/interval; persistence tests | Navbar/page/fullscreen coherence |
| Goals | No imports, renders, reads, or events | No goal copy or empty layout remains |
| Theme | Token completeness and selector audit | Light parity and dark preservation |
| Accessibility | Static lint/semantic tests where available | Keyboard, focus, screen reader, contrast |
| Build | `npm run check` | Preview smoke test |

### 13.1 Required visual matrix

Capture at desktop and mobile in light and dark:

- university home;
- documentation landing;
- semester page;
- CSI243 lesson and review;
- CSI247 lesson and review;
- one older course page;
- MAT221 overview;
- Substitution notes;
- Reduction Formulas notes;
- MAT221 written questions;
- MAT221 review and flashcard front/back;
- MAT221 exam practice;
- formula sheet;
- planner;
- resources and video;
- navbar timer idle/running/paused/break;
- timer settings and fullscreen;
- component reference.

---

## 14. Migration logging and traceability

Maintain these files during implementation:

```text
docs/plans/mat221-centralization-integration-plan.md
docs/migrations/mat221/
├── inventory.json
├── route-map.json
├── asset-manifest.json
├── content-ledger.md
├── visual-baselines.md
├── validation-results.md
└── cutover-checklist.md
```

For each topic, `content-ledger.md` records:

- source files and source commit;
- destination files;
- explicit worked-example count;
- flashcard count;
- quiz count;
- written-question count;
- exam-practice count;
- generated source items rejected;
- assets used;
- academic reviewer/status;
- automated validation result;
- light/dark visual result;
- outstanding issues;
- final migration commit.

No topic is marked complete based only on file existence.

---

## 15. Branch, commit, and review strategy

Implementation branch:

```text
feat/mat221-centralization
```

Suggested commits:

1. `chore(mat221): record verified migration inventory`
2. `feat(theme): establish MAT221-derived light tokens`
3. `feat(theme): restyle docs navigation and component reference`
4. `refactor(study-tools): extract global pomodoro provider`
5. `refactor(study-tools): remove goal coupling and UI`
6. `feat(learning): add shared lesson primitives`
7. `feat(mat221): add course manifests and route shell`
8. `feat(mat221): migrate substitution pilot`
9. `feat(mat221): migrate foundations wave`
10. `feat(mat221): migrate integration-techniques wave`
11. `feat(mat221): migrate applications wave`
12. `feat(mat221): migrate series wave`
13. `feat(mat221): add course tools and assets`
14. `test(mat221): add content route asset and math audits`
15. `fix(theme): complete dark and responsive regression pass`
16. `docs(mat221): record final cutover verification`

Rules:

- do not combine the entire migration in one commit;
- keep theme, timer, shared components, content waves, and assets reviewable;
- require a passing host check at every gate;
- do not merge bulk topics before the pilot is approved;
- amend this specification when an architectural decision changes.

---

## 16. Rollback strategy

### Before cutover

- Keep current university MAT221 placeholders archived.
- Keep standalone MAT221 deployed and unchanged.
- Feature work remains isolated on the integration branch.
- Preview deployments are non-canonical.

### During cutover

- Do not delete the standalone deployment.
- Keep the old-to-new route map reversible.
- Monitor build, route, asset, search, timer, and client-render errors.
- If a critical regression appears, restore the previous university deployment and remove redirects until corrected.

### After cutover

- Retain the standalone source repository as read-only history.
- Retain migration manifests and validation results.
- Do not remove archived placeholders or old route mapping until the retention period is complete.
- Browser goal data remains untouched throughout rollback or cutover.

---

## 17. Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Global light-theme change breaks older courses | High | Semantic tokens, staged surface rollout, dark/light regression matrix |
| Generated MAT221 filler is mistaken for authored material | High | Explicit schemas, prohibited-pattern audit, content ledger, academic review |
| Fumadocs version mismatch causes copied code to fail | High | Port behavior, retain host dependencies and source engine |
| Timer creates multiple intervals after global integration | High | Single provider ownership and singleton tests |
| Removing goals deletes user data | Medium | Stop reading keys; never clear them |
| Old MAT221 progress cannot move cross-origin | Medium | Do not promise automatic transfer; optionally design export/import later |
| Math renders twice | High | KaTeX-only ownership, output audit, no page-wide MathJax |
| Flashcards reflow on long answers | High | Fixed stage, absolute faces, internal scrolling, reflow test |
| Large MP4 assets slow deployment | Medium | Single-copy manifest, measure first, consider later media hosting |
| Course-specific CSS leaks globally | High | Token layers, module boundary, selector audit, component reference |
| Huge change becomes unreviewable | High | Pilot-first gates and coherent commits/waves |
| Placeholder routes are removed unexpectedly | Medium | Archive and route-map before replacement |

---

## 18. Definition of done

Centralization is complete only when all of the following are true:

- `university-cs-docs` is the only active application runtime for MAT221.
- All 15 MAT221 chapters are present and sidebar-accessible.
- Every chapter has overview, notes, written questions, review, and exam practice.
- Every review begins with reviewed flashcards and includes an explained quiz.
- Every lesson follows the agreed teaching sequence.
- Every lesson contains at least eight explicit, meaningful worked examples.
- No synthetic filler or automatic count-padding reaches students.
- Worked examples render only through their component structure.
- The university light mode uses the approved MAT221 visual language.
- The existing university dark appearance remains intact.
- The existing navbar/sidebar mechanics remain intact.
- One global Pomodoro persists across navigation and reloads.
- Navbar, study page, settings, and fullscreen share one timer state.
- Goals are absent and goal keys are no longer read.
- Existing stored goal data has not been deleted.
- Static mathematics uses the host KaTeX pipeline.
- No global MathJax loader exists.
- Flashcard flips cause zero page-layout movement.
- All 25 source public files are accounted for with corrected classifications.
- Existing university MAT221 lecture PDFs are available through resources.
- Other courses work in light and dark modes.
- Search, sitemap, metadata, canonical URLs, and previous/next navigation include MAT221 correctly.
- Type, build, content, route, asset, math, accessibility, responsive, and visual audits pass.
- Preview comparison and final academic review are approved.
- The standalone site is archived only after deployed parity is confirmed.

---

## 19. Immediate next action

Phase 0 is committed and its architecture gate has been reviewed. The active sequence is now:

1. obtain academic sign-off for the implemented Substitution pilot;
2. run the authoritative repository check under the declared Node 22 engine;
3. author and review the next topic’s five-page set without generated repair material;
4. repeat the progressive publication gate for the remaining 14 chapters;
5. complete the exhaustive visual/accessibility matrix and seek preview/cutover approval only after the repository and academic gates are both satisfied.

The standalone repository remains the comparison and rollback source until deployed parity is approved.
