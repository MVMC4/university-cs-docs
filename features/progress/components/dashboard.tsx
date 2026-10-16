'use client';

import { Download, Flame, ShieldCheck, Upload } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import {
  addDays,
  courseProgress,
  quizAccuracy,
  type ManifestCourse,
  type ProgressState,
} from '../core';
import { badgeIcon } from '../icons';
import { rewards, useProgress } from '../progress-provider';

const WEEKS = 17;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const percent = (fraction: number) => `${Math.round(fraction * 100)}%`;

function Bar({ fraction, label }: { fraction: number; label: string }) {
  const value = Math.max(0, Math.min(1, fraction));
  return (
    <div className="pg-bar" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(value * 100)}>
      <div style={{ width: `${value * 100}%` }} />
    </div>
  );
}

function weekdayIndex(key: string) {
  const [year, month, day] = key.split('-').map(Number);
  return (new Date(Date.UTC(year, month - 1, day)).getUTCDay() + 6) % 7; // Monday = 0
}

function Calendar({ days, today }: { days: string[]; today: string }) {
  const active = new Set(days);
  const start = addDays(today, -(WEEKS - 1) * 7 - weekdayIndex(today));
  const cells: { key: string; future: boolean }[] = [];
  for (let index = 0; index < WEEKS * 7; index += 1) {
    const key = addDays(start, index);
    cells.push({ key, future: key > today });
  }
  const label = (key: string) => {
    const [, month, day] = key.split('-').map(Number);
    return `${day} ${MONTHS[month - 1]}`;
  };
  return (
    <div className="pg-calendar" role="img" aria-label={`Study days over the last ${WEEKS} weeks: ${days.filter((day) => day >= start).length} days studied`}>
      {cells.map((cell) => (
        <span
          key={cell.key}
          className="pg-cell"
          data-active={active.has(cell.key) || undefined}
          data-future={cell.future || undefined}
          data-today={cell.key === today || undefined}
          title={cell.future ? undefined : `${label(cell.key)}${active.has(cell.key) ? ': studied' : ''}`}
        />
      ))}
    </div>
  );
}

function CourseCard({ course, state }: { course: ManifestCourse; state: ProgressState }) {
  const summary = courseProgress(state, course);
  return (
    <article className="pg-course">
      <header>
        <h4><Link href={`/docs/${course.id}`}>{course.title}</Link></h4>
        <span>{summary.read} of {summary.total} pages</span>
      </header>
      <Bar fraction={summary.fraction} label={`${course.title} progress`} />
      <details>
        <summary>{percent(summary.fraction)} read. Show topics</summary>
        <ul className="pg-topics">
          {summary.topics.map((topic) => (
            <li key={topic.id}>
              <span>{topic.title}</span>
              <span className="pg-dots" aria-label={`${topic.read} of ${topic.pages.length} pages read`}>
                {topic.pages.map((page) => (
                  <Link key={page.path} href={page.path} data-read={page.read || undefined} title={`${page.title}${page.read ? ': read' : ''}`} aria-label={`${page.title}${page.read ? ' (read)' : ''}`} />
                ))}
              </span>
            </li>
          ))}
        </ul>
      </details>
    </article>
  );
}

function Courses({ courses, state }: { courses: ManifestCourse[]; state: ProgressState }) {
  const bySemester = new Map<string, ManifestCourse[]>();
  for (const course of courses) {
    const list = bySemester.get(course.semester) ?? [];
    list.push(course);
    bySemester.set(course.semester, list);
  }
  const accuracy = quizAccuracy(state);
  return (
    <section className="pg-section">
      <h2>Your courses</h2>
      <p className="pg-note">
        A page counts as read after you spend a few seconds on it.
        {accuracy.answered > 0 && ` Quiz questions answered: ${accuracy.answered}, ${percent(accuracy.fraction)} correct.`}
      </p>
      {[...bySemester.entries()].map(([semester, list]) => (
        <div key={semester} className="pg-semester">
          <h3>{list[0].semesterTitle ?? semester}</h3>
          <div className="pg-courses">{list.map((course) => <CourseCard key={course.id} course={course} state={state} />)}</div>
        </div>
      ))}
    </section>
  );
}

function Badges({ state }: { state: ProgressState }) {
  const earned = rewards.badges.filter((badge) => state.badges[badge.id]).sort((a, b) => state.badges[b.id].at - state.badges[a.id].at);
  const locked = rewards.badges.filter((badge) => !state.badges[badge.id]);
  const date = (ms: number) => new Date(ms).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
  return (
    <section className="pg-section">
      <h2>Badges</h2>
      <p className="pg-note">{earned.length} of {rewards.badges.length} earned.</p>
      <ul className="pg-badges">
        {[...earned, ...locked].map((badge) => {
          const Icon = badgeIcon(badge.icon);
          const got = state.badges[badge.id];
          return (
            <li key={badge.id} data-earned={got ? true : undefined}>
              <span className="pg-badge-icon" aria-hidden="true"><Icon size={20} /></span>
              <div>
                <strong>{badge.title}</strong>
                <span>{badge.description}</span>
                {got && <small>Earned {date(got.at)}</small>}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function DataPanel() {
  const progress = useProgress();
  const fileInput = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');
  if (!progress) return null;
  const { state, setEnabled, setToasts, reset, exportJson, importJson } = progress;

  const download = () => {
    const blob = new Blob([exportJson()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `university-docs-progress-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setMessage('Exported. Keep the file somewhere safe.');
  };

  const upload = async (file: File | undefined) => {
    if (!file) return;
    try {
      importJson(await file.text());
      setMessage('Imported. Your progress has been restored.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'That file could not be imported.');
    }
    if (fileInput.current) fileInput.current.value = '';
  };

  return (
    <section className="pg-section">
      <h2>Your data</h2>
      <p className="pg-note">
        Progress is saved in this browser only, in local storage and in one small cookie (<code>ucd_progress</code>) that keeps your streak and level. Nothing is sent to a server.
        Clearing site data removes the history, so export a copy if you want to keep it or move to another device.
      </p>
      <div className="pg-data">
        <label><input type="checkbox" checked={state.enabled} onChange={(event) => setEnabled(event.target.checked)} /> Save my progress in this browser</label>
        <label><input type="checkbox" checked={state.settings.toasts} onChange={(event) => setToasts(event.target.checked)} /> Show a notice when I earn a badge or level</label>
        <div className="pg-actions">
          <button type="button" className="ui-btn ui-btn-sm" onClick={download}><Download size={15} /> Export</button>
          <button type="button" className="ui-btn ui-btn-sm" onClick={() => fileInput.current?.click()}><Upload size={15} /> Import</button>
          <input ref={fileInput} type="file" accept="application/json,.json" hidden onChange={(event) => upload(event.target.files?.[0])} />
          <button
            type="button"
            className="ui-btn ui-btn-sm"
            onClick={() => {
              if (window.confirm('Clear your streak, level, badges and history from this browser? Export first if you want a copy.')) {
                reset();
                setMessage('Progress cleared.');
              }
            }}
          >
            Reset
          </button>
        </div>
        <p className="pg-message" aria-live="polite">{message}</p>
      </div>
    </section>
  );
}

/** The learner's dashboard: streak, level, badges and progress through every course, all from this browser. */
export function ProgressDashboard() {
  const progress = useProgress();
  if (!progress || !progress.ready) {
    return <p className="pg-note" aria-live="polite">Loading your progress...</p>;
  }
  const { state, streak, level, today, manifest } = progress;
  const studiedToday = state.days.includes(today);
  const streakText = {
    none: 'Study today to start a streak.',
    done: 'You have studied today. Come back tomorrow to keep it going.',
    'at-risk': state.streak.freezes > 0 && state.streak.lastDay !== null
      ? 'Study today to keep your streak. A freeze can cover one missed day.'
      : 'Study today to keep your streak.',
    lost: 'Your streak ended. Study today to start a new one.',
  }[streak.status];

  return (
    <div className="pg">
      {!state.enabled && <p className="pg-off">Progress tracking is off, so nothing new is being recorded. You can turn it on under Your data.</p>}

      <div className="pg-summary">
        <section className="pg-card">
          <span className="pg-label">Level {level.level}</span>
          <strong className="pg-big">{level.title}</strong>
          <Bar fraction={level.progress} label="Progress to the next level" />
          <small>{state.xp} XP{level.next ? `. ${level.next.xp - state.xp} to level ${level.next.level}` : '. Top level reached'}</small>
        </section>
        <section className="pg-card" data-status={streak.status}>
          <span className="pg-label"><Flame size={14} aria-hidden="true" /> Streak</span>
          <strong className="pg-big">{streak.value} {streak.value === 1 ? 'day' : 'days'}</strong>
          <small>{streakText}</small>
          <small>
            Best {state.streak.best}
            {' · '}
            <ShieldCheck size={13} aria-hidden="true" /> {state.streak.freezes} {state.streak.freezes === 1 ? 'freeze' : 'freezes'}
          </small>
        </section>
        <section className="pg-card">
          <span className="pg-label">Study days</span>
          <strong className="pg-big">{state.days.length}</strong>
          <small>{studiedToday ? 'Today counts.' : 'Nothing counted yet today.'}</small>
          {state.last && <small>Continue: <Link href={state.last.path}>{state.last.title || state.last.path}</Link></small>}
        </section>
      </div>

      <section className="pg-section">
        <h2>Activity</h2>
        <Calendar days={state.days} today={today} />
        <p className="pg-note">Each square is a day. A day counts when you read a page, answer a quiz question, turn a flashcard or open a check question.</p>
      </section>

      {manifest ? <Courses courses={manifest.courses} state={state} /> : <p className="pg-note">Loading your courses...</p>}
      <Badges state={state} />
      <DataPanel />
    </div>
  );
}
