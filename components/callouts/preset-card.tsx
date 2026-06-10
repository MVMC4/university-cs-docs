'use client';

import React from 'react';
import { AlertTriangle, Target, Link2, Lightbulb } from 'lucide-react';

type PresetType = 'trap' | 'exam' | 'builds' | 'intuition';

const presets: Record<PresetType, { bg: string; border: string; text: string; icon: React.ReactNode; title: string }> = {
  trap: {
    bg: 'bg-red-500/5 dark:bg-red-500/10',
    border: 'border-red-500/50',
    text: 'text-red-600 dark:text-red-400',
    icon: <AlertTriangle className="h-5 w-5 shrink-0" />,
    title: '🚨 The Trap'
  },
  exam: {
    bg: 'bg-emerald-500/5 dark:bg-emerald-500/10',
    border: 'border-emerald-500/50',
    text: 'text-emerald-600 dark:text-emerald-400',
    icon: <Target className="h-5 w-5 shrink-0" />,
    title: '🎯 Exam Focus'
  },
  builds: {
    bg: 'bg-blue-500/5 dark:bg-blue-500/10',
    border: 'border-blue-500/50',
    text: 'text-blue-600 dark:text-blue-400',
    icon: <Link2 className="h-5 w-5 shrink-0" />,
    title: '⚠️ Builds On'
  },
  intuition: {
    bg: 'bg-yellow-500/5 dark:bg-yellow-500/10',
    border: 'border-yellow-500/50',
    text: 'text-yellow-600 dark:text-yellow-400',
    icon: <Lightbulb className="h-5 w-5 shrink-0" />,
    title: '💡 The Mechanics'
  },
};

export function PresetCard({ 
  type = 'intuition', 
  title, 
  children 
}: { 
  type?: PresetType; 
  title?: string; 
  children: React.ReactNode; 
}) {
  const preset = presets[type];
  
  return (
    <div className={`my-4 w-full overflow-hidden rounded-lg border ${preset.border} ${preset.bg} p-4`}>
      <div className={`mb-2 flex items-center gap-2 font-bold ${preset.text}`}>
        {preset.icon}
        <span>{title || preset.title}</span>
      </div>
      <div className="w-full break-words text-sm leading-relaxed text-fd-foreground/90">
        {children}
      </div>
    </div>
  );
}