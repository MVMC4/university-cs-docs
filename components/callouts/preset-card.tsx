import type { ReactNode } from 'react';
import { Callout } from './callout';

type PresetType = 'trap' | 'exam' | 'builds' | 'intuition';

const presets: Record<PresetType, { type: string; title: string }> = {
  trap: { type: 'mistake', title: 'The trap' },
  exam: { type: 'key', title: 'Exam focus' },
  builds: { type: 'note', title: 'Builds on' },
  intuition: { type: 'tip', title: 'How it works' },
};

/** Retired: each preset renders as the matching Callout. */
export function PresetCard({ type = 'intuition', title, children }: { type?: PresetType; title?: string; children: ReactNode }) {
  const preset = presets[type];
  return <Callout type={preset.type} title={title || preset.title}>{children}</Callout>;
}
