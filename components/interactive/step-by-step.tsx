'use client';

import React from 'react';

interface StepProps {
  number: number;
  title?: React.ReactNode; // Changed to ReactNode and made optional
  children: React.ReactNode;
}

export function Step({ number, title, children }: StepProps) {
  return (
    <div className="relative pl-8 pb-6 last:pb-0">
      <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-fd-border last:hidden" />
      <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-fd-primary text-xs font-bold text-fd-primary-foreground">
        {number}
      </div>
      <div className="min-w-0">
        {/* If a standard text title prop is passed, it renders here */}
        {title && <h4 className="font-semibold text-fd-foreground mb-1 break-words">{title}</h4>}
        <div className="text-sm text-fd-muted-foreground leading-relaxed break-words overflow-x-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

interface StepByStepProps {
  title?: React.ReactNode; // Made optional
  children: React.ReactNode;
}

export function StepByStep({ title, children }: StepByStepProps) {
  return (
    <div className="my-6 w-full overflow-hidden rounded-lg border border-fd-border bg-fd-background p-6 shadow-sm">
      {title && (
        <h3 className="text-lg font-bold text-fd-foreground mb-4 flex items-center gap-2">
          <span className="text-fd-primary">⚙️</span> <span className="break-words">{title}</span>
        </h3>
      )}
      <div className="ml-2 min-w-0">
        {children}
      </div>
    </div>
  );
}

// --- NEW: Sub-components to allow MDX LaTeX parsing ---

export function StepByStepTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg font-bold text-fd-foreground mb-4 flex items-center gap-2">
      <span className="text-fd-primary">⚙️</span> <span className="break-words">{children}</span>
    </h3>
  );
}

export function StepTitle({ children }: { children: React.ReactNode }) {
  return <h4 className="font-semibold text-fd-foreground mb-1 break-words">{children}</h4>;
}