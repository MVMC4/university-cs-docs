'use client';

import { Download, Upload } from 'lucide-react';
import { useRef, useState } from 'react';
import { ResetProgress } from '../components/reset-dialog';
import type { ProgressContext } from '../progress-provider';

const GOALS = [
  { xp: 15, label: 'Gentle', note: 'About three pages a day' },
  { xp: 30, label: 'Steady', note: 'A page, a quiz and some cards' },
  { xp: 60, label: 'Focused', note: 'A solid session each day' },
  { xp: 100, label: 'Intense', note: 'Serious study time' },
] as const;

export function SettingsTab({ progress }: { progress: ProgressContext }) {
  const { state, setName, setGoal, setEnabled, setToasts, exportJson, importJson } = progress;
  const [name, setNameDraft] = useState(state.settings.name);
  const [message, setMessage] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);

  const download = () => {
    const blob = new Blob([exportJson()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `university-docs-progress-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setMessage('Exported. Keep the file somewhere safe.');
  };

  const upload = async (file: File | undefined) => {
    if (!file) return;
    try {
      importJson(await file.text());
      setMessage('Imported. Your progress has been restored.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'That file could not be imported.');
    }
    if (fileInput.current) fileInput.current.value = '';
  };

  return (
    <div className="pg-settings">
      <header className="pg-sectionhead">
        <div>
          <h2>Settings</h2>
          <p>Everything here is saved in this browser. Nothing is sent anywhere.</p>
        </div>
      </header>

      <section className="pg-panel">
        <header><h3>About you</h3></header>
        <label className="pg-field">
          What should we call you?
          <input
            type="text"
            value={name}
            maxLength={40}
            placeholder="Your name or a nickname"
            onChange={(event) => setNameDraft(event.target.value)}
            onBlur={() => name !== state.settings.name && setName(name.trim())}
            onKeyDown={(event) => event.key === 'Enter' && event.currentTarget.blur()}
          />
          <small>Used only for the greeting on your dashboard.</small>
        </label>
      </section>

      <section className="pg-panel">
        <header><h3>Daily goal</h3></header>
        <p className="pg-note">Pick an amount of XP to aim for each day. Reaching it is what the ring on your dashboard fills towards.</p>
        <div className="pg-goals" role="radiogroup" aria-label="Daily goal">
          {GOALS.map((goal) => (
            <button key={goal.xp} type="button" role="radio" aria-checked={state.settings.goalXp === goal.xp} onClick={() => setGoal(goal.xp)}>
              <strong>{goal.label}</strong>
              <span>{goal.xp} XP</span>
              <small>{goal.note}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="pg-panel">
        <header><h3>Tracking and notices</h3></header>
        <div className="pg-data">
          <label><input type="checkbox" checked={state.enabled} onChange={(event) => setEnabled(event.target.checked)} /> Save my progress in this browser</label>
          <label><input type="checkbox" checked={state.settings.toasts} onChange={(event) => setToasts(event.target.checked)} /> Tell me when I earn a badge, reach a goal or hit a streak milestone</label>
        </div>
        <p className="pg-note">
          Progress is saved in local storage and one small cookie (<code>ucd_progress</code>) that keeps your streak and level. Clearing site data removes the history, so export a copy to keep it or move it to another device.
        </p>
      </section>

      <section className="pg-panel">
        <header><h3>Your data</h3></header>
        <div className="pg-actions">
          <button type="button" className="ui-btn ui-btn-sm" onClick={download}><Download size={15} aria-hidden="true" /> Export</button>
          <button type="button" className="ui-btn ui-btn-sm" onClick={() => fileInput.current?.click()}><Upload size={15} aria-hidden="true" /> Import</button>
          <input ref={fileInput} type="file" accept="application/json,.json" hidden onChange={(event) => upload(event.target.files?.[0])} />
        </div>
        <p className="pg-message" aria-live="polite">{message}</p>
      </section>

      <section className="pg-panel pg-danger-zone">
        <header><h3>Start over</h3></header>
        <p className="pg-note">Clear your streak, level, badges, courses and history from this browser. You will be asked to type RESET before anything is deleted.</p>
        <ResetProgress label="Reset all progress" />
      </section>
    </div>
  );
}
