export type TimerPhase = 'focus' | 'short' | 'long';

export type TimerSettings = {
  focus: number;
  short: number;
  long: number;
  rounds: number;
  autoBreak: boolean;
  autoFocus: boolean;
  sound: boolean;
};

export type TimerState = {
  ready: boolean;
  phase: TimerPhase;
  left: number;
  endAt: number | null;
  round: number;
  completedBlocks: number;
  focusedMinutes: number;
  date: string;
  settings: TimerSettings;
  settingsOpen: boolean;
  fullscreenOpen: boolean;
  completionCount: number;
};

export type PersistedTimer = Partial<Pick<
  TimerState,
  'phase' | 'left' | 'endAt' | 'round' | 'completedBlocks' | 'focusedMinutes' | 'date' | 'settings'
>> & {
  today?: number;
};

export const defaultTimerSettings: TimerSettings = {
  focus: 25,
  short: 5,
  long: 15,
  rounds: 4,
  autoBreak: false,
  autoFocus: false,
  sound: true,
};

export const timerPhaseLabels: Record<TimerPhase, string> = {
  focus: 'Focus',
  short: 'Short break',
  long: 'Long break',
};

export function timerDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function formatTimer(seconds: number) {
  const safe = Math.max(0, seconds);
  return `${String(Math.floor(safe / 60)).padStart(2, '0')}:${String(safe % 60).padStart(2, '0')}`;
}
