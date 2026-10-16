'use client';

import { useMemo, useState } from 'react';
import { badgeProgress } from '../core';
import { BadgeArt } from '../components/badge-art';
import { rewards, type ProgressContext } from '../progress-provider';

type Filter = 'all' | 'earned' | 'progress' | 'locked';

const TIERS = [
  { id: 'bronze', label: 'Bronze', note: 'First steps' },
  { id: 'silver', label: 'Silver', note: 'Building a habit' },
  { id: 'gold', label: 'Gold', note: 'Real commitment' },
  { id: 'ink', label: 'Ink', note: 'The rarest' },
] as const;

const DAY = 86_400_000;

export function BadgesTab({ progress }: { progress: ProgressContext }) {
  const { state, manifest } = progress;
  const [filter, setFilter] = useState<Filter>('all');

  const rows = useMemo(() => {
    const items = rewards.badges.map((badge) => {
      const earned = state.badges[badge.id];
      const p = badgeProgress(badge, state, { rewards, manifest });
      return { badge, earned, p, fraction: p ? p.have / p.need : 0 };
    });
    const rank = (item: (typeof items)[number]) => (item.earned ? 0 : item.fraction > 0 ? 1 : 2);
    return items.sort((a, b) => rank(a) - rank(b) || (a.earned && b.earned ? b.earned.at - a.earned.at : b.fraction - a.fraction));
  }, [state, manifest]);

  const earnedCount = rows.filter((row) => row.earned).length;
  const visible = rows.filter((row) => {
    if (filter === 'earned') return row.earned;
    if (filter === 'progress') return !row.earned && row.fraction > 0;
    if (filter === 'locked') return !row.earned && row.fraction === 0;
    return true;
  });
  const date = (ms: number) => new Date(ms).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="pg-badgestab">
      <header className="pg-sectionhead">
        <div>
          <h2>Badges</h2>
          <p>{earnedCount} of {rows.length} earned. Each one marks something you actually did.</p>
        </div>
        <div className="pg-range" role="group" aria-label="Filter badges">
          {([['all', 'All'], ['earned', 'Earned'], ['progress', 'In progress'], ['locked', 'Locked']] as [Filter, string][]).map(([value, label]) => (
            <button key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)}>{label}</button>
          ))}
        </div>
      </header>

      <ul className="pg-tierlegend" aria-label="Badge tiers">
        {TIERS.map((tier) => (
          <li key={tier.id} data-tier={tier.id}><i />{tier.label}<span>{tier.note}</span></li>
        ))}
      </ul>

      <ul className="pg-badgegrid">
        {visible.map(({ badge, earned, p, fraction }) => (
          <li key={badge.id} data-earned={earned ? true : undefined}>
            <BadgeArt badge={badge} earned={Boolean(earned)} size={84} fresh={Boolean(earned && Date.now() - earned.at < DAY)} />
            <div>
              <strong>{badge.title}</strong>
              <span>{badge.description}</span>
              {earned ? (
                <small>Earned {date(earned.at)}</small>
              ) : p ? (
                <>
                  <div className="pg-bar" role="progressbar" aria-label={badge.title} aria-valuemin={0} aria-valuemax={p.need} aria-valuenow={p.have}><div style={{ width: `${fraction * 100}%` }} /></div>
                  <small>{p.have} of {p.need}</small>
                </>
              ) : (
                <small>Keep studying to unlock it</small>
              )}
            </div>
          </li>
        ))}
      </ul>
      {visible.length === 0 && <p className="pg-empty">No badges here yet.</p>}
    </div>
  );
}
