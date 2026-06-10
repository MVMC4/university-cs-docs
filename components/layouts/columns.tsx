'use client';

import React from 'react';

export function Columns({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      {children}
    </div>
  );
}

export function Column({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`min-w-0 overflow-x-auto rounded-lg border border-fd-border bg-fd-muted/30 p-4 ${className}`}>
      {children}
    </div>
  );
}