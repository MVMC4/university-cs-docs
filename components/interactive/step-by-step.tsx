'use client';

import React from 'react';
import { ListOrdered } from 'lucide-react';

interface StepProps {
  number: number;
  title?: React.ReactNode;
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
        {title && <div className="font-semibold text-fd-foreground mb-1 break-words">{title}</div>}
        <div className="text-sm text-fd-muted-foreground leading-relaxed break-words overflow-x-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

interface StepByStepProps {
  title?: React.ReactNode;
  children: React.ReactNode;
}

export function StepByStep({ title, children }: StepByStepProps) {
  return (
    <div className="my-6 w-full overflow-hidden rounded-lg border border-fd-border bg-fd-background p-6 shadow-sm">
      {title && (
        <h3 className="text-lg font-bold text-fd-foreground mb-4 flex items-center gap-2">
          <ListOrdered className="h-5 w-5 text-fd-primary shrink-0" />
          <span className="break-words">{title}</span>
        </h3>
      )}
      <div className="ml-2 min-w-0">
        {children}
      </div>
    </div>
  );
}

// --- FIX FOR MDX HYDRATION ERROR ---
// MDX sometimes wraps child components in <p> tags when they are mixed with text.
// Since <h4> and <h3> cannot be descendants of <p>, it causes a hydration error.
// By using <span> with Tailwind's `block` and `flex` utilities, we maintain the 
// exact same visual styling while remaining valid HTML even if wrapped in <p>.

export function StepByStepTitle({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex text-lg font-bold text-fd-foreground mb-4 items-center gap-2">
      <ListOrdered className="h-5 w-5 text-fd-primary shrink-0" />
      <span className="break-words">{children}</span>
    </span>
  );
}

export function StepTitle({ children }: { children: React.ReactNode }) {
  return (
    <span className="block font-semibold text-fd-foreground mb-1 break-words">
      {children}
    </span>
  );
}