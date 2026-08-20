import {
  defaultTimerSettings,
  timerDateKey,
  type PersistedTimer,
  type TimerPhase,
  type TimerState,
} from './timer-types';

export const TIMER_STORAGE_KEY = 'university-docs-pomodoro-v2';

const phases: TimerPhase[] = ['focus', 'short', 'long'];

function bounded(value: unknown, fallback: number, max: number) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(1, Math.min(max, Math.round(number))) : fallback;
}

export function createInitialTimerState(): TimerState {
  return {
    ready: false,
    phase: 'focus',
    left: defaultTimerSettings.focus * 60,
    endAt: null,
    round: 1,
    completedBlocks: 0,
    focusedMinutes: 0,
    date: timerDateKey(),
    settings: defaultTimerSettings,
    settingsOpen: false,
    fullscreenOpen: false,
    completionCount: 0,
  };
}

export function readPersistedTimer(): PersistedTimer {
  try {
    const value = localStorage.getItem(TIMER_STORAGE_KEY);
    return value ? JSON.parse(value) as PersistedTimer : {};
  } catch {
    return {};
  }
}

export function hydrateTimer(saved: PersistedTimer, now = Date.now()): TimerState {
  const initial = createInitialTimerState();
  const settings = {
    ...defaultTimerSettings,
    ...(saved.settings ?? {}),
    focus: bounded(saved.settings?.focus, defaultTimerSettings.focus, 90),
    short: bounded(saved.settings?.short, defaultTimerSettings.short, 90),
    long: bounded(saved.settings?.long, defaultTimerSettings.long, 90),
    rounds: bounded(saved.settings?.rounds, defaultTimerSettings.rounds, 8),
    autoBreak: Boolean(saved.settings?.autoBreak),
    autoFocus: Boolean(saved.settings?.autoFocus),
    sound: saved.settings?.sound !== false,
  };
  const phase = phases.includes(saved.phase as TimerPhase) ? saved.phase as TimerPhase : 'focus';
  const sameDay = saved.date === timerDateKey();
  const validEnd = typeof saved.endAt === 'number' && saved.endAt > now ? saved.endAt : null;
  const completedBlocks = sameDay ? Math.max(0, Number(saved.completedBlocks ?? saved.today ?? 0) || 0) : 0;
  const focusedMinutes = sameDay
    ? Math.max(0, Number(saved.focusedMinutes ?? completedBlocks * settings.focus) || 0)
    : 0;

  return {
    ...initial,
    ready: true,
    phase,
    settings,
    left: validEnd
      ? Math.max(0, Math.ceil((validEnd - now) / 1000))
      : Math.max(0, Number(saved.left) || settings[phase] * 60),
    endAt: validEnd,
    round: Math.max(1, Math.min(settings.rounds, Number(saved.round) || 1)),
    completedBlocks,
    focusedMinutes,
    date: timerDateKey(),
  };
}

export function writePersistedTimer(state: TimerState) {
  const persisted: PersistedTimer = {
    phase: state.phase,
    left: state.left,
    endAt: state.endAt,
    round: state.round,
    completedBlocks: state.completedBlocks,
    focusedMinutes: state.focusedMinutes,
    date: state.date,
    settings: state.settings,
  };
  localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(persisted));
}
