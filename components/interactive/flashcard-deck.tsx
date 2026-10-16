'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRecord } from '@/features/progress';
import { FlipCard } from './flashcard';

type Card = { front: string; back: string };

/** The flashcard deck used on every review page: one card at a time, a progress strip and pill controls. */
export function FlashcardDeck({ cards, title = 'Flashcards' }: { cards: Card[]; title?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const record = useRecord();
  const pathname = usePathname();

  if (!cards || cards.length === 0) return <p className="ui-quiz-empty">No flashcards for this section yet.</p>;

  const total = cards.length;
  const index = ((currentIndex % total) + total) % total;
  const card = cards[index];

  // Turning a card to its answer counts as studying it.
  const flip = () => {
    if (!isFlipped) record({ type: 'card', deck: `${pathname}#${title}` });
    setIsFlipped((value) => !value);
  };

  const goTo = (next: number) => {
    if (next === index) {
      flip();
      return;
    }
    setCurrentIndex(next);
    setIsFlipped(false);
  };

  return (
    <section className="ui-deck">
      <header className="ui-deck-head">
        <h3>{title}</h3>
        <span className="ui-quiz-stats">Card {index + 1} of {total}</span>
      </header>
      <div className="ui-deck-progress" aria-hidden="true"><div style={{ width: `${((index + 1) / total) * 100}%` }} /></div>

      <div className="ui-deck-stage">
        <FlipCard key={index} front={card.front} back={card.back} flipped={isFlipped} onFlip={flip} label={`Card ${index + 1} of ${total}`} />
      </div>

      <div className="ui-deck-dots" role="group" aria-label="Jump to a card">
        {cards.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Card ${i + 1}`}
            aria-current={i === index ? 'true' : undefined}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <footer className="ui-deck-foot">
        <button type="button" className="ui-btn ui-btn-sm" onClick={() => goTo((index - 1 + total) % total)}><ArrowLeft size={15} /> Previous</button>
        <span>Select the card to flip it</span>
        <button type="button" className="ui-btn ui-btn-primary ui-btn-sm" onClick={() => goTo((index + 1) % total)}>Next <ArrowRight size={15} /></button>
      </footer>
    </section>
  );
}
