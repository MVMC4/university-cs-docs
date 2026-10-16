'use client';

import { ArrowRight, Flame, ListChecks, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import {
  badgeProgress,
  dayActivity,
  heroSituation,
  lastDays,
  missedQuestions,
  nextUp,
  pickMessage,
  timeOfDay,
  weekDots,
  weekSummary,
} from '../core';
import { BadgeArt } from '../components/badge-art';
import { BarChart, Ring, shortDate } from '../components/charts';
import { messages, rewards, type ProgressContext } from '../progress-provider';
import type { TabId } from './dashboard';

type Props = { progress: ProgressContext; go: (tab: TabId) => void };

const STREAK_LINE = {
  none: 'No streak yet',
  done: 'Safe for today',
  'at-risk': 'Study today to keep it',
  lost: 'Start a new one today',
} as const;

export function Overview({ progress, go }: Props) {
  const { state, streak, level, today, manifest } = progress;
  const goal = state.settings.goalXp;
  const todayXp = dayActivity(state, today).xp;
  const name = state.settings.name.trim();

  const situation = heroSituation(state, today);
  const hour = new Date().getHours();
  const greeting = pickMessage(messages.greeting[timeOfDay(hour)], today);
  const headline = `${greeting}${name ? `, ${name}` : ''}.`;
  const sub = pickMessage(messages.hero[situation], `${today}:${situation}`, { streak: state.streak.current, name });

  const week = weekSummary(state, today);
  const dots = weekDots(state, today);
  const weekMessage = (() => {
    if (week.current.xp === 0 && week.previous.xp === 0) return '';
    if (week.change === null) return pickMessage(messages.week.first, today);
    if (week.change > 5) return pickMessage(messages.week.up, today, { pct: week.change });
    if (week.change < -5) return pickMessage(messages.week.down, today);
    return pickMessage(messages.week.same, today);
  })();
  const sevenDays = lastDays(state, today, 7).map((day) => ({ label: shortDate(day.day).split(' ')[0], value: day.xp, title: `${shortDate(day.day)}: ${day.xp} XP` }));

  const next = nextUp(state, manifest, 3);
  const missed = missedQuestions(state).slice(0, 4);

  const earned = rewards.badges.filter((badge) => state.badges[badge.id]);
  const latest = [...earned].sort((a, b) => state.badges[b.id].at - state.badges[a.id].at)[0];
  const close = rewards.badges
    .filter((badge) => !state.badges[badge.id])
    .map((badge) => ({ badge, progress: badgeProgress(badge, state, { rewards, manifest }) }))
    .filter((item): item is { badge: (typeof rewards.badges)[number]; progress: { have: number; need: number } } => item.progress !== null && item.progress.have > 0)
    .sort((a, b) => b.progress.have / b.progress.need - a.progress.have / a.progress.need)
    .slice(0, 3);

  const reached = goal > 0 && todayXp >= goal;
  const noCourses = state.settings.courses.length === 0;

  return (
    <div className="pg-overview">
      <section className="pg-hero">
        <div className="pg-hero-copy">
          <span className="pg-kicker">Your dashboard</span>
          <h2>{headline}</h2>
          <p>{sub}</p>
          <div className="pg-hero-actions">
            {state.last ? (
              <Link className="pg-primary" href={state.last.path}>
                Continue: {state.last.title || 'where you left off'} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            ) : (
              <button type="button" className="pg-primary" onClick={() => go('courses')}>
                Choose your courses <ArrowRight size={16} aria-hidden="true" />
              </button>
            )}
            {missed.length > 0 ? (
              <Link className="pg-secondary" href={missed[0].path}>Revisit missed questions</Link>
            ) : next.length > 0 ? (
              <Link className="pg-secondary" href={next[0].page.path}>Start the next page</Link>
            ) : null}
          </div>
        </div>

        <aside className="pg-today" aria-label="Today">
          <span className="pg-kicker">Today</span>
          <div className="pg-today-main">
            <Ring value={goal > 0 ? todayXp / goal : 0} size={112} stroke={11} label="Progress to your daily goal">
              <strong>{todayXp}</strong>
              <small>of {goal} XP</small>
            </Ring>
            <div className="pg-today-text">
              <strong>{reached ? 'Goal reached' : 'Daily goal'}</strong>
              <span>{reached ? 'Anything more is a bonus.' : `${Math.max(0, goal - todayXp)} XP to go`}</span>
              <span className="pg-streakline" data-status={streak.status}><Flame size={14} aria-hidden="true" /> {streak.value}-day streak. {STREAK_LINE[streak.status]}</span>
            </div>
          </div>
          <div className="pg-weekdots" role="img" aria-label={`This week: ${dots.filter((dot) => dot.active).length} of 7 days studied`}>
            {dots.map((dot) => (
              <span key={dot.day} data-active={dot.active || undefined} data-today={dot.today || undefined} data-future={dot.future || undefined}>
                <i />
                {dot.label}
              </span>
            ))}
          </div>
        </aside>
      </section>

      <div className="pg-stats">
        <div><strong>{streak.value}</strong><span>day streak</span><small>Best {state.streak.best}</small></div>
        <div><strong>Level {level.level}</strong><span>{level.title}</span><small>{level.next ? `${level.next.xp - state.xp} XP to level ${level.next.level}` : 'Top level'}</small></div>
        <div><strong>{state.days.length}</strong><span>days studied</span><small>{state.counters.pages ?? 0} pages read</small></div>
        <div><strong>{earned.length}</strong><span>of {rewards.badges.length} badges</span><small>{latest ? `Latest: ${latest.title}` : 'Earn your first'}</small></div>
      </div>

      <div className="pg-grid">
        <section className="pg-panel">
          <header><h3>Next up</h3>{!noCourses && <button type="button" className="pg-link" onClick={() => go('courses')}>My courses</button>}</header>
          {noCourses ? (
            <div className="pg-empty">
              <p>Choose the courses you are taking and this panel will line up the next page for each.</p>
              <button type="button" className="pg-secondary" onClick={() => go('courses')}>Choose your courses</button>
            </div>
          ) : next.length === 0 ? (
            <p className="pg-empty">You have read every page in your chosen courses. Revisit a quiz to keep it fresh.</p>
          ) : (
            <ul className="pg-list">
              {next.map(({ course, page, topic }) => (
                <li key={course.id}>
                  <Link href={page.path}>
                    <strong>{page.title}</strong>
                    <span>{course.title.split(':')[0]} · {topic}</span>
                  </Link>
                  <ArrowRight size={16} aria-hidden="true" />
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="pg-panel">
          <header><h3>This week</h3><button type="button" className="pg-link" onClick={() => go('progress')}>See trends</button></header>
          {week.current.xp > 0 || week.previous.xp > 0 ? (
            <>
              <p className="pg-weekmsg">{weekMessage}</p>
              <BarChart points={sevenDays} unit="XP" summary={`XP over the last seven days: ${week.current.xp} in total.`} height={130} />
              <div className="pg-miniStats">
                <span><strong>{week.current.xp}</strong> XP</span>
                <span><strong>{week.current.activeDays}</strong> days studied</span>
                <span><strong>{week.current.answers}</strong> answers</span>
                <span><strong>{week.current.minutes}</strong> focus min</span>
              </div>
            </>
          ) : (
            <p className="pg-empty">Nothing yet this week. Read a page or answer a question and your week appears here.</p>
          )}
        </section>

        <section className="pg-panel">
          <header><h3>Badges you are close to</h3><button type="button" className="pg-link" onClick={() => go('badges')}>All badges</button></header>
          {close.length === 0 ? (
            <p className="pg-empty">{earned.length === 0 ? 'Read a page or answer a question and your first badge is not far away.' : 'Keep studying and your next badges will show up here.'}</p>
          ) : (
            <ul className="pg-close">
              {close.map(({ badge, progress: p }) => (
                <li key={badge.id}>
                  <BadgeArt badge={badge} earned={false} size={52} />
                  <div>
                    <strong>{badge.title}</strong>
                    <span>{badge.description}</span>
                    <div className="pg-bar" role="progressbar" aria-label={badge.title} aria-valuemin={0} aria-valuemax={p.need} aria-valuenow={p.have}><div style={{ width: `${(p.have / p.need) * 100}%` }} /></div>
                    <small>{p.have} of {p.need}</small>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="pg-panel">
          <header><h3>Questions to revisit</h3></header>
          {missed.length === 0 ? (
            <p className="pg-empty">Nothing to revisit. Questions you miss will collect here so you can retry them.</p>
          ) : (
            <ul className="pg-list">
              {missed.map((row) => (
                <li key={row.key}>
                  <Link href={row.path}>
                    <strong>{row.missed} {row.missed === 1 ? 'question' : 'questions'} to retry</strong>
                    <span>{row.path.replace('/docs/', '').split('/').slice(1, 4).join(' · ')}</span>
                  </Link>
                  <ListChecks size={16} aria-hidden="true" />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {state.streak.freezes > 0 && (
        <p className="pg-freeze"><ShieldCheck size={15} aria-hidden="true" /> You have {state.streak.freezes} streak {state.streak.freezes === 1 ? 'freeze' : 'freezes'}. A freeze covers one missed day automatically.</p>
      )}
    </div>
  );
}
