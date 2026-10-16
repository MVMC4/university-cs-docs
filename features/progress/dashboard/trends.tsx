'use client';

import { useMemo, useState } from 'react';
import { addDays, lastDays, quizAccuracy } from '../core';
import { BarChart, Heatmap, shortDate, TrendChart } from '../components/charts';
import type { ProgressContext } from '../progress-provider';

const RANGES = [7, 30, 90] as const;

export function TrendsTab({ progress }: { progress: ProgressContext }) {
  const { state, today } = progress;
  const [range, setRange] = useState<(typeof RANGES)[number]>(30);

  const series = useMemo(() => {
    // Six extra days before the range, so the seven-day average is complete on the first day shown.
    const days = lastDays(state, today, range + 6);
    const shown = days.slice(6);
    const points = shown.map((day) => ({ label: shortDate(day.day), value: day.xp, title: `${shortDate(day.day)}: ${day.xp} XP` }));
    const average = shown.map((_, index) => Math.round((days.slice(index, index + 7).reduce((total, day) => total + day.xp, 0) / 7) * 10) / 10);
    const xp = shown.reduce((total, day) => total + day.xp, 0);
    const active = shown.filter((day) => day.actions > 0).length;
    const answers = shown.reduce((total, day) => total + day.answers, 0);
    const correct = shown.reduce((total, day) => total + day.correct, 0);
    const accuracy = shown
      .filter((day) => day.answers > 0)
      .map((day) => ({ label: shortDate(day.day), value: Math.round((day.correct / day.answers) * 100), title: `${shortDate(day.day)}: ${day.correct} of ${day.answers} correct` }));
    return { points, average, xp, active, answers, correct, accuracy };
  }, [state, today, range]);

  const weeks = useMemo(
    () =>
      Array.from({ length: 8 }, (_, index) => {
        const end = addDays(today, -7 * (7 - index));
        const days = lastDays(state, end, 7);
        const xp = days.reduce((total, day) => total + day.xp, 0);
        return { label: shortDate(days[0].day), value: xp, title: `Week from ${shortDate(days[0].day)}: ${xp} XP` };
      }),
    [state, today],
  );

  const xpByDay = useMemo(() => {
    const map: Record<string, number> = {};
    for (const [day, activity] of Object.entries(state.activity)) map[day] = Math.max(activity.xp, activity.actions > 0 ? 1 : 0);
    for (const day of state.days) map[day] = Math.max(map[day] ?? 0, 1);
    return map;
  }, [state.activity, state.days]);

  const accuracy = quizAccuracy(state);
  const totals = [
    { value: state.counters.pages ?? 0, label: 'pages read' },
    { value: accuracy.answered, label: accuracy.answered > 0 ? `quiz answers, ${Math.round(accuracy.fraction * 100)}% correct` : 'quiz answers' },
    { value: state.counters.cards ?? 0, label: 'flashcards turned' },
    { value: state.counters.checks ?? 0, label: 'check questions opened' },
    { value: state.counters.focusMinutes ?? 0, label: 'focus minutes' },
    { value: state.counters.goalsReached ?? 0, label: 'daily goals reached' },
    { value: state.counters.perfectQuizzes ?? 0, label: 'perfect quizzes' },
    { value: state.days.length, label: 'days studied' },
  ];

  return (
    <div className="pg-trends">
      <header className="pg-sectionhead">
        <div>
          <h2>Progress</h2>
          <p>How your studying has gone over time. Steady beats big: a little each day moves these lines up.</p>
        </div>
        <div className="pg-range" role="group" aria-label="Time range">
          {RANGES.map((value) => (
            <button key={value} type="button" aria-pressed={range === value} onClick={() => setRange(value)}>{value} days</button>
          ))}
        </div>
      </header>

      <section className="pg-panel">
        <header><h3>XP each day</h3><span className="pg-legend"><i className="pg-key-line" /> Daily <i className="pg-key-avg" /> 7-day average</span></header>
        <TrendChart
          points={series.points}
          average={series.average}
          unit="XP"
          summary={`${series.xp} XP over the last ${range} days, across ${series.active} days of study.`}
        />
      </section>

      <div className="pg-grid">
        <section className="pg-panel">
          <header><h3>Quiz accuracy</h3></header>
          {series.accuracy.length >= 2 ? (
            <TrendChart
              points={series.accuracy}
              unit="%"
              percent
              height={160}
              summary={`${series.correct} of ${series.answers} answers correct over the last ${range} days.`}
            />
          ) : (
            <p className="pg-empty">Answer quiz questions on a couple of different days and your accuracy trend appears here.</p>
          )}
        </section>
        <section className="pg-panel">
          <header><h3>Weekly XP</h3></header>
          <BarChart points={weeks} unit="XP" height={160} summary={`XP per week for the last eight weeks.`} />
        </section>
      </div>

      <section className="pg-panel">
        <header><h3>Activity</h3></header>
        <Heatmap xpByDay={xpByDay} today={today} />
        <p className="pg-note">Each square is a day, and darker means more XP. Gaps are fine; the streak freeze exists for them.</p>
      </section>

      <section className="pg-panel">
        <header><h3>Totals</h3></header>
        <div className="pg-totals">
          {totals.map((item) => (
            <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>
          ))}
        </div>
      </section>
    </div>
  );
}
