'use client';

import React, { useState } from 'react';
import { RotateCw } from 'lucide-react';
import { MathText } from './math-text';

// Inline, framework-proof flip mechanics. The old version relied on
// Tailwind arbitrary properties ([transform-style:preserve-3d],
// [backface-visibility:hidden]) which is what broke the orientation.
const FLIP_TRANSITION = 'transform 0.65s cubic-bezier(0.34, 1.18, 0.5, 1)';

const FACE_BASE: React.CSSProperties = {
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
};

export function Flashcard({ front, back }: { front: string; back: string }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggle = () => setIsFlipped((v) => !v);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isFlipped}
      aria-label="Flip flashcard"
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      }}
      className="group relative my-6 block h-64 w-full cursor-pointer touch-manipulation select-none rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-fd-primary"
      style={{ perspective: '1400px' }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-1.5 rounded-2xl bg-fd-primary/0 blur-xl transition-colors duration-500 group-hover:bg-fd-primary/10"
      />

      <div
        className="relative h-full w-full"
        style={{
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
          willChange: 'transform',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: FLIP_TRANSITION,
        }}
      >
        <div
          className="absolute inset-0 flex flex-col overflow-hidden rounded-xl border border-fd-border bg-fd-background shadow-md transition-shadow duration-300 group-hover:shadow-xl"
          style={{ ...FACE_BASE, transform: 'rotateY(0deg)' }}
        >
          <div className="flex items-center justify-between border-b border-fd-border/70 bg-fd-muted/40 px-5 py-2.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-fd-muted-foreground">
              Concept
            </span>
            <RotateCw className="h-3.5 w-3.5 text-fd-muted-foreground transition-transform duration-500 group-hover:rotate-180" />
          </div>
          <div className="flex flex-1 items-center justify-center overflow-y-auto px-6 py-4 text-center">
            <div className="w-full break-words text-lg font-semibold leading-snug text-fd-foreground">
              <MathText text={front} />
            </div>
          </div>
          <div className="border-t border-fd-border/70 px-5 py-2 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-fd-muted-foreground/70">
            Click to reveal answer
          </div>
        </div>

        <div
          className="absolute inset-0 flex flex-col overflow-hidden rounded-xl border border-fd-primary/40 bg-fd-background shadow-md transition-shadow duration-300 group-hover:shadow-xl"
          style={{ ...FACE_BASE, transform: 'rotateY(180deg)' }}
        >
          <div className="flex items-center justify-between border-b border-fd-primary/25 bg-fd-primary/10 px-5 py-2.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-fd-primary">
              Answer
            </span>
            <RotateCw className="h-3.5 w-3.5 text-fd-primary transition-transform duration-500 group-hover:-rotate-180" />
          </div>
          <div className="flex flex-1 items-center justify-center overflow-y-auto px-6 py-4 text-center">
            <div className="w-full break-words text-base leading-relaxed text-fd-foreground">
              <MathText text={back} />
            </div>
          </div>
          <div className="border-t border-fd-primary/25 px-5 py-2 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-fd-primary/60">
            Click to flip back
          </div>
        </div>
      </div>
    </div>
  );
}
