'use client';

import {
  Check,
  Clock3,
  Flame,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  Settings2,
  SkipForward,
  TimerReset,
} from 'lucide-react';
import { useMemo } from 'react';
import { useStudyTimer } from '../timer-provider';
import { formatTimer, type TimerPhase } from '../timer-types';

const phases: Array<[TimerPhase, string]> = [
  ['focus', 'Focus'],
  ['short', 'Short break'],
  ['long', 'Long break'],
];

export function TimerPanel({ fullscreen = false }: { fullscreen?: boolean }) {
  const {
    state,
    running,
    progress,
    phaseLabel,
    toggle,
    reset,
    skip,
    selectPhase,
    setSettingsOpen,
    setFullscreenOpen,
  } = useStudyTimer();
  const totalSeconds = state.settings[state.phase] * 60;
  const roundDots = useMemo(
    () => Array.from({ length: state.settings.rounds }, (_, index) => index < state.round - 1),
    [state.round, state.settings.rounds],
  );

  if (!state.ready) {
    return <section className="study-panel timer-loading" aria-live="polite">Loading timer…</section>;
  }

  return (
    <section className={`study-panel pomodoro-panel phase-${state.phase} ${fullscreen ? 'pomodoro-fullscreen' : ''}`} aria-labelledby={fullscreen ? 'fullscreen-timer-heading' : 'pomodoro-heading'}>
      <div className="study-panel-header">
        <div className="study-eyebrow"><TimerReset size={16} /><span>Pomodoro timer</span></div>
        <div className="study-panel-actions">
          <button
            type="button"
            className="study-action-button"
            aria-label={fullscreen ? 'Exit full screen timer' : 'Open full screen timer'}
            aria-pressed={fullscreen}
            onClick={() => setFullscreenOpen(!fullscreen)}
          >
            {fullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
            <span>{fullscreen ? 'Exit full screen' : 'Full screen'}</span>
          </button>
          <button
            type="button"
            className="study-action-button"
            aria-label="Edit timer settings"
            aria-haspopup="dialog"
            aria-expanded={state.settingsOpen}
            onClick={() => setSettingsOpen(true)}
          >
            <Settings2 size={17} /><span>Edit timer</span>
          </button>
        </div>
      </div>

      <div className="study-heading-row timer-heading">
        <div>
          <h2 id={fullscreen ? 'fullscreen-timer-heading' : 'pomodoro-heading'}>Protect one block</h2>
          <p>Remove distractions, choose one task, and stay with it until the timer ends.</p>
        </div>
        <div className="study-stat"><strong>{state.completedBlocks}</strong><span>today</span></div>
      </div>

      <div className="pomodoro-tabs" role="tablist" aria-label="Timer phase">
        {phases.map(([key, label]) => (
          <button
            type="button"
            role="tab"
            aria-selected={state.phase === key}
            className={state.phase === key ? 'active' : ''}
            key={key}
            onClick={() => selectPhase(key)}
          >
            <span>{label}</span><small>{state.settings[key]} min</small>
          </button>
        ))}
      </div>

      <div className="pomodoro-clock-wrap">
        <div className="pomodoro-ring" style={{ background: `conic-gradient(var(--study-accent) ${progress}%, var(--study-track) 0)` }}>
          <div className="pomodoro-face">
            <span>{phaseLabel}</span>
            <strong aria-live="off">{formatTimer(state.left)}</strong>
            <small>{running ? 'Stay with the task' : state.left < totalSeconds ? 'Paused' : 'Ready when you are'}</small>
          </div>
        </div>
      </div>

      <div className="pomodoro-controls">
        <button type="button" className="study-primary-button timer-start" onClick={toggle}>
          {running ? <Pause size={19} /> : <Play size={19} />}
          {running ? 'Pause' : state.left < totalSeconds ? 'Resume' : state.phase === 'focus' ? 'Start focus' : 'Start break'}
        </button>
        <button type="button" className="timer-secondary" onClick={reset}><RotateCcw size={18} /><span>Reset</span></button>
        <button type="button" className="timer-secondary" onClick={skip}><SkipForward size={18} /><span>Skip</span></button>
      </div>

      <div className="pomodoro-footer">
        <div>
          <Clock3 size={16} />
          <span>Round {state.round} of {state.settings.rounds}</span>
          <div className="round-dots">
            {roundDots.map((complete, index) => <i key={index} className={complete ? 'complete' : index === state.round - 1 ? 'current' : ''} />)}
          </div>
        </div>
        <div><Flame size={16} /><span>{state.focusedMinutes} focused minutes today</span></div>
      </div>
    </section>
  );
}

export function TimerSummary() {
  const { state } = useStudyTimer();
  return (
    <div className="timer-summary-grid">
      <div><Check size={17} /><strong>{state.completedBlocks}</strong><span>completed focus blocks</span></div>
      <div><Clock3 size={17} /><strong>{state.focusedMinutes}</strong><span>focused minutes today</span></div>
      <div><Flame size={17} /><strong>{state.settings.rounds}</strong><span>focus blocks per cycle</span></div>
    </div>
  );
}
