# MAT221 architecture contracts

**Approved for implementation:** 20 August 2026  
**Branch:** `feat/mat221-centralization`

## Ownership boundaries

| Concern | Canonical owner | Contract |
|---|---|---|
| Narrative lessons | `content/docs/sem3/mat221` | MDX owns teaching narrative; feature data must not duplicate whole lessons. |
| Course structure | `features/courses/mat221/manifest.ts` | One typed 15-topic sequence supplies stable source and destination slugs. |
| Reviewed structured material | `features/courses/mat221/data` | Worked examples, flashcards, quizzes, written questions, and exam items are explicit records. |
| Shared learning UI | `components/learning` | Reusable learning patterns are course-neutral and registered through the host MDX map. |
| MAT221-only UI | `features/courses/mat221/components` | Course diagrams, formula sheets, planner, question banks, and video presentation stay feature-local. |
| Theme | `app/global.css` and `app/layout.tsx` | The host owns light/dark tokens, fonts, navigation surfaces, and print behavior. |
| Timer | `features/study-timer` | One root provider owns state, persistence, interval, settings, popover, and fullscreen views. |
| Mathematics | Host remark-math/KaTeX pipeline | No MathJax loader or page-wide re-typesetter is admitted. |
| Assets | `features/courses/mat221/lib/asset-paths.ts` | Public assets have typed canonical paths and one stored copy. |

## Public feature surface

Consumers may import MAT221 UI only from `features/courses/mat221/components.ts` and course contracts only from `features/courses/mat221/index.ts`. Deep feature imports are reserved for the feature itself and destination MDX data imports.

The timer is consumed through `features/study-timer/index.ts`. All timer displays use the same provider state; no course may create a second timer interval.

## Route publication gate

The manifest owns all 15 destination slugs, but the Fumadocs tree exposes only academically complete chapters. A chapter becomes active only when it has:

1. an overview;
2. complete notes with explicit worked examples;
3. authored written questions and solutions;
4. flashcards followed by an explained quiz;
5. authored exam practice;
6. completed structural, math, route, visual, and academic review.

This progressive gate resolves the conflict between representing the full course and prohibiting empty or generated student-facing pages.

## Prohibited patterns

- importing the standalone application shell, sidebar, loader, dependency graph, MathJax scripts, or deployment metadata;
- rendering generated repair records, generic Cornell cues, template distractors, or question padding as reviewed material;
- storing narrative lesson copies inside feature data;
- reading or deleting dormant goal storage while removing the goal interface;
- adding a second timer provider, interval, mathematics pipeline, or large-asset copy;
- publishing placeholder routes to make the chapter matrix look complete.

## Current implementation decision

Integration by Substitution is the first complete destination contract. The remaining 14 topics stay in the manifest, planner, and visible course sequence without active chapter links until their authored five-page sets pass the same gate.
