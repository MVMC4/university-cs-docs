# MAT221 Phase 0 validation results

**Run date:** 20 August 2026
**Host branch:** `feat/mat221-centralization`
**Observed runtime:** Node `v24.18.0`, npm `11.16.0`

## Source baseline

Repository: `C:/Users/Nido/Desktop/Projects/Active/mat221-docs`
Commit: `6f4dd6b48dafb2b0378dd265c2dac8bba799f815`

| Command | Result | Evidence |
|---|---|---|
| `npm run typecheck` | Pass | TypeScript exited 0 |
| `npm run audit:lessons` | Pass with scope caveat | 15 lessons have shared structure and examples 1–8; generated filler is not rejected |
| `npm run build` | Pass | Next.js generated 84 static pages |

## Host baseline

Repository: `C:/Users/Nido/Desktop/Projects/Active/university-cs-docs`
Commit: `d6267f8c155c7f1ffefcb64699e5b51ca225aace`

| Command | Result | Evidence |
|---|---|---|
| First `npm run check` | Transient fail | `.source/server.ts` was zero bytes and TypeScript reported it was not a module |
| Regenerated `npm run types:check` | Pass | Fumadocs generation, Next route type generation, and TypeScript exited 0 |
| `npm run build` | Pass | Next.js generated 1,144 static outputs, including 378 docs paths |

The successful rerun is the reproducible baseline. The initial generated-source failure remains recorded because deleting it from the history would make Phase 0 misleading.

## Environment deviation

The host declares Node `>=22 <23`; this run used Node 24. The build result is useful but does not replace the Node 22 CI/preview compatibility gate.

## Route and placeholder audit

- Active MAT221 files: 5.
- Sidebar-listed MAT221 pages: index and resources.
- Hidden placeholder routes: limits and derivatives.
- Repository references to hidden placeholder routes: 0.
- Existing resource tree: 26 PDFs plus one metadata file, 73,456,201 bytes total.

## Visual audit

Twenty-four fixed-viewport PNGs were captured from a fresh production server:

- six representative routes;
- desktop 1440×1000 and mobile 390×844;
- light and dark themes.

The pre-existing development server did not apply theme changes reliably. A fresh production server did, so production output is the canonical baseline. See `visual-baselines.md`.

Full-page stitched trial images were rejected after visual QA because sticky elements and long content were duplicated by the capture surface. The retained files are fixed-viewport captures at the documented sizes.

## Phase 0 verdict

Phase 0 evidence is complete. Architecture, theme, timer, and content implementation remain intentionally unstarted pending review of these records.
