# Progress, streaks and rewards

Status: built on 2026-10-16, dashboard redesigned the same day (work orders PRG-01 to PRG-19 in [WORK_ORDERS.md](../../WORK_ORDERS.md)).

The site is free content with no accounts, so progress is kept in the reader's browser. This document says how it works and, more importantly, how it keeps working while the content and the rules keep changing.

## What the reader gets

- A **streak**: consecutive days with at least one counted activity, shown as a chip in the header. A **freeze** covers one missed day; one is earned every 7 days of streak (at most 2 are held).
- **XP and levels** (Starter to Legend) for reading, quizzes, flashcards, check questions and focus time, with a daily cap so repeating cards cannot inflate it.
- A **daily goal** (15, 30, 60 or 100 XP, chosen in Settings) shown as a ring, with a notice and a badge when it is reached.
- **Badges** for milestones (first page, 100 quiz answers, a seven-day streak, half a course read), each with its own artwork: a frame shape for its category and a tier colour for its difficulty (bronze, silver, gold, ink). Locked badges show how far away they are.
- **Encouragement** that fits the moment: a greeting by time of day, a headline that reflects where the reader is (first visit, streak safe, streak at risk, welcome back, goal reached), streak milestone messages, a week-on-week comparison, and a message on every quiz result. All the wording is data in `content/progress/messages.json`.
- **My courses**: the reader chooses the courses they take. The dashboard follows them with progress, the next page to read and quiz accuracy for each.
- A **dashboard** at `/docs/dashboard`, in five sections (see below), and a **panel at the top of the sidebar** with the streak, today's goal and level.
- **Control**: export, import, switch tracking off, switch the notices off, and a **reset that asks the reader to type RESET** (from the sidebar or Settings).

## The dashboard

Five sections, kept in the address (`#courses`) so each can be linked to:

| Section | What is in it |
|---|---|
| Overview | A greeting and headline, today's goal ring, the week at a glance, four headline numbers, what to read next, this week's chart, badges the reader is close to, and quiz questions to revisit |
| My courses | A course picker (by semester, with search), and a card per chosen course with progress, a "next" button and topic-by-topic dots |
| Progress | XP over 7, 30 or 90 days with a 7-day average, quiz accuracy over time, weekly XP for eight weeks, an activity heat map and lifetime totals |
| Badges | Every badge, filterable (all, earned, in progress, locked), with progress toward each and a tier legend |
| Settings | A name for the greeting, the daily goal, tracking and notices, export and import, and the reset |

The dashboard's numbers come from the engine's pure helpers (`weekSummary`, `lastDays`, `nextUp`, `missedQuestions`, `badgeProgress`), so they are unit-tested rather than computed inside components.

## What counts

| Activity | Counts when | XP (see `rewards.json`) |
|---|---|---|
| Reading a page | the page is open and visible for 10 seconds; the first time only | 5 |
| Quiz answer | a question is answered; XP only the first time that question is answered | 1, plus 2 if correct |
| Quiz finished | the results are shown; a perfect quiz of 3 or more questions earns more | 5, plus 15 if perfect |
| Flashcard | a card is turned to its answer | 1 |
| Check your understanding | an answer is opened; the first time only | 2 |
| Focus time | a focus block finishes | 1 per minute |
| First activity of a day | the day's first counted activity | 10 (outside the cap) |

A day counts for the streak when any of these happens. Visiting a page for less than 10 seconds only records it as the last place visited ("Continue where you left off").

## Where it lives

```text
features/progress/
  core.ts                  the engine: no imports, runs in the browser and in Node
  storage.ts               localStorage plus a summary cookie, defensive reads and writes
  progress-provider.tsx    React context: loads state, applies events, saves, syncs tabs
  components/              streak chip, toasts, page tracker, sidebar panel, reset dialog, badge art, charts
  dashboard/               the five dashboard sections (overview, courses, trends, badges, settings)
  icons.ts                 the icon names a badge may use
content/progress/
  rewards.json             XP rules, levels and badges with their art (data, versioned)
  messages.json            greetings, headlines, milestone and quiz messages (data, versioned)
  aliases.json             old page paths mapped to new ones
app/progress-manifest.json the course, topic and page list, built from the page tree
tests/unit/progress.test.mjs   npm run test:progress
```

The engine is pure functions over plain data: `applyEvent(state, event, context)` returns the new state and a list of notices (badge, level, streak, freeze). Nothing in it reads the clock or the browser; the caller passes `now` and `today`. That is what makes it testable and safe to change.

### Storage

- **Full state** in `localStorage` under `ucd-progress`, as JSON.
- **Summary cookie** `ucd_progress` (first party, `SameSite=Lax`, 400 days): `1.<streak>.<best>.<last day>.<xp>.<freezes>.<updated>`. If storage is cleared but the cookie survives, the streak, XP and freezes come back; the detailed history does not.
- Saves are debounced by 250 ms and flushed when the page is hidden. Another tab's save is picked up through the `storage` event, taking whichever state is newer.
- Every read is wrapped: private mode, full storage or corrupt JSON gives a fresh state, never an error.
- Nothing is sent to a server. The dashboard says so in plain words and offers export and reset.

### Schema history

| Version | Added |
|---|---|
| 1 | The first shape: days, streak, XP, counters, badges, pages, quiz answers, decks, check questions |
| 2 | `activity` (totals for each of the last 120 days, for the trend graphs) and `settings.courses`, `settings.name`, `settings.goalXp`. Days studied under version 1 become days with one action, so the calendar and trends do not start empty |

## Designing for constant updates

This is the part to keep intact when changing anything.

1. **Stable identifiers.** A page is keyed by its path, a quiz question by its `id` (or a hash of its text), a badge by its `id`. Never reuse an id for something else.
2. **Renamed pages keep their history.** When a page moves, add `"/old/path": "/new/path"` to `content/progress/aliases.json` (and a redirect in `next.config.mjs`). Paths are normalised through the table, following up to five hops, whenever progress is read or written.
3. **Versioned storage with migrations.** `SCHEMA_VERSION` in `core.ts` is the stored shape's version. To change the shape: raise the version, add one entry to `MIGRATIONS` that upgrades the previous version, and add a test. Never edit an old migration. `normalize()` gives every field a default, so a missing field is never an error, and fields the code does not know are kept, so an older build does not destroy newer data.
4. **Rewards are data.** Add, retire or retune badges, levels and XP in `rewards.json` with no code change. Bump its `version`. A badge needs an `id`, `title`, `description`, an optional `icon` (a name from `icons.ts`) and a `when` rule.
5. **Unknown rules are ignored.** `whenMet` returns false for a rule it does not understand, so a rewards file written for a newer build never breaks an older page.
6. **Nothing earned is taken away.** Badges stay when they are removed from `rewards.json` or when a course changes; a new badge whose condition is already met is awarded quietly on the next load (`catchUpBadges`).
7. **The manifest follows the content.** The dashboard reads `app/progress-manifest.json`, generated from the same page tree as the sidebar and static in production, so new courses, topics and pages appear without touching the dashboard. Pages that no longer exist simply stop counting towards the course total.

## Adding a badge

Edit `content/progress/rewards.json`:

```json
{ "id": "quiz-1000", "title": "Thousand", "description": "Answer 1,000 quiz questions.", "icon": "target", "when": { "counter": "quizAnswers", "gte": 1000 }, "shape": "round", "tier": "gold" }
```

`shape` picks the frame (`hex` reading, `shield` streaks, `round` quizzes, `burst` mastery, `square` practice, `crest` levels, courses and goals) and `tier` the colour (`bronze`, `silver`, `gold`, `ink`). Both are optional.

To change the wording the site uses to encourage readers, edit `content/progress/messages.json`. Each list holds alternatives; one is chosen by the day, so the text does not flicker. `{name}`, `{streak}`, `{pct}` and `{xp}` are filled in where a message uses them. Keep it honest: it should be true of the reader's situation.

Rules that exist today:

| Rule | Example | Meaning |
|---|---|---|
| `counter` | `{ "counter": "pages", "gte": 10 }` | `pages`, `pageVisits`, `quizAnswers`, `quizCorrect`, `quizzesCompleted`, `perfectQuizzes`, `cards`, `checks`, `focusMinutes` |
| `stat` | `{ "stat": "streakBest", "gte": 7 }` | `xp`, `level`, `days`, `streakBest`, `streakCurrent`, `distinctPages` |
| `quizAccuracy` | `{ "quizAccuracy": { "minAnswers": 30, "gte": 0.8 } }` | accuracy over enough answers |
| `course` | `{ "course": "sem3/csi243", "gte": 0.5 }` | a course read to a fraction; `"*"` means any course |
| `all`, `any` | `{ "all": [rule, rule] }` | combinations |

A new icon name needs one line in `features/progress/icons.ts`; an unknown name falls back to a plain award icon.

## Adding an event

1. Add a variant to `ProgressEvent` in `core.ts` and a `case` in `applyEvent`, with its counter and XP rule.
2. Add the XP key to `rewards.json` (`rules.xp`) and to `XpRules`.
3. Call `useRecord()` from the component and record the event.
4. Add a unit test.

## Limits, on purpose

- Progress is per browser. Moving between devices means exporting and importing.
- It is honest, not tamper-proof: anyone can edit their own local data. That is fine, because the only person it affects is the reader.
- It tracks reading and practice, not understanding. Page completion means the page was open for a while; quiz accuracy is the closer measure, and the dashboard shows both.

## Not built yet

- A browser test for the dashboard (the engine is unit-tested; the screens have been checked by hand).
- Weekly goals and reminders. A browser cannot remind someone who is not on the site, so the dashboard relies on the streak, the daily goal and "next up" to bring readers back.
- Per-topic quiz accuracy on the dashboard.
- Syncing across devices (would need a backend; deliberately out of scope).
