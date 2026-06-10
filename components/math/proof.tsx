'use client';

import React from 'react';

export function Proof({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 rounded-lg border border-fd-border/60 bg-fd-background p-5 shadow-sm relative">
      <p className="mb-3 font-bold italic text-fd-foreground">Proof.</p>
      <div className="text-fd-foreground/90 leading-relaxed space-y-3 pr-8">
        {children}
      </div>
      <div className="absolute bottom-5 right-5 text-fd-foreground text-lg select-none">
        ■
      </div>
    </div>
  );
}