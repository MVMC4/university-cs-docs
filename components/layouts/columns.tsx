import type { ReactNode } from 'react';

/** Two side-by-side boxes for comparing things; stacks on narrow screens. */
export function Columns({ children }: { children: ReactNode }) {
  return <div className="ui-split">{children}</div>;
}

export function Column({ children }: { children: ReactNode; className?: string }) {
  return <div className="ui-split-col">{children}</div>;
}
