import { ArrowRight, CheckCircle2, ClipboardCheck, Link2, ListOrdered } from 'lucide-react';
import type { ReactNode } from 'react';

export function MethodSteps({ title = 'Method', steps }: { title?: string; steps: string[] }) {
  return (
    <section className="method-steps">
      <h3><ListOrdered size={18} /> {title}</h3>
      <ol>{steps.map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}</ol>
    </section>
  );
}

export function PracticeCheckpoint({ title = 'Practice checkpoint', children }: { title?: string; children: ReactNode }) {
  return (
    <section className="practice-checkpoint">
      <h3><ClipboardCheck size={18} /> {title}</h3>
      <div>{children}</div>
    </section>
  );
}

export function LessonSummary({ items }: { items: string[] }) {
  return (
    <section className="lesson-summary">
      <h2><CheckCircle2 size={19} /> Lesson summary</h2>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}

export function LessonConnection({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <a className="lesson-connection" href={href}>
      <Link2 size={18} />
      <span><strong>{title}</strong>{children}</span>
      <ArrowRight size={18} />
    </a>
  );
}
