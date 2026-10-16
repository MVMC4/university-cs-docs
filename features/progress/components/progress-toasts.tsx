'use client';

import { Flame, ShieldCheck, TrendingUp, X } from 'lucide-react';
import { useEffect } from 'react';
import { badgeIcon } from '../icons';
import { useProgress, type ToastNotice } from '../progress-provider';

const SHOW_MS = 6000;

function describe(notice: ToastNotice) {
  switch (notice.kind) {
    case 'badge': {
      const Icon = badgeIcon(notice.icon);
      return { icon: <Icon size={18} />, title: `Badge earned: ${notice.title}`, text: notice.description };
    }
    case 'level':
      return { icon: <TrendingUp size={18} />, title: `Level ${notice.level}: ${notice.title}`, text: 'You moved up a level.' };
    case 'streak':
      return { icon: <Flame size={18} />, title: `${notice.current}-day streak`, text: 'Keep it going tomorrow.' };
    case 'freeze-earned':
      return { icon: <ShieldCheck size={18} />, title: 'Streak freeze earned', text: 'It covers one missed day.' };
    case 'freeze-used':
      return { icon: <ShieldCheck size={18} />, title: 'Streak freeze used', text: 'A missed day was covered, so your streak continues.' };
  }
}

function Toast({ notice, onClose }: { notice: ToastNotice; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, SHOW_MS);
    return () => clearTimeout(timer);
  }, [onClose]);
  const { icon, title, text } = describe(notice);
  return (
    <div className="ui-toast" data-kind={notice.kind}>
      <span className="ui-toast-icon" aria-hidden="true">{icon}</span>
      <div>
        <strong>{title}</strong>
        <span>{text}</span>
      </div>
      <button type="button" onClick={onClose} aria-label="Dismiss"><X size={14} /></button>
    </div>
  );
}

/** Small, non-blocking notices for new badges, levels and streak milestones. They can be switched off on the dashboard. */
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
