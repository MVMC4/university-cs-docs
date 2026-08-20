# MAT221 fidelity-pass validation

**Validated:** 20 August 2026  
**Branch:** `feat/mat221-fidelity-pass`  
**Baseline commit:** `14eecdb`  
**Source commit:** `6f4dd6b48dafb2b0378dd265c2dac8bba799f815`  
**Environment:** Node `v24.18.0`, npm `11.16.0`

## Fidelity contract

- The imported source tree began with 14 App Router files, 16 components, 19 library files, seven CSS partials, and 15 lesson MDX files. The Foundations narrated-review component and its three media assets were subsequently removed by request.
- `npm run audit:mat221-fidelity` compares that snapshot byte-for-byte with the standalone repository and compares every destination `notes.mdx` with its source lesson.
- Before the requested deletion, the audit passed with all 15 destination notes byte-identical, the frozen snapshot exact, and all 75 chapter surfaces present. No tests were run after the sidebar/video removal, as requested.
- The destination exposes Notes, Questions, Quiz, Review, and Exam Practice for each of 15 numbered chapters.
- Source-root topic links, videos, posters, captions, and diagrams are translated by host redirects/rewrites rather than edits to the frozen components.

## Intentional compatibility adapters

- MAT221 uses the university/Fumadocs docs sidebar; the custom course sidebar is not mounted.
- Source CSS is composed in original file order under `.mat221-source`. Light mode retains source values; a course-scoped adapter supplies host-compatible dark values.
- MAT221 retains course-only MathJax for component prop strings while ordinary MDX mathematics continues through the host KaTeX pipeline.
- The source Pomodoro and Goals components remain untouched in the frozen snapshot but are not mounted. Planner renders the host singleton `TimerPanel`, source assessment countdown, and source timeline with no Goals UI.

## Automated results

| Check | Result |
|---|---|
| `npm run audit:mat221-fidelity` | Pass |
| `npm run types:check` | Pass |
| `npm run build` | Pass |
| Static outputs | 1,370 |
| Documentation paths | 454 |
| `git diff --check` | Pass; Windows line-ending notices only |
| Legacy source-topic redirect | 308 to the numbered host notes route |
| Video, poster, and diagram compatibility paths | HTTP 200 |

The first post-change production build attempt encountered `ENOTEMPTY` because the production server was still using `.next`. After stopping that server, the same build completed successfully. This was an environment lock, not a source or application failure.

## Rendered production checks

- Overview, notes, questions, quiz, review, exam practice, formula sheet, planner, and resources render their source headings and expected components.
- The Substitution note renders the copied LessonIntro, Concept, Theorem, inline checkpoint, static KaTeX, and component-prop MathJax with no horizontal overflow.
- Source question bank renders 18 items; source quiz renders six questions and reveals feedback; source review renders 17 flashcards; source exam practice renders 18 items.
- Flashcard front/back height is identical at `417.59375px`, producing zero measured flip reflow.
- Formula sheet renders 47 formula items. Resources renders 22 cards. Planner renders one assessment countdown, one shared timer panel, and zero Goals surfaces.
- The host docs sidebar remains the active MAT221 navigation surface.
- Desktop and 390×844 mobile layouts have no horizontal overflow in light or dark mode.
- The mobile course menu opens and closes, keeps its close control visible, locks page scrolling while open, and hides duplicated host controls inside the overlay.
- Theme switching resolves from source cream/navy (`rgb(241, 235, 221)` / `rgb(39, 48, 71)`) to the course dark adapter (`rgb(18, 18, 18)` / `rgb(238, 238, 238)`).
- Browser console inspection reported no errors during the final mobile dark-mode check.

## Remaining external gates

- Run the declared Node 22 engine check in CI or preview; local validation used the documented Node 24 deviation.
- Conduct academic/editorial review of the copied source material as a separate post-parity task. Editorial changes must not be confused with migration fidelity.
- Complete preview deployment and production cutover approval before archiving the standalone site.
