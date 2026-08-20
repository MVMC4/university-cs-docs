'use client';

import { Pause, TimerReset } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useStudyTimer } from '../timer-provider';
import { formatTimer } from '../timer-types';
import { TimerPopover } from './timer-popover';

export function TimerTrigger() {
  const { state, running, phaseLabel } = useStudyTimer();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!rootRef.current?.contains(target) && !popoverRef.current?.contains(target)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div className="timer-trigger-root" ref={rootRef}>
      <button
        type="button"
        className={`timer-trigger ${running ? 'timer-trigger-running' : ''}`}
        aria-label={running ? `${phaseLabel}, ${formatTimer(state.left)} remaining` : 'Open focus timer'}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {running ? <Pause size={15} /> : <TimerReset size={16} />}
        <span>{running ? formatTimer(state.left) : 'Focus'}</span>
      </button>
      {open && typeof document !== 'undefined'
        ? createPortal(<TimerPopover close={() => setOpen(false)} popoverRef={popoverRef} />, document.body)
        : null}
    </div>
  );
}
