import {
  defaultTimerSettings,
  timerDateKey,
  type TimerPhase,
  type TimerSettings,
  type TimerState,
} from './timer-types';

export type TimerAction =
  | { type: 'hydrate'; state: TimerState }
  | { type: 'tick'; now: number }
  | { type: 'toggle'; now: number }
  | { type: 'reset' }
  | { type: 'skip' }
  | { type: 'select-phase'; phase: TimerPhase }
  | { type: 'change-setting'; key: keyof TimerSettings; value: number | boolean }
  | { type: 'restore-defaults' }
  | { type: 'open-settings'; open: boolean }
  | { type: 'open-fullscreen'; open: boolean };

function nextPhase(state: TimerState) {
  if (state.phase !== 'focus') return 'focus';
  return state.round >= state.settings.rounds ? 'long' : 'short';
}

export function timerReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case 'hydrate':
      return action.state;
    case 'tick': {
      if (state.endAt === null) return state;
      const remaining = Math.max(0, Math.ceil((state.endAt - action.now) / 1000));
      if (remaining > 0) return remaining === state.left ? state : { ...state, left: remaining };

      const completedFocus = state.phase === 'focus';
      const phase = nextPhase(state);
      const isLongBreak = completedFocus && phase === 'long';
      const autoStart = completedFocus ? state.settings.autoBreak : state.settings.autoFocus;
      const date = timerDateKey();
      const sameDay = date === state.date;
      const completedBlocks = (sameDay ? state.completedBlocks : 0) + (completedFocus ? 1 : 0);
      const focusedMinutes = (sameDay ? state.focusedMinutes : 0) + (completedFocus ? state.settings.focus : 0);
      const left = state.settings[phase] * 60;

      return {
        ...state,
        phase,
        left,
        endAt: autoStart ? action.now + left * 1000 : null,
        round: completedFocus ? (isLongBreak ? 1 : state.round + 1) : state.round,
        completedBlocks,
        focusedMinutes,
        date,
        completionCount: state.completionCount + 1,
      };
    }
    case 'toggle':
      return {
        ...state,
        endAt: state.endAt === null ? action.now + state.left * 1000 : null,
      };
    case 'reset':
      return { ...state, endAt: null, left: state.settings[state.phase] * 60 };
    case 'skip': {
      const phase = nextPhase(state);
      return { ...state, phase, endAt: null, left: state.settings[phase] * 60 };
    }
    case 'select-phase':
      return { ...state, phase: action.phase, endAt: null, left: state.settings[action.phase] * 60 };
    case 'change-setting': {
      const settings = { ...state.settings, [action.key]: action.value };
      const changesCurrentDuration = action.key === state.phase && state.endAt === null;
      return {
        ...state,
        settings,
        left: changesCurrentDuration ? Number(action.value) * 60 : state.left,
        round: action.key === 'rounds' ? Math.min(state.round, Number(action.value)) : state.round,
      };
    }
    case 'restore-defaults':
      return {
        ...state,
        settings: defaultTimerSettings,
        endAt: null,
        left: defaultTimerSettings[state.phase] * 60,
        round: Math.min(state.round, defaultTimerSettings.rounds),
      };
    case 'open-settings':
      return { ...state, settingsOpen: action.open, fullscreenOpen: action.open ? false : state.fullscreenOpen };
    case 'open-fullscreen':
      return { ...state, fullscreenOpen: action.open, settingsOpen: action.open ? false : state.settingsOpen };
  }
}
