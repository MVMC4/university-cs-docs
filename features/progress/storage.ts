import {
  COOKIE_NAME,
  STORAGE_KEY,
  decodeSummary,
  emptyState,
  encodeSummary,
  migrate,
  stateFromSummary,
  type ProgressState,
} from './core';

const COOKIE_DAYS = 400;

export type LoadResult = { state: ProgressState; source: 'storage' | 'cookie' | 'new' };

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  for (const part of document.cookie.split('; ')) {
    const index = part.indexOf('=');
    if (index > 0 && part.slice(0, index) === name) {
      try {
        return decodeURIComponent(part.slice(index + 1));
      } catch {
        return null;
      }
    }
  }
  return null;
}

function writeCookie(name: string, value: string) {
  if (typeof document === 'undefined') return;
  const secure = typeof location !== 'undefined' && location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${COOKIE_DAYS * 86400}; Path=/; SameSite=Lax${secure}`;
}

function clearCookie(name: string) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
}

function readStorage(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * Full state lives in localStorage; a short summary of it is mirrored into a first-party cookie. If browser
 * storage is cleared but the cookie survives, the streak and level come back (the detailed history does not).
 * Both reads are defensive: any failure yields a fresh state, never an exception.
 */
export function loadState(now: number): LoadResult {
  const stored = readStorage();
  if (stored) {
    try {
      return { state: migrate(JSON.parse(stored), now), source: 'storage' };
    } catch {
      // fall through to the cookie
    }
  }
  const summary = decodeSummary(readCookie(COOKIE_NAME));
  if (summary) return { state: stateFromSummary(summary, now), source: 'cookie' };
  return { state: emptyState(now), source: 'new' };
}

/** Read the state another tab wrote, if it is newer than `than`. */
export function readNewer(than: number, now: number): ProgressState | null {
  const stored = readStorage();
  if (!stored) return null;
  try {
    const state = migrate(JSON.parse(stored), now);
    return state.updatedAt > than ? state : null;
  } catch {
    return null;
  }
}

export function saveState(state: ProgressState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage may be full or blocked (private mode). Progress then lasts for this visit only.
  }
  if (state.enabled) writeCookie(COOKIE_NAME, encodeSummary(state));
  else clearCookie(COOKIE_NAME);
}

export function clearSaved() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  clearCookie(COOKIE_NAME);
}
