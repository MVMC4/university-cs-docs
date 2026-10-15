import type { ReactNode } from 'react';

/**
 * "Check your understanding": the questions at the end of every notes page.
 * Each one expands to show its answer; nothing is scored. Write the heading in
 * MDX (`## Check your understanding`) so it appears in the table of contents.
 */
export function CheckQuestions({ children }: { children?: ReactNode }) {
  return <div className="ui-check">{children}</div>;
}

export function CheckQuestion({ question, children }: { question: ReactNode; children?: ReactNode }) {
  return (
    <details className="ui-q">
      <summary>{question}</summary>
      <div className="ui-q-answer">{children}</div>
    </details>
  );
}
