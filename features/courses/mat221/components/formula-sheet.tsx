import type { ReactNode } from 'react';

export function Mat221FormulaSheet({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mat221-formula-group">
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}
