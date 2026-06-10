'use client';

import React, { useState } from 'react';
import { RotateCw } from 'lucide-react';

export function Flashcard({ front, back }: { front: React.ReactNode; back: React.ReactNode }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="group relative my-6 h-64 w-full cursor-pointer [perspective:1000px]"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-fd-border bg-fd-background p-6 text-center shadow-sm [backface-visibility:hidden]">
          <div className="mb-2 text-xs font-bold uppercase tracking-wider text-fd-muted-foreground">Concept / Question</div>
          <div className="w-full break-words text-lg font-semibold text-fd-foreground overflow-y-auto max-h-full">
            {front}
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs text-fd-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
            <RotateCw className="h-3 w-3" /> Click to reveal
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-fd-primary/30 bg-fd-primary/5 p-6 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="mb-2 text-xs font-bold uppercase tracking-wider text-fd-primary">Answer / Definition</div>
          <div className="w-full break-words text-base text-fd-foreground overflow-y-auto max-h-full">
            {back}
          </div>
        </div>
      </div>
    </div>
  );
}