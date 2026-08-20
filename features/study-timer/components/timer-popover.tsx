'use client';

import { Pause, Play, RotateCcw, Settings2, SkipForward } from 'lucide-react';
import Link from 'next/link';
import type { Ref } from 'react';
import { useStudyTimer } from '../timer-provider';
import { formatTimer } from '../timer-types';

export function TimerPopover({ close, popoverRef }: { close(): void; popoverRef: Ref<HTMLElement> }) {
  const { state, running, phaseLabel, toggle, reset, skip, setSettingsOpen } = useStudyTimer();
  return (
    <section ref={popoverRef} className="timer-popover" role="dialog" aria-label="Pomodoro timer controls">
      <div className="timer-popover-head">
        <div><span>{phaseLabel}</span><strong>{formatTimer(state.left)}</strong></div>
        <small>{state.completedBlocks} blocks today</small>
      </div>
      <div className="timer-popover-controls">
        <button type="button" className="timer-popover-primary" onClick={toggle}>
          {running ? <Pause size={16} /> : <Play size={16} />}{running ? 'Pause' : 'Start'}
        </button>
        <button type="button" aria-label="Reset timer" onClick={reset}><RotateCcw size={16} /></button>
        <button type="button" aria-label="Skip phase" onClick={skip}><SkipForward size={16} /></button>
        <button type="button" aria-label="Open timer settings" onClick={() => { close(); setSettingsOpen(true); }}><Settings2 size={16} /></button>
      </div>
      <Link href="/docs/study-tools" onClick={close}>Open focus workspace</Link>
    </section>
  );
}
