'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Check,
  CheckCircle2,
  ChevronDown,
  Circle,
  Clock3,
  Flame,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Settings2,
  SkipForward,
  Target,
  TimerReset,
  Trash2,
  X,
} from 'lucide-react';

type Goal = {
  id: string;
  text: string;
  course: string;
  target: number;
  completed: number;
  done: boolean;
  createdAt: number;
};

type Phase = 'focus' | 'short' | 'long';
type Settings = {
  focus: number;
  short: number;
  long: number;
  rounds: number;
  autoBreak: boolean;
  autoFocus: boolean;
  sound: boolean;
};

const GOALS_KEY = 'university-docs-study-goals-v2';
const ACTIVE_GOAL_KEY = 'university-docs-active-goal-v2';
const TIMER_KEY = 'university-docs-pomodoro-v2';
const STUDY_EVENT = 'university-docs-study-change';
const defaults: Settings = { focus: 25, short: 5, long: 15, rounds: 4, autoBreak: false, autoFocus: false, sound: true };

function pad(value: number) { return String(value).padStart(2, '0'); }
function todayKey() { return new Date().toISOString().slice(0, 10); }
function notifyStudyChange() { window.dispatchEvent(new Event(STUDY_EVENT)); }

function readGoals(): Goal[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(GOALS_KEY) ?? '[]');
    if (Array.isArray(parsed) && parsed.length) return parsed;
  } catch {}
  return [
    { id: 'starter-1', text: 'Finish one full topic review', course: 'Today', target: 2, completed: 0, done: false, createdAt: Date.now() },
    { id: 'starter-2', text: 'Complete 15 practice questions', course: 'Today', target: 2, completed: 0, done: false, createdAt: Date.now() + 1 },
  ];
}

function writeGoals(goals: Goal[]) {
  localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
  notifyStudyChange();
}

function beep() {
  try {
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.frequency.setValueAtTime(740, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(520, context.currentTime + 0.35);
    gain.gain.setValueAtTime(0.12, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.45);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.45);
  } catch {}
}

export function StudyGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [course, setCourse] = useState('');
  const [target, setTarget] = useState(2);
  const [filter, setFilter] = useState<'open' | 'done'>('open');
  const [adding, setAdding] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setGoals(readGoals());
    setActiveId(localStorage.getItem(ACTIVE_GOAL_KEY));
    setReady(true);
    const sync = () => { setGoals(readGoals()); setActiveId(localStorage.getItem(ACTIVE_GOAL_KEY)); };
    window.addEventListener(STUDY_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => { window.removeEventListener(STUDY_EVENT, sync); window.removeEventListener('storage', sync); };
  }, []);

  const visible = goals.filter((goal) => filter === 'done' ? goal.done : !goal.done);
  const totalCompleted = goals.reduce((sum, goal) => sum + goal.completed, 0);

  function update(next: Goal[]) { setGoals(next); writeGoals(next); }
  function setActive(id: string | null) {
    setActiveId(id);
    if (id) localStorage.setItem(ACTIVE_GOAL_KEY, id);
    else localStorage.removeItem(ACTIVE_GOAL_KEY);
    notifyStudyChange();
  }
  function addGoal(event: React.FormEvent) {
    event.preventDefault();
    const value = text.trim();
    if (!value) return;
    const goal: Goal = { id: crypto.randomUUID(), text: value, course: course.trim() || 'General', target, completed: 0, done: false, createdAt: Date.now() };
    update([...goals, goal]);
    setText(''); setCourse(''); setTarget(2); setAdding(false); setFilter('open');
    if (!activeId) setActive(goal.id);
  }
  function toggleGoal(goal: Goal) {
    const done = !goal.done;
    update(goals.map((item) => item.id === goal.id ? { ...item, done } : item));
    if (done && activeId === goal.id) setActive(null);
  }
  function removeGoal(goal: Goal) {
    update(goals.filter((item) => item.id !== goal.id));
    if (activeId === goal.id) setActive(null);
  }

  if (!ready) return <section className="study-panel"><p>Loading goals…</p></section>;

  return (
    <section className="study-panel goals-panel" aria-labelledby="goals-heading">
      <div className="study-panel-header">
        <div className="study-eyebrow"><Target size={16} /><span>What matters now</span></div>
        <button type="button" className="study-icon-button" aria-label={adding ? 'Close goal form' : 'Add a goal'} onClick={() => setAdding((value) => !value)}>{adding ? <X size={18} /> : <Plus size={18} />}</button>
      </div>
      <div className="study-heading-row">
        <div><h2 id="goals-heading">Goals</h2><p>Choose one clear outcome, then work toward it one Pomodoro at a time.</p></div>
        <div className="study-stat"><strong>{totalCompleted}</strong><span>focus blocks</span></div>
      </div>

      {adding && <form className="goal-composer" onSubmit={addGoal}>
        <label><span>Goal</span><input autoFocus value={text} maxLength={120} onChange={(event) => setText(event.target.value)} placeholder="e.g. Solve the full induction question set" /></label>
        <div className="goal-composer-row">
          <label><span>Course or area</span><input value={course} maxLength={32} onChange={(event) => setCourse(event.target.value)} placeholder="CSI132" /></label>
          <label><span>Pomodoros</span><select value={target} onChange={(event) => setTarget(Number(event.target.value))}>{Array.from({ length: 8 }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1}</option>)}</select></label>
        </div>
        <button className="study-primary-button" type="submit" disabled={!text.trim()}><Plus size={17} /> Add goal</button>
      </form>}

      <div className="goal-filters" role="tablist" aria-label="Goal status">
        <button type="button" role="tab" aria-selected={filter === 'open'} className={filter === 'open' ? 'active' : ''} onClick={() => setFilter('open')}>Open <span>{goals.filter((goal) => !goal.done).length}</span></button>
        <button type="button" role="tab" aria-selected={filter === 'done'} className={filter === 'done' ? 'active' : ''} onClick={() => setFilter('done')}>Completed <span>{goals.filter((goal) => goal.done).length}</span></button>
      </div>

      <div className="goal-list">
        {visible.map((goal) => {
          const isActive = goal.id === activeId;
          const progress = Math.min(100, goal.completed / goal.target * 100);
          return <article key={goal.id} className={`goal-item ${isActive ? 'active' : ''} ${goal.done ? 'done' : ''}`}>
            <button type="button" className="goal-check" aria-label={goal.done ? `Reopen ${goal.text}` : `Complete ${goal.text}`} onClick={() => toggleGoal(goal)}>{goal.done ? <CheckCircle2 size={21} /> : <Circle size={21} />}</button>
            <div className="goal-copy">
              <div className="goal-labels"><span>{goal.course}</span>{isActive && <em>Focusing now</em>}</div>
              <h3>{goal.text}</h3>
              <div className="goal-progress-row"><div className="goal-progress"><i style={{ width: `${progress}%` }} /></div><small>{goal.completed}/{goal.target}</small></div>
            </div>
            <div className="goal-actions">
              {!goal.done && <button type="button" onClick={() => setActive(isActive ? null : goal.id)}>{isActive ? 'Unselect' : 'Focus'}</button>}
              <button type="button" className="study-icon-button subtle" aria-label={`Remove ${goal.text}`} onClick={() => removeGoal(goal)}><Trash2 size={15} /></button>
            </div>
          </article>;
        })}
        {visible.length === 0 && <div className="goal-empty"><Check size={25} /><strong>{filter === 'open' ? 'Everything is complete' : 'No completed goals yet'}</strong><span>{filter === 'open' ? 'Add a focused outcome when you are ready.' : 'Finished goals will collect here.'}</span></div>}
      </div>
      {goals.some((goal) => goal.done) && filter === 'done' && <button type="button" className="clear-goals" onClick={() => update(goals.filter((goal) => !goal.done))}><Trash2 size={15} /> Clear completed</button>}
    </section>
  );
}

export function PomodoroTimer() {
  const [settings, setSettings] = useState<Settings>(defaults);
  const [phase, setPhase] = useState<Phase>('focus');
  const [left, setLeft] = useState(defaults.focus * 60);
  const [endAt, setEndAt] = useState<number | null>(null);
  const [round, setRound] = useState(1);
  const [today, setToday] = useState(0);
  const [activeGoal, setActiveGoal] = useState<Goal | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [ready, setReady] = useState(false);
  const completedRef = useRef(false);

  const phaseMinutes = settings[phase];
  const totalSeconds = phaseMinutes * 60;
  const running = endAt !== null;
  const progress = Math.min(100, Math.max(0, (totalSeconds - left) / totalSeconds * 100));
  const phaseLabel = phase === 'focus' ? 'Focus' : phase === 'short' ? 'Short break' : 'Long break';

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(TIMER_KEY) ?? '{}');
      const savedSettings = { ...defaults, ...(saved.settings ?? {}) };
      const savedPhase: Phase = ['focus', 'short', 'long'].includes(saved.phase) ? saved.phase : 'focus';
      setSettings(savedSettings); setPhase(savedPhase); setRound(saved.round ?? 1);
      setToday(saved.date === todayKey() ? saved.today ?? 0 : 0);
      if (saved.endAt && saved.endAt > Date.now()) {
        setEndAt(saved.endAt); setLeft(Math.ceil((saved.endAt - Date.now()) / 1000));
      } else setLeft(saved.left ?? savedSettings[savedPhase] * 60);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    const syncGoal = () => {
      const id = localStorage.getItem(ACTIVE_GOAL_KEY);
      setActiveGoal(readGoals().find((goal) => goal.id === id) ?? null);
    };
    syncGoal();
    window.addEventListener(STUDY_EVENT, syncGoal);
    window.addEventListener('storage', syncGoal);
    return () => { window.removeEventListener(STUDY_EVENT, syncGoal); window.removeEventListener('storage', syncGoal); };
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(TIMER_KEY, JSON.stringify({ settings, phase, left, endAt, round, today, date: todayKey() }));
  }, [settings, phase, left, endAt, round, today, ready]);

  useEffect(() => {
    if (!running) { document.title = 'University Docs'; return; }
    document.title = `${pad(Math.floor(left / 60))}:${pad(left % 60)} · ${phaseLabel}`;
    return () => { document.title = 'University Docs'; };
  }, [left, running, phaseLabel]);

  useEffect(() => {
    if (!showSettings && !fullScreen) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (showSettings) setShowSettings(false);
      else setFullScreen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [showSettings, fullScreen]);

  useEffect(() => {
    if (endAt === null) return;
    completedRef.current = false;
    const tick = () => {
      const remaining = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
      setLeft(remaining);
      if (remaining === 0 && !completedRef.current) {
        completedRef.current = true;
        const completedFocus = phase === 'focus';
        if (settings.sound) beep();
        if (completedFocus) {
          setToday((value) => value + 1);
          setRound((value) => value >= settings.rounds ? 1 : value + 1);
          const id = localStorage.getItem(ACTIVE_GOAL_KEY);
          if (id) {
            const goals = readGoals().map((goal) => goal.id === id ? { ...goal, completed: Math.min(goal.target, goal.completed + 1) } : goal);
            writeGoals(goals);
          }
        }
        const next: Phase = completedFocus ? (round >= settings.rounds ? 'long' : 'short') : 'focus';
        const auto = completedFocus ? settings.autoBreak : settings.autoFocus;
        setPhase(next); setLeft(settings[next] * 60); setEndAt(auto ? Date.now() + settings[next] * 60 * 1000 : null);
      }
    };
    tick();
    const id = window.setInterval(tick, 250);
    return () => window.clearInterval(id);
  }, [endAt, phase, round, settings]);

  function selectPhase(next: Phase) { setPhase(next); setLeft(settings[next] * 60); setEndAt(null); }
  function toggle() { setEndAt(running ? null : Date.now() + left * 1000); }
  function reset() { setEndAt(null); setLeft(settings[phase] * 60); }
  function skip() {
    const next: Phase = phase === 'focus' ? (round >= settings.rounds ? 'long' : 'short') : 'focus';
    selectPhase(next);
  }
  function changeSetting(key: 'focus' | 'short' | 'long' | 'rounds', value: number) {
    const safe = Math.max(1, Math.min(key === 'rounds' ? 8 : 90, value || 1));
    setSettings((current) => ({ ...current, [key]: safe }));
    if (key === phase && !running) setLeft(safe * 60);
  }

  const roundDots = useMemo(() => Array.from({ length: settings.rounds }, (_, index) => index < round - 1), [settings.rounds, round]);

  return <>
    <section className={`study-panel pomodoro-panel phase-${phase} ${fullScreen ? 'pomodoro-fullscreen' : ''}`} aria-labelledby="pomodoro-heading">
      <div className="study-panel-header">
        <div className="study-eyebrow"><TimerReset size={16} /><span>Pomodoro timer</span></div>
        <div className="study-panel-actions">
          <button type="button" className="study-action-button" aria-label={fullScreen ? 'Exit full screen timer' : 'Open full screen timer'} aria-pressed={fullScreen} onClick={() => { setShowSettings(false); setFullScreen((value) => !value); }}>
            {fullScreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}<span>{fullScreen ? 'Exit full screen' : 'Full screen'}</span>
          </button>
          <button type="button" className="study-action-button" aria-label="Edit timer settings" aria-haspopup="dialog" aria-expanded={showSettings} onClick={() => setShowSettings(true)}><Settings2 size={17} /><span>Edit timer</span></button>
        </div>
      </div>
      <div className="study-heading-row timer-heading">
        <div><h2 id="pomodoro-heading">Protect one block</h2><p>{activeGoal ? <>Working on <strong>{activeGoal.text}</strong></> : 'Select a goal, remove distractions, and begin.'}</p></div>
        <div className="study-stat"><strong>{today}</strong><span>today</span></div>
      </div>

      <div className="pomodoro-tabs" role="tablist" aria-label="Timer phase">
        {([['focus', 'Focus'], ['short', 'Short break'], ['long', 'Long break']] as const).map(([key, label]) => <button type="button" role="tab" aria-selected={phase === key} className={phase === key ? 'active' : ''} key={key} onClick={() => selectPhase(key)}><span>{label}</span><small>{settings[key]} min</small></button>)}
      </div>

      <div className="pomodoro-clock-wrap">
        <div className="pomodoro-ring" style={{ background: `conic-gradient(var(--study-accent) ${progress}%, var(--study-track) 0)` }}>
          <div className="pomodoro-face">
            <span>{phaseLabel}</span>
            <strong aria-live="off">{pad(Math.floor(left / 60))}:{pad(left % 60)}</strong>
            <small>{running ? 'Stay with the task' : left < totalSeconds ? 'Paused' : 'Ready when you are'}</small>
          </div>
        </div>
      </div>

      <div className="pomodoro-controls">
        <button type="button" className="study-primary-button timer-start" onClick={toggle}>{running ? <Pause size={19} /> : <Play size={19} />}{running ? 'Pause' : left < totalSeconds ? 'Resume' : 'Start focus'}</button>
        <button type="button" className="timer-secondary" onClick={reset}><RotateCcw size={18} /><span>Reset</span></button>
        <button type="button" className="timer-secondary" onClick={skip}><SkipForward size={18} /><span>Skip</span></button>
      </div>

      <div className="pomodoro-footer">
        <div><Clock3 size={16} /><span>Round {round} of {settings.rounds}</span><div className="round-dots">{roundDots.map((complete, index) => <i key={index} className={complete ? 'complete' : index === round - 1 ? 'current' : ''} />)}</div></div>
        <div><Flame size={16} /><span>{today * settings.focus} focused minutes today</span></div>
      </div>
    </section>

    {showSettings && <div className="study-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowSettings(false); }}>
      <section className="study-modal" role="dialog" aria-modal="true" aria-labelledby="timer-settings-title">
        <header className="study-modal-header">
          <div><span>Personalize your cycle</span><h2 id="timer-settings-title">Edit Pomodoro timer</h2><p>Choose the lengths and automation that fit this study session. Changes save automatically on this device.</p></div>
          <button autoFocus type="button" className="study-icon-button" aria-label="Close timer settings" onClick={() => setShowSettings(false)}><X size={19} /></button>
        </header>
        <div className="timer-settings">
          <div className="duration-grid">
            {([['focus', 'Focus'], ['short', 'Short break'], ['long', 'Long break'], ['rounds', 'Rounds']] as const).map(([key, label]) => <label key={key}><span>{label}</span><div><input type="number" min="1" max={key === 'rounds' ? 8 : 90} value={settings[key]} onChange={(event) => changeSetting(key, Number(event.target.value))} /><small>{key === 'rounds' ? 'cycles' : 'min'}</small></div></label>)}
          </div>
          <div className="settings-toggle-list">
            <label className="setting-toggle"><span><strong>Auto-start breaks</strong><small>Begin the next break immediately.</small></span><input type="checkbox" checked={settings.autoBreak} onChange={(event) => setSettings((current) => ({ ...current, autoBreak: event.target.checked }))} /></label>
            <label className="setting-toggle"><span><strong>Auto-start focus</strong><small>Begin focus when a break ends.</small></span><input type="checkbox" checked={settings.autoFocus} onChange={(event) => setSettings((current) => ({ ...current, autoFocus: event.target.checked }))} /></label>
            <label className="setting-toggle"><span><strong>Completion sound</strong><small>Play a short tone at zero.</small></span><input type="checkbox" checked={settings.sound} onChange={(event) => setSettings((current) => ({ ...current, sound: event.target.checked }))} /></label>
          </div>
        </div>
        <footer className="study-modal-footer">
          <button type="button" className="timer-secondary" onClick={() => { setEndAt(null); setSettings(defaults); setLeft(defaults[phase] * 60); }}>Restore defaults</button>
          <button type="button" className="study-primary-button" onClick={() => setShowSettings(false)}><Check size={17} /> Done</button>
        </footer>
      </section>
    </div>}
  </>;
}
