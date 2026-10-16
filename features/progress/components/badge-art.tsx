import { Lock } from 'lucide-react';
import { badgeIcon } from '../icons';
import type { BadgeDef } from '../core';

/**
 * Badge artwork: a frame drawn for the badge's category (shape) and coloured for its difficulty (tier), with the
 * badge's icon in the middle. Locked badges are shown as a dashed outline so they read as something to work towards.
 *
 *   shape: hex (reading), shield (streaks), round (quizzes), burst (mastery), square (practice), crest (levels, courses, goals)
 *   tier:  bronze, silver, gold, ink (the rarest)
 */
export type BadgeShape = 'hex' | 'shield' | 'round' | 'burst' | 'square' | 'crest';
export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'ink';

const burstPoints = Array.from({ length: 24 }, (_, index) => {
  const angle = (Math.PI * 2 * index) / 24 - Math.PI / 2;
  const radius = index % 2 === 0 ? 30 : 25;
  return `${(32 + radius * Math.cos(angle)).toFixed(2)},${(32 + radius * Math.sin(angle)).toFixed(2)}`;
}).join(' ');

/** Outer outline and the slightly smaller inner outline of each frame, drawn in a 64 by 64 box. */
function frame(shape: BadgeShape) {
  switch (shape) {
    case 'hex':
      return { outer: <polygon points="32,3 57,17.5 57,46.5 32,61 7,46.5 7,17.5" />, inner: <polygon points="32,9 52,20.5 52,43.5 32,55 12,43.5 12,20.5" /> };
    case 'shield':
      return {
        outer: <path d="M32 3 L57 11 V32 C57 47 46 57 32 62 C18 57 7 47 7 32 V11 Z" />,
        inner: <path d="M32 9 L51 15 V32 C51 43 43 51 32 55.5 C21 51 13 43 13 32 V15 Z" />,
      };
    case 'round':
      return { outer: <circle cx="32" cy="32" r="29" />, inner: <circle cx="32" cy="32" r="22.5" /> };
    case 'burst':
      return { outer: <polygon points={burstPoints} />, inner: <circle cx="32" cy="32" r="19" /> };
    case 'square':
      return { outer: <rect x="5" y="5" width="54" height="54" rx="14" />, inner: <rect x="11" y="11" width="42" height="42" rx="9" /> };
    case 'crest':
      return {
        outer: <path d="M32 4 A23 23 0 1 1 31.99 4 Z M17 42 L10 62 L23 56 L32 62 L41 56 L54 62 L47 42" />,
        inner: <circle cx="32" cy="27" r="17" />,
      };
  }
}

const pips: Record<BadgeTier, number> = { bronze: 1, silver: 2, gold: 3, ink: 4 };

export function BadgeArt({
  badge,
  earned,
  size = 72,
  fresh = false,
}: {
  badge: Pick<BadgeDef, 'id' | 'icon'> & { shape?: string; tier?: string };
  earned: boolean;
  size?: number;
  /** Earned recently: a soft ring pulses around it. */
  fresh?: boolean;
}) {
  const shape = (badge.shape ?? 'round') as BadgeShape;
  const tier = (badge.tier ?? 'bronze') as BadgeTier;
  const { outer, inner } = frame(shape);
  const Icon = badgeIcon(badge.icon);
  const count = pips[tier] ?? 1;
  return (
    <span className="pg-art" data-earned={earned || undefined} data-tier={tier} data-shape={shape} data-fresh={fresh || undefined} style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 64 64" width={size} height={size}>
        <g className="pg-art-outer">{outer}</g>
        <g className="pg-art-inner">{inner}</g>
        {earned && (
          <g className="pg-art-pips">
            {Array.from({ length: count }, (_, index) => (
              <circle key={index} cx={32 + (index - (count - 1) / 2) * 6} cy={shape === 'crest' ? 47 : 53} r="1.7" />
            ))}
          </g>
        )}
      </svg>
      <span className="pg-art-icon" style={{ top: shape === 'crest' ? '38%' : '45%' }}>
        {earned ? <Icon size={Math.round(size * 0.34)} strokeWidth={2} /> : <Lock size={Math.round(size * 0.28)} strokeWidth={2} />}
      </span>
    </span>
  );
}
