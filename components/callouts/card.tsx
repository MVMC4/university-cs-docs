'use client';

import React from 'react';

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`my-6 min-w-0 overflow-x-auto rounded-lg border border-fd-border bg-fd-muted/30 px-4 ${className}`}>
      {children}
    </div>
  );
}