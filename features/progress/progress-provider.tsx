'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import aliasData from '@/content/progress/aliases.json';
import messageData from '@/content/progress/messages.json';
import rewardData from '@/content/progress/rewards.json';
import {
  STORAGE_KEY,
  applyEvent,
  awardBadges,
  catchUpBadges,
  dayKey,
  effectiveStreak,
  emptyState,
  levelFor,
  parseImport,
  serialize,
  type Manifest,
  type MessagesConfig,
  type Notice,
  type ProgressEvent,
  type ProgressState,
  type RewardsConfig,
} from './core';
import { clearSaved, loadState, readNewer, saveState } from './storage';

export const rewards = rewardData as unknown as RewardsConfig;
export const messages = messageData as unknown as MessagesConfig;
const aliases = (aliasData as { pages: Record<string, string> }).pages;
const MANIFEST_URL = '/progress-manifest.json';

export type ToastNotice = Notice & { key: number };

export type ProgressContext = {
  /** False until the saved state has been read in the browser. */
  ready: boolean;
  state: ProgressState;
  today: string;
  streak: ReturnType<typeof effectiveStreak>;
  level: ReturnType<typeof levelFor>;
  manifest: Manifest | null;
  notices: ToastNotice[];
  dismiss: (key: number) => void;
  record: (event: ProgressEvent) => void;
  setEnabled: (enabled: boolean) => void;
  setToasts: (toasts: boolean) => void;
  /** Choose which courses the dashboard follows. */
  setCourses: (ids: string[]) => void;
  toggleCourse: (id: string) => void;
  setName: (name: string) => void;
  setGoal: (xp: number) => void;
  reset: () => void;
  exportJson: () => string;
  importJson: (text: string) => void;
};

const Context = createContext<ProgressContext | null>(null);

export function useProgress(): ProgressContext | null {
  return useContext(Context);
}

/** For components that only report activity: a safe no-op outside the provider. */
export function useRecord(): (event: ProgressEvent) => void {
  const context = useContext(Context);
  return context?.record ?? noop;
}

function noop() {}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(() => emptyState(0));
  const [ready, setReady] = useState(false);
  const [today, setToday] = useState('');
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [notices, setNotices] = useState<ToastNotice[]>([]);

  const stateRef = useRef(state);
  const manifestRef = useRef<Manifest | null>(null);
  const noticeKey = useRef(0);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // True only while there is something new to save. Saving an unchanged state on page hide would overwrite
  // progress another open tab has made since.
  const dirty = useRef(false);

  const apply = useCallback((next: ProgressState) => {
    stateRef.current = next;
    setState(next);
  }, []);

  const flush = useCallback(() => {
    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
      saveTimer.current = null;
    }
    if (!dirty.current) return;
    dirty.current = false;
    saveState(stateRef.current);
  }, []);

  const scheduleSave = useCallback(() => {
    dirty.current = true;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(flush, 250);
  }, [flush]);

  // Read the saved state once, after hydration, so the server and first client render agree.
  useEffect(() => {
    const now = Date.now();
    const { state: loaded, source } = loadState(now);
    const caught = catchUpBadges(loaded, { rewards, now, manifest: manifestRef.current });
    apply(caught);
    setToday(dayKey(now));
    setReady(true);
    if (source !== 'storage' || caught !== loaded) saveState(caught);
  }, [apply]);

  // The course list (static JSON) is needed for course badges and the dashboard. Fetch it when the browser is idle.
  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    const timer = setTimeout(() => {
      fetch(MANIFEST_URL)
        .then((response) => (response.ok ? (response.json() as Promise<Manifest>) : null))
        .then((data) => {
          if (cancelled || !data) return;
          manifestRef.current = data;
          setManifest(data);
          const now = Date.now();
          const caught = catchUpBadges(stateRef.current, { rewards, now, manifest: data });
          if (caught !== stateRef.current) {
            apply(caught);
            scheduleSave();
          }
        })
        .catch(() => {});
    }, 1500);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [ready, apply, scheduleSave]);

  // Roll the day over while the page stays open, and save on the way out.
  useEffect(() => {
    const tick = setInterval(() => setToday(dayKey(Date.now())), 60_000);
    const onHide = () => flush();
    const onVisible = () => {
      if (document.visibilityState === 'hidden') flush();
      else setToday(dayKey(Date.now()));
    };
    window.addEventListener('pagehide', onHide);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      clearInterval(tick);
      window.removeEventListener('pagehide', onHide);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [flush]);

  // Another tab saved newer progress: take it.
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== null && event.key !== STORAGE_KEY) return;
      const newer = readNewer(stateRef.current.updatedAt, Date.now());
      if (newer) apply(newer);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [apply]);

  const record = useCallback(
    (event: ProgressEvent) => {
      const now = Date.now();
      const result = applyEvent(stateRef.current, event, {
        now,
        today: dayKey(now),
        rewards,
        manifest: manifestRef.current,
        aliases,
      });
      if (result.state === stateRef.current) return;
      apply(result.state);
      scheduleSave();
      if (result.notices.length > 0 && result.state.settings.toasts) {
        const shown = result.notices
          .filter((notice) => notice.kind !== 'streak' || notice.current >= 2)
          .map((notice) => ({ ...notice, key: (noticeKey.current += 1) }));
        if (shown.length > 0) setNotices((previous) => [...previous, ...shown].slice(-4));
      }
    },
    [apply, scheduleSave],
  );

  const dismiss = useCallback((key: number) => setNotices((previous) => previous.filter((notice) => notice.key !== key)), []);

  const setEnabled = useCallback(
    (enabled: boolean) => {
      apply({ ...stateRef.current, enabled, updatedAt: Date.now() });
      dirty.current = true;
      flush();
    },
    [apply, flush],
  );

  const setToasts = useCallback(
    (toasts: boolean) => {
      apply({ ...stateRef.current, settings: { ...stateRef.current.settings, toasts }, updatedAt: Date.now() });
      scheduleSave();
    },
    [apply, scheduleSave],
  );

  const changeSettings = useCallback(
    (patch: Partial<ProgressState['settings']>) => {
      const now = Date.now();
      const next = { ...stateRef.current, settings: { ...stateRef.current.settings, ...patch }, updatedAt: now };
      const awarded = awardBadges(next, { rewards, now, manifest: manifestRef.current });
      apply(awarded.state);
      scheduleSave();
      if (awarded.notices.length > 0 && awarded.state.settings.toasts) {
        const shown = awarded.notices.map((notice) => ({ ...notice, key: (noticeKey.current += 1) }));
        setNotices((previous) => [...previous, ...shown].slice(-4));
      }
    },
    [apply, scheduleSave],
  );

  const setCourses = useCallback((ids: string[]) => changeSettings({ courses: [...new Set(ids)] }), [changeSettings]);
  const toggleCourse = useCallback(
    (id: string) => {
      const chosen = stateRef.current.settings.courses;
      changeSettings({ courses: chosen.includes(id) ? chosen.filter((item) => item !== id) : [...chosen, id] });
    },
    [changeSettings],
  );
  const setName = useCallback((name: string) => changeSettings({ name: name.slice(0, 40) }), [changeSettings]);
  const setGoal = useCallback((xp: number) => changeSettings({ goalXp: Math.max(5, Math.min(500, Math.round(xp))) }), [changeSettings]);

  const reset = useCallback(() => {
    const fresh = emptyState(Date.now());
    fresh.enabled = stateRef.current.enabled;
    apply(fresh);
    setNotices([]);
    dirty.current = false;
    clearSaved();
    if (fresh.enabled) saveState(fresh);
  }, [apply]);

  const exportJson = useCallback(() => serialize(stateRef.current), []);

  const importJson = useCallback(
    (text: string) => {
      const now = Date.now();
      const imported = parseImport(text, now);
      apply(catchUpBadges({ ...imported, updatedAt: now }, { rewards, now, manifest: manifestRef.current }));
      dirty.current = true;
      flush();
    },
    [apply, flush],
  );

  const value = useMemo<ProgressContext>(
    () => ({
      ready,
      state,
      today,
      streak: today ? effectiveStreak(state.streak, today) : { value: 0, status: 'none' },
      level: levelFor(state.xp, rewards.levels),
      manifest,
      notices,
      dismiss,
      record,
      setEnabled,
      setToasts,
      setCourses,
      toggleCourse,
      setName,
      setGoal,
      reset,
      exportJson,
      importJson,
    }),
    [ready, state, today, manifest, notices, dismiss, record, setEnabled, setToasts, setCourses, toggleCourse, setName, setGoal, reset, exportJson, importJson],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
