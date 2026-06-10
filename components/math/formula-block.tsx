'use client';

import React from 'react';
import { Copy, Check } from 'lucide-react';

export function FormulaBlock({ 
  title, 
  children,
  latex
}: { 
  title?: string; 
  children?: React.ReactNode;
  latex?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (latex) {
      navigator.clipboard.writeText(latex);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 w-full overflow-hidden rounded-lg border border-fd-border bg-fd-muted/40 p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-4">
        {title && <h4 className="text-sm font-bold uppercase tracking-wider text-fd-muted-foreground">{title}</h4>}
        <button 
          onClick={handleCopy}
          className="flex shrink-0 items-center gap-1.5 text-xs text-fd-muted-foreground transition-colors hover:text-fd-primary"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy LaTeX'}
        </button>
      </div>
      <div className="w-full overflow-x-auto py-2 text-center text-lg font-serif text-fd-foreground md:text-xl">
        {children}
      </div>
    </div>
  );
}