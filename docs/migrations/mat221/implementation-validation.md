# MAT221 implementation validation

**Validated:** 20 August 2026  
**Branch:** `feat/mat221-centralization`  
**Environment:** Node `v24.18.0`, npm `11.16.0`

## Automated gates

- `npm run check` passes after the final fixes: Fumadocs generation, Next route type generation, TypeScript, production compilation, and static generation all succeed.
- The production build generates 1,160 static pages and includes the internal component reference plus the active MAT221 route set.
- All destination `meta.json` files and the migration asset manifest parse successfully.
- `git diff --check` reports no whitespace errors; line-ending conversion notices remain informational on the Windows checkout.
- Active application/content searches find no goal-key references and no MathJax references.
- The active timer inventory contains one `StudyTimerProvider` and one timer interval. The unrelated Excalidraw autosave interval is not a timer duplicate.
- All 23 approved assets exist at their canonical destination and match the Phase 0 SHA-256 hashes. The standalone icon and Open Graph image remain rejected with recorded reasons.
- Destination Substitution data validates eight sequential worked examples, 11 flashcards, six explained quiz items, six written questions, three exam items, complete required fields, unique IDs, and the prohibited generated-content patterns.

## Rendered production checks

The production server was checked at 1440×1000 and 390×844.

- The MAT221 overview renders the cream/navy light palette, Fraunces headings, active course navigation, and no horizontal overflow.
- Dark mode resolves to the preserved neutral background and foreground tokens on desktop and mobile with no horizontal overflow.
- The mobile route matrix covers home, study tools, the MAT221 overview, all five Substitution pages, formula sheet, planner, resources, the internal component reference, and CSI243. Every route renders its expected main heading without a client warning/error.
- The internal component reference emits `noindex, nofollow`; ordinary docs routes remain indexable.
- Substitution notes render 25 KaTeX nodes, eight worked examples, and the migrated diagram at its natural width.
- Review order is flashcards before quiz. A card flip keeps a fixed 256 px height with zero measured layout shift. The six-answer quiz scores 6/6 and displays six explanations.
- Resources render three videos, three English caption tracks, and all three canonical posters.
- The timer popover is visible above the docs shell, starts and counts down, survives client navigation and reload, shares state with the trigger, resets correctly, and restores page-specific metadata titles after pausing.

## Fixes produced by validation

1. Restored explicit dark Fumadocs tokens after the new `:root` light layer won the cascade.
2. Portaled the timer popover outside the sidebar overflow context and preserved outside-click handling.
3. Preserved route metadata titles while allowing the active countdown to temporarily own `document.title`.
4. Corrected malformed LaTeX tokens in the Substitution notes and added the audited substitution diagram.
5. Added runtime validation for reviewed study-record counts and completeness.

## Gates still open

- Run the authoritative engine check in Node 22 or CI; local validation used the documented Node 24 deviation.
- Academically review and sign off the Substitution pilot.
- Author and review the five-page sets for the remaining 14 chapters; generated repair material remains prohibited.
- Complete the exhaustive cross-course visual/accessibility matrix, preview deployment, redirects/canonical checks in the deployment environment, and final cutover approval.
