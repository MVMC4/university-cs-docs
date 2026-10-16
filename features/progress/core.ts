/**
 * The progress engine: state, migrations, streaks, XP and badges.
 *
 * This file imports nothing, on purpose. It is plain functions over plain data, so it runs in the browser,
 * in Node (`npm run test:progress`) and in any future tool. Everything that touches the browser (storage,
 * React, the page tree) lives in the other files of this folder and calls into this one.
 *
 * Designed for constant updates (docs/content-standard.md, section 2.7):
 * - the stored shape is versioned and every change adds a migration;
 * - identifiers are stable (page paths, quiz question ids, badge ids);
 * - rewards are data (content/progress/rewards.json) and unknown rule types are ignored, never fatal;
 * - removing content never removes an earned badge.
 */

export const SCHEMA_VERSION = 1;
export const STORAGE_KEY = 'ucd-progress';
export const COOKIE_NAME = 'ucd_progress';
export const EXPORT_APP = 'university-cs-docs-progress';
const DAY_LIMIT = 800;

/* ───────── types ───────── */

export type StreakState = {
  current: number;
  best: number;
  lastDay: string | null;
  freezes: number;
  freezesUsed: number;
};

export type QuizRecord = { choice: number; correct: boolean; at: number; tries: number };

export type ProgressState = {
  v: number;
  createdAt: number;
  updatedAt: number;
  /** Tracking can be switched off; nothing is recorded while it is. */
  enabled: boolean;
  /** Days with at least one counted activity, as local YYYY-MM-DD, oldest first. */
  days: string[];
  streak: StreakState;
  xp: number;
  /** XP earned today, for the daily cap. */
  daily: { day: string; xp: number };
  counters: Record<string, number>;
  badges: Record<string, { at: number }>;
  pages: Record<string, { first: number; last: number; visits: number }>;
  quizzes: Record<string, Record<string, QuizRecord>>;
  decks: Record<string, { seen: number; last: number }>;
  checks: Record<string, Record<string, number>>;
  last: { path: string; title: string; at: number } | null;
  settings: { toasts: boolean };
  [unknown: string]: unknown;
};

export type XpRules = {
  page: number;
  quizAnswer: number;
  quizCorrect: number;
  quizComplete: number;
  perfectQuiz: number;
  card: number;
  check: number;
  focusMinute: number;
  firstActivityOfDay: number;
};

export type LevelDef = { level: number; xp: number; title: string };

/**
 * A badge condition. It is deliberately loose, because a newer rewards file may use rules this version does not
 * know, and those must be ignored rather than fail. The rules understood today:
 *   { counter: 'pages', gte: 10 }                       a counter reached a number
 *   { stat: 'streakBest', gte: 7 }                      xp, level, days, streakBest, streakCurrent, distinctPages
 *   { quizAccuracy: { minAnswers: 30, gte: 0.8 } }      accuracy over enough answers
 *   { course: '*', gte: 0.5 }                           a course (or any course, with '*') read to a fraction
 *   { all: [rule, ...] } and { any: [rule, ...] }       combinations
 */
export type When = Record<string, unknown>;

export type BadgeDef = { id: string; title: string; description: string; icon?: string; when: When };

export type RewardsConfig = {
  version: number;
  rules: {
    pageDwellSeconds: number;
    freezeEveryDays: number;
    maxFreezes: number;
    dailyXpCap: number;
    xp: XpRules;
  };
  levels: LevelDef[];
  badges: BadgeDef[];
};

export type ProgressEvent =
  | { type: 'visit'; path: string; title?: string }
  | { type: 'page'; path: string; title?: string }
  | { type: 'quiz-answer'; quiz: string; qid: string; choice: number; correct: boolean }
  | { type: 'quiz-complete'; quiz: string; total: number; correct: number }
  | { type: 'quiz-reset'; quiz: string }
  | { type: 'card'; deck: string }
  | { type: 'check'; page: string; key: string }
  | { type: 'focus'; minutes: number };

export type Notice =
  | { kind: 'badge'; id: string; title: string; description: string; icon?: string }
  | { kind: 'level'; level: number; title: string }
  | { kind: 'streak'; current: number }
  | { kind: 'freeze-earned' }
  | { kind: 'freeze-used' };

export type ManifestPage = { path: string; title: string; kind: string };
export type ManifestTopic = { id: string; title: string; pages: ManifestPage[] };
export type ManifestCourse = { id: string; title: string; semester: string; semesterTitle?: string; topics: ManifestTopic[] };
export type Manifest = { version: number; courses: ManifestCourse[] };

export type Context = {
  now: number;
  today: string;
  rewards: RewardsConfig;
  manifest?: Manifest | null;
  aliases?: Record<string, string>;
  /** Suppress notices (used when state is rebuilt from a cookie). */
  silent?: boolean;
};

/* ───────── small helpers ───────── */

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const toNumber = (value: unknown, fallback: number) =>
  typeof value === 'number' && Number.isFinite(value) ? value : fallback;

const toObject = <T>(value: unknown): Record<string, T> => (isObject(value) ? (value as Record<string, T>) : {});

export function dayKey(ms: number): string {
  const date = new Date(ms);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

/** Whole days from `a` to `b` (positive when `b` is later). Uses UTC arithmetic so daylight saving cannot skew it. */
export function daysBetween(a: string, b: string): number {
  const [ay, am, ad] = a.split('-').map(Number);
  const [by, bm, bd] = b.split('-').map(Number);
  return Math.round((Date.UTC(by, bm - 1, bd) - Date.UTC(ay, am - 1, ad)) / 86_400_000);
}

export function addDays(key: string, count: number): string {
  const [year, month, day] = key.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + count));
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
}

/** A short stable hash, used for a question id when the data does not give one. */
export function hashText(text: string): string {
  let hash = 5381;
  for (let index = 0; index < text.length; index += 1) hash = ((hash << 5) + hash + text.charCodeAt(index)) | 0;
  return (hash >>> 0).toString(36);
}

/** Strip query, hash and trailing slash, then follow the alias table (renamed pages) a few hops. */
export function normalizePath(path: string, aliases: Record<string, string> = {}): string {
  let current = path.split('#')[0].split('?')[0];
  if (current.length > 1) current = current.replace(/\/+$/, '');
  for (let hop = 0; hop < 5; hop += 1) {
    const next = aliases[current];
    if (!next || next === current) break;
    current = next;
  }
  return current;
}

/* ───────── state, migrations ───────── */

export function emptyState(now: number): ProgressState {
  return {
    v: SCHEMA_VERSION,
    createdAt: now,
    updatedAt: now,
    enabled: true,
    days: [],
    streak: { current: 0, best: 0, lastDay: null, freezes: 0, freezesUsed: 0 },
    xp: 0,
    daily: { day: '', xp: 0 },
    counters: {},
    badges: {},
    pages: {},
    quizzes: {},
    decks: {},
    checks: {},
    last: null,
    settings: { toasts: true },
  };
}

/** Make any stored value into a complete state of the current shape, keeping fields this version does not know. */
function normalize(raw: Record<string, unknown>, now: number): ProgressState {
  const base = emptyState(now);
  const streak = toObject<unknown>(raw.streak);
  const last = isObject(raw.last) && typeof raw.last.path === 'string'
    ? { path: raw.last.path, title: typeof raw.last.title === 'string' ? raw.last.title : '', at: toNumber(raw.last.at, now) }
    : null;
  const days = Array.isArray(raw.days) ? raw.days.filter((day): day is string => typeof day === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(day)) : [];
  const settings = toObject<unknown>(raw.settings);
  return {
    ...raw,
    v: SCHEMA_VERSION,
    createdAt: toNumber(raw.createdAt, now),
    updatedAt: toNumber(raw.updatedAt, now),
    enabled: raw.enabled === false ? false : true,
    days: [...new Set(days)].sort().slice(-DAY_LIMIT),
    streak: {
      current: toNumber(streak.current, 0),
      best: toNumber(streak.best, 0),
      lastDay: typeof streak.lastDay === 'string' ? streak.lastDay : null,
      freezes: toNumber(streak.freezes, 0),
      freezesUsed: toNumber(streak.freezesUsed, 0),
    },
    xp: toNumber(raw.xp, 0),
    daily: isObject(raw.daily) ? { day: typeof raw.daily.day === 'string' ? raw.daily.day : '', xp: toNumber(raw.daily.xp, 0) } : base.daily,
    counters: toObject<number>(raw.counters),
    badges: toObject<{ at: number }>(raw.badges),
    pages: toObject<{ first: number; last: number; visits: number }>(raw.pages),
    quizzes: toObject<Record<string, QuizRecord>>(raw.quizzes),
    decks: toObject<{ seen: number; last: number }>(raw.decks),
    checks: toObject<Record<string, number>>(raw.checks),
    last,
    settings: { ...base.settings, ...settings, toasts: settings.toasts === false ? false : true },
  };
}

/**
 * Each entry upgrades a state from version N to N + 1. Add one whenever the stored shape changes, and never
 * edit an old one. A state with no `v` is treated as version 0.
 */
export const MIGRATIONS: Record<number, (state: Record<string, unknown>) => Record<string, unknown>> = {
  // 0 -> 1: the first versioned shape. Earlier prototypes stored a flat `streak` number and `lastDay`.
  0: (state) => {
    if (typeof state.streak === 'number') {
      const lastDay = typeof state.lastDay === 'string' ? state.lastDay : null;
      return { ...state, streak: { current: state.streak, best: state.streak, lastDay, freezes: 0, freezesUsed: 0 } };
    }
    return state;
  },
};

export function migrate(raw: unknown, now: number): ProgressState {
  if (!isObject(raw)) return emptyState(now);
  let working: Record<string, unknown> = { ...raw };
  let version = Math.max(0, Math.floor(toNumber(working.v, 0)));
  // A state written by a newer version is kept as it is: unknown fields survive, known fields are read defensively.
  while (version < SCHEMA_VERSION) {
    const step = MIGRATIONS[version];
    if (step) working = step(working);
    version += 1;
  }
  return normalize(working, now);
}

/* ───────── streaks ───────── */

export type StreakEvent = 'started' | 'extended' | 'reset' | 'freeze-used' | 'freeze-earned';

export function advanceStreak(
  streak: StreakState,
  today: string,
  rules: { freezeEveryDays: number; maxFreezes: number },
): { streak: StreakState; events: StreakEvent[] } {
  if (streak.lastDay === today) return { streak, events: [] };
  const events: StreakEvent[] = [];
  const next: StreakState = { ...streak };

  if (!streak.lastDay) {
    next.current = 1;
    events.push('started');
  } else {
    const gap = daysBetween(streak.lastDay, today);
    if (gap <= 0) return { streak, events: [] }; // the clock moved backwards: ignore
    if (gap === 1) {
      next.current = streak.current + 1;
      events.push('extended');
    } else {
      const missed = gap - 1;
      if (missed <= 2 && streak.freezes >= missed) {
        next.freezes = streak.freezes - missed;
        next.freezesUsed = streak.freezesUsed + missed;
        next.current = streak.current + 1;
        events.push('freeze-used', 'extended');
      } else {
        next.current = 1;
        events.push('reset');
      }
    }
  }

  next.lastDay = today;
  next.best = Math.max(next.best, next.current);
  if (events.includes('extended') && rules.freezeEveryDays > 0 && next.current % rules.freezeEveryDays === 0 && next.freezes < rules.maxFreezes) {
    next.freezes += 1;
    events.push('freeze-earned');
  }
  return { streak: next, events };
}

export type StreakStatus = 'none' | 'done' | 'at-risk' | 'lost';

/** What to show for the streak today: it is lost only once a missed day can no longer be covered by a freeze. */
export function effectiveStreak(streak: StreakState, today: string): { value: number; status: StreakStatus } {
  if (!streak.lastDay) return { value: 0, status: 'none' };
  const gap = daysBetween(streak.lastDay, today);
  if (gap <= 0) return { value: streak.current, status: 'done' };
  if (gap === 1) return { value: streak.current, status: 'at-risk' };
  const missed = gap - 1;
  if (missed <= 2 && streak.freezes >= missed) return { value: streak.current, status: 'at-risk' };
  return { value: 0, status: 'lost' };
}

/* ───────── levels ───────── */

export function levelFor(xp: number, levels: LevelDef[]) {
  const sorted = [...levels].sort((a, b) => a.xp - b.xp);
  let current: LevelDef = sorted[0] ?? { level: 1, xp: 0, title: 'Starter' };
  for (const level of sorted) if (xp >= level.xp) current = level;
  const next = sorted.find((level) => level.xp > xp) ?? null;
  const progress = next ? (xp - current.xp) / (next.xp - current.xp) : 1;
  return { ...current, next, progress };
}

/* ───────── course progress ───────── */

export function courseProgress(state: ProgressState, course: ManifestCourse) {
  let total = 0;
  let read = 0;
  const topics = course.topics.map((topic) => {
    const pages = topic.pages.map((page) => ({ ...page, read: Boolean(state.pages[page.path]) }));
    total += pages.length;
    read += pages.filter((page) => page.read).length;
    return { ...topic, pages, read: pages.filter((page) => page.read).length };
  });
  return { id: course.id, title: course.title, semester: course.semester, topics, total, read, fraction: total ? read / total : 0 };
}

export function quizAccuracy(state: ProgressState): { answered: number; correct: number; fraction: number } {
  let answered = 0;
  let correct = 0;
  for (const quiz of Object.values(state.quizzes)) {
    for (const record of Object.values(quiz)) {
      answered += 1;
      if (record.correct) correct += 1;
    }
  }
  return { answered, correct, fraction: answered ? correct / answered : 0 };
}

/* ───────── badges ───────── */

function stat(state: ProgressState, name: string, rewards: RewardsConfig): number {
  switch (name) {
    case 'xp': return state.xp;
    case 'level': return levelFor(state.xp, rewards.levels).level;
    case 'days': return state.days.length;
    case 'streakBest': return state.streak.best;
    case 'streakCurrent': return state.streak.current;
    case 'distinctPages': return Object.keys(state.pages).length;
    default: return Number.NaN;
  }
}

/** One badge condition. Anything this version does not understand is false: a newer rewards file never breaks an older reader. */
export function whenMet(when: When, state: ProgressState, ctx: Pick<Context, 'rewards' | 'manifest'>): boolean {
  try {
    if (!isObject(when)) return false;
    if (Array.isArray(when.all)) return (when.all as When[]).every((item) => whenMet(item, state, ctx));
    if (Array.isArray(when.any)) return (when.any as When[]).some((item) => whenMet(item, state, ctx));
    if (typeof when.counter === 'string' && typeof when.gte === 'number') return (state.counters[when.counter] ?? 0) >= when.gte;
    if (typeof when.stat === 'string' && typeof when.gte === 'number') return stat(state, when.stat, ctx.rewards) >= when.gte;
    if (isObject(when.quizAccuracy)) {
      const { minAnswers, gte } = when.quizAccuracy as { minAnswers: number; gte: number };
      const accuracy = quizAccuracy(state);
      return accuracy.answered >= minAnswers && accuracy.fraction >= gte;
    }
    if (typeof when.course === 'string' && typeof when.gte === 'number') {
      if (!ctx.manifest) return false;
      const courses = when.course === '*' ? ctx.manifest.courses : ctx.manifest.courses.filter((course) => course.id === when.course);
      return courses.some((course) => {
        const summary = courseProgress(state, course);
        return summary.total > 0 && summary.fraction >= (when.gte as number);
      });
    }
    return false;
  } catch {
    return false;
  }
}

export function newBadges(state: ProgressState, ctx: Pick<Context, 'rewards' | 'manifest'>): BadgeDef[] {
  return ctx.rewards.badges.filter((badge) => !state.badges[badge.id] && whenMet(badge.when, state, ctx));
}

/* ───────── applying an event ───────── */

function bump(counters: Record<string, number>, name: string, by = 1) {
  counters[name] = (counters[name] ?? 0) + by;
}

export function applyEvent(previous: ProgressState, event: ProgressEvent, ctx: Context): { state: ProgressState; notices: Notice[] } {
  if (!previous.enabled) return { state: previous, notices: [] };

  const { rewards, now, today } = ctx;
  const xpRules = rewards.rules.xp;
  const state: ProgressState = {
    ...previous,
    counters: { ...previous.counters },
    pages: { ...previous.pages },
    quizzes: { ...previous.quizzes },
    decks: { ...previous.decks },
    checks: { ...previous.checks },
    badges: { ...previous.badges },
    days: previous.days,
    updatedAt: now,
  };
  const notices: Notice[] = [];
  let gain = 0;
  let activity = false;

  switch (event.type) {
    case 'visit': {
      const path = normalizePath(event.path, ctx.aliases);
      state.last = { path, title: event.title ?? '', at: now };
      break;
    }
    case 'page': {
      const path = normalizePath(event.path, ctx.aliases);
      const record = state.pages[path];
      state.pages[path] = { first: record?.first ?? now, last: now, visits: (record?.visits ?? 0) + 1 };
      state.last = { path, title: event.title ?? (state.last?.path === path ? state.last.title : ''), at: now };
      bump(state.counters, 'pageVisits');
      if (!record) {
        bump(state.counters, 'pages');
        gain += xpRules.page;
      }
      activity = true;
      break;
    }
    case 'quiz-answer': {
      const quiz = { ...(state.quizzes[event.quiz] ?? {}) };
      const record = quiz[event.qid];
      quiz[event.qid] = { choice: event.choice, correct: event.correct, at: now, tries: (record?.tries ?? 0) + 1 };
      state.quizzes[event.quiz] = quiz;
      bump(state.counters, 'quizAnswers');
      if (event.correct) bump(state.counters, 'quizCorrect');
      // XP only the first time a question is answered, so retrying cannot farm points.
      if (!record) gain += xpRules.quizAnswer + (event.correct ? xpRules.quizCorrect : 0);
      activity = true;
      break;
    }
    case 'quiz-reset': {
      // Forget the saved answers of one quiz so it can be taken fresh. Not an activity, and it earns nothing.
      const rest = { ...state.quizzes };
      delete rest[event.quiz];
      state.quizzes = rest;
      break;
    }
    case 'quiz-complete': {
      bump(state.counters, 'quizzesCompleted');
      gain += xpRules.quizComplete;
      if (event.total >= 3 && event.correct === event.total) {
        bump(state.counters, 'perfectQuizzes');
        gain += xpRules.perfectQuiz;
      }
      activity = true;
      break;
    }
    case 'card': {
      const deck = state.decks[event.deck];
      state.decks[event.deck] = { seen: (deck?.seen ?? 0) + 1, last: now };
      bump(state.counters, 'cards');
      gain += xpRules.card;
      activity = true;
      break;
    }
    case 'check': {
      const page = normalizePath(event.page, ctx.aliases);
      const opened = { ...(state.checks[page] ?? {}) };
      if (!opened[event.key]) {
        opened[event.key] = now;
        state.checks[page] = opened;
        bump(state.counters, 'checks');
        gain += xpRules.check;
      }
      activity = true;
      break;
    }
    case 'focus': {
      const minutes = Math.max(0, Math.min(180, Math.round(event.minutes)));
      bump(state.counters, 'focusMinutes', minutes);
      gain += minutes * xpRules.focusMinute;
      activity = minutes > 0;
      break;
    }
    default:
      return { state: previous, notices: [] };
  }

  let bonus = 0;
  if (activity) {
    if (!previous.days.includes(today)) {
      state.days = [...previous.days, today].sort().slice(-DAY_LIMIT);
      bonus += xpRules.firstActivityOfDay;
    }
    const advanced = advanceStreak(previous.streak, today, rewards.rules);
    state.streak = advanced.streak;
    if (advanced.events.includes('extended') || advanced.events.includes('started')) notices.push({ kind: 'streak', current: advanced.streak.current });
    if (advanced.events.includes('freeze-earned')) notices.push({ kind: 'freeze-earned' });
    if (advanced.events.includes('freeze-used')) notices.push({ kind: 'freeze-used' });
  }

  // Daily cap on earned XP; the first-activity bonus is outside the cap.
  const daily = previous.daily.day === today ? previous.daily : { day: today, xp: 0 };
  const room = Math.max(0, rewards.rules.dailyXpCap - daily.xp);
  const earned = Math.min(gain, room);
  state.daily = { day: today, xp: daily.xp + earned };
  const levelBefore = levelFor(previous.xp, rewards.levels);
  state.xp = previous.xp + earned + bonus;
  const levelAfter = levelFor(state.xp, rewards.levels);
  if (levelAfter.level > levelBefore.level) notices.push({ kind: 'level', level: levelAfter.level, title: levelAfter.title });

  for (const badge of newBadges(state, ctx)) {
    state.badges[badge.id] = { at: now };
    notices.push({ kind: 'badge', id: badge.id, title: badge.title, description: badge.description, icon: badge.icon });
  }

  return { state, notices: ctx.silent ? [] : notices };
}

/** Award every badge already earned by the state, without notices. Used after import, migration or a rewards update. */
export function catchUpBadges(state: ProgressState, ctx: Pick<Context, 'rewards' | 'manifest' | 'now'>): ProgressState {
  const badges = { ...state.badges };
  let changed = false;
  for (const badge of newBadges(state, ctx)) {
    badges[badge.id] = { at: ctx.now };
    changed = true;
  }
  return changed ? { ...state, badges } : state;
}

/* ───────── cookie summary, export, import ───────── */

/** The small string kept in a cookie: enough to restore the streak and level if browser storage is cleared. */
export function encodeSummary(state: ProgressState): string {
  const lastDay = (state.streak.lastDay ?? '').replace(/-/g, '');
  return ['1', state.streak.current, state.streak.best, lastDay, state.xp, state.streak.freezes, state.updatedAt.toString(36)].join('.');
}

export function decodeSummary(value: string | null | undefined): { current: number; best: number; lastDay: string | null; xp: number; freezes: number; updatedAt: number } | null {
  if (!value) return null;
  const parts = value.split('.');
  if (parts[0] !== '1' || parts.length < 7) return null;
  const [, current, best, lastDay, xp, freezes, updated] = parts;
  const day = /^\d{8}$/.test(lastDay) ? `${lastDay.slice(0, 4)}-${lastDay.slice(4, 6)}-${lastDay.slice(6, 8)}` : null;
  const numbers = [current, best, xp, freezes].map(Number);
  if (numbers.some((number) => !Number.isFinite(number))) return null;
  return { current: numbers[0], best: numbers[1], lastDay: day, xp: numbers[2], freezes: numbers[3], updatedAt: parseInt(updated, 36) || 0 };
}

/** Rebuild what the cookie can give back: the streak, XP and freezes, not the detailed history. */
export function stateFromSummary(summary: NonNullable<ReturnType<typeof decodeSummary>>, now: number): ProgressState {
  const state = emptyState(now);
  state.xp = summary.xp;
  state.streak = { current: summary.current, best: summary.best, lastDay: summary.lastDay, freezes: summary.freezes, freezesUsed: 0 };
  if (summary.lastDay) state.days = [summary.lastDay];
  return state;
}

export function serialize(state: ProgressState): string {
  return JSON.stringify({ app: EXPORT_APP, version: SCHEMA_VERSION, exportedAt: new Date().toISOString(), state }, null, 2);
}

export function parseImport(text: string, now: number): ProgressState {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('That file is not valid JSON.');
  }
  const candidate = isObject(parsed) && isObject(parsed.state) ? parsed.state : parsed;
  if (!isObject(candidate) || !('streak' in candidate || 'xp' in candidate || 'pages' in candidate)) {
    throw new Error('That file does not look like exported progress.');
  }
  return migrate(candidate, now);
}
