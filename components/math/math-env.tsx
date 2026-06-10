'use client';

import React from 'react';

type EnvType = 'definition' | 'theorem' | 'lemma' | 'corollary' | 'example';

const envStyles: Record<EnvType, { border: string; bg: string; text: string; label: string }> = {
  definition: { border: 'border-l-4 border-blue-500', bg: 'bg-blue-500/5', text: 'text-blue-600 dark:text-blue-400', label: 'Definition' },
  theorem: { border: 'border-l-4 border-purple-500', bg: 'bg-purple-500/5', text: 'text-purple-600 dark:text-purple-400', label: 'Theorem' },
  lemma: { border: 'border-l-4 border-indigo-500', bg: 'bg-indigo-500/5', text: 'text-indigo-600 dark:text-indigo-400', label: 'Lemma' },
  corollary: { border: 'border-l-4 border-pink-500', bg: 'bg-pink-500/5', text: 'text-pink-600 dark:text-pink-400', label: 'Corollary' },
  example: { border: 'border-l-4 border-emerald-500', bg: 'bg-emerald-500/5', text: 'text-emerald-600 dark:text-emerald-400', label: 'Example' },
};

export function MathEnv({ type = 'definition', title, number, children }: { type?: EnvType; title?: string; number?: string; children: React.ReactNode }) {
  const style = envStyles[type];
  return (
    <div className={`my-6 rounded-r-lg ${style.border} ${style.bg} p-5 shadow-sm`}>
      <div className={`mb-2 font-bold ${style.text}`}>
        {style.label} {number && <span className="font-mono">{number}</span>} {title && <span className="text-fd-foreground font-normal italic">({title})</span>}
      </div>
      <div className="text-fd-foreground/90 leading-relaxed">
        {children}
      </div>
    </div>
  );
}