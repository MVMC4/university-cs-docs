'use client';

import { BookOpen, ChartLine, Home, Medal, Settings as SettingsIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useProgress } from '../progress-provider';
import { BadgesTab } from './badges';
import { CoursesTab } from './courses';
import { Overview } from './overview';
import { SettingsTab } from './settings';
import { TrendsTab } from './trends';

const TABS = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'courses', label: 'My courses', icon: BookOpen },
  { id: 'progress', label: 'Progress', icon: ChartLine },
  { id: 'badges', label: 'Badges', icon: Medal },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
] as const;

export type TabId = (typeof TABS)[number]['id'];

const isTab = (value: string): value is TabId => TABS.some((tab) => tab.id === value);

/**
 * The learner's dashboard, in five sections: an overview with today's goal and what to do next, the courses they
 * follow, their trends, their badges, and their settings. The section is kept in the address (#courses), so it can
 * be linked to and survives a refresh.
 */
export function ProgressDashboard() {
  const progress = useProgress();
  const [tab, setTab] = useState<TabId>('overview');

  useEffect(() => {
    const read = () => {
      const hash = window.location.hash.replace('#', '');
      if (isTab(hash)) setTab(hash);
    };
    read();
    window.addEventListener('hashchange', read);
    return () => window.removeEventListener('hashchange', read);
  }, []);

  const go = useCallback((next: TabId) => {
    setTab(next);
    window.history.replaceState(null, '', `#${next}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!progress || !progress.ready) {
    return <p className="pg-note" aria-live="polite">Loading your dashboard...</p>;
  }

  return (
    <div className="pg">
      {!progress.state.enabled && (
        <p className="pg-off">Progress tracking is off, so nothing new is being saved. You can turn it back on under Settings.</p>
      )}

      <div className="pg-tabs" role="tablist" aria-label="Dashboard sections">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`pg-tab-${id}`}
            aria-selected={tab === id}
            aria-controls={`pg-panel-${id}`}
            tabIndex={tab === id ? 0 : -1}
            onClick={() => go(id)}
            onKeyDown={(event) => {
              const index = TABS.findIndex((item) => item.id === tab);
              if (event.key === 'ArrowRight') go(TABS[(index + 1) % TABS.length].id);
              if (event.key === 'ArrowLeft') go(TABS[(index - 1 + TABS.length) % TABS.length].id);
            }}
          >
            <Icon size={16} aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`pg-panel-${tab}`} aria-labelledby={`pg-tab-${tab}`} className="pg-panelwrap">
        {tab === 'overview' && <Overview progress={progress} go={go} />}
        {tab === 'courses' && <CoursesTab progress={progress} />}
        {tab === 'progress' && <TrendsTab progress={progress} />}
        {tab === 'badges' && <BadgesTab progress={progress} />}
        {tab === 'settings' && <SettingsTab progress={progress} />}
      </div>
    </div>
  );
}
