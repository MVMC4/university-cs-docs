import { AlertTriangle, BrainCircuit, Lightbulb, Scale } from 'lucide-react';
import type { ReactNode } from 'react';

function LearningBlock({
  kind,
  title,
  icon,
  children,
}: {
  kind: string;
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className={`learning-block learning-block-${kind}`}>
      <h3>{icon}{title}</h3>
      <div>{children}</div>
    </section>
  );
}

export function ConceptBlock({ title, children }: { title: string; children: ReactNode }) {
  return <LearningBlock kind="concept" title={title} icon={<BrainCircuit size={18} />}>{children}</LearningBlock>;
}

export function TheoremBlock({ title, children }: { title: string; children: ReactNode }) {
  return <LearningBlock kind="theorem" title={title} icon={<Scale size={18} />}>{children}</LearningBlock>;
}

export function RecognitionStrategy({ title = 'How to recognize it', children }: { title?: string; children: ReactNode }) {
  return <LearningBlock kind="recognition" title={title} icon={<Lightbulb size={18} />}>{children}</LearningBlock>;
}

export function CommonMistake({ title = 'Common mistake', children }: { title?: string; children: ReactNode }) {
  return <LearningBlock kind="mistake" title={title} icon={<AlertTriangle size={18} />}>{children}</LearningBlock>;
}
