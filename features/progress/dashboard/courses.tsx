'use client';

import { ArrowRight, Check, Search } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { courseProgress, type ManifestCourse, type ProgressState } from '../core';
import { Ring } from '../components/charts';
import type { ProgressContext } from '../progress-provider';

const percent = (fraction: number) => `${Math.round(fraction * 100)}%`;

function quizStats(state: ProgressState, course: ManifestCourse) {
  let answered = 0;
  let correct = 0;
  for (const [key, answers] of Object.entries(state.quizzes)) {
    const place = key.split('#')[0];
    const path = place.startsWith('/') ? place : `/docs/${place}`;
    if (!path.startsWith(`/docs/${course.id}/`)) continue;
    for (const record of Object.values(answers)) {
      answered += 1;
      if (record.correct) correct += 1;
    }
  }
  return { answered, correct };
}

function CourseCard({ course, state }: { course: ManifestCourse; state: ProgressState }) {
  const summary = courseProgress(state, course);
  const quiz = quizStats(state, course);
  const upNext = summary.topics.flatMap((topic) => topic.pages.map((page) => ({ ...page, topic: topic.title }))).find((page) => !page.read && page.kind !== 'resources');
  const [code, ...rest] = course.title.split(':');
  return (
    <article className="pg-course">
      <div className="pg-course-top">
        <Ring value={summary.fraction} size={64} stroke={7} label={`${course.title} progress`}>
          <strong>{percent(summary.fraction)}</strong>
        </Ring>
        <div>
          <h4><Link href={`/docs/${course.id}`}>{rest.length ? rest.join(':').trim() : course.title}</Link></h4>
          <span>{rest.length ? code : course.semesterTitle}{' · '}{summary.read} of {summary.total} pages</span>
          {quiz.answered > 0 && <span>Quizzes: {quiz.answered} answered, {percent(quiz.correct / quiz.answered)} correct</span>}
        </div>
      </div>
      {upNext ? (
        <Link className="pg-next" href={upNext.path}>
          <span><small>Next</small><strong>{upNext.title}</strong><em>{upNext.topic}</em></span>
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      ) : (
        <p className="pg-done">You have read every page. Quizzes are a good way to keep it fresh.</p>
      )}
      <details>
        <summary>Topics</summary>
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

export function CoursesTab({ progress }: { progress: ProgressContext }) {
  const { state, manifest, toggleCourse, setCourses } = progress;
  const [query, setQuery] = useState('');
  const [picking, setPicking] = useState(state.settings.courses.length === 0);

  const courses = manifest?.courses ?? [];
  const chosen = courses.filter((course) => state.settings.courses.includes(course.id));
  const shown = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return needle ? courses.filter((course) => course.title.toLowerCase().includes(needle)) : courses;
  }, [courses, query]);
  const bySemester = useMemo(() => {
    const groups = new Map<string, ManifestCourse[]>();
    for (const course of shown) groups.set(course.semesterTitle ?? course.semester, [...(groups.get(course.semesterTitle ?? course.semester) ?? []), course]);
    return [...groups.entries()];
  }, [shown]);

  if (!manifest) return <p className="pg-note">Loading your courses...</p>;

  return (
    <div className="pg-coursestab">
      <header className="pg-sectionhead">
        <div>
          <h2>My courses</h2>
          <p>{chosen.length === 0 ? 'Choose the courses you are taking. Your dashboard follows them.' : `Following ${chosen.length} ${chosen.length === 1 ? 'course' : 'courses'}.`}</p>
        </div>
        <button type="button" className="pg-secondary" aria-expanded={picking} onClick={() => setPicking(!picking)}>
          {picking ? 'Done' : chosen.length === 0 ? 'Choose courses' : 'Change courses'}
        </button>
      </header>

      {picking && (
        <section className="pg-picker" aria-label="Choose your courses">
          <div className="pg-search">
            <Search size={16} aria-hidden="true" />
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search courses" aria-label="Search courses" />
            <button type="button" className="pg-link" onClick={() => setCourses(shown.map((course) => course.id))}>Select shown</button>
            <button type="button" className="pg-link" onClick={() => setCourses([])}>Clear</button>
          </div>
          {bySemester.map(([semester, list]) => (
            <div key={semester} className="pg-semester">
              <h3>{semester}</h3>
              <div className="pg-choices">
                {list.map((course) => {
                  const on = state.settings.courses.includes(course.id);
                  const summary = courseProgress(state, course);
                  return (
                    <button key={course.id} type="button" className="pg-choice" aria-pressed={on} onClick={() => toggleCourse(course.id)}>
                      <span className="pg-check" aria-hidden="true">{on && <Check size={14} />}</span>
                      <span>
                        <strong>{course.title}</strong>
                        <small>{summary.total} pages{summary.read > 0 ? ` · ${percent(summary.fraction)} read` : ''}</small>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          {bySemester.length === 0 && <p className="pg-note">No course matches that search.</p>}
        </section>
      )}

      {chosen.length > 0 ? (
        <div className="pg-coursegrid">{chosen.map((course) => <CourseCard key={course.id} course={course} state={state} />)}</div>
      ) : (
        !picking && <p className="pg-empty">You have not chosen any courses yet.</p>
      )}
    </div>
  );
}
