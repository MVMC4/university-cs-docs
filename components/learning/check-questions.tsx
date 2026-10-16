'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { hashText } from '@/features/progress/core';
import { useRecord } from '@/features/progress';

/**
 * "Check your understanding": the questions at the end of every notes page.
 * Each one expands to show its answer; nothing is scored. Write the heading in
 * MDX (`## Check your understanding`) so it appears in the table of contents.
 */
export function CheckQuestions({ children }: { children?: ReactNode }) {
  return <div className="ui-check">{children}</div>;
}

export function CheckQuestion({ question, children }: { question: ReactNode; children?: ReactNode }) {
  const record = useRecord();
  const pathname = usePathname();
  const key = hashText(typeof question === 'string' ? question : 'question');
  return (
    <details
      className="ui-q"
      onToggle={(event) => {
        // Opening an answer counts as working through the question.
        if (event.currentTarget.open) record({ type: 'check', page: pathname, key });
      }}
    >
      <summary>{question}</summary>
      <div className="ui-q-answer">{children}</div>
    </details>
  );
}
