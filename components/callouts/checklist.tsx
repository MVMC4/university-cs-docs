'use client';

import React from 'react';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

type RuleType = 'must' | 'avoid' | 'note';

interface Rule {
  type: RuleType;
  text: string;
}

export function Checklist({ title, rules }: { title: string; rules: Rule[] }) {
  const getIcon = (type: RuleType) => {
    switch (type) {
      case 'must': return <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />;
      case 'avoid': return <XCircle className="h-5 w-5 shrink-0 text-red-500" />;
      case 'note': return <AlertCircle className="h-5 w-5 shrink-0 text-amber-500" />;
    }
  };

  return (
    <div className="my-6 w-full overflow-hidden rounded-lg border border-fd-border bg-fd-muted/20 p-5">
      <h4 className="mb-3 flex items-center gap-2 font-bold text-fd-foreground">
        📋 {title}
      </h4>
      <ul className="space-y-3">
        {rules.map((rule, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm text-fd-foreground/90">
            {getIcon(rule.type)}
            <span className="mt-0.5 break-words">{rule.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}