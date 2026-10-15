import type { ReactNode } from 'react';

/*
 * Numbered steps: a column of numbered circles joined by a thin rule, used for every
 * procedure and worked example. `Steps` is the standard name; `StepByStep` and the
 * title helpers stay for existing pages and render the same markup.
 *
 * The elements are spans and divs rather than headings, so MDX can wrap them in a
 * paragraph without producing invalid HTML.
 */

export function Step({ title, children }: { number?: number; title?: ReactNode; children?: ReactNode }) {
  return (
    <div className="ui-step">
      {title ? <span className="ui-step-title">{title}</span> : null}
      <div className="ui-step-body">{children}</div>
    </div>
  );
}

export function StepByStep({ title, children }: { title?: ReactNode; children?: ReactNode }) {
  return (
    <div className="ui-steps-block">
      {title ? <span className="ui-steps-title">{title}</span> : null}
      <div className="ui-steps">{children}</div>
    </div>
  );
}

export const Steps = StepByStep;

export function StepByStepTitle({ children }: { children?: ReactNode }) {
  return <span className="ui-steps-title">{children}</span>;
}

export function StepTitle({ children }: { children?: ReactNode }) {
  return <span className="ui-step-title">{children}</span>;
}
