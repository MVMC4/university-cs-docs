'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Check, ChevronLeft, ChevronRight, RotateCcw, X } from 'lucide-react';
import { hashText } from '@/features/progress/core';
import { useProgress, useRecord } from '@/features/progress';
import { MathText } from './math-text';

type Level = 'foundation' | 'developing' | 'exam';

type Question = {
  /** A stable id. Without one, an id is derived from the question text. */
  id?: string;
  question: string;
  /** Optional program or snippet shown in a code block beneath the question text. */
  code?: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  /** Optional per-option feedback, same length/order as `options`. Shown for whichever option the student picked. */
  optionFeedback?: string[];
  /** The topic or section; the chooser lets a reader pick groups. */
  group?: string;
  level?: Level;
  /** A short worked solution shown after answering. */
  steps?: string[];
  /** Where the question comes from, for example a past paper and question number. */
  source?: string;
};

type Prepared = Question & { qid: string; groupName: string };

/** Renders `inline code` spans as <code> and passes everything else through MathText. */
const RichText = ({ text }: { text: string }) => {
  const parts = text.split(/(`[^`\n]+`)/g);
  return (
    <>
      {parts.map((part, index) =>
        part.length > 2 && part.startsWith('`') && part.endsWith('`') ? (
          <code key={index}>{part.slice(1, -1)}</code>
        ) : (
          <MathText key={index} text={part} />
        ),
      )}
    </>
  );
};

/** Quizzes with at least this many questions open with the chooser; shorter ones start straight away. */
const CHOOSER_MIN = 6;
const LEVELS: { id: Level; label: string }[] = [
  { id: 'foundation', label: 'Foundation' },
  { id: 'developing', label: 'Developing' },
  { id: 'exam', label: 'Exam-style' },
];
const levelLabel = (level: Level) => LEVELS.find((item) => item.id === level)?.label ?? level;
const DEFAULT_GROUP = 'All questions';

type Which = 'all' | 'new' | 'missed';
type Mode = 'focus' | 'list';
type Phase = 'choose' | 'run' | 'done';
type Config = { groups: string[]; levels: Level[]; which: Which; count: number; shuffle: boolean; mode: Mode };

function prepare(questions: Question[]): Prepared[] {
  const seen = new Set<string>();
  return questions.map((question, index) => {
    let qid = question.id ?? hashText(`${question.question}|${question.options.join('|')}`);
    if (seen.has(qid)) qid = `${qid}-${index}`;
    seen.add(qid);
    return { ...question, qid, groupName: question.group ?? DEFAULT_GROUP };
  });
}

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[other]] = [copy[other], copy[index]];
  }
  return copy;
}

type QuizProps = {
  title?: string;
  questions?: Question[];
  /** Identifies this quiz in saved progress. QuizRef sets it; otherwise the page path and title are used. */
  quizKey?: string;
};

/** The one multiple-choice quiz used on review pages in every course. */
export function Quiz({ title = 'Knowledge check', questions = [], quizKey }: QuizProps) {
  const pathname = usePathname();
  const progress = useProgress();
  const record = useRecord();
  const key = quizKey ?? `${pathname}#${title}`;
  const prepared = useMemo(() => prepare(questions), [questions]);
  const stored = progress?.state.quizzes[key];
  const chooser = prepared.length >= CHOOSER_MIN;

  const groups = useMemo(() => [...new Set(prepared.map((question) => question.groupName))], [prepared]);
  const levels = useMemo(() => LEVELS.filter((item) => prepared.some((question) => question.level === item.id)).map((item) => item.id), [prepared]);

  const [phase, setPhase] = useState<Phase>(chooser ? 'choose' : 'run');
  const [config, setConfig] = useState<Config>({ groups, levels, which: 'all', count: 0, shuffle: false, mode: 'focus' });
  const [deck, setDeck] = useState<Prepared[]>(() => (chooser ? [] : prepared));
  const [mode, setMode] = useState<Mode>(chooser ? 'focus' : 'list');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [position, setPosition] = useState(0);
  const [run, setRun] = useState(1);
  const reported = useRef(0);

  // Tell the progress system once per run when the results are shown.
  useEffect(() => {
    if (phase !== 'done' || reported.current === run) return;
    reported.current = run;
    const correct = deck.filter((question) => revealed[question.qid] && answers[question.qid] === question.correctIndex).length;
    record({ type: 'quiz-complete', quiz: key, total: deck.length, correct });
  }, [phase, run, deck, revealed, answers, key, record]);

  if (questions.length === 0) {
    return (
      <section className="ui-quiz">
        <header className="ui-quiz-head"><h3>{title}</h3></header>
        <p className="ui-quiz-empty">No questions for this section yet.</p>
      </section>
    );
  }

  const isCorrect = (question: Prepared) => answers[question.qid] === question.correctIndex;

  /* ───── the chooser ───── */

  const matching = prepared.filter((question) => {
    if (!config.groups.includes(question.groupName)) return false;
    if (question.level && levels.length > 1 && !config.levels.includes(question.level)) return false;
    const saved = stored?.[question.qid];
    if (config.which === 'new') return !saved;
    if (config.which === 'missed') return saved !== undefined && !saved.correct;
    return true;
  });
  const selectedCount = config.count > 0 ? Math.min(config.count, matching.length) : matching.length;
  const answeredBefore = prepared.filter((question) => stored?.[question.qid]).length;
  const correctBefore = prepared.filter((question) => stored?.[question.qid]?.correct).length;
  const missedBefore = answeredBefore - correctBefore;

  const start = (list: Prepared[], runMode: Mode) => {
    setDeck(list);
    setMode(runMode);
    setAnswers({});
    setRevealed({});
    setPosition(0);
    setRun((value) => value + 1);
    setPhase('run');
  };

  const begin = () => {
    const ordered = config.shuffle ? shuffled(matching) : matching;
    start(config.count > 0 ? ordered.slice(0, config.count) : ordered, config.mode);
  };

  const toggle = <T,>(list: T[], value: T) => (list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);

  if (phase === 'choose') {
    const whichCounts: Record<Which, number> = {
      all: prepared.length,
      new: prepared.length - answeredBefore,
      missed: missedBefore,
    };
    const counts = [5, 10, 20, 30, 50].filter((count) => count < matching.length);
    return (
      <section className="ui-quiz qz">
        <header className="ui-quiz-head">
          <h3>{title}</h3>
          <span className="ui-quiz-stats">
            {prepared.length} questions{answeredBefore > 0 ? ` · ${answeredBefore} answered · ${correctBefore} correct` : ''}
          </span>
        </header>

        <div className="qz-chooser">
          {groups.length > 1 && (
            <fieldset>
              <legend>
                Topics
                <button type="button" className="qz-link" onClick={() => setConfig({ ...config, groups })}>All</button>
                <button type="button" className="qz-link" onClick={() => setConfig({ ...config, groups: [] })}>None</button>
              </legend>
              <div className="qz-chips">
                {groups.map((group) => {
                  const inGroup = prepared.filter((question) => question.groupName === group);
                  const done = inGroup.filter((question) => stored?.[question.qid]).length;
                  return (
                    <button
                      key={group}
                      type="button"
                      className="qz-chip"
                      aria-pressed={config.groups.includes(group)}
                      onClick={() => setConfig({ ...config, groups: toggle(config.groups, group) })}
                    >
                      {group}
                      <span>{done}/{inGroup.length}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          {levels.length > 1 && (
            <fieldset>
              <legend>Level</legend>
              <div className="qz-chips">
                {levels.map((level) => (
                  <button
                    key={level}
                    type="button"
                    className="qz-chip"
                    aria-pressed={config.levels.includes(level)}
                    onClick={() => setConfig({ ...config, levels: toggle(config.levels, level) })}
                  >
                    {levelLabel(level)}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          <fieldset>
            <legend>Which questions</legend>
            <div className="qz-chips" role="radiogroup" aria-label="Which questions">
              {([['all', 'All'], ['new', 'Not answered yet'], ['missed', 'Missed before']] as [Which, string][]).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  className="qz-chip"
                  aria-checked={config.which === value}
                  disabled={value !== 'all' && whichCounts[value] === 0}
                  onClick={() => setConfig({ ...config, which: value })}
                >
                  {label}
                  <span>{whichCounts[value]}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <div className="qz-row">
            <label>
              How many
              <select value={config.count} onChange={(event) => setConfig({ ...config, count: Number(event.target.value) })}>
                <option value={0}>All matching</option>
                {counts.map((count) => <option key={count} value={count}>{count}</option>)}
              </select>
            </label>
            <label>
              Order
              <select value={config.shuffle ? 'shuffled' : 'written'} onChange={(event) => setConfig({ ...config, shuffle: event.target.value === 'shuffled' })}>
                <option value="written">As written</option>
                <option value="shuffled">Shuffled</option>
              </select>
            </label>
            <label>
              Mode
              <select value={config.mode} onChange={(event) => setConfig({ ...config, mode: event.target.value as Mode })}>
                <option value="focus">One at a time</option>
                <option value="list">All on one page</option>
              </select>
            </label>
          </div>
        </div>

        <footer className="ui-quiz-foot">
          <span className="ui-quiz-stats" aria-live="polite">{selectedCount} {selectedCount === 1 ? 'question' : 'questions'} selected</span>
          <span className="qz-actions">
            {answeredBefore > 0 && (
              <button type="button" className="ui-btn ui-btn-sm" onClick={() => record({ type: 'quiz-reset', quiz: key })}>Clear saved answers</button>
            )}
            <button type="button" className="ui-btn ui-btn-primary ui-btn-sm" disabled={selectedCount === 0} onClick={begin}>Start</button>
          </span>
        </footer>
      </section>
    );
  }

  /* ───── answering ───── */

  const reveal = (question: Prepared, choice: number) => {
    if (revealed[question.qid]) return;
    setAnswers((previous) => ({ ...previous, [question.qid]: choice }));
    setRevealed((previous) => ({ ...previous, [question.qid]: true }));
    record({ type: 'quiz-answer', quiz: key, qid: question.qid, choice, correct: choice === question.correctIndex });
  };

  const pick = (question: Prepared, choice: number) => {
    if (revealed[question.qid]) return;
    if (mode === 'list') reveal(question, choice);
    else setAnswers((previous) => ({ ...previous, [question.qid]: choice }));
  };

  const optionState = (question: Prepared, optionIndex: number) => {
    if (!revealed[question.qid]) return answers[question.qid] === optionIndex ? 'selected' : 'idle';
    if (optionIndex === question.correctIndex) return 'correct';
    if (answers[question.qid] === optionIndex) return 'wrong';
    return 'dim';
  };

  const meta = (question: Prepared) => (
    <div className="qz-meta">
      {groups.length > 1 && <span>{question.groupName}</span>}
      {question.level && <span className="qz-level" data-level={question.level}>{levelLabel(question.level)}</span>}
      {question.source && <span className="qz-source">Source: {question.source}</span>}
    </div>
  );

  const options = (question: Prepared, index: number) => (
    <div className="ui-quiz-options" role="radiogroup" aria-label={`Question ${index + 1}`}>
      {question.options.map((option, optionIndex) => {
        const state = optionState(question, optionIndex);
        return (
          <button
            key={optionIndex}
            type="button"
            role="radio"
            aria-checked={answers[question.qid] === optionIndex}
            className="ui-quiz-option"
            data-state={state}
            onClick={() => pick(question, optionIndex)}
            disabled={Boolean(revealed[question.qid])}
          >
            <span><RichText text={option} /></span>
            {state === 'correct' && <Check size={16} aria-label="Correct answer" />}
            {state === 'wrong' && <X size={16} aria-label="Your answer" />}
          </button>
        );
      })}
    </div>
  );

  const feedback = (question: Prepared) => {
    if (!revealed[question.qid]) return null;
    const right = isCorrect(question);
    const note = right ? question.explanation : question.optionFeedback?.[answers[question.qid]] || question.explanation;
    return (
      <div className="ui-quiz-feedback" data-correct={right || undefined}>
        <strong>{right ? 'Correct.' : 'Not quite.'}</strong>
        {note && <> <RichText text={note} /></>}
        {!right && question.explanation && question.optionFeedback?.[answers[question.qid]] && (
          <p className="qz-answer"><strong>Answer:</strong> <RichText text={question.explanation} /></p>
        )}
        {question.steps && question.steps.length > 0 && (
          <ol className="qz-steps">{question.steps.map((step, stepIndex) => <li key={stepIndex}><RichText text={step} /></li>)}</ol>
        )}
        {question.optionFeedback && (
          <details className="qz-why">
            <summary>Why each option is right or wrong</summary>
            <ul>
              {question.optionFeedback.map((text, optionIndex) => (
                <li key={optionIndex}><strong>{String.fromCharCode(65 + optionIndex)}.</strong> <RichText text={text} /></li>
              ))}
            </ul>
          </details>
        )}
      </div>
    );
  };

  const answeredCount = deck.filter((question) => revealed[question.qid]).length;
  const correctCount = deck.filter((question) => revealed[question.qid] && isCorrect(question)).length;

  /* ───── results ───── */

  if (phase === 'done') {
    const missed = deck.filter((question) => revealed[question.qid] && !isCorrect(question));
    const breakdown = (labelOf: (question: Prepared) => string | undefined) => {
      const rows = new Map<string, { total: number; right: number }>();
      for (const question of deck) {
        const label = labelOf(question);
        if (!label) continue;
        const row = rows.get(label) ?? { total: 0, right: 0 };
        row.total += 1;
        if (revealed[question.qid] && isCorrect(question)) row.right += 1;
        rows.set(label, row);
      }
      return [...rows.entries()];
    };
    const byGroup = groups.length > 1 ? breakdown((question) => question.groupName) : [];
    const byLevel = levels.length > 1 ? breakdown((question) => (question.level ? levelLabel(question.level) : undefined)) : [];
    const fraction = deck.length ? correctCount / deck.length : 0;
    return (
      <section className="ui-quiz qz">
        <header className="ui-quiz-head">
          <h3>{title}</h3>
          <span className="ui-quiz-stats">Score {correctCount} / {deck.length}</span>
        </header>
        <div className="qz-result">
          <p className="ui-quiz-score" data-perfect={correctCount === deck.length || undefined}>
            {correctCount === deck.length
              ? 'All correct.'
              : `${correctCount} of ${deck.length} correct (${Math.round(fraction * 100)}%).${answeredCount < deck.length ? ` ${deck.length - answeredCount} not answered.` : ''}`}
          </p>
          {[{ label: 'By topic', rows: byGroup }, { label: 'By level', rows: byLevel }].map(({ label, rows }) =>
            rows.length > 1 ? (
              <div key={label} className="qz-breakdown">
                <h4>{label}</h4>
                {rows.map(([name, row]) => (
                  <div key={name} className="qz-brow">
                    <span>{name}</span>
                    <div className="pg-bar" role="progressbar" aria-label={name} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round((row.right / row.total) * 100)}>
                      <div style={{ width: `${(row.right / row.total) * 100}%` }} />
                    </div>
                    <span>{row.right}/{row.total}</span>
                  </div>
                ))}
              </div>
            ) : null,
          )}
        </div>
        <footer className="ui-quiz-foot">
          <span />
          <span className="qz-actions">
            {missed.length > 0 && <button type="button" className="ui-btn ui-btn-primary ui-btn-sm" onClick={() => start(missed, mode)}><RotateCcw size={15} /> Retry the {missed.length} missed</button>}
            {chooser ? (
              <button type="button" className="ui-btn ui-btn-sm" onClick={() => setPhase('choose')}>Choose questions</button>
            ) : (
              <button type="button" className="ui-btn ui-btn-sm" onClick={() => start(prepared, 'list')}><RotateCcw size={15} /> Try again</button>
            )}
          </span>
        </footer>
      </section>
    );
  }

  /* ───── running: one at a time ───── */

  if (mode === 'focus') {
    const question = deck[Math.min(position, deck.length - 1)];
    const done = revealed[question.qid];
    const last = position >= deck.length - 1;
    return (
      <section
        className="ui-quiz qz"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          const number = Number(event.key);
          if (number >= 1 && number <= question.options.length) pick(question, number - 1);
          if (event.key === 'Enter') {
            if (!done && answers[question.qid] !== undefined) reveal(question, answers[question.qid]);
            else if (done) last ? setPhase('done') : setPosition(position + 1);
          }
        }}
      >
        <header className="ui-quiz-head">
          <h3>{title}</h3>
          <span className="ui-quiz-stats">Question {position + 1} of {deck.length}</span>
        </header>
        <div className="qz-progress" aria-hidden="true"><div style={{ width: `${((position + (done ? 1 : 0)) / deck.length) * 100}%` }} /></div>
        <div className="qz-focus">
          {meta(question)}
          <p className="ui-quiz-prompt qz-prompt"><RichText text={question.question} /></p>
          {question.code && <pre className="ui-quiz-code"><code>{question.code}</code></pre>}
          {options(question, position)}
          {feedback(question)}
        </div>
        <footer className="ui-quiz-foot">
          <button type="button" className="ui-btn ui-btn-sm" disabled={position === 0} onClick={() => setPosition(position - 1)}><ChevronLeft size={15} /> Previous</button>
          <span className="ui-quiz-stats">{answeredCount} answered · {correctCount} correct</span>
          {!done ? (
            <button type="button" className="ui-btn ui-btn-primary ui-btn-sm" disabled={answers[question.qid] === undefined} onClick={() => reveal(question, answers[question.qid])}>Check answer</button>
          ) : last ? (
            <button type="button" className="ui-btn ui-btn-primary ui-btn-sm" onClick={() => setPhase('done')}>See results</button>
          ) : (
            <button type="button" className="ui-btn ui-btn-primary ui-btn-sm" onClick={() => setPosition(position + 1)}>Next <ChevronRight size={15} /></button>
          )}
        </footer>
      </section>
    );
  }

  /* ───── running: all on one page ───── */

  return (
    <section className="ui-quiz qz">
      <header className="ui-quiz-head">
        <h3>{title}</h3>
        <span className="ui-quiz-stats">{answeredCount} of {deck.length} answered{answeredCount > 0 ? ` · ${correctCount} correct` : ''}</span>
      </header>
      <ol className="ui-quiz-list">
        {deck.map((question, index) => (
          <li key={question.qid} className="ui-quiz-q">
            {meta(question)}
            <p className="ui-quiz-prompt"><RichText text={question.question} /></p>
            {question.code && <pre className="ui-quiz-code"><code>{question.code}</code></pre>}
            {options(question, index)}
            {feedback(question)}
          </li>
        ))}
      </ol>
      <footer className="ui-quiz-foot">
        <span className="ui-quiz-stats">{deck.length - answeredCount > 0 ? `${deck.length - answeredCount} left` : 'All answered'}</span>
        <span className="qz-actions">
          {chooser && <button type="button" className="ui-btn ui-btn-sm" onClick={() => setPhase('choose')}>Choose questions</button>}
          <button type="button" className="ui-btn ui-btn-primary ui-btn-sm" disabled={answeredCount === 0} onClick={() => setPhase('done')}>See results</button>
        </span>
      </footer>
    </section>
  );
}
