'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { rewards, useProgress } from '../progress-provider';

const SITE_SUFFIX = / \| University CS Docs$/;

/**
 * Counts a docs page as read after the reader has stayed on it for a few seconds with the tab visible,
 * so a quick bounce does not count. The path is remembered at once for "continue where you left off".
 */
export function PageTracker() {
  const pathname = usePathname();
  const progress = useProgress();
  const record = progress?.record;
  const ready = progress?.ready ?? false;

  useEffect(() => {
    if (!record || !ready) return;
    if (!pathname.startsWith('/docs') || pathname.startsWith('/docs/dashboard')) return;

    const title = () => document.title.replace(SITE_SUFFIX, '');
    record({ type: 'visit', path: pathname, title: title() });

    let seconds = 0;
    let counted = false;
    const timer = setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      seconds += 1;
      if (!counted && seconds >= rewards.rules.pageDwellSeconds) {
        counted = true;
        record({ type: 'page', path: pathname, title: title() });
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [pathname, record, ready]);

  return null;
}
