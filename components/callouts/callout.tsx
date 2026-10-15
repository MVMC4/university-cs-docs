import type { ReactNode } from 'react';
import { CircleX, Info, Lightbulb, MessageSquare, Star, TriangleAlert } from 'lucide-react';

/**
 * Tinted note boxes. Each kind keeps one meaning on every page:
 * note (extra information), tip (practical advice), caution (a trap to watch for),
 * warn (something that goes wrong), key (the point to remember), analogy (an everyday comparison).
 * The Fumadocs names used in existing notes (info, warning, error, success, idea) map onto these.
 */
type Kind = 'note' | 'tip' | 'caution' | 'warn' | 'key' | 'analogy';

const aliases: Record<string, Kind> = {
  info: 'note',
  note: 'note',
  tip: 'tip',
  success: 'tip',
  warn: 'caution',
  warning: 'caution',
  caution: 'caution',
  error: 'warn',
  danger: 'warn',
  mistake: 'warn',
  idea: 'key',
  key: 'key',
  analogy: 'analogy',
};

const labels: Record<Kind, string> = {
  note: 'Note',
  tip: 'Tip',
  caution: 'Caution',
  warn: 'Common mistake',
  key: 'Key point',
  analogy: 'Think of it like this',
};

const icons: Record<Kind, ReactNode> = {
  note: <Info />,
  tip: <Lightbulb />,
  caution: <TriangleAlert />,
  warn: <CircleX />,
  key: <Star />,
  analogy: <MessageSquare />,
};

export function Callout({
  type = 'note',
  title,
  icon,
  children,
}: {
  type?: string;
  title?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
}) {
  const kind = aliases[type] ?? 'note';

  return (
    <div className={`ui-callout ui-callout-${kind}`} role="note">
      <div className="ui-callout-icon" aria-hidden="true">{icon ?? icons[kind]}</div>
      <div className="ui-callout-body">
        <span className="ui-callout-label">{title ?? labels[kind]}</span>
        {children}
      </div>
    </div>
  );
}
