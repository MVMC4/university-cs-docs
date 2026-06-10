'use client';

import React from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

export function MathCodeBlock({ 
  title,
  language = "pseudocode",
  children,
  latex
}: { 
  title?: string;
  language?: string;
  children: React.ReactNode;
  latex?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (latex) {
      navigator.clipboard.writeText(latex);
    } else if (typeof children === 'string') {
      navigator.clipboard.writeText(children);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 w-full overflow-hidden rounded-lg border border-fd-border bg-fd-muted/50 shadow-sm">
      <div className="flex items-center justify-between bg-fd-muted/80 px-4 py-2 border-b border-fd-border">
        <div className="flex items-center gap-2 text-xs font-medium text-fd-muted-foreground">
          <Terminal className="h-3.5 w-3.5" />
          <span>{title || language.toUpperCase()}</span>
        </div>
        <button 
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-fd-muted-foreground transition-colors hover:text-fd-primary"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="overflow-x-auto p-4 font-mono text-sm text-fd-foreground leading-relaxed">
        {children}
      </div>
    </div>
  );
}