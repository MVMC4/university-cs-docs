'use client';

import { Flame, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { dayActivity } from '../core';
import { useProgress } from '../progress-provider';
import { Ring } from './charts';
import { ResetProgress } from './reset-dialog';

/**
 * A small panel at the top of the sidebar (and the mobile menu): the streak, today's goal and level at a glance, with
 * the dashboard and a confirmed reset one click away.
 */
export function SidebarProgress() {
  const progress = useProgress();
  if (!progress) return null;
  const { ready, state, streak, level, today } = progress;
  const todayXp = ready ? dayActivity(state, today).xp : 0;
  const goal = state.settings.goalXp;
  const reached = goal > 0 && todayXp >= goal;

  return (
    <section className="sp" aria-label="Your progress" data-ready={ready || undefined}>
      <Link href="/docs/dashboard" className="sp-main">
        <Ring value={goal > 0 ? todayXp / goal : 0} size={46} stroke={5} label="Daily goal">
          <Flame size={16} aria-hidden="true" />
        </Ring>
        <span className="sp-text">
          <strong>{state.enabled ? `${ready ? streak.value : 0}-day streak` : 'Tracking is off'}</strong>
          <small>
            {!state.enabled
              ? 'Turn it on in the dashboard'
              : reached
                ? 'Daily goal reached'
                : `${todayXp} of ${goal} XP today`}
          </small>
        </span>
      </Link>
      <div className="sp-level" title={`${state.xp} XP`}>
        <span>Level {level.level} · {level.title}</span>
        <div className="pg-bar" aria-hidden="true"><div style={{ width: `${level.progress * 100}%` }} /></div>
      </div>
      <div className="sp-actions">
        <Link href="/docs/dashboard" className="ui-btn ui-btn-sm"><LayoutDashboard size={14} aria-hidden="true" /> Dashboard</Link>
        <ResetProgress label="Reset" className="ui-btn ui-btn-sm sp-reset" />
      </div>
    </section>
  );
}
