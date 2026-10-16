import type { ReactNode } from 'react';
import { KeyTerm, type KeyTermTone } from '@/components/learning/key-term';

type Variant = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

// "neutral" is what existing notes use for theorems, so it takes the theorem colour.
const tones: Record<Variant, KeyTermTone> = {
  primary: 'blue',
  info: 'blue',
  neutral: 'purple',
  success: 'green',
  warning: 'amber',
  danger: 'red',
};

/** Retired: renders as a KeyTerm with the title, then the description and any statement. */
export function HighlightCard({
  title,
  description,
  variant = 'primary',
  children,
}: {
  title?: ReactNode;
  description?: ReactNode;
  variant?: Variant;
  children?: ReactNode;
}) {
  return (
    <KeyTerm label={null} title={title} tone={tones[variant]}>
      {description ? <p>{description}</p> : null}
      {children}
    </KeyTerm>
  );
}
