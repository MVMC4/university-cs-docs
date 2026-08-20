'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from 'react';
import { playTimerCompletionSound } from './timer-audio';
import { timerReducer } from './timer-reducer';
import { createInitialTimerState, hydrateTimer, readPersistedTimer, writePersistedTimer } from './timer-storage';
import { formatTimer, timerPhaseLabels, type TimerPhase, type TimerSettings } from './timer-types';

type TimerContextValue = {
  state: ReturnType<typeof createInitialTimerState>;
  running: boolean;
  progress: number;
  phaseLabel: string;
  toggle(): void;
  reset(): void;
  skip(): void;
  selectPhase(phase: TimerPhase): void;
  changeSetting(key: keyof TimerSettings, value: number | boolean): void;
  restoreDefaults(): void;
  setSettingsOpen(open: boolean): void;
  setFullscreenOpen(open: boolean): void;
};

const TimerContext = createContext<TimerContextValue | null>(null);

export function StudyTimerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(timerReducer, undefined, createInitialTimerState);
  const lastCompletion = useRef(0);
  const pageTitle = useRef('University Docs');

  useEffect(() => {
    dispatch({ type: 'hydrate', state: hydrateTimer(readPersistedTimer()) });
  }, []);

  useEffect(() => {
    if (!state.ready) return;
    writePersistedTimer(state);
  }, [
    state.ready,
    state.phase,
    state.left,
    state.endAt,
    state.round,
    state.completedBlocks,
    state.focusedMinutes,
    state.date,
    state.settings,
  ]);

  useEffect(() => {
    if (state.endAt === null) return;
    const tick = () => dispatch({ type: 'tick', now: Date.now() });
    tick();
    const interval = window.setInterval(tick, 250);
    return () => window.clearInterval(interval);
  }, [state.endAt]);

  useEffect(() => {
    if (!state.ready || state.completionCount === lastCompletion.current) return;
    lastCompletion.current = state.completionCount;
    if (state.settings.sound) playTimerCompletionSound();
  }, [state.completionCount, state.ready, state.settings.sound]);

  useEffect(() => {
    const timerTitle = /^\d{2}:\d{2} · /;
    if (!timerTitle.test(document.title)) pageTitle.current = document.title;
    if (state.endAt === null) return;
    document.title = `${formatTimer(state.left)} · ${timerPhaseLabels[state.phase]}`;
    return () => {
      if (timerTitle.test(document.title)) document.title = pageTitle.current;
    };
  }, [state.endAt, state.left, state.phase]);

  useEffect(() => {
    if (!state.settingsOpen && !state.fullscreenOpen) return;
    const previousOverflow = document.body.style.overflow;
    const close = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (state.settingsOpen) dispatch({ type: 'open-settings', open: false });
      else dispatch({ type: 'open-fullscreen', open: false });
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', close);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', close);
    };
  }, [state.settingsOpen, state.fullscreenOpen]);

  const totalSeconds = state.settings[state.phase] * 60;
  const value = useMemo<TimerContextValue>(() => ({
    state,
    running: state.endAt !== null,
    progress: Math.min(100, Math.max(0, (totalSeconds - state.left) / totalSeconds * 100)),
    phaseLabel: timerPhaseLabels[state.phase],
    toggle: () => dispatch({ type: 'toggle', now: Date.now() }),
    reset: () => dispatch({ type: 'reset' }),
    skip: () => dispatch({ type: 'skip' }),
    selectPhase: (phase) => dispatch({ type: 'select-phase', phase }),
    changeSetting: (key, rawValue) => {
      const value = typeof rawValue === 'number'
        ? Math.max(1, Math.min(key === 'rounds' ? 8 : 90, Math.round(rawValue || 1)))
        : rawValue;
      dispatch({ type: 'change-setting', key, value });
    },
    restoreDefaults: () => dispatch({ type: 'restore-defaults' }),
    setSettingsOpen: (open) => dispatch({ type: 'open-settings', open }),
    setFullscreenOpen: (open) => dispatch({ type: 'open-fullscreen', open }),
  }), [state, totalSeconds]);

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
}

export function useStudyTimer() {
  const value = useContext(TimerContext);
  if (!value) throw new Error('useStudyTimer must be used inside StudyTimerProvider');
  return value;
}
