'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Lightbulb } from 'lucide-react';

export function SubQuestion({ part, prompt, solution, variations }: { 
  part?: string; 
  prompt: React.ReactNode; 
  solution: React.ReactNode; 
  variations?: React.ReactNode; 
}) {
  const [showSolution, setShowSolution] = useState(false);
  const [showVariations, setShowVariations] = useState(false);

  return (
    <div className="my-4 rounded-lg border border-fd-border bg-fd-background p-4 shadow-sm">
      <div className="flex gap-3">
        {part && (
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-fd-primary text-fd-primary-foreground text-sm font-bold">
            {part}
          </span>
        )}
        <div className="flex-1 text-fd-foreground font-medium leading-relaxed">
          {prompt}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-4">
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="flex items-center gap-2 text-sm font-semibold text-fd-primary hover:text-fd-primary/80 transition-colors"
        >
          {showSolution ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          {showSolution ? 'Hide Solution' : 'View Solution'}
        </button>
        
        {variations && (
          <button
            onClick={() => setShowVariations(!showVariations)}
            className="flex items-center gap-2 text-sm font-semibold text-amber-600 dark:text-amber-500 hover:opacity-80 transition-colors"
          >
            {showVariations ? <ChevronUp className="h-4 w-4" /> : <Lightbulb className="h-4 w-4" />}
            {showVariations ? 'Hide Variations' : 'View Variations'}
          </button>
        )}
      </div>

      {showSolution && (
        <div className="mt-4 rounded-md bg-fd-muted/50 border-l-4 border-fd-primary p-4 text-sm text-fd-foreground animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-fd-primary">
            <BookOpen className="h-3 w-3" /> Solution
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {solution}
          </div>
        </div>
      )}

      {showVariations && variations && (
        <div className="mt-4 rounded-md bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-4 text-sm text-fd-foreground animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-500">
            <Lightbulb className="h-3 w-3" /> Variations & Follow-ups
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {variations}
          </div>
        </div>
      )}
    </div>
  );
}

export function ExamQuestion({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="my-8 rounded-xl border border-fd-border bg-fd-muted/20 p-6 shadow-sm">
      <h3 className="text-xl font-bold text-fd-foreground mb-6 border-b border-fd-border pb-3">
        {title}
      </h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}