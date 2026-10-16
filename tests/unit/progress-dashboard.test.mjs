import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import {
  SCHEMA_VERSION,
  addDays,
  applyEvent,
  awardBadges,
  badgeProgress,
  dayActivity,
  emptyState,
  heroSituation,
  lastDays,
  migrate,
  missedQuestions,
  nextUp,
  pickMessage,
  quizTone,
  weekDots,
  weekSummary,
} from '../../features/progress/core.ts';

const rewards = JSON.parse(fs.readFileSync(new URL('../../content/progress/rewards.json', import.meta.url), 'utf8'));
const messages = JSON.parse(fs.readFileSync(new URL('../../content/progress/messages.json', import.meta.url), 'utf8'));
const NOW = Date.UTC(2026, 9, 16, 9, 0, 0);
const ctxFor = (today, extra = {}) => ({ now: NOW, today, rewards, ...extra });

test('a version 1 state is migrated: days become activity, settings gain defaults, nothing is lost', () => {
  const v1 = {
    v: 1,
    days: ['2026-10-14', '2026-10-15'],
    xp: 80,
    streak: { current: 2, best: 2, lastDay: '2026-10-15', freezes: 0, freezesUsed: 0 },
    settings: { toasts: false },
    mystery: 7,
  };
  const state = migrate(v1, NOW);
  assert.equal(state.v, SCHEMA_VERSION);
  assert.equal(state.activity['2026-10-14'].actions, 1);
  assert.deepEqual(state.settings.courses, []);
  assert.equal(state.settings.goalXp, 30);
  assert.equal(state.settings.toasts, false, 'an existing setting is kept');
  assert.equal(state.mystery, 7);
  assert.equal(state.xp, 80);
});

test('settings are cleaned: bad goals fall back, names are cut to length, courses are de-duplicated', () => {
  const state = migrate({ settings: { goalXp: 100000, name: 'x'.repeat(100), courses: ['a', 'a', 5, 'b'] } }, NOW);
  assert.equal(state.settings.goalXp, 30);
  assert.equal(state.settings.name.length, 40);
  assert.deepEqual(state.settings.courses, ['a', 'b']);
});

test('each counted action is recorded against the day, for the trend graphs', () => {
  let state = emptyState(NOW);
  state = applyEvent(state, { type: 'page', path: '/docs/a' }, ctxFor('2026-10-16')).state;
  state = applyEvent(state, { type: 'quiz-answer', quiz: 'q', qid: 'a', choice: 1, correct: true }, ctxFor('2026-10-16')).state;
  state = applyEvent(state, { type: 'quiz-answer', quiz: 'q', qid: 'b', choice: 0, correct: false }, ctxFor('2026-10-16')).state;
  state = applyEvent(state, { type: 'focus', minutes: 25 }, ctxFor('2026-10-16')).state;
  const day = dayActivity(state, '2026-10-16');
  assert.equal(day.actions, 4);
  assert.equal(day.answers, 2);
  assert.equal(day.correct, 1);
  assert.equal(day.minutes, 25);
  assert.equal(day.xp, state.xp, 'the day carries all the XP earned that day');
  assert.equal(dayActivity(state, '2026-10-01').xp, 0);
});

test('activity older than 120 days is dropped', () => {
  let state = emptyState(NOW);
  for (let index = 0; index < 130; index += 1) {
    state = applyEvent(state, { type: 'card', deck: 'd' }, ctxFor(addDays('2026-01-01', index))).state;
  }
  assert.equal(Object.keys(state.activity).length, 120);
});

test('reaching the daily goal gives one notice and counts once', () => {
  let state = { ...emptyState(NOW), settings: { ...emptyState(NOW).settings, goalXp: 20 } };
  let goalNotices = 0;
  for (let index = 0; index < 6; index += 1) {
    const result = applyEvent(state, { type: 'page', path: `/docs/p${index}` }, ctxFor('2026-10-16'));
    state = result.state;
    goalNotices += result.notices.filter((notice) => notice.kind === 'goal').length;
  }
  assert.equal(goalNotices, 1);
  assert.equal(state.counters.goalsReached, 1);
});

test('lastDays is oldest first and the week summary compares seven days with the seven before', () => {
  let state = emptyState(NOW);
  state = applyEvent(state, { type: 'card', deck: 'd' }, ctxFor('2026-10-05')).state;
  state = applyEvent(state, { type: 'card', deck: 'd' }, ctxFor('2026-10-15')).state;
  state = applyEvent(state, { type: 'card', deck: 'd' }, ctxFor('2026-10-16')).state;
  const days = lastDays(state, '2026-10-16', 14);
  assert.equal(days.length, 14);
  assert.equal(days[0].day, '2026-10-03');
  assert.equal(days[13].day, '2026-10-16');
  const week = weekSummary(state, '2026-10-16');
  assert.equal(week.current.activeDays, 2);
  assert.equal(week.previous.activeDays, 1);
  assert.equal(typeof week.change, 'number');
});

test('the week strip runs Monday to Sunday and marks today and the future', () => {
  const state = applyEvent(emptyState(NOW), { type: 'card', deck: 'd' }, ctxFor('2026-10-15')).state; // a Thursday
  const dots = weekDots(state, '2026-10-16'); // a Friday
  assert.equal(dots.length, 7);
  assert.equal(dots[0].day, '2026-10-12');
  assert.equal(dots[0].label, 'M');
  assert.equal(dots.find((dot) => dot.day === '2026-10-15').active, true);
  assert.equal(dots.find((dot) => dot.day === '2026-10-16').today, true);
  assert.equal(dots.find((dot) => dot.day === '2026-10-17').future, true);
});

test('badge progress reports how far along a count is, and nothing for combined rules', () => {
  const state = { ...emptyState(NOW), counters: { pages: 4 } };
  const badge = rewards.badges.find((item) => item.id === 'reader-10');
  assert.deepEqual(badgeProgress(badge, state, { rewards, manifest: null }), { have: 4, need: 10 });
  assert.equal(badgeProgress({ id: 'x', title: '', description: '', when: { all: [] } }, state, { rewards, manifest: null }), null);
});

test('choosing a course earns the planning badge once', () => {
  const state = { ...emptyState(NOW), settings: { ...emptyState(NOW).settings, courses: ['sem3/csi243'] } };
  const first = awardBadges(state, { rewards, now: NOW, manifest: null });
  assert.ok(first.state.badges['courses-chosen']);
  assert.equal(first.notices.filter((notice) => notice.id === 'courses-chosen').length, 1);
  assert.equal(awardBadges(first.state, { rewards, now: NOW, manifest: null }).notices.length, 0);
});

test('next up follows the chosen courses, skips pages already read, and starts with the course in progress', () => {
  const manifest = {
    version: 1,
    courses: [
      { id: 'sem1/a', title: 'A', semester: 'sem1', topics: [{ id: 't', title: 'T', pages: [{ path: '/docs/sem1/a/t/notes', title: 'A notes', kind: 'notes' }] }] },
      {
        id: 'sem1/b',
        title: 'B',
        semester: 'sem1',
        topics: [{ id: 't', title: 'T', pages: [{ path: '/docs/sem1/b/t/notes', title: 'B notes', kind: 'notes' }, { path: '/docs/sem1/b/t/review', title: 'B review', kind: 'review' }] }],
      },
    ],
  };
  let state = { ...emptyState(NOW), settings: { ...emptyState(NOW).settings, courses: ['sem1/a', 'sem1/b'] } };
  assert.equal(nextUp({ ...state, settings: { ...state.settings, courses: [] } }, manifest).length, 0);
  state = applyEvent(state, { type: 'page', path: '/docs/sem1/b/t/notes' }, ctxFor('2026-10-16', { manifest })).state;
  const list = nextUp(state, manifest);
  assert.equal(list[0].page.title, 'B review', 'the course just read comes first, at its next unread page');
  assert.equal(list[1].page.title, 'A notes');
});

test('missed questions are listed per quiz with the page to go back to', () => {
  let state = emptyState(NOW);
  state = applyEvent(state, { type: 'quiz-answer', quiz: 'sem3/x/y/review#quiz', qid: 'a', choice: 0, correct: false }, ctxFor('2026-10-16')).state;
  state = applyEvent(state, { type: 'quiz-answer', quiz: 'sem3/x/y/review#quiz', qid: 'b', choice: 0, correct: true }, ctxFor('2026-10-16')).state;
  state = applyEvent(state, { type: 'quiz-answer', quiz: '/docs/sem1/z/notes#Check', qid: 'c', choice: 0, correct: false }, ctxFor('2026-10-16')).state;
  const rows = missedQuestions(state);
  assert.equal(rows.length, 2);
  assert.ok(rows.some((row) => row.path === '/docs/sem3/x/y/review' && row.missed === 1 && row.answered === 2));
  assert.ok(rows.some((row) => row.path === '/docs/sem1/z/notes'));
});

test('messages are chosen the same way all day and fill in their blanks', () => {
  const list = ['one {streak}', 'two {streak}', 'three {streak}'];
  assert.equal(pickMessage(list, 'seed', { streak: 5 }), pickMessage(list, 'seed', { streak: 5 }));
  assert.match(pickMessage(list, 'seed', { streak: 5 }), /5/);
  assert.equal(pickMessage([], 'seed'), '');
  assert.equal(quizTone(5, 5), 'perfect');
  assert.equal(quizTone(4, 5), 'strong');
  assert.equal(quizTone(3, 5), 'steady');
  assert.equal(quizTone(1, 5), 'tough');
});

test('every situation the dashboard can be in has messages, and none contain an emoji', () => {
  for (const situation of ['firstVisit', 'noStreak', 'streakDone', 'streakAtRisk', 'streakLost', 'welcomeBack', 'goalReached']) {
    assert.ok(messages.hero[situation]?.length > 0, situation);
  }
  const everything = JSON.stringify(messages);
  assert.equal(/\p{Extended_Pictographic}/u.test(everything), false);
});

test('the dashboard headline follows what is true of the reader today', () => {
  assert.equal(heroSituation(emptyState(NOW), '2026-10-16'), 'firstVisit');
  let state = applyEvent(emptyState(NOW), { type: 'page', path: '/docs/a' }, ctxFor('2026-10-10')).state;
  assert.equal(heroSituation(state, '2026-10-11'), 'streakAtRisk');
  assert.equal(heroSituation(state, '2026-10-20'), 'welcomeBack');
  state = applyEvent(state, { type: 'page', path: '/docs/b' }, ctxFor('2026-10-20')).state;
  assert.equal(heroSituation(state, '2026-10-20'), 'streakDone');
});
