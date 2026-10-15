import type { ReactNode } from 'react';

export type KeyTermTone = 'blue' | 'purple' | 'green' | 'amber' | 'red';

/**
 * A definition, theorem or rule the reader must know exactly: a bordered box with a
 * coloured rule on the left, a small label ("Key term", "Theorem") and an optional title.
 * Definitions use blue and theorems purple, so the same kind of statement looks the same in every course.
 */
export function KeyTerm({
  label = 'Key term',
  title,
  tone = 'blue',
  children,
}: {
  label?: ReactNode;
  title?: ReactNode;
  tone?: KeyTermTone;
  children?: ReactNode;
}) {
  return (
    <div className={`ui-term ui-term-${tone}`}>
      {label ? <span className="ui-term-label">{label}</span> : null}
      {title ? <div className="ui-term-title">{title}</div> : null}
      <div className="ui-term-body">{children}</div>
    </div>
  );
}
