'use client';

import { Check, X } from 'lucide-react';
import { useStudyTimer } from '../timer-provider';

export function TimerSettings() {
  const { state, changeSetting, restoreDefaults, setSettingsOpen } = useStudyTimer();
  if (!state.settingsOpen) return null;

  return (
    <div
      className="study-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setSettingsOpen(false);
      }}
    >
      <section className="study-modal" role="dialog" aria-modal="true" aria-labelledby="timer-settings-title">
        <header className="study-modal-header">
          <div>
            <span>Personalize your cycle</span>
            <h2 id="timer-settings-title">Edit Pomodoro timer</h2>
            <p>Choose session lengths and automatic transitions. Changes save on this device.</p>
          </div>
          <button autoFocus type="button" className="study-icon-button" aria-label="Close timer settings" onClick={() => setSettingsOpen(false)}><X size={19} /></button>
        </header>

        <div className="timer-settings">
          <div className="duration-grid">
            {([
              ['focus', 'Focus'],
              ['short', 'Short break'],
              ['long', 'Long break'],
              ['rounds', 'Rounds'],
            ] as const).map(([key, label]) => (
              <label key={key}>
                <span>{label}</span>
                <div>
                  <input
                    type="number"
                    min="1"
                    max={key === 'rounds' ? 8 : 90}
                    value={state.settings[key]}
                    onChange={(event) => changeSetting(key, Number(event.target.value))}
                  />
                  <small>{key === 'rounds' ? 'cycles' : 'min'}</small>
                </div>
              </label>
            ))}
          </div>
          <div className="settings-toggle-list">
            <label className="setting-toggle">
              <span><strong>Auto-start breaks</strong><small>Begin the next break immediately.</small></span>
              <input type="checkbox" checked={state.settings.autoBreak} onChange={(event) => changeSetting('autoBreak', event.target.checked)} />
            </label>
            <label className="setting-toggle">
              <span><strong>Auto-start focus</strong><small>Begin focus when a break ends.</small></span>
              <input type="checkbox" checked={state.settings.autoFocus} onChange={(event) => changeSetting('autoFocus', event.target.checked)} />
            </label>
            <label className="setting-toggle">
              <span><strong>Completion sound</strong><small>Play a short tone at zero.</small></span>
              <input type="checkbox" checked={state.settings.sound} onChange={(event) => changeSetting('sound', event.target.checked)} />
            </label>
          </div>
        </div>

        <footer className="study-modal-footer">
          <button type="button" className="timer-secondary" onClick={restoreDefaults}>Restore defaults</button>
          <button type="button" className="study-primary-button" onClick={() => setSettingsOpen(false)}><Check size={17} /> Done</button>
        </footer>
      </section>
    </div>
  );
}
