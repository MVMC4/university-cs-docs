'use client';

import { Children, isValidElement, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function StepperStep({ children }: { title: string; children: ReactNode }) {
  return <>{children}</>;
}

/** A walkthrough shown one step at a time, in the shared interactive frame. */
export function InteractiveStepper({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState(0);
  const steps = Children.toArray(children).filter(isValidElement);
  const total = steps.length;
  if (total === 0) return null;
  const titles = steps.map((step) => (step.props as { title?: string }).title || 'Step');

  return (
    <section className="ui-viz">
      <header className="ui-viz-head">
        <b>{titles[current]}</b>
        <span className="ui-viz-stats">Step {current + 1} of {total}</span>
      </header>
      <div className="ui-viz-progress" aria-hidden="true"><div style={{ width: `${((current + 1) / total) * 100}%` }} /></div>
      <div className="ui-viz-body">{steps[current]}</div>
      <footer className="ui-viz-controls">
        <button type="button" className="ui-btn ui-btn-sm" onClick={() => setCurrent(current - 1)} disabled={current === 0}>
          <ArrowLeft size={15} /> Back
        </button>
        <button type="button" className="ui-btn ui-btn-primary ui-btn-sm" onClick={() => setCurrent(current + 1)} disabled={current === total - 1}>
          Next <ArrowRight size={15} />
        </button>
      </footer>
    </section>
  );
}
