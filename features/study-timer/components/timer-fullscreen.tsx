'use client';

import { useStudyTimer } from '../timer-provider';
import { TimerPanel } from './timer-panel';

export function TimerFullscreen() {
  const { state } = useStudyTimer();
  return state.fullscreenOpen ? <TimerPanel fullscreen /> : null;
}
