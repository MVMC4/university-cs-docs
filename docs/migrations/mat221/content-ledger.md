# MAT221 content migration ledger

**Source commit:** `6f4dd6b48dafb2b0378dd265c2dac8bba799f815`
**Host baseline:** `d6267f8c155c7f1ffefcb64699e5b51ca225aace`
**Updated:** 20 August 2026

Counts remain unapproved until explicit source records are separated from generated `getRepairTopic()` and Cornell-cue output. A zero means no destination record has been authored; it does not claim the source lacks material.

| # | Topic | Source | Destination | Wave | Explicit destination examples | Reviewed cards | Reviewed quiz items | Written questions | Exam items | Status |
|---:|---|---|---|---|---:|---:|---:|---:|---:|---|
| 1 | Antiderivatives and FTC | `content/docs/foundations.mdx` | `01-foundations` | A | 0 | 0 | 0 | 0 | 0 | Audit required |
| 2 | Integration by Substitution | `content/docs/substitution.mdx` | `02-substitution` | Pilot/A | 8 | 11 | 6 | 6 | 3 | Implemented and locally validated; academic review pending |
| 3 | Partial Fractions | `content/docs/partials.mdx` | `03-partial-fractions` | B | 0 | 0 | 0 | 0 | 0 | Audit required |
| 4 | Integration by Parts | `content/docs/parts.mdx` | `04-integration-by-parts` | B | 0 | 0 | 0 | 0 | 0 | Audit required |
| 5 | Reduction Formulas | `content/docs/reduction-formulas.mdx` | `05-reduction-formulas` | B | 0 | 0 | 0 | 0 | 0 | Priority after pilot |
| 6 | Trigonometric Integrals | `content/docs/trig.mdx` | `06-trigonometric-integrals` | B | 0 | 0 | 0 | 0 | 0 | Audit required |
| 7 | Trigonometric Substitution | `content/docs/trig-substitution.mdx` | `07-trigonometric-substitution` | B | 0 | 0 | 0 | 0 | 0 | Audit required |
| 8 | Weierstrass Substitution | `content/docs/weierstrass.mdx` | `08-weierstrass-substitution` | B | 0 | 0 | 0 | 0 | 0 | Audit required |
| 9 | Improper Integrals | `content/docs/improper.mdx` | `09-improper-integrals` | C | 0 | 0 | 0 | 0 | 0 | Audit required |
| 10 | Numerical Integration | `content/docs/numerical.mdx` | `10-numerical-integration` | C | 0 | 0 | 0 | 0 | 0 | Audit required |
| 11 | Applications of Integration | `content/docs/applications.mdx` | `11-applications` | C | 0 | 0 | 0 | 0 | 0 | Audit required |
| 12 | L’Hôpital’s Rule | `content/docs/lhopital.mdx` | `12-lhopital` | C | 0 | 0 | 0 | 0 | 0 | Audit required |
| 13 | Sequences and Series | `content/docs/sequences-series.mdx` | `13-sequences-and-series` | D | 0 | 0 | 0 | 0 | 0 | Audit required |
| 14 | Power Series | `content/docs/power-series.mdx` | `14-power-series` | D | 0 | 0 | 0 | 0 | 0 | Audit required |
| 15 | Taylor Series | `content/docs/taylor.mdx` | `15-taylor-series` | D | 0 | 0 | 0 | 0 | 0 | Audit required |

## Phase 0 content decisions

- The existing host overview, Limits, Derivatives, Resources, and metadata files are archived under `archive/2026-08-20`.
- Limits and Derivatives are archived and have no active MAT221 route.
- No repository link targets either hidden placeholder route.
- No generated source item has been approved for student-facing migration.
- Existing host lecture PDFs remain canonical resources and are not duplicated.

## Implementation audit update

- The 15-topic typed manifest, course overview, and planner now represent the complete Calculus II sequence.
- Only Integration by Substitution is published as a chapter because it is the only destination with all five explicit page types.
- Formula sheet, planner, resources, the approved course assets, and one-copy video presentation are implemented.
- The remaining topics retain `Audit required` status until explicit question/review/exam records are authored and academically reviewed. Narrative availability alone does not advance a row.

## Per-topic completion fields

For each topic, add the assets used, generated items rejected, academic reviewer/status, automated validation, light/dark result, outstanding issues, and final migration commit before changing its status to complete.
