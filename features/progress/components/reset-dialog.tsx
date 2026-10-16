'use client';

import { RotateCcw, TriangleAlert } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useProgress } from '../progress-provider';

const WORD = 'RESET';

/**
 * Reset progress behind a deliberate step: a dialog that says what will be lost and asks the reader to type RESET.
 * Used in the sidebar and on the dashboard; each instance owns its own dialog.
 */
export function ResetProgress({ label = 'Reset progress', className = 'ui-btn ui-btn-sm' }: { label?: string; className?: string }) {
  const progress = useProgress();
  const dialog = useRef<HTMLDialogElement>(null);
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done) return;
    const timer = setTimeout(() => setDone(false), 4000);
    return () => clearTimeout(timer);
  }, [done]);

  if (!progress) return null;
  const { state, streak, reset, exportJson } = progress;
  const matches = text.trim().toUpperCase() === WORD;

  const close = () => {
    dialog.current?.close();
    setText('');
  };

  const download = () => {
    const blob = new Blob([exportJson()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `university-docs-progress-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <button type="button" className={className} onClick={() => dialog.current?.showModal()}>
        <RotateCcw size={14} aria-hidden="true" /> {done ? 'Progress cleared' : label}
      </button>
      <dialog ref={dialog} className="pg-dialog" onClose={() => setText('')} aria-labelledby="pg-reset-title">
        <form
          method="dialog"
          onSubmit={(event) => {
            event.preventDefault();
            if (!matches) return;
            reset();
            close();
            setDone(true);
          }}
        >
          <header>
            <TriangleAlert size={20} aria-hidden="true" />
            <h2 id="pg-reset-title">Reset all progress?</h2>
          </header>
          <p>This clears everything saved in this browser. It cannot be undone.</p>
          <ul>
            <li>Your streak: {streak.value} {streak.value === 1 ? 'day' : 'days'} (best {state.streak.best})</li>
            <li>{state.xp} XP and your level</li>
            <li>{Object.keys(state.badges).length} {Object.keys(state.badges).length === 1 ? 'badge' : 'badges'}</li>
            <li>Pages read, quiz answers and your activity history</li>
            <li>Your chosen courses, name and daily goal</li>
          </ul>
          <p className="pg-dialog-note">
            Want a copy first?{' '}
            <button type="button" className="pg-link" onClick={download}>Export your progress</button>.
          </p>
          <label className="pg-dialog-field">
            Type <strong>{WORD}</strong> to confirm
            <input
              type="text"
              value={text}
              onChange={(event) => setText(event.target.value)}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              aria-invalid={text.length > 0 && !matches}
            />
          </label>
          <footer>
            <button type="button" className="ui-btn ui-btn-sm" onClick={close}>Cancel</button>
            <button type="submit" className="ui-btn ui-btn-sm pg-danger" disabled={!matches}>Reset everything</button>
          </footer>
        </form>
      </dialog>
    </>
  );
}
