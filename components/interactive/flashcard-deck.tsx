'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MathText } from './math-text';

type Card = { front: string; back: string };

export function FlashcardDeck({ cards, title = "Flashcard Deck" }: { cards: Card[], title?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(1);
  
  if (!cards || cards.length === 0) {
    return <p className="text-fd-muted-foreground my-8 text-center">No flashcards provided.</p>;
  }

  const totalCards = cards.length;

  const goTo = (index: number) => {
    if (index === currentIndex) {
      setIsFlipped(!isFlipped);
      return;
    }
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsFlipped(false);
  };

  const goNext = () => goTo((currentIndex + 1) % totalCards);
  const goPrev = () => goTo((currentIndex - 1 + totalCards) % totalCards);

  const animationClass = direction === 1 
    ? "animate-in fade-in slide-in-from-right-8 duration-300" 
    : "animate-in fade-in slide-in-from-left-8 duration-300";

  const currentCard = cards[currentIndex];

  return (
    <div className="my-8 rounded-xl border border-fd-border bg-fd-background p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-fd-foreground">{title}</h3>
        <span className="text-sm font-medium text-fd-muted-foreground bg-fd-muted px-3 py-1 rounded-full">
          Card {currentIndex + 1} of {totalCards}
        </span>
      </div>
      
      <div 
        className="min-h-[280px] flex items-center justify-center p-4 overflow-hidden cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div key={currentIndex} className={`w-full ${animationClass} [perspective:1000px]`}>
          <div className={`relative h-64 w-full transition-transform duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-fd-border bg-fd-background p-6 text-center shadow-sm [backface-visibility:hidden]">
              <div className="mb-2 text-xs font-bold uppercase tracking-wider text-fd-muted-foreground">Concept / Question</div>
              <div className="w-full break-words text-lg font-semibold text-fd-foreground overflow-y-auto max-h-full">
                <MathText text={currentCard.front} />
              </div>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-fd-primary/30 bg-fd-primary/5 p-6 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <div className="mb-2 text-xs font-bold uppercase tracking-wider text-fd-primary">Answer / Definition</div>
              <div className="w-full break-words text-base text-fd-foreground overflow-y-auto max-h-full">
                <MathText text={currentCard.back} />
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 my-4 max-h-24 overflow-y-auto px-2">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`min-w-8 h-8 px-2 rounded-full text-xs font-medium transition-all ${
              index === currentIndex 
                ? 'bg-fd-primary text-fd-primary-foreground scale-110 shadow-sm' 
                : 'bg-fd-muted text-fd-muted-foreground hover:bg-fd-border'
            }`}
            aria-label={`Go to card ${index + 1}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-fd-border">
        <button onClick={goPrev} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-fd-border bg-fd-background hover:bg-fd-muted transition-colors text-sm font-medium text-fd-foreground">
          <ChevronLeft className="h-4 w-4" /> Previous
        </button>
        <span className="text-xs text-fd-muted-foreground italic">Click card to flip</span>
        <button onClick={goNext} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-fd-primary text-fd-primary-foreground hover:bg-fd-primary/90 transition-colors text-sm font-medium shadow-sm">
          Next <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
