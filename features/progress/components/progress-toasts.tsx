'use client';

import { Flame, ShieldCheck, Target, TrendingUp, X } from 'lucide-react';
import { useEffect } from 'react';
import { pickMessage } from '../core';
import { messages, rewards, useProgress, type ToastNotice } from '../progress-provider';
import { BadgeArt } from './badge-art';

const SHOW_MS = 6500;

function describe(notice: ToastNotice, seed: string) {
  switch (notice.kind) {
    case 'badge': {
      const badge = rewards.badges.find((item) => item.id === notice.id);
      return {
        icon: <BadgeArt badge={{ id: notice.id, icon: notice.icon, shape: badge?.shape as string | undefined, tier: badge?.tier as string | undefined }} earned size={44} />,
        title: `Badge earned: ${notice.title}`,
        text: notice.description,
      };
    }
    case 'level':
      return { icon: <TrendingUp size={20} />, title: `Level ${notice.level}: ${notice.title}`, text: 'You moved up a level. That is real progress.' };
    case 'streak':
      return {
        icon: <Flame size={20} />,
        title: `${notice.current}-day streak`,
        text: messages.streakMilestones[String(notice.current)] ?? 'Keep it going tomorrow.',
      };
    case 'goal':
      return { icon: <Target size={20} />, title: 'Daily goal reached', text: pickMessage(messages.goal, seed, { xp: notice.xp }) };
    case 'freeze-earned':
      return { icon: <ShieldCheck size={20} />, title: 'Streak freeze earned', text: 'It will cover one missed day, so a busy day does not end your streak.' };
    case 'freeze-used':
      return { icon: <ShieldCheck size={20} />, title: 'Streak freeze used', text: 'A missed day was covered, so your streak continues.' };
  }
}

function Toast({ notice, onClose }: { notice: ToastNotice; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, SHOW_MS);
    return () => clearTimeout(timer);
  }, [onClose]);
  const content = describe(notice, `${notice.kind}-${notice.key}`);
  if (!content) return null;
  return (
    <div className="ui-toast" data-kind={notice.kind}>
      <span className="ui-toast-icon" aria-hidden="true">{content.icon}</span>
      <div>
        <strong>{content.title}</strong>
        <span>{content.text}</span>
      </div>
      <button type="button" onClick={onClose} aria-label="Dismiss"><X size={14} /></button>
    </div>
  );
}

/** Small, non-blocking notices for new badges, levels, streak milestones and the daily goal. They can be switched off on the dashboard. */
export function ProgressToasts() {
  const progress = useProgress();
  if (!progress || progress.notices.length === 0) return null;
  return (
    <div className="ui-toasts" role="status" aria-live="polite">
      {progress.notices.map((notice) => (
        <Toast key={notice.key} notice={notice} onClose={() => progress.dismiss(notice.key)} />
      ))}
    </div>
  );
}
