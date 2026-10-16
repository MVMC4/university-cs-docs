import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import {
  SCHEMA_VERSION,
  addDays,
  advanceStreak,
  applyEvent,
  catchUpBadges,
  courseProgress,
  daysBetween,
  decodeSummary,
  effectiveStreak,
  emptyState,
  encodeSummary,
  hashText,
  levelFor,
  migrate,
  normalizePath,
  parseImport,
  serialize,
  stateFromSummary,
  whenMet,
} from '../../features/progress/core.ts';

const rewards = JSON.parse(fs.readFileSync(new URL('../../content/progress/rewards.json', import.meta.url), 'utf8'));
const NOW = Date.UTC(2026, 9, 16, 9, 0, 0);
const ctxFor = (today, extra = {}) => ({ now: NOW, today, rewards, ...extra });
const rules = { freezeEveryDays: 7, maxFreezes: 2 };

test('days are counted in whole calendar days', () => {
  assert.equal(daysBetween('2026-10-15', '2026-10-16'), 1);
  assert.equal(daysBetween('2026-02-28', '2026-03-01'), 1);
  assert.equal(daysBetween('2026-10-16', '2026-10-15'), -1);
  assert.equal(addDays('2026-12-31', 1), '2027-01-01');
});

test('a streak starts, extends on the next day, and ignores a second activity on the same day', () => {
  let { streak, events } = advanceStreak(emptyState(NOW).streak, '2026-10-10', rules);
  assert.equal(streak.current, 1);
  assert.deepEqual(events, ['started']);
  ({ streak, events } = advanceStreak(streak, '2026-10-10', rules));
  assert.equal(streak.current, 1);
  assert.deepEqual(events, []);
  ({ streak } = advanceStreak(streak, '2026-10-11', rules));
  assert.equal(streak.current, 2);
  assert.equal(streak.best, 2);
});

test('missing two or more days without a freeze resets the streak but keeps the best', () => {
  const start = { current: 5, best: 5, lastDay: '2026-10-10', freezes: 0, freezesUsed: 0 };
  const { streak, events } = advanceStreak(start, '2026-10-13', rules);
  assert.equal(streak.current, 1);
  assert.equal(streak.best, 5);
  assert.deepEqual(events, ['reset']);
});

test('a freeze covers exactly one missed day, then runs out', () => {
  const start = { current: 6, best: 6, lastDay: '2026-10-10', freezes: 1, freezesUsed: 0 };
  const covered = advanceStreak(start, '2026-10-12', rules);
  assert.equal(covered.streak.current, 7);
  assert.equal(covered.streak.freezes, 1 - 1 + 1, 'one freeze used, then a new one earned at day 7');
  assert.ok(covered.events.includes('freeze-used'));
  const notCovered = advanceStreak({ ...start, freezes: 0 }, '2026-10-12', rules);
  assert.equal(notCovered.streak.current, 1);
});

test('a freeze is earned every seventh day and capped', () => {
  let streak = { current: 6, best: 6, lastDay: '2026-10-10', freezes: 2, freezesUsed: 0 };
  ({ streak } = advanceStreak(streak, '2026-10-11', rules));
  assert.equal(streak.current, 7);
  assert.equal(streak.freezes, 2, 'already at the cap');
  streak = { current: 6, best: 6, lastDay: '2026-10-10', freezes: 0, freezesUsed: 0 };
  ({ streak } = advanceStreak(streak, '2026-10-11', rules));
  assert.equal(streak.freezes, 1);
});

test('the shown streak survives a covered gap and is lost when it cannot be covered', () => {
  const s = { current: 4, best: 4, lastDay: '2026-10-10', freezes: 0, freezesUsed: 0 };
  assert.deepEqual(effectiveStreak(s, '2026-10-10'), { value: 4, status: 'done' });
  assert.deepEqual(effectiveStreak(s, '2026-10-11'), { value: 4, status: 'at-risk' });
  assert.deepEqual(effectiveStreak(s, '2026-10-13'), { value: 0, status: 'lost' });
  assert.deepEqual(effectiveStreak({ ...s, freezes: 1 }, '2026-10-12'), { value: 4, status: 'at-risk' });
});

test('reading a page awards XP and a streak once; rereading awards nothing', () => {
  const first = applyEvent(emptyState(NOW), { type: 'page', path: '/docs/sem1/csi131/01-logic/notes', title: 'Notes' }, ctxFor('2026-10-16'));
  assert.equal(first.state.xp, rewards.rules.xp.page + rewards.rules.xp.firstActivityOfDay);
  assert.equal(first.state.streak.current, 1);
  assert.equal(first.state.counters.pages, 1);
  assert.ok(first.state.badges['first-steps']);
  assert.ok(first.notices.some((n) => n.kind === 'badge' && n.id === 'first-steps'));
  const again = applyEvent(first.state, { type: 'page', path: '/docs/sem1/csi131/01-logic/notes/', title: 'Notes' }, ctxFor('2026-10-16'));
  assert.equal(again.state.xp, first.state.xp);
  assert.equal(again.state.counters.pages, 1);
  assert.equal(again.state.pages['/docs/sem1/csi131/01-logic/notes'].visits, 2);
});

test('retrying a quiz question awards no second XP', () => {
  const event = { type: 'quiz-answer', quiz: 'q', qid: 'a', choice: 1, correct: true };
  const one = applyEvent(emptyState(NOW), event, ctxFor('2026-10-16'));
  const two = applyEvent(one.state, event, ctxFor('2026-10-16'));
  assert.equal(two.state.xp, one.state.xp);
  assert.equal(two.state.quizzes.q.a.tries, 2);
});

test('the daily XP cap limits farming but not the first-activity bonus', () => {
  let state = emptyState(NOW);
  for (let index = 0; index < 400; index += 1) {
    state = applyEvent(state, { type: 'card', deck: `d${index}` }, ctxFor('2026-10-16')).state;
  }
  assert.equal(state.xp, rewards.rules.dailyXpCap + rewards.rules.xp.firstActivityOfDay);
  const nextDay = applyEvent(state, { type: 'card', deck: 'x' }, ctxFor('2026-10-17'));
  assert.ok(nextDay.state.xp > state.xp);
});

test('a perfect quiz of three or more questions is rewarded; a two-question quiz is not', () => {
  const three = applyEvent(emptyState(NOW), { type: 'quiz-complete', quiz: 'q', total: 3, correct: 3 }, ctxFor('2026-10-16'));
  assert.equal(three.state.counters.perfectQuizzes, 1);
  const two = applyEvent(emptyState(NOW), { type: 'quiz-complete', quiz: 'q', total: 2, correct: 2 }, ctxFor('2026-10-16'));
  assert.equal(two.state.counters.perfectQuizzes ?? 0, 0);
});

test('nothing is recorded while tracking is off', () => {
  const off = { ...emptyState(NOW), enabled: false };
  const result = applyEvent(off, { type: 'page', path: '/docs/x' }, ctxFor('2026-10-16'));
  assert.equal(result.state, off);
  assert.deepEqual(result.notices, []);
});

test('levels rise with XP', () => {
  assert.equal(levelFor(0, rewards.levels).level, 1);
  assert.equal(levelFor(149, rewards.levels).level, 2);
  assert.equal(levelFor(150, rewards.levels).level, 3);
  const top = levelFor(99999, rewards.levels);
  assert.equal(top.next, null);
  assert.equal(top.progress, 1);
});

test('an unknown badge rule is ignored, not fatal', () => {
  const state = emptyState(NOW);
  assert.equal(whenMet({ teleport: 'mars' }, state, { rewards }), false);
  assert.equal(whenMet('nonsense', state, { rewards }), false);
  assert.equal(whenMet({ all: [{ counter: 'pages', gte: 0 }, { novel: true }] }, state, { rewards }), false);
  assert.equal(whenMet({ any: [{ novel: true }, { counter: 'pages', gte: 0 }] }, state, { rewards }), true);
});

test('course badges need the manifest and use real page progress', () => {
  const manifest = {
    version: 1,
    courses: [{ id: 'sem1/x', title: 'X', semester: 'sem1', topics: [{ id: 't', title: 'T', pages: [{ path: '/a', title: 'a', kind: 'notes' }, { path: '/b', title: 'b', kind: 'review' }] }] }],
  };
  let state = emptyState(NOW);
  assert.equal(whenMet({ course: '*', gte: 0.5 }, state, { rewards }), false, 'no manifest');
  state = applyEvent(state, { type: 'page', path: '/a' }, ctxFor('2026-10-16', { manifest })).state;
  assert.ok(state.badges['course-half'], 'one of two pages read');
  assert.equal(courseProgress(state, manifest.courses[0]).fraction, 0.5);
  assert.equal(state.badges['course-done'], undefined);
});

test('badges earned earlier stay earned when the content or rewards change', () => {
  const state = { ...emptyState(NOW), badges: { 'retired-badge': { at: 1 } } };
  const caught = catchUpBadges(state, { rewards, now: NOW, manifest: null });
  assert.ok(caught.badges['retired-badge']);
});

test('migration fills missing fields, upgrades the old flat streak, and keeps unknown fields', () => {
  const old = { streak: 4, lastDay: '2026-10-15', xp: 120, futureField: { keep: true } };
  const state = migrate(old, NOW);
  assert.equal(state.v, SCHEMA_VERSION);
  assert.equal(state.streak.current, 4);
  assert.equal(state.streak.lastDay, '2026-10-15');
  assert.equal(state.xp, 120);
  assert.deepEqual(state.pages, {});
  assert.deepEqual(state.futureField, { keep: true });
});

test('garbage input falls back to a fresh state', () => {
  for (const bad of [null, undefined, 42, 'text', [], { days: 'nope', xp: 'many', streak: { current: 'x' } }]) {
    const state = migrate(bad, NOW);
    assert.equal(state.v, SCHEMA_VERSION);
    assert.equal(typeof state.xp, 'number');
    assert.ok(Array.isArray(state.days));
  }
});

test('paths follow the alias table and lose queries, hashes and trailing slashes', () => {
  const aliases = { '/docs/old': '/docs/new', '/docs/new': '/docs/newer' };
  assert.equal(normalizePath('/docs/old/?a=1#x', aliases), '/docs/newer');
  assert.equal(normalizePath('/docs/other/', aliases), '/docs/other');
  assert.equal(normalizePath('/', aliases), '/');
});

test('the cookie summary round-trips and restores the streak and XP', () => {
  let state = emptyState(NOW);
  state = applyEvent(state, { type: 'page', path: '/docs/a' }, ctxFor('2026-10-16')).state;
  const text = encodeSummary(state);
  const summary = decodeSummary(text);
  assert.equal(summary.current, 1);
  assert.equal(summary.lastDay, '2026-10-16');
  assert.equal(summary.xp, state.xp);
  const rebuilt = stateFromSummary(summary, NOW);
  assert.equal(rebuilt.streak.current, 1);
  assert.equal(rebuilt.xp, state.xp);
  assert.equal(decodeSummary('garbage'), null);
  assert.equal(decodeSummary('1.a.b.c.d.e.f'), null);
});

test('export then import restores the state, and a wrong file is rejected clearly', () => {
  let state = emptyState(NOW);
  state = applyEvent(state, { type: 'quiz-answer', quiz: 'q', qid: 'a', choice: 0, correct: false }, ctxFor('2026-10-16')).state;
  const restored = parseImport(serialize(state), NOW);
  assert.deepEqual(restored.quizzes, state.quizzes);
  assert.equal(restored.xp, state.xp);
  assert.throws(() => parseImport('not json', NOW), /not valid JSON/);
  assert.throws(() => parseImport('{"hello":1}', NOW), /does not look like exported progress/);
});

test('question ids are stable for the same text and differ for different text', () => {
  assert.equal(hashText('What is a pure function?'), hashText('What is a pure function?'));
  assert.notEqual(hashText('a'), hashText('b'));
});

test('resetting a quiz forgets its answers without counting as activity', () => {
  const answered = applyEvent(emptyState(NOW), { type: 'quiz-answer', quiz: 'q', qid: 'a', choice: 0, correct: true }, ctxFor('2026-10-16')).state;
  const cleared = applyEvent(answered, { type: 'quiz-reset', quiz: 'q' }, ctxFor('2026-10-17'));
  assert.equal(cleared.state.quizzes.q, undefined);
  assert.equal(cleared.state.xp, answered.xp, 'no XP for a reset');
  assert.equal(cleared.state.streak.lastDay, '2026-10-16', 'a reset does not extend the streak');
  assert.equal(cleared.state.counters.quizAnswers, 1, 'the earlier answer still counts in the totals');
});
