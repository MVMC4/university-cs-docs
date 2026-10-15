'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchContext } from 'fumadocs-ui/contexts/search';

function isTyping(target: EventTarget | null) {
  return target instanceof HTMLElement && (target.isContentEditable || Boolean(target.closest('input, textarea, select, [role="textbox"]')));
}

/**
 * Keyboard shortcuts for reading: ← and → turn pages, / opens search.
 * Also draws the reading-progress line along the bottom of the header.
 */
export function PageKeys({ previous, next }: { previous?: string; next?: string }) {
  const router = useRouter();
  const { setOpenSearch } = useSearchContext();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (isTyping(event.target) || document.querySelector('[role="dialog"][data-state="open"], [aria-modal="true"]')) return;

      if (event.key === '/') {
        event.preventDefault();
        setOpenSearch(true);
      } else if (event.key === 'ArrowLeft' && previous) {
        router.push(previous);
      } else if (event.key === 'ArrowRight' && next) {
        router.push(next);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [previous, next, router, setOpenSearch]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? root.scrollTop / max : 0})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return <div ref={barRef} className="ui-progress" aria-hidden="true" />;
}
