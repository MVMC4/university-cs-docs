import type { ReactNode } from 'react';
import { Callout } from '@/components/callouts/callout';
import { KeyTerm } from './key-term';

/* Retired names kept for existing pages; each renders as a standard element. */

export function ConceptBlock({ title, children }: { title: string; children: ReactNode }) {
  return <KeyTerm label="Concept" title={title}>{children}</KeyTerm>;
}

export function TheoremBlock({ title, children }: { title: string; children: ReactNode }) {
  return <KeyTerm label="Theorem" title={title} tone="purple">{children}</KeyTerm>;
}

export function RecognitionStrategy({ title = 'How to recognize it', children }: { title?: string; children: ReactNode }) {
  return <Callout type="tip" title={title}>{children}</Callout>;
}

export function CommonMistake({ title = 'Common mistake', children }: { title?: string; children: ReactNode }) {
  return <Callout type="mistake" title={title}>{children}</Callout>;
}
