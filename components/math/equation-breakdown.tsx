'use client';

import React from 'react';

export function EquationBreakdown({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 rounded-xl border border-fd-border bg-fd-background p-6 shadow-sm">
      {children}
    </div>
  );
}

export function Equation({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 text-center text-xl font-serif text-fd-foreground overflow-x-auto py-2 border-b border-fd-border pb-4">
      {children}
    </div>
  );
}

export function Term({ symbol, meaning, domain }: { symbol: React.ReactNode; meaning: string; domain?: string }) {
  return (
    <div className="flex items-baseline gap-3 rounded-lg bg-fd-muted/30 p-3 mb-2">
      <div className="shrink-0 font-serif text-lg text-fd-primary font-semibold min-w-[40px] text-center">
        {symbol}
      </div>
      <div className="text-sm text-fd-foreground/90">
        <span className="font-medium">{meaning}</span>
        {domain && <span className="block text-xs text-fd-muted-foreground mt-0.5 font-mono">{domain}</span>}
      </div>
    </div>
  );
}

export function TermGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {children}
    </div>
  );
}