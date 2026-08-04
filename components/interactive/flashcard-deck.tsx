'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';
import { MathText } from './math-text';

type Card = { front: string; back: string };

// Inline, framework-proof flip mechanics. No Tailwind arbitrary
// 3D classes, no transform enter-animations near the card.
const FLIP_TRANSITION = 'transform 0.65s cubic-bezier(0.34, 1.18, 0.5, 1)';

const FACE_BASE: React.CSSProperties = {
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
};

export function FlashcardDeck({
  cards,
  title = 'Flashcard Deck',
}: {
  cards: Card[];
  title?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!cards || cards.length === 0) {
    return (
      <p className="my-8 text-center text-fd-muted-foreground">No flashcards provided.</p>
    );
  }

  const totalCards = cards.length;
  const safeIndex = ((currentIndex % totalCards) + totalCards) % totalCards;
  const currentCard = cards[safeIndex];
  const progress = ((safeIndex + 1) / totalCards) * 100;

  const flip = () => setIsFlipped((v) => !v);

  const goTo = (index: number) => {
    if (index === safeIndex) {
      flip();
      return;
    }
    setCurrentIndex(index);
    setIsFlipped(false);
  };

  const goNext = () => goTo((safeIndex + 1) % totalCards);
  const goPrev = () => goTo((safeIndex - 1 + totalCards) % totalCards);

  return (
    <div className="my-8 overflow-hidden rounded-xl border border-fd-border bg-fd-background shadow-sm">
      <div className="border-b border-fd-border bg-fd-muted/40 px-5 py-3.5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="truncate text-base font-bold text-fd-foreground">{title}</h3>
          <span className="shrink-0 rounded-full bg-fd-background px-2.5 py-0.5 font-mono text-xs font-semibold text-fd-muted-foreground ring-1 ring-fd-border">
            {safeIndex + 1} / {totalCards}
          </span>
        </div>
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-fd-border/60">
          <div
            className="h-full rounded-full bg-fd-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="relative px-4 py-6 sm:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-12 top-8 h-36 rounded-full bg-fd-primary/5 blur-3xl"
        />

        <div key={safeIndex} className="animate-in fade-in duration-300 relative mx-auto max-w-2xl">
          <div
            role="button"
            tabIndex={0}
            aria-pressed={isFlipped}
            aria-label={`Flashcard ${safeIndex + 1} of ${totalCards}. Activate to flip.`}
            onClick={flip}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                flip();
              }
            }}
            className="group relative block h-64 w-full cursor-pointer touch-manipulation select-none rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-fd-primary sm:h-72"
            style={{ perspective: '1400px' }}
          >
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
                className="absolute inset-0 flex flex-col overflow-hidden rounded-xl border border-fd-border bg-fd-background shadow-lg transition-shadow duration-300 group-hover:shadow-xl"
                style={{ ...FACE_BASE, transform: 'rotateY(0deg)' }}
              >
                <div className="flex items-center justify-between border-b border-fd-border/70 bg-fd-muted/40 px-5 py-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-fd-muted-foreground">
                    Concept · {safeIndex + 1}
                  </span>
                  <RotateCw className="h-3.5 w-3.5 text-fd-muted-foreground transition-transform duration-500 group-hover:rotate-180" />
                </div>
                <div className="flex flex-1 items-center justify-center overflow-y-auto px-6 py-4 text-center">
                  <div className="w-full break-words text-lg font-semibold leading-snug text-fd-foreground">
                    <MathText text={currentCard.front} />
                  </div>
                </div>
                <div className="border-t border-fd-border/70 px-5 py-2 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-fd-muted-foreground/70">
                  Click to reveal answer
                </div>
              </div>

              <div
                className="absolute inset-0 flex flex-col overflow-hidden rounded-xl border border-fd-primary/40 bg-fd-background shadow-lg transition-shadow duration-300 group-hover:shadow-xl"
                style={{ ...FACE_BASE, transform: 'rotateY(180deg)' }}
              >
                <div className="flex items-center justify-between border-b border-fd-primary/25 bg-fd-primary/10 px-5 py-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-fd-primary">
                    Answer · {safeIndex + 1}
                  </span>
                  <RotateCw className="h-3.5 w-3.5 text-fd-primary transition-transform duration-500 group-hover:-rotate-180" />
                </div>
                <div className="flex flex-1 items-center justify-center overflow-y-auto px-6 py-4 text-center">
                  <div className="w-full break-words text-base leading-relaxed text-fd-foreground">
                    <MathText text={currentCard.back} />
                  </div>
                </div>
                <div className="border-t border-fd-primary/25 px-5 py-2 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-fd-primary/60">
                  Click to flip back
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex max-h-24 flex-wrap justify-center gap-1.5 overflow-y-auto px-6 pb-3">
        {cards.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to card ${index + 1}`}
            aria-current={index === safeIndex ? 'true' : undefined}
            className={`h-7 min-w-7 rounded-md px-1.5 font-mono text-[11px] font-semibold transition-all duration-200 ${
              index === safeIndex
                ? 'scale-105 bg-fd-primary text-fd-primary-foreground shadow-sm'
                : 'bg-fd-muted text-fd-muted-foreground hover:bg-fd-border hover:text-fd-foreground'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-fd-border bg-fd-muted/30 px-4 py-3">
        <button
          type="button"
          onClick={goPrev}
          className="flex items-center gap-1.5 rounded-lg border border-fd-border bg-fd-background px-3.5 py-2 text-sm font-medium text-fd-foreground transition-all duration-200 hover:border-fd-primary/40 hover:text-fd-primary active:scale-95"
        >
          <ChevronLeft className="h-4 w-4" /> Prev
        </button>
        <span className="hidden text-xs italic text-fd-muted-foreground sm:block">
          Click the card to flip
        </span>
        <button
          type="button"
          onClick={goNext}
          className="flex items-center gap-1.5 rounded-lg bg-fd-primary px-3.5 py-2 text-sm font-medium text-fd-primary-foreground shadow-sm transition-all duration-200 hover:bg-fd-primary/90 active:scale-95"
        >
          Next <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
