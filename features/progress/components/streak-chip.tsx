'use client';

import { Flame } from 'lucide-react';
import Link from 'next/link';
import { useProgress } from '../progress-provider';

const labels = {
  none: 'No streak yet. Study today to start one.',
  done: 'You have studied today.',
  'at-risk': 'Study today to keep your streak.',
  lost: 'Your streak has ended. Study today to start a new one.',
} as const;

/** The study streak in the header. It links to the dashboard and shows whether today still counts. */
export function StreakChip() {
  const progress = useProgress();
  if (!progress) return null;
  const { ready, streak, state } = progress;
  const value = ready ? streak.value : 0;
  const status = ready ? streak.status : 'none';
  const tracking = state.enabled;

  return (
    <Link
      href="/docs/dashboard"
      className="ui-streak"
      data-status={tracking ? status : 'off'}
      title={tracking ? `${value}-day streak. ${labels[status]} Open your dashboard.` : 'Progress tracking is off. Open your dashboard.'}
      aria-label={tracking ? `Study streak: ${value} ${value === 1 ? 'day' : 'days'}. Open your dashboard.` : 'Progress tracking is off. Open your dashboard.'}
    >
      <Flame size={16} aria-hidden="true" />
      <span>{tracking ? value : '-'}</span>
    </Link>
  );
}
